import os
import json
from dotenv import load_dotenv
from pypdf import PdfReader
from google import genai
from google.genai import types
from schemas import ResearchPaperSchema
load_dotenv()
class PaperExtractorAgent:
    def __init__(self):
        self.client = genai.Client(
            api_key=os.getenv("GOOGLE_API_KEY")
        )

    def load_pdf(self, pdf_path: str):
        reader = PdfReader(pdf_path)
        text = []
        for page in reader.pages:
            text.append(page.extract_text())
        return "\n\n".join(text)

    def extract(self, pdf_path: str):
        paper_text = self.load_pdf(pdf_path)
        prompt = f"""
        You are an expert technology transfer analyst.
        Analyze the research paper and extract structured information.
        Focus on:
        - problem being solved
        - novelty of the solution
        - measurable improvements
        - limitations
        - future work
        - industries that could benefit
        - commercialization potential

        Only use information present in the paper.
        Research Paper:
        {paper_text}
        """

        response = self.client.models.generate_content(
            model="gemini-2.5-pro",
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=ResearchPaperSchema,
                temperature=0
            )
        )

        result = ResearchPaperSchema.model_validate_json(
            response.text
        )
        return result

if __name__ == "__main__":
    extractor_agent = PaperExtractorAgent()
    result = extractor_agent.extract("papers/Advancements_and_Challenges_in_Solid-State_Battery.pdf")
    print(json.dumps(result.model_dump(), indent=2))