// Flexicare Dynamics – Optimized Single Page React App with Navigation, SEO, and Animations
import React, { useState } from 'react';
import './App.css';

const scrollTo = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

const productImages = [
  { name: 'Blown Film Extrusion', src: process.env.PUBLIC_URL + '/images/blown-film.jpg' },
  { name: 'Cast Film Extrusion', src: process.env.PUBLIC_URL + '/images/cast-film.jpg' },
  { name: 'Printing', src: process.env.PUBLIC_URL + '/images/printing.jpg' },
  { name: 'Converting', src: process.env.PUBLIC_URL + '/images/converting.jpg' },
  { name: 'Pouching', src: process.env.PUBLIC_URL + '/images/pouching.jpg' },
  { name: 'Metallizing', src: process.env.PUBLIC_URL + '/images/metallizing.jpg' },
  { name: 'Laminating', src: process.env.PUBLIC_URL + '/images/laminating.jpg' },
];

const sendEmail = async (formData) => {
  await fetch('https://formsubmit.co/ajax/sales@flexicaredynamics.in', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
};

const Modal = ({ message, onClose }) => (
  <div className="modal">
    <div className="modal-content animate-pop">
      <p>{message}</p>
      <button onClick={onClose}>Close</button>
    </div>
  </div>
);

const FeatureCard = ({ title, description }) => (
  <div className="feature-card animate-fade">
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

const App = () => {
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [quoteForm, setQuoteForm] = useState({ company: '', equipment: '', message: '' });
  const [modal, setModal] = useState({ show: false, message: '' });

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    await sendEmail(contactForm);
    setContactForm({ name: '', email: '', message: '' });
    setModal({ show: true, message: 'Message sent successfully!' });
  };

  const handleQuoteSubmit = async (e) => {
    e.preventDefault();
    await sendEmail({
      Name: quoteForm.company,
      Subject: 'Quote Request',
      Message: `Equipment: ${quoteForm.equipment}\nDetails: ${quoteForm.message}`,
    });
    setQuoteForm({ company: '', equipment: '', message: '' });
    setModal({ show: true, message: 'Quote request sent successfully!' });
  };

  return (
    <div>
      <nav className="top-nav">
        <h1 onClick={() => scrollTo('top')}>Flexicare Dynamics</h1>
        <div className="nav-links">
          <button onClick={() => scrollTo('about')}>About</button>
          <button onClick={() => scrollTo('services')}>Services</button>
          <button onClick={() => scrollTo('products')}>Products</button>
          <button onClick={() => scrollTo('retrofit')}>Retrofit</button>
          <button onClick={() => scrollTo('contact')}>Contact</button>
          <button onClick={() => scrollTo('quote')}>Quote</button>
        </div>
      </nav>

      <header className="navbar" id="top">
        <h1>Flexicare Dynamics</h1>
        <p>Your Trusted Partner for Flexible Packaging Solutions</p>
      </header>

      <section className="section about" id="about">
        <h2>About Us</h2>
        <p>Flexicare Dynamics is your go-to partner for reliable, high-performance parts and retrofit solutions for flexible packaging machinery. With over 30 years of industry expertise, our team ensures your machines stay efficient, modern, and productive.</p>
        <p>We go beyond just supplying parts — we engineer solutions that maximize uptime, reduce costs, and improve machine performance.</p>
      </section>

      <section className="section services" id="services">
        <h2>Why Choose Us?</h2>
        <div className="features">
          <FeatureCard title="Fast Diagnostics" description="Minimize downtime with accurate fault detection and quick turnaround support." />
          <FeatureCard title="Global Vendor Network" description="Access top-quality parts worldwide at significantly lower costs." />
          <FeatureCard title="Cost-Efficient Solutions" description="Avoid expensive upgrades by fixing the root cause with precision." />
          <FeatureCard title="Retrofit Expertise" description="Modernize aging equipment with custom-engineered replacements." />
          <FeatureCard title="Tailored Engineering" description="Work with seasoned experts to build exactly what your machine needs." />
        </div>
      </section>

      <section className="section products" id="products">
        <h2>Product Range</h2>
        <p>Our products are built to perform, ensuring consistent quality, speed, and durability across your operations.</p>
        <div className="grid">
          {productImages.map((product, index) => (
            <div key={index} className="card animate-fade">
              <img src={product.src} alt={product.name} className="product-img" />
              <p><strong>{product.name}</strong></p>
            </div>
          ))}
        </div>
      </section>

      <section className="section retrofit" id="retrofit">
        <h2>Retrofit Solutions</h2>
        <p>Don't let obsolete parts slow you down. Our retrofit solutions extend the life of your equipment, helping you stay competitive without overspending.</p>
        <p>Our engineers reverse-engineer outdated components and develop modern alternatives that integrate seamlessly with your current setup.</p>
      </section>

      <section className="section contact" id="contact">
        <h2>Contact Us</h2>
        <p>Have questions or need expert advice? Let’s connect. Our specialists are ready to support you.</p>
        <form className="form animate-fade" onSubmit={handleContactSubmit}>
          <input type="text" placeholder="Name" value={contactForm.name} onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })} required />
          <input type="email" placeholder="Email" value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} required />
          <textarea placeholder="Your Message" rows="4" value={contactForm.message} onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })} required></textarea>
          <button type="submit">Send</button>
        </form>
      </section>

      <section className="section quote" id="quote">
        <h2>Request a Quote</h2>
        <p>Tell us what you need and we’ll get back to you with tailored, cost-effective solutions that deliver.</p>
        <form className="form animate-fade" onSubmit={handleQuoteSubmit}>
          <input type="text" placeholder="Company Name" value={quoteForm.company} onChange={(e) => setQuoteForm({ ...quoteForm, company: e.target.value })} required />
          <input type="text" placeholder="Equipment Type" value={quoteForm.equipment} onChange={(e) => setQuoteForm({ ...quoteForm, equipment: e.target.value })} required />
          <textarea placeholder="Describe your requirements" rows="4" value={quoteForm.message} onChange={(e) => setQuoteForm({ ...quoteForm, message: e.target.value })} required></textarea>
          <button type="submit">Submit</button>
        </form>
      </section>

      {modal.show && <Modal message={modal.message} onClose={() => setModal({ show: false, message: '' })} />}

      <footer className="footer">
        <p>© {new Date().getFullYear()} Flexicare Dynamics. All rights reserved.</p>
        <button onClick={() => scrollTo('top')} className="scroll-top">Back to Top ↑</button>
      </footer>
    </div>
  );
};

export default App;
