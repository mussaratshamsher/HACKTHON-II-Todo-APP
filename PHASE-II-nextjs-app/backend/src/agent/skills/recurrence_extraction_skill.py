from typing import Dict, Any
from .base_skill import BaseSkill

class RecurrenceExtractionSkill(BaseSkill):
    """
    A skill to extract recurrence patterns (e.g., "daily", "weekly") from the command string.
    """
    def execute(self, context: Dict[str, Any]) -> Dict[str, Any]:
        """
        Analyzes the command in the context to identify and set recurrence patterns.

        Args:
            context (Dict[str, Any]): The current processing context.

        Returns:
            Dict[str, Any]: The updated context, potentially with a "recurrence" key.
        """
        command = context.get("command", "").lower()
        if "daily" in command:
            context["recurrence"] = "daily"
        elif "weekly" in command:
            context["recurrence"] = "weekly"
        return context
