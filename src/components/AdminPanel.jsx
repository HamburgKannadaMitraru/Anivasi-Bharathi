import React, { useState, useEffect } from 'react';
import './AdminPanel.css';
import { database } from '../utils/mockDatabase';

export default function AdminPanel({ onDataChange }) {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');

  const [activeTab, setActiveTab] = useState('events'); // 'events', 'popup', 'donations', 'messages', 'faqs', 'settings'

  // Mock Database State
  const [events, setEvents] = useState([]);
  const [popupSettings, setPopupSettings] = useState({});
  const [contacts, setContacts] = useState([]);
  const [stats, setStats] = useState({});
  const [donations, setDonations] = useState([]);
  const [faqs, setFaqs] = useState([]);

  // Event Form State
  const [editingEvent, setEditingEvent] = useState(null); // null if adding
  const [eventForm, setEventForm] = useState({
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    category: 'Festival',
    description: '',
    imageUrl: '',
    registrationLink: ''
  });

  // Popup Form State
  const [popupForm, setPopupForm] = useState({
    enabled: true,
    title: '',
    content: '',
    imageUrl: '',
    actionText: '',
    actionLink: '',
    fromDate: '',
    toDate: '',
    duration: 8
  });

  // FAQ Form State
  const [editingFaq, setEditingFaq] = useState(null); // null if adding
  const [faqForm, setFaqForm] = useState({
    question: '',
    answer: ''
  });

  // Load data upon mounting
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = () => {
    database.initialize();
    const evts = database.getEvents();
    const pop = database.getPopupSettings();
    const msg = database.getContactSubmissions();
    const st = database.getStats();
    const dons = database.getDonations();
    const fqs = database.getFaqs();

    setEvents(evts);
    setPopupSettings(pop);
    setContacts(msg);
    setStats(st);
    setDonations(dons);
    setFaqs(fqs);

    // Sync forms
    setPopupForm(pop);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode === 'admin123') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid passcode. Hint: Use admin123');
    }
  };

  // Event form changes
  const handleEventFormChange = (e) => {
    const { name, value } = e.target;
    setEventForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveEvent = (e) => {
    e.preventDefault();
    if (!eventForm.title || !eventForm.date || !eventForm.location || !eventForm.description) {
      alert('Please fill out all required fields.');
      return;
    }

    const payload = editingEvent ? { ...eventForm, id: editingEvent } : eventForm;
    const updatedEvents = database.saveEvent(payload);
    setEvents(updatedEvents);
    
    // Reset form
    setEventForm({
      title: '',
      date: '',
      startTime: '',
      endTime: '',
      location: '',
      category: 'Festival',
      description: '',
      imageUrl: '',
      registrationLink: ''
    });
    setEditingEvent(null);
    onDataChange();
    alert('Event saved successfully!');
  };

  const handleEditEventClick = (evt) => {
    setEditingEvent(evt.id);
    setEventForm({
      title: evt.title,
      date: evt.date,
      startTime: evt.startTime || '',
      endTime: evt.endTime || '',
      location: evt.location,
      category: evt.category,
      description: evt.description,
      imageUrl: evt.imageUrl || '',
      registrationLink: evt.registrationLink || ''
    });
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleDeleteEventClick = (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      const updated = database.deleteEvent(id);
      setEvents(updated);
      onDataChange();
    }
  };

  const handleCancelEdit = () => {
    setEditingEvent(null);
    setEventForm({
      title: '',
      date: '',
      startTime: '',
      endTime: '',
      location: '',
      category: 'Festival',
      description: '',
      imageUrl: '',
      registrationLink: ''
    });
  };

  // Popup form changes
  const handlePopupFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPopupForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSavePopupSettings = (e) => {
    e.preventDefault();
    const updated = database.savePopupSettings(popupForm);
    setPopupSettings(updated);
    onDataChange();
    alert('Popup settings updated successfully!');
  };

  // Message functions
  const handleMarkAsRead = (id) => {
    const updated = database.markMessageAsRead(id);
    setContacts(updated);
  };

  const handleDeleteMessage = (id) => {
    if (window.confirm('Delete this message submission?')) {
      const updated = database.deleteMessage(id);
      setContacts(updated);
    }
  };

  // FAQ Form handlers
  const handleFaqFormChange = (e) => {
    const { name, value } = e.target;
    setFaqForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveFaq = (e) => {
    e.preventDefault();
    if (!faqForm.question || !faqForm.answer) return;

    const payload = editingFaq ? { ...faqForm, id: editingFaq } : faqForm;
    const updatedFaqs = database.saveFaq(payload);
    setFaqs(updatedFaqs);

    setFaqForm({ question: '', answer: '' });
    setEditingFaq(null);
    onDataChange();
    alert('FAQ entry saved successfully!');
  };

  const handleEditFaqClick = (faq) => {
    setEditingFaq(faq.id);
    setFaqForm({
      question: faq.question,
      answer: faq.answer
    });
  };

  const handleDeleteFaqClick = (id) => {
    if (window.confirm('Are you sure you want to delete this FAQ entry?')) {
      const updated = database.deleteFaq(id);
      setFaqs(updated);
      onDataChange();
    }
  };

  // Stats / Settings
  const handleSaveStats = (e) => {
    e.preventDefault();
    const updated = database.saveStats(stats);
    setStats(updated);
    onDataChange();
    alert('Live counter statistics updated!');
  };

  const handleResetData = () => {
    if (window.confirm('WARNING: This will reset the database back to default seeds. All added events, messages, and donations will be lost.')) {
      database.resetToDefaults();
    }
  };

  // Calculations
  const unreadCount = contacts.filter(c => !c.read).length;
  const totalDonationsAmount = donations.reduce((sum, d) => sum + (parseFloat(d.amount) || 0), 0);

  // Authentication Gateway View (Bright & Vibrant Redesign)
  if (!isAuthenticated) {
    return (
      <section className="admin-login-section section-padding">
        <div className="container login-container">
          <div className="login-card glass-card animate-fade">
            <span className="login-icon">🔒</span>
            <h2>Admin Control Panel</h2>
            <p>Access is restricted to Hamburg Anivasi Bharathi e.V. administrators. Enter the access passcode to proceed.</p>
            
            <form onSubmit={handleLogin} className="login-form">
              <div className="form-group">
                <label className="form-label" htmlFor="passcode">Admin Passcode</label>
                <input 
                  type="password" 
                  id="passcode"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter passcode (e.g. admin123)"
                  className="form-input"
                  required
                  autoFocus
                />
              </div>
              
              {authError && <p className="auth-error-msg">{authError}</p>}
              
              <button type="submit" className="btn btn-primary login-btn">
                Unlock Dashboard
              </button>
            </form>
            <div className="demo-hint">
              <p>💡 **Demo Notice:** Use the code <code>admin123</code> to test the administrator flow.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="admin-dashboard-section section-padding">
      <div className="container">
        
        {/* Header Widget */}
        <div className="admin-header glass-card">
          <div>
            <h1>Admin Control Panel</h1>
            <p>Configure dynamic content, schedules, announcements, and track community interactions.</p>
          </div>
          <button className="btn btn-secondary" onClick={() => setIsAuthenticated(false)}>
            🔒 Lock Console
          </button>
        </div>

        {/* Quick Stats Widget Panel */}
        <div className="admin-stats-grid">
          <div className="admin-stat-widget glass-card">
            <h4>{events.length}</h4>
            <p>Scheduled Events</p>
          </div>
          <div className="admin-stat-widget glass-card">
            <h4>€{totalDonationsAmount}</h4>
            <p>Sewa Donations Raised</p>
          </div>
          <div className="admin-stat-widget glass-card">
            <h4>{unreadCount}</h4>
            <p>Unread Messages</p>
          </div>
        </div>

        {/* Console layout grid */}
        <div className="admin-layout">
          {/* Navigation Sidebar */}
          <aside className="admin-sidebar glass-card">
            <button 
              className={`sidebar-link ${activeTab === 'events' ? 'active-tab' : ''}`}
              onClick={() => { setActiveTab('events'); loadAllData(); }}
            >
              📅 Schedule Events
            </button>
            <button 
              className={`sidebar-link ${activeTab === 'popup' ? 'active-tab' : ''}`}
              onClick={() => { setActiveTab('popup'); loadAllData(); }}
            >
              📢 Alert Announcement
            </button>
            <button 
              className={`sidebar-link ${activeTab === 'donations' ? 'active-tab' : ''}`}
              onClick={() => { setActiveTab('donations'); loadAllData(); }}
            >
              💎 Sewa Donations {donations.length > 0 && <span className="stat-pill-badge">{donations.length}</span>}
            </button>
            <button 
              className={`sidebar-link ${activeTab === 'messages' ? 'active-tab' : ''}`}
              onClick={() => { setActiveTab('messages'); loadAllData(); }}
            >
              📨 User Submissions {unreadCount > 0 && <span className="msg-badge">{unreadCount}</span>}
            </button>
            <button 
              className={`sidebar-link ${activeTab === 'faqs' ? 'active-tab' : ''}`}
              onClick={() => { setActiveTab('faqs'); loadAllData(); }}
            >
              ❓ Manage FAQs
            </button>
            <button 
              className={`sidebar-link ${activeTab === 'settings' ? 'active-tab' : ''}`}
              onClick={() => { setActiveTab('settings'); loadAllData(); }}
            >
              ⚙️ Stats & Reset
            </button>
          </aside>

          {/* Main Console Content */}
          <main className="admin-main-content">
            
            {/* 1. EVENTS TAB */}
            {activeTab === 'events' && (
              <div className="console-panel animate-fade">
                <div className="glass-card panel-card">
                  <h3>{editingEvent ? '📝 Edit Scheduled Event' : '📅 Schedule New Event'}</h3>
                  
                  <form onSubmit={handleSaveEvent} className="admin-form">
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Event Title *</label>
                        <input 
                          type="text" 
                          name="title" 
                          value={eventForm.title} 
                          onChange={handleEventFormChange} 
                          placeholder="e.g. Navaratri Garba Night"
                          className="form-input" 
                          required 
                        />
                      </div>
                      
                      <div className="form-group">
                        <label className="form-label">Category *</label>
                        <select 
                          name="category" 
                          value={eventForm.category} 
                          onChange={handleEventFormChange} 
                          className="form-input"
                        >
                          <option value="Festival">Festival</option>
                          <option value="Yoga">Yoga & Wellness</option>
                          <option value="Sports">Sports</option>
                          <option value="Spiritual">Spiritual / Satsang</option>
                          <option value="General">General / Others</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-row-triple">
                      <div className="form-group">
                        <label className="form-label">Date *</label>
                        <input 
                          type="date" 
                          name="date" 
                          value={eventForm.date} 
                          onChange={handleEventFormChange} 
                          className="form-input" 
                          required 
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Start Time</label>
                        <input 
                          type="time" 
                          name="startTime" 
                          value={eventForm.startTime} 
                          onChange={handleEventFormChange} 
                          className="form-input" 
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">End Time</label>
                        <input 
                          type="time" 
                          name="endTime" 
                          value={eventForm.endTime} 
                          onChange={handleEventFormChange} 
                          className="form-input" 
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Venue / Location *</label>
                        <input 
                          type="text" 
                          name="location" 
                          value={eventForm.location} 
                          onChange={handleEventFormChange} 
                          placeholder="Full address or landmark"
                          className="form-input" 
                          required 
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Registration Ticket URL</label>
                        <input 
                          type="url" 
                          name="registrationLink" 
                          value={eventForm.registrationLink} 
                          onChange={handleEventFormChange} 
                          placeholder="e.g. Ticket Tailor link"
                          className="form-input" 
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Event Poster Image URL</label>
                      <input 
                        type="url" 
                        name="imageUrl" 
                        value={eventForm.imageUrl} 
                        onChange={handleEventFormChange} 
                        placeholder="https://images.unsplash.com/... (or blank for default)"
                        className="form-input" 
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Description *</label>
                      <textarea 
                        name="description" 
                        value={eventForm.description} 
                        onChange={handleEventFormChange} 
                        placeholder="Explain schedules, activities, entry rules..." 
                        rows="4" 
                        className="form-input" 
                        required
                      ></textarea>
                    </div>

                    <div className="form-actions">
                      <button type="submit" className="btn btn-primary">
                        {editingEvent ? '💾 Save Changes' : '➕ Schedule Event'}
                      </button>
                      {editingEvent && (
                        <button type="button" className="btn btn-secondary" onClick={handleCancelEdit}>
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                </div>

                <div className="glass-card panel-card list-panel">
                  <h3>Scheduled Events List</h3>
                  <div className="admin-list-container">
                    {events.length > 0 ? (
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {events.map(evt => (
                            <tr key={evt.id}>
                              <td className="table-date">{evt.date}</td>
                              <td><strong>{evt.title}</strong></td>
                              <td>
                                <span className={`badge badge-table-${evt.category.toLowerCase()}`}>
                                  {evt.category}
                                </span>
                              </td>
                              <td className="table-actions">
                                <button className="btn btn-secondary btn-table-action" onClick={() => handleEditEventClick(evt)}>✏️</button>
                                <button className="btn btn-danger btn-table-action" onClick={() => handleDeleteEventClick(evt.id)}>🗑️</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <p className="empty-table-text">No events scheduled. Use the form above to add one.</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* 2. ANNOUNCEMENT POPUP TAB */}
            {activeTab === 'popup' && (
              <div className="console-panel animate-fade">
                <div className="glass-card panel-card">
                  <h3>📢 Announcement Alert Settings</h3>
                  <p className="panel-hint">Configure a temporary announcement popup modal that renders instantly on the home page loading sequence.</p>

                  <form onSubmit={handleSavePopupSettings} className="admin-form">
                    <div className="form-group checkbox-group">
                      <input 
                        type="checkbox" 
                        id="enabled"
                        name="enabled" 
                        checked={popupForm.enabled} 
                        onChange={handlePopupFormChange} 
                        className="form-checkbox"
                      />
                      <label htmlFor="enabled" className="form-label-inline">Enable announcement popup modal</label>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Alert Header Title *</label>
                      <input 
                        type="text" 
                        name="title" 
                        value={popupForm.title} 
                        onChange={handlePopupFormChange} 
                        placeholder="e.g. Registrations Open for Ganesha Festival!"
                        className="form-input" 
                        required 
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Alert Message Description *</label>
                      <textarea 
                        name="content" 
                        value={popupForm.content} 
                        onChange={handlePopupFormChange} 
                        placeholder="Brief summary of the announcement..." 
                        rows="3" 
                        className="form-input" 
                        required
                      ></textarea>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Action Button Text</label>
                        <input 
                          type="text" 
                          name="actionText" 
                          value={popupForm.actionText} 
                          onChange={handlePopupFormChange} 
                          placeholder="e.g. Register / Learn More"
                          className="form-input" 
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Action Button Redirect URL</label>
                        <input 
                          type="url" 
                          name="actionLink" 
                          value={popupForm.actionLink} 
                          onChange={handlePopupFormChange} 
                          placeholder="e.g. https://ticket-tailor.com/..."
                          className="form-input" 
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Alert Graphic Image URL</label>
                      <input 
                        type="url" 
                        name="imageUrl" 
                        value={popupForm.imageUrl} 
                        onChange={handlePopupFormChange} 
                        placeholder="e.g. https://unsplash.com/..."
                        className="form-input" 
                      />
                    </div>

                    <div className="form-row-triple">
                      <div className="form-group">
                        <label className="form-label">Display From Date *</label>
                        <input 
                          type="date" 
                          name="fromDate" 
                          value={popupForm.fromDate} 
                          onChange={handlePopupFormChange} 
                          className="form-input" 
                          required 
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Display End Date *</label>
                        <input 
                          type="date" 
                          name="toDate" 
                          value={popupForm.toDate} 
                          onChange={handlePopupFormChange} 
                          className="form-input" 
                          required 
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Display Timer Duration: {popupForm.duration}s</label>
                        <input 
                          type="range" 
                          name="duration" 
                          min="5" 
                          max="15" 
                          value={popupForm.duration} 
                          onChange={handlePopupFormChange} 
                          className="form-slider" 
                        />
                        <span className="slider-limits">5s - 15s</span>
                      </div>
                    </div>

                    <button type="submit" className="btn btn-primary">
                      💾 Update Popup Configuration
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* 3. DONATIONS TAB */}
            {activeTab === 'donations' && (
              <div className="console-panel animate-fade">
                <div className="glass-card panel-card">
                  <h3>💎 Sponsorship & Sewa Logbook</h3>
                  <p className="panel-hint">Track voluntary payments and sponsorships processed on the public frontend donation portal.</p>
                  
                  <div className="admin-list-container">
                    {donations.length > 0 ? (
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Donor Name</th>
                            <th>Email</th>
                            <th>Sponsorship Cause</th>
                            <th>Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {donations.map(don => (
                            <tr key={don.id}>
                              <td className="table-date">{new Date(don.timestamp).toLocaleDateString()}</td>
                              <td><strong>{don.name}</strong></td>
                              <td>{don.email}</td>
                              <td><span className="cause-table-badge">{don.cause}</span></td>
                              <td className="table-amount">€{don.amount}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <p className="empty-table-text">No sponsorship contributions recorded yet.</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* 4. MESSAGES SUBMISSIONS TAB */}
            {activeTab === 'messages' && (
              <div className="console-panel animate-fade">
                <div className="glass-card panel-card">
                  <h3>📨 Form Submissions & Registrations</h3>
                  <p className="panel-hint">Review volunteer requests, sponsorships, and general queries submitted by users.</p>

                  <div className="messages-list-container">
                    {contacts.length > 0 ? (
                      contacts.map(msg => (
                        <div key={msg.id} className={`message-item-card glass-card ${msg.read ? 'read-msg' : 'unread-msg'}`}>
                          <div className="msg-header">
                            <div>
                              <h4>{msg.name}</h4>
                              <span className="msg-email">{msg.email}</span>
                            </div>
                            <div className="msg-meta">
                              <span className={`badge badge-msg-${msg.type}`}>
                                {msg.type === 'volunteer' ? '🤝 Volunteer' : msg.type === 'sponsor' ? '💎 Sponsor' : '📧 General'}
                              </span>
                              <span className="msg-time">{new Date(msg.timestamp).toLocaleString()}</span>
                            </div>
                          </div>

                          {msg.volunteerRole && (
                            <div className="msg-role-tag">
                              💼 Preferred Role: <strong>{msg.volunteerRole}</strong>
                            </div>
                          )}

                          <div className="msg-body">
                            <p>"{msg.message}"</p>
                          </div>

                          <div className="msg-actions">
                            {!msg.read && (
                              <button className="btn btn-secondary btn-sm" onClick={() => handleMarkAsRead(msg.id)}>
                                Mark as Read
                              </button>
                            )}
                            <button className="btn btn-danger btn-sm" onClick={() => handleDeleteMessage(msg.id)}>
                              Delete Message
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="empty-messages-state">
                        <p>No messages received yet.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* 5. FAQs TAB */}
            {activeTab === 'faqs' && (
              <div className="console-panel animate-fade">
                <div className="glass-card panel-card">
                  <h3>❓ Manage FAQs</h3>
                  <p className="panel-hint">Add or edit questions and answers visible in the public Frequently Asked Questions section.</p>
                  
                  <form onSubmit={handleSaveFaq} className="admin-form">
                    <div className="form-group">
                      <label className="form-label">Question Text *</label>
                      <input 
                        type="text" 
                        name="question"
                        value={faqForm.question}
                        onChange={handleFaqFormChange}
                        placeholder="e.g. Is food provided at the festival?" 
                        className="form-input" 
                        required 
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Answer Text *</label>
                      <textarea 
                        name="answer"
                        value={faqForm.answer}
                        onChange={handleFaqFormChange}
                        placeholder="Detailed answer text..." 
                        rows="4" 
                        className="form-input" 
                        required
                      ></textarea>
                    </div>

                    <div className="form-actions">
                      <button type="submit" className="btn btn-primary">
                        {editingFaq ? '💾 Save FAQ Entry' : '➕ Add FAQ Entry'}
                      </button>
                      {editingFaq && (
                        <button 
                          type="button" 
                          className="btn btn-secondary" 
                          onClick={() => { setEditingFaq(null); setFaqForm({ question: '', answer: '' }); }}
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                </div>

                <div className="glass-card panel-card list-panel">
                  <h3>Current FAQ List</h3>
                  <div className="admin-list-container">
                    {faqs.length > 0 ? (
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th>Question</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {faqs.map(faq => (
                            <tr key={faq.id}>
                              <td><strong>{faq.question}</strong></td>
                              <td className="table-actions">
                                <button className="btn btn-secondary btn-table-action" onClick={() => handleEditFaqClick(faq)}>✏️</button>
                                <button className="btn btn-danger btn-table-action" onClick={() => handleDeleteFaqClick(faq.id)}>🗑️</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <p className="empty-table-text">No FAQs found. Use the form above to add one.</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* 6. SETTINGS TAB */}
            {activeTab === 'settings' && (
              <div className="console-panel animate-fade">
                <div className="glass-card panel-card">
                  <h3>📊 Adjust Community Counter Statistics</h3>
                  <p className="panel-hint">Modify the live figures rendered in the homepage statistics panel.</p>

                  <form onSubmit={handleSaveStats} className="admin-form">
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Active Members Count</label>
                        <input 
                          type="number" 
                          value={stats.members || 0} 
                          onChange={(e) => setStats(prev => ({ ...prev, members: parseInt(e.target.value) || 0 }))} 
                          className="form-input" 
                          required 
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Events Organised Count</label>
                        <input 
                          type="number" 
                          value={stats.eventsOrganized || 0} 
                          onChange={(e) => setStats(prev => ({ ...prev, eventsOrganized: parseInt(e.target.value) || 0 }))} 
                          className="form-input" 
                          required 
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Volunteers Count</label>
                        <input 
                          type="number" 
                          value={stats.volunteers || 0} 
                          onChange={(e) => setStats(prev => ({ ...prev, volunteers: parseInt(e.target.value) || 0 }))} 
                          className="form-input" 
                          required 
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Active Donors Count</label>
                        <input 
                          type="number" 
                          value={stats.activeDonors || 0} 
                          onChange={(e) => setStats(prev => ({ ...prev, activeDonors: parseInt(e.target.value) || 0 }))} 
                          className="form-input" 
                          required 
                        />
                      </div>
                    </div>

                    <button type="submit" className="btn btn-primary">
                      💾 Update Counter Statistics
                    </button>
                  </form>
                </div>

                <div className="glass-card panel-card reset-panel">
                  <h3>⚙️ Danger Zone / System Tools</h3>
                  <p className="panel-hint">Perform system-wide commands on mock database instances.</p>
                  
                  <div className="reset-action-block">
                    <div>
                      <h4>Restore Seed Database</h4>
                      <p>Wipes all browser changes to events, popup parameters, messages, and resets back to high-fidelity seed configurations.</p>
                    </div>
                    <button className="btn btn-danger" onClick={handleResetData}>
                      ⚠️ Reset Database
                    </button>
                  </div>
                </div>
              </div>
            )}

          </main>
        </div>
      </div>
    </section>
  );
}
