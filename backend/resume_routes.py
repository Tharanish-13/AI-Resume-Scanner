from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from fastapi.responses import FileResponse, JSONResponse
from auth import get_current_user
import os
import time
import shutil
from database import resumes_collection
from bson import ObjectId
from resume_processing import extract_text_from_pdf, calculate_match_score

router = APIRouter()

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5MB

@router.post("/upload_resume")
async def upload_resume(file: UploadFile = File(...), current_user: dict = Depends(get_current_user)):
    try:
        # File size validation
        file_size = 0
        temp_file_path = os.path.join(UPLOAD_FOLDER, "temp_" + file.filename)
        
        with open(temp_file_path, "wb") as temp_file:
            content = await file.read()
            file_size = len(content)
            if file_size > MAX_FILE_SIZE:
                os.remove(temp_file_path)
                raise HTTPException(status_code=400, detail="File size exceeds 5MB limit")
            temp_file.write(content)

        # Handle filename conflicts
        secure_filename = os.path.basename(file.filename)
        file_path = os.path.join(UPLOAD_FOLDER, secure_filename)
        if os.path.exists(file_path):
            filename, ext = os.path.splitext(secure_filename)
            file_path = os.path.join(UPLOAD_FOLDER, f"{filename}_{int(time.time())}{ext}")

        shutil.move(temp_file_path, file_path)

        # Process resume
        resume_text = extract_text_from_pdf(file_path)
        if not resume_text:
            raise HTTPException(status_code=400, detail="Failed to extract text from resume")

        best_match, all_scores = calculate_match_score(resume_text)

        # Save to database
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
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Upload failed: {str(e)}")

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
                "url": f"/api/resume/get-resume/{doc['filename']}",
                "upload_time": time.ctime(doc.get("upload_time", time.time())),
                "best_match": doc.get("best_match", ["", 0]),
                "match_score": doc.get("best_match", ["", 0])[1]
            })

        return {"resumes": resumes}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch resumes: {str(e)}")

@router.get("/get-resume/{filename}")
def get_resume_file(filename: str, current_user: dict = Depends(get_current_user)):
    resume = resumes_collection.find_one({"filename": filename, "email": current_user["email"]})
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")

    file_path = resume["filepath"]
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File missing on server")

    return FileResponse(file_path, filename=filename)

@router.delete("/delete-resume/{filename}")
def delete_resume(filename: str, current_user: dict = Depends(get_current_user)):
    resume = resumes_collection.find_one({"filename": filename, "email": current_user["email"]})
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found or permission denied")

    file_path = resume["filepath"]
    if os.path.exists(file_path):
        os.remove(file_path)

    resumes_collection.delete_one({"_id": resume["_id"]})
    return {"message": f"{filename} deleted successfully."}
