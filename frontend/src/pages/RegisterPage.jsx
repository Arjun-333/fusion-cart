import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const RegisterPage = () => {
  const [form, setForm] = useState({ full_name: '', email: '', password: '', confirm_password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm_password) {
      setError('Passwords do not match.');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    try {
      await register({ full_name: form.full_name, email: form.email, password: form.password });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.detail || 'Registration failed. Please try again.');
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
            Create Account
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--color-text-light)' }}>
            Join FusionCart for exclusive access
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
            <label htmlFor="reg-name">Full Name</label>
            <input id="reg-name" type="text" name="full_name" placeholder="Your full name"
              value={form.full_name} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="reg-email">Email Address</label>
            <input id="reg-email" type="email" name="email" placeholder="you@example.com"
              value={form.email} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="reg-password">Password</label>
            <input id="reg-password" type="password" name="password" placeholder="Min. 6 characters"
              value={form.password} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="reg-confirm">Confirm Password</label>
            <input id="reg-confirm" type="password" name="confirm_password" placeholder="••••••••"
              value={form.confirm_password} onChange={handleChange} required />
          </div>
          <button id="reg-submit" type="submit" className="btn btn-primary w-full" disabled={loading} style={{ marginTop: '8px', padding: '16px' }}>
            {loading ? <span className="spinner"></span> : 'Create Account'}
          </button>
        </form>

        <div className="divider" style={{ margin: '32px 0' }}></div>

        <p style={{ textAlign: 'center', fontSize: '13px', color: 'var(--color-text-light)' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--color-text)', fontWeight: 600, textDecoration: 'underline' }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
