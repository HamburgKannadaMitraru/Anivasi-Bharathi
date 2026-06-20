import React, { useState, useEffect } from 'react';
import './Hero.css';

export default function Hero({ stats }) {
  const greetings = ['Swagatam', 'Namaste', 'Vanakkam', 'Sat Sri Akal', 'Nomoshkar', 'Swagatha', 'Namaskaram'];
  const [greetingIdx, setGreetingIdx] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setGreetingIdx(prev => (prev + 1) % greetings.length);
        setFade(true);
      }, 300); // Wait for fade-out to finish
    }, 2800);

    return () => clearInterval(timer);
  }, []);

  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero-section">
      <div className="hero-blur-blob blob-orange"></div>
      <div className="hero-blur-blob blob-blue"></div>
      
      <div className="container hero-container animate-fade">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-glow animate-pulse"></span>
            <span className={`rotating-greeting ${fade ? 'fade-in' : 'fade-out'}`}>
              {greetings[greetingIdx]}
            </span>
            &nbsp;• Anivasi Bharathi e.V. Hamburg
          </div>
          <h1 className="hero-title">
            Preserving <span className="text-gradient">Heritage</span>,<br />
            Uniting <span className="text-gradient-secondary">Communities</span>.
          </h1>
          <p className="hero-description">
            Connecting the Indian diaspora in Northern Germany. We celebrate cultural traditions, promote wellness, and foster integration through festivals, sports, yoga, and charity. Join us to experience a home away from home.
          </p>
          <div className="hero-cta">
            <button onClick={() => handleScroll('calendar')} className="btn btn-primary">
              📅 Explore Events
            </button>
            <button onClick={() => handleScroll('contact')} className="btn btn-secondary">
              🤝 Join / Volunteer
            </button>
          </div>
        </div>

        <div className="hero-stats-grid">
          <div className="stat-card glass-card">
            <div className="stat-icon">👥</div>
            <div className="stat-number">{stats.members || 450}+</div>
            <div className="stat-label">Active Members</div>
          </div>
          <div className="stat-card glass-card">
            <div className="stat-icon">✨</div>
            <div className="stat-number">{stats.eventsOrganized || 35}+</div>
            <div className="stat-label">Events Hosted</div>
          </div>
          <div className="stat-card glass-card">
            <div className="stat-icon">🧡</div>
            <div className="stat-number">{stats.volunteers || 120}+</div>
            <div className="stat-label">Volunteers</div>
          </div>
          <div className="stat-card glass-card">
            <div className="stat-icon">🙏</div>
            <div className="stat-number">{stats.activeDonors || 82}+</div>
            <div className="stat-label">Active Donors</div>
          </div>
        </div>
      </div>
    </section>
  );
}
