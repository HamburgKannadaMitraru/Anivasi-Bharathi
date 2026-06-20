import React, { useState } from 'react';
import './MemoriesGallery.css';

export default function MemoriesGallery() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null); // null if closed

  const galleryItems = [
    {
      id: 'img-1',
      category: 'Festival',
      title: 'Hamburg Ganesha Palaki Procession',
      caption: 'Celebrating Palaki Utsav with traditional Dhol Tasha drums on the streets of Wilhelmsburg.',
      url: 'https://images.unsplash.com/photo-1609137144813-74b88a8d116c?q=80&w=800&auto=format&fit=crop',
      date: 'September 2025'
    },
    {
      id: 'img-2',
      category: 'Yoga',
      title: 'Yoga Session at Alster Lake',
      caption: 'Group Sun Salutations on the banks of Alster river during International Day of Yoga.',
      url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop',
      date: 'June 2025'
    },
    {
      id: 'img-3',
      category: 'Festival',
      title: 'Diwali Diya Lighting Ceremony',
      caption: 'Community members lighting traditional oil lamps to celebrate the victory of light over darkness.',
      url: 'https://images.unsplash.com/photo-1605647540924-852290f6b0d5?q=80&w=800&auto=format&fit=crop',
      date: 'November 2025'
    },
    {
      id: 'img-4',
      category: 'Sports',
      title: 'Box Cricket League Championship',
      caption: 'Vibrant local cricket league held in sportplatz Eimsbüttel with over 12 community teams participating.',
      url: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=800&auto=format&fit=crop',
      date: 'July 2025'
    },
    {
      id: 'img-5',
      category: 'Spiritual',
      title: 'Satsang and Bhajan Sandhya',
      caption: 'Monthly spiritual gathering filled with devotional songs, bringing together families and seniors.',
      url: 'https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=800&auto=format&fit=crop',
      date: 'October 2025'
    },
    {
      id: 'img-6',
      category: 'Festival',
      title: 'Holi Colors Celebration',
      caption: 'Vibrant dry colors play with organic gulaal on a sunny spring afternoon at Stadtpark Hamburg.',
      url: 'https://images.unsplash.com/photo-1561494522-835c6020583b?q=80&w=800&auto=format&fit=crop',
      date: 'March 2025'
    }
  ];

  const categories = ['All', 'Festival', 'Yoga', 'Sports', 'Spiritual'];

  const filteredItems = activeFilter === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  const openLightbox = (index) => {
    // Find absolute index in the filtered array
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setLightboxIndex(prev => (prev === 0 ? filteredItems.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setLightboxIndex(prev => (prev === filteredItems.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="gallery" className="gallery-section section-padding">
      <div className="container">
        <div className="section-header">
          <h2>Memories & Highlights</h2>
          <p>Catch a glimpse of our past events, colorful celebrations, and community bonding in Hamburg.</p>
        </div>

        {/* Filters */}
        <div className="gallery-filter-bar">
          {categories.map(cat => (
            <button
              key={cat}
              className={`gallery-filter-btn ${activeFilter === cat ? 'active-filter' : ''}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Photo Grid */}
        <div className="gallery-grid">
          {filteredItems.map((item, idx) => (
            <div 
              key={item.id} 
              className="gallery-card-item glass-card"
              onClick={() => openLightbox(idx)}
            >
              <div className="gallery-img-wrapper">
                <img src={item.url} alt={item.title} className="gallery-img" />
                <div className="gallery-img-overlay">
                  <span className="zoom-icon">🔍 View Fullscreen</span>
                </div>
              </div>
              <div className="gallery-card-body">
                <span className="gallery-card-date">{item.date}</span>
                <h4>{item.title}</h4>
                <p>{item.caption.substring(0, 75)}...</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      {lightboxIndex !== null && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}>&times;</button>
          
          <button className="lightbox-nav-btn prev-btn" onClick={handlePrev}>&larr;</button>
          
          <div className="lightbox-content glass-card" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox-img-container">
              <img 
                src={filteredItems[lightboxIndex].url} 
                alt={filteredItems[lightboxIndex].title} 
                className="lightbox-image animate-scale" 
              />
            </div>
            <div className="lightbox-details">
              <div className="lightbox-details-header">
                <span className="badge badge-festival">{filteredItems[lightboxIndex].category}</span>
                <span className="lightbox-date">{filteredItems[lightboxIndex].date}</span>
              </div>
              <h3>{filteredItems[lightboxIndex].title}</h3>
              <p>{filteredItems[lightboxIndex].caption}</p>
            </div>
          </div>
          
          <button className="lightbox-nav-btn next-btn" onClick={handleNext}>&rarr;</button>
        </div>
      )}
    </section>
  );
}
