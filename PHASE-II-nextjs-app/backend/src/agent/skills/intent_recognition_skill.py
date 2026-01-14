from typing import Dict, Any
from .base_skill import BaseSkill

class IntentRecognitionSkill(BaseSkill):
    """
    A skill responsible for recognizing the user's intent from the command string.
    It identifies keywords or phrases to determine the primary goal of the user's request.
    """
    async def execute(self, context: Dict[str, Any]) -> Dict[str, Any]:
        """
        Analyzes the command in the context to identify and set the user's intent.

        Args:
            context (Dict[str, Any]): The current processing context.

        Returns:
            Dict[str, Any]: The updated context, potentially with an "intent" key.
        """
        command = context.get("command", "").lower()
        
        # More flexible intent recognition
        create_triggers = [
            "create a new todo", "add a todo", "add a new task", 
            "add task", "new todo", "add a task", "create a task", "new task"
        ]
        
        if any(trigger in command for trigger in create_triggers):
            context["intent"] = "CREATE_TODO"
            
        return context
