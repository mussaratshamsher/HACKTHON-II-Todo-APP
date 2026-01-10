<!--
Sync Impact Report:
Version change: [NEW] → 1.0.0
List of modified principles: Initial set established based on Phase II requirements.
Added sections: Core Principles, Technical Stack & Constraints, Development Workflow.
Removed sections: None (new document from template).
Templates requiring updates:
- .specify/templates/plan-template.md (✅ updated)
- .specify/templates/spec-template.md (✅ updated)
- .specify/templates/tasks-template.md (✅ updated)
Follow-up TODOs: None.
-->

# Phase II Hackathon Todo Application Constitution

This document defines the non-negotiable rules for the Phase II development of the Hackathon Todo Application.
It establishes the backend authority, architectural boundaries, and technical standards required for
a stable foundation for future AI integrations.

## Core Principles

### I. Backend Authority
The backend API is the single source of truth for all application state and logic. Database access
is strictly prohibited except through the authorized backend service. Frontend assumptions or code
must never influence backend architecture or logic.

### II. Implementation Decoupling
Business logic must remain strictly separated from API route handlers. Service layers, utility
functions, and models must be capable of running independently of the web framework. The backend
must function completely without any frontend presence.

### III. Contract Stability
The REST API contract, as defined by the Swagger documentation (/docs), is the official and
authoritative specification. Once the schema and endpoints are frozen, changes are strictly
forbidden to ensure consumer stability and forward compatibility.

### IV. Production Integrity
Neon Postgres is the exclusive production database. All database models must be implemented
using SQLModel. Schema modifications are prohibited following the development freeze to
maintain data integrity and migration reliability.

### V. Security & Environment
All sensitive configurations, credentials, and secrets must be managed exclusively through
environment variables. Credentials must never be hardcoded or committed to version control.

## Technical Stack & Constraints

- **Language & Framework**: FastAPI (Python)
- **ORM/Modeling**: SQLModel
- **Database**: Neon Postgres
- **Documentation**: Swagger/OpenAPI (/docs)
- **Scope Limitation**: Authentication and Authorization are explicitly out of scope for Phase II.

## Development Workflow

- Every significant architectural decision must be proposed for an ADR.
- All code changes must strictly follow the specifications, plans, and tasks defined in SpecKit Plus.
- Prompt History Records (PHRs) must be generated for every interaction to ensure full auditability.

## Governance

This constitution supersedes all other development practices. Amendments to these rules require
extraordinary justification, documentation of trade-offs, and explicit architectural approval.
Compliance is verified during every PR review and automated check.

**Version**: 1.0.0 | **Ratified**: 2026-01-03 | **Last Amended**: 2026-01-03
