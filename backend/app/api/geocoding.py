from fastapi import APIRouter

from app.services.geocoding_service import (
    reverse_geocode,
    search_city
)

router = APIRouter(
    prefix="/api/geocoding",
    tags=["Geocoding"]
)

@router.get("/reverse")
async def get_location(lat: float, lon: float):
    return await reverse_geocode(lat, lon)

@router.get("/search")
async def city_search(query: str):
    return await search_city(query)