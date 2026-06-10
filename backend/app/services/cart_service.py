"""Payment Service — Razorpay integration stub"""
from fastapi import HTTPException
from app.config import settings

# In-memory cart store (replace with DB session)
MOCK_CARTS: dict = {}  # user_id -> list of cart items
_cart_item_id = 1


def get_cart(user_id: int) -> dict:
    items = MOCK_CARTS.get(user_id, [])
    subtotal = sum(i["unit_price"] * i["quantity"] for i in items)
    return {"items": items, "subtotal": round(subtotal, 2), "item_count": sum(i["quantity"] for i in items)}


def add_to_cart(user_id: int, product_id: int, quantity: int, unit_price: float, selected_variant=None) -> dict:
    global _cart_item_id
    cart = MOCK_CARTS.setdefault(user_id, [])
    # Check if same product+variant exists
    for item in cart:
        if item["product_id"] == product_id and item.get("selected_variant") == selected_variant:
            item["quantity"] += quantity
            return get_cart(user_id)
    cart.append({
        "id": _cart_item_id,
        "product_id": product_id,
        "quantity": quantity,
        "unit_price": unit_price,
        "selected_variant": selected_variant,
        "total_price": unit_price * quantity,
    })
    _cart_item_id += 1
    return get_cart(user_id)


def update_cart_item(user_id: int, item_id: int, quantity: int) -> dict:
    cart = MOCK_CARTS.get(user_id, [])
    for item in cart:
        if item["id"] == item_id:
            item["quantity"] = quantity
            item["total_price"] = item["unit_price"] * quantity
            return get_cart(user_id)
    raise HTTPException(status_code=404, detail="Cart item not found")


def remove_cart_item(user_id: int, item_id: int) -> dict:
    cart = MOCK_CARTS.get(user_id, [])
    updated = [i for i in cart if i["id"] != item_id]
    if len(updated) == len(cart):
        raise HTTPException(status_code=404, detail="Cart item not found")
    MOCK_CARTS[user_id] = updated
    return get_cart(user_id)


def clear_cart(user_id: int):
    MOCK_CARTS[user_id] = []
