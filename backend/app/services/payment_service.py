"""Payment Service — Razorpay integration stub"""
import hmac
import hashlib
from fastapi import HTTPException
from app.config import settings


def create_razorpay_order(amount_inr: float, order_id: int) -> dict:
    """
    Create a Razorpay payment order.
    Replace the stub below with real Razorpay SDK call once keys are set.

    Real implementation:
        import razorpay
        client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))
        rp_order = client.order.create({
            "amount": int(amount_inr * 100),  # paise
            "currency": "INR",
            "receipt": f"fc_order_{order_id}",
        })
        return rp_order
    """
    if not settings.RAZORPAY_KEY_ID:
        # Return stub for development
        return {
            "id": f"order_stub_{order_id}",
            "entity": "order",
            "amount": int(amount_inr * 100),
            "currency": "INR",
            "status": "created",
            "receipt": f"fc_order_{order_id}",
            "key_id": "rzp_test_stub",
        }

    try:
        import razorpay
        client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))
        return client.order.create({
            "amount": int(amount_inr * 100),
            "currency": "INR",
            "receipt": f"fc_order_{order_id}",
        })
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Razorpay error: {str(e)}")


def verify_razorpay_payment(razorpay_order_id: str, razorpay_payment_id: str, razorpay_signature: str) -> bool:
    """
    Verify Razorpay payment signature.
    Returns True if valid, False otherwise.
    """
    if not settings.RAZORPAY_KEY_SECRET:
        return True  # Skip verification in dev stub mode

    body = f"{razorpay_order_id}|{razorpay_payment_id}"
    expected_sig = hmac.new(
        settings.RAZORPAY_KEY_SECRET.encode(),
        body.encode(),
        hashlib.sha256,
    ).hexdigest()
    return hmac.compare_digest(expected_sig, razorpay_signature)
