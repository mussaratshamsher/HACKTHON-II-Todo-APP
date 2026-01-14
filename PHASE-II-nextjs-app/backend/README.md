# Todo Backend API

This project provides a backend API for a Todo application, built with FastAPI and SQLModel. It includes an experimental agent system for processing natural language commands to manage todo items.

## Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd PHASE-II-nextjs-app/backend
    ```

2.  **Create a virtual environment and install dependencies:**
    ```bash
    python -m venv .venv
    .venv\Scripts\activate  # On Windows
    # source .venv/bin/activate  # On macOS/Linux
    pip install -r requirements.txt
    ```

3.  **Database Configuration:**
    Create a `.env` file in the `backend` directory with your database connection string. For example:
    ```
    DATABASE_URL="postgresql://user:password@host:port/dbname"
    # Or for SQLite (for development/testing):
    # DATABASE_URL="sqlite:///./test.db"
    ```

4.  **Run the application:**
    ```bash
    uvicorn src.main:app --reload
    ```
    The API documentation will be available at `http://127.0.0.1:8000/docs`.

## API Endpoints

### Todo Management

*   **`GET /api/todos`**: Retrieve all todo items.
*   **`POST /api/todos`**: Create a new todo item.
*   **`GET /api/todos/{todo_id}`**: Retrieve a specific todo item by ID.
*   **`PUT /api/todos/{todo_id}`**: Update a specific todo item by ID.
*   **`DELETE /api/todos/{todo_id}`**: Delete a specific todo item by ID.

### Agent API (Experimental)

*   **`POST /api/agent/command`**: Process natural language commands to manage todo items.

    **Request Body (JSON):**
    ```json
    {
        "command": "string",
        "context": {}
    }
    ```
    `command`: The natural language command for the agent (e.g., "create a new todo: Buy groceries tomorrow").
    `context`: An optional dictionary for additional context (currently not heavily used, but can be expanded).

    **Example Usage:**

    **Create a new todo:**
    ```json
    {
        "command": "create a new todo: Finish agent phase 3 by end of day"
    }
    ```

    **Create a new todo with recurrence:**
    ```json
    {
        "command": "add a todo: daily standup meeting daily"
    }
    ```

    **Create a new todo with a due date:**
    ```json
    {
        "command": "create a new todo: Call John on Friday"
    }
    ```

    **Response (JSON):**
    ```json
    {
        "action": "string",
        "parameters": {},
        "assistant_reply": "string"
    }
    ```
    `action`: The action identified by the agent (e.g., "create_todo", "UNKNOWN").
    `parameters`: A dictionary of parameters extracted for the action (e.g., `{"title": "Buy groceries", "due_date": "2026-01-15T00:00:00"}`).
    `assistant_reply`: A natural language response from the agent.

## Testing

To run the tests:

```bash
pytest
```
