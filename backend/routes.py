from fastapi import APIRouter, UploadFile, File, HTTPException, Depends, Body
from fastapi.responses import FileResponse
from resume_processing import extract_text_from_pdf, calculate_match_score
from auth import get_current_user  # 🔑 import JWT auth logic
import os
import time
import shutil
from pydantic import BaseModel
from passlib.context import CryptContext
from database import users_collection 
from typing import Optional
import re
from schemas import UserOut
from database import resumes_collection
from bson import ObjectId
import jwt
from auth_routes import SECRET_KEY, ALGORITHM

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
MAX_FILE_SIZE = 5 * 1024 * 1024


# ✅ Upload resume with user association
@router.post("/upload_resume")
async def upload_resume(file: UploadFile = File(...), current_user: dict = Depends(get_current_user)):
    try:
        file_size = 0
        temp_file_path = os.path.join(UPLOAD_FOLDER, "temp_" + file.filename)

        with open(temp_file_path, "wb") as temp_file:
            content = await file.read()
            file_size = len(content)
            if file_size > MAX_FILE_SIZE:
                os.remove(temp_file_path)
                raise HTTPException(status_code=400, detail="File size exceeds 5MB limit")
            temp_file.write(content)

        secure_filename = os.path.basename(file.filename)
        file_path = os.path.join(UPLOAD_FOLDER, secure_filename)

        if os.path.exists(file_path):
            filename, ext = os.path.splitext(secure_filename)
            file_path = os.path.join(UPLOAD_FOLDER, f"{filename}_{int(time.time())}{ext}")

        shutil.move(temp_file_path, file_path)

        resume_text = extract_text_from_pdf(file_path)
        if not resume_text:
            raise HTTPException(status_code=400, detail="Failed to extract text from resume")

        best_match, all_scores = calculate_match_score(resume_text)

        resumes_collection.insert_one({
            "email": current_user["email"],
            "filename": os.path.basename(file_path),
            "filepath": file_path,
            "upload_time": time.time(),
            "best_match": best_match,
            "all_scores": all_scores
        })

        return {
            "message": "Resume uploaded successfully!",
            "file_path": file_path,
            "best_match": best_match[0],
            "match_score": best_match[1],
            "all_scores": all_scores
        }

    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Upload failed: {str(e)}")


# ✅ Get resumes uploaded by current user only
@router.get("/get-resumes")
def get_resumes(current_user: dict = Depends(get_current_user)):
    try:
        user_email = current_user["email"]
        documents = resumes_collection.find({"email": user_email})

        resumes = []
        for doc in documents:
            file_path = doc.get("filepath")
            if not os.path.exists(file_path):
                continue

            resumes.append({
                "name": doc["filename"],
                "url": f"http://localhost:8000/api/get-resume/{doc['filename']}",
                "upload_time": time.ctime(doc.get("upload_time", time.time())),
                "best_match": doc.get("best_match", ["", 0]),
                "match_score": doc.get("best_match", ["", 0])[1]
            })

        return {"resumes": resumes}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch resumes: {str(e)}")


# ✅ Serve file if it belongs to current user
@router.get("/get-resume/{filename}")
def get_resume_file(filename: str):
    resume = resumes_collection.find_one({"filename": filename})
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")

    file_path = resume["filepath"]
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File missing on server")

    return FileResponse(file_path, filename=filename)

# ✅ Delete only your own resume
@router.delete("/delete-resume/{filename}")
def delete_resume(filename: str, current_user: dict = Depends(get_current_user)):
    print(f"Request to delete: {filename} by user {current_user['email']}")
    
    resume = resumes_collection.find_one({"filename": filename, "email": current_user["email"]})
    if not resume:
        print("Resume not found or permission denied.")
        raise HTTPException(status_code=404, detail="Resume not found or permission denied")

    file_path = resume["filepath"]
    if os.path.exists(file_path):
        os.remove(file_path)
        print(f"Deleted file at: {file_path}")
    else:
        print("File not found on disk.")

    resumes_collection.delete_one({"_id": resume["_id"]})
    return {"message": f"{filename} deleted successfully."}



class UpdateProfileRequest(BaseModel):
    name: Optional[str] = None
    about: Optional[str] = None
    job: Optional[str] = None
    company: Optional[str] = None
    country: Optional[str] = None
    address: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    image: Optional[str] = None

    
@router.put("/update-profile")
async def update_profile(
    data: UpdateProfileRequest = Body(...),
    current_user: dict = Depends(get_current_user)
):
    print("Incoming JSON:", data)

    user = users_collection.find_one({"email": current_user["email"]})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    update_fields = {
        k: v for k, v in data.dict().items()
        if v is not None
    }

    if not update_fields:
        raise HTTPException(status_code=400, detail="No fields to update")

    result = users_collection.update_one(
        {"_id": user["_id"]},
        {"$set": update_fields}
    )

    if result.modified_count == 0:
        raise HTTPException(status_code=500, detail="Profile update failed")

    updated_user = users_collection.find_one({"_id": user["_id"]})
    updated_user["_id"] = str(updated_user["_id"])  # Make ObjectId frontend-friendly

    return updated_user

@router.get("/user-profile", response_model=UserOut)
def get_user_profile(current_user=Depends(get_current_user)):
    user = users_collection.find_one({"email": current_user["email"]})
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user["id"] = str(user["_id"])   
    del user["_id"]                 

    return user                     

# ✅ Delete profile image endpoint
@router.delete("/delete-profile-image")
async def delete_profile_image(current_user: dict = Depends(get_current_user)):
    try:
        # Update user in database - set image to empty string
        result = users_collection.update_one(
            {"email": current_user["email"]},
            {"$set": {"image": ""}}
        )
        
        if result.modified_count == 0:
            raise HTTPException(status_code=404, detail="User not found or no image to delete")
            
        return {"message": "Profile image deleted successfully"}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to delete profile image: {str(e)}")
