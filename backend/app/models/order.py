"""FusionCart Backend — Order ORM Models"""
from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, Text, ForeignKey, JSON, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum
from app.database import Base


class OrderStatus(str, enum.Enum):
    pending = "pending"
    confirmed = "confirmed"
    processing = "processing"
    shipped = "shipped"
    out_for_delivery = "out_for_delivery"
    delivered = "delivered"
    cancelled = "cancelled"
    refunded = "refunded"


class PaymentStatus(str, enum.Enum):
    pending = "pending"
    paid = "paid"
    failed = "failed"
    refunded = "refunded"


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    order_number = Column(String(50), unique=True, nullable=False, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    # Pricing
    subtotal = Column(Float, nullable=False)
    discount_amount = Column(Float, default=0)
    shipping_charge = Column(Float, default=0)
    tax_amount = Column(Float, default=0)
    total_amount = Column(Float, nullable=False)

    # Status
    status = Column(Enum(OrderStatus), default=OrderStatus.pending)
    payment_status = Column(Enum(PaymentStatus), default=PaymentStatus.pending)

    # Payment details (Razorpay)
    razorpay_order_id = Column(String(255), nullable=True)
    razorpay_payment_id = Column(String(255), nullable=True)
    razorpay_signature = Column(String(500), nullable=True)

    # Shipping address snapshot
    shipping_address = Column(JSON, nullable=False)

    # Notes
    notes = Column(Text, nullable=True)

    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    delivered_at = Column(DateTime(timezone=True), nullable=True)

    # Relationships
    user = relationship("User", back_populates="orders")
    items = relationship("OrderItem", back_populates="order")


class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"), nullable=False)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    quantity = Column(Integer, nullable=False)
    unit_price = Column(Float, nullable=False)
    total_price = Column(Float, nullable=False)
    selected_variant = Column(JSON, nullable=True)
    product_snapshot = Column(JSON, nullable=True)  # Snapshot at time of order

    order = relationship("Order", back_populates="items")
    product = relationship("Product", back_populates="order_items")
