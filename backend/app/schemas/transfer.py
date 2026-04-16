from pydantic import BaseModel, EmailStr
from datetime import datetime


class TransferCreate(BaseModel):
    visaNumber: str
    oldPassport: str
    newPassport: str
    newPassportExpiry: str
    email: EmailStr
    reason: str


class TransferResponse(BaseModel):
    id: int
    trackingId: str
    status: str
    createdAt: datetime
