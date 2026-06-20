import React from 'react';
import './About.css';
import CulturalBridge from './CulturalBridge';

export default function About() {
  return (
    <section id="about" className="about-section section-padding">
      <div className="container">
        <div className="about-grid">
          <div className="about-text-card glass-card">
            <h3>Who We Are</h3>
            <p>
              Founded by enthusiastic members of the Indian diaspora in Hamburg, <strong>Anivasi Bharathi e.V.</strong> (registered under Amtsgericht Hamburg VR 23894) is dedicated to keeping the rich heritage of India alive while fostering smooth integration with German society.
            </p>
            <p>
              We believe that culture acts as a bridge. By hosting festivals open to all backgrounds, conducting wellness sessions, and participating in local community activities, we strengthen the multicultural fabric of Hamburg.
            </p>
            <div className="legal-info">
              <span className="legal-badge">Registered e.V.</span>
              <p>Amtsgericht Hamburg • VR 23894</p>
            </div>
          </div>

          <div className="about-values-card glass-card">
            <h3>Our Mission</h3>
            <ul className="mission-list">
              <li>
                <span className="mission-icon">🌸</span>
                <div>
                  <strong>Cultural Preservation:</strong> Celebrating major festivals like Ganesha Utsav, Diwali, and Holi in their traditional form.
                </div>
              </li>
              <li>
                <span className="mission-icon">🧘</span>
                <div>
                  <strong>Wellness & Unity:</strong> Organizing the International Day of Yoga and health workshops to promote spiritual and physical well-being.
                </div>
              </li>
              <li>
                <span className="mission-icon">🤝</span>
                <div>
                  <strong>Community Support:</strong> Assisting newcomers, students, and families in adjusting to life in Hamburg through social integration.
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="philosophy-wrapper">
          <h3 className="philosophy-title">Our Core Philosophy: <span>Tan, Man, Dhan</span></h3>
          <p className="philosophy-subtitle">We organize all our public festivals without entry tickets, relying completely on the collective power of the community.</p>
          
          <div className="philosophy-grid">
            <div className="philosophy-card glass-card">
              <div className="philosophy-num">01</div>
              <h4>Tan (तन्)</h4>
              <h5>Physical Service / Volunteering</h5>
              <p>Dedicating our physical time, energy, and skills. From organizing venues and building stages to serving meals, our volunteers are the backbone of every event.</p>
            </div>
            
            <div className="philosophy-card glass-card">
              <div className="philosophy-num">02</div>
              <h4>Man (मन)</h4>
              <h5>Pure Devotion & Intent</h5>
              <p>Putting our heart, goodwill, and positive attitude into our activities. Fostering a welcoming environment, respect for traditions, and unity within the community.</p>
            </div>
            
            <div className="philosophy-card glass-card">
              <div className="philosophy-num">03</div>
              <h4>Dhan (धन)</h4>
              <h5>Financial Support</h5>
              <p>Contributing resources. Since our events are free to attend and open to all, we depend entirely on voluntary contributions and donations (Sewa) from our patrons.</p>
            </div>
          </div>
        </div>

        {/* Dynamic comparative infographic bridge */}
        <CulturalBridge />

      </div>
    </section>
  );
}
