# Tasks: Phase II Todo Backend

**Input**: Design documents from `/specs/001-phase2-todo-backend/`
**Prerequisites**: plan.md (required), spec.md (required for user stories)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create project structure `src/`, `tests/`, `src/api/`, `src/services/` per implementation plan
- [ ] T002 Initialize Python project with  `pip` install (FastAPI, SQLModel, Psycopg2-binary, Uvicorn)
- [ ] T003 [P] Create `.env` with `DATABASE_URL` placeholder

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T004 Setup database engine and session management in `src/database.py`
- [ ] T005 [P] Implement base SQLModel class and lifespan events in `src/main.py`
- [ ] T006 [P] Configure global error handlers and basic logging in `src/main.py`
- [ ] T007 Create FastAPI app instance and include router placeholder in `src/main.py`

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Create and View Todos (Priority: P1) 🎯 MVP

**Goal**: Allow users to keep track of tasks by creating and listing them.

**Independent Test**: Create 3 todos via POST, then GET /todos and verify all 3 return correctly.

### Implementation for User Story 1

- [ ] T008 [P] [US1] Define `Todo` model with `created_at` and `modified_at` in `src/models.py`
- [ ] T009 [US1] Implement `create_todo` and `get_todos` in `src/services/todo_service.py`
- [ ] T010 [US1] Create POST /todos and GET /todos endpoints in `src/api/routes.py`
- [ ] T011 [US1] Integration test: Verify CRUD lifecycle for creation/viewing in `tests/test_todos.py`

**Checkpoint**: User Story 1 (MVP) is fully functional and testable independently.

---

## Phase 4: User Story 2 - Manage Individual Todos (Priority: P2)

**Goal**: Essential task lifecycle management (view details, update, delete).

**Independent Test**: POST a todo, PUT its "completed" status to true, then DELETE it and verify it's gone.

### Implementation for User Story 2

- [ ] T012 [US2] Implement `get_todo_by_id`, `update_todo`, and `delete_todo` in `src/services/todo_service.py`
- [ ] T013 [US2] Create GET /todos/{id}, PUT /todos/{id}, and DELETE /todos/{id} endpoints in `src/api/routes.py`
- [ ] T014 [US2] Add 404 handling for invalid IDs in service and endpoints
- [ ] T015 [US2] Integration test: Verify update and delete flows in `tests/test_todos.py`

**Checkpoint**: User Story 2 is fully functional.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T016 [P] Verify Swagger documentation at `/docs` matches spec requirements
- [ ] T017 Final code cleanup and dependency verification
- [ ] T018 Ensure all endpoints follow RESTful conventions and return valid JSON

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Can start immediately.
- **Foundational (Phase 2)**: Depends on Setup - BLOCKS all user stories.
- **User Stories (Phase 3+)**: Depend on Foundational completion. US1 should be done before US2 for clean model evolution.

### Parallel Opportunities

- T003 (Env setup) can run with T002 (Init).
- T005, T006 (Main setup) can run in parallel.
- T008 (Model) can be worked on while setting up routes placeholder if needed.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 & 2.
2. Implement US1 (POST/GET).
3. **STOP and VALIDATE**: Verify data persistence in Neon Postgres.
