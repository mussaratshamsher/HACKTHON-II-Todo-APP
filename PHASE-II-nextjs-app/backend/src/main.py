from contextlib import asynccontextmanager
import firebase_admin
from firebase_admin import credentials
from fastapi import FastAPI
from sqlmodel import SQLModel
from .database import engine
from fastapi.middleware.cors import CORSMiddleware
from .api.routes import router as todo_router
from .api.agent_routes import router as agent_router
from .api.user_routes import router as user_router
import uvicorn
import os
from dotenv import load_dotenv
import json

# Load environment variables from .env file
dotenv_path = os.path.join(os.path.dirname(__file__), '..', '.env')
load_dotenv(dotenv_path=dotenv_path)


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize Firebase Admin SDK
    cred_json = os.getenv("FIREBASE_SERVICE_ACCOUNT_KEY_JSON")
    if not cred_json:
        raise ValueError("FIREBASE_SERVICE_ACCOUNT_KEY_JSON environment variable not set.")
    
    cred_dict = json.loads(cred_json)
    cred = credentials.Certificate(cred_dict)
    firebase_admin.initialize_app(cred)
    # Create tables on startup
    SQLModel.metadata.create_all(engine)
    yield
    # Cleanup on shutdown if needed
    pass


app = FastAPI(
    title="Todo API",
    description="A simple Todo API built with FastAPI and SQLModel",
    version="1.0.0",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json"
)

# CORS middleware
origins = [
    "http://localhost:3000",
    "http://localhost:3001",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Include the todo routes
app.include_router(todo_router, prefix="/api", tags=["todos"])
app.include_router(agent_router, prefix="/api/agent", tags=["agent"])
app.include_router(user_router, prefix="/api/users", tags=["users"])


@app.get("/")
def read_root():
    return {"message": "Welcome to the Todo API"}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)