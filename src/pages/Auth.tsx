import React, { useState } from 'react';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5.5rem 1rem 2rem 1rem' }}>
      <section className="hero-glass" style={{ maxWidth: 400, width: '100%', textAlign: 'center' }}>
        <h1 className="hero-headline" style={{ fontSize: '2rem', marginBottom: '1.2rem' }}>{isLogin ? 'Login' : 'Sign Up'}</h1>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem', marginTop: '1.5rem' }}>
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              style={{ padding: '0.85rem 1rem', borderRadius: 8, border: '1.5px solid var(--glass-border)', background: 'rgba(255,255,255,0.25)', fontSize: '1.05rem', color: '#23272f', outline: 'none' }}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            style={{ padding: '0.85rem 1rem', borderRadius: 8, border: '1.5px solid var(--glass-border)', background: 'rgba(255,255,255,0.25)', fontSize: '1.05rem', color: '#23272f', outline: 'none' }}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            style={{ padding: '0.85rem 1rem', borderRadius: 8, border: '1.5px solid var(--glass-border)', background: 'rgba(255,255,255,0.25)', fontSize: '1.05rem', color: '#23272f', outline: 'none' }}
            required
          />
          {!isLogin && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              style={{ padding: '0.85rem 1rem', borderRadius: 8, border: '1.5px solid var(--glass-border)', background: 'rgba(255,255,255,0.25)', fontSize: '1.05rem', color: '#23272f', outline: 'none' }}
              required
            />
          )}
          <button type="submit" className="hero-cta" style={{ width: '100%' }}>{isLogin ? 'Login' : 'Sign Up'}</button>
        </form>
        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="hero-cta"
            style={{ width: '100%', background: 'var(--accent)', marginTop: 0 }}
            type="button"
          >
            {isLogin ? 'Switch to Signup' : 'Switch to Login'}
          </button>
        </div>
      </section>
    </main>
  );
};

export default Auth; 