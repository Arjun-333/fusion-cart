import React from 'react';
import { Link } from 'react-router-dom';

/* ─── SVG Social Icons ──────────────────────────── */
const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const PinterestIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
  </svg>
);

const TikTokIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
  </svg>
);

const Footer = () => {
  return (
    <footer style={{
      background: '#f8f8f8',
      fontFamily: 'var(--font-sans)',
      color: '#000',
    }}>
      {/* ── Main Links Section ────────────────────────── */}
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '24px 40px', display: 'flex', gap: '40px', flexWrap: 'wrap' }}>

        {/* Left: Newsletter */}
        <div style={{ flex: '2 1 280px', paddingRight: '20px' }}>
          <h3 style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '12px' }}>
            STEP INTO THE WORLD OF FUSION CART
          </h3>
          <p style={{ fontSize: '12px', lineHeight: 1.6, marginBottom: '20px' }}>
            Join us for early access to our latest collections, exclusive collaborations and brand updates.
          </p>

          <div style={{ display: 'flex', borderBottom: '1px solid #ccc', paddingBottom: '8px', marginBottom: '12px' }}>
            <input
              type="email"
              placeholder="Enter your email address"
              style={{ border: 'none', background: 'transparent', padding: '0', fontSize: '12px', flex: 1, outline: 'none', color: '#000' }}
            />
            <button style={{ color: '#666', fontSize: '14px' }}>&rsaquo;</button>
          </div>

          <p style={{ fontSize: '10px', color: '#666', lineHeight: 1.5, marginBottom: '20px' }}>
            *By proceeding, you agree to the Fusion Cart <strong>Terms &amp; Conditions</strong>, have read and understood the Fusion Cart <strong>Privacy Policy</strong>, and consent to receiving brand marketing messages.
          </p>

          <div style={{ display: 'flex', gap: '18px', alignItems: 'center' }}>
            <a href="#" aria-label="Instagram" style={{ color: '#000', display: 'flex' }}><InstagramIcon /></a>
            <a href="#" aria-label="Facebook"  style={{ color: '#000', display: 'flex' }}><FacebookIcon /></a>
            <a href="#" aria-label="X"         style={{ color: '#000', display: 'flex' }}><XIcon /></a>
            <a href="#" aria-label="Pinterest" style={{ color: '#000', display: 'flex' }}><PinterestIcon /></a>
            <a href="#" aria-label="TikTok"    style={{ color: '#000', display: 'flex' }}><TikTokIcon /></a>
          </div>
        </div>

        {/* Right: Link columns */}
        <div style={{ flex: '3 1 580px', display: 'flex', gap: '16px', justifyContent: 'space-between', flexWrap: 'wrap' }}>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h4 style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>SUPPORT</h4>
            {['Contact us','FAQs','Check my order status','Submit a return','Find a boutique','Delivery','Returns & Exchanges'].map(t => (
              <Link key={t} to="#" style={{ fontSize: '12px', color: '#000' }}>{t}</Link>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h4 style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>SERVICES</h4>
            {['Book An Appointment','Made-to-Order','Care and Repair','Warranty'].map(t => (
              <Link key={t} to="#" style={{ fontSize: '12px', color: '#000' }}>{t}</Link>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h4 style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>OUR COMPANY</h4>
            {['About us','FC World','Latest News','Sustainability','Careers'].map(t => (
              <Link key={t} to="#" style={{ fontSize: '12px', color: '#000' }}>{t}</Link>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h4 style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>LEGAL</h4>
            {['Privacy Policy','Terms and Conditions','Right to Be Forgotten Form','Subject Access Request Form','Company Policies','Manage Cookies','Accessibility'].map(t => (
              <Link key={t} to="#" style={{ fontSize: '12px', color: '#000' }}>{t}</Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── Marquee Banner ─────────────────────────────── */}
      <div style={{ 
        overflow: 'hidden', 
        width: '100%',
        whiteSpace: 'nowrap',
        borderTop: '1px solid #e5e5e5',
        borderBottom: '1px solid #e5e5e5'
      }}>
        <style>
          {`
            @keyframes marquee-rtl {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-50%); }
            }
          `}
        </style>
        <div style={{ 
          display: 'inline-flex',
          animation: 'marquee-rtl 25s linear infinite',
          fontSize: '13px', 
          fontWeight: 700, 
          letterSpacing: '0.22em' 
        }}>
          {Array(40).fill(null).map((_, i) => (
            <div key={i} style={{ 
              background: i % 2 === 0 ? '#111' : '#fff', 
              color: i % 2 === 0 ? '#fff' : '#111', 
              padding: '12px 40px',
              textAlign: 'center',
              flexShrink: 0
            }}>
              FUSIONCART
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom Bar ──────────────────────────────────── */}
      <div style={{
        padding: '6px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '11px',
        background: '#f8f8f8'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
          <span>India (₹)</span>
          <span style={{ fontSize: '13px' }}>&rsaquo;</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span>&copy; {new Date().getFullYear()} Fusion Cart</span>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '17px', fontStyle: 'italic', fontWeight: 700 }}>FC.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
