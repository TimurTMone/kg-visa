import os
import uuid

from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from fastapi.responses import FileResponse

from app.core.config import settings
from app.core.security import get_current_user
from app.models.user import User

router = APIRouter(prefix="/api/upload", tags=["upload"])

ALLOWED_IMAGE_TYPES = {"image/jpeg", "image/png"}
ALLOWED_PDF_TYPES = {"application/pdf"}
MAX_IMAGE_SIZE = 5 * 1024 * 1024  # 5MB
MAX_PDF_SIZE = 10 * 1024 * 1024  # 10MB


@router.post("/")
async def upload_file(
    file: UploadFile = File(...),
    type: str = Form(...),  # "photo" | "passport_scan" | "invitation"
    user: User = Depends(get_current_user),
):
    allowed = ALLOWED_IMAGE_TYPES | (ALLOWED_PDF_TYPES if type == "invitation" else set())
    max_size = MAX_PDF_SIZE if type == "invitation" else MAX_IMAGE_SIZE

    if file.content_type not in allowed:
        raise HTTPException(status_code=400, detail=f"Invalid file type: {file.content_type}")

    content = await file.read()
    if len(content) > max_size:
        raise HTTPException(status_code=400, detail=f"File too large. Max: {max_size // (1024*1024)}MB")

    # Save to user-specific directory
    user_dir = os.path.join(settings.UPLOAD_DIR, str(user.id))
    os.makedirs(user_dir, exist_ok=True)

    ext = file.filename.rsplit(".", 1)[-1] if file.filename and "." in file.filename else "jpg"
    filename = f"{type}_{uuid.uuid4().hex[:8]}.{ext}"
    filepath = os.path.join(user_dir, filename)

    with open(filepath, "wb") as f:
        f.write(content)

    return {
        "url": f"/api/upload/files/{user.id}/{filename}",
        "path": filepath,
    }


@router.get("/files/{user_id}/{filename}")
async def serve_file(user_id: int, filename: str):
    filepath = os.path.join(settings.UPLOAD_DIR, str(user_id), filename)
    if not os.path.exists(filepath):
        raise HTTPException(status_code=404, detail="File not found")
    return FileResponse(filepath)
