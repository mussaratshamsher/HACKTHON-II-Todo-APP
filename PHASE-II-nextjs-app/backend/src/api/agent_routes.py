from fastapi import APIRouter, Depends, HTTPException, status
from src.agent.models import CommandRequest, AgentResponse
from src.agent.processor import AgentProcessor
from src.agent.skills.translation_skill import TranslationSkill
from src.agent.skills.intent_recognition_skill import IntentRecognitionSkill
from src.agent.skills.recurrence_extraction_skill import RecurrenceExtractionSkill
from src.agent.skills.temporal_extraction_skill import TemporalExtractionSkill
from src.agent.skills.action_mapping_skill import ActionMappingSkill
from sqlmodel import Session
from src.database import get_session

router = APIRouter()

@router.post("/command", response_model=AgentResponse)
async def command(request: CommandRequest, session: Session = Depends(get_session)):
    try:
        # Instantiate all skills
        skills = [
            TranslationSkill(),
            IntentRecognitionSkill(),
            RecurrenceExtractionSkill(),
            TemporalExtractionSkill(),
            ActionMappingSkill(),
        ]
        
        # Instantiate the processor with all skills
        processor = AgentProcessor(skills=skills)
        
        # The initial context is the command from the request
        initial_context = {"command": request.command, "context": request.context}
        
        # Process the command, passing the database session
        result = await processor.process(initial_context, db_session=session)
        
        return AgentResponse(
            action=result.get("action", "UNKNOWN"),
            parameters=result.get("parameters", {}),
            assistant_reply=result.get("assistant_reply", "Processing complete.")
        )
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Agent processing error: {str(e)}"
        )
