"""FusionCart Backend — FastAPI Application Entry Point"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from app.config import settings
from app.routers import auth, products, cart, orders, payments, ai

# --- App Init ---
app = FastAPI(
    title="FusionCart API",
    description="E-Commerce platform API with JWT Auth, Razorpay Payments, and AI Features",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# --- CORS ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL, "http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Routers ---
app.include_router(auth.router)
app.include_router(products.router)
app.include_router(cart.router)
app.include_router(orders.router)
app.include_router(payments.router)
app.include_router(ai.router)


# --- Root ---
@app.get("/", tags=["Health"])
def root():
    return {
        "name": "FusionCart API",
        "version": "1.0.0",
        "status": "running",
        "docs": "/docs",
    }


@app.get("/health", tags=["Health"])
def health_check():
    return {"status": "healthy", "env": settings.APP_ENV}


# --- Startup Event ---
@app.on_event("startup")
async def startup_event():
    print(f"[FusionCart] API starting in {settings.APP_ENV} mode")
    print(f"[FusionCart] API Docs: http://localhost:8000/docs")
    # Uncomment to auto-create DB tables when PostgreSQL is connected:
    # from app.database import create_tables
    # create_tables()
