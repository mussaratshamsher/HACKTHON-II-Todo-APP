# Backend Details

## Infrastructure Stack

The backend is built with Python using the FastAPI framework. It uses a PostgreSQL database for data storage and Firebase for user authentication.

- **Framework:** FastAPI
- **Database:** PostgreSQL (using `psycopg-binary`)
- **Authentication:** Firebase Admin SDK
- **ORM:** SQLModel
- **Server:** Uvicorn

## File Structure

The backend code is organized into the following main directories:

- `src/`: Contains the main application logic.
  - `api/`: Defines the API endpoints for different resources (e.g., todos, users).
  - `auth/`: Handles authentication-related logic and dependencies.
  - `database.py`: Manages the database connection and session.
  - `models.py`: Defines the data models (e.g., `Todo`, `User`).
  - `main.py`: The entry point of the application, where the FastAPI app is initialized.
  - `services/`: Contains business logic and services that interact with the database.
- `tests/`: Contains tests for the application.
- `requirements.txt`: Lists the Python dependencies for the project.

## How it Works

The application follows a standard layered architecture:

1.  **API Layer (`src/api/`):**  The API routes receive HTTP requests and call the appropriate service functions.
2.  **Service Layer (`src/services/`):** The service layer contains the core business logic. It interacts with the database through the ORM.
3.  **Data Access Layer (`src/models.py`, `src/database.py`):** The models define the database schema, and the `database.py` file manages the database connection.

Authentication is handled using Firebase. When a user logs in, the client receives a Firebase ID token. This token is sent in the `Authorization` header of subsequent requests. The backend verifies the token using the Firebase Admin SDK to protect the API endpoints.
