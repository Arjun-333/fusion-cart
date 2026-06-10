"""Auth Service — register, login, user management (DB + mock fallback)"""
from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.utils.security import hash_password, verify_password, create_access_token
import uuid

# ── In-memory mock store (used until PostgreSQL is connected) ──
MOCK_USERS: list[dict] = []
MOCK_ADDRESSES: list[dict] = []
_uid = 1


def _next_uid():
    global _uid
    _uid += 1
    return _uid


def _db_available(db: Session) -> bool:
    try:
        db.execute(__import__("sqlalchemy").text("SELECT 1"))
        return True
    except Exception:
        return False


# ── Register ───────────────────────────────────────────────────
def register_user(db: Session, data):
    if _db_available(db):
        from app.models.user import User, Address
        if db.query(User).filter(User.email == data.email).first():
            raise HTTPException(status_code=400, detail="Email already registered")
        user = User(
            email=data.email,
            username=data.username or data.email.split("@")[0],
            full_name=data.full_name,
            hashed_password=hash_password(data.password),
        )
        db.add(user)
        db.commit()
        db.refresh(user)
        return user

    # Mock fallback
    if any(u["email"] == data.email for u in MOCK_USERS):
        raise HTTPException(status_code=400, detail="Email already registered")
    user = {
        "id": _next_uid(), "email": data.email,
        "username": data.username or data.email.split("@")[0],
        "full_name": data.full_name, "phone": None, "avatar_url": None,
        "hashed_password": hash_password(data.password),
        "is_active": True, "is_verified": False, "role": "customer",
        "addresses": [], "created_at": "2024-01-01T00:00:00",
    }
    MOCK_USERS.append(user)
    return _MockUser(user)


# ── Login ──────────────────────────────────────────────────────
def login_user(db: Session, data) -> dict:
    if _db_available(db):
        from app.models.user import User
        user = db.query(User).filter(User.email == data.email).first()
        if not user or not verify_password(data.password, user.hashed_password):
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")
        if not user.is_active:
            raise HTTPException(status_code=403, detail="Account deactivated")
        token = create_access_token({"sub": str(user.id)})
        return {"access_token": token, "token_type": "bearer", "user": user}

    # Mock fallback
    user_data = next((u for u in MOCK_USERS if u["email"] == data.email), None)
    if not user_data or not verify_password(data.password, user_data["hashed_password"]):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")
    token = create_access_token({"sub": str(user_data["id"])})
    return {"access_token": token, "token_type": "bearer", "user": _MockUser(user_data)}


# ── Update Profile ────────────────────────────────────────────
def update_user(db: Session, user, data) -> object:
    if _db_available(db):
        for field, value in data.model_dump(exclude_unset=True).items():
            setattr(user, field, value)
        db.commit()
        db.refresh(user)
        return user

    # Mock fallback
    user_data = next((u for u in MOCK_USERS if u["id"] == user.id), None)
    if user_data:
        for field, value in data.model_dump(exclude_unset=True).items():
            user_data[field] = value
    return _MockUser(user_data or {})


# ── Addresses ─────────────────────────────────────────────────
def add_address(db: Session, user, data) -> object:
    addr = {"id": _next_uid(), "user_id": user.id, "created_at": "2024-01-01T00:00:00", **data.model_dump()}
    MOCK_ADDRESSES.append(addr)
    return type("Address", (), addr)()


def delete_address(db: Session, user, address_id: int) -> bool:
    global MOCK_ADDRESSES
    MOCK_ADDRESSES = [a for a in MOCK_ADDRESSES if not (a["id"] == address_id and a["user_id"] == user.id)]
    return True


# ── Mock user object (duck-types SQLAlchemy model) ─────────────
class _MockUser:
    def __init__(self, data: dict):
        for k, v in data.items():
            setattr(self, k, v)
        if not hasattr(self, "addresses"):
            self.addresses = []

    def __repr__(self):
        return f"<MockUser id={getattr(self, 'id', None)} email={getattr(self, 'email', None)}>"
