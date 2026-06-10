import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productService } from '../services/productService';
import { useCart } from '../hooks/useCart';
import { formatCurrency } from '../utils/formatters';

const SORT_OPTIONS = [
  { value: 'created_at', label: 'Newest First' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
];

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ category_id: null, search: '', min_price: '', max_price: '', sort_by: 'created_at', page: 1 });
  const [meta, setMeta] = useState({ total: 0, total_pages: 1 });

  useEffect(() => {
    productService.getCategories().then(setCategories).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = { ...filters };
    if (!params.category_id) delete params.category_id;
    if (!params.min_price) delete params.min_price;
    if (!params.max_price) delete params.max_price;
    if (!params.search) delete params.search;

    productService.getProducts(params)
      .then(data => {
        setProducts(data.items || []);
        setMeta({ total: data.total || 0, total_pages: data.total_pages || 1 });
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [filters]);

  const setFilter = (key, val) => setFilters(prev => ({ ...prev, [key]: val, page: 1 }));

  return (
    <div style={{ paddingTop: '40px', paddingBottom: '80px', minHeight: '100vh' }}>
      
      {/* Breadcrumbs */}
      <div className="container" style={{ marginBottom: '40px', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        <Link to="/" style={{ color: 'var(--color-text-light)' }}>Home</Link>
        <span style={{ margin: '0 10px', color: 'var(--color-text-light)' }}>/</span>
        <span>Shop</span>
      </div>

      <div className="container">
        
        {/* Header */}
        <div style={{ marginBottom: '40px', borderBottom: '1px solid var(--color-border-dark)', paddingBottom: '24px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 400, letterSpacing: '0.05em', margin: 0 }}>
            {filters.category_id ? categories.find(c => c.id === filters.category_id)?.name || 'SHOP' : 'ALL DESIGNERS'}
          </h1>
        </div>

        <div style={{ display: 'flex', gap: '60px', alignItems: 'flex-start' }}>

          {/* ── Sidebar Filters ── */}
          <aside style={{ width: '240px', flexShrink: 0, position: 'sticky', top: '160px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              
              <div>
                <h4 style={{ marginBottom: '16px', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em' }}>SEARCH</h4>
                <input type="text" placeholder="Search..." value={filters.search}
                  onChange={e => setFilter('search', e.target.value)} />
              </div>

              <div>
                <h4 style={{ marginBottom: '16px', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em' }}>CATEGORY</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <button 
                    style={{ textAlign: 'left', fontSize: '13px', fontWeight: !filters.category_id ? 700 : 400, textTransform: 'uppercase', letterSpacing: '0.05em' }}
                    onClick={() => setFilter('category_id', null)}
                  >
                    All Categories
                  </button>
                  {categories.map(cat => (
                    <button key={cat.id}
                      style={{ textAlign: 'left', fontSize: '13px', fontWeight: filters.category_id === cat.id ? 700 : 400, textTransform: 'uppercase', letterSpacing: '0.05em' }}
                      onClick={() => setFilter('category_id', cat.id)}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 style={{ marginBottom: '16px', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em' }}>PRICE RANGE</h4>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input placeholder="Min" type="number" value={filters.min_price}
                    onChange={e => setFilter('min_price', e.target.value)} />
                  <input placeholder="Max" type="number" value={filters.max_price}
                    onChange={e => setFilter('max_price', e.target.value)} />
                </div>
              </div>

              <button 
                onClick={() => setFilters({ category_id: null, search: '', min_price: '', max_price: '', sort_by: 'created_at', page: 1 })}
                style={{ fontSize: '12px', textDecoration: 'underline', textAlign: 'left', marginTop: '-20px' }}
              >
                Clear All Filters
              </button>
            </div>
          </aside>

          {/* ── Product Grid ── */}
          <div style={{ flex: 1 }}>
            
            {/* Toolbar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
              <p style={{ fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Showing {meta.total} results
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Sort by</span>
                <select 
                  style={{ width: 'auto', padding: '8px 32px 8px 16px', fontSize: '12px', letterSpacing: '0.05em', textTransform: 'uppercase' }}
                  value={filters.sort_by} onChange={e => setFilter('sort_by', e.target.value)}
                >
                  {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
            </div>

            {loading ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '40px 20px' }}>
                {[1,2,3,4,5,6].map(i => <div key={i} style={{ height: '400px', background: 'var(--color-secondary)' }}></div>)}
              </div>
            ) : products.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '100px 0' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 400, letterSpacing: '0.05em' }}>No products found.</h3>
                <p style={{ fontSize: '14px', color: 'var(--color-text-light)', marginTop: '16px' }}>Try adjusting your filters or search term.</p>
              </div>
            ) : (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '60px 20px' }}>
                  {products.map(product => (
                    <div key={product.id} style={{ display: 'flex', flexDirection: 'column' }}>
                      <Link to={`/product/${product.slug}`}>
                        <div style={{ height: '350px', background: 'var(--color-secondary)', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <img src={product.image_url || 'https://via.placeholder.com/300'} alt={product.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }} />
                        </div>
                        <h4 style={{ fontSize: '12px', fontWeight: 700, margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{product.brand || 'DESIGNER'}</h4>
                        <p style={{ fontSize: '13px', color: 'var(--color-text)', margin: '0 0 8px' }}>{product.name}</p>
                        <div style={{ fontSize: '14px', fontWeight: 700 }}>{formatCurrency(product.price)}</div>
                      </Link>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {meta.total_pages > 1 && (
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '80px', borderTop: '1px solid var(--color-border-dark)', paddingTop: '40px' }}>
                    {Array.from({ length: meta.total_pages }, (_, i) => i + 1).map(p => (
                      <button key={p} 
                        style={{ 
                          width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                          border: filters.page === p ? '1px solid var(--color-text)' : '1px solid var(--color-border)',
                          background: filters.page === p ? 'var(--color-text)' : 'transparent',
                          color: filters.page === p ? '#fff' : 'var(--color-text)',
                          fontSize: '13px', fontWeight: 700
                        }}
                        onClick={() => setFilters(prev => ({ ...prev, page: p }))}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
