# main.py or server.py
from Market_Analysis.analysis import perform_market_research
from Market_Analysis.consultant import run_consultant_agent
import json

# Input variables from your teammate's upstream step
user_problem = "Building a wearable AI ecosystem that completely replaces the white cane for blind users via continuous multi-sensor tracking."
user_industry = "Healthcare and Assistive Devices"

print("--- STARTING LAB-TO-MARKET END-TO-END PIPELINE ---")

# Step 1: Run your standalone Tavily analysis engine (Store or reuse this output anywhere!)
market_data, raw_sources = perform_market_research(user_problem, user_industry)

# Step 2: Pass that clean data chunk straight into your separate consultant judge
final_verdict = run_consultant_agent(market_data, user_problem, user_industry)

# Step 3: Print out your clean, parsed pipeline response
print("\n🔥 PIPELINE COMPLETE. FINAL VERDICT PAYLOAD:")
print(json.dumps(final_verdict, indent=2))