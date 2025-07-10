import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const CategorySports: React.FC = () => {
  const sportsItems = [
    { name: 'Basketball', image: '/images/basketball.jpg', price: '$29.99', brand: 'SportsPro' },
    { name: 'Dumbbells', image: '/images/dumbbells.jpg', price: '$89.99', brand: 'FitnessCo' },
    { name: 'Trekking Gear', image: '/images/trekking.jpg', price: '$149.99', brand: 'OutdoorLife' },
    { name: 'Yoga Mat', image: '/images/yogamat.jpg', price: '$39.99', brand: 'WellnessHub' },
  ];

  const [quantities, setQuantities] = useState(Array(sportsItems.length).fill(1));
  const { addToCart } = useCart();

  const handleQuantity = (idx: number, delta: number) => {
    setQuantities(q => q.map((val, i) => i === idx ? Math.max(1, Math.min(99, val + delta)) : val));
  };

  const handleAddToCart = (idx: number) => {
    const { name, image, price, brand } = sportsItems[idx];
    addToCart({ name, image, price, brand }, quantities[idx]);
  };

  return (
    <main style={{ minHeight: '100vh', padding: '6rem 1rem 2.5rem 1rem' }}>
      <section className="hero-glass" style={{ maxWidth: 1100, width: '100%', margin: '0 auto', textAlign: 'center', padding: '2.5rem 1.5rem' }}>
        <h1 className="hero-headline" style={{ fontSize: '2rem', marginBottom: '2rem' }}>Sports & Outdoors</h1>
        <div className="product-grid fade-anim">
          {sportsItems.map((item, idx) => (
            <div key={item.name} className="product-card">
              <span className="product-icon" aria-label="Sports">🏀</span>
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

export default CategorySports; 