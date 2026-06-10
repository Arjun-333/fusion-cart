"""AI Router — /api/ai/*"""
from fastapi import APIRouter, Depends
from pydantic import BaseModel
from typing import Optional, List
from sqlalchemy.orm import Session
from app.database import get_db
from app.services import ai_service
from app.middleware.auth_middleware import get_optional_user
from app.models.user import User

router = APIRouter(prefix="/api/ai", tags=["AI"])


class RecommendRequest(BaseModel):
    interests: List[str] = []
    limit: int = 6


class ChatRequest(BaseModel):
    message: str
    history: Optional[List[dict]] = None


@router.post("/recommend")
def get_recommendations(
    data: RecommendRequest,
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_optional_user),
):
    """Get AI-powered product recommendations based on user interests."""
    return ai_service.get_ai_recommendations(data.interests, data.limit)


@router.post("/chat")
def chat(
    data: ChatRequest,
    current_user: Optional[User] = Depends(get_optional_user),
):
    """Chat with FusionBot AI shopping assistant."""
    reply = ai_service.chat_with_assistant(data.message, data.history)
    return {"reply": reply, "bot": "FusionBot"}
