"""Pydantic Schemas — Order"""
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime
from app.models.order import OrderStatus, PaymentStatus


class OrderItemOut(BaseModel):
    id: int
    product_id: int
    quantity: int
    unit_price: float
    total_price: float
    selected_variant: Optional[Dict[str, Any]] = None
    product_snapshot: Optional[Dict[str, Any]] = None

    class Config:
        from_attributes = True


class ShippingAddressIn(BaseModel):
    full_name: str
    phone: str
    address_line1: str
    address_line2: Optional[str] = None
    city: str
    state: str
    pincode: Optional[str] = None
    postal_code: Optional[str] = None
    country: str = "India"


class OrderCreate(BaseModel):
    shipping_address: ShippingAddressIn
    notes: Optional[str] = None
    coupon_code: Optional[str] = None


class OrderOut(BaseModel):
    id: int
    order_number: str
    user_id: int
    subtotal: float
    discount_amount: float
    shipping_charge: float
    tax_amount: float
    total_amount: float
    status: OrderStatus
    payment_status: PaymentStatus
    razorpay_order_id: Optional[str] = None
    shipping_address: Dict[str, Any]
    notes: Optional[str] = None
    created_at: datetime
    items: List[OrderItemOut] = []

    class Config:
        from_attributes = True


class PaymentCreateOrder(BaseModel):
    amount: float  # in INR
    currency: str = "INR"
    order_id: int


class PaymentVerify(BaseModel):
    razorpay_order_id: str
    razorpay_payment_id: str
    razorpay_signature: str
    order_id: int
