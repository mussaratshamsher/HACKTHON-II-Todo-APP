from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from typing import List
from src.database import get_session
from src.models import Todo, TodoCreate, TodoUpdate, TodoResponse
from src.services.todo_service import (
    create_todo as create_todo_service,
    get_todos as get_todos_service,
    get_todo_by_id as get_todo_by_id_service,
    update_todo as update_todo_service,
    delete_todo as delete_todo_service
)

router = APIRouter()


@router.post("/todos", response_model=TodoResponse)
def create_todo_endpoint(todo: TodoCreate, session: Session = Depends(get_session)):
    db_todo = create_todo_service(session, todo)
    return db_todo


@router.get("/todos", response_model=List[TodoResponse])
def get_todos_endpoint(offset: int = 0, limit: int = 100, session: Session = Depends(get_session)):
    todos = get_todos_service(session, offset, limit)
    return todos


@router.get("/todos/{todo_id}", response_model=TodoResponse)
def get_todo_by_id_endpoint(todo_id: int, session: Session = Depends(get_session)):
    db_todo = get_todo_by_id_service(session, todo_id)
    if not db_todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    return db_todo


@router.put("/todos/{todo_id}", response_model=TodoResponse)
def update_todo_endpoint(todo_id: int, todo: TodoUpdate, session: Session = Depends(get_session)):
    db_todo = update_todo_service(session, todo_id, todo)
    if not db_todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    return db_todo


@router.delete("/todos/{todo_id}")
def delete_todo_endpoint(todo_id: int, session: Session = Depends(get_session)):
    success = delete_todo_service(session, todo_id)
    if not success:
        raise HTTPException(status_code=404, detail="Todo not found")
    return {"message": "Todo deleted successfully"}