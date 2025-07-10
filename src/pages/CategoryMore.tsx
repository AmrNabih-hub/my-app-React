import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const CategoryMore: React.FC = () => {
  const moreItems = [
    { name: 'Pet Supplies', image: '/images/pet.jpg', price: '$19.99', brand: 'PetCare' },
    { name: 'Baby Products', image: '/images/baby.jpg', price: '$34.99', brand: 'BabySafe' },
    { name: 'Automotive', image: '/images/automotive.jpg', price: '$89.99', brand: 'AutoPro' },
    { name: 'Gift Items', image: '/images/gift.jpg', price: '$24.99', brand: 'GiftHub' },
  ];

  const [quantities, setQuantities] = useState(Array(moreItems.length).fill(1));
  const { addToCart } = useCart();

  const handleQuantity = (idx: number, delta: number) => {
    setQuantities(q => q.map((val, i) => i === idx ? Math.max(1, Math.min(99, val + delta)) : val));
  };

  const handleAddToCart = (idx: number) => {
    const { name, image, price, brand } = moreItems[idx];
    addToCart({ name, image, price, brand }, quantities[idx]);
  };

  return (
    <main style={{ minHeight: '100vh', padding: '6rem 1rem 2.5rem 1rem' }}>
      <section className="hero-glass" style={{ maxWidth: 1100, width: '100%', margin: '0 auto', textAlign: 'center', padding: '2.5rem 1.5rem' }}>
        <h1 className="hero-headline" style={{ fontSize: '2rem', marginBottom: '2rem' }}>More Categories</h1>
        <div className="product-grid fade-anim">
          {moreItems.map((item, idx) => (
            <div key={item.name} className="product-card">
              <span className="product-icon" aria-label="More">🎁</span>
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

export default CategoryMore; 