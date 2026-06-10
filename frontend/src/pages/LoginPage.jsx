import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.detail || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: 'calc(100vh - 64px)', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '60px 20px',
      background: 'var(--color-bg)'
    }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 style={{ 
            fontFamily: 'var(--font-serif)', 
            fontSize: '36px', 
            fontWeight: 600, 
            letterSpacing: '0.02em',
            textTransform: 'none',
            fontStyle: 'italic',
            marginBottom: '12px'
          }}>
            Sign In
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--color-text-light)' }}>
            Welcome back to FusionCart
          </p>
        </div>

        {error && (
          <div style={{ 
            marginBottom: '24px', 
            padding: '14px 16px', 
            border: '1px solid var(--color-error)', 
            color: 'var(--color-error)',
            fontSize: '13px'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <label htmlFor="login-email">Email Address</label>
            <input
              id="login-email"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label htmlFor="login-password" style={{ margin: 0 }}>Password</label>
              <Link to="/forgot-password" style={{ fontSize: '11px', color: 'var(--color-text-light)', textDecoration: 'underline' }}>
                Forgot password?
              </Link>
            </div>
            <input
              id="login-password"
              type="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
            />
          </div>

          <button id="login-submit" type="submit" className="btn btn-primary w-full" disabled={loading} style={{ marginTop: '8px', padding: '16px' }}>
            {loading ? <span className="spinner"></span> : 'Sign In'}
          </button>
        </form>

        <div className="divider" style={{ margin: '32px 0' }}></div>

        <p style={{ textAlign: 'center', fontSize: '13px', color: 'var(--color-text-light)' }}>
          New to FusionCart?{' '}
          <Link to="/register" style={{ color: 'var(--color-text)', fontWeight: 600, textDecoration: 'underline' }}>
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
