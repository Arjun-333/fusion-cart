"""FusionCart Backend — Product ORM Models"""
from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, Text, ForeignKey, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base


class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, nullable=False)
    slug = Column(String(100), unique=True, nullable=False)
    description = Column(Text, nullable=True)
    icon = Column(String(100), nullable=True)
    image_url = Column(String(500), nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    products = relationship("Product", back_populates="category")


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    slug = Column(String(255), unique=True, nullable=False, index=True)
    description = Column(Text, nullable=True)
    short_description = Column(String(500), nullable=True)
    price = Column(Float, nullable=False)
    original_price = Column(Float, nullable=True)  # For showing discounts
    discount_percent = Column(Float, default=0)
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=True)
    brand = Column(String(100), nullable=True)
    sku = Column(String(100), unique=True, nullable=True)
    stock_quantity = Column(Integer, default=0)
    images = Column(JSON, default=list)           # List of image URLs
    tags = Column(JSON, default=list)             # Searchable tags
    specifications = Column(JSON, default=dict)   # Key-value specs
    variants = Column(JSON, default=list)         # Sizes, colors, etc.
    rating = Column(Float, default=0.0)
    review_count = Column(Integer, default=0)
    is_featured = Column(Boolean, default=False)
    is_active = Column(Boolean, default=True)
    is_new = Column(Boolean, default=False)
    is_bestseller = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    category = relationship("Category", back_populates="products")
    cart_items = relationship("CartItem", back_populates="product")
    order_items = relationship("OrderItem", back_populates="product")
    reviews = relationship("Review", back_populates="product")


class Review(Base):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    rating = Column(Float, nullable=False)
    title = Column(String(255), nullable=True)
    body = Column(Text, nullable=True)
    is_verified = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    product = relationship("Product", back_populates="reviews")
