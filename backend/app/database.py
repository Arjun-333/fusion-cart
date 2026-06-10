from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.config import settings

# SQLAlchemy engine — connect_args only needed for SQLite (not PostgreSQL)
engine = create_engine(
    settings.DATABASE_URL,
    # For async support in production, consider using asyncpg + SQLAlchemy async
    # connect_args={"check_same_thread": False}  # SQLite only
    pool_pre_ping=True,
    pool_size=10,
    max_overflow=20,
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    """FastAPI dependency: yields a DB session and ensures it closes after request."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def create_tables():
    """Create all tables defined in models (call on startup)."""
    Base.metadata.create_all(bind=engine)
