---
id: 001
title: Establish Phase II Project Constitution
stage: constitution
date: 2026-01-03
surface: agent
model: claude-sonnet-4-5-20250929
feature: none
branch: main
user: current
command: /sp.constitution
labels: [architecture, backend, governance]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - D:\Agentic-Hackthon\Hackthon-II-Todo-App\PHASE-II-nextjs-app\backend\.specify\memory\constitution.md
tests:
  - Validation of blueprint placeholders
---

## Prompt

"You are a senior backend architect.
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
and allows safe extension in Phase III (AI integration)."

## Response snapshot

Created the Phase II Project Constitution (v1.0.0) with strict rules focusing on backend authority, decoupling, and contract stability. Established constraints for the FastAPI/SQLModel/Neon stack and prohibited frontend-dependent logic. Updated Sync Impact Report to reflect template alignment.

## Outcome

- ✅ Impact: Established definitive governance for Phase II development.
- 🧪 Tests: No execution-based tests required; template validation passed.
- 📁 Files: Updated .specify/memory/constitution.md.
- 🔁 Next prompts: /sp.specify for initial feature set.
- 🧠 Reflection: Direct, strict rules will effectively prevent the "frontend-first" trap common in full-stack hackathons.

## Evaluation notes (flywheel)

- Failure modes observed: None.
- Graders run and results (PASS/FAIL): N/A.
- Prompt variant (if applicable): N/A.
- Next experiment: N/A.
