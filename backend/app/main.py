from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import select

from app.core.config import settings
from app.core.database import init_db, async_session
from app.core.security import hash_password
# Import all models so Base.metadata knows about them before create_all
from app.models.user import User
from app.models.application import Application
from app.models.transfer import Transfer  # noqa: F401
from app.routers import auth, applications, transfers, upload


async def seed_demo_data():
    """Create a demo account with sample applications for presentations."""
    async with async_session() as db:
        # Check if demo user already exists
        result = await db.execute(select(User).where(User.email == "demo@evisa.kg"))
        if result.scalar_one_or_none():
            print("Demo data already exists, skipping seed")
            return

        # Create demo user
        demo_user = User(
            email="demo@evisa.kg",
            hashed_password=hash_password("Demo2026!"),
        )
        db.add(demo_user)
        await db.flush()

        # Create sample applications in different statuses
        samples = [
            {
                "status": "approved",
                "first_name": "Sarah",
                "last_name": "Johnson",
                "date_of_birth": "1992-05-15",
                "gender": "female",
                "nationality": "US",
                "email": "demo@evisa.kg",
                "phone": "+1 (555) 123-4567",
                "passport_number": "US7891234",
                "passport_issue_date": "2022-03-10",
                "passport_expiry_date": "2032-03-10",
                "passport_issuing_country": "US",
                "entry_date": "2026-05-01",
                "exit_date": "2026-05-20",
                "purpose": "tourism",
                "accommodation": "Hyatt Regency Bishkek",
                "visa_type": "tourist",
            },
            {
                "status": "review",
                "first_name": "Kenji",
                "last_name": "Tanaka",
                "date_of_birth": "1988-11-22",
                "gender": "male",
                "nationality": "JP",
                "email": "demo@evisa.kg",
                "phone": "+81 90-1234-5678",
                "passport_number": "JP4567890",
                "passport_issue_date": "2023-01-15",
                "passport_expiry_date": "2033-01-15",
                "passport_issuing_country": "JP",
                "entry_date": "2026-06-10",
                "exit_date": "2026-07-10",
                "purpose": "business",
                "accommodation": "Sheraton Bishkek",
                "visa_type": "business",
            },
            {
                "status": "submitted",
                "first_name": "Elena",
                "last_name": "Petrova",
                "date_of_birth": "1995-08-03",
                "gender": "female",
                "nationality": "DE",
                "email": "demo@evisa.kg",
                "phone": "+49 171 234 5678",
                "passport_number": "DE1234567",
                "passport_issue_date": "2024-06-01",
                "passport_expiry_date": "2034-06-01",
                "passport_issuing_country": "DE",
                "entry_date": "2026-08-01",
                "exit_date": "2026-09-15",
                "purpose": "tourism",
                "accommodation": "Song Kol Yurt Camp",
                "visa_type": "tourist90",
            },
        ]

        for data in samples:
            app = Application(user_id=demo_user.id, **data)
            db.add(app)

        await db.commit()
        print("Demo data seeded: demo@evisa.kg / Demo2026!")


@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        await init_db()
        await seed_demo_data()
    except Exception as e:
        print(f"Warning: startup issue (may be OK): {e}")
    yield


API_DESCRIPTION = """
## Kyrgyz Republic e-Visa Portal API

Backend service for the official e-Visa application portal of the Kyrgyz Republic.

### Authentication
All protected endpoints require a Bearer JWT token in the `Authorization` header.
Obtain a token via `POST /api/auth/login` or `POST /api/auth/register`.

### Demo Account
- **Email:** `demo@evisa.kg`
- **Password:** `Demo2026!`

### Endpoints Overview
- **Auth** — Register, login, user profile
- **Applications** — Submit, list, check status, continue drafts
- **Transfers** — Request visa transfer to new passport
- **Upload** — Document upload (passport photo, scan, invitation)
"""

app = FastAPI(
    title="KG e-Visa API",
    description=API_DESCRIPTION,
    version="1.0.0",
    docs_url="/docs",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        settings.FRONTEND_URL,
        "https://kg-visa.vercel.app",
        "http://localhost:3000",
        "http://localhost:3004",
        "http://localhost:3005",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(applications.router)
app.include_router(transfers.router)
app.include_router(upload.router)


@app.get("/api/health")
async def health():
    return {"status": "ok", "service": "kg-visa-api", "version": "1.0.0"}
