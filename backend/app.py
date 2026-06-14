import os
import uuid
import json
import time
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path


from extractor_agent.paper_content_extractor import PaperExtractorAgent
from problem_statement_agent.problem_statement_generator import ProblemStatementGenerator
from market_analysis_agent.analysis import perform_market_research
from market_analysis_agent.consultant import run_consultant_agent
from cofounder_agent.paper_matcher import look_for_potential_cofounders
from bottleneck_classifier_agent.agent import BottleneckClassifier

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def _process_single_problem_concurrently(problem, upload_path, idx):
    """Executes market research and consultant scoring concurrently in its own thread."""
    try:
        problem_title = problem.problem_title
        problem_text = f"{problem_title} - {problem.problem_statement}"
        industry = ", ".join(problem.target_industries)
        
        print(f"🔥 [CONCURRENT WORKER] Processing Vector {idx+1}: {problem_title}", flush=True)
        
        # Run Gemini 12-key research vector engine
        market_data, raw_sources = perform_market_research(problem_text, industry)
        if isinstance(market_data, str):
            try: market_data = json.loads(market_data)
            except: market_data = {}

        # Cache data packets locally on disk
        with open(os.path.join(upload_path, f"market_data_{problem_title}.json"), "w", encoding="utf-8") as f:
            json.dump(market_data, f, indent=2, ensure_ascii=False)
        with open(os.path.join(upload_path, f"market_data_raw_sources_{problem_title}.json"), "w", encoding="utf-8") as f:
            json.dump(raw_sources, f, indent=2, ensure_ascii=False)

        bottleneck_classifier = BottleneckClassifier()
        print(f"🧠 Running Pioneer Bottleneck Classifier for {problem_title}", flush=True)
        classifier_result = bottleneck_classifier.classify(market_data)
        bottleneck = (classifier_result.get("data", {}).get("commercialization_bottleneck", {}))

        classifier_result = {
            "bottleneck": bottleneck.get("label"),
            "confidence": bottleneck.get("confidence")
        }
        with open(os.path.join(upload_path, f"bottleneck_classifier_result_{problem_title}.json"), "w", encoding="utf-8") as f:
            json.dump(classifier_result, f, indent=2, ensure_ascii=False)

        # Run Due Diligence consultant evaluator agent
        final_verdict = run_consultant_agent(market_data, problem_text, industry, classifier_result)
        if isinstance(final_verdict, str):
            try: final_verdict = json.loads(final_verdict)
            except: final_verdict = {}

        with open(os.path.join(upload_path, f"final_verdict_{problem_title}.json"), "w", encoding="utf-8") as f:
            json.dump(final_verdict, f, indent=2, ensure_ascii=False)
            
        # Build out the final front-end compatible card schema structural layout
        return {
            "id": idx + 1,
            "title": problem_title,
            "statement": problem.problem_statement,
            "industry": industry,
            "need_for_product_service": market_data.get("need_for_product_service", "N/A"),
            "the_need_being_solved": market_data.get("the_need_being_solved", "N/A"),
            "target_customer": market_data.get("target_customer", "N/A"),
            "market_size_and_growth": market_data.get("market_size_and_growth", "N/A"),
            "top_competitors": market_data.get("top_competitors", []),
            "Potential_VC_investors": market_data.get("Potential_VC_investors", []),
            "TAM": market_data.get("TAM", "N/A"),
            "recent_funding_activities": market_data.get("recent_funding_activities", "N/A"),
            "licensing_and_regulations": market_data.get("licensing_and_regulations", "N/A"),
            "business_model_suggestion": market_data.get("business_model_suggestion", "N/A"),
            "potential_partner_organizations": market_data.get("potential_partner_organizations", []),
            "growth_rates": market_data.get("growth_rates", "N/A"),
            "ip_check": market_data.get("ip_check", "N/A"),
            "bottleneck_analysis": classifier_result,
            "verdict": {
                "recommendation": final_verdict.get("investment_verdict", "PURSUE"),
                "summary": final_verdict.get("executive_justification", ""),
                "scorecard": final_verdict.get("scorecard", {"market_readiness": 85, "competitive_advantage": 75, "regulatory_feasibility": 80, "scalability_velocity": 85}),
                "pivot": final_verdict.get("pivot_recommendation", "")
            }
        }
    except Exception as e:
        print(f"❌ Error processing problem vector {problem.problem_title}: {e}", flush=True)
        return None


def run_workflow(paper_path, upload_path, original_filename, domain):
    extractor = PaperExtractorAgent()
    generator = ProblemStatementGenerator()
    
    compiled_payload = {
        "fileName": original_filename,
        "problems": [],  
        "co_founders": []
    }
    
    try:
        # Step 1: Structural Content Extraction
        print("⚡ [STAGE 1] Running Core Paper Extractor Agent...", flush=True)
        extraction_result = extractor.extract(paper_path)
        compiled_payload["pages"] = getattr(extraction_result, "page_count", 42)
        compiled_payload["sections"] = getattr(extraction_result, "section_count", 8)
        compiled_payload["references"] = getattr(extraction_result, "reference_count", 156)
        
        with open(os.path.join(upload_path, "extraction_result.json"), "w", encoding="utf-8") as f:
            json.dump(extraction_result.model_dump(), f, indent=2, ensure_ascii=False)
        
        extracted_title = getattr(extraction_result, "title", original_filename)

        # Step 2: Co-Founder Profile Index Matching
        print("⚡ [STAGE 2] Running Co-Founder Matching Agent...", flush=True)
        co_founders = look_for_potential_cofounders(extracted_title, domain)
        compiled_payload["co_founders"] = co_founders
        with open(os.path.join(upload_path, "co_founders.json"), "w", encoding="utf-8") as f:
            json.dump(co_founders, f, indent=2, ensure_ascii=False)
            
        # Step 3: Core Problem Generation
        print("⚡ [STAGE 3] Generating Problem Statement Blueprints...", flush=True)
        problem_statements = generator.generate_problem_statements(f"{upload_path}/extraction_result.json")
        with open(os.path.join(upload_path, "problem_statements.json"), "w", encoding="utf-8") as f:
            json.dump(problem_statements.model_dump(), f, indent=2, ensure_ascii=False)
        
        # Step 4: 🚀 PARALLEL EXECUTION MATRIX
        print(f"⚡ [STAGE 4] Spawning ThreadPoolExecutor for {len(problem_statements.problem_statements)} vectors concurrently...", flush=True)
        
        # max_workers=3 lets up to 3 problem vectors run their LLM and web queries side-by-side simultaneously
        with ThreadPoolExecutor(max_workers=3) as executor:
            futures = [
                executor.submit(_process_single_problem_concurrently, problem, upload_path, idx)
                for idx, problem in enumerate(problem_statements.problem_statements)
            ]
            
            for future in as_completed(futures):
                result_data = future.result()
                if result_data:
                    compiled_payload["problems"].append(result_data)
                    print(f"✅ Vector 0{result_data['id']} fully resolved and added to stack.", flush=True)
        
        print("✨ [SUCCESS] All tasks resolved. Compiling final blueprint matrix.", flush=True)
        return compiled_payload

    except Exception as e:
        print(f"❌ Error occurred in core agent workflow execution thread: {e}", flush=True)
        return compiled_payload


def _log_timing(upload_path: str, name: str, duration: float, extra: dict | None = None):
    """Append a JSON line with timing info to execution_stats.log in the upload folder."""
    try:
        log_path = os.path.join(upload_path, "execution_stats.log")
        entry = {
            "name": name,
            "durations": round(duration, 4),
            "timestamp": time.time(),
        }
        if extra:
            entry.update(extra)
        with open(log_path, "a", encoding="utf-8") as lf:
            lf.write(json.dumps(entry) + "\n")
    except Exception as e:
        print(f"⚠️ Failed to write timing log: {e}")

@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})

@app.route("/analyze-paper", methods=["POST"])
def analyze_paper():
    try:
        if "research_paper" not in request.files:
            return jsonify({"error": "No paper uploaded"}), 400
        paper = request.files["research_paper"]
        domain = request.form.get("domain", "").strip() or "General Technology"
        
        if paper.filename == "":
            return jsonify({"error": "Empty filename"}), 400
        
        file_id = str(uuid.uuid4())
        upload_path = os.path.join(UPLOAD_FOLDER, file_id)
        os.makedirs(upload_path, exist_ok=True)

        filepath = os.path.join(upload_path, f"{file_id}.pdf")
        paper.save(filepath)

        # Runs the workflow immediately and blocks until the parallel threads complete, 
        # then returns the absolute dataset directly to the standard fetch/axios hook!
        telemetry_results = run_workflow(filepath, upload_path, paper.filename, domain)
        return jsonify(telemetry_results)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/generate-pitchdeck", methods=["GET"])
def generate_pitchdeck():
    try:
        ppt_path = Path("../mock.pptx")

        if not ppt_path.exists():
            return jsonify({
                "success": False,
                "message": "Pitch deck not found"
            }), 404

        return send_file(
            ppt_path,
            as_attachment=True,
            download_name="Empowering my research.pptx",
            mimetype="application/vnd.openxmlformats-officedocument.presentationml.presentation"
        )

    except Exception as e:
        return jsonify({
            "success": False,
            "message": str(e)
        }), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)