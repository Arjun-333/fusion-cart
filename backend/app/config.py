from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    APP_NAME: str = "FusionCart"
    APP_ENV: str = "development"
    DEBUG: bool = True
    API_V1_PREFIX: str = "/api"

    # Security
    SECRET_KEY: str = "fusioncart-dev-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    # Database
    DATABASE_URL: str = "postgresql://postgres:password@localhost:5432/fusioncart_db"

    # CORS
    FRONTEND_URL: str = "http://localhost:5173"

    # Razorpay
    RAZORPAY_KEY_ID: Optional[str] = None
    RAZORPAY_KEY_SECRET: Optional[str] = None

    # OpenAI
    OPENAI_API_KEY: Optional[str] = None

    # Groq
    GROQ_API_KEY: Optional[str] = None

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()
