"""General helper utilities"""
import uuid
import string
import random
from datetime import datetime


def generate_order_number() -> str:
    """Generate a unique order number like FC-20240601-A3X9"""
    date_str = datetime.utcnow().strftime("%Y%m%d")
    suffix = "".join(random.choices(string.ascii_uppercase + string.digits, k=6))
    return f"FC-{date_str}-{suffix}"


def generate_slug(name: str) -> str:
    """Convert a product name to a URL-friendly slug"""
    slug = name.lower().strip()
    slug = slug.replace(" ", "-")
    allowed = set(string.ascii_lowercase + string.digits + "-")
    slug = "".join(c for c in slug if c in allowed)
    return slug


def calculate_discount(price: float, original_price: float) -> float:
    """Calculate discount percentage"""
    if original_price and original_price > price:
        return round(((original_price - price) / original_price) * 100, 1)
    return 0.0


def paginate(query, page: int, page_size: int):
    """Apply pagination to a SQLAlchemy query"""
    total = query.count()
    items = query.offset((page - 1) * page_size).limit(page_size).all()
    total_pages = (total + page_size - 1) // page_size
    return items, total, total_pages
