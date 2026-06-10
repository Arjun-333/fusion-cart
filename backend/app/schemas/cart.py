"""Pydantic Schemas — Cart"""
from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from datetime import datetime
from app.schemas.product import ProductOut


class CartItemCreate(BaseModel):
    product_id: int
    quantity: int = Field(default=1, ge=1)
    selected_variant: Optional[Dict[str, Any]] = None


class CartItemUpdate(BaseModel):
    quantity: int = Field(..., ge=1)


class CartItemOut(BaseModel):
    id: int
    product_id: int
    quantity: int
    unit_price: float
    selected_variant: Optional[Dict[str, Any]] = None
    product: Optional[ProductOut] = None
    total_price: float = 0

    class Config:
        from_attributes = True

    @property
    def computed_total(self) -> float:
        return self.quantity * self.unit_price


class CartOut(BaseModel):
    items: List[CartItemOut]
    subtotal: float
    item_count: int
