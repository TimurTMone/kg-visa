import hashlib
import time
from datetime import datetime, timezone

from sqlalchemy import String, Integer, DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


def generate_tracking_id() -> str:
    h = hashlib.md5(f"{time.time()}".encode()).hexdigest()[:8].upper()
    return f"TR-{h}"


class Transfer(Base):
    __tablename__ = "transfers"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    tracking_id: Mapped[str] = mapped_column(String(20), unique=True, nullable=False, default=generate_tracking_id, index=True)
    visa_number: Mapped[str] = mapped_column(String(50), nullable=False)
    old_passport: Mapped[str] = mapped_column(String(20), nullable=False)
    new_passport: Mapped[str] = mapped_column(String(20), nullable=False)
    new_passport_expiry: Mapped[str] = mapped_column(String(20), nullable=False)
    email: Mapped[str] = mapped_column(String(255), nullable=False)
    reason: Mapped[str] = mapped_column(String(30), nullable=False)
    status: Mapped[str] = mapped_column(String(20), nullable=False, default="pending")
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )
