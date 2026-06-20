import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SwagatamBoard from './components/SwagatamBoard';
import About from './components/About';
import AnnouncementPopup from './components/AnnouncementPopup';
import EventCalendar from './components/EventCalendar';
import EventDetails from './components/EventDetails';
import MemoriesGallery from './components/MemoriesGallery';
import DonationSponsor from './components/DonationSponsor';
import FaqAccordion from './components/FaqAccordion';
import ContactForm from './components/ContactForm';
import AdminPanel from './components/AdminPanel';
import Footer from './components/Footer';
import { database } from './utils/mockDatabase';

export default function App() {
  const [view, setView] = useState('public'); // 'public' or 'admin'
  const [events, setEvents] = useState([]);
  const [popupSettings, setPopupSettings] = useState(null);
  const [stats, setStats] = useState({
    members: 450,
    eventsOrganized: 35,
    volunteers: 120,
    activeDonors: 82
  });
  
  const [faqs, setFaqs] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  // Initialize DB and fetch states on mount
  useEffect(() => {
    database.initialize();
    refreshAllData();
  }, []);

  const refreshAllData = () => {
    const evts = database.getEvents();
    const pop = database.getPopupSettings();
    const st = database.getStats();
    const fqs = database.getFaqs();
    
    // Sort events by date ascending
    const sortedEvents = [...evts].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    setEvents(sortedEvents);
    setPopupSettings(pop);
    setStats(st);
    setFaqs(fqs);
  };

  const handleDateClick = (dateStr) => {
    if (selectedDate === dateStr) {
      setSelectedDate(null);
    } else {
      setSelectedDate(dateStr);
      setTimeout(() => {
        const el = document.getElementById('events');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  };

  const handleClearDateFilter = () => {
    setSelectedDate(null);
  };

  const handleViewChange = (newView) => {
    setView(newView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-root">
      <Navbar currentView={view} onViewChange={handleViewChange} />
      
      {view === 'public' ? (
        <>
          {popupSettings && <AnnouncementPopup settings={popupSettings} />}
          <Hero stats={stats} />
          <SwagatamBoard />
          <About />
          <EventCalendar 
            events={events} 
            selectedDate={selectedDate} 
            onDateClick={handleDateClick} 
          />
          <EventDetails 
            events={events} 
            selectedDate={selectedDate} 
            onClearDateFilter={handleClearDateFilter} 
          />
          <MemoriesGallery />
          <DonationSponsor onDonationSuccess={refreshAllData} />
          <FaqAccordion faqs={faqs} />
          <ContactForm />
        </>
      ) : (
        <AdminPanel onDataChange={refreshAllData} />
      )}
      
      <Footer currentView={view} onViewChange={handleViewChange} />
    </div>
  );
}
