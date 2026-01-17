from sqlmodel import Session, select
from src.models import Todo, TodoCreate, TodoUpdate
from typing import List, Optional
from sqlalchemy import or_


def create_todo(session: Session, todo: TodoCreate) -> Todo:
    db_todo = Todo(**todo.dict())
    session.add(db_todo)
    session.commit()
    session.refresh(db_todo)
    return db_todo


def get_todos(session: Session, user_id: str, offset: int = 0, limit: int = 100) -> List[Todo]:
    statement = select(Todo).where(Todo.user_id == user_id).offset(offset).limit(limit)
    todos = session.exec(statement).all()
    return todos


def get_todo_by_id(session: Session, todo_id: int) -> Optional[Todo]:
    statement = select(Todo).where(Todo.id == todo_id)
    todo = session.exec(statement).first()
    return todo


def update_todo(session: Session, todo_id: int, todo_update: TodoUpdate) -> Optional[Todo]:
    db_todo = get_todo_by_id(session, todo_id)
    if not db_todo:
        return None

    todo_data = todo_update.dict(exclude_unset=True)
    for key, value in todo_data.items():
        setattr(db_todo, key, value)

    session.add(db_todo)
    session.commit()
    session.refresh(db_todo)
    return db_todo


def delete_todo(session: Session, todo_id: int) -> bool:
    db_todo = get_todo_by_id(session, todo_id)
    if not db_todo:
        return False

    session.delete(db_todo)
    session.commit()
    return True


def search_todos(session: Session, query: str, user_id: str) -> List[Todo]:
    search_pattern = f"%{query}%"
    statement = select(Todo).where(
        Todo.user_id == user_id,
        or_(
            Todo.title.ilike(search_pattern),
            Todo.description.ilike(search_pattern)
        )
    )
    todos = session.exec(statement).all()
    return todos