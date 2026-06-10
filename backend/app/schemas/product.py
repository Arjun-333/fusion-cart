"""Pydantic Schemas — Product"""
from pydantic import BaseModel, Field
from typing import Optional, List, Any, Dict
from datetime import datetime


# --- Category ---
class CategoryBase(BaseModel):
    name: str
    slug: str
    description: Optional[str] = None
    icon: Optional[str] = None
    image_url: Optional[str] = None


class CategoryCreate(CategoryBase):
    pass


class CategoryOut(CategoryBase):
    id: int
    is_active: bool

    class Config:
        from_attributes = True


# --- Review ---
class ReviewCreate(BaseModel):
    rating: float = Field(..., ge=1, le=5)
    title: Optional[str] = None
    body: Optional[str] = None


class ReviewOut(BaseModel):
    id: int
    product_id: int
    user_id: int
    rating: float
    title: Optional[str] = None
    body: Optional[str] = None
    is_verified: bool
    created_at: datetime

    class Config:
        from_attributes = True


# --- Product ---
class ProductBase(BaseModel):
    name: str
    slug: str
    description: Optional[str] = None
    short_description: Optional[str] = None
    price: float
    original_price: Optional[float] = None
    discount_percent: float = 0
    category_id: Optional[int] = None
    brand: Optional[str] = None
    sku: Optional[str] = None
    stock_quantity: int = 0
    images: List[str] = []
    tags: List[str] = []
    specifications: Dict[str, Any] = {}
    variants: List[Dict[str, Any]] = []
    is_featured: bool = False
    is_new: bool = False
    is_bestseller: bool = False


class ProductCreate(ProductBase):
    pass


class ProductUpdate(BaseModel):
    name: Optional[str] = None
    price: Optional[float] = None
    stock_quantity: Optional[int] = None
    is_featured: Optional[bool] = None
    is_active: Optional[bool] = None


class ProductOut(ProductBase):
    id: int
    rating: float
    review_count: int
    is_active: bool
    is_featured: bool
    created_at: datetime
    category: Optional[CategoryOut] = None

    class Config:
        from_attributes = True


class ProductListOut(BaseModel):
    items: List[ProductOut]
    total: int
    page: int
    page_size: int
    total_pages: int
