from pydantic import BaseModel
from datetime import datetime


class PersonalInfo(BaseModel):
    firstName: str
    lastName: str
    dateOfBirth: str
    gender: str
    nationality: str
    email: str
    phone: str


class PassportInfo(BaseModel):
    number: str
    issueDate: str
    expiryDate: str
    issuingCountry: str


class TravelInfo(BaseModel):
    entryDate: str
    exitDate: str
    purpose: str
    accommodation: str = ""
    visaType: str


class ApplicationCreate(BaseModel):
    personal: PersonalInfo
    passport: PassportInfo
    travel: TravelInfo
    photoUrl: str | None = None
    passportScanUrl: str | None = None
    invitationUrl: str | None = None


class ApplicationResponse(BaseModel):
    id: int
    ref_id: str
    status: str
    first_name: str
    last_name: str
    visa_type: str
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


class ApplicationDetail(ApplicationResponse):
    email: str
    phone: str
    date_of_birth: str
    gender: str
    nationality: str
    passport_number: str
    passport_issue_date: str
    passport_expiry_date: str
    passport_issuing_country: str
    entry_date: str
    exit_date: str
    purpose: str
    accommodation: str
    photo_url: str | None
    passport_scan_url: str | None
    invitation_url: str | None


class StatusResponse(BaseModel):
    id: int
    refId: str
    status: str
    applicant: str
    visaType: str
    createdAt: datetime
    updatedAt: datetime
