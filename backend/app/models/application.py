import hashlib
import time
from datetime import datetime, timezone

from sqlalchemy import String, Integer, DateTime, ForeignKey, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


def generate_ref_id() -> str:
    year = datetime.now(timezone.utc).year
    h = hashlib.md5(f"{time.time()}".encode()).hexdigest()[:5].upper()
    return f"KG-{year}-{h}"


class Application(Base):
    __tablename__ = "applications"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    ref_id: Mapped[str] = mapped_column(String(20), unique=True, nullable=False, default=generate_ref_id, index=True)
    status: Mapped[str] = mapped_column(String(20), nullable=False, default="submitted")

    # Personal
    first_name: Mapped[str] = mapped_column(String(100), nullable=False)
    last_name: Mapped[str] = mapped_column(String(100), nullable=False)
    date_of_birth: Mapped[str] = mapped_column(String(20), nullable=False)
    gender: Mapped[str] = mapped_column(String(10), nullable=False)
    nationality: Mapped[str] = mapped_column(String(100), nullable=False)
    email: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    phone: Mapped[str] = mapped_column(String(30), nullable=False)

    # Passport
    passport_number: Mapped[str] = mapped_column(String(20), nullable=False)
    passport_issue_date: Mapped[str] = mapped_column(String(20), nullable=False)
    passport_expiry_date: Mapped[str] = mapped_column(String(20), nullable=False)
    passport_issuing_country: Mapped[str] = mapped_column(String(100), nullable=False)

    # Travel
    entry_date: Mapped[str] = mapped_column(String(20), nullable=False)
    exit_date: Mapped[str] = mapped_column(String(20), nullable=False)
    purpose: Mapped[str] = mapped_column(String(30), nullable=False)
    accommodation: Mapped[str] = mapped_column(Text, nullable=False, default="")
    visa_type: Mapped[str] = mapped_column(String(20), nullable=False)

    # Documents
    photo_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    passport_scan_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    invitation_url: Mapped[str | None] = mapped_column(String(500), nullable=True)

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )
