"""Orders Router — /api/orders/*"""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.order import OrderCreate
from app.services import order_service, cart_service
from app.middleware.auth_middleware import get_current_user
from app.models.user import User

router = APIRouter(prefix="/api/orders", tags=["Orders"])


@router.post("", status_code=201)
def place_order(
    data: OrderCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Place a new order from cart contents."""
    cart = cart_service.get_cart(current_user.id)
    order = order_service.create_order(db, current_user, data, cart["items"])
    cart_service.clear_cart(current_user.id)
    return order


@router.get("")
def list_orders(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Get all orders for the authenticated user."""
    return order_service.get_user_orders(db, current_user.id)


@router.get("/{order_id}")
def get_order(
    order_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Get a specific order by ID."""
    return order_service.get_order_by_id(db, order_id, current_user.id)
