import React, { useState, useEffect, useRef } from 'react';
import './AnnouncementPopup.css';
import { formatDateString } from '../utils/calendarHelper';

export default function AnnouncementPopup({ settings }) {
  const [isOpen, setIsOpen] = useState(false);
  const [progress, setProgress] = useState(100);
  const timerRef = useRef(null);
  const progressIntervalRef = useRef(null);

  useEffect(() => {
    if (!settings || !settings.enabled) return;

    // Check dates
    const todayStr = formatDateString(new Date());
    const isWithinDateRange = todayStr >= settings.fromDate && todayStr <= settings.toDate;
    
    // Check if dismissed in this session
    const isDismissed = sessionStorage.getItem('ab_popup_dismissed') === 'true';

    if (isWithinDateRange && !isDismissed) {
      setIsOpen(true);
      
      const durationMs = (settings.duration || 8) * 1000;
      const intervalSpeed = 100; // update progress every 100ms
      const totalSteps = durationMs / intervalSpeed;
      let currentStep = 0;

      // Progress bar interval
      progressIntervalRef.current = setInterval(() => {
        currentStep++;
        const percentLeft = Math.max(0, 100 - (currentStep / totalSteps) * 100);
        setProgress(percentLeft);
        if (percentLeft <= 0) {
          clearInterval(progressIntervalRef.current);
        }
      }, intervalSpeed);

      // Auto dismiss timer
      timerRef.current = setTimeout(() => {
        handleClose();
      }, durationMs);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [settings]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('ab_popup_dismissed', 'true');
    if (timerRef.current) clearTimeout(timerRef.current);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay" onClick={handleClose}>
      <div className="popup-modal glass-card animate-scale" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close-btn" onClick={handleClose} aria-label="Close Announcement">
          &times;
        </button>
        
        <div className="popup-grid">
          {settings.imageUrl && (
            <div className="popup-image-container">
              <img src={settings.imageUrl} alt="Announcement" className="popup-image" />
            </div>
          )}
          
          <div className="popup-content">
            <span className="popup-badge">📢 Special Announcement</span>
            <h3 className="popup-title">{settings.title}</h3>
            <p className="popup-text">{settings.content}</p>
            
            {settings.actionLink && (
              <a 
                href={settings.actionLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-primary popup-action-btn"
                onClick={handleClose}
              >
                {settings.actionText || 'Learn More'} ↗
              </a>
            )}
          </div>
        </div>

        <div className="popup-progress-track">
          <div 
            className="popup-progress-bar" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
