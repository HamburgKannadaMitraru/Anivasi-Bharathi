import React from 'react';
import './Navbar.css';

export default function Navbar({ currentView, onViewChange }) {
  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    if (currentView !== 'public') {
      onViewChange('public');
      // Delay slightly to allow public view to render before scrolling
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
    <header className="navbar-header">
      <div className="container navbar-container">
        <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="navbar-logo">
          <span className="logo-icon">🕉️</span>
          <div className="logo-text">
            <span className="logo-title">Anivasi Bharathi</span>
            <span className="logo-subtitle">Hamburg e.V.</span>
          </div>
        </a>

        <nav className="navbar-nav">
          <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="nav-link">Home</a>
          <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="nav-link">About Us</a>
          <a href="#calendar" onClick={(e) => handleNavClick(e, 'calendar')} className="nav-link">Calendar</a>
          <a href="#events" onClick={(e) => handleNavClick(e, 'events')} className="nav-link">Events</a>
          <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="nav-link">Contact</a>
        </nav>

        <div className="navbar-actions">
          {currentView === 'admin' ? (
            <button 
              className="btn btn-primary btn-sm"
              onClick={() => onViewChange('public')}
            >
              🌐 Public Site
            </button>
          ) : (
            <button 
              className="btn btn-secondary btn-sm admin-btn"
              onClick={() => onViewChange('admin')}
            >
              🔒 Admin Dashboard
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
