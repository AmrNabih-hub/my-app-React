import React from 'react';

const About: React.FC = () => (
  <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5.5rem 1rem 2rem 1rem' }}>
    <section className="hero-glass" style={{ maxWidth: 540, width: '100%', textAlign: 'center' }}>
      <h2 className="hero-headline" style={{ fontSize: '2rem', marginBottom: '1.2rem' }}>About Us</h2>
      <p style={{ fontSize: '1.13rem', color: '#4b5563', marginBottom: '1.5rem', fontWeight: 500 }}>
        Welcome to the Multi Vendor Web App! Our platform empowers vendors to showcase and sell their products online, while providing customers with a seamless shopping experience. We are dedicated to building a secure, scalable, and user-friendly marketplace for everyone.
      </p>
      <p style={{ fontStyle: 'italic', color: '#b6b6b6' }}>
        This is placeholder text. Replace with your real story, mission, and team info.
      </p>
    </section>
  </main>
);

export default About; 