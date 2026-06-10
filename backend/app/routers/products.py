"""Products Router — /api/products/*"""
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import Optional
from app.database import get_db
from app.services import product_service

router = APIRouter(prefix="/api/products", tags=["Products"])


@router.get("")
def list_products(
    db: Session = Depends(get_db),
    page: int = Query(1, ge=1),
    page_size: int = Query(12, ge=1, le=50),
    category_id: Optional[int] = None,
    search: Optional[str] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    is_featured: Optional[bool] = None,
    sort_by: str = "created_at",
):
    """List products with optional filtering, search, and pagination."""
    return product_service.get_products(
        db, page, page_size, category_id, search, min_price, max_price, is_featured, sort_by
    )


@router.get("/featured")
def featured_products(db: Session = Depends(get_db), limit: int = 8):
    """Return featured products for homepage."""
    return product_service.get_featured_products(db, limit)


@router.get("/bestsellers")
def bestseller_products(db: Session = Depends(get_db), limit: int = 8):
    """Return bestselling products."""
    return product_service.get_bestseller_products(db, limit)


@router.get("/new-arrivals")
def new_arrivals(db: Session = Depends(get_db), limit: int = 8):
    """Return newest products."""
    return product_service.get_new_arrivals(db, limit)


@router.get("/categories")
def list_categories(db: Session = Depends(get_db)):
    """Return all active product categories."""
    return product_service.get_categories(db)


@router.get("/slug/{slug}")
def product_by_slug(slug: str, db: Session = Depends(get_db)):
    """Get a single product by URL slug."""
    return product_service.get_product_by_slug(db, slug)


@router.get("/{product_id}")
def product_by_id(product_id: int, db: Session = Depends(get_db)):
    """Get a single product by ID."""
    return product_service.get_product_by_id(db, product_id)
