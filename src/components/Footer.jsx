import React from 'react';
import './Footer.css';

export default function Footer({ currentView, onViewChange }) {
  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    if (currentView !== 'public') {
      onViewChange('public');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer-container">
      <div className="container footer-grid">
        {/* About column */}
        <div className="footer-col about-col">
          <div className="footer-logo">
            <span className="logo-icon">🕉️</span>
            <h3>Anivasi Bharathi</h3>
          </div>
          <p className="footer-about-text">
            A registered non-profit cultural organization (eingetragener Verein) uniting the Indian community and promoting Indian heritage in Hamburg, Germany.
          </p>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Facebook">FB</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Instagram">IG</a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="YouTube">YT</a>
          </div>
        </div>

        {/* Links column */}
        <div className="footer-col links-col">
          <h4>Navigation</h4>
          <ul className="footer-links">
            <li><a href="#home" onClick={(e) => handleNavClick(e, 'home')}>Home</a></li>
            <li><a href="#about" onClick={(e) => handleNavClick(e, 'about')}>About Us</a></li>
            <li><a href="#calendar" onClick={(e) => handleNavClick(e, 'calendar')}>Calendar</a></li>
            <li><a href="#events" onClick={(e) => handleNavClick(e, 'events')}>Events</a></li>
            <li><a href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>Contact</a></li>
          </ul>
        </div>

        {/* Contact/Reg column */}
        <div className="footer-col info-col">
          <h4>Legal & Registry</h4>
          <p className="registry-text">
            <strong>Anivasi Bharathi e.V.</strong><br />
            Amtsgericht Hamburg<br />
            Registry Number: <strong>VR 23894</strong>
          </p>
          <p className="address-text">
            📍 Krummholzberg 9, 21073 Hamburg<br />
            📧 <a href="mailto:info@anivasi-bharathi.org">info@anivasi-bharathi.org</a>
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container bottom-flex">
          <p>&copy; {new Date().getFullYear()} Anivasi Bharathi e.V. All rights reserved.</p>
          <div className="footer-admin-link">
            {currentView === 'admin' ? (
              <button onClick={() => onViewChange('public')} className="admin-toggle-link">
                🌐 Exit Admin Mode
              </button>
            ) : (
              <button onClick={() => onViewChange('admin')} className="admin-toggle-link">
                🔒 Admin Console Gateway
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
