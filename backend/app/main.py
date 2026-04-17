from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.core.database import init_db
# Import all models so Base.metadata knows about them before create_all
import app.models.user  # noqa: F401
import app.models.application  # noqa: F401
import app.models.transfer  # noqa: F401
from app.routers import auth, applications, transfers, upload


@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        await init_db()
    except Exception as e:
        # Don't crash the app if DB init fails on first boot
        # Tables might already exist from a previous deploy
        print(f"Warning: DB init issue (may be OK): {e}")
    yield


app = FastAPI(
    title="KG Visa API",
    description="Backend API for the Kyrgyz Republic e-Visa Portal",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        settings.FRONTEND_URL,
        "https://kg-visa.vercel.app",
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
    return {"status": "ok"}
