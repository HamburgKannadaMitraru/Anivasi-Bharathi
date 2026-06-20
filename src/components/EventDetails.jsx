import React, { useState, useMemo } from 'react';
import './EventDetails.css';
import { formatFriendlyDate, formatEventTime } from '../utils/calendarHelper';

export default function EventDetails({ events, selectedDate, onClearDateFilter }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' or 'past'
  const [copySuccess, setCopySuccess] = useState(null);

  const categories = ['All', 'Festival', 'Yoga', 'Sports', 'Spiritual', 'General'];

  // Current system date boundary (seed: 2026-06-20)
  const currentDateBoundary = '2026-06-20';

  // Filter events based on search, category, tab, and calendar selection
  const filteredEvents = useMemo(() => {
    return events.filter(evt => {
      // 1. Calendar selection
      if (selectedDate && evt.date !== selectedDate) {
        return false;
      }

      // 2. Search query
      if (searchTerm) {
        const query = searchTerm.toLowerCase();
        const matchesTitle = evt.title.toLowerCase().includes(query);
        const matchesLoc = evt.location.toLowerCase().includes(query);
        const matchesDesc = evt.description.toLowerCase().includes(query);
        if (!matchesTitle && !matchesLoc && !matchesDesc) return false;
      }

      // 3. Category Filter (only active if no specific calendar date clicked)
      if (!selectedDate && activeCategory !== 'All' && evt.category !== activeCategory) {
        return false;
      }

      // 4. Past vs Upcoming Tab (only active if no specific calendar date clicked)
      if (!selectedDate) {
        const isUpcoming = evt.date >= currentDateBoundary;
        if (activeTab === 'upcoming' && !isUpcoming) return false;
        if (activeTab === 'past' && isUpcoming) return false;
      }

      return true;
    });
  }, [events, selectedDate, searchTerm, activeCategory, activeTab]);

  const handleShare = (evtId) => {
    const url = `${window.location.origin}/#event-${evtId}`;
    navigator.clipboard.writeText(url)
      .then(() => {
        setCopySuccess(evtId);
        setTimeout(() => setCopySuccess(null), 2500);
      })
      .catch(err => console.error('Failed to copy link: ', err));
  };

  const getCategoryClass = (cat) => {
    switch (cat.toLowerCase()) {
      case 'festival': return 'badge-festival';
      case 'yoga': return 'badge-yoga';
      case 'sports': return 'badge-sports';
      case 'spiritual': return 'badge-spiritual';
      default: return 'badge-general';
    }
  };

  return (
    <section id="events" className="events-section section-padding">
      <div className="container">
        <div className="section-header">
          <h2>Events & Gatherings</h2>
          <p>Read full event details, timings, venues, and secure your registration passes.</p>
        </div>

        {/* Calendar Filter Alert */}
        {selectedDate && (
          <div className="filter-alert-banner glass-card animate-fade">
            <span>
              Showing events for <strong>{formatFriendlyDate(selectedDate)}</strong>
            </span>
            <button className="btn btn-sm btn-secondary" onClick={onClearDateFilter}>
              Show All Events &times;
            </button>
          </div>
        )}

        {/* Filter controls, hidden when calendar date filter is active */}
        {!selectedDate && (
          <div className="events-filter-bar glass-card">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input 
                type="text" 
                placeholder="Search events, locations..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              {searchTerm && (
                <button className="clear-search" onClick={() => setSearchTerm('')}>&times;</button>
              )}
            </div>

            <div className="category-scroll">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`category-tab-btn ${activeCategory === cat ? 'active-cat' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="tab-switcher">
              <button 
                className={`switch-btn ${activeTab === 'upcoming' ? 'active-switch' : ''}`}
                onClick={() => setActiveTab('upcoming')}
              >
                Upcoming
              </button>
              <button 
                className={`switch-btn ${activeTab === 'past' ? 'active-switch' : ''}`}
                onClick={() => setActiveTab('past')}
              >
                Past
              </button>
            </div>
          </div>
        )}

        {/* Events Grid / List */}
        {filteredEvents.length > 0 ? (
          <div className="events-list-grid">
            {filteredEvents.map(evt => (
              <div key={evt.id} id={`event-${evt.id}`} className="event-detail-card glass-card animate-fade">
                <div className="event-card-img-container">
                  <img src={evt.imageUrl || 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop'} alt={evt.title} className="event-card-image" />
                  <span className={`badge event-card-badge ${getCategoryClass(evt.category)}`}>
                    {evt.category}
                  </span>
                </div>

                <div className="event-card-body">
                  <div className="event-meta-info">
                    <span className="meta-item">
                      <span className="meta-icon">📅</span>
                      {formatFriendlyDate(evt.date)}
                    </span>
                    <span className="meta-item">
                      <span className="meta-icon">⏰</span>
                      {formatEventTime(evt.startTime, evt.endTime)}
                    </span>
                  </div>

                  <h3 className="event-card-title">{evt.title}</h3>
                  <p className="event-card-location">
                    <span className="meta-icon">📍</span> {evt.location}
                  </p>
                  
                  <p className="event-card-desc">{evt.description}</p>

                  <div className="event-card-actions">
                    {evt.registrationLink ? (
                      <a 
                        href={evt.registrationLink} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn btn-primary event-action-btn"
                      >
                        🎟️ Book / Register
                      </a>
                    ) : (
                      <span className="btn btn-secondary event-action-btn disabled-btn">
                        👐 Free Entry (Walk-in)
                      </span>
                    )}

                    <button 
                      className={`btn btn-secondary share-btn ${copySuccess === evt.id ? 'shared' : ''}`} 
                      onClick={() => handleShare(evt.id)}
                    >
                      {copySuccess === evt.id ? '✅ Link Copied!' : '🔗 Copy Share Link'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-events-container glass-card animate-fade">
            <span className="no-events-icon">📅</span>
            <h3>No Events Found</h3>
            <p>We couldn't find any events matching your current filters or selected date.</p>
            {(searchTerm || activeCategory !== 'All' || selectedDate) && (
              <button 
                className="btn btn-primary" 
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('All');
                  onClearDateFilter();
                }}
              >
                Reset Search Filters
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
