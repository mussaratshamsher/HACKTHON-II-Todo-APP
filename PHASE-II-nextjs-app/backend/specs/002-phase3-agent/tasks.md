---
Task Checklist: Phase-3 Todo Agent
---

This document provides a granular checklist of development tasks required to implement the Phase-3 Todo Agent.

### Phase 1: Core Architecture & Scaffolding

- [x] 1.1. **Create Agent Directory**: Create the main directory for the agent at `src/agent/`.
- [x] 1.2. **Create Skills Directory**: Create the subdirectory for the skills at `src/agent/skills/`.
- [x] 1.3. **Add Python Package Initializers**: Create `__init__.py` in `src/agent/` and `src/agent/skills/`.
- [x] 1.4. **Define Agent API Models**: Create `src/agent/models.py` and define Pydantic models for `CommandRequest` and `AgentResponse`.
- [x] 1.5. **Create Base Skill Interface**: Create `src/agent/skills/base_skill.py` and define the `BaseSkill` abstract base class with an `execute` abstract method.
- [x] 1.6. **Implement Agent Processor Class**: Create `src/agent/processor.py` and implement the `AgentProcessor` class. It should have a constructor that accepts a list of skill instances and a `process` method that runs them sequentially.

### Phase 2: API Integration

- [x] 2.1. **Create Agent API Routes File**: Create `src/api/agent_routes.py`.
- [x] 2.2. **Define Agent Router**: In `agent_routes.py`, instantiate a new `APIRouter`.
- [x] 2.3. **Define `/command` Endpoint**: In `agent_routes.py`, create the `POST /api/agent/command` endpoint, which takes a `CommandRequest` and returns an `AgentResponse`.
- [x] 2.4. **Include Agent Router**: In `src/main.py`, include and prefix the new agent router.
- [x] 2.5. **Instantiate Processor in Endpoint**: Wire the endpoint to create an instance of the `AgentProcessor` and call its `process` method.

### Phase 3: Initial Skill Development

- [x] 3.1. **Create `TranslationSkill`**: Create `src/agent/skills/translation_skill.py` with a `TranslationSkill` class that inherits from `BaseSkill` and performs no-op translation for now.
- [x] 3.2. **Create `IntentRecognitionSkill`**: Create `src/agent/skills/intent_recognition_skill.py`. Implement `IntentRecognitionSkill` with keyword matching to detect the `CREATE_TODO` intent.
- [x] 3.3. **Create `RecurrenceExtractionSkill`**: Create `src/agent/skills/recurrence_extraction_skill.py`. Implement `RecurrenceExtractionSkill` with keyword matching for patterns like "daily" and "weekly".
- [x] 3.4. **Install `dateparser`**: Add `dateparser` to the `requirements.txt` file.
- [x] 3.5. **Create `TemporalExtractionSkill`**: Create `src/agent/skills/temporal_extraction_skill.py`. Implement `TemporalExtractionSkill` using the `dateparser` library to extract dates and times.
- [x] 3.6. **Create `ActionMappingSkill`**: Create `src/agent/skills/action_mapping_skill.py`. Implement `ActionMappingSkill` to collect data from the context and structure it into a final dictionary for the `todo_service`.

### Phase 4: End-to-End Integration & Testing

- [x] 4.1. **Inject `TodoService` into Processor**: Update the `AgentProcessor` to accept an instance of `TodoService` during initialization.
- [x] 4.2. **Execute Service Call**: In the `AgentProcessor`, after the skills have run, use the output from the `ActionMappingSkill` to call the appropriate method on the `TodoService` instance.
- [x] 4.3. **Implement Validation in `ActionMappingSkill`**: Add logic to `ActionMappingSkill` to verify that the necessary data (e.g., task content for `CREATE_TODO`) is present before creating the final action dictionary.
- [x] 4.4. **Add Top-Level Error Handling**: Wrap the agent processing logic in the API endpoint with a try/except block to catch exceptions and return a formatted 400 error response.
- [x] 4.5. **Create Skill Unit Test File**: Create a `tests/` directory if it doesn't exist, and add `tests/test_agent_skills.py`.
- [x] 4.6. **Write Unit Tests for Skills**: In `test_agent_skills.py`, write specific unit tests for each skill, providing sample inputs and asserting the expected outputs.
- [x] 4.7. **Create API Integration Test File**: Create `tests/test_agent_api.py`.
- [x] 4.8. **Write Integration Tests**: In `test_agent_api.py`, write tests that call the `/api/agent/command` endpoint and verify that the database is correctly modified.

### Phase 5: Refinement & Documentation

- [x] 5.1. **Add Docstrings and Type Hinting**: Review all new files in the `src/agent/` module and ensure all classes, methods, and functions are fully documented with docstrings and type hints.
- [x] 5.2. **Review and Refactor**: Perform a self-review of the agent's logic, focusing on clarity, efficiency, and adherence to the single-responsibility principle for skills.
- [x] 5.3. **Update Project README**: If necessary, update the project's main README to include instructions on how to use the new agent API.