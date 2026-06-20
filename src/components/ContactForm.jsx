import React, { useState } from 'react';
import './ContactForm.css';
import { database } from '../utils/mockDatabase';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'general', // 'general', 'volunteer', 'sponsor'
    volunteerRole: 'Logistics & Venue Setup',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);

    const payload = {
      name: formData.name,
      email: formData.email,
      type: formData.type,
      message: formData.message,
      volunteerRole: formData.type === 'volunteer' ? formData.volunteerRole : ''
    };

    // Simulate small network delay for realistic experience
    setTimeout(() => {
      database.saveContactSubmission(payload);
      setLoading(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        type: 'general',
        volunteerRole: 'Logistics & Venue Setup',
        message: ''
      });
      
      // Reset success banner after 5s
      setTimeout(() => setSubmitted(false), 5500);
    }, 700);
  };

  return (
    <section id="contact" className="contact-section section-padding">
      <div className="container">
        <div className="section-header">
          <h2>Get in Touch</h2>
          <p>Have questions, want to sponsor, or volunteer? Reach out and build a stronger community together.</p>
        </div>

        <div className="contact-grid">
          {/* Info Details Panel */}
          <div className="contact-info-panel glass-card">
            <h3>Contact Information</h3>
            <p className="panel-desc">Feel free to drop by our community gatherings or email us directly for official matters.</p>

            <div className="info-items-list">
              <div className="info-item">
                <span className="info-icon">📍</span>
                <div>
                  <h4>Association Center / Registered Office</h4>
                  <p>Krummholzberg 9, 21073 Hamburg, Germany</p>
                </div>
              </div>

              <div className="info-item">
                <span className="info-icon">📧</span>
                <div>
                  <h4>Email Address</h4>
                  <p>
                    <a href="mailto:info@anivasi-bharathi.org">info@anivasi-bharathi.org</a>
                  </p>
                </div>
              </div>

              <div className="info-item">
                <span className="info-icon">🏢</span>
                <div>
                  <h4>Official e.V. Registry</h4>
                  <p>Amtsgericht Hamburg • VR 23894</p>
                </div>
              </div>
            </div>

            {/* Mock map placeholder - looks premium */}
            <div className="map-placeholder">
              <div className="map-glow"></div>
              <span className="map-pin">📍</span>
              <p>Anivasi Bharathi e.V. Center<br /><span>Hamburg, Germany</span></p>
            </div>
          </div>

          {/* Form Panel */}
          <div className="contact-form-panel glass-card">
            <h3>Send a Message</h3>
            
            {submitted ? (
              <div className="success-banner animate-fade">
                <div className="success-icon">🙏</div>
                <h4>Dhanyavad! Thank you.</h4>
                <p>Your message has been recorded. Our team will review it and get back to you at the earliest.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="name">Name</label>
                    <input 
                      type="text" 
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="email">Email</label>
                    <input 
                      type="email" 
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="type">Purpose</label>
                  <select 
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="form-input select-input"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="volunteer">Become a Volunteer</option>
                    <option value="sponsor">Sponsorship / Sewa</option>
                  </select>
                </div>

                {/* Conditional volunteer role selector */}
                {formData.type === 'volunteer' && (
                  <div className="form-group animate-fade">
                    <label className="form-label" htmlFor="volunteerRole">Preferred Volunteering Department</label>
                    <select 
                      id="volunteerRole"
                      name="volunteerRole"
                      value={formData.volunteerRole}
                      onChange={handleChange}
                      className="form-input select-input"
                    >
                      <option value="Logistics & Venue Setup">Logistics & Venue Setup</option>
                      <option value="Food & Prasadam Service">Food & Prasadam Service</option>
                      <option value="Cultural Performance Coordination">Cultural Performance Coordination</option>
                      <option value="Digital Media & Photography">Digital Media & Photography</option>
                      <option value="Welcoming Desk & Guest Relations">Welcoming Desk & Guest Relations</option>
                    </select>
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label" htmlFor="message">Message</label>
                  <textarea 
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={
                      formData.type === 'volunteer' 
                      ? 'Tell us briefly about any past volunteering experience or why you would like to help!' 
                      : 'How can we help you? (e.g. sponsorship queries, festival questions, etc.)'
                    }
                    rows="4"
                    className="form-input textarea-input"
                    required
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary submit-btn" 
                  disabled={loading}
                >
                  {loading ? 'Sending...' : '📨 Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
