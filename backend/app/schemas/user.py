"""Pydantic Schemas — User"""
from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime
from app.models.user import UserRole


# --- Address ---
class AddressBase(BaseModel):
    label: str = "Home"
    full_name: str
    phone: str
    address_line1: str
    address_line2: Optional[str] = None
    city: str
    state: str
    pincode: Optional[str] = None
    postal_code: Optional[str] = None
    country: str = "India"
    is_default: bool = False


class AddressCreate(AddressBase):
    pass


class AddressOut(AddressBase):
    id: int
    user_id: int
    created_at: datetime

    class Config:
        from_attributes = True


# --- User ---
class UserBase(BaseModel):
    email: EmailStr
    username: Optional[str] = None
    full_name: str = Field(..., min_length=1)


class UserCreate(UserBase):
    password: str = Field(..., min_length=6)


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    phone: Optional[str] = None
    avatar_url: Optional[str] = None


class UserOut(UserBase):
    id: int
    role: UserRole
    avatar_url: Optional[str] = None
    phone: Optional[str] = None
    is_active: bool
    created_at: datetime
    addresses: list[AddressOut] = []

    class Config:
        from_attributes = True


class UserPublic(BaseModel):
    id: int
    username: str
    full_name: str
    avatar_url: Optional[str] = None

    class Config:
        from_attributes = True


# --- Auth Tokens ---
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOut


class TokenData(BaseModel):
    user_id: Optional[int] = None
