import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div style={{ 
      minHeight: 'calc(100vh - 64px)', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '80px 20px',
      textAlign: 'center'
    }}>
      <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '24px' }}>
        Error 404
      </p>
      <h1 style={{ 
        fontFamily: 'var(--font-serif)', 
        fontSize: '56px', 
        fontWeight: 400, 
        fontStyle: 'italic',
        textTransform: 'none',
        letterSpacing: 0,
        marginBottom: '20px'
      }}>
        Page Not Found
      </h1>
      <p style={{ fontSize: '15px', color: 'var(--color-text-light)', maxWidth: '400px', lineHeight: 1.6, marginBottom: '48px' }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div style={{ display: 'flex', gap: '16px' }}>
        <Link to="/" className="btn btn-primary" style={{ padding: '14px 40px' }}>Go to Homepage</Link>
        <Link to="/shop" className="btn btn-secondary" style={{ padding: '14px 40px' }}>Shop Now</Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
