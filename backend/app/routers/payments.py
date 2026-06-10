"""Payments Router — /api/payments/*"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.order import PaymentCreateOrder, PaymentVerify
from app.services import payment_service, order_service
from app.middleware.auth_middleware import get_current_user
from app.models.user import User

router = APIRouter(prefix="/api/payments", tags=["Payments"])


@router.post("/create-order")
def create_payment_order(
    data: PaymentCreateOrder,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Create a Razorpay payment order for a given FusionCart order."""
    rp_order = payment_service.create_razorpay_order(data.amount, data.order_id)
    return {
        "razorpay_order_id": rp_order["id"],
        "amount": rp_order["amount"],
        "currency": rp_order["currency"],
        "key_id": rp_order.get("key_id", "rzp_test_stub"),
    }


@router.post("/verify")
def verify_payment(
    data: PaymentVerify,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Verify Razorpay payment signature and confirm order."""
    is_valid = payment_service.verify_razorpay_payment(
        data.razorpay_order_id,
        data.razorpay_payment_id,
        data.razorpay_signature,
    )
    if not is_valid:
        raise HTTPException(status_code=400, detail="Payment verification failed")

    order = order_service.update_order_payment(
        db,
        data.order_id,
        data.razorpay_order_id,
        data.razorpay_payment_id,
        data.razorpay_signature,
    )
    return {"message": "Payment verified successfully", "order": order}
