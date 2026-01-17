from sqlmodel import SQLModel, Field, Relationship
from typing import Optional
from datetime import datetime


class TodoBase(SQLModel):
    title: str
    description: Optional[str] = None
    completed: bool = False
    priority: Optional[str] = None  # Added priority field
    due_date: Optional[datetime] = None  # Added due_date field
    user_id: Optional[str] = None


class Todo(TodoBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    modified_at: datetime = Field(default_factory=datetime.utcnow)
    created_by: Optional[str] = None


class TodoCreate(TodoBase):
    pass


class TodoUpdate(SQLModel):
    title: Optional[str] = None
    description: Optional[str] = None
    completed: Optional[bool] = None
    priority: Optional[str] = None  # Added priority field
    due_date: Optional[datetime] = None  # Added due_date field


class TodoResponse(TodoBase):
    id: int
    created_at: datetime
    modified_at: datetime
    created_by: Optional[str] = None