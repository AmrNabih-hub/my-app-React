import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const Cart: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, showToast } = useCart();
  const total = cart.reduce((sum, item) => sum + parseFloat(item.price.replace(/[^\d.]/g, '')) * item.quantity, 0);

  const [loading, setLoading] = useState(false);

  const handlePurchase = async () => {
    setLoading(true);
    try {
      // 1. Check authentication
      const res = await fetch('/api/auth/status');
      const data = await res.json();
      if (!data.authenticated) {
        // 2. Redirect to login with returnUrl
        const params = new URLSearchParams(window.location.search);
        const returnUrl = '/checkout' + (params.toString() ? `?${params.toString()}` : '');
        window.location.href = `/login?returnUrl=${encodeURIComponent(returnUrl)}`;
        return;
      }
      // 3. Authenticated: create checkout session
      const checkoutRes = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart, total })
      });
      const checkoutData = await checkoutRes.json();
      if (checkoutData && checkoutData.gatewayUrl) {
        // 4. Redirect to payment gateway
        window.location.href = checkoutData.gatewayUrl;
      } else {
        showToast('Failed to create payment session.');
      }
    } catch {
      showToast('An error occurred during purchase.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6rem 1rem 2rem 1rem' }}>
      <section className="hero-glass" style={{ maxWidth: 540, width: '100%', textAlign: 'center' }}>
        <h1 className="hero-headline" style={{ fontSize: '2rem', marginBottom: '1.2rem' }}>Shopping Cart</h1>
        {cart.length === 0 ? (
          <div style={{ color: '#4b5563', margin: '2.5rem 0' }}>Your cart is empty.</div>
        ) : (
          <>
            <div style={{ marginBottom: 24 }}>
              {cart.map(item => (
                <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 18, background: 'rgba(255,255,255,0.5)', borderRadius: 12, padding: '0.7rem 1rem' }}>
                  <img src={item.image} alt={item.name} style={{ width: 48, height: 48, borderRadius: 8, objectFit: 'cover', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }} />
                  <div style={{ flex: 1, textAlign: 'left' }}>
                    <div style={{ fontWeight: 600 }}>{item.name}</div>
                    <div style={{ fontSize: '0.98rem', color: '#4b5563' }}>{item.brand || item.author}</div>
                    <div style={{ color: 'var(--accent)', fontWeight: 600 }}>{item.price}</div>
                  </div>
                  <input type="number" min={1} max={99} value={item.quantity} onChange={e => updateQuantity(item.name, Math.max(1, Math.min(99, Number(e.target.value))))} style={{ width: 38, textAlign: 'center', border: '1px solid #e5e7eb', borderRadius: 6, fontSize: '1rem', padding: '0.3rem 0', background: 'rgba(255,255,255,0.7)' }} />
                  <button className="nav-btn" style={{ minWidth: 32, padding: 0, marginLeft: 6 }} onClick={() => removeFromCart(item.name)}>&times;</button>
                </div>
              ))}
            </div>
            <div style={{ fontWeight: 700, fontSize: '1.15rem', marginBottom: 18 }}>Total: ${total.toFixed(2)}</div>
            <button className="hero-cta" style={{ width: '100%', marginBottom: 12 }} onClick={handlePurchase} disabled={loading}>{loading ? 'Processing...' : 'Purchase'}</button>
          </>
        )}
      </section>
    </main>
  );
};

export default Cart; 