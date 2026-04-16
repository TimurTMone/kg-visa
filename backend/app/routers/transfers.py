from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.models.transfer import Transfer
from app.schemas.transfer import TransferCreate, TransferResponse

router = APIRouter(prefix="/api/transfers", tags=["transfers"])


@router.post("/", response_model=TransferResponse, status_code=201)
async def create_transfer(
    body: TransferCreate,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    if body.oldPassport.upper() == body.newPassport.upper():
        raise HTTPException(status_code=400, detail="New passport must differ from old one")

    expiry = datetime.strptime(body.newPassportExpiry, "%Y-%m-%d")
    six_months = datetime.now(timezone.utc) + timedelta(days=180)
    if expiry < six_months:
        raise HTTPException(status_code=400, detail="New passport must be valid for at least 6 months")

    transfer = Transfer(
        user_id=user.id,
        visa_number=body.visaNumber,
        old_passport=body.oldPassport,
        new_passport=body.newPassport,
        new_passport_expiry=body.newPassportExpiry,
        email=body.email,
        reason=body.reason,
    )
    db.add(transfer)
    await db.commit()
    await db.refresh(transfer)

    return TransferResponse(
        id=transfer.id,
        trackingId=transfer.tracking_id,
        status=transfer.status,
        createdAt=transfer.created_at,
    )
