from fastapi import APIRouter

from app.services.weather_service import (
    get_current_weather,
    get_hourly_forecast,
    get_daily_forecast,
    get_agro_weather,
    get_aviation_weather,
    get_marine_weather,
)

router = APIRouter(
    prefix="/api/weather",
    tags=["Weather"]
)


@router.get("/current")
async def current_weather(lat: float, lon: float):
    return await get_current_weather(lat, lon)


@router.get("/hourly")
async def hourly_weather(lat: float, lon: float):
    return await get_hourly_forecast(lat, lon)


@router.get("/forecast")
async def forecast_weather(lat: float, lon: float):
    return await get_daily_forecast(lat, lon)


@router.get("/agro")
async def agro_weather(lat: float, lon: float):
    return await get_agro_weather(lat, lon)


@router.get("/aviation")
async def aviation_weather(lat: float, lon: float):
    return await get_aviation_weather(lat, lon)


@router.get("/marine")
async def marine_weather(lat: float, lon: float):
    return await get_marine_weather(lat, lon)