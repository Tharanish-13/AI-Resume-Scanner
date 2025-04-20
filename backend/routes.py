from fastapi import APIRouter, Depends, Body, HTTPException
from pydantic import BaseModel
from database import users_collection
from auth import get_current_user
from typing import Optional
from schemas import UserOut
from bson import ObjectId

router = APIRouter()

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

    update_fields = {k: v for k, v in data.dict().items() if v is not None}
    
    if not update_fields:
        raise HTTPException(status_code=400, detail="No fields to update")

    result = users_collection.update_one(
        {"_id": user["_id"]},
        {"$set": update_fields}
    )

    if result.modified_count == 0:
        raise HTTPException(status_code=500, detail="Profile update failed")

    updated_user = users_collection.find_one({"_id": user["_id"]})
    updated_user["_id"] = str(updated_user["_id"])
    return updated_user

@router.get("/user-profile", response_model=UserOut)
def get_user_profile(current_user=Depends(get_current_user)):
    user = users_collection.find_one({"email": current_user["email"]})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user["id"] = str(user["_id"])   
    del user["_id"]                 
    return user

@router.delete("/delete-profile-image")
async def delete_profile_image(current_user: dict = Depends(get_current_user)):
    try:
        result = users_collection.update_one(
            {"email": current_user["email"]},
            {"$set": {"image": ""}}
        )
        if result.modified_count == 0:
            raise HTTPException(status_code=404, detail="User not found or no image to delete")
        return {"message": "Profile image deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to delete profile image: {str(e)}")
