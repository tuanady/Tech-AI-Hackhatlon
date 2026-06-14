import os
import json
import time
import requests
from dotenv import load_dotenv

load_dotenv()
PIONEER_API_KEY = os.getenv("PIONEER_API_KEY")
API_URL = "https://api.pioneer.ai/generate"


def generate_bottleneck_dataset(output_file: str = "classifier_agent_metadata/commercialization_bottlenecks_ds_metadata.json"):
    payload = {
        "task_type": "classification",
        "dataset_name": "commercialization-bottleneck-classifier",
        "labels": [
            "REGULATORY_APPROVAL",
            "CUSTOMER_ADOPTION",
            "MANUFACTURING_SCALE",
            "CAPITAL_REQUIREMENTS",
            "IP_DEFENSIBILITY",
            "GO_TO_MARKET",
            "TECHNICAL_MATURITY"
        ],
        "num_examples": 5000,
        "domain_description": (
            "Commercialization analysis of academic research. "
            "Examples contain market demand, customer need, target customer, "
            "market size, competitors, funding activity, regulations, "
            "business model, partnerships, growth rates, and IP information."
        ),
        "prompt": (
            "Generate realistic market research examples and assign the "
            "single most important commercialization bottleneck."
        ),
        "classified_examples": [
            {
                "text": """
                    Need For Product Service: Autonomous surgical robotics
                    Need Being Solved: Improve surgical precision
                    Target Customer: Hospitals
                    Market Size And Growth: $30B market
                    Licensing And Regulations: FDA approval required
                    IP Check: Strong patents
                """,
                "label": "REGULATORY_APPROVAL"
            },
            {
                "text": """
                    Need For Product Service: Advanced battery technology
                    Need Being Solved: Long-duration storage
                    Target Customer: Utilities
                    Business Model: Battery manufacturing
                    Potential Partners: Grid operators
                """,
                "label": "MANUFACTURING_SCALE"
            }
        ]
    }

    headers = {
        "X-API-Key": PIONEER_API_KEY,
        "Content-Type": "application/json"
    }

    response = requests.post(
        API_URL,
        json=payload,
        headers=headers,
        timeout=300
    )

    response.raise_for_status()
    dataset = response.json()

    os.makedirs(os.path.dirname(output_file), exist_ok=True)

    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(dataset, f, indent=2, ensure_ascii=False)

    print(f"Dataset saved to {output_file}")

    return dataset

def poll_job():
    job_id = "3ebb2dc0-e0a4-4377-9971-db5984912a03"
    while True:
        response = requests.get(
            f"https://api.pioneer.ai/generate/jobs/{job_id}",
            headers={
                "X-API-Key": PIONEER_API_KEY,
            }
        )
        response.raise_for_status()
        data = response.json()
        print(data)
        status = data.get("status")

        if status in ["completed", "failed"]:
            break

        time.sleep(10)

if __name__ == "__main__":
    # generate_bottleneck_dataset()
    poll_job()