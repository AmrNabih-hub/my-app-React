import React, { useState } from 'react';

interface CartItem {
  name: string;
  price: string;
  quantity: number;
  image?: string;
  brand?: string;
  author?: string;
}

interface Order {
  shipping: ShippingInfo;
  payment: PaymentInfo;
  cart: CartItem[];
  total: number;
}

interface ShippingInfo {
  name: string;
  address: string;
  city: string;
  zip: string;
}

interface PaymentInfo {
  card: string;
  exp: string;
  cvc: string;
}

interface CheckoutWizardProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (order: Order) => void;
  cart: CartItem[];
  total: number;
}

const steps = ['Shipping', 'Payment', 'Summary'];

const CheckoutWizard: React.FC<CheckoutWizardProps> = ({ open, onClose, onConfirm, cart, total }) => {
  const [step, setStep] = useState(0);
  const [shipping, setShipping] = useState<ShippingInfo>({ name: '', address: '', city: '', zip: '' });
  const [shippingErrors, setShippingErrors] = useState<Record<string, string>>({});
  const [payment, setPayment] = useState<PaymentInfo>({ card: '', exp: '', cvc: '' });
  const [paymentErrors, setPaymentErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);

  if (!open) return null;

  // Validation
  const validateShipping = () => {
    const errors: Record<string, string> = {};
    if (!shipping.name) errors.name = 'Name required';
    if (!shipping.address) errors.address = 'Address required';
    if (!shipping.city) errors.city = 'City required';
    if (!shipping.zip) errors.zip = 'ZIP required';
    setShippingErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const validatePayment = () => {
    const errors: Record<string, string> = {};
    if (!/^\d{16}$/.test(payment.card)) errors.card = '16-digit card required';
    if (!/^\d{2}\/\d{2}$/.test(payment.exp)) errors.exp = 'MM/YY required';
    if (!/^\d{3}$/.test(payment.cvc)) errors.cvc = '3-digit CVC required';
    setPaymentErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Step content
  const renderStep = () => {
    if (step === 0) {
      return (
        <form style={{ display: 'flex', flexDirection: 'column', gap: 12 }} onSubmit={(e) => { e.preventDefault(); if (validateShipping()) setStep(1); }}>
          <input placeholder="Full Name" value={shipping.name} onChange={(e) => setShipping({ ...shipping, name: e.target.value })} style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }} />
          {shippingErrors.name && <span style={{ color: 'red', fontSize: 13 }}>{shippingErrors.name}</span>}
          <input placeholder="Address" value={shipping.address} onChange={(e) => setShipping({ ...shipping, address: e.target.value })} style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }} />
          {shippingErrors.address && <span style={{ color: 'red', fontSize: 13 }}>{shippingErrors.address}</span>}
          <input placeholder="City" value={shipping.city} onChange={(e) => setShipping({ ...shipping, city: e.target.value })} style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }} />
          {shippingErrors.city && <span style={{ color: 'red', fontSize: 13 }}>{shippingErrors.city}</span>}
          <input placeholder="ZIP" value={shipping.zip} onChange={(e) => setShipping({ ...shipping, zip: e.target.value })} style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }} />
          {shippingErrors.zip && <span style={{ color: 'red', fontSize: 13 }}>{shippingErrors.zip}</span>}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 18 }}>
            <button type="button" className="hero-cta" onClick={onClose}>Cancel</button>
            <button type="submit" className="hero-cta">Next</button>
          </div>
        </form>
      );
    }
    if (step === 1) {
      return (
        <form style={{ display: 'flex', flexDirection: 'column', gap: 12 }} onSubmit={(e) => { e.preventDefault(); if (validatePayment()) setStep(2); }}>
          <input placeholder="Card Number" value={payment.card} onChange={(e) => setPayment({ ...payment, card: e.target.value.replace(/\D/g, '').slice(0,16) })} style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }} />
          {paymentErrors.card && <span style={{ color: 'red', fontSize: 13 }}>{paymentErrors.card}</span>}
          <input placeholder="MM/YY" value={payment.exp} onChange={(e) => setPayment({ ...payment, exp: e.target.value.replace(/[^\d/]/g, '').slice(0,5) })} style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }} />
          {paymentErrors.exp && <span style={{ color: 'red', fontSize: 13 }}>{paymentErrors.exp}</span>}
          <input placeholder="CVC" value={payment.cvc} onChange={(e) => setPayment({ ...payment, cvc: e.target.value.replace(/\D/g, '').slice(0,3) })} style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }} />
          {paymentErrors.cvc && <span style={{ color: 'red', fontSize: 13 }}>{paymentErrors.cvc}</span>}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 18 }}>
            <button type="button" className="hero-cta" onClick={() => setStep(0)}>Back</button>
            <button type="submit" className="hero-cta">Next</button>
          </div>
        </form>
      );
    }
    if (step === 2) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ textAlign: 'left', marginBottom: 10 }}>
            <div><b>Name:</b> {shipping.name}</div>
            <div><b>Address:</b> {shipping.address}, {shipping.city}, {shipping.zip}</div>
            <div><b>Payment:</b> **** **** **** {payment.card.slice(-4)}</div>
          </div>
          <div style={{ background: '#f9fafb', borderRadius: 8, padding: 12, marginBottom: 10 }}>
            <b>Order:</b>
            {cart.map(item => (
              <div key={item.name} style={{ fontSize: 14 }}>{item.name} x{item.quantity} - {item.price}</div>
            ))}
            <div style={{ fontWeight: 700, marginTop: 8 }}>Total: ${total.toFixed(2)}</div>
          </div>
          {orderError && <div style={{ color: 'red', marginBottom: 8 }}>{orderError}</div>}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 18 }}>
            <button type="button" className="hero-cta" onClick={() => setStep(1)}>Back</button>
            <button type="button" className="hero-cta" disabled={loading} onClick={async () => {
              setLoading(true);
              setOrderError(null);
              try {
                // Simulate POST /api/checkout
                const res = await fetch('/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ shipping, payment, cart, total }) });
                const data = await res.json();
                if (data && data.gatewayUrl) {
                  onConfirm({ shipping, payment, cart, total });
                  window.location.href = data.gatewayUrl;
                } else {
                  setOrderError('Checkout failed.');
                }
              } catch {
                setOrderError('Checkout failed.');
              } finally {
                setLoading(false);
              }
            }}>{loading ? 'Processing...' : 'Confirm Purchase'}</button>
          </div>
        </div>
      );
    }
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.25)', zIndex: 1100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="hero-glass" style={{ maxWidth: 440, width: '100%', padding: '2.5rem 1.5rem 2rem 1.5rem', borderRadius: 16, position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 12, right: 12, background: 'none', border: 'none', fontSize: 22, cursor: 'pointer' }}>&times;</button>
        {/* Progress Navbar */}
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', background: '#fff', borderBottom: '1.5px solid #e5e7eb', zIndex: 1200, display: 'flex', justifyContent: 'center', alignItems: 'center', height: 56 }}>
          {steps.map((s, i) => (
            <div key={s} style={{ fontWeight: step === i ? 700 : 400, color: step === i ? 'var(--accent)' : '#6b7280', fontSize: 16, margin: '0 18px', transition: 'color 0.2s' }}>{s}</div>
          ))}
        </div>
        <div style={{ marginTop: 64 }}>{renderStep()}</div>
      </div>
    </div>
  );
};

export default CheckoutWizard; 