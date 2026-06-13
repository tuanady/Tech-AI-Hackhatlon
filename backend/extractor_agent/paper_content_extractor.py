import os
import json
from dotenv import load_dotenv
from pypdf import PdfReader
from google import genai
from google.genai import types
from .schemas import ResearchPaperSchema

load_dotenv()

try:
    import fitz
    _HAS_PYMUPDF = True
except Exception:
    _HAS_PYMUPDF = False


class PaperExtractorAgent:
    def __init__(self):
        self.client = genai.Client(
            api_key=os.getenv("GOOGLE_API_KEY")
        )

    def _cache_path(self, pdf_path: str) -> str:
        return f"{pdf_path}.extracted.txt"

    def load_pdf(self, pdf_path: str) -> str:
        """
        Fast, cached PDF text extraction. Prefer PyMuPDF when available,
        otherwise fall back to pypdf.
        """
        cache_file = self._cache_path(pdf_path)
        if os.path.exists(cache_file):
            with open(cache_file, "r", encoding="utf-8") as f:
                return f.read()

        # Trying the fast PyMuPDF path first
        if _HAS_PYMUPDF:
            doc = fitz.open(pdf_path)
            texts = [page.get_text("text") for page in doc]
            full_text = "\n\n".join(texts)
        else:
            reader = PdfReader(pdf_path)
            text = []
            for page in reader.pages:
                text.append(page.extract_text() or "")
            full_text = "\n\n".join(text)

        # Save cached copy to speed up repeated runs
        try:
            with open(cache_file, "w", encoding="utf-8") as f:
                f.write(full_text)
        except Exception:
            pass

        return full_text

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


# if __name__ == "__main__":
#     extractor_agent = PaperExtractorAgent()
#     result = extractor_agent.extract("papers/Advancements_and_Challenges_in_Solid-State_Battery.pdf")
#     with open("paper_extraction_knowledge.json", "w", encoding="utf-8") as f:
#         json.dump(result.model_dump(), f, indent=2, ensure_ascii=False)
