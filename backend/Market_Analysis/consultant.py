from google import genai
from pydantic import BaseModel, Field
from typing import Optional, Literal
import json

# =====================================================================
# 🔑 API KEY CONFIGURATION
# =====================================================================
GEMINI_API_KEY = "AQ.Ab8RN6L-qOCcajTHhBFMnyZhYY-46J73_Lkm3C2OHozrZzaHEA"
gemini_client = genai.Client(api_key=GEMINI_API_KEY)

# =====================================================================
# 📊 THE VENTURE SCORECARD SCHEMAS (Matches your flowchart logic)
# =====================================================================
class ScorecardMetrics(BaseModel):
    market_readiness: int = Field(description="Score from 0 to 100 on immediate sector demand.")
    competitive_advantage: int = Field(description="Score from 0 to 100 on IP defensibility vs market incumbents.")
    regulatory_feasibility: int = Field(description="Score from 0 to 100 based on ease of legal compliance/licensing rules.")
    scalability_velocity: int = Field(description="Score from 0 to 100 on how fast this business can scale or automate.")

class ConsultantDecisionSchema(BaseModel):
    investment_verdict: Literal["YES", "NO"] = Field(description="Strict binary decision to proceed with the exact proposed roadmap.")
    scorecard: ScorecardMetrics = Field(description="Detailed 0-100 venture scoring dimensions across fields.")
    executive_justification: str = Field(description="Deep venture consulting rationale backing this investment threshold decision.")
    pivot_recommendation: Optional[str] = Field(
        default="", 
        description="If decision is NO but the tech has promise, give actionable alternative sectors or delivery tracks. If the market is entirely unviable, return a strict empty string ('')."
    )

# =====================================================================
# 💼 CORE CORE EVALUATION ENGINE
# =====================================================================
def run_consultant_agent(market_research_payload: dict, original_problem: str, industry_context: str):
    """
    Accepts raw market research JSON from ANY source and evaluates its startup potential.
    """
    print("💼 Consulting Agent is running venture due diligence on provided dataset...")
    
    system_prompt = f"""
    You are a Managing Director at a Deep-Tech Venture Capital Firm and a seasoned startup incubator advisor. 
    Your objective is to evaluate a parsed market research dataset and determine if the proposed concept is commercially viable.

    Original Industry Context: {industry_context}
    Target Problem Statement: {original_problem}

    Review the provided research, competitive threats, entry barriers, and growth parameters. 
    Compute a data-backed Scorecard (0-100) across all operational vectors.

    STRICT CONDITIONAL ROUTING RULES:
    1. If metrics and paths are strong, return 'YES'.
    2. If the current path is deeply flawed but the tech asset could thrive in another sector or configuration, return 'NO' and provide a strategic alternative in the 'pivot_recommendation' field.
    3. If the core mechanics are flatly unviable, return 'NO' and leave 'pivot_recommendation' as an empty string (""). Absolutely zero advice.
    """
    
    input_payload = f"""
    {system_prompt}
    
    --- RAW INPUT DATASET ---
    {json.dumps(market_research_payload, indent=2)}
    """
    
    # Generate content using Gemini's structured schema mode
    response = gemini_client.models.generate_content(
        model='gemini-2.5-flash',
        contents=input_payload,
        config={
            'response_mime_type': 'application/json',
            'response_schema': ConsultantDecisionSchema,
        }
    )
    
    return json.loads(response.text)