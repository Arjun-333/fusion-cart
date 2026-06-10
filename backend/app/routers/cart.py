"""Cart Router — /api/cart/*"""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.cart import CartItemCreate, CartItemUpdate
from app.services import cart_service, product_service
from app.middleware.auth_middleware import get_current_user
from app.models.user import User
from fastapi import HTTPException

router = APIRouter(prefix="/api/cart", tags=["Cart"])


@router.get("")
def get_cart(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """Get current user's cart."""
    user_id = current_user.id
    cart = cart_service.get_cart(user_id)
    # Enrich with product info
    for item in cart["items"]:
        try:
            item["product"] = product_service.get_product_by_id(db, item["product_id"])
        except Exception:
            item["product"] = None
    return cart


@router.post("", status_code=201)
def add_to_cart(
    data: CartItemCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Add a product to cart."""
    product = product_service.get_product_by_id(db, data.product_id)
    if product["stock_quantity"] < data.quantity:
        raise HTTPException(status_code=400, detail="Insufficient stock")

    return cart_service.add_to_cart(
        user_id=current_user.id,
        product_id=data.product_id,
        quantity=data.quantity,
        unit_price=product["price"],
        selected_variant=data.selected_variant,
    )


@router.put("/{item_id}")
def update_cart_item(
    item_id: int,
    data: CartItemUpdate,
    current_user: User = Depends(get_current_user),
):
    """Update quantity of a cart item."""
    return cart_service.update_cart_item(current_user.id, item_id, data.quantity)


@router.delete("/{item_id}")
def remove_from_cart(
    item_id: int,
    current_user: User = Depends(get_current_user),
):
    """Remove an item from the cart."""
    return cart_service.remove_cart_item(current_user.id, item_id)


@router.delete("")
def clear_cart(current_user: User = Depends(get_current_user)):
    """Clear all items in the cart."""
    cart_service.clear_cart(current_user.id)
    return {"message": "Cart cleared"}
