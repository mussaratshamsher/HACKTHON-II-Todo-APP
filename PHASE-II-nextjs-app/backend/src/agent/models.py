from pydantic import BaseModel
from typing import Dict, Any

class CommandRequest(BaseModel):
    """
    Represents a command sent to the agent.

    Attributes:
        command (str): The main command string for the agent to process.
        context (Dict[str, Any]): An optional dictionary providing additional context for the command.
    """
    command: str
    context: Dict[str, Any] = {}

class AgentResponse(BaseModel):
    """
    Represents the agent's response after processing a command.

    Attributes:
        action (str): The action identified or taken by the agent.
        parameters (Dict[str, Any]): A dictionary of parameters relevant to the identified action.
        assistant_reply (str): A natural language reply from the assistant.
        todo_item (Dict[str, Any] | None): The created to-do item, if any.
    """
    action: str
    parameters: Dict[str, Any]
    assistant_reply: str
    todo_item: Dict[str, Any] | None = None

