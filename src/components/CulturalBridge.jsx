import React from 'react';
import './CulturalBridge.css';

export default function CulturalBridge() {
  const connectionCards = [
    {
      id: 'bridge-1',
      title: 'Maritime Gateways',
      hamburgTitle: 'Port of Hamburg',
      hamburgDesc: 'Germany\'s gateway to the world. A massive harbor connecting international trade and shipping lanes.',
      indiaTitle: 'Gateway of India',
      indiaDesc: 'Mumbai\'s historic monumental archway welcoming travelers entering India by sea since 1924.',
      svgIcon: (
        <svg viewBox="0 0 200 100" className="bridge-svg">
          {/* Hamburg Crane representation */}
          <path d="M20 90 L40 50 L60 90 M40 50 L80 40 L60 90" stroke="#0D5C75" strokeWidth="2.5" fill="none" />
          <line x1="80" y1="40" x2="80" y2="55" stroke="#FF6B00" strokeWidth="1.5" />
          <rect x="75" y="55" width="10" height="8" fill="#FF6B00" />
          {/* Mumbai Gateway Arches */}
          <rect x="130" y="40" width="50" height="50" rx="3" stroke="#E11D48" strokeWidth="2.5" fill="none" />
          <path d="M140 90 L140 60 A10 10 0 0 1 160 60 L160 90" stroke="#E11D48" strokeWidth="2" fill="none" />
          <path d="M165 90 L165 70 A5 5 0 0 1 175 70 L175 90" stroke="#E11D48" strokeWidth="1.5" fill="none" />
          <path d="M135 90 L135 70 A5 5 0 0 1 145 70 L145 90" stroke="#E11D48" strokeWidth="1.5" fill="none" />
          {/* Connection line */}
          <path d="M85 80 Q110 50 125 80" stroke="#FBBF24" strokeWidth="2" strokeDasharray="3,3" fill="none" />
        </svg>
      )
    },
    {
      id: 'bridge-2',
      title: 'Waterfront Lungs',
      hamburgTitle: 'Alster Lake & Parks',
      hamburgDesc: 'Hamburg\'s quiet sanctuary. Citizens gather for sailing, jogging, and summer picnics.',
      indiaTitle: 'River Ghats & Gathering Steps',
      indiaDesc: 'Devotional waterfront terraces (Ghats) where communities gather for pooja, yoga, and classical arts.',
      svgIcon: (
        <svg viewBox="0 0 200 100" className="bridge-svg">
          {/* Waves for both */}
          <path d="M10 80 Q30 75 50 80 T90 80" stroke="#0D5C75" strokeWidth="2" fill="none" />
          <path d="M110 80 Q130 85 150 80 T190 80" stroke="#E11D48" strokeWidth="2" fill="none" />
          {/* Hamburg Sailboat */}
          <path d="M30 65 L45 35 L40 65" fill="#0D5C75" />
          <path d="M25 67 L50 67 L45 73 Z" fill="#0D5C75" />
          {/* Indian Lotus flower */}
          <path d="M140 75 Q150 60 160 75 Q170 60 180 75 Q170 85 160 85 Q150 85 140 75 Z" fill="#E11D48" opacity="0.8" />
          <circle cx="160" cy="74" r="3" fill="#FBBF24" />
          {/* Bridge connection */}
          <path d="M70 60 C85 45 115 45 130 60" stroke="#FBBF24" strokeWidth="2" strokeDasharray="3,3" fill="none" />
        </svg>
      )
    },
    {
      id: 'bridge-3',
      title: 'Landmark Masterpieces',
      hamburgTitle: 'Elbphilharmonie',
      hamburgDesc: 'A wave-shaped glass concert hall resting on a brick warehouse, representing modern acoustics.',
      indiaTitle: 'The Taj Mahal & Arch Domes',
      indiaDesc: 'Mughal symmetrical white marble masterpiece with arches and domes representing timeless elegance.',
      svgIcon: (
        <svg viewBox="0 0 200 100" className="bridge-svg">
          {/* Elbphilharmonie wave curve roof */}
          <path d="M15 75 L15 50 Q30 40 45 55 T75 45 L75 75 Z" fill="none" stroke="#0D5C75" strokeWidth="2.5" />
          <line x1="15" y1="75" x2="75" y2="75" stroke="#0D5C75" strokeWidth="2" />
          {/* Taj Mahal dome */}
          <path d="M130 75 L130 65 Q130 60 140 60 L140 50 Q150 35 155 45 Q160 35 170 50 L170 60 Q180 60 180 65 L180 75 Z" fill="none" stroke="#E11D48" strokeWidth="2.5" />
          <line x1="125" y1="75" x2="185" y2="75" stroke="#E11D48" strokeWidth="2" />
          {/* Connection */}
          <path d="M80 60 Q100 45 120 60" stroke="#FBBF24" strokeWidth="2" strokeDasharray="3,3" fill="none" />
        </svg>
      )
    },
    {
      id: 'bridge-4',
      title: 'Culinary Comforts',
      hamburgTitle: 'Franzbrötchen',
      hamburgDesc: 'A local Hamburg sweet pastry loaded with cinnamon, sugar, and butter layered dough.',
      indiaTitle: 'Masala Chai & Samosa',
      indiaDesc: 'The ultimate comforting Indian snack. Spiced milk tea paired with deep-fried savory potato triangles.',
      svgIcon: (
        <svg viewBox="0 0 200 100" className="bridge-svg">
          {/* Franzbrötchen swirl shape */}
          <path d="M20 70 C20 40 40 40 40 60 C40 40 60 40 60 70 Z" fill="none" stroke="#0D5C75" strokeWidth="2.5" />
          <path d="M30 70 Q40 55 50 70" fill="none" stroke="#0D5C75" strokeWidth="2" />
          {/* Samosa triangle + Cup */}
          <path d="M150 70 L170 40 L190 70 Z" fill="none" stroke="#E11D48" strokeWidth="2.5" />
          <path d="M120 70 L140 70 L140 50 L120 50 Z" fill="none" stroke="#E11D48" strokeWidth="2" />
          <path d="M140 55 C145 55 145 65 140 65" fill="none" stroke="#E11D48" strokeWidth="2" />
          <path d="M125 45 Q130 40 135 45" stroke="#FBBF24" strokeWidth="1.5" fill="none" />
          {/* Connection */}
          <path d="M70 65 Q95 50 115 65" stroke="#FBBF24" strokeWidth="2" strokeDasharray="3,3" fill="none" />
        </svg>
      )
    }
  ];

  return (
    <section className="cultural-bridge-section">
      <div className="container">
        <div className="section-header">
          <h2>Hamburg-India Cultural Synthesis</h2>
          <p>We believe integration is not about losing one\'s roots, but discovering how they intertwine. Here is how our two homes mirror each other.</p>
        </div>

        <div className="bridge-grid">
          {connectionCards.map(card => (
            <div key={card.id} className="bridge-card glass-card animate-fade">
              <div className="bridge-card-header">
                <h3>{card.title}</h3>
              </div>
              
              <div className="bridge-visual-box">
                {card.svgIcon}
              </div>

              <div className="bridge-compare-details">
                <div className="compare-column col-hamburg">
                  <h5>🏰 Hamburg</h5>
                  <h4>{card.hamburgTitle}</h4>
                  <p>{card.hamburgDesc}</p>
                </div>
                
                <div className="compare-divider"></div>

                <div className="compare-column col-india">
                  <h5>🕌 India</h5>
                  <h4>{card.indiaTitle}</h4>
                  <p>{card.indiaDesc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
