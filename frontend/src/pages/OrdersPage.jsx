import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { orderService } from '../services/orderService';
import { formatCurrency, formatDate } from '../utils/formatters';

const STATUS_LABEL = {
  pending:   { text: 'PENDING',   color: '#b8860b', bg: '#fef9e7' },
  confirmed: { text: 'CONFIRMED', color: '#1a5276', bg: '#eaf2ff' },
  shipped:   { text: 'SHIPPED',   color: '#1a5276', bg: '#eaf2ff' },
  delivered: { text: 'DELIVERED', color: '#1e8449', bg: '#e9f7ef' },
  cancelled: { text: 'CANCELLED', color: '#922b21', bg: '#fdecea' },
};

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    orderService.getOrders()
      .then(setOrders)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div style={{ padding: '80px 40px' }} className="container">
      {[1, 2, 3].map(i => (
        <div key={i} style={{ height: '120px', background: 'var(--color-bg-soft)', marginBottom: '16px', animation: 'pulse 1.5s infinite' }}></div>
      ))}
    </div>
  );

  return (
    <div style={{ padding: '40px 0 100px', minHeight: 'calc(100vh - 64px)' }}>
      <div className="container">

        {/* Header */}
        <div style={{ marginBottom: '48px', paddingBottom: '24px', borderBottom: '1px solid var(--color-border)' }}>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '40px', fontWeight: 400, fontStyle: 'italic', textTransform: 'none', letterSpacing: 0 }}>
            My Orders
          </h1>
        </div>

        {orders.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📦</div>
            <h3 style={{ fontSize: '20px', fontWeight: 400, textTransform: 'none', letterSpacing: 0, marginBottom: '12px' }}>No orders yet</h3>
            <p style={{ fontSize: '14px', color: 'var(--color-text-light)', marginBottom: '32px' }}>When you place orders, they'll appear here.</p>
            <Link to="/shop" className="btn btn-primary">Start Shopping</Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {orders.map((order) => {
              const status = STATUS_LABEL[order.status] || STATUS_LABEL.pending;
              return (
                <div key={order.id} style={{ padding: '32px 0', borderBottom: '1px solid var(--color-border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px', marginBottom: '20px' }}>
                    <div>
                      <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '6px' }}>
                        Order #{order.order_number}
                      </p>
                      <p style={{ fontSize: '12px', color: 'var(--color-text-light)' }}>
                        Placed {formatDate(order.created_at)}
                      </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                      <span style={{
                        padding: '4px 12px',
                        fontSize: '10px',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        background: status.bg,
                        color: status.color,
                      }}>
                        {status.text}
                      </span>
                      <span style={{ fontWeight: 700, fontSize: '16px' }}>{formatCurrency(order.total_amount)}</span>
                    </div>
                  </div>

                  {/* Item Thumbnails */}
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    {order.items?.slice(0, 5).map((item, i) => (
                      <div key={i} style={{ width: '72px', height: '96px', background: 'var(--color-bg-soft)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src={item.product?.image_url || 'https://via.placeholder.com/72x96/f8f8f8/111?text=P'} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }} />
                      </div>
                    ))}
                    {order.items?.length > 5 && (
                      <div style={{ width: '72px', height: '96px', background: 'var(--color-bg-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                        +{order.items.length - 5}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
