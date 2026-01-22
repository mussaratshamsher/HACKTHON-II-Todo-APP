from sqlmodel import create_engine, Session
from typing import Generator
import os
from dotenv import load_dotenv

# Load environment variables from .env file for local development
load_dotenv()

# --- PostgreSQL Database Configuration ---
# Railway provides the DATABASE_URL environment variable automatically
# when a PostgreSQL service is linked.
# For local development, you should have a .env file with a DATABASE_URL.
# Example for a local PostgreSQL instance:
# DATABASE_URL="postgresql://user:password@localhost:5432/mydatabase"

DATABASE_URL = os.getenv("DATABASE_URL")

# Check if the DATABASE_URL is set, which is crucial for production
if DATABASE_URL is None:
    # As a fallback for environments where DATABASE_URL might not be set,
    # let's try to build it from individual components.
    # This is also useful for services that provide individual connection params.
    DB_USER = os.getenv("DB_USER")
    DB_PASSWORD = os.getenv("DB_PASSWORD")
    DB_HOST = os.getenv("DB_HOST")
    DB_PORT = os.getenv("DB_PORT", "5432")  # Default PostgreSQL port
    DB_NAME = os.getenv("DB_NAME")

    if all([DB_USER, DB_PASSWORD, DB_HOST, DB_NAME]):
        DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
    else:
        # If we are in a production environment (indicated by the presence of a PORT env var on Railway)
        # and there's no database URL, it's a critical error.
        if "PORT" in os.environ:
            raise ValueError(
                "CRITICAL: No DATABASE_URL found in the environment. "
                "Please link a PostgreSQL service in Railway or set the DATABASE_URL manually."
            )
        # For local development, fallback to a local SQLite database if no remote DB is configured.
        # This makes it easier for new developers to get started without setting up PostgreSQL.
        print("WARNING: No PostgreSQL database configuration found. Falling back to a local SQLite database.")
        print("For production, please set the DATABASE_URL environment variable.")
        DATABASE_URL = "sqlite:///test.db"


# The 'echo=True' setting is useful for debugging, as it prints all SQL
# statements. You might want to remove it in production for cleaner logs.
engine = create_engine(DATABASE_URL, echo=True)

def get_session() -> Generator[Session, None, None]:
    """
    Dependency to get a database session.
    Yields a session to be used in a single request.
    """
    with Session(engine) as session:
        yield session