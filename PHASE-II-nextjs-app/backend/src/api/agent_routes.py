from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session
from ..agent.models import CommandRequest, AgentResponse
from ..agent.processor import AgentProcessor
from ..agent.skills.translation_skill import TranslationSkill
from ..agent.skills.intent_recognition_skill import IntentRecognitionSkill
from ..agent.skills.recurrence_extraction_skill import RecurrenceExtractionSkill
from ..agent.skills.temporal_extraction_skill import TemporalExtractionSkill
from ..agent.skills.action_mapping_skill import ActionMappingSkill
from ..database import get_session

router = APIRouter()

# Instantiate all skills once
skills = [
    TranslationSkill(),
    IntentRecognitionSkill(),
    RecurrenceExtractionSkill(),
    TemporalExtractionSkill(),
    ActionMappingSkill(),
]

# Instantiate the processor with all skills once
processor = AgentProcessor(skills=skills)

@router.post("/command", response_model=AgentResponse)
async def command(request: CommandRequest, session: Session = Depends(get_session)):
    try:
        # The initial context is the command from the request
        initial_context = {"command": request.command, "context": request.context}
        
        # Process the command, passing the database session
        result = await processor.process(initial_context, db_session=session)
        
        return AgentResponse(
            action=result.get("action", "UNKNOWN"),
            parameters=result.get("parameters", {}),
            assistant_reply=result.get("assistant_reply", "Processing complete."),
            todo_item=result.get("todo_item")
        )
    except HTTPException as e:
        # Re-raise HTTPException to let FastAPI handle it
        raise e
    except Exception as e:
        # For any other exception, return a generic 500 error
        # Log the exception for debugging purposes
        print(f"Agent processing error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An internal error occurred in the agent."
        )
