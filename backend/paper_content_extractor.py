import os
from typing import List, Optional
from pydantic import BaseModel, Field
from langchain_openai import ChatOpenAI
from langchain_community.document_loaders import PyPDFLoader

class ResearchPaperSchema(BaseModel):
    title: str = Field(description="The full title of the research paper")
    abstract: str = Field(description="The executive summary or abstract")
    methodology: str = Field(description="Brief description of the research methods used")
    key_findings: List[str] = Field(description="A list of the main results or conclusions")
    sample_size: Optional[int] = Field(description="Number of participants or samples, if mentioned")

os.environ["OPENAI_API_KEY"] = "your-api-key"
llm = ChatOpenAI(model="gpt-4o")
structured_llm = llm.with_structured_output(ResearchPaperSchema)

# 3. Load the PDF (extracting text from first 3 pages usually covers metadata)
loader = PyPDFLoader("paper.pdf")
pages = loader.load()
content = "\n".join([p.page_content for p in pages[:5]]) # Use first 5 pages

# 4. Run the extraction
result = structured_llm.invoke(f"Extract information from this research paper text:\n\n{content}")

# Output results
print(f"Title: {result.title}")
print(f"Findings: {result.key_findings}")