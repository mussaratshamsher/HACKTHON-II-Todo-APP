from abc import ABC, abstractmethod
from typing import Dict, Any

class BaseSkill(ABC):
    """
    Abstract base class defining the interface for all skills in the agent system.
    All concrete skills must inherit from this class and implement the 'execute' method.
    """
    @abstractmethod
    def execute(self, context: Dict[str, Any]) -> Dict[str, Any]:
        """
        Executes the skill's logic, processes the given context, and returns an updated context.

        Args:
            context (Dict[str, Any]): The current processing context, containing command details and intermediate results.

        Returns:
            Dict[str, Any]: The updated context after the skill's execution.
        """
        pass
