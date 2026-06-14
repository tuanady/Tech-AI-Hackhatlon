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

    seen_urls = set()
    unique_web_results = []
    raw_context_pieces = []
    
    for r in all_web_results:
        if r['url'] not in seen_urls:
            seen_urls.add(r['url'])
            unique_web_results.append(r)
            raw_context_pieces.append(f"Source: {r['url']}\nTitle: {r['title']}\nContent: {r['content']}\nRaw Snippet: {r.get('raw_content', '')[:1200]}\n---")
            
    raw_context_text = "\n".join(raw_context_pieces)
    
    print("🧠 Gemini is mapping web data directly to dashboard architecture cards...")
    
    # 🚀 DENSITY CRUNCH: Added aggressive formatting rules to the prompt
    system_prompt = f"""
    You are an elite Venture Capital Strategist and Deep-Tech Commercialization Consultant.
    Analyze the provided real-time web data to build a specialized strategic market analysis card profile.

    Target Sector/Industry Context: {industry_context}
    Core Innovation/Problem Statement to Analyze: {problem_statement}
    
    CRITICAL CARD LAYOUT & DENSITY RULES:
    1. Keep text brief, crisp, and readable. Avoid dense paragraph blobs.
    2. Where applicable, use markdown formatting with **bolding** to highlight critical numbers, metrics, or frameworks.
    3. Maximize scannability for venture capitalists looking for rapid insight delivery.

    You MUST output a strict JSON object containing these exact keys:
    {{
        "need_for_product_service": "1-2 sentence maximum summary of the macro driving need. Bold the primary catalyst.",
        "the_need_being_solved": "List 2 concise bullet points detailing specific target user pain points or friction loops.",
        "target_customer": "Explicit customer segmentation/persona. Bold the primary industry vertical target.",
        "market_size_and_growth": "List 2 bullet points outlining geographic breakdowns or valuation metrics with clear figures.",
        "top_competitors": [
            "Competitor Name A (Short Descriptor)",
            "Competitor Name B (Short Descriptor)",
            "Competitor Name C (Short Descriptor)"
        ],
        "Potential_VC_investors": [
            "Investor Node A (Fund Stage)",
            "Investor Node B (Fund Stage)",
            "Investor Node C (Fund Stage)"
        ],
        "TAM": "The absolute primary Total Addressable Market figure (e.g., '**$1.3 Trillion** by 2029'). Bold the metric.",
        "recent_funding_activities": "1-2 brief sentences max summarizing investment trends or sector activity levels.",
        "licensing_and_regulations": "List 2 concise bullet points naming specific fast-track routes, statutory hurdles, or regional bodies (e.g., FDA, CE, ISO).",
        "business_model_suggestion": "1 clear sentence specifying the optimal monetization loop or transactional framework.",
        "potential_partner_organizations": [
            "Partner Entity A (Strategic Angle)",
            "Partner Entity B (Strategic Angle)",
            "Partner Entity C (Strategic Angle)"
        ],
        "growth_rates": "The primary vertical Compound Annual Growth Rate metric (e.g., '**9.8% CAGR** (2024-2029)'). Bold the rate.",
        "ip_check": "1 clear sentence mapping the intellectual property landscape or protective patent strategies."
    }}
    """
    
    gemini_prompt = f"{system_prompt}\n\nOptimized Web Data Context:\n{raw_context_text}"
    
    response = gemini_client.models.generate_content(
        model='gemini-2.5-flash',
        contents=gemini_prompt,
        config={'response_mime_type': 'application/json'}
    )
    
    return json.loads(response.text), unique_web_results