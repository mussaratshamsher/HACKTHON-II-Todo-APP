# constitution
You are a senior backend architect.
Create a constitution for Phase II of a Hackathon Todo Application.
This document defines NON-NEGOTIABLE RULES.
It must be short, strict, and authoritative.
Scope:
- Backend ONLY
- Stack: FastAPI, SQLModel, Neon Postgres
REQUIREMENTS:
1. Backend is the single source of truth.
2. Database is accessed ONLY through the backend API.
3. Neon Postgres is the only production database.
4. SQLModel is used for all database models.
5. REST API endpoints are stable after freeze.
6. Swagger (/docs) is the official API contract.
7. Business logic is separated from route handlers.
8. Environment variables are used for secrets.
9. Backend runs independently of frontend.
10. Schema changes are forbidden after freeze.
11. No authentication or authorization (out of scope).
12. No frontend assumptions in backend code.
FORMAT:
- Title
- Short introduction (2–3 lines)
- Numbered rules
- Clear, strict language
- No implementation details
- No frontend content
- No code blocks
GOAL:
A constitution that prevents scope creep, enforces discipline,
and allows safe extension in Phase III (AI integration).
# specification 
You are a senior backend engineer.
Create a specification for Phase II of a Hackathon Todo Application,
fully compliant with the approved Constitution.
Scope:
- Backend ONLY
- Stack: FastAPI, SQLModel, Neon Postgres
INCLUDE:
1. Simple and Project folder structure
2. Application entry point overview
3. Database connection strategy using SQLModel
4. Environment variable usage (DATABASE_URL)
5. Todo data model:
   - id
   - title
   - description
   - completed
   - created_at
   - modified_at
6. REST API design:
   - POST /todos
   - GET /todos
   - GET /todos/{id}
   - PUT /todos/{id}
   - DELETE /todos/{id}
7. Request and response schemas
8. Error handling approach
9. Swagger documentation usage
10. Local development workflow
11. Production readiness notes
12. Phase II freeze checklist
EXCLUSIONS:
- No frontend code
- No authentication
- No background jobs
- No migrations tooling unless optional
- No AI logic
FORMAT:
- Clear section headings
- Bullet points
- Short explanations
- Minimal but complete
- No unnecessary abstractions
GOAL:
A clean, readable, specification.
# implementation 
  act as backend expert devleloper and read the file properly and then start completing
   task --
   d:\Agentic-Hackthon\Hackthon-II-Todo-App\PHASE-II-nextjs-app\backend\specs\001-phase2-
   todo-backend\tasks.md   . 1- you will use this Neon Url connection: psql
   'postgresql://neondb_owner:npg_1TawDszS2MEU@ep-spring-credit-ahpudzb1-pooler.c-3.us-ea
   st-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require' 2- specifications:
   fastapi - neon db - and SQL lite Model -- Create simple file structure and i don't
   want any test file or extra configurations- do implentation of the task properly 
# neon
npx neonctl@latest init
Neon Connection URL = psql 'postgresql://neondb_owner:npg_1TawDszS2MEU@ep-spring-credit-ahpudzb1-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'

# agent and reuseable intelligence
Persona: You are a Lead Software Architect specializing in AI-powered, service-oriented systems.  
  Your task is to create a detailed technical specification document for a new "Agent" component within an existing application.
  Background Context:
  We are developing a "Phase-3" enhancement for a Todo application. The current stack consists of:  
   1. Frontend: A Next.js application (frontend/frontend-app) that will provide a chat-based UI for 
      user interaction. It will capture user commands as text (including from voice-to-text
      conversion) and send them to the backend.
   2. Backend: A Python/FastAPI application (backend/src) that currently exposes RESTful endpoints  
      for standard CRUD operations on Todos. It uses a todo_service.py module to interact with the  
      database, based on Pydantic models defined in models.py.
  Primary Goal:
  Design an "Agent" to be located at backend/src/agent. This agent will act as an intelligent command-processing layer. It will receive natural language commands from the frontend, understand the user's intent and details, and translate them into structured actions that can be executed by our existing todo_service.py. The core design principle is Reusable Intelligence, meaning the agent should be composed of modular, independent "skills" that can be extended over time.
  Key Requirements for the Agent:
   1. Natural Language Understanding (NLU): The agent must parse unstructured text commands (e.g.,  
      "buy milk everyday", "remind me to call the doctor tomorrow at 2pm", "ارود میں ایک ٹاسک شامل  
      کریں").
   2. Intent Recognition: It must identify the user's primary goal (e.g., CREATE_TODO,
      MARK_TODO_AS_DONE, QUERY_TODOS).
   3. Entity Extraction: It must extract key details (entities) from the command, such as the task  
      content (buy milk), due dates (tomorrow), times (2pm), and recurrence (everyday).
   4. Skill-Based Architecture (Reusable Intelligence): The agent's logic must be broken down into a
      collection of discrete, single-purpose "skills". Examples of initial skills include:
       * TranslationSkill: Detects non-English languages (like Urdu) and translates them to English 
         for processing.
       * IntentRecognitionSkill: Determines the primary action the user wants to take.
       * TemporalExtractionSkill: Parses and normalizes dates and times (e.g., "tomorrow" becomes   
         YYYY-MM-DD).
       * RecurrenceExtractionSkill: Identifies recurring patterns (everyday, weekly).
       * ActionMappingSkill: Gathers the output from all other skills and formats the final
         structured data object required by todo_service.py.
   5. Integration: The agent must seamlessly integrate with the existing todo_service.py, calling   
      its methods with the correctly formatted Pydantic models.
   6. Extensibility: The architecture must make it simple to add new skills (e.g., a
      PriorityDetectionSkill or a ProjectTaggingSkill) in the future without refactorin the entire agent.
  Required Output Format:
Generate a formal specification document with the following sections:
  ---
  Technical Specification: Phase-3 Todo Agent
  1. Overview
   * A brief, high-level summary of the agent's purpose and its role within the backend system.
  2. Architectural Placement & Directory Structure
   * Confirm the agent's location at backend/src/agent.
   * Propose a clear and scalable directory structure for the agent and its skills (e.g.,
     agent/skills/, agent/models.py, agent/processor.py).
  3. Core Concepts & Terminology
   * Define the key components of the architecture:
       * Agent Processor: The main orchestrator that receives the command and routes it through the skills.
       * Skill: A self-contained class or module that performs one specific NLU task. Define a standard interface for a Skill (e.g., an execute(text: str) -> dict method).
          * Intent: The user's primary goal (e.g., CREATE_TODO).
       * Entity: A piece of specific information extracted from the command (e.g., {"entity":
         "task_content", "value": "buy milk"}).
  4. Detailed Data Flow
   * Provide a step-by-step description of the data flow for processing a command like "buy milk
     everyday".
       1. Frontend sends {"command": "buy milk everyday"} to the new API endpoint.
       2. The Agent Processor receives the command.
       3. It passes the command to the TranslationSkill (which does nothing in this case).
       4. It passes the command to the IntentRecognitionSkill, which returns {"intent":
          "CREATE_TODO"}.
       5. It passes the command to various extraction skills (TemporalExtractionSkill,
          RecurrenceExtractionSkill), which return entities.
       6. The ActionMappingSkill receives all intents and entities, validates them, and constructs
          the final data object for the todo_service.
       7. The Agent Processor calls the appropriate todo_service method (e.g.,
          create_todo(structured_data)).
       8. A success/failure response is returned to the API endpoint.
  5. Proposed `Skill` Implementations
   * For each of the required skills (Translation, Intent Recognition, etc.), provide a brief
     description of its responsibility, its input, and its expected output format (in JSON/dict).
  6. API Contract
   * Define the new API endpoint for the agent.
       * Endpoint: POST /api/agent/command
       * Request Body:
   1         {
   2           "command": "string",
   3           "session_id": "string (optional)"
   4         }
       * Success Response (200 OK):

   1         {
   2           "status": "success",
   3           "message": "Todo created successfully.",
   4           "data": { ... } // The created Todo object
   5         }
       * Failure Response (400 Bad Request):
   1         {
   2           "status": "error",
   3           "message": "Sorry, I didn't understand that. Could you please rephrase?"
   4         }
  7. Error Handling & Ambiguity
   * Describe the strategy for when an intent is unclear or required entities are missing (e.g.,
     "remind me to do something" has no task). The agent should be designed to eventually support
     follow-up questions, but for now, it should return a helpful error message.
     
# chat UI: 
Prompt: Integrate a Command-based Chat UI in Next.js

  Objective:

  Create a new chat interface on a /agent page in my Next.js application. This UI will accept
  user commands to create todos by sending them to my backend agent.

  Key Requirements:

   1. Create an "Agent Chat" Page:
       * Add a new page at /agent.
       * Add a link to this new page in the main Navbar.

   2. Build the Chat Component:
       * The component should have a message display area, a text input for commands, and a send
         button.
       * Use React state (useState) to manage the conversation history (user messages and agent
         replies).

   3. Implement the API Call:
       * When the user sends a message, make a POST request to
         http://1227.0.0.1:8000/api/agent/command.
       * The request body must be: { "command": "The user's input text", "context": {} }.       
       * Display the assistant_reply from the response in the chat UI.
       * After a successful command, the new todo should be visible when navigating to the main 
         /todos list.
# run backend
python -m uvicorn src.main:app --reload

 