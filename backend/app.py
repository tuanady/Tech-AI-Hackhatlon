import os
import uuid
import json
from flask import Flask
from flask import request
from flask import jsonify
from flask_cors import CORS

from extractor_agent.paper_content_extractor import PaperExtractorAgent
from problem_statement_agent.problem_statement_generator import ProblemStatementGenerator
from market_analysis_agent.analysis import perform_market_research
from market_analysis_agent.consultant import run_consultant_agent

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"   # saves user uploaded papers
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/health", methods=["GET"])
def health():
    return jsonify({
        "status": "ok"
    })

@app.route("/analyze-paper", methods=["POST"])
def analyze_paper():
    try:
        if "research_paper" not in request.files:
            return jsonify({"error":"No paper uploaded"}), 400
        paper = request.files["research_paper"]
        if paper.filename == "":
            return jsonify({"error":"Empty filename"}), 400
        
        file_id = str(uuid.uuid4())
        filename = f"{file_id}.pdf"

        upload_path = os.path.join(UPLOAD_FOLDER, file_id)
        os.makedirs(upload_path, exist_ok=True)

        filepath = os.path.join(upload_path, filename)
        paper.save(filepath)

        run_workflow(filepath, upload_path)
        return jsonify({"message": "Paper analysis complete. Check the upload folder for results."})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

def run_workflow(paper_path, upload_path):
    extractor = PaperExtractorAgent()
    generator = ProblemStatementGenerator()
    try:
        extraction_result = extractor.extract(paper_path)
        with open(os.path.join(upload_path, "extraction_result.json"), "w", encoding="utf-8") as f:
            json.dump(extraction_result.model_dump(), f, indent=2, ensure_ascii=False)
        
        print("Paper extraction complete. Running problem statement generation...")
        problem_statements = generator.generate_problem_statements(f"{upload_path}/extraction_result.json")
        with open(os.path.join(upload_path, "problem_statements.json"), "w", encoding="utf-8") as f:
            json.dump(problem_statements.model_dump(), f, indent=2, ensure_ascii=False)
        
        print("Problem statement generation complete. Running market analysis...")

        for problem in problem_statements.problem_statements:
            problem_text = f"{problem.problem_title} - {problem.problem_statement}"
            industry = ", ".join(
                problem.target_industries
            )
            print(f"Analyzing problem: {problem_text} in industry context: {industry}")
            market_data, raw_sources = perform_market_research(problem_text, industry)
            with open(os.path.join(upload_path, f"market_data_{problem.problem_title}.json"), "w", encoding="utf-8") as f:
                json.dump(market_data, f, indent=2, ensure_ascii=False)
            
            with open(os.path.join(upload_path, f"market_data_raw_sources_{problem.problem_title}.json"), "w", encoding="utf-8") as f:
                json.dump(raw_sources, f, indent=2, ensure_ascii=False)

            print("Market research complete. Running consultant agent for final verdict...")
            final_verdict = run_consultant_agent(market_data, problem_text, industry)
            with open(os.path.join(upload_path, f"final_verdict_{problem.problem_title}.json"), "w", encoding="utf-8") as f:
                json.dump(final_verdict, f, indent=2, ensure_ascii=False)
            
    except Exception as e:
        print(f"Error occurred: {e}")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)