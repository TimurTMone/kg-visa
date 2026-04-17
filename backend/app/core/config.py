from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql+asyncpg://timurmone@localhost:5432/kgvisa"
    SECRET_KEY: str = "change-me-to-a-real-secret-key-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440  # 24 hours
    FRONTEND_URL: str = "http://localhost:3004"
    UPLOAD_DIR: str = "./uploads"

    model_config = {"env_file": ".env", "extra": "ignore"}


settings = Settings()
