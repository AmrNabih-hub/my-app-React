import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Categories from './pages/Categories';
import CategoryBooks from './pages/CategoryBooks';
import CategoryElectronics from './pages/CategoryElectronics';
import CategoryFashion from './pages/CategoryFashion';
import CategoryHome from './pages/CategoryHome';
import CategoryMore from './pages/CategoryMore';
import CategorySports from './pages/CategorySports';
import Cart from './pages/Cart';
import Contact from './pages/Contact';
import Auth from './pages/Auth';
import Search from './pages/Search';
import './App.css';
import { useToast } from './context/CartContext';

function Toast() {
  const { toast } = useToast();
  if (!toast) return null;
  return (
    <div style={{
      position: 'fixed',
      top: 80,
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'var(--accent)',
      color: '#fff',
      padding: '0.85em 2.2em',
      borderRadius: 999,
      fontWeight: 600,
      fontSize: '1.08rem',
      boxShadow: '0 4px 18px rgba(234,88,12,0.13)',
      zIndex: 9999,
      opacity: 0.97,
      transition: 'opacity 0.2s',
      pointerEvents: 'none',
    }}>
      {toast}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Header />
      <Toast />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/search" element={<Search />} />
        <Route path="/category/books" element={<CategoryBooks />} />
        <Route path="/category/electronics" element={<CategoryElectronics />} />
        <Route path="/category/fashion" element={<CategoryFashion />} />
        <Route path="/category/home" element={<CategoryHome />} />
        <Route path="/category/sports" element={<CategorySports />} />
        <Route path="/category/more" element={<CategoryMore />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
