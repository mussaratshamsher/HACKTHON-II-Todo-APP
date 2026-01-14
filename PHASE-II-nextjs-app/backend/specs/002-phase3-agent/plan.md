---
Implementation Plan: Phase-3 Todo Agent
---

This document outlines the development and implementation plan for the Phase-3 Todo Agent, as detailed in `spec.md`. The plan is broken down into sequential phases, with each phase containing a set of actionable tasks.

### Phase 1: Core Architecture & Scaffolding

This phase focuses on setting up the foundational structure of the agent.

- [ ] **Task 1.1: Create Directory Structure**
  - Create the `src/agent/` directory.
  - Create the `src/agent/skills/` subdirectory.
  - Add `__init__.py` files to all new directories to ensure they are treated as Python packages.

- [ ] **Task 1.2: Define Agent-Specific Models**
  - Create `src/agent/models.py`.
  - Define Pydantic models for core data structures, including `CommandRequest`, `AgentResponse`, and potentially internal models for `Intent` and `Entity`.

- [ ] **Task 1.3: Define the Skill Interface**
  - Create `src/agent/skills/base_skill.py`.
  - Define an abstract base class `BaseSkill` with an `execute(self, text: str, context: dict) -> dict` method signature to enforce a standard interface for all skills.

- [ ] **Task 1.4: Implement the Agent Processor**
  - Create `src/agent/processor.py`.
  - Implement the `AgentProcessor` class.
  - The processor should have a mechanism to register skills and a primary method to process a command by executing the skills in a defined sequence. It will manage the shared `context` dictionary.

### Phase 2: API Integration

This phase establishes the communication channel between the frontend and the new agent.

- [ ] **Task 2.1: Create New API Endpoint**
  - Create a new file, e.g., `src/api/agent_routes.py`.
  - Define and register the `POST /api/agent/command` endpoint using FastAPI.
  - Ensure the new route is included in the main application router.

- [ ] **Task 2.2: Basic Endpoint-to-Processor Integration**
  - In the new endpoint, implement the logic to:
    1. Receive the `CommandRequest`.
    2. Instantiate the `AgentProcessor`.
    3. Pass the command to the processor.
    4. Return a standardized `AgentResponse`.
  - Initially, the processor will have no skills and will return a dummy success message.

### Phase 3: Initial Skill Development

This phase involves building the first versions of the essential skills. These may start as simple, rule-based implementations.

- [ ] **Task 3.1: Implement `TranslationSkill`**
  - Create `src/agent/skills/translation_skill.py`.
  - For the initial version, this can be a passthrough skill that assumes the input is English.

- [ ] **Task 3.2: Implement `IntentRecognitionSkill`**
  - Create `src/agent/skills/intent_recognition_skill.py`.
  - Use a simple keyword-matching approach to identify intents (e.g., "create", "add", "remind me to" -> `CREATE_TODO`).

- [ ] **Task 3.3: Implement `RecurrenceExtractionSkill`**
  - Create `src/agent/skills/recurrence_extraction_skill.py`.
  - Use keyword-matching to identify recurrence patterns (e.g., "everyday", "daily" -> `daily`).

- [ ] **Task 3.4: Implement `TemporalExtractionSkill`**
  - Create `src/agent/skills/temporal_extraction_skill.py`.
  - Integrate a library like `dateparser` to handle natural language date/time expressions.

- [ ] **Task 3.5: Implement `ActionMappingSkill`**
  - Create `src/agent/skills/action_mapping_skill.py`.
  - This skill will consolidate the `intent` and `entities` from the context and format the final dictionary that `todo_service.py` expects.

### Phase 4: End-to-End Integration & Testing

This phase connects the agent to the existing business logic and ensures the entire system works as expected.

- [ ] **Task 4.1: Integrate with `todo_service.py`**
  - Update the `AgentProcessor` to use the output from the `ActionMappingSkill`.
  - The processor will dynamically call the correct method on an instance of `TodoService` (e.g., `todo_service.create_todo(**data)`).

- [ ] **Task 4.2: Implement Error Handling**
  - Implement the error handling logic as defined in `spec.md`.
  - The agent should return meaningful 400-level errors if intent is unclear or entities are missing.

- [ ] **Task 4.3: Write Unit Tests**
  - Create tests for each individual skill to verify its logic in isolation.
  - Test the `AgentProcessor`'s ability to orchestrate the skill pipeline correctly.

- [ ] **Task 4.4: Write Integration Tests**
  - Create integration tests for the `POST /api/agent/command` endpoint.
  - These tests should send realistic natural language commands and assert that the correct database operations are performed.

### Phase 5: Refinement & Documentation

This final phase focuses on improving the implementation and ensuring it is maintainable.

- [ ] **Task 5.1: Add Docstrings and Type Hinting**
  - Ensure all new classes, methods, and functions have clear docstrings.
  - Verify complete and correct type hinting throughout the new agent module.

- [ ] **Task 5.2: Refine Skill Logic**
  - Re-evaluate the simple, rule-based logic in the skills and explore more robust NLP techniques if necessary.

- [ ] **Task 5.3: Final Code Review**
  - Conduct a thorough code review of the entire agent implementation to ensure it adheres to project standards and the technical specification.
