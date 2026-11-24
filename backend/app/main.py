import os
from datetime import datetime, timezone
from typing import List, Optional
from urllib import response
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel, Field
from supabase import create_client, Client
from fastapi.middleware.cors import CORSMiddleware

# Load environment variables from .env
dotenv_path = os.path.join(os.path.dirname(__file__), "..", ".env")
load_dotenv(dotenv_path=os.path.abspath(dotenv_path))

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY") 

if not SUPABASE_URL or not SUPABASE_KEY:
     raise RuntimeError("Missing SUPABASE_URL or SUPABASE_KEY environment. Ensure backend/.env exists")

# Initialise Supabase Database Connection
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Initialise FastAPI App Engine
app = FastAPI(
    title="Beat the Bell - Security API",
    description="Anti-Cheat Validation Engine",
    version="1.0.0"
)

# Initialise FastAPI App Engine CORS Middleware (Cross-Origin Resource Sharing)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Constants
MINIMUM_QUIZ_DURATION_SECONDS = 5.0
POINTS_MULTIPLIER = 10  # Points awarded per score percentage

# Request Payload Schema (Secuity Input Validation)
class QuizSubmission(BaseModel):
    user_id: str
    quiz_id: str
    score: int = Field(..., ge=0, le=100, description="Score must be between 0 and 100")
    start_time: datetime
    end_time: datetime

class CharacterUpdate(BaseModel):
    equipped_outfit: str = Field(..., min_length=1, max_length=50, description="Outfit name must be between 1 and 50 characters")
    equipped_color: str = Field(..., min_length=1, max_length=50, description="Colour name must be between 1 and 50 characters")
    equipped_accessory: str = Field(..., min_length=1, max_length=50, description="Accessory name must be between 1 and 50 characters")
    unlocked_items: Optional[List[str]] = None  # Optional list of unlocked items, can be empty or None


# Quiz Submission Endpoint
@app.post("/api/v1/submit-quiz", status_code=status.HTTP_201_CREATED)
async def submit_quiz(payload: QuizSubmission):
    # 1. Server_side time_delta calculation
    duration = (payload.end_time - payload.start_time).total_seconds()

    # 2. Anti_cheat time validation
    if duration < MINIMUM_QUIZ_DURATION_SECONDS:
            raise HTTPException(
                 status_code=status.HTTP_400_BAD_REQUEST,
                 detail=f"Secuirty Flag: Quiz completed in {duration}s. Less than minimum allowable threshold ({MINIMUM_QUIZ_DURATION_SECONDS}s)."
            )

    # 3. Write validated record into Supabase PostgreSQL
    try:
        response = supabase.table("quiz_scores").insert({
              "user_id": payload.user_id,
              "quiz_id": payload.quiz_id,
              "score": payload.score,
              "time_taken_seconds": duration
         }).execute()

         # 4. Calculaste and award revision points to studnet profile based on score percentage
        points_earned = payload.score * POINTS_MULTIPLIER
        profile_res = supabase.table("profiles").select("points").eq("id", payload.user_id).execute()

        new_total_points = points_earned
        if profile_res.data:
                current_points = profile_res.data[0].get("points", 0)
                new_total_points = current_points + points_earned
                supabase.table("profiles").update({"points": new_total_points}).eq("id", payload.user_id).execute()

        return {
            "status": "success",
            "message": "Score verified and and revision points awarded.",
            "points_earned": points_earned,
            "total_points": new_total_points,
            "data": response.data
        }
    except Exception as e:
        raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Database Error: {str(e)}"
        )

# 2. Fetch Character Customization Endpoint
@app.get ("/api/v1/character/{user_id}", status_code=status.HTTP_200_OK)
async def get_character_customisations(user_id: str):
    try:
        res = supabase.table("character_customisations").select("*").eq("user_id", user_id).execute()

        # Auto-create a default character customisation record if none exists for the user
        if not res.data:
            default_row = {
                "user_id": user_id,
                "equipped_outfit": "school_uniform",
                "equipped_color": "default",
                "equipped_accessory": "none",
                "unlocked_items": ["school_uniform"]
            }
            created = supabase.table("character_customisations").insert(default_row).execute()
            return {
            "status": "success",
            "data": created.data[0]
        }

        return {
            "status": "success",
            "data": res.data[0]    
        }
    except Exception as e:
        raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Error fetching character customisation: {str(e)}"
        )

# 3. Update Character Customization Endpoint
@app.put("/api/v1/character/{user_id}", status_code=status.HTTP_200_OK)
async def update_character_customisations(user_id: str, payload: CharacterUpdate):
    try:
        update_data = {
            "user_id": user_id,
            "equipped_outfit": payload.equipped_outfit,
            "equipped_color": payload.equipped_color,
            "equipped_accessory": payload.equipped_accessory,
            "updated_at": datetime.now(timezone.utc).isoformat()
        }
        if payload.unlocked_items is not None:
            update_data["unlocked_items"] = payload.unlocked_items

        updated = supabase.table("character_customisations").upsert(update_data).execute()

        return {
            "status": "success",
            "message": "Character customisation updated successfully.",
            "data": updated.data[0] if updated.data else None
        }
    except Exception as e:
        raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Error updating character customisation: {str(e)}"
        )