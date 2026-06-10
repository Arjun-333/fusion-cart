import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { formatCurrency } from '../../utils/formatters';

const CartDrawer = () => {
  const { cart, isDrawerOpen, closeDrawer, updateQuantity, removeItem } = useCart();

  if (!isDrawerOpen) return null;

  return (
    <>
      <div 
        onClick={closeDrawer} 
        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100 }}
      ></div>
      
      <div style={{ 
        position: 'fixed', top: 0, right: 0, bottom: 0, width: '450px', maxWidth: '100%', 
        background: '#fff', zIndex: 101, display: 'flex', flexDirection: 'column',
        fontFamily: 'var(--font-sans)', borderLeft: '1px solid var(--color-border-dark)'
      }}>
        
        {/* Header */}
        <div style={{ padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border-dark)' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>
            Shopping Bag ({cart?.item_count || 0})
          </h3>
          <button onClick={closeDrawer} style={{ fontSize: '28px', lineHeight: 1, fontWeight: 300 }}>&times;</button>
        </div>
        
        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '32px' }}>
          {!cart?.items || cart.items.length === 0 ? (
            <div style={{ textAlign: 'center', paddingTop: '60px' }}>
              <p style={{ fontSize: '14px', marginBottom: '32px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Your bag is currently empty.</p>
              <button className="btn btn-primary" style={{ width: '100%' }} onClick={closeDrawer}>Continue Shopping</button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {cart.items.map(item => (
                <div key={item.id} style={{ display: 'flex', gap: '20px' }}>
                  <div style={{ width: '100px', height: '120px', background: 'var(--color-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--color-border)' }}>
                    <img 
                      src={item.product?.image_url || 'https://via.placeholder.com/100'} 
                      alt={item.product?.name || 'Product'} 
                      style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }} 
                    />
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ paddingRight: '16px' }}>
                        <h4 style={{ fontSize: '12px', fontWeight: 700, margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{item.product?.brand || 'DESIGNER'}</h4>
                        <p style={{ fontSize: '13px', margin: 0, color: 'var(--color-text)' }}>{item.product?.name}</p>
                      </div>
                    </div>
                    {item.selected_variant && (
                      <span style={{ fontSize: '12px', color: 'var(--color-text-light)', marginTop: '8px' }}>Size: {item.selected_variant}</span>
                    )}
                    <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', border: '1px solid var(--color-border-dark)' }}>
                        <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} style={{ padding: '4px 12px', fontSize: '14px' }}>-</button>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '20px', fontSize: '12px' }}>{item.quantity}</div>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ padding: '4px 12px', fontSize: '14px' }}>+</button>
                      </div>
                      <span style={{ fontSize: '14px', fontWeight: 700 }}>{formatCurrency(item.unit_price * item.quantity)}</span>
                    </div>
                    <button onClick={() => removeItem(item.id)} style={{ fontSize: '11px', color: 'var(--color-text-light)', textDecoration: 'underline', alignSelf: 'flex-start', marginTop: '12px' }}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Footer */}
        {cart?.items?.length > 0 && (
          <div style={{ padding: '32px', borderTop: '1px solid var(--color-border-dark)', background: '#fff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', fontSize: '16px', fontWeight: 700 }}>
              <span>Total</span>
              <span>{formatCurrency(cart.subtotal)}</span>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--color-text-light)', marginBottom: '24px' }}>Taxes and duties are calculated at checkout.</p>
            <Link to="/checkout" className="btn btn-primary" style={{ width: '100%', padding: '16px' }} onClick={closeDrawer}>
              Proceed to Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
