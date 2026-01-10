from contextlib import asynccontextmanager
from fastapi import FastAPI
from sqlmodel import SQLModel
from src.database import engine
from fastapi.middleware.cors import CORSMiddleware
from src.api.routes import router
import uvicorn


@asynccontextmanager
async def lifespan(app: FastAPI):
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
app.include_router(router, prefix="/api", tags=["todos"])


@app.get("/")
def read_root():
    return {"message": "Welcome to the Todo API"}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)