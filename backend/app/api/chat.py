from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from app.services.chat_service import ask_weather_ai

router = APIRouter(
    prefix="/api/chat",
    tags=["AI Chat"],
)


class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    message: str
    history: list[ChatMessage] = Field(default_factory=list)
    lat: float
    lon: float
    lang: str = "hi-IN"


@router.post("/")
async def chat(request: ChatRequest):
    try:
        response = await ask_weather_ai(
            request.message,
            request.history,
            request.lat,
            request.lon,
            request.lang,
        )
        return response
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"AI Service Error: {str(e)}")