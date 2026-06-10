import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import CartDrawer from '../cart/CartDrawer';

/* ─── SVG Icons ────────────────────────────────── */
const SearchIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const GlobeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const BagIcon = ({ count }) => (
  <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '4px' }}>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
    <span style={{ fontSize: '11px', fontWeight: 600 }}>({count})</span>
  </div>
);

const UserIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

/* ─── Navbar ───────────────────────────────────── */
const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        zIndex: 50,
        background: '#fff',
        borderBottom: '1px solid var(--color-border)',
        fontFamily: 'var(--font-sans)',
        transition: 'box-shadow 0.3s ease',
        boxShadow: isScrolled ? '0 1px 12px rgba(0,0,0,0.06)' : 'none'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          height: '60px',
          padding: '0 32px',
        }}>
          
          {/* Left: Logo */}
          <div style={{ flex: '1 1 0%' }}>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center' }}>
              <img src="/logo.png" alt="FusionCart Logo" style={{ height: '90px', objectFit: 'contain', transform: 'scale(1.25)', transformOrigin: 'left center' }} />
            </Link>
          </div>

          {/* Center: Category Links */}
          <nav style={{ display: 'flex', gap: '24px', justifyContent: 'center', flex: '2 1 0%' }}>
            {['SKINCARE', 'MAKEUP', 'BALMS', 'BODY', 'FRAGRANCE', 'GOODS', 'SETS', 'SHOP ALL'].map(link => (
              <Link key={link} to={`/shop?category=${link.toLowerCase().replace(' ', '-')}`} style={{ 
                fontSize: '11px', 
                fontWeight: 600, 
                letterSpacing: '0.06em', 
                color: '#000',
                whiteSpace: 'nowrap'
              }}>
                {link}
              </Link>
            ))}
          </nav>

          {/* Right: Icon Actions */}
          <div style={{ display: 'flex', gap: '20px', flex: '1 1 0%', justifyContent: 'flex-end', alignItems: 'center' }}>
            
            {/* Search */}
            <Link to="/shop" style={{ color: '#000', display: 'flex', alignItems: 'center' }} aria-label="Search">
              <SearchIcon />
            </Link>

            {/* Region */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontWeight: 600, color: '#000', cursor: 'pointer' }}>
              <GlobeIcon />
              <span>IN</span>
            </div>

            {/* Stores */}
            <Link to="/stores" style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.06em', color: '#000' }}>
              STORES
            </Link>

            {/* Account */}
            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Link to="/profile" style={{ color: '#000', display: 'flex', alignItems: 'center' }} aria-label="Account">
                  <UserIcon />
                </Link>
                <button onClick={logout} style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.06em', color: '#000' }}>
                  LOG OUT
                </button>
              </div>
            ) : (
              <Link to="/login" style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.06em', color: '#000' }}>
                LOG IN
              </Link>
            )}

            {/* Bag */}
            <button 
              onClick={() => setIsCartOpen(true)} 
              style={{ color: '#000', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
              aria-label="Shopping bag"
            >
              <BagIcon count={cart?.item_count || 0} />
            </button>
          </div>
        </div>
      </header>
      
      {/* Spacer */}
      <div style={{ height: '60px' }}></div>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;
