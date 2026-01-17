from fastapi import APIRouter, Depends, HTTPException, Query
from sqlmodel import Session
from typing import List
from src.database import get_session
from src.models import Todo, TodoCreate, TodoUpdate, TodoResponse
from src.services.todo_service import (
    create_todo as create_todo_service,
    get_todos as get_todos_service,
    get_todo_by_id as get_todo_by_id_service,
    update_todo as update_todo_service,
    delete_todo as delete_todo_service,
    search_todos as search_todos_service,
)
from src.auth.dependencies import get_current_user
from typing import List


router = APIRouter()


@router.post("/todos", response_model=TodoResponse)
def create_todo_endpoint(
    todo: TodoCreate,
    session: Session = Depends(get_session),
    current_user: dict = Depends(get_current_user),
):
    todo.user_id = current_user["uid"]
    todo.created_by = "manual"
    db_todo = create_todo_service(session, todo)
    return db_todo


@router.get("/todos", response_model=List[TodoResponse])
def get_todos_endpoint(
    offset: int = 0,
    limit: int = 100,
    session: Session = Depends(get_session),
    current_user: dict = Depends(get_current_user),
):
    todos = get_todos_service(session, current_user["uid"], offset, limit)
    return todos


@router.get("/todos/{todo_id}", response_model=TodoResponse)
def get_todo_by_id_endpoint(
    todo_id: int,
    session: Session = Depends(get_session),
    current_user: dict = Depends(get_current_user),
):
    db_todo = get_todo_by_id_service(session, todo_id)
    if not db_todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    if db_todo.user_id != current_user["uid"]:
        raise HTTPException(status_code=403, detail="Not authorized to access this todo")
    return db_todo


@router.put("/todos/{todo_id}", response_model=TodoResponse)
def update_todo_endpoint(
    todo_id: int,
    todo: TodoUpdate,
    session: Session = Depends(get_session),
    current_user: dict = Depends(get_current_user),
):
    db_todo = get_todo_by_id_service(session, todo_id)
    if not db_todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    if db_todo.user_id != current_user["uid"]:
        raise HTTPException(status_code=403, detail="Not authorized to update this todo")
    db_todo = update_todo_service(session, todo_id, todo)
    return db_todo


@router.delete("/todos/{todo_id}")
def delete_todo_endpoint(
    todo_id: int,
    session: Session = Depends(get_session),
    current_user: dict = Depends(get_current_user),
):
    db_todo = get_todo_by_id_service(session, todo_id)
    if not db_todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    if db_todo.user_id != current_user["uid"]:
        raise HTTPException(status_code=403, detail="Not authorized to delete this todo")
    success = delete_todo_service(session, todo_id)
    if not success:
        raise HTTPException(status_code=404, detail="Todo not found")
    return {"message": "Todo deleted successfully"}


@router.get("/todos/search", response_model=List[TodoResponse])
def search_todos_endpoint(
    q: str = Query(..., min_length=1),
    session: Session = Depends(get_session),
    current_user: dict = Depends(get_current_user),
):
    todos = search_todos_service(session, q, current_user["uid"])
    return todos