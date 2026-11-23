import os
from datetime import datetime
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

# Anti-Cheat threshold (minimum realistic seconds to finish a quiz)
MINIMUM_QUIZ_DURATION_SECONDS = 5.0

# Request Payload Schema (Secuity Input Validation)
class QuizSubmission(BaseModel):
    user_id: str
    quiz_id: str
    score: int = Field(..., ge=0, le=100, description="Score must be between 0 and 100")
    start_time: datetime
    end_time: datetime

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
         
         return {
            "status": "success",
            "message": "Score verified and cleared for Supabase intake.",
            "data": response.data
        }
    except Exception as e:
        raise HTTPException(
             status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
             detail=f"Database Insertion Error: {str(e)}"
        )