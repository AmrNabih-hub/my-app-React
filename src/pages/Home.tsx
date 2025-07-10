import React from 'react';
import { useNavigate } from 'react-router-dom';

const features = [
  {
    icon: '🛒',
    title: 'Seamless Shopping',
    desc: 'Browse and buy from multiple vendors in one unified, intuitive experience.'
  },
  {
    icon: '🔒',
    title: 'Secure Payments',
    desc: 'Your transactions are protected with industry-leading security and privacy.'
  },
  {
    icon: '⚡',
    title: 'Fast Delivery',
    desc: 'Enjoy quick, reliable shipping and real-time order tracking.'
  }
];

const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <main>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-glass">
          <h1 className="hero-headline">Discover, Shop, and Enjoy</h1>
          <p style={{ fontSize: '1.18rem', color: '#4b5563', marginBottom: '2.2rem', fontWeight: 500 }}>
            The modern multi-vendor marketplace for everything you love.
          </p>
          <button className="hero-cta" onClick={() => navigate('/categories')}>Start Shopping</button>
        </div>
      </section>
      {/* Features Section */}
      <section className="features-section">
        {features.map((f, i) => (
          <div className="feature-card" key={i}>
            <span className="feature-icon" aria-hidden>{f.icon}</span>
            <div className="feature-title">{f.title}</div>
            <div className="feature-desc">{f.desc}</div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Home; 