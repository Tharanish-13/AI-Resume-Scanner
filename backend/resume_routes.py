from fastapi import APIRouter, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
import os
import shutil
import uuid

router = APIRouter()

UPLOAD_DIR = "uploaded_resumes"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/upload_resume")
async def upload_resume(file: UploadFile = File(...)):
    try:
        # Generate unique filename
        filename = f"{uuid.uuid4().hex}_{file.filename}"
        file_path = os.path.join(UPLOAD_DIR, filename)

        # Save the uploaded file
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        return {"message": "Resume uploaded successfully", "file_path": file_path}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/parse-resume/")
async def parse_resume(file_path: str):
    # Placeholder logic for parsing
    # You can plug in your AI/ML parsing model here
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File not found")

    # Simulate extracted info
    extracted_data = {
        "name": "John Doe",
        "email": "john@example.com",
        "skills": ["Python", "FastAPI", "Machine Learning"],
        "experience": "3 years"
    }

    return JSONResponse(content=extracted_data)


@router.get("/score-resume/")
async def score_resume(file_path: str):
    # Placeholder logic for scoring
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File not found")

    # Simulate scoring logic
    score = 85  # You can replace this with a model-based score
    return {"score": score}
