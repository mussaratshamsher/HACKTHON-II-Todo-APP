from typing import Dict, Any
from .base_skill import BaseSkill
from dateparser.search import search_dates

class TemporalExtractionSkill(BaseSkill):
    """
    A skill that extracts temporal information (dates and times) from the command string
    using the `dateparser` library. It finds the date/time expression and stores both
    the matched string and the parsed datetime object in the context.
    """
    async def execute(self, context: Dict[str, Any]) -> Dict[str, Any]:
        """
        Parses the command in the context for date and time expressions.

        Args:
            context (Dict[str, Any]): The current processing context.

        Returns:
            Dict[str, Any]: The updated context, potentially with 'found_temporal_str' and 'due_date'.
        """
        command = context.get("command", "")
        # search_dates returns a list of tuples: (matched_string, datetime_object)
        if command:
            found_dates = search_dates(command)
            
            if found_dates:
                # We'll use the first one found
                matched_string, datetime_obj = found_dates[0]
                context["found_temporal_str"] = matched_string
                context["due_date"] = datetime_obj # Keep it as a datetime object
        
        return context
