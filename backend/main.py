from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from bson import ObjectId
from jose import jwt
import uuid
import sys
import os
from datetime import datetime, timedelta

# Local imports
from database import users_collection
from auth import get_current_user, ACCESS_TOKEN_EXPIRE_MINUTES
from routes import router as profile_router              # ✅ Profile routes
from auth_routes import router as auth_router            # ✅ Auth routes
from resume_routes import router as resume_router        # ✅ Resume routes

# Allow FastAPI to recognize internal paths
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

app = FastAPI()

# ✅ CORS Configuration (for Vercel, etc.)
app.add_middleware(
    CORSMiddleware,
    allow_origin_regex="https://.*vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ JWT Secret & Algorithm
SECRET_KEY = "supersecretkey"
ALGORITHM = "HS256"

# ✅ BaseModel for Authentication
class User(BaseModel):
    email: str
    password: str

# ✅ Register Routes
app.include_router(
    profile_router,
    prefix="/profile",  # Group all profile endpoints
    tags=["User Profile"],
    dependencies=[Depends(get_current_user)]
)
app.include_router(auth_router)
app.include_router(resume_router, prefix="/resume", tags=["Resume Routes"])

# ✅ Root Route
@app.get("/")
def home():
    return {"message": "AI Resume Scanner Backend is Running!"}

# ✅ Ping Route (for CORS testing)
@app.get("/ping")
def ping():
    return {"message": "pong"}

# ✅ User Registration
@app.post("/register")
async def register(user: User):
    existing_user = users_collection.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")

    # Default profile structure
    user_data = {
        "email": user.email,
        "password": user.password,
        "image": "image.png",
        "name": "NA",
        "about": "NA",
        "address": "NA",
        "company": "NA",
        "country": "NA",
        "job": "NA",
        "phone": "NA"
    }

    result = users_collection.insert_one(user_data)
    user_data["id"] = str(result.inserted_id)
    user_data.pop("_id", None)

    token = str(uuid.uuid4())  # Placeholder token (can replace with JWT if needed)

    return {
        "message": "User registered successfully",
        "token": token,
        "user": user_data
    }

# ✅ User Login (with JWT)
@app.post("/login")
async def login(user: User):
    existing_user = users_collection.find_one({"email": user.email})
    if not existing_user:
        raise HTTPException(status_code=404, detail="User not found")

    if user.password != existing_user["password"]:
        raise HTTPException(status_code=401, detail="Invalid password")

    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    payload = {
        "sub": user.email,
        "exp": expire
    }

    token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

    return {
        "token": token,
        "user": {
            "id": str(existing_user["_id"]),
            "name": existing_user.get("name", ""),
            "email": existing_user["email"]
        }
    }
