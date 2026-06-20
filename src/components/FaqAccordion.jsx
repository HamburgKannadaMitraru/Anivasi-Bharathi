import React, { useState } from 'react';
import './FaqAccordion.css';

export default function FaqAccordion({ faqs }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="faqs-section section-padding">
      <div className="container">
        <div className="section-header">
          <h2>Frequently Asked Questions</h2>
          <p>Find quick answers to common queries about joining, volunteering, and sponsoring Anivasi Bharathi events.</p>
        </div>

        <div className="faqs-container">
          {faqs.length > 0 ? (
            faqs.map((faq, index) => {
              const isOpen = activeIndex === index;
              return (
                <div 
                  key={faq.id} 
                  className={`faq-item glass-card ${isOpen ? 'faq-item-open' : ''}`}
                >
                  <div 
                    className="faq-question-header" 
                    onClick={() => toggleAccordion(index)}
                  >
                    <h4>{faq.question}</h4>
                    <span className="faq-toggle-icon">
                      {isOpen ? '−' : '+'}
                    </span>
                  </div>
                  
                  <div className={`faq-answer-wrapper ${isOpen ? 'wrapper-open' : 'wrapper-closed'}`}>
                    <div className="faq-answer-content">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="empty-faqs-text">No FAQ entries available at the moment.</p>
          )}
        </div>
      </div>
    </section>
  );
}
