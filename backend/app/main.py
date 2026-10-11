from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.weather import router as weather_router
from app.api.chat import router as chat_router
from app.api.geocoding import router as geocoding_router
from app.api.community import router as community_router
from app.api.reels import router as reels_router

app = FastAPI(
    title="WeatherLY API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(weather_router)
app.include_router(chat_router)
app.include_router(geocoding_router)
app.include_router(community_router)
app.include_router(reels_router)

@app.get("/")
async def root():
    return {"message": "WeatherLY API Running"}

@app.get("/health")
async def health():
    return {"status": "ok"}