import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const CategoryElectronics: React.FC = () => {
  const electronics = [
    { name: 'Laptop', image: '/images/laptop.jpg', price: '$999.99', brand: 'TechCorp' },
    { name: 'Smartphone', image: '/images/smartphone.jpg', price: '$699.99', brand: 'MobileTech' },
    { name: 'Headphones', image: '/images/headphones.jpg', price: '$199.99', brand: 'AudioPro' },
    { name: 'Smartwatch', image: '/images/smartwatch.jpg', price: '$299.99', brand: 'WearTech' },
  ];

  const [quantities, setQuantities] = useState(Array(electronics.length).fill(1));
  const { addToCart } = useCart();

  const handleQuantity = (idx: number, delta: number) => {
    setQuantities(q => q.map((val, i) => i === idx ? Math.max(1, Math.min(99, val + delta)) : val));
  };

  const handleAddToCart = (idx: number) => {
    const { name, image, price, brand } = electronics[idx];
    addToCart({ name, image, price, brand }, quantities[idx]);
  };

  return (
    <main style={{ minHeight: '100vh', padding: '6rem 1rem 2.5rem 1rem' }}>
      <section className="hero-glass" style={{ maxWidth: 1100, width: '100%', margin: '0 auto', textAlign: 'center', padding: '2.5rem 1.5rem' }}>
        <h1 className="hero-headline" style={{ fontSize: '2rem', marginBottom: '2rem' }}>Electronics & Gadgets</h1>
        <div className="product-grid fade-anim">
          {electronics.map((item, idx) => (
            <div key={item.name} className="product-card">
              <span className="product-icon" aria-label="Device">💻</span>
              <img src={item.image} alt={item.name} />
              <div className="product-title">{item.name}</div>
              <div className="product-brand">by {item.brand}</div>
              <div className="product-price">{item.price}</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, margin: '12px 0' }}>
                <button className="nav-btn" style={{ minWidth: 32, padding: 0 }} onClick={() => handleQuantity(idx, -1)}>-</button>
                <input type="number" min={1} max={99} value={quantities[idx]} readOnly style={{ width: 38, textAlign: 'center', border: '1px solid #e5e7eb', borderRadius: 6, fontSize: '1rem', padding: '0.3rem 0', background: 'rgba(255,255,255,0.7)' }} />
                <button className="nav-btn" style={{ minWidth: 32, padding: 0 }} onClick={() => handleQuantity(idx, 1)}>+</button>
              </div>
              <button className="hero-cta" style={{ width: '100%', marginTop: 8 }} onClick={() => handleAddToCart(idx)}>Add to Cart</button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default CategoryElectronics; 