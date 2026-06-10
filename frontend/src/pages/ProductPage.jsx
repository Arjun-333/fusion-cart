import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productService } from '../services/productService';
import { useCart } from '../hooks/useCart';
import { formatCurrency } from '../utils/formatters';

const ProductPage = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    setLoading(true);
    productService.getProductBySlug(slug)
      .then(data => {
        setProduct(data);
        if (data.variants?.length) setSelectedVariant(data.variants[0]);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [slug]);

  const handleAddToCart = async () => {
    await addToCart(product.id, quantity, selectedVariant);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  if (loading) return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ fontSize: '14px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Loading...</div>
    </div>
  );

  if (!product) return (
    <div className="container" style={{ paddingTop: '100px', textAlign: 'center' }}>
      <h3>Product not found</h3>
      <Link to="/shop" className="btn btn-primary mt-4">Back to Shop</Link>
    </div>
  );

  const images = product.images?.length ? product.images : [product.image_url || 'https://via.placeholder.com/800'];

  return (
    <div style={{ background: 'var(--color-primary)', minHeight: '100vh', paddingBottom: '100px', paddingTop: '40px' }}>
      
      {/* Breadcrumbs */}
      <div className="container" style={{ marginBottom: '40px', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        <Link to="/" style={{ color: 'var(--color-text-light)' }}>Home</Link>
        <span style={{ margin: '0 10px', color: 'var(--color-text-light)' }}>/</span>
        <Link to="/shop" style={{ color: 'var(--color-text-light)' }}>Shop</Link>
        <span style={{ margin: '0 10px', color: 'var(--color-text-light)' }}>/</span>
        <span>{product.name}</span>
      </div>

      <div className="container" style={{ display: 'flex', flexWrap: 'wrap', gap: '80px', alignItems: 'flex-start' }}>
        
        {/* Left: Images */}
        <div style={{ flex: '1 1 500px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ border: '1px solid var(--color-border-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', aspectRatio: '3/4', background: 'var(--color-secondary)' }}>
            <img src={images[mainImage]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }} />
          </div>
          {images.length > 1 && (
            <div style={{ display: 'flex', gap: '10px' }}>
              {images.map((img, i) => (
                <button key={i} onClick={() => setMainImage(i)}
                  style={{ 
                    width: '80px', height: '100px', background: 'var(--color-secondary)',
                    border: i === mainImage ? '1px solid var(--color-text)' : '1px solid var(--color-border)'
                  }}>
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Details (Sticky) */}
        <div style={{ flex: '1 1 400px', position: 'sticky', top: '160px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div style={{ borderBottom: '1px solid var(--color-border-dark)', paddingBottom: '24px' }}>
            <h2 style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '12px' }}>
              {product.brand || 'DESIGNER'}
            </h2>
            <h1 style={{ fontSize: '24px', fontWeight: 400, textTransform: 'none', letterSpacing: '0', marginBottom: '16px' }}>
              {product.name}
            </h1>
            <div style={{ fontSize: '20px', fontWeight: 700 }}>
              {formatCurrency(product.price)}
            </div>
          </div>

          {/* Variants / Sizing */}
          {product.variants?.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Size</span>
                <span style={{ fontSize: '11px', textDecoration: 'underline', cursor: 'pointer' }}>Size Guide</span>
              </div>
              <select 
                value={selectedVariant}
                onChange={e => setSelectedVariant(e.target.value)}
                style={{ padding: '14px', border: '1px solid var(--color-border-dark)' }}
              >
                {product.variants.map(v => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </div>
          )}

          <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
            <div style={{ display: 'flex', border: '1px solid var(--color-border-dark)' }}>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ padding: '0 20px', fontSize: '18px' }}>-</button>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', fontSize: '14px' }}>{quantity}</div>
              <button onClick={() => setQuantity(Math.min(product.stock_quantity || 10, quantity + 1))} style={{ padding: '0 20px', fontSize: '18px' }}>+</button>
            </div>
            <button className="btn btn-primary" style={{ flex: 1, padding: '16px' }} onClick={handleAddToCart} disabled={product.stock_quantity === 0}>
              {addedToCart ? 'ADDED TO BAG' : 'ADD TO BAG'}
            </button>
          </div>

          <div style={{ borderTop: '1px solid var(--color-border-dark)', paddingTop: '24px', marginTop: '24px' }}>
            <h3 style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>Editor's Notes</h3>
            <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--color-text)' }}>
              {product.description}
            </p>
          </div>

          <div style={{ borderTop: '1px solid var(--color-border-dark)', paddingTop: '16px' }}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span>✓</span> Free delivery on orders over ₹5000
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span>✓</span> Free returns within 28 days
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductPage;
