"""Auth Router — /api/auth/*"""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.user import UserCreate, UserLogin, UserOut, Token, UserUpdate, AddressCreate, AddressOut
from app.services import auth_service
from app.middleware.auth_middleware import get_current_user
from app.models.user import User

router = APIRouter(prefix="/api/auth", tags=["Auth"])


@router.post("/register", response_model=UserOut, status_code=201)
def register(data: UserCreate, db: Session = Depends(get_db)):
    """Register a new user account."""
    return auth_service.register_user(db, data)


@router.post("/login", response_model=Token)
def login(data: UserLogin, db: Session = Depends(get_db)):
    """Login and receive JWT access token."""
    return auth_service.login_user(db, data)


@router.get("/me", response_model=UserOut)
def get_me(current_user: User = Depends(get_current_user)):
    """Get authenticated user profile."""
    return current_user


@router.put("/me", response_model=UserOut)
def update_profile(
    data: UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Update user profile fields."""
    return auth_service.update_user(db, current_user, data)


@router.post("/me/addresses", response_model=AddressOut, status_code=201)
def add_address(
    data: AddressCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Add a new shipping address."""
    return auth_service.add_address(db, current_user, data)


@router.delete("/me/addresses/{address_id}", status_code=204)
def delete_address(
    address_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Delete a saved address."""
    auth_service.delete_address(db, current_user, address_id)
