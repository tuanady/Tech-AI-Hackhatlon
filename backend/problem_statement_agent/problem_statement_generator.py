import os
import json
from dotenv import load_dotenv
from google import genai
from google.genai import types
from .schemas import ProblemDiscoverySchema
load_dotenv()


class ProblemStatementGenerator:
    def __init__(self):
        self.client = genai.Client(
            api_key=os.getenv("GOOGLE_API_KEY")
        )

    def load_extracted_paper(self, json_path: str):
        with open(json_path,"r", encoding="utf-8") as f:
            return json.load(f)

    def generate_problem_statements(self, json_path: str):
        paper_data = self.load_extracted_paper(json_path)
        prompt = f"""
        You are an expert technology commercialization analyst.
        You are NOT a startup consultant.
        You are NOT a market researcher.

        You are responsible for identifying real-world problems that become solvable because of new scientific capabilities.
        You will receive structured information extracted from a research paper.

        Your task is to:

        1. Identify the core capabilities enabled by the research.
        2. Identify industries impacted by those capabilities.
        3. Generate 3 high-quality problem statements.

        IMPORTANT:
        A problem statement must describe a painful, expensive, inefficient, unsafe, or unsolved real-world problem.
        DO NOT generate startup ideas.
        DO NOT generate company names.
        DO NOT generate products.
        DO NOT generate market analysis.
        DO NOT generate market size estimates.
        DO NOT generate commercialization scores.
        Instead, focus on:

        - Who suffers from the problem?
        - Why does the problem matter?
        - What limitations currently exist?
        - Why is the problem still unsolved?
        - Which capability from the research could help?

        Each problem statement should be:

        - Industry-specific
        - Detailed
        - Commercially relevant
        - Suitable for downstream market analysis

        Research Paper:

        {json.dumps(paper_data, indent=2)}
        """

        response = self.client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
            config=types.GenerateContentConfig(
                temperature=0,
                response_mime_type="application/json",
                response_schema=ProblemDiscoverySchema
            )
        )

        result = (
            ProblemDiscoverySchema.model_validate_json(
                response.text
            )
        )

        return result