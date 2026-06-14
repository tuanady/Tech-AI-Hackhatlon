import json
import os

from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

class BottleneckClassifier:
    def __init__(self):
        self.client = OpenAI(
            api_key=os.getenv("PIONEER_API_KEY"),
            base_url="https://api.pioneer.ai/v1"
        )
        # Your deployed training job ID
        self.model_id = "53c9354e-459b-4063-8484-4134def423e4"

    def _market_data_to_text(self, market_data: dict) -> str:
        return f"""
        Need For Product Service:
        {market_data.get("need_for_product_service", "")}

        Need Being Solved:
        {market_data.get("the_need_being_solved", "")}

        Target Customer:
        {market_data.get("target_customer", "")}

        Market Size And Growth:
        {market_data.get("market_size_and_growth", "")}

        Top Competitors:
        {json.dumps(market_data.get("top_competitors", []), ensure_ascii=False)}

        Recent Funding Activities:
        {market_data.get("recent_funding_activities", "")}

        Licensing And Regulations:
        {market_data.get("licensing_and_regulations", "")}

        Business Model Suggestion:
        {market_data.get("business_model_suggestion", "")}

        Potential Partners:
        {json.dumps(market_data.get("potential_partners", []), ensure_ascii=False)}

        Growth Rates:
        {market_data.get("growth_rates", "")}

        IP Check:
        {market_data.get("ip_check", "")}
        """

    def classify(self, market_data: dict):
        text = self._market_data_to_text(market_data)
        response = self.client.chat.completions.create(
            model=self.model_id,
            messages=[
                {
                    "role": "user",
                    "content": text
                }
            ],
            extra_body={
                "schema": {
                    "classifications": [
                        {
                            "task": "commercialization_bottleneck",
                            "labels": [
                                "REGULATORY_APPROVAL",
                                "CUSTOMER_ADOPTION",
                                "MANUFACTURING_SCALE",
                                "CAPITAL_REQUIREMENTS",
                                "IP_DEFENSIBILITY",
                                "GO_TO_MARKET",
                                "TECHNICAL_MATURITY"
                            ]
                        }
                    ]
                }
            }
        )
        return {"prediction": response.choices[0].message.content}