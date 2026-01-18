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
from ..auth.dependencies import get_current_user  # make sure you have this

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
async def command(
    request: CommandRequest,
    session: Session = Depends(get_session),
    current_user: dict = Depends(get_current_user),
):
    # 🔐 Ensure user is authenticated
    if not current_user:
        raise HTTPException(status_code=401, detail="Login required")

    # ✅ Normalize user ID (Firebase / JWT safe)
    user_id = current_user.get("id") or current_user.get("uid")

    if not user_id:
        raise HTTPException(
            status_code=401,
            detail="Invalid user identity"
        )

    try:
        # 🧠 Initial agent context
        initial_context = {
            "command": request.command,
            "context": request.context or {},  # prevent None crash
            "user_id": user_id,
        }

        # ⚙️ Process agent command
        result = await processor.process(
            initial_context,
            db_session=session,
        )

        # 🔗 Attach user to created todo (if any)
        todo_item = result.get("todo_item")
        if todo_item:
            todo_item.user_id = user_id

        # ✅ Clean response
        return AgentResponse(
            action=result.get("action", "UNKNOWN"),
            parameters=result.get("parameters", {}),
            assistant_reply=result.get(
                "assistant_reply",
                "Processing complete."
            ),
            todo_item=todo_item.model_dump() if todo_item else None,
        )

    except HTTPException:
        raise

    except Exception as e:
        # 🧪 Debug-friendly logging
        import traceback
        print("AGENT PROCESSING ERROR:", str(e))
        traceback.print_exc()

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An internal error occurred in the agent.",
        )
