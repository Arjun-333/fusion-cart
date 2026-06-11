import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productService } from '../services/productService';
import { formatCurrency } from '../utils/formatters';

const HomePage = () => {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    productService.getProducts({ limit: 4, sort_by: 'rating' })
      .then(res => setFeatured(res.items || []))
      .catch(console.error);
  }, []);

  return (
    <div style={{ width: '100%', overflowX: 'hidden' }}>
      
      {/* Editorial Hero Section */}
      <div id="foryou" className="container" style={{ paddingTop: '20px' }}>
        <div style={{ 
          height: '75vh', 
          width: '100%', 
          background: 'var(--color-secondary)',
          display: 'flex',
          position: 'relative',
          border: '1px solid var(--color-border-dark)',
          overflow: 'hidden'
        }}>
          {/* Background Video */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <video 
              autoPlay 
              muted 
              loop 
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            >
              <source src="/iphone17_video.mp4" type="video/mp4" />
            </video>
            {/* Dark overlay for text readability */}
            <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)' }} />
          </div>

          {/* Foreground Content */}
          <div style={{ position: 'relative', zIndex: 1, flex: 1, padding: '60px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h5 style={{ fontSize: '14px', marginBottom: '20px', letterSpacing: '0.2em', color: '#fff' }}>APPLE EVENT</h5>
            <h1 style={{ fontSize: '56px', marginBottom: '24px', lineHeight: 1.1, fontWeight: 800, color: '#fff' }}>
              IPHONE 17 <br /> PRO
            </h1>
            <p style={{ fontSize: '16px', maxWidth: '400px', marginBottom: '40px', lineHeight: 1.6, color: '#eee' }}>
              The ultimate iPhone. Built for Apple Intelligence. Charge up to 50% in 20 minutes.
            </p>
            <div>
              <Link to="/shop" className="btn btn-primary" style={{ backgroundColor: '#fff', color: '#000', border: 'none' }}>
                Pre-order Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: '80px', marginBottom: '80px' }}>
        
        {/* Category Sections based on Navbar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '80px', marginBottom: '100px' }}>
          
          {['ELECTRONICS', 'CLOTHES', 'ACCESSORIES', 'BEAUTY'].map(category => (
            <div key={category} style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px', borderBottom: '1px solid var(--color-border-dark)', paddingBottom: '16px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 600 }}>{category}</h2>
                <Link to={`/shop?category=${category.toLowerCase()}`} style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.05em', color: '#000' }}>VIEW ALL</Link>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                {[1, 2, 3, 4].map(num => (
                  <Link key={num} to={`/shop?category=${category.toLowerCase()}`} style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ background: 'var(--color-secondary)', aspectRatio: '3/4', marginBottom: '16px', overflow: 'hidden' }}>
                      <img 
                        src={`https://via.placeholder.com/400x533/F4F4F4/111111?text=${category}+${num}`} 
                        alt={`${category} ${num}`} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }} 
                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                      />
                    </div>
                    <h4 style={{ fontSize: '13px', fontWeight: 700, marginBottom: '6px', textTransform: 'uppercase' }}>{category} ITEM {num}</h4>
                    <p style={{ fontSize: '13px', color: 'var(--color-text)' }}>$199.00</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}

        </div>

        {/* Featured Products */}
        <div style={{ textAlign: 'center', marginBottom: '60px', borderTop: '1px solid var(--color-border-dark)', paddingTop: '60px' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>WHAT'S NEW</h2>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '40px 20px' }}>
          {featured.map(p => (
            <div key={p.id} style={{ display: 'flex', flexDirection: 'column', position: 'relative', cursor: 'pointer' }}>
              <Link to={`/product/${p.slug}`} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ background: 'var(--color-secondary)', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', aspectRatio: '3/4' }}>
                  <img 
                    src={p.image_url || 'https://via.placeholder.com/400?text=PRODUCT'} 
                    alt={p.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }} 
                  />
                </div>
                <h4 style={{ fontSize: '13px', fontWeight: 700, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{p.brand || 'DESIGNER'}</h4>
                <p style={{ fontSize: '13px', color: 'var(--color-text)', marginBottom: '8px', flex: 1 }}>{p.name}</p>
                <div style={{ fontSize: '14px', fontWeight: 700 }}>
                  {formatCurrency(p.price)}
                </div>
              </Link>
            </div>
          ))}
        </div>

      </div>
      
    </div>
  );
};

export default HomePage;
