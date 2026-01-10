# Constitution:
You are a senior frontend architect.
Create a FRONTEND CONSTITUTION for Phase II of a Todo Application.
Scope:
- Frontend ONLY
- Stack: Next.js (App Router), modern React
- Backend is already completed and frozen
NON-NEGOTIABLE RULES:
1. Frontend communicates with backend ONLY via HTTP API.
2. Backend database schema and API contract must not be changed.
3. No direct database access from frontend.
4. API base URL must be configurable via environment variables.
5. UI logic and data-fetching logic must be separated.
6. Reusable components are mandatory.
7. Application must be responsive and accessible.
8. UI must be interactive, professional, and engaging.
9. All CRUD actions must reflect backend state accurately.
10. Frontend must run independently of backend.
11. No authentication (out of scope).
12. No AI logic in frontend (reserved for Phase III).
UI PRINCIPLES:
- Clean and modern layout
- Interactive navbar with engaging buttons
- Professional footer
- Attractive hero section on homepage
- Clear user flows for Add, View, Edit ,complete, and delete todos
DATA FLOW RULES:
- User actions trigger API requests
- Backend responses are the single source of truth
- State updates must reflect API responses
FORMAT:
- Title
- Short introduction
- Numbered rules
- Clear, strict language
- No implementation details
- No backend code
- No task list
GOAL:
A stable, reusable, visually engaging frontend constitution
that cleanly consumes a frozen backend API and is ready
for future AI chatbot integration.
# Specification
You are a senior frontend engineer.
Create a FRONTEND TECHNICAL SPECIFICATION for Phase II of a Todo Application,
fully compliant with the approved Frontend Constitution.
Scope:
- Frontend ONLY
- Stack: Next.js (App Router), modern React
- Backend API is completed, frozen, and runs locally
INCLUDE:
1. Project folder structure
2. Application entry and routing overview
3. Environment variable usage for backend API URL
4. API service layer design for communicating with backend
5. Data model alignment with backend Todo schema
6. Reusable UI components:
   - Navbar
   - Hero section
   - Todo form (Add / Edit)
   - Todo list
   - Todo item
   - Footer
7. User flows:
   - View todos
   - Add todo
   - Edit todo
   - Update todo state
8. State management approach
9. Error handling and loading states
10. Responsive and accessibility considerations
11. Local development workflow
12. Phase II frontend freeze checklist
EXCLUSIONS:
- No backend code
- No database logic
- No authentication
- No AI or chatbot logic
- No deployment configuration
FORMAT:
- Clear section headings
- Bullet points
- Short explanations
- Clean and readable
- No task breakdown
- No implementation code
GOAL:
A clear, maintainable frontend specification that consumes
a frozen backend API, delivers an engaging user experience,
and is ready for future AI chatbot integration.

# fixing issues:
you will behave as an expert developer and fix issues that i am facing: first the main issue i did not like  
  the UI of the frontend app- so make it unique and professional - here is frontend:
  d:\Agentic-Hackthon\Hackthon-II-Todo-App\PHASE-II-nextjs-app\frontend\frontend-app  2-second is backend is
  not opened on swagger UI - fix the issues what could be possible:
  d:\Agentic-Hackthon\Hackthon-II-Todo-App\PHASE-II-nextjs-app\backend\src  3- third backend has connection
  with neon db and user fills the form fields in frontend- this will communicate to backend API on local Url
  and backend will communicate and save that user data to neon db -- all this setup will work on free tier-
  fix all these issues by diving them into tasks and then fullfill them carefully to resolve all my issues