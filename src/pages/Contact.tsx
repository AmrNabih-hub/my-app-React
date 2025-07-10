import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Message sent! (Demo)');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5.5rem 1rem 2rem 1rem' }}>
      <section className="hero-glass" style={{ maxWidth: 480, width: '100%', textAlign: 'center' }}>
        <h2 className="hero-headline" style={{ fontSize: '2rem', marginBottom: '1.2rem' }}>Contact Us</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem', marginTop: '1.5rem' }}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            style={{ padding: '0.85rem 1rem', borderRadius: 8, border: '1.5px solid var(--glass-border)', background: 'rgba(255,255,255,0.25)', fontSize: '1.05rem', color: '#23272f', outline: 'none' }}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            style={{ padding: '0.85rem 1rem', borderRadius: 8, border: '1.5px solid var(--glass-border)', background: 'rgba(255,255,255,0.25)', fontSize: '1.05rem', color: '#23272f', outline: 'none' }}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows={4}
            value={form.message}
            onChange={handleChange}
            style={{ padding: '0.85rem 1rem', borderRadius: 8, border: '1.5px solid var(--glass-border)', background: 'rgba(255,255,255,0.25)', fontSize: '1.05rem', color: '#23272f', outline: 'none', resize: 'vertical' }}
            required
          />
          <button type="submit" className="hero-cta" style={{ width: '100%' }}>Send</button>
        </form>
      </section>
    </main>
  );
};

export default Contact; 