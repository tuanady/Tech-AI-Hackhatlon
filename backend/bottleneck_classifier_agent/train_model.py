import os
import requests
import json
import time
from dotenv import load_dotenv

load_dotenv()
PIONEER_API_KEY = os.getenv("PIONEER_API_KEY")
TRAINING_URL = "https://api.pioneer.ai/felix/training-jobs"

def train_bottleneck_classifier():
    payload = {
        "model_name": "commercialization-bottleneck-v1",
        "base_model": "fastino/gliner2-base-v1",
        "datasets": [
            {
                "name": "commercialization-bottleneck-classifier"
            }
        ],
        "training_type": "lora",
        "nr_epochs": 5,
        "learning_rate": 5e-5
    }
    headers = {
        "X-API-Key": PIONEER_API_KEY,
        "Content-Type": "application/json"
    }
    response = requests.post(
        TRAINING_URL,
        json=payload,
        headers=headers,
        timeout=300
    )
    response.raise_for_status()
    result = response.json()
    print(result)
    with open("classifier_agent_metadata/training_job.json", "w", encoding="utf-8") as f:
        json.dump(result, f, indent=2)

    return result

def poll_training_job():
    job_id = "53c9354e-459b-4063-8484-4134def423e4"
    while True:
        response = requests.get(
            f"{TRAINING_URL}/{job_id}",
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
    train_bottleneck_classifier()
    # poll_training_job()