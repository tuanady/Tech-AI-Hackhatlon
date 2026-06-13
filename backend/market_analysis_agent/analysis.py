from tavily import TavilyClient
from google import genai
import concurrent.futures
import json
import os
from dotenv import load_dotenv

load_dotenv() 

TAVILY_API_KEY = os.getenv("TAVILY_API_KEY")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

tavily_client = TavilyClient(api_key=TAVILY_API_KEY)
gemini_client = genai.Client(api_key=GEMINI_API_KEY)

def _execute_single_tavily_search(query):
    """Helper to run clean, isolated searches via Tavily."""
    try:
        response = tavily_client.search(
            query=query,
            search_depth="advanced", 
            max_results=3,
            include_raw_content=True
        )
        return response.get("results", [])
    except Exception as e:
        print(f"⚠️ Search failed for query '{query}': {e}")
        return []

def perform_market_research(problem_statement, industry_context):
    # 1. Dynamically generate clean sub-queries to feed the Tavily Engine
    sub_queries = [
        f"{industry_context} market size TAM SAM SOM growth cagr trends",
        f"{industry_context} top startup competitors market landscape",
        f"{industry_context} government regulations compliance licensing intellectual property patents"
    ]
    
    all_web_results = []
    print(f"🚀 Querying Tavily for the '{industry_context}' architecture data points...")
    
    with concurrent.futures.ThreadPoolExecutor() as executor:
        futures = {executor.submit(_execute_single_tavily_search, q): q for q in sub_queries}
        for future in concurrent.futures.as_completed(futures):
            all_web_results.extend(future.result())

    # Build unique, clean context pieces
    seen_urls = set()
    unique_web_results = []
    raw_context_pieces = []
    
    for r in all_web_results:
        if r['url'] not in seen_urls:
            seen_urls.add(r['url'])
            unique_web_results.append(r)
            raw_context_pieces.append(f"Source: {r['url']}\nTitle: {r['title']}\nContent: {r['content']}\nRaw Snippet: {r.get('raw_content', '')[:1200]}\n---")
            
    raw_context_text = "\n".join(raw_context_pieces)
    
    # 2. Fully Generalized Strategic System Prompt Mapping to your Layout
    print("🧠 Gemini is mapping web data directly to flowchart architecture...")
    system_prompt = f"""
    You are an elite Venture Capital Strategist, Global Market Analyst, and Tech Commercialization Consultant. 
    Analyze the provided real-time web data and your internal foundational knowledge to build a specialized strategic market analysis.

    Target Sector/Industry Context: {industry_context}
    Core Innovation/Problem Statement to Analyze: {problem_statement}
    
    You MUST output a strict JSON object containing these exact keys to match the system flowchart dashboard requirements.
    Ensure values are highly analytical, granular, and backed by numbers/metrics found in the text. Look out for regional frameworks, specific regulatory bodies, or regional market paradoxes.

    Output Key-by-Key Blueprint:
    {{
        "need_for_product_service": "The overarching macro-demand or driving need in the market for this technology.",
        "the_need_being_solved": "The specific granular customer pain point or friction loop being eliminated.",
        "target_customer": "Explicit customer segmentation, customer profile/persona, and primary industry vertical target.",
        "market_size_and_growth": "Total Addressable Market (TAM) definitions, global valuations, and target geographic breakdowns with clear dollar figures.",
        "top_competitors": [
            "Competitor A Name (with brief strategic positioning)",
            "Competitor B Name (with brief strategic positioning)",
            "Competitor C Name (with brief strategic positioning)"
        ],
        "recent_funding_activities": "Recent notable VC venture funding rounds, active investors, macro capital trends, or industry investment scales in this sector.",
        "licensing_and_regulations": "Specific fast-track statutory tracks, regulatory hurdles, evaluation policies, or critical validation/safety frameworks required (e.g., specific regional bodies, health directory listings, or manufacturing rules if applicable).",
        "business_model_suggestion": "The absolute optimal monetization mechanism or recurring commercial pricing loop recommended to scale sustainably.",
        "potential_partners": [
            "Partner Category/Entity A (strategic value detail)",
            "Partner Category/Entity B (strategic value detail)",
            "Partner Category/Entity C (strategic value detail)"
        ],
        "growth_rates": "Specific compound annual growth rates (CAGR %) and momentum metrics for this specific market vertical over the next 5-10 years.",
        "ip_check": "Critical intellectual property landscape insights, standard defensive patent strategies, freedom-to-operate checks, or commercial protection parameters for this domain."
    }}
    """
    
    gemini_prompt = f"{system_prompt}\n\nOptimized Web Data Context:\n{raw_context_text}"
    
    response = gemini_client.models.generate_content(
        model='gemini-2.5-flash',
        contents=gemini_prompt,
        config={'response_mime_type': 'application/json'}
    )
    
    return json.loads(response.text), unique_web_results

# --- GENERAL LOCAL DEMO TEST ---
if __name__ == "__main__":
    generic_problem = "Millions of blind people lose a piece of their independence and dignity every single day, forced to rely on strangers just to navigate the physical world. At Sehnsora, we are building a wearable AI ecosystem that restores their autonomy making moving through society as safe, private, and effortless for them as it is for everyone else."
    generic_industry = "Healthcare and Assistive Technology"
    
    try:
        market_data, web_sources = perform_market_research(generic_problem, generic_industry)
        print("\n📊 FLOWCHART COMPLIANT VC STRATEGY ANALYSIS:")
        print(json.dumps(market_data, indent=2))
            
    except Exception as e:
        print(f"❌ Execution Block failed: {e}")