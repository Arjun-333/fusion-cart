"""Order Service — create, retrieve, update orders"""
from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.order import Order, OrderItem, OrderStatus, PaymentStatus
from app.models.user import User
from app.schemas.order import OrderCreate
from app.services.product_service import MOCK_PRODUCTS
from app.utils.helpers import generate_order_number

# In-memory mock orders (replace with DB when connected)
MOCK_ORDERS = []
_order_id_counter = 1


def create_order(db: Session, user: User, data: OrderCreate, cart_items: list) -> dict:
    global _order_id_counter
    if not cart_items:
        raise HTTPException(status_code=400, detail="Cart is empty")

    subtotal = sum(item["unit_price"] * item["quantity"] for item in cart_items)
    shipping_charge = 0 if subtotal >= 999 else 49
    tax_amount = round(subtotal * 0.18, 2)
    total_amount = round(subtotal + shipping_charge + tax_amount, 2)

    order = {
        "id": _order_id_counter,
        "order_number": generate_order_number(),
        "user_id": user.id if hasattr(user, "id") else 1,
        "subtotal": subtotal,
        "discount_amount": 0,
        "shipping_charge": shipping_charge,
        "tax_amount": tax_amount,
        "total_amount": total_amount,
        "status": "pending",
        "payment_status": "pending",
        "razorpay_order_id": None,
        "shipping_address": data.shipping_address.model_dump(),
        "notes": data.notes,
        "items": cart_items,
        "created_at": "2024-01-01T00:00:00",
    }
    MOCK_ORDERS.append(order)
    _order_id_counter += 1
    return order


def get_user_orders(db: Session, user_id: int) -> list:
    return [o for o in MOCK_ORDERS if o["user_id"] == user_id]


def get_order_by_id(db: Session, order_id: int, user_id: int) -> dict:
    order = next((o for o in MOCK_ORDERS if o["id"] == order_id and o["user_id"] == user_id), None)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order


def update_order_payment(db: Session, order_id: int, razorpay_order_id: str, payment_id: str, signature: str) -> dict:
    order = next((o for o in MOCK_ORDERS if o["id"] == order_id), None)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    order["razorpay_order_id"] = razorpay_order_id
    order["razorpay_payment_id"] = payment_id
    order["razorpay_signature"] = signature
    order["payment_status"] = "paid"
    order["status"] = "confirmed"
    return order
