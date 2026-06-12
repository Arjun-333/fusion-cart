import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
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
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  // Close search on Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setSearchQuery('');
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

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
          position: 'relative',
        }}>
          
          {/* Left: Logo */}
          <div style={{ flex: '1 1 0%' }}>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center' }}>
              <img src="/logo.png" alt="FusionCart Logo" style={{ height: '90px', objectFit: 'contain', transform: 'scale(1.25)', transformOrigin: 'left center' }} />
            </Link>
          </div>

          {/* Center: Category Links (hidden when search is open) */}
          {!searchOpen && (
            <nav style={{ display: 'flex', gap: '24px', justifyContent: 'center', flex: '2 1 0%', alignItems: 'center' }}>
              <a href="/#foryou" style={{ 
                fontSize: '11px', 
                fontWeight: 600, 
                letterSpacing: '0.06em', 
                color: '#000',
                whiteSpace: 'nowrap',
                textDecoration: 'none'
              }}>
                FOR YOU
              </a>
              {['ELECTRONICS', 'CLOTHES', 'ACCESSORIES', 'HOME', 'BEAUTY'].map(link => (
                <Link key={link} to={`/shop?category=${link.toLowerCase()}`} style={{ 
                  fontSize: '11px', 
                  fontWeight: 600, 
                  letterSpacing: '0.06em', 
                  color: '#000',
                  whiteSpace: 'nowrap'
                }}>
                  {link}
                </Link>
              ))}
              
              {/* Dropdown for More */}
              <div style={{ position: 'relative', display: 'inline-block' }} className="nav-dropdown">
                <span style={{ 
                  fontSize: '11px', 
                  fontWeight: 600, 
                  letterSpacing: '0.06em', 
                  color: '#000',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  MORE <span style={{ fontSize: '8px' }}>▼</span>
                </span>
                <div className="dropdown-menu" style={{ 
                  position: 'absolute', 
                  top: '100%', 
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: '#fff', 
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
                  padding: '12px 0',
                  display: 'none',
                  flexDirection: 'column',
                  minWidth: '150px',
                  zIndex: 100,
                  marginTop: '10px'
                }}>
                  {['SPORTS', 'TOYS', 'BOOKS', 'GROCERY', 'AUTOMOTIVE'].map(link => (
                    <Link key={link} to={`/shop?category=${link.toLowerCase()}`} style={{ 
                      fontSize: '11px', 
                      fontWeight: 600, 
                      letterSpacing: '0.06em', 
                      color: '#000',
                      padding: '8px 24px',
                      textDecoration: 'none',
                      display: 'block'
                    }}>
                      {link}
                    </Link>
                  ))}
                </div>
              </div>
              
              <style dangerouslySetInnerHTML={{__html: `
                .nav-dropdown:hover .dropdown-menu {
                  display: flex !important;
                }
                .dropdown-menu a:hover {
                  background-color: #f5f5f5;
                }
              `}} />
            </nav>
          )}

          {/* Inline Search Bar (expands over center when open) */}
          {searchOpen && (
            <form
              onSubmit={handleSearchSubmit}
              style={{
                flex: '2 1 0%',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '0 24px',
                animation: 'searchFadeIn 0.2s ease'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                flex: 1,
                border: '1px solid #111',
                padding: '0 14px',
                height: '38px',
                gap: '10px',
              }}>
                <SearchIcon />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search products, brands..."
                  style={{
                    border: 'none',
                    outline: 'none',
                    fontSize: '13px',
                    letterSpacing: '0.03em',
                    flex: 1,
                    background: 'transparent',
                    padding: 0,
                    width: '100%',
                  }}
                />
                {searchQuery && (
                  <button type="button" onClick={() => setSearchQuery('')} style={{ color: '#999', display: 'flex' }}>
                    <CloseIcon />
                  </button>
                )}
              </div>
              <button
                type="button"
                onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.06em', color: '#666', whiteSpace: 'nowrap' }}
              >
                CANCEL
              </button>
            </form>
          )}

          {/* Right: Icon Actions */}
          <div style={{ display: 'flex', gap: '20px', flex: '1 1 0%', justifyContent: 'flex-end', alignItems: 'center' }}>
            
            {/* Search Toggle */}
            <button
              onClick={() => setSearchOpen(s => !s)}
              style={{ color: '#000', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
              aria-label="Search"
            >
              {searchOpen ? <CloseIcon /> : <SearchIcon />}
            </button>

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

        <style dangerouslySetInnerHTML={{__html: `
          @keyframes searchFadeIn {
            from { opacity: 0; transform: translateY(-4px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}} />
      </header>
      
      {/* Spacer */}
      <div style={{ height: '60px' }}></div>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;
