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
# run backend
python -m uvicorn src.main:app --reload