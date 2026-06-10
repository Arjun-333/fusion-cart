import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { formatCurrency } from '../utils/formatters';

const CartPage = () => {
  const { cart, updateQuantity, removeItem } = useCart();

  if (!cart?.items?.length) return (
    <div style={{ 
      minHeight: 'calc(100vh - 64px)', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '80px 20px',
      textAlign: 'center'
    }}>
      <h2 style={{ 
        fontFamily: 'var(--font-serif)', 
        fontSize: '32px', 
        fontWeight: 400, 
        fontStyle: 'italic',
        textTransform: 'none',
        letterSpacing: 0,
        marginBottom: '16px'
      }}>
        Your bag is empty
      </h2>
      <p style={{ color: 'var(--color-text-light)', marginBottom: '40px', fontSize: '14px' }}>
        Looks like you haven't added anything yet.
      </p>
      <Link to="/shop" className="btn btn-primary">Continue Shopping</Link>
    </div>
  );

  const shipping = cart.subtotal >= 5000 ? 0 : 250;
  const tax = Math.round(cart.subtotal * 0.18);
  const total = cart.subtotal + shipping + tax;

  return (
    <div style={{ padding: '40px 0 100px', minHeight: 'calc(100vh - 64px)' }}>
      <div className="container">

        {/* Page Title */}
        <div style={{ marginBottom: '48px', paddingBottom: '24px', borderBottom: '1px solid var(--color-border)' }}>
          <h1 style={{ 
            fontFamily: 'var(--font-serif)', 
            fontSize: '40px', 
            fontWeight: 400, 
            fontStyle: 'italic',
            textTransform: 'none',
            letterSpacing: 0
          }}>
            Shopping Bag
          </h1>
          <p style={{ fontSize: '12px', color: 'var(--color-text-light)', marginTop: '8px' }}>
            {cart.item_count} {cart.item_count === 1 ? 'item' : 'items'}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '80px', alignItems: 'flex-start' }}>

          {/* Cart Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {cart.items.map((item, idx) => (
              <div key={item.id} style={{ 
                padding: '32px 0', 
                borderBottom: '1px solid var(--color-border)',
                display: 'flex',
                gap: '28px'
              }}>
                <Link to={`/product/${item.product?.slug}`}>
                  <div style={{ 
                    width: '120px', 
                    height: '160px', 
                    background: 'var(--color-bg-soft)', 
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <img 
                      src={item.product?.image_url || 'https://via.placeholder.com/120x160/f8f8f8/111?text=Product'} 
                      alt={item.product?.name}
                      style={{ width: '100%', height: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }} 
                    />
                  </div>
                </Link>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
                        {item.product?.brand || 'DESIGNER'}
                      </p>
                      <Link to={`/product/${item.product?.slug}`}>
                        <h4 style={{ fontSize: '15px', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>
                          {item.product?.name || `Product #${item.product_id}`}
                        </h4>
                      </Link>
                    </div>
                    <p style={{ fontWeight: 700, fontSize: '16px', flexShrink: 0, marginLeft: '20px' }}>
                      {formatCurrency(item.unit_price * item.quantity)}
                    </p>
                  </div>

                  {item.selected_variant && (
                    <p style={{ fontSize: '12px', color: 'var(--color-text-light)' }}>
                      Size: {item.selected_variant}
                    </p>
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginTop: 'auto', paddingTop: '16px' }}>
                    {/* Quantity Control */}
                    <div style={{ display: 'flex', border: '1px solid var(--color-border)', alignItems: 'center' }}>
                      <button 
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', borderRight: '1px solid var(--color-border)' }}
                      >
                        −
                      </button>
                      <span style={{ width: '40px', textAlign: 'center', fontSize: '13px', fontWeight: 600 }}>{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', borderLeft: '1px solid var(--color-border)' }}
                      >
                        +
                      </button>
                    </div>

                    <button 
                      onClick={() => removeItem(item.id)}
                      style={{ fontSize: '11px', color: 'var(--color-text-light)', textDecoration: 'underline', letterSpacing: '0.05em' }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div style={{ position: 'sticky', top: 'calc(var(--nav-height) + 40px)' }}>
            <div style={{ border: '1px solid var(--color-border)', padding: '32px' }}>
              <h3 style={{ 
                fontSize: '13px', 
                fontWeight: 600, 
                letterSpacing: '0.1em', 
                textTransform: 'uppercase',
                marginBottom: '28px'
              }}>
                Order Summary
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ color: 'var(--color-text-light)' }}>Subtotal</span>
                  <span>{formatCurrency(cart.subtotal)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ color: 'var(--color-text-light)' }}>Delivery</span>
                  <span style={{ color: shipping === 0 ? 'var(--color-success)' : 'inherit' }}>
                    {shipping === 0 ? 'FREE' : formatCurrency(shipping)}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ color: 'var(--color-text-light)' }}>Tax (18%)</span>
                  <span>{formatCurrency(tax)}</span>
                </div>
              </div>

              <div className="divider" style={{ marginBottom: '24px' }}></div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: 700, marginBottom: '28px' }}>
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>

              {shipping > 0 && (
                <p style={{ fontSize: '11px', color: 'var(--color-text-light)', marginBottom: '24px', lineHeight: 1.5 }}>
                  Add {formatCurrency(5000 - cart.subtotal)} more for complimentary delivery.
                </p>
              )}

              <Link to="/checkout" className="btn btn-primary w-full" style={{ padding: '16px', display: 'flex', justifyContent: 'center' }}>
                Proceed to Checkout
              </Link>
              <Link to="/shop" style={{ 
                display: 'block', 
                textAlign: 'center', 
                marginTop: '16px', 
                fontSize: '11px', 
                color: 'var(--color-text-light)',
                textDecoration: 'underline',
                letterSpacing: '0.05em'
              }}>
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
