# Project Structure: 
hackathon-todo/
│
├── phase-1-cli/                 # (already done, read-only)
│   └── README.md
│
├── backend/                     # FastAPI backend
│   ├── app/
│   │   ├── main.py
│   │   ├── api/
│   │   │   └── todos.py
│   │   ├── models/
│   │   │   └── todo.py
│   │   ├── db/
│   │   │   └── session.py
│   │   └── services/
│   ├── tests/
│   ├── Dockerfile
│   └── README.md
│
├── frontend/                    # Next.js app
│   ├── app/
│   ├── components/
│   ├── services/
│   ├── tailwind.config.js
│   └── README.md
│
├── ai-agent/                    # Phase III (Chatbot)
│   ├── agents/
│   ├── skills/
│   ├── mcp/
│   └── README.md
│
├── infra/                       # Phase IV & V
│   ├── docker/
│   ├── k8s/
│   ├── helm/
│   ├── kafka/
│   └── dapr/
│
├── docs/                        # Architecture + phase docs
│
└── README.md                    # Hackathon overview

# Phase 1 - CLI todo

# Phase 2 - Backend
  ✅ Phase II Steps (Strict Order)
## Step 1 — Backend Only
Create FastAPI app
/todos CRUD endpoints
SQLModel models
Local SQLite first (simplify)
✔ Test via Swagger
✔ Freeze backend
## Step 2 — Database Upgrade
Switch SQLite → Neon Postgres
Migrations (optional)
✔ Test persistence
✔ Freeze DB schema
## Step 3 — Frontend
Next.js UI
Add / List / Update / Delete todos
API service layer
✔ Manual UI testing
✔ Freeze frontend
## Phase II Completion Criteria
Backend & frontend running separately
API documented
Phase II README written

# Phase 3 - Chatbot
Phase III — AI-Powered Todo Chatbot
🎯 Goal
Control todos via natural language
“Add a task to buy groceries tomorrow”
Stack
OpenAI ChatKit
OpenAI Agents SDK
MCP SDK
## What to Build
### Todo Agent
### Agent Skills:
create_todo
list_todos
update_todo
Agent talks to existing backend API
## Phase III Steps
Step 1 — Agent Without UI
CLI / API-based agent
Prompt → tool → backend
✔ Validate reasoning  ✔ Freeze agent logic
## Step 2 — Chat UI
Integrate with frontend
Chat panel on todo page
✔ End-to-end test  ✔ Freeze Phase III
## Bonus Ready Here
Reusable Agent Skills -- Urdu support

# Phase 4 - Infrastructure
## Phase IV — Local Kubernetes Deployment
🎯 Goal
Run your system like production locally
Stack
Docker
Minikube
Helm
kubectl-ai
kagent
# Phase IV Steps
Step 1 — Dockerize Everything
Backend Dockerfile
Frontend Dockerfile
Agent Dockerfile
✔ Containers run locally
## Step 2 — Kubernetes
Deployment + Service YAML
Minikube expose services
✔ Access app via Minikube IP
## Step 3 — Helm
Helm charts for each service
Values.yaml per env
✔ One-command deployment

# 🔴 Phase V — Advanced Cloud Deployment
🎯 Goal
Cloud-native, scalable, event-driven system
Stack
DigitalOcean DOKS
Kafka
Dapr
## Phase V Steps
### Step 1 — Cloud K8s
Create DOKS cluster
Push images to registry
✔ App running on cloud
### Step 2 — Kafka
Emit events:
todo.created
todo.completed
Consumer for analytics / logs
### Step 3 — Dapr
Service-to-service calls
Pub/Sub via Kafka
Secrets management
✔ True microservice architecture