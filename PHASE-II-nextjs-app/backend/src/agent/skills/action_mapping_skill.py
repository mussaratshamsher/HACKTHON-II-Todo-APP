from typing import Dict, Any
from .base_skill import BaseSkill

class ActionMappingSkill(BaseSkill):
    """
    A skill responsible for mapping the recognized intent and extracted information
    into a structured action dictionary. It now cleans the task content by removing
    temporal expressions that have been separately processed.
    """
    def execute(self, context: Dict[str, Any]) -> Dict[str, Any]:
        """
        Analyzes the intent and extracted data to form a concrete action and its parameters.

        Args:
            context (Dict[str, Any]): The current processing context.

        Returns:
            Dict[str, Any]: The updated context, including "action" and "parameters".
        """
        intent = context.get("intent")
        
        if intent == "CREATE_TODO":
            command = context.get("command", "")
            content = command

            # More robust content extraction by removing trigger phrases
            triggers = ["create a new todo ", "add a todo ", "add task ", "new todo ", "remind me to "]
            for trigger in triggers:
                if command.lower().startswith(trigger):
                    content = command[len(trigger):].strip()
                    break

            # Clean the content by removing the found temporal expression
            found_temporal_str = context.get("found_temporal_str")
            if found_temporal_str:
                # Use a case-insensitive replace
                import re
                content = re.sub(re.escape(found_temporal_str), '', content, flags=re.IGNORECASE).strip()

            # Final clean up for dangling prepositions like 'at', 'on'
            content = content.strip()
            if content.endswith(" at") or content.endswith(" on"):
                content = content[:-3].strip()
            # Remove trailing commas or weird characters from stripping the date
            content = content.strip(' ,.').strip()


            if not content:
                context["action"] = "UNKNOWN"
                context["assistant_reply"] = "I need a task description to create a todo."
            else:
                context["action"] = "create_todo"
                context["parameters"] = {
                    "title": content,
                    "description": "", # Placeholder
                    "due_date": context.get("due_date"), # This is now a datetime object
                    "recurrence": context.get("recurrence"),
                }
                # The reply is now handled by the processor after the action is taken.
        else:
            context["action"] = "UNKNOWN"
            context["assistant_reply"] = "I don't understand your command."
            
        return context
