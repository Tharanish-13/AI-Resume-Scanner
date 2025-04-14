from pydantic import BaseModel
from typing import Optional

class UserOut(BaseModel):
    id: str
    name: Optional[str]
    about: Optional[str]
    job: Optional[str]
    company: Optional[str]
    country: Optional[str]
    address: Optional[str]
    phone: Optional[str]
    email: str
    image: Optional[str]

    class Config:
        orm_mode = True
