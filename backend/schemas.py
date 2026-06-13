from typing import List
from pydantic import BaseModel, Field

class ResearchPaperSchema(BaseModel):
    title: str = Field(
        description="Title of the research paper"
    )
    domain: str = Field(
        description="Research domain or field"
    )
    abstract: str = Field(
        description="Paper abstract"
    )
    problem_being_solved: str = Field(
        description="Main problem addressed by the research"
    )
    current_limitations_of_existing_solutions: str = Field(
        description="Limitations of current approaches"
    )
    proposed_solution: str = Field(
        description="The main method, technology, system, material, process, or innovation introduced by the paper."
    )
    key_findings: List[str] = Field(
        description="Most important conclusions or outcomes reported by the authors."
    )
    measurable_improvements: List[str] = Field(
        description="Quantitative improvements achieved by the proposed solution, including percentages, benchmark gains, cost reductions, efficiency improvements, accuracy increases, or other measurable metrics."
    )
    limitations: List[str] = Field(
        description="Limitations of the proposed work"
    )
    future_work: List[str] = Field(
        description="Future research directions"
    )
    research_stage: str = Field(
        description="Current maturity of the research based on evidence in the paper. Examples include theoretical concept, simulation validated, laboratory validated, prototype demonstrated, pilot tested, or production-ready."
    )