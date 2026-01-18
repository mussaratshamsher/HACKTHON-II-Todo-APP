from typing import List, Dict, Any
from sqlmodel import Session
from .skills.base_skill import BaseSkill
from src.services.todo_service import create_todo
from src.models import TodoCreate

class AgentProcessor:
    def __init__(self, skills: List[BaseSkill]):
        self.skills = skills

    async def process(self, context: Dict[str, Any], db_session: Session) -> Dict[str, Any]:
        # 🧠 Run skills
        for skill in self.skills:
            context = await skill.execute(context)

        action = context.get("action")
        parameters = context.get("parameters") or {}

        if action:
            match action:
                case "create_todo":
                    try:
                        todo_to_create = TodoCreate(
                            title=parameters["title"],
                            description=parameters.get("description"),
                            due_date=parameters.get("due_date"),
                            priority=parameters.get("priority"),
                            user_id=context.get("user_id"),  # ✅ attach user
                        )

                        created_todo = create_todo(
                            session=db_session,
                            todo=todo_to_create,
                        )

                        context["assistant_reply"] = (
                            f"Todo '{created_todo.title}' created successfully!"
                        )
                        context["todo_item"] = created_todo  # ✅ NOT dict

                    except Exception as e:
                        context["assistant_reply"] = f"Failed to create todo: {str(e)}"

                case _:
                    context["assistant_reply"] = f"Unknown action: {action}"

        # 🧯 Always return a reply
        if "assistant_reply" not in context:
            context["assistant_reply"] = "I’ve processed your request."

        return context
