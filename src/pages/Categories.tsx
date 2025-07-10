import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  { name: 'Electronics', image: '/images/category-electronics.jpg', link: '/category/electronics' },
  { name: 'Fashion', image: '/images/category-fashion.jpg', link: '/category/fashion' },
  { name: 'Home & Kitchen', image: '/images/category-home.jpg', link: '/category/home' },
  { name: 'Books', image: '/images/category-books.jpg', link: '/category/books' },
  { name: 'Sports & Outdoors', image: '/images/category-sports.jpg', link: '/category/sports' },
  { name: 'More Categories', image: '/images/category-more.jpg', link: '/category/more' },
];

const Categories: React.FC = () => (
  <main style={{ minHeight: '100vh', padding: '6rem 1rem 2.5rem 1rem' }}>
    <section className="hero-glass" style={{ maxWidth: 1100, width: '100%', margin: '0 auto', textAlign: 'center', padding: '2.5rem 1.5rem' }}>
      <h2 className="hero-headline" style={{ fontSize: '2rem', marginBottom: '2rem' }}>Product Categories</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '2rem',
        width: '100%',
        margin: '0 auto',
        justifyItems: 'center',
      }}>
        {categories.map((cat) => (
          <Link key={cat.name} to={cat.link} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="feature-card" style={{ padding: '1.5rem 1rem', minHeight: 220, alignItems: 'center', justifyContent: 'center' }}>
              <img src={cat.image} alt={cat.name} style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 16, marginBottom: 18, boxShadow: '0 2px 8px rgba(0,0,0,0.10)' }} />
              <div className="feature-title" style={{ fontSize: '1.13rem', marginBottom: 6 }}>{cat.name}</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  </main>
);

export default Categories; 