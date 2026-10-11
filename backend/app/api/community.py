from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
from datetime import datetime

router = APIRouter(prefix="/api/community", tags=["Community"])

class PostCreate(BaseModel):
    user: str
    content: str
    emotion: str

class Post(PostCreate):
    id: int
    created_at: str
    likes: int

# In-memory DB for hackathon simplicity
posts_db: List[Post] = [
    Post(
        id=1, 
        user="Arjun", 
        content="Just planted 10 saplings in our neighborhood today. The rain really helped! Let's save our Earth.", 
        emotion="Inspired", 
        created_at=datetime.utcnow().isoformat(),
        likes=12
    ),
    Post(
        id=2, 
        user="Priya", 
        content="Heartbreaking to see the river pollution near my hometown. We need stricter policies on waste disposal.", 
        emotion="Sad", 
        created_at=datetime.utcnow().isoformat(),
        likes=45
    )
]

@router.get("/posts", response_model=List[Post])
async def get_posts():
    return sorted(posts_db, key=lambda p: p.created_at, reverse=True)

@router.post("/posts", response_model=Post)
async def create_post(post: PostCreate):
    new_post = Post(
        id=len(posts_db) + 1,
        user=post.user,
        content=post.content,
        emotion=post.emotion,
        created_at=datetime.utcnow().isoformat(),
        likes=0
    )
    posts_db.append(new_post)
    return new_post

@router.post("/posts/{post_id}/like")
async def like_post(post_id: int):
    for post in posts_db:
        if post.id == post_id:
            post.likes += 1
            return post
    return {"error": "Post not found"}
