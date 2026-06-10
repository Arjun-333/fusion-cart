import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { orderService } from '../services/orderService';
import { paymentService } from '../services/paymentService';
import { formatCurrency } from '../utils/formatters';
import '../styles/components.css';

const STEPS = ['Address', 'Review', 'Payment'];

const CheckoutPage = () => {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({
    full_name: user?.full_name || '',
    phone: '',
    address_line1: '',
    city: '',
    state: '',
    postal_code: '',
    country: 'India'
  });
  const [error, setError] = useState('');

  const shipping = (cart?.subtotal || 0) >= 5000 ? 0 : 250;
  const tax = Math.round((cart?.subtotal || 0) * 0.18);
  const total = (cart?.subtotal || 0) + shipping + tax;

  const handleAddressChange = (e) => setAddress({ ...address, [e.target.name]: e.target.value });

  const handlePlaceOrder = async () => {
    setLoading(true);
    setError('');
    try {
      const order = await orderService.placeOrder({ shipping_address: address, notes: '' });
      try {
        const rpOrder = await paymentService.createOrder(total, order.id);
        if (rpOrder.key_id && rpOrder.key_id !== 'rzp_test_stub' && window.Razorpay) {
          const rzp = new window.Razorpay({
            key: rpOrder.key_id,
            amount: rpOrder.amount,
            currency: 'INR',
            order_id: rpOrder.razorpay_order_id,
            name: 'FusionCart',
            handler: async (response) => {
              await paymentService.verifyPayment({ order_id: order.id, ...response });
              await clearCart();
              navigate(`/orders/${order.id}`);
            },
          });
          rzp.open();
          return;
        }
      } catch (_) {}
      await clearCart();
      navigate('/orders');
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!cart?.items?.length) return (
    <div style={{ minHeight: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', textAlign: 'center' }}>
      <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '32px', fontWeight: 400, fontStyle: 'italic', textTransform: 'none', letterSpacing: 0, marginBottom: '16px' }}>Your bag is empty</h2>
      <Link to="/shop" className="btn btn-primary" style={{ marginTop: '24px' }}>Continue Shopping</Link>
    </div>
  );

  const FIELDS = [
    { name: 'full_name', label: 'Full Name', full: true },
    { name: 'phone', label: 'Phone Number', full: true },
    { name: 'address_line1', label: 'Address Line', full: true },
    { name: 'city', label: 'City' },
    { name: 'state', label: 'State' },
    { name: 'postal_code', label: 'PIN Code' },
    { name: 'country', label: 'Country' },
  ];

  return (
    <div style={{ padding: '40px 0 100px', minHeight: 'calc(100vh - 64px)' }}>
      <div className="container" style={{ maxWidth: '1100px' }}>

        {/* Title */}
        <div style={{ marginBottom: '48px', paddingBottom: '24px', borderBottom: '1px solid var(--color-border)' }}>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '40px', fontWeight: 400, fontStyle: 'italic', textTransform: 'none', letterSpacing: 0 }}>
            Checkout
          </h1>
        </div>

        {/* Step Indicator */}
        <div className="checkout-steps" style={{ marginBottom: '48px' }}>
          {STEPS.map((s, i) => (
            <div key={s} className={`step-item ${i === step ? 'active' : i < step ? 'completed' : ''}`}>
              <div className="step-circle">{i < step ? '✓' : i + 1}</div>
              <span>{s}</span>
              {i < STEPS.length - 1 && <div style={{ flex: 1, height: '1px', background: 'var(--color-border)', margin: '0 20px' }} />}
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '80px', alignItems: 'flex-start' }}>

          {/* ── Main Content ── */}
          <div>

            {/* Step 0 — Address */}
            {step === 0 && (
              <div>
                <h3 style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '32px' }}>
                  Delivery Address
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                  {FIELDS.map(f => (
                    <div key={f.name} className="input-group" style={{ gridColumn: f.full ? '1 / -1' : undefined }}>
                      <label className="input-label">{f.label}</label>
                      <input name={f.name} value={address[f.name]} onChange={handleAddressChange} required />
                    </div>
                  ))}
                </div>
                <button className="btn btn-primary" style={{ marginTop: '40px', padding: '16px 48px' }} onClick={() => setStep(1)}>
                  Continue to Review
                </button>
              </div>
            )}

            {/* Step 1 — Review */}
            {step === 1 && (
              <div>
                <h3 style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '32px' }}>
                  Review Order
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                  {cart.items.map((item, idx) => (
                    <div key={item.id} style={{ display: 'flex', gap: '20px', padding: '20px 0', borderBottom: '1px solid var(--color-border)' }}>
                      <div style={{ width: '80px', height: '100px', background: 'var(--color-bg-soft)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src={item.product?.image_url || 'https://via.placeholder.com/80'} alt="" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '4px' }}>{item.product?.brand || 'DESIGNER'}</p>
                        <p style={{ fontSize: '14px', marginBottom: '6px' }}>{item.product?.name}</p>
                        <p style={{ fontSize: '12px', color: 'var(--color-text-light)' }}>Qty: {item.quantity}</p>
                      </div>
                      <p style={{ fontWeight: 700, fontSize: '15px', flexShrink: 0 }}>{formatCurrency(item.unit_price * item.quantity)}</p>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: '32px', padding: '24px', border: '1px solid var(--color-border)' }}>
                  <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>Delivering To</p>
                  <p style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>{address.full_name}</p>
                  <p style={{ fontSize: '13px', color: 'var(--color-text-light)', lineHeight: 1.6 }}>
                    {address.address_line1}, {address.city}, {address.state} {address.postal_code}<br />
                    {address.phone}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '16px', marginTop: '40px' }}>
                  <button className="btn btn-secondary" style={{ padding: '14px 32px' }} onClick={() => setStep(0)}>← Back</button>
                  <button className="btn btn-primary" style={{ flex: 1, padding: '16px' }} onClick={() => setStep(2)}>Proceed to Payment</button>
                </div>
              </div>
            )}

            {/* Step 2 — Payment */}
            {step === 2 && (
              <div>
                <h3 style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '32px' }}>
                  Payment
                </h3>

                {error && (
                  <div style={{ marginBottom: '24px', padding: '14px 16px', border: '1px solid var(--color-error)', color: 'var(--color-error)', fontSize: '13px' }}>
                    {error}
                  </div>
                )}

                <div style={{ padding: '24px', border: '1px solid var(--color-border)', marginBottom: '32px' }}>
                  <p style={{ fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>Razorpay Secure Checkout</p>
                  <p style={{ fontSize: '12px', color: 'var(--color-text-light)' }}>UPI · Cards · Net Banking · Wallets accepted</p>
                </div>

                <div style={{ padding: '16px 20px', background: 'var(--color-bg-soft)', border: '1px solid var(--color-border)', marginBottom: '32px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px' }}>🔒</span>
                  <span style={{ fontSize: '12px', color: 'var(--color-text-light)' }}>Secured by 256-bit SSL encryption</span>
                </div>

                <div style={{ display: 'flex', gap: '16px' }}>
                  <button className="btn btn-secondary" style={{ padding: '14px 32px' }} onClick={() => setStep(1)}>← Back</button>
                  <button className="btn btn-primary" style={{ flex: 1, padding: '16px' }} onClick={handlePlaceOrder} disabled={loading}>
                    {loading ? <span className="spinner"></span> : `Pay ${formatCurrency(total)}`}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ── Order Summary ── */}
          <div style={{ position: 'sticky', top: 'calc(var(--nav-height) + 40px)' }}>
            <div style={{ border: '1px solid var(--color-border)', padding: '32px' }}>
              <h4 style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '28px' }}>
                Order Summary
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ color: 'var(--color-text-light)' }}>Subtotal ({cart.item_count} items)</span>
                  <span>{formatCurrency(cart.subtotal)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ color: 'var(--color-text-light)' }}>Delivery</span>
                  <span style={{ color: shipping === 0 ? 'var(--color-success)' : 'inherit' }}>{shipping === 0 ? 'FREE' : formatCurrency(shipping)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ color: 'var(--color-text-light)' }}>GST (18%)</span>
                  <span>{formatCurrency(tax)}</span>
                </div>
              </div>
              <div className="divider" style={{ marginBottom: '24px' }}></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: 700 }}>
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
