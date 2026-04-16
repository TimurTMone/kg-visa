from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.database import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.models.application import Application
from app.schemas.application import (
    ApplicationCreate,
    ApplicationResponse,
    ApplicationDetail,
    StatusResponse,
)

router = APIRouter(prefix="/api/applications", tags=["applications"])


@router.post("/", response_model=dict, status_code=201)
async def create_application(
    body: ApplicationCreate,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    app = Application(
        user_id=user.id,
        first_name=body.personal.firstName,
        last_name=body.personal.lastName,
        date_of_birth=body.personal.dateOfBirth,
        gender=body.personal.gender,
        nationality=body.personal.nationality,
        email=body.personal.email,
        phone=body.personal.phone,
        passport_number=body.passport.number,
        passport_issue_date=body.passport.issueDate,
        passport_expiry_date=body.passport.expiryDate,
        passport_issuing_country=body.passport.issuingCountry,
        entry_date=body.travel.entryDate,
        exit_date=body.travel.exitDate,
        purpose=body.travel.purpose,
        accommodation=body.travel.accommodation,
        visa_type=body.travel.visaType,
        photo_url=body.photoUrl,
        passport_scan_url=body.passportScanUrl,
        invitation_url=body.invitationUrl,
    )
    db.add(app)
    await db.commit()
    await db.refresh(app)

    return {
        "id": app.id,
        "refId": app.ref_id,
        "status": app.status,
        "createdAt": app.created_at.isoformat(),
        "message": "Application submitted successfully",
    }


@router.get("/", response_model=list[ApplicationResponse])
async def list_applications(
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Application)
        .where(Application.user_id == user.id)
        .order_by(Application.created_at.desc())
    )
    return result.scalars().all()


@router.get("/status", response_model=StatusResponse)
async def check_status(
    id: str = Query(..., description="Application reference ID"),
    email: str = Query(..., description="Email used in application"),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Application)
        .where(Application.ref_id == id)
        .where(Application.email == email.lower())
    )
    app = result.scalar_one_or_none()

    if not app:
        raise HTTPException(status_code=404, detail="Application not found")

    return StatusResponse(
        id=app.id,
        refId=app.ref_id,
        status=app.status,
        applicant=f"{app.first_name} {app.last_name}",
        visaType=app.visa_type,
        createdAt=app.created_at,
        updatedAt=app.updated_at,
    )


@router.get("/continue", response_model=dict)
async def continue_application(
    id: str = Query(..., description="Application reference ID"),
    email: str = Query(..., description="Email used in application"),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Application)
        .where(Application.ref_id == id)
        .where(Application.email == email.lower())
        .where(Application.status.in_(["draft", "submitted"]))
    )
    app = result.scalar_one_or_none()

    if not app:
        raise HTTPException(status_code=404, detail="Application not found")

    return {
        "id": app.id,
        "refId": app.ref_id,
        "status": app.status,
        "personal": {
            "firstName": app.first_name,
            "lastName": app.last_name,
            "dateOfBirth": app.date_of_birth,
            "gender": app.gender,
            "nationality": app.nationality,
            "email": app.email,
            "phone": app.phone,
        },
        "passport": {
            "number": app.passport_number,
            "issueDate": app.passport_issue_date,
            "expiryDate": app.passport_expiry_date,
            "issuingCountry": app.passport_issuing_country,
        },
        "travel": {
            "entryDate": app.entry_date,
            "exitDate": app.exit_date,
            "purpose": app.purpose,
            "accommodation": app.accommodation,
            "visaType": app.visa_type,
        },
    }
