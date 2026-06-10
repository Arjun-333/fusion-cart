import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { authService } from '../services/authService';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const { user, checkAuth } = useAuth();
  const [form, setForm] = useState({ full_name: user?.full_name || '', phone: user?.phone || '' });
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.updateProfile(form);
      await checkAuth();
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '40px 0 100px', minHeight: 'calc(100vh - 64px)' }}>
      <div className="container" style={{ maxWidth: '800px' }}>

        {/* Header */}
        <div style={{ marginBottom: '48px', paddingBottom: '24px', borderBottom: '1px solid var(--color-border)' }}>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '40px', fontWeight: 400, fontStyle: 'italic', textTransform: 'none', letterSpacing: 0 }}>
            My Account
          </h1>
        </div>

        {/* Nav tabs */}
        <div style={{ display: 'flex', gap: '40px', marginBottom: '48px', borderBottom: '1px solid var(--color-border)' }}>
          {['Profile', 'Orders', 'Addresses'].map((tab, i) => (
            <div key={tab} style={{
              paddingBottom: '16px',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              borderBottom: i === 0 ? '2px solid var(--color-text)' : 'none',
              marginBottom: '-1px',
              cursor: 'pointer',
              color: i === 0 ? 'var(--color-text)' : 'var(--color-text-light)'
            }}>
              {tab === 'Orders' ? <Link to="/orders" style={{ color: 'inherit' }}>{tab}</Link> : tab}
            </div>
          ))}
        </div>

        {/* User summary */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '48px' }}>
          <div style={{
            width: '56px',
            height: '56px',
            background: 'var(--color-text)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            fontWeight: 700,
            flexShrink: 0,
            fontFamily: 'var(--font-serif)'
          }}>
            {(user?.full_name?.[0] || user?.email?.[0] || 'U').toUpperCase()}
          </div>
          <div>
            <p style={{ fontSize: '16px', fontWeight: 600, marginBottom: '4px' }}>{user?.full_name}</p>
            <p style={{ fontSize: '13px', color: 'var(--color-text-light)' }}>{user?.email}</p>
          </div>
        </div>

        {/* Success notice */}
        {saved && (
          <div style={{ marginBottom: '32px', padding: '14px 20px', border: '1px solid #a5d6a7', background: '#e8f5e9', color: '#2e7d32', fontSize: '13px' }}>
            ✓ Profile updated successfully
          </div>
        )}

        {/* Edit Form */}
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div className="input-group">
              <label className="input-label">Full Name</label>
              <input value={form.full_name} onChange={e => setForm({ ...form, full_name: e.target.value })} />
            </div>
            <div className="input-group">
              <label className="input-label">Phone</label>
              <input placeholder="+91 98765 43210" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div className="input-group" style={{ gridColumn: '1 / -1' }}>
              <label className="input-label">Email Address (cannot be changed)</label>
              <input value={user?.email || ''} disabled style={{ opacity: 0.5, cursor: 'not-allowed' }} />
            </div>
          </div>

          <div>
            <button type="submit" className="btn btn-primary" disabled={loading} style={{ padding: '14px 40px' }}>
              {loading ? <span className="spinner"></span> : 'Save Changes'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default ProfilePage;
