from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
from datetime import datetime

router = APIRouter(prefix="/api/reels", tags=["EcoReels"])

class ReelCreate(BaseModel):
    user: str
    title: str
    video_url: str

class Reel(ReelCreate):
    id: int
    created_at: str
    eco_points_earned: int
    likes: int

reels_db: List[Reel] = [
    Reel(
        id=1,
        user="ecorewards",
        title="Every tree planted heals the planet 🌳 #ClimateAction",
        video_url="/Sapling_growing_in_green_valley.mp4",
        created_at=datetime.utcnow().isoformat(),
        eco_points_earned=50,
        likes=120
    )
]

@router.get("/", response_model=List[Reel])
async def get_reels():
    return sorted(reels_db, key=lambda r: r.created_at, reverse=True)

@router.post("/", response_model=Reel)
async def create_reel(reel: ReelCreate):
    new_reel = Reel(
        id=len(reels_db) + 1,
        user=reel.user,
        title=reel.title,
        video_url=reel.video_url,
        created_at=datetime.utcnow().isoformat(),
        eco_points_earned=100, # Reward 100 points for creating a reel!
        likes=0
    )
    reels_db.append(new_reel)
    return new_reel
