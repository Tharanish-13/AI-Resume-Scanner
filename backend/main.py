from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from routes import router
from auth import get_current_user, ACCESS_TOKEN_EXPIRE_MINUTES
from auth_routes import router as auth_router
from resume_routes import router as resume_router
from bson import ObjectId
import uuid
from jose import jwt
import datetime
import sys
from database import users_collection
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

app = FastAPI()
app.include_router(router, dependencies=[Depends(get_current_user)])
app.include_router(auth_router)
app.include_router(resume_router, prefix="/resume", tags=["Resume Routes"])

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SECRET_KEY = "supersecretkey"
ALGORITHM = "HS256"

# ✅ User Schema
class User(BaseModel):
    email: str
    password: str

@app.get("/")
def home():
    return {"message": "AI Resume Scanner Backend is Running!"}

# ✅ Registration Route with default fields
@app.post("/register")
async def register(user: User):
    existing_user = users_collection.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")

    # Insert user with all fields initialized (Type 3)
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

    if "_id" in user_data:
        del user_data["_id"]

    token = str(uuid.uuid4())

    return {
        "message": "User registered successfully",
        "token": token,
        "user": user_data
    }

# ✅ LOGIN Route with JWT
from datetime import datetime, timedelta

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
