import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { productService } from '../services/productService';
import { formatCurrency } from '../utils/formatters';

/* ─── Icons ─────────────────────────────────────── */
const FilterIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="6" x2="20" y2="6"/>
    <line x1="8" y1="12" x2="16" y2="12"/>
    <line x1="11" y1="18" x2="13" y2="18"/>
  </svg>
);

const ChevronDown = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const CloseIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const StarIcon = ({ filled }) => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const SORT_OPTIONS = [
  { value: 'created_at', label: 'Newest First' },
  { value: 'price_asc',  label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'rating',     label: 'Top Rated' },
  { value: 'name_asc',   label: 'Name: A–Z' },
  { value: 'name_desc',  label: 'Name: Z–A' },
];

const AVAILABILITY_OPTIONS = [
  { value: '', label: 'All' },
  { value: 'in_stock', label: 'In Stock' },
  { value: 'on_sale', label: 'On Sale' },
];

const RATING_OPTIONS = [4, 3, 2, 1];

/* ─── Dropdown Filter ─────────────────────────── */
const FilterDropdown = ({ label, children, activeCount = 0 }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          padding: '8px 14px',
          fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
          border: `1px solid ${activeCount > 0 ? '#111' : 'var(--color-border)'}`,
          background: activeCount > 0 ? '#111' : '#fff',
          color: activeCount > 0 ? '#fff' : '#111',
          cursor: 'pointer',
          transition: 'all 0.15s ease',
          whiteSpace: 'nowrap',
        }}
      >
        {label}
        {activeCount > 0 && (
          <span style={{
            background: '#fff', color: '#111',
            borderRadius: '50%', width: '16px', height: '16px',
            fontSize: '10px', fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>{activeCount}</span>
        )}
        <span style={{ opacity: 0.7, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
          <ChevronDown />
        </span>
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 6px)', left: 0,
          background: '#fff', border: '1px solid var(--color-border)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
          zIndex: 200, minWidth: '220px',
          animation: 'dropIn 0.15s ease',
        }}>
          {children}
        </div>
      )}
    </div>
  );
};

/* ─── ShopPage ────────────────────────────────── */
const ShopPage = () => {
  const [searchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState({ total: 0, total_pages: 1 });
  const [searchInput, setSearchInput] = useState(searchParams.get('search') || '');
  const [filters, setFilters] = useState({
    category_id: null,
    search: searchParams.get('search') || '',
    min_price: '',
    max_price: '',
    min_rating: '',
    availability: '',
    sort_by: 'created_at',
    page: 1,
  });

  // Debounce search
  const debounceRef = useRef(null);
  const handleSearchInput = (val) => {
    setSearchInput(val);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setFilter('search', val);
    }, 350);
  };

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
    if (!params.min_rating) delete params.min_rating;
    if (!params.availability) delete params.availability;

    productService.getProducts(params)
      .then(data => {
        setProducts(data.items || []);
        setMeta({ total: data.total || 0, total_pages: data.total_pages || 1 });
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [filters]);

  const setFilter = (key, val) => setFilters(prev => ({ ...prev, [key]: val, page: 1 }));

  const clearAll = () => {
    setSearchInput('');
    setFilters({ category_id: null, search: '', min_price: '', max_price: '', min_rating: '', availability: '', sort_by: 'created_at', page: 1 });
  };

  const activeFilterCount = [
    filters.category_id,
    filters.min_price,
    filters.max_price,
    filters.min_rating,
    filters.availability,
  ].filter(Boolean).length;

  const currentCategoryName = filters.category_id
    ? categories.find(c => c.id === filters.category_id)?.name || 'SHOP'
    : 'ALL PRODUCTS';

  return (
    <div style={{ paddingBottom: '80px', minHeight: '100vh' }}>

      {/* ── Filter Bar ── */}
      <div style={{
        borderBottom: '1px solid var(--color-border)',
        background: '#fff',
        position: 'sticky',
        top: '60px',
        zIndex: 40,
      }}>
        <div className="container">
          <div style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '12px 0', flexWrap: 'nowrap', overflowX: 'auto',
          }}>

            {/* Search Input */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              border: '1px solid var(--color-border)',
              padding: '7px 12px', minWidth: '220px', flex: '0 0 auto',
              background: '#fff',
            }}>
              <SearchIcon />
              <input
                type="text"
                value={searchInput}
                onChange={e => handleSearchInput(e.target.value)}
                placeholder="Search products..."
                style={{
                  border: 'none', outline: 'none', fontSize: '12px',
                  letterSpacing: '0.03em', flex: 1, background: 'transparent',
                  padding: 0, width: '100%', minWidth: 0,
                }}
              />
              {searchInput && (
                <button onClick={() => { setSearchInput(''); setFilter('search', ''); }} style={{ color: '#999', display: 'flex' }}>
                  <CloseIcon />
                </button>
              )}
            </div>

            {/* Divider */}
            <div style={{ width: '1px', height: '32px', background: 'var(--color-border)', flexShrink: 0 }} />

            {/* Filter Label */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#666', flexShrink: 0 }}>
              <FilterIcon />
              <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Filter</span>
            </div>

            {/* Category Dropdown */}
            <FilterDropdown label="Category" activeCount={filters.category_id ? 1 : 0}>
              <div style={{ padding: '8px 0' }}>
                <button
                  onClick={() => setFilter('category_id', null)}
                  style={{
                    display: 'block', width: '100%', textAlign: 'left',
                    padding: '9px 20px', fontSize: '12px', letterSpacing: '0.05em',
                    fontWeight: !filters.category_id ? 700 : 400,
                    background: !filters.category_id ? '#f8f8f8' : 'transparent',
                    color: '#111', cursor: 'pointer',
                  }}
                >
                  All Categories
                </button>
                {categories.map(cat => (
                  <button key={cat.id}
                    onClick={() => setFilter('category_id', cat.id)}
                    style={{
                      display: 'block', width: '100%', textAlign: 'left',
                      padding: '9px 20px', fontSize: '12px', letterSpacing: '0.05em',
                      fontWeight: filters.category_id === cat.id ? 700 : 400,
                      background: filters.category_id === cat.id ? '#f8f8f8' : 'transparent',
                      color: '#111', cursor: 'pointer',
                    }}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </FilterDropdown>

            {/* Price Range Dropdown */}
            <FilterDropdown
              label="Price"
              activeCount={(filters.min_price || filters.max_price) ? 1 : 0}
            >
              <div style={{ padding: '20px' }}>
                <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '14px', color: '#666' }}>Price Range</p>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <input
                    type="number" placeholder="Min" min="0"
                    value={filters.min_price}
                    onChange={e => setFilter('min_price', e.target.value)}
                    style={{ padding: '8px 10px', fontSize: '12px', flex: 1 }}
                  />
                  <span style={{ fontSize: '12px', color: '#999' }}>–</span>
                  <input
                    type="number" placeholder="Max" min="0"
                    value={filters.max_price}
                    onChange={e => setFilter('max_price', e.target.value)}
                    style={{ padding: '8px 10px', fontSize: '12px', flex: 1 }}
                  />
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '14px' }}>
                  {[
                    { label: 'Under ₹500',   min: '',    max: '500' },
                    { label: '₹500–₹2000',   min: '500', max: '2000' },
                    { label: '₹2000–₹5000',  min: '2000',max: '5000' },
                    { label: 'Over ₹5000',   min: '5000',max: '' },
                  ].map(r => (
                    <button key={r.label}
                      onClick={() => { setFilter('min_price', r.min); setFilters(p => ({ ...p, max_price: r.max, page: 1 })); }}
                      style={{
                        padding: '5px 10px', fontSize: '10px', fontWeight: 600, letterSpacing: '0.06em',
                        border: '1px solid var(--color-border)', background: '#fff', cursor: 'pointer',
                        color: '#111',
                      }}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>
            </FilterDropdown>

            {/* Rating Dropdown */}
            <FilterDropdown label="Rating" activeCount={filters.min_rating ? 1 : 0}>
              <div style={{ padding: '8px 0' }}>
                <button
                  onClick={() => setFilter('min_rating', '')}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '8px', width: '100%',
                    padding: '9px 20px', fontSize: '12px', cursor: 'pointer',
                    fontWeight: !filters.min_rating ? 700 : 400,
                    background: !filters.min_rating ? '#f8f8f8' : 'transparent',
                  }}
                >
                  All Ratings
                </button>
                {RATING_OPTIONS.map(r => (
                  <button key={r}
                    onClick={() => setFilter('min_rating', String(r))}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '8px', width: '100%',
                      padding: '9px 20px', fontSize: '12px', cursor: 'pointer',
                      fontWeight: filters.min_rating === String(r) ? 700 : 400,
                      background: filters.min_rating === String(r) ? '#f8f8f8' : 'transparent',
                      color: '#111',
                    }}
                  >
                    <span style={{ display: 'flex', color: '#f59e0b' }}>
                      {[1,2,3,4,5].map(s => <StarIcon key={s} filled={s <= r} />)}
                    </span>
                    <span style={{ fontSize: '11px', color: '#666' }}>& above</span>
                  </button>
                ))}
              </div>
            </FilterDropdown>

            {/* Availability Dropdown */}
            <FilterDropdown label="Availability" activeCount={filters.availability ? 1 : 0}>
              <div style={{ padding: '8px 0' }}>
                {AVAILABILITY_OPTIONS.map(o => (
                  <button key={o.value}
                    onClick={() => setFilter('availability', o.value)}
                    style={{
                      display: 'block', width: '100%', textAlign: 'left',
                      padding: '9px 20px', fontSize: '12px', letterSpacing: '0.04em',
                      fontWeight: filters.availability === o.value ? 700 : 400,
                      background: filters.availability === o.value ? '#f8f8f8' : 'transparent',
                      color: '#111', cursor: 'pointer',
                    }}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </FilterDropdown>

            {/* Sort Dropdown */}
            <FilterDropdown label={`Sort: ${SORT_OPTIONS.find(o => o.value === filters.sort_by)?.label || 'Newest'}`}>
              <div style={{ padding: '8px 0' }}>
                {SORT_OPTIONS.map(o => (
                  <button key={o.value}
                    onClick={() => setFilter('sort_by', o.value)}
                    style={{
                      display: 'block', width: '100%', textAlign: 'left',
                      padding: '9px 20px', fontSize: '12px', letterSpacing: '0.04em',
                      fontWeight: filters.sort_by === o.value ? 700 : 400,
                      background: filters.sort_by === o.value ? '#f8f8f8' : 'transparent',
                      color: '#111', cursor: 'pointer',
                    }}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </FilterDropdown>

            {/* Spacer */}
            <div style={{ flex: 1 }} />

            {/* Results count */}
            <span style={{ fontSize: '11px', color: '#999', letterSpacing: '0.05em', textTransform: 'uppercase', flexShrink: 0 }}>
              {loading ? '—' : meta.total} results
            </span>

            {/* Clear All */}
            {(activeFilterCount > 0 || filters.search) && (
              <button
                onClick={clearAll}
                style={{
                  fontSize: '11px', fontWeight: 600, letterSpacing: '0.06em',
                  textTransform: 'uppercase', textDecoration: 'underline',
                  color: '#111', cursor: 'pointer', flexShrink: 0,
                }}
              >
                Clear All
              </button>
            )}
          </div>

          {/* Active Filter Chips */}
          {(filters.category_id || filters.min_price || filters.max_price || filters.min_rating || filters.availability || filters.search) && (
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', paddingBottom: '10px' }}>
              {filters.search && (
                <Chip label={`Search: "${filters.search}"`} onRemove={() => { setSearchInput(''); setFilter('search', ''); }} />
              )}
              {filters.category_id && (
                <Chip label={categories.find(c => c.id === filters.category_id)?.name} onRemove={() => setFilter('category_id', null)} />
              )}
              {(filters.min_price || filters.max_price) && (
                <Chip
                  label={`₹${filters.min_price || '0'} – ₹${filters.max_price || '∞'}`}
                  onRemove={() => setFilters(p => ({ ...p, min_price: '', max_price: '', page: 1 }))}
                />
              )}
              {filters.min_rating && (
                <Chip label={`${filters.min_rating}★ & above`} onRemove={() => setFilter('min_rating', '')} />
              )}
              {filters.availability && (
                <Chip label={AVAILABILITY_OPTIONS.find(o => o.value === filters.availability)?.label} onRemove={() => setFilter('availability', '')} />
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="container" style={{ paddingTop: '32px' }}>

        {/* ── Product List ── */}
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[1,2,3,4,5].map(i => (
              <div key={i} style={{ display: 'flex', gap: '20px', padding: '20px', border: '1px solid var(--color-border)', animation: 'shimmer 1.4s ease infinite alternate' }}>
                <div style={{ width: '180px', height: '180px', flexShrink: 0, background: 'var(--color-bg-soft)' }} />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '8px' }}>
                  <div style={{ height: '11px', background: 'var(--color-bg-soft)', width: '12%' }} />
                  <div style={{ height: '16px', background: 'var(--color-bg-soft)', width: '55%' }} />
                  <div style={{ height: '13px', background: 'var(--color-bg-soft)', width: '80%' }} />
                  <div style={{ height: '13px', background: 'var(--color-bg-soft)', width: '65%' }} />
                  <div style={{ height: '22px', background: 'var(--color-bg-soft)', width: '18%', marginTop: '6px' }} />
                  <div style={{ height: '36px', background: 'var(--color-bg-soft)', width: '160px', marginTop: 'auto' }} />
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <div style={{ fontSize: '48px', marginBottom: '24px' }}>🔍</div>
            <h3 style={{ fontSize: '18px', fontWeight: 400, letterSpacing: '0.05em', marginBottom: '12px' }}>No products found</h3>
            <p style={{ fontSize: '14px', color: 'var(--color-text-light)' }}>Try adjusting your filters or search term.</p>
            <button
              onClick={clearAll}
              style={{
                marginTop: '24px', padding: '10px 28px', fontSize: '11px', fontWeight: 600,
                letterSpacing: '0.1em', textTransform: 'uppercase', border: '1px solid #111',
                background: '#111', color: '#fff', cursor: 'pointer',
              }}
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <>
            {/* Amazon-style horizontal list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--color-border)' }}>
              {products.map(product => (
                <div key={product.id} style={{
                  display: 'flex', gap: '0', background: '#fff',
                  transition: 'box-shadow 0.15s ease',
                }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)'}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                >
                  {/* Product Image */}
                  <Link to={`/product/${product.slug}`} style={{
                    flexShrink: 0, width: '200px', height: '200px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: '#f8f8f8', overflow: 'hidden', padding: '12px',
                  }}>
                    <img
                      src={product.image_url || (product.images && product.images[0]) || 'https://via.placeholder.com/300'}
                      alt={product.name}
                      style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', transition: 'transform 0.35s ease' }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    />
                  </Link>

                  {/* Product Info */}
                  <div style={{ flex: 1, padding: '20px 24px', display: 'flex', gap: '24px', minWidth: 0 }}>
                    {/* Left: main info */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px', minWidth: 0 }}>
                      {/* Brand */}
                      <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#009B77' }}>
                        {product.brand || 'BRAND'}
                      </span>
                      {/* Name */}
                      <Link to={`/product/${product.slug}`}>
                        <h3 style={{ fontSize: '16px', fontWeight: 600, lineHeight: 1.4, color: '#0f1111', margin: 0, letterSpacing: 0 }}>
                          {product.name}
                        </h3>
                      </Link>
                      {/* Short description */}
                      {product.short_description && (
                        <p style={{ fontSize: '13px', color: '#555', lineHeight: 1.5, margin: 0, marginTop: '2px' }}>
                          {product.short_description}
                        </p>
                      )}
                      {/* Rating row */}
                      {product.rating > 0 && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                          <span style={{ display: 'flex', color: '#f59e0b' }}>
                            {[1,2,3,4,5].map(s => <StarIcon key={s} filled={s <= Math.round(product.rating)} />)}
                          </span>
                          <span style={{ fontSize: '13px', color: '#007185', fontWeight: 500 }}>{product.rating.toFixed(1)}</span>
                          <span style={{ fontSize: '12px', color: '#007185' }}>({product.review_count?.toLocaleString() || 0})</span>
                        </div>
                      )}
                      {/* Stock badge */}
                      {product.stock_quantity > 0 && product.stock_quantity <= 10 && (
                        <span style={{ fontSize: '12px', color: '#c7511f', fontWeight: 500 }}>
                          Only {product.stock_quantity} left in stock
                        </span>
                      )}
                      {/* Tags */}
                      {product.tags && product.tags.length > 0 && (
                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '4px' }}>
                          {product.tags.slice(0, 4).map(tag => (
                            <span key={tag} style={{
                              fontSize: '10px', padding: '2px 8px', border: '1px solid #e0e0e0',
                              color: '#666', letterSpacing: '0.04em', textTransform: 'uppercase',
                            }}>{tag}</span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Right: price + CTA */}
                    <div style={{ flexShrink: 0, width: '180px', display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
                      {/* Price */}
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '22px', fontWeight: 700, color: '#0f1111' }}>
                          {formatCurrency(product.price)}
                        </span>
                        {product.original_price && product.original_price > product.price && (
                          <span style={{ fontSize: '13px', color: '#888', textDecoration: 'line-through' }}>
                            {formatCurrency(product.original_price)}
                          </span>
                        )}
                      </div>
                      {/* Discount */}
                      {product.discount_percent > 0 && (
                        <span style={{ fontSize: '13px', color: '#c7511f', fontWeight: 600 }}>
                          {product.discount_percent}% off
                        </span>
                      )}
                      {/* Delivery */}
                      <p style={{ fontSize: '12px', color: '#007600', fontWeight: 500, margin: 0 }}>
                        FREE Delivery available
                      </p>
                      {/* Add to cart btn */}
                      <Link
                        to={`/product/${product.slug}`}
                        style={{
                          marginTop: '8px',
                          display: 'inline-block',
                          padding: '8px 16px',
                          background: '#FFD814',
                          color: '#0f1111',
                          fontSize: '13px',
                          fontWeight: 600,
                          borderRadius: '20px',
                          textAlign: 'center',
                          width: '100%',
                          boxSizing: 'border-box',
                          border: '1px solid #FCD200',
                          transition: 'background 0.15s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = '#F7CA00'}
                        onMouseLeave={e => e.currentTarget.style.background = '#FFD814'}
                      >
                        View Product
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ── Pagination ── */}
            <Pagination
              currentPage={filters.page}
              totalPages={meta.total_pages}
              onPageChange={(p) => setFilters(prev => ({ ...prev, page: p }))}
            />
          </>
        )}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          from { opacity: 0.5; }
          to   { opacity: 1; }
        }
      `}} />
    </div>
  );
};

/* ─── Active Filter Chip ─────────────────────── */
const Chip = ({ label, onRemove }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', gap: '6px',
    padding: '4px 10px', fontSize: '11px', fontWeight: 500,
    border: '1px solid #ddd', background: '#f8f8f8', color: '#333',
    letterSpacing: '0.03em',
  }}>
    {label}
    <button onClick={onRemove} style={{ display: 'flex', color: '#999', cursor: 'pointer' }}>
      <CloseIcon />
    </button>
  </span>
);

/* ─── Pagination ─────────────────────────────── */
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  const btnBase = {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    height: '36px', minWidth: '36px', padding: '0 10px',
    fontSize: '13px', fontWeight: 500, cursor: 'pointer',
    border: '1px solid #d0d0d0', background: '#fff', color: '#333',
    borderRadius: '4px', transition: 'all 0.15s ease',
    letterSpacing: '0.02em',
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px', marginTop: '40px', paddingTop: '32px', borderTop: '1px solid var(--color-border)' }}>
      {/* Prev */}
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        style={{
          ...btnBase,
          gap: '4px',
          opacity: currentPage === 1 ? 0.4 : 1,
          cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
          paddingLeft: '14px', paddingRight: '14px',
        }}
        onMouseEnter={e => { if (currentPage !== 1) { e.currentTarget.style.background = '#f0f0f0'; } }}
        onMouseLeave={e => { e.currentTarget.style.background = '#fff'; }}
      >
        <span style={{ fontSize: '14px' }}>‹</span>
        <span>Previous</span>
      </button>

      {/* Page numbers */}
      {getPages().map((p, idx) =>
        p === '...' ? (
          <span key={`dots-${idx}`} style={{ ...btnBase, cursor: 'default', border: 'none', background: 'transparent', color: '#999' }}>
            ···
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            style={{
              ...btnBase,
              border: currentPage === p ? '1px solid #111' : '1px solid #d0d0d0',
              background: currentPage === p ? '#111' : '#fff',
              color: currentPage === p ? '#fff' : '#333',
              fontWeight: currentPage === p ? 700 : 500,
            }}
            onMouseEnter={e => { if (currentPage !== p) { e.currentTarget.style.background = '#f0f0f0'; } }}
            onMouseLeave={e => { if (currentPage !== p) { e.currentTarget.style.background = '#fff'; } }}
          >
            {p}
          </button>
        )
      )}

      {/* Next */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        style={{
          ...btnBase,
          gap: '4px',
          opacity: currentPage === totalPages ? 0.4 : 1,
          cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
          paddingLeft: '14px', paddingRight: '14px',
        }}
        onMouseEnter={e => { if (currentPage !== totalPages) { e.currentTarget.style.background = '#f0f0f0'; } }}
        onMouseLeave={e => { e.currentTarget.style.background = '#fff'; }}
      >
        <span>Next</span>
        <span style={{ fontSize: '14px' }}>›</span>
      </button>
    </div>
  );
};

export default ShopPage;
