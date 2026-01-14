import pytest
from src.agent.skills.translation_skill import TranslationSkill
from src.agent.skills.intent_recognition_skill import IntentRecognitionSkill
from src.agent.skills.recurrence_extraction_skill import RecurrenceExtractionSkill
from src.agent.skills.temporal_extraction_skill import TemporalExtractionSkill
from src.agent.skills.action_mapping_skill import ActionMappingSkill

@pytest.fixture
def context():
    return {"command": "", "context": {}}

def test_translation_skill(context):
    skill = TranslationSkill()
    context["command"] = "hello"
    result = skill.execute(context)
    assert result["command"] == "hello"

def test_intent_recognition_skill_create_todo(context):
    skill = IntentRecognitionSkill()
    context["command"] = "create a new todo: Buy groceries"
    result = skill.execute(context)
    assert result["intent"] == "CREATE_TODO"

def test_intent_recognition_skill_no_intent(context):
    skill = IntentRecognitionSkill()
    context["command"] = "just a command"
    result = skill.execute(context)
    assert "intent" not in result

def test_recurrence_extraction_skill_daily(context):
    skill = RecurrenceExtractionSkill()
    context["command"] = "buy groceries daily"
    result = skill.execute(context)
    assert result["recurrence"] == "daily"

def test_recurrence_extraction_skill_weekly(context):
    skill = RecurrenceExtractionSkill()
    context["command"] = "clean house weekly"
    result = skill.execute(context)
    assert result["recurrence"] == "weekly"

def test_recurrence_extraction_skill_no_recurrence(context):
    skill = RecurrenceExtractionSkill()
    context["command"] = "buy groceries"
    result = skill.execute(context)
    assert "recurrence" not in result

def test_temporal_extraction_skill(context):
    skill = TemporalExtractionSkill()
    context["command"] = "meeting tomorrow at 3pm"
    result = skill.execute(context)
    assert "due_date" in result
    assert "2026-01-15T15:00:00" in result["due_date"] # Assuming today is 2026-01-14

def test_temporal_extraction_skill_no_date(context):
    skill = TemporalExtractionSkill()
    context["command"] = "buy groceries"
    result = skill.execute(context)
    assert "due_date" not in result

def test_action_mapping_skill_create_todo_with_content(context):
    skill = ActionMappingSkill()
    context["intent"] = "CREATE_TODO"
    context["command"] = "create a new todo: Go to the gym"
    result = skill.execute(context)
    assert result["action"] == "create_todo"
    assert result["parameters"]["title"] == "Go to the gym"
    assert "Todo 'Go to the gym' has been scheduled." in result["assistant_reply"]

def test_action_mapping_skill_create_todo_no_content(context):
    skill = ActionMappingSkill()
    context["intent"] = "CREATE_TODO"
    context["command"] = "create a new todo"
    result = skill.execute(context)
    assert result["action"] == "UNKNOWN"
    assert "I need a task description to create a todo." in result["assistant_reply"]

def test_action_mapping_skill_unknown_intent(context):
    skill = ActionMappingSkill()
    context["intent"] = "UNKNOWN_INTENT"
    context["command"] = "some command"
    result = skill.execute(context)
    assert result["action"] == "UNKNOWN"
    assert "I don't understand your command." in result["assistant_reply"]
