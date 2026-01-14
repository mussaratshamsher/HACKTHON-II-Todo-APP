---
Technical Specification: Phase-3 Todo Agent
---

### 1. Overview

The Phase-3 Todo Agent is an intelligent, service-oriented component designed to act as the primary command-processing layer for the backend system. Its core purpose is to receive unstructured natural language commands from the frontend, understand the user's intent and associated details, and translate this information into structured, actionable data. This structured data will then be used to invoke existing business logic within the `todo_service.py` module. The agent's architecture is founded on the principle of "Reusable Intelligence," utilizing a collection of modular, single-purpose "skills" that can be independently developed, tested, and extended over time.

### 2. Architectural Placement & Directory Structure

The agent will be located within the primary backend application source tree at `backend/src/agent`. This co-location ensures tight integration with existing services while maintaining a clear separation of concerns.

The proposed directory structure is as follows:

```
backend/src/
└── agent/
    ├── __init__.py
    ├── processor.py         # The main Agent Processor/Orchestrator
    ├── models.py            # Pydantic models for agent-specific data structures
    └── skills/
        ├── __init__.py
        ├── base_skill.py        # Abstract base class defining the Skill interface
        ├── translation_skill.py
        ├── intent_recognition_skill.py
        ├── temporal_extraction_skill.py
        ├── recurrence_extraction_skill.py
        └── action_mapping_skill.py
```

### 3. Core Concepts & Terminology

*   **Agent Processor**: The central orchestrator (`processor.py`) responsible for managing the command processing pipeline. It receives the raw command, routes it sequentially through the registered skills, aggregates their outputs, and triggers the final action.
*   **Skill**: A self-contained, reusable class or module that performs a single, specific NLU/NLG task (e.g., `IntentRecognitionSkill`). Each skill must adhere to a standard interface, defined in `base_skill.py`, which will include an `execute(text: str, context: dict) -> dict` method. This allows skills to process the input text and leverage data produced by prior skills via the shared `context` object.
*   **Intent**: A string identifier representing the user's primary goal (e.g., `CREATE_TODO`, `MARK_TODO_AS_DONE`, `QUERY_TODOS`).
*   **Entity**: A specific piece of information extracted from the user's command. Entities are represented as key-value pairs, providing the detailed parameters for an intent (e.g., `{"entity": "task_content", "value": "buy milk"}`).

### 4. Detailed Data Flow

The following step-by-step flow illustrates how the agent processes a command like **"buy milk everyday"**:

1.  **API Call**: The frontend sends a JSON object to the new agent endpoint: `POST /api/agent/command` with body `{"command": "buy milk everyday"}`.
2.  **Processor Instantiation**: The API route handler instantiates the `AgentProcessor` and passes the command to it. A shared `context` dictionary is initialized as `{}`.
3.  **TranslationSkill**: The processor calls `translation_skill.execute("buy milk everyday", context)`. The skill detects the language as English and makes no changes.
4.  **IntentRecognitionSkill**: The processor calls `intent_recognition_skill.execute("buy milk everyday", context)`. The skill analyzes the text and determines the primary goal. It updates the context: `context['intent'] = {"intent": "CREATE_TODO"}`.
5.  **RecurrenceExtractionSkill**: The processor calls `recurrence_extraction_skill.execute("buy milk everyday", context)`. It identifies the word "everyday" and updates the context. For example: `context['entities'] = [{"type": "recurrence", "value": "daily"}]`.
6.  **TemporalExtractionSkill**: The processor calls `temporal_extraction_skill.execute("buy milk everyday", context)`. In this case, no specific date or time is found, so it does not add anything to the context.
7.  **ActionMappingSkill**: The processor invokes the final skill, `action_mapping_skill.execute("buy milk everyday", context)`. This skill's role is to consolidate all the collected information from the `context` object. It validates that it has enough information for the `CREATE_TODO` intent (a task description) and constructs the final data object required by the `todo_service`. It returns a dictionary like: `{"action": "create_todo", "data": {"title": "buy milk", "recurrence": "daily"}}`.
8.  **Service Execution**: The `AgentProcessor` inspects the output from the `ActionMappingSkill`, identifies the target method as `create_todo`, and calls `todo_service.create_todo(**action_dict['data'])`.
9.  **Response**: The result from the `todo_service` (the newly created Todo object) is wrapped in a standardized success response and returned to the API caller.

### 5. Proposed `Skill` Implementations

*   **TranslationSkill**
    *   **Responsibility**: Detects if the input text is in a language other than English and translates it to English to enable processing by other skills.
    *   **Input**: `text: str`.
    *   **Output**: `{"translated_text": "Translated English text here"}`. If no translation is needed, it can return an empty dict or the original text.
*   **IntentRecognitionSkill**
    *   **Responsibility**: Determines the user's primary goal from the text.
    *   **Input**: `text: str`.
    *   **Output**: `{"intent": "CREATE_TODO"}` or `{"intent": "MARK_TODO_AS_DONE"}`, etc.
*   **TemporalExtractionSkill**
    *   **Responsibility**: Parses and normalizes any date and time expressions (e.g., "tomorrow", "next Tuesday at 4pm", "in 2 hours").
    *   **Input**: `text: str`.
    *   **Output**: `{"entities": [{"type": "due_date", "value": "2026-01-15"}, {"type": "due_time", "value": "14:00:00"}]}`.
*   **RecurrenceExtractionSkill**
    *   **Responsibility**: Identifies recurring patterns for tasks.
    *   **Input**: `text: str`.
    *   **Output**: `{"entities": [{"type": "recurrence", "value": "daily" | "weekly" | "monthly"}]}`.
*   **ActionMappingSkill**
    *   **Responsibility**: Gathers the `intent` and all `entities` from the shared context, validates them, extracts the core task content, and constructs the final, structured data object that `todo_service.py` methods expect.
    *   **Input**: `context: dict` (containing all previously gathered data).
    *   **Output**: `{"action": "create_todo", "data": {"title": "Call the doctor", "due_date": "2026-01-15"}}`.

### 6. API Contract

A new API endpoint will be created to serve as the single entry point for all natural language commands.

*   **Endpoint**: `POST /api/agent/command`
*   **Request Body**:
    ```json
    {
      "command": "string",
      "session_id": "string (optional)"
    }
    ```
*   **Success Response (200 OK)**:
    ```json
    {
      "status": "success",
      "message": "Todo created successfully.",
      "data": {
        "id": 123,
        "title": "buy milk",
        "description": null,
        "due_date": null,
        "recurrence": "daily",
        "completed": false
      }
    }
    ```
*   **Failure Response (400 Bad Request)**:
    ```json
    {
      "status": "error",
      "message": "Sorry, I didn't understand that. Could you please rephrase?"
    }
    ```

### 7. Error Handling & Ambiguity

Handling ambiguity is critical for a good user experience. The initial strategy will be as follows:

*   If the `IntentRecognitionSkill` cannot determine an intent with high confidence, the agent will immediately stop processing and return a 400 Bad Request with a message like: "Sorry, I'm not sure what you want to do. Please try rephrasing."
*   If an intent is recognized but required entities are missing (e.g., `CREATE_TODO` intent is found but the task content is empty, as in "remind me to do something"), the `ActionMappingSkill` will be responsible for catching this. It will trigger a 400 Bad Request with a more specific error: "Sorry, I can't create a reminder without knowing what to remind you about."
*   The architecture is designed to be extensible for future conversational features. The `session_id` in the API contract is a placeholder for this, allowing the agent to eventually store conversation context and ask clarifying follow-up questions instead of failing immediately.
