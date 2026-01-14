from typing import List, Dict, Any
from sqlmodel import Session
from .skills.base_skill import BaseSkill
from src.services.todo_service import create_todo
from src.models import TodoCreate

class AgentProcessor:
    """
    Orchestrates the execution of various skills to process a command
    and dispatches actions to the TodoService based on the processed context.
    """
    def __init__(self, skills: List[BaseSkill]):
        """
        Initializes the AgentProcessor with a list of skills.

        Args:
            skills (List[BaseSkill]): A list of skill instances to be executed.
        """
        self.skills = skills

    async def process(self, context: Dict[str, Any], db_session: Session) -> Dict[str, Any]:
        """
        Processes a given command by executing each skill sequentially
        and then performing an action based on the gathered context.

        Args:
            context (Dict[str, Any]): The initial context containing the command and any other relevant information.
            db_session (Session): The database session for performing database operations.

        Returns:
            Dict[str, Any]: The final context after all skills have executed and an action (if any) has been performed.
        """
        for skill in self.skills:
            context = await skill.execute(context)
        
        action = context.get("action")
        parameters = context.get("parameters")

        if action and parameters:
            match action:
                case "create_todo":
                    try:
                        # The TodoCreate model expects a datetime object for due_date, not a string.
                        todo_to_create = TodoCreate(
                            title=parameters["title"],
                            description=parameters.get("description"),
                            due_date=parameters.get("due_date"),
                            priority=parameters.get("priority")
                            # 'recurrence' is not part of TodoCreate model, so it's omitted.
                        )

                        created_todo = create_todo(
                            session=db_session,
                            todo=todo_to_create
                        )
                        context["assistant_reply"] = f"Todo '{created_todo.title}' created successfully!"
                        context["todo_item"] = created_todo.model_dump()
                    except Exception as e:
                        context["assistant_reply"] = f"Failed to create todo: {str(e)}"
                case _:
                    context["assistant_reply"] = f"Unknown action: {action}"
        
        return context
