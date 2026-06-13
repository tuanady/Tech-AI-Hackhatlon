# Architecture Overview

This document outlines the architecture of the VentureForge project.

## Frontend

The frontend of the VentureForge project is built using React and Vite. It consumes data from the backend API to provide a user interface for interacting with the various functionalities of the application. The frontend repository is located at `https://github.com/tuanady/startup-spark-41.git`.

## Backend

The backend of the VentureForge project is responsible for handling business logic, data storage, and providing APIs for the frontend. It is structured into several modules:

*   **api**: Contains the main API endpoints.
*   **services**: Houses various services that encapsulate specific business logic.
*   **paper_parser**: Likely responsible for parsing research papers or similar documents.
*   **opportunity_engine**: Focuses on identifying and evaluating business opportunities.
*   **market_research**: Handles market analysis and research functionalities.
*   **commercialization**: Deals with the commercialization aspects of ventures.
*   **investor_memo**: Generates investor memos or related financial documents.
