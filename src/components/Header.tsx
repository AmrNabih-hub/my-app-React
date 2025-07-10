import { useContext, useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/categories', label: 'Categories' },
  { to: '/cart', label: 'Cart', icon: '🛒' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
  { to: '/auth', label: 'Login/Signup' },
];

// All products for live search (should match Search.tsx)
const allProducts = [
  { name: 'Laptop', image: '/images/laptop.jpg', price: '$999.99', brand: 'TechCorp', category: 'Electronics' },
  { name: 'Smartphone', image: '/images/smartphone.jpg', price: '$699.99', brand: 'MobileTech', category: 'Electronics' },
  { name: 'Headphones', image: '/images/headphones.jpg', price: '$199.99', brand: 'AudioPro', category: 'Electronics' },
  { name: 'Smartwatch', image: '/images/smartwatch.jpg', price: '$299.99', brand: 'WearTech', category: 'Electronics' },
  // Add more products as needed
];

function fuzzyMatch(query: string, text: string) {
  // Simple fuzzy: all query chars in order in text
  query = query.toLowerCase();
  text = text.toLowerCase();
  let qi = 0, ti = 0;
  while (qi < query.length && ti < text.length) {
    if (query[qi] === text[ti]) qi++;
    ti++;
  }
  return qi === query.length;
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const cartContext = useContext(CartContext);
  const cartCount = cartContext?.cartCount ?? 0;
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (showSearch && searchRef.current) {
      searchRef.current.focus();
    }
  }, [showSearch]);

  // Live search results
  const liveResults = search.trim()
    ? allProducts
        .map(p => ({
          ...p,
          score: p.name.toLowerCase() === search.toLowerCase() ? 0
            : p.name.toLowerCase().includes(search.toLowerCase()) ? 1
            : p.brand.toLowerCase().includes(search.toLowerCase()) ? 2
            : fuzzyMatch(search, p.name) ? 3
            : fuzzyMatch(search, p.brand) ? 4
            : 99
        }))
        .filter(p => p.score < 99)
        .sort((a, b) => a.score - b.score)
        .slice(0, 5)
    : [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?q=${encodeURIComponent(search.trim())}`);
      setShowSearch(false);
      setSearch('');
      setShowDropdown(false);
    }
  };

  const handleResultClick = (q: string) => {
    navigate(`/search?q=${encodeURIComponent(q)}`);
    setShowSearch(false);
    setSearch('');
    setShowDropdown(false);
  };

  return (
    <header className={`navbar${scrolled ? ' navbar-scrolled' : ''}`}>
      <h1 className="navbar-title">Multi Vendor</h1>
      <nav className="navbar-nav" style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
        {/* Search icon/input before Home button */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <button
            aria-label="Search"
            onClick={() => { setShowSearch(s => !s); setShowDropdown(true); }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, display: 'flex', alignItems: 'center' }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 1px 4px #ea580c88)' }}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </button>
          {showSearch && (
            <form onSubmit={handleSearch} style={{ position: 'absolute', left: 0, top: '110%', background: '#fff', borderRadius: 8, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', padding: 6, display: 'flex', alignItems: 'center', zIndex: 20, minWidth: 180 }}>
              <input
                ref={searchRef}
                type="text"
                value={search}
                onChange={e => { setSearch(e.target.value); setShowDropdown(true); }}
                placeholder="Search..."
                style={{ padding: '0.4rem 0.8rem', borderRadius: 6, border: '1.5px solid var(--accent)', fontSize: '1rem', outline: 'none', minWidth: 100, maxWidth: 180, background: '#fff', color: '#23272f', boxShadow: '0 1px 4px #ea580c22' }}
                onFocus={() => setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 120)}
              />
              <button type="submit" className="hero-cta" style={{ padding: '0.4rem 0.8rem', borderRadius: 6, marginLeft: 4, background: 'var(--accent)', color: '#fff' }}>Go</button>
              {showDropdown && search.trim() && (
                <div style={{
                  position: 'absolute',
                  left: 0,
                  top: '110%',
                  background: '#fff',
                  borderRadius: 8,
                  boxShadow: '0 4px 18px rgba(234,88,12,0.13)',
                  minWidth: 220,
                  marginTop: 4,
                  zIndex: 30,
                  color: '#23272f',
                  fontSize: '1rem',
                  maxHeight: 260,
                  overflowY: 'auto',
                }}>
                  {liveResults.length === 0 ? (
                    <div style={{ padding: '0.7rem 1.1rem', color: '#888' }}>No results found.</div>
                  ) : (
                    liveResults.map(item => (
                      <div
                        key={item.name}
                        style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0.7rem 1.1rem', cursor: 'pointer', borderBottom: '1px solid #f3f4f6' }}
                        onMouseDown={() => handleResultClick(item.name)}
                      >
                        <img src={item.image} alt={item.name} style={{ width: 32, height: 32, objectFit: 'cover', borderRadius: 8, boxShadow: '0 1px 4px #ea580c22' }} />
                        <div>
                          <div style={{ fontWeight: 600 }}>{item.name}</div>
                          <div style={{ fontSize: '0.93em', color: '#ea580c' }}>{item.brand}</div>
                        </div>
                        <div style={{ marginLeft: 'auto', fontWeight: 600 }}>{item.price}</div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </form>
          )}
        </div>
        {/* Home button and the rest */}
        {navLinks.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `nav-btn${isActive ? ' active' : ''}`}
            style={{ position: 'relative' }}
          >
            {icon ? (
              <span style={{ position: 'relative', display: 'inline-block' }}>
                <span style={{ fontSize: '1.25em', marginRight: 6 }}>{icon}</span>
                {to === '/cart' && cartCount > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: -8,
                    right: -12,
                    background: 'var(--accent)',
                    color: '#fff',
                    borderRadius: '999px',
                    fontSize: '0.85em',
                    fontWeight: 700,
                    padding: '0.15em 0.6em',
                    minWidth: 20,
                    boxShadow: '0 2px 8px rgba(234,88,12,0.13)',
                    transition: 'transform 0.18s',
                    zIndex: 2
                  }}>{cartCount}</span>
                )}
              </span>
            ) : label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}

export default Header; 