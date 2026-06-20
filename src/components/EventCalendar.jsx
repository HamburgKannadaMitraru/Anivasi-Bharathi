import React, { useState } from 'react';
import './EventCalendar.css';
import { getMonthGrid, MONTH_NAMES, WEEKDAYS, formatDateString } from '../utils/calendarHelper';

export default function EventCalendar({ events, onDateClick, selectedDate }) {
  const today = new Date();
  // Initialize to June 2026 to align with metadata date
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(5); // 5 is June (0-indexed)

  const grid = getMonthGrid(currentYear, currentMonth);

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Get events on a specific date string (YYYY-MM-DD)
  const getEventsForDate = (dateStr) => {
    return events.filter(e => e.date === dateStr);
  };

  const getCategoryClass = (category) => {
    switch (category.toLowerCase()) {
      case 'festival': return 'dot-festival';
      case 'yoga': return 'dot-yoga';
      case 'sports': return 'dot-sports';
      case 'spiritual': return 'dot-spiritual';
      default: return 'dot-general';
    }
  };

  return (
    <section id="calendar" className="calendar-section section-padding">
      <div className="container">
        <div className="section-header">
          <h2>Community Calendar</h2>
          <p>Explore upcoming activities and festivals. Click on any date highlighted with event dots to view specific details below.</p>
        </div>

        <div className="calendar-container glass-card">
          <div className="calendar-header">
            <button className="calendar-nav-btn" onClick={prevMonth}>&larr;</button>
            <h3 className="calendar-month-title">
              {MONTH_NAMES[currentMonth]} {currentYear}
            </h3>
            <button className="calendar-nav-btn" onClick={nextMonth}>&rarr;</button>
          </div>

          <div className="calendar-weekdays">
            {WEEKDAYS.map(day => (
              <div key={day} className="weekday-label">{day}</div>
            ))}
          </div>

          <div className="calendar-days-grid">
            {grid.map((cell, index) => {
              const dayEvents = getEventsForDate(cell.dateString);
              const hasEvents = dayEvents.length > 0;
              const isToday = cell.dateString === formatDateString(today);
              const isSelected = cell.dateString === selectedDate;

              return (
                <div 
                  key={index} 
                  className={`calendar-cell 
                    ${cell.isCurrentMonth ? 'current-month' : 'other-month'} 
                    ${isToday ? 'cell-today' : ''} 
                    ${isSelected ? 'cell-selected' : ''} 
                    ${hasEvents ? 'cell-has-events' : ''}
                  `}
                  onClick={() => onDateClick(cell.dateString)}
                >
                  <span className="day-number">{cell.date.getDate()}</span>
                  
                  {hasEvents && (
                    <div className="event-dots-container">
                      {dayEvents.map(evt => (
                        <span 
                          key={evt.id} 
                          className={`event-dot ${getCategoryClass(evt.category)}`}
                          title={`${evt.title} (${evt.category})`}
                        ></span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="calendar-legend">
            <div className="legend-item"><span className="legend-dot dot-festival"></span> Festival</div>
            <div className="legend-item"><span className="legend-dot dot-yoga"></span> Yoga & Wellness</div>
            <div className="legend-item"><span className="legend-dot dot-sports"></span> Sports</div>
            <div className="legend-item"><span className="legend-dot dot-spiritual"></span> Spiritual / Satsang</div>
            <div className="legend-item"><span className="legend-dot dot-general"></span> General / Others</div>
          </div>
        </div>
      </div>
    </section>
  );
}
