from typing import List
from pydantic import BaseModel, Field

class ProblemStatementSchema(BaseModel):
    problem_title: str = Field(
        description=(
            "Short descriptive title of the problem."
        )
    )
    problem_statement: str = Field(
        description=(
            "Detailed explanation of a real-world problem that exists "
            "today and could potentially be addressed using the research."
        )
    )
    enabled_by_capability: str = Field(
        description=(
            "Capability from the research that could help solve this problem."
        )
    )
    target_industries: List[str] = Field(
        description=(
            "Industries affected by this problem."
        )
    )
class ProblemDiscoverySchema(BaseModel):
    core_capabilities: List[str] = Field(
        description=(
            "Fundamental capabilities enabled by the research."
        )
    )
    impacted_industries: List[str] = Field(
        description=(
            "Industries impacted by the research capabilities."
        )
    )
    problem_statements: List[ProblemStatementSchema] = Field(
        description=(
            "Real-world problems that become solvable because of the "
            "capabilities introduced by the research."
        )
    )