"""FusionCart Backend — Cart ORM Models"""
from sqlalchemy import Column, Integer, Float, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base


class CartItem(Base):
    __tablename__ = "cart_items"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    quantity = Column(Integer, default=1)
    selected_variant = Column(JSON, nullable=True)  # {"size": "L", "color": "Black"}
    unit_price = Column(Float, nullable=False)       # Snapshot price at time of add
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    user = relationship("User", back_populates="cart_items")
    product = relationship("Product", back_populates="cart_items")
