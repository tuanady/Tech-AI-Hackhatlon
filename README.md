# STARTARCH

A compact AI-powered platform for turning research papers into venture-ready insights. Upload a PDF, describe the target domain, and the app generates structured problem statements, market research, co-founder suggestions, and investment-style verdicts.

## What this project does

- Extracts key information from academic or technical papers
- Generates real-world problem statements from the paper content
- Runs market research and strategic analysis with AI
- Suggests potential co-founder / research-aligned profiles
- Exposes a Flask backend and a React frontend for end-to-end analysis

## Project structure

- backend/ — Flask API, AI agents, and workflow logic
- frontend/ — React UI for upload and results
- papers/ — sample research materials
- requirements.txt — Python dependencies

## Starting guide

### 1. Prerequisites

- Python 3.10+
- Node.js 18+
- API keys in the project root `.env`:
  - `PINOEER_API_KEY`
  - `GEMINI_API_KEY`
  - `TAVILY_API_KEY`

### 2. Run the backend

```powershell
pip install -r requirements.txt
cd backend
python app.py
```

The API will start on `http://localhost:5000`.

### 3. Run the frontend

Open a second terminal:

```powershell
cd frontend
npm install
npm start
```

The UI will open on `http://localhost:3000`.

### 4. Use the app

1. Open the frontend in the browser.
2. Enter your target domain (for example: `Electric Vehicles`).
3. Upload a PDF research paper.
4. Wait for the analysis pipeline to finish and review the generated results.

## Notes

- The backend endpoint used by the frontend is `POST /analyze-paper`.
- The app writes generated analysis files into `backend/uploads/<session-id>/` for each run.
