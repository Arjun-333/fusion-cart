"""JWT Auth middleware — FastAPI dependency for protected routes"""
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from app.database import get_db
from app.utils.security import decode_access_token
from typing import Optional

security = HTTPBearer()
security_optional = HTTPBearer(auto_error=False)


def _get_user_from_payload(payload, db: Session):
    """Lookup user from token payload — tries DB first, then mock store."""
    if not payload:
        return None
    user_id = payload.get("sub")
    if not user_id:
        return None

    # Try DB
    try:
        db.execute(__import__("sqlalchemy").text("SELECT 1"))
        from app.models.user import User
        return db.query(User).filter(User.id == int(user_id), User.is_active == True).first()
    except Exception:
        pass

    # Mock store fallback
    from app.services.auth_service import MOCK_USERS, _MockUser
    user_data = next((u for u in MOCK_USERS if u["id"] == int(user_id)), None)
    return _MockUser(user_data) if user_data else None


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db),
):
    """Decode JWT and return the authenticated user. Raises 401 if invalid."""
    payload = decode_access_token(credentials.credentials)
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    user = _get_user_from_payload(payload, db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found or inactive",
        )
    return user


def get_current_admin(current_user=Depends(get_current_user)):
    """Require admin role. Raises 403 if not admin."""
    role = getattr(current_user, "role", None)
    if str(role) not in ("admin", "UserRole.admin"):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Admin access required")
    return current_user


def get_optional_user(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(security_optional),
    db: Session = Depends(get_db),
):
    """Return user if token is present and valid, else None (for public routes)."""
    if not credentials:
        return None
    payload = decode_access_token(credentials.credentials)
    return _get_user_from_payload(payload, db)

