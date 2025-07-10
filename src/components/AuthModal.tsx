import React, { useState } from 'react';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  onAuthSuccess: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ open, onClose, onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    // Simulate API call for login/signup
    setTimeout(() => {
      setLoading(false);
      onAuthSuccess();
      onClose();
    }, 1000);
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.25)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <section className="hero-glass" style={{ maxWidth: 400, width: '100%', textAlign: 'center', position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 12, right: 12, background: 'none', border: 'none', fontSize: 22, cursor: 'pointer' }}>&times;</button>
        <h1 className="hero-headline" style={{ fontSize: '2rem', marginBottom: '1.2rem' }}>{isLogin ? 'Login' : 'Sign Up'}</h1>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem', marginTop: '1.5rem' }} onSubmit={handleSubmit}>
          {!isLogin && (
            <input type="text" name="name" placeholder="Full Name" style={{ padding: '0.85rem 1rem', borderRadius: 8, border: '1.5px solid var(--glass-border)', background: 'rgba(255,255,255,0.25)', fontSize: '1.05rem', color: '#23272f', outline: 'none' }} required />
          )}
          <input type="email" name="email" placeholder="Email" style={{ padding: '0.85rem 1rem', borderRadius: 8, border: '1.5px solid var(--glass-border)', background: 'rgba(255,255,255,0.25)', fontSize: '1.05rem', color: '#23272f', outline: 'none' }} required />
          <input type="password" name="password" placeholder="Password" style={{ padding: '0.85rem 1rem', borderRadius: 8, border: '1.5px solid var(--glass-border)', background: 'rgba(255,255,255,0.25)', fontSize: '1.05rem', color: '#23272f', outline: 'none' }} required />
          {!isLogin && (
            <input type="password" name="confirmPassword" placeholder="Confirm Password" style={{ padding: '0.85rem 1rem', borderRadius: 8, border: '1.5px solid var(--glass-border)', background: 'rgba(255,255,255,0.25)', fontSize: '1.05rem', color: '#23272f', outline: 'none' }} required />
          )}
          <button type="submit" className="hero-cta" style={{ width: '100%' }} disabled={loading}>{loading ? 'Loading...' : isLogin ? 'Login' : 'Sign Up'}</button>
          {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
        </form>
        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <button onClick={() => setIsLogin(!isLogin)} className="hero-cta" style={{ width: '100%', background: 'var(--accent)', marginTop: 0 }} type="button">
            {isLogin ? 'Switch to Signup' : 'Switch to Login'}
          </button>
        </div>
      </section>
    </div>
  );
};

export default AuthModal; 