import React from 'react';
import { useLocation } from 'react-router-dom';

const allProducts = [
  // Electronics
  { name: 'Laptop', image: '/images/laptop.jpg', price: '$999.99', brand: 'TechCorp', category: 'Electronics' },
  { name: 'Smartphone', image: '/images/smartphone.jpg', price: '$699.99', brand: 'MobileTech', category: 'Electronics' },
  { name: 'Headphones', image: '/images/headphones.jpg', price: '$199.99', brand: 'AudioPro', category: 'Electronics' },
  { name: 'Smartwatch', image: '/images/smartwatch.jpg', price: '$299.99', brand: 'WearTech', category: 'Electronics' },
  // Add more products from other categories as needed
];

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Search: React.FC = () => {
  const query = useQuery().get('q')?.toLowerCase() || '';
  const results = allProducts.filter(
    p => p.name.toLowerCase().includes(query) || p.brand.toLowerCase().includes(query)
  );

  return (
    <main style={{ minHeight: '100vh', padding: '6rem 1rem 2.5rem 1rem' }}>
      <section className="hero-glass" style={{ maxWidth: 1100, width: '100%', margin: '0 auto', textAlign: 'center', padding: '2.5rem 1.5rem' }}>
        <h2 className="hero-headline" style={{ fontSize: '2rem', marginBottom: '2rem' }}>Search Results</h2>
        {query && results.length === 0 && (
          <div style={{ color: '#4b5563', margin: '2.5rem 0', fontSize: '1.15rem' }}>No products found for "{query}".</div>
        )}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2rem',
          width: '100%',
          margin: '0 auto',
          justifyItems: 'center',
        }}>
          {results.map((item) => (
            <div key={item.name} className="product-card" style={{ padding: '1.5rem 1rem', minHeight: 220, alignItems: 'center', justifyContent: 'center', borderRadius: 12, background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.10)' }}>
              <img src={item.image} alt={item.name} style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 16, marginBottom: 18, boxShadow: '0 2px 8px rgba(0,0,0,0.10)' }} />
              <div className="feature-title" style={{ fontSize: '1.13rem', marginBottom: 6 }}>{item.name}</div>
              <div style={{ color: '#6b7280', fontSize: '0.98rem', marginBottom: 4 }}>{item.brand}</div>
              <div style={{ color: 'var(--accent)', fontWeight: 600 }}>{item.price}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Search; 