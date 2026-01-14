import pytest
from httpx import AsyncClient
from main import app
from sqlmodel import Session, create_engine
from sqlmodel.pool import StaticPool
from src.database import get_session
from src.models import Todo # Import Todo model

# Setup a test database
@pytest.fixture(name="session")
def session_fixture():
    engine = create_engine(
        "sqlite:///./test.db",
        echo=False,
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    # Create tables
    Todo.metadata.create_all(engine)
    with Session(engine) as session:
        yield session
    # Drop tables after tests
    Todo.metadata.drop_all(engine)


@pytest.fixture(name="client")
async def client_fixture(session: Session):
    def get_session_override():
        yield session

    app.dependency_overrides[get_session] = get_session_override
    async with AsyncClient(app=app, base_url="http://test") as client:
        yield client
    app.dependency_overrides.clear()


@pytest.mark.asyncio
async def test_create_todo_command(client: AsyncClient):
    command_data = {
        "command": "create a new todo: Finish this agent task tomorrow",
        "context": {}
    }
    response = await client.post("/api/agent/command", json=command_data)
    assert response.status_code == 200
    response_data = response.json()
    assert response_data["action"] == "create_todo"
    assert "Finish this agent task tomorrow" in response_data["parameters"]["title"]
    assert "Todo 'Finish this agent task tomorrow' created successfully!" in response_data["assistant_reply"]

@pytest.mark.asyncio
async def test_create_todo_command_daily_recurrence(client: AsyncClient):
    command_data = {
        "command": "add a todo: daily standup meeting daily",
        "context": {}
    }
    response = await client.post("/api/agent/command", json=command_data)
    assert response.status_code == 200
    response_data = response.json()
    assert response_data["action"] == "create_todo"
    assert "daily standup meeting" in response_data["parameters"]["title"]
    assert response_data["parameters"]["recurrence"] == "daily"
    assert "Todo 'daily standup meeting daily' created successfully!" in response_data["assistant_reply"]

@pytest.mark.asyncio
async def test_create_todo_command_no_content(client: AsyncClient):
    command_data = {
        "command": "create a new todo",
        "context": {}
    }
    response = await client.post("/api/agent/command", json=command_data)
    assert response.status_code == 200 # It should still be 200, but action will be UNKNOWN
    response_data = response.json()
    assert response_data["action"] == "UNKNOWN"
    assert "I need a task description to create a todo." in response_data["assistant_reply"]

@pytest.mark.asyncio
async def test_unknown_command(client: AsyncClient):
    command_data = {
        "command": "what is the weather?",
        "context": {}
    }
    response = await client.post("/api/agent/command", json=command_data)
    assert response.status_code == 200
    response_data = response.json()
    assert response_data["action"] == "UNKNOWN"
    assert "I don't understand your command." in response_data["assistant_reply"]

@pytest.mark.asyncio
async def test_error_handling(client: AsyncClient):
    # Simulate an error by sending a malformed request if possible,
    # or by patching a dependency to raise an exception.
    # For now, let's assume a valid command that might trigger an internal error
    # if our TodoService or database setup were to fail.
    # In a real scenario, you might mock the todo_service to raise an exception.
    command_data = {
        "command": "create a new todo: This should fail due to internal error",
        "context": {}
    }
    # This test currently expects a 200 for valid input, even if the action
    # leads to a downstream error, which should be captured in assistant_reply.
    # If the `HTTPException` in agent_routes.py is triggered, the status code will be 400.
    response = await client.post("/api/agent/command", json=command_data)
    assert response.status_code == 200 # Or 400 if the exception is raised before agent processing.
    response_data = response.json()
    assert "assistant_reply" in response_data
    # If the mock service was used, we'd check for the error message
