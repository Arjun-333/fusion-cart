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
      <div className="container" style={{ paddingTop: '20px' }}>
        <div style={{ 
          height: '75vh', 
          width: '100%', 
          background: 'var(--color-secondary)',
          display: 'flex',
          position: 'relative',
          border: '1px solid var(--color-border-dark)'
        }}>
          <div style={{ flex: 1, padding: '60px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h5 style={{ fontSize: '14px', marginBottom: '20px', letterSpacing: '0.2em' }}>THE SUMMER EDIT</h5>
            <h1 style={{ fontSize: '56px', marginBottom: '24px', lineHeight: 1.1, fontWeight: 800 }}>
              NEW <br /> ARRIVALS
            </h1>
            <p style={{ fontSize: '16px', maxWidth: '400px', marginBottom: '40px', lineHeight: 1.6 }}>
              Discover the latest styles from the world's leading designers. Handpicked pieces to elevate your wardrobe.
            </p>
            <div>
              <Link to="/shop" className="btn btn-primary">
                Shop The Collection
              </Link>
            </div>
          </div>
          <div style={{ flex: 1, background: 'url(https://via.placeholder.com/800x1000/111111/FFFFFF?text=FASHION+EDITORIAL) center/cover' }} />
        </div>
      </div>

      <div className="container" style={{ marginTop: '80px', marginBottom: '80px' }}>
        
        {/* Editorial Split */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '40px', marginBottom: '100px' }}>
          
          <div style={{ border: '1px solid var(--color-border-dark)', display: 'flex', flexDirection: 'column' }}>
             <div style={{ height: '500px', background: 'url(https://via.placeholder.com/800x1000/F4F4F4/111111?text=CLOTHING) center/cover' }} />
             <div style={{ padding: '40px', textAlign: 'center' }}>
               <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>CLOTHING</h2>
               <Link to="/shop?category=clothing" className="btn btn-secondary">Shop Now</Link>
             </div>
          </div>

          <div style={{ border: '1px solid var(--color-border-dark)', display: 'flex', flexDirection: 'column' }}>
             <div style={{ height: '500px', background: 'url(https://via.placeholder.com/800x1000/F4F4F4/111111?text=SHOES) center/cover' }} />
             <div style={{ padding: '40px', textAlign: 'center' }}>
               <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>SHOES</h2>
               <Link to="/shop?category=shoes" className="btn btn-secondary">Shop Now</Link>
             </div>
          </div>

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
