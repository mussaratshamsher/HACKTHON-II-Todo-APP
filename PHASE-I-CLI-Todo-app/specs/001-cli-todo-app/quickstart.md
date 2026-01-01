# Quickstart: CLI Todo App - Phase 1

**Feature Branch**: `001-cli-todo-app` | **Date**: 2025-12-30
**Source**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)

## Prerequisites

- Python 3.13+
- uv (for package management)

## Installation

```bash
# Clone and setup
git clone <repo-url>
cd cli-todo-app

# Install with uv
uv sync
```

## Running the App

```bash
uv run python -m src
```

## Project Structure

```
src/
├── __main__.py    # Module entry point (python -m src)
├── __init__.py     # Package initialization
├── main.py        # CLI application entry point
├── models.py      # Task data model and error definitions
└── todo.py        # Todo service with CRUD operations

tests/
├── __init__.py     # Test package initialization
├── test_models.py  # Model unit tests
├── test_todo.py    # Service layer unit tests
└── test_cli.py     # CLI integration tests

pyproject.toml           # uv project config
uv.lock                  # Dependency lock file
README.md                # User-facing documentation
```

## Development Workflow

### Running Tests

```bash
# Run all tests
uv run pytest

# Run with coverage
uv run pytest --cov=src --cov-report=term-missing

# Run specific test file
uv run pytest tests/test_models.py
uv run pytest tests/test_todo.py
uv run pytest tests/test_cli.py
```

### Type Checking

```bash
uv run mypy src/
```

### Linting

```bash
uv run ruff check src/
```

### Formatting

```bash
uv run ruff format src/
```

## Key Files

### Source Code

| File | Purpose |
|------|---------|
| `src/models.py` | `Task` dataclass, `TaskStatus` enum, and error definitions (`TodoError`, `ValidationError`, `IndexOutOfBoundsError`) |
| `src/todo.py` | `TodoService` class with CRUD methods |
| `src/main.py` | CLI application with menu loop and command dispatch |
| `src/__main__.py` | Module entry point (`python -m src`) |

### Test Files

| File | Purpose |
|------|---------|
| `tests/test_models.py` | Task model unit tests |
| `tests/test_todo.py` | Service layer unit tests |
| `tests/test_cli.py` | End-to-end CLI integration tests |

## Adding a New Task

```python
from src.models import Task, TaskStatus
from src.todo import TodoService
from datetime import datetime

service = TodoService()
service.add_task("Buy groceries")
tasks = service.list_tasks()
```

## Architecture Overview

```
User Input (stdin)
       |
       v
┌─────────────────┐
│  TodoApp (main) │  # Menu loop + command dispatch
└────────┬────────┘
         |
         v
┌─────────────────┐
│  TodoService    │  # Business logic (CRUD)
└────────┬────────┘
         |
         v
┌─────────────────┐
│  In-Memory List │  # Python list[Task]
└─────────────────┘
```

## Common Tasks

### Add a test

```bash
# Create test file in tests directory
touch tests/test_new_feature.py
```

### Run CI checks locally

```bash
uv run pytest --cov=src
uv run mypy src/
uv run ruff check src/
```

## Next Steps

1. Run `uv sync` to install dependencies
2. Implement `src/models.py` (Task, TaskStatus, error classes)
3. Implement `src/todo.py` (TodoService with CRUD operations)
4. Implement `src/main.py` (CLI application with menu loop)
5. Write unit tests for each module (tests/test_models.py, tests/test_todo.py)
6. Write integration tests for CLI flow (tests/test_cli.py)
7. Run full test suite with coverage
  