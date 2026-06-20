const STORAGE_KEYS = {
  EVENTS: 'ab_events',
  POPUP_SETTINGS: 'ab_popup_settings',
  CONTACTS: 'ab_contacts',
  STATS: 'ab_stats',
  DONATIONS: 'ab_donations',
  FAQS: 'ab_faqs',
};

const SEED_EVENTS = [
  {
    id: 'evt-yoga-2026',
    title: 'International Day of Yoga 2026',
    date: '2026-06-21',
    startTime: '09:00',
    endTime: '12:30',
    location: 'Alsterwiese Schwanenwik, Hamburg',
    category: 'Yoga',
    description: 'Celebrate health, mindfulness, and community on the banks of the Alster river. Join us for a collective session of Sun Salutations (Surya Namaskar), guided Pranayama, and meditation. Please bring your own yoga mat and water bottle. Open to all ages and experience levels!',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    registrationLink: 'https://tickettailor.com/events/anivasibharathi/yoga2026',
    isFeatured: true
  },
  {
    id: 'evt-ganesha-2026',
    title: 'Hamburg Sarvajanik Ganesha Utsav 2026',
    date: '2026-09-18',
    startTime: '10:00',
    endTime: '22:00',
    location: 'Bürgerhaus Wilhelmsburg, Mengestraße 20, 21107 Hamburg',
    category: 'Festival',
    description: 'Our flagship 3-day public festival! Featuring Ganesha Sthapana, daily Maha Aarti, cultural dances, classical music recitals, Palaki Utsav (grand procession), and authentic Indian food stalls. Admission is free, but registrations are required for crowd management and planning free Mahaprasad distribution.',
    imageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
    registrationLink: 'https://tickettailor.com/events/anivasibharathi/ganesha2026',
    isFeatured: true
  },
  {
    id: 'evt-ganesha-day2-2026',
    title: 'Ganesha Festival - Cultural Night & Palaki',
    date: '2026-09-19',
    startTime: '13:00',
    endTime: '22:00',
    location: 'Bürgerhaus Wilhelmsburg, Mengestraße 20, 21107 Hamburg',
    category: 'Festival',
    description: 'Day 2 of our Ganesha Utsav. Highlights include the traditional Dhol Tasha performances, children\'s cultural competitions, folk dances of India showcase, and the colorful Palaki Utsav procession around the park.',
    imageUrl: 'https://images.unsplash.com/photo-1567878673047-0451c851056e?auto=format&fit=crop&w=800&q=80',
    registrationLink: 'https://tickettailor.com/events/anivasibharathi/ganesha2026',
    isFeatured: false
  },
  {
    id: 'evt-sports-2026',
    title: 'Anivasi Bharathi Sports Mela',
    date: '2026-07-15',
    startTime: '09:00',
    endTime: '18:00',
    location: 'Sportplatz Eimsbüttel, Hamburg',
    category: 'Sports',
    description: 'Annual sports meet for the Indian community in Hamburg. Activities include Box Cricket Tournament, Badminton Singles & Doubles, Tug of War, Lemon-spoon races for kids, and lemon-race for seniors. Connect, compete, and enjoy delicious street food!',
    imageUrl: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80',
    registrationLink: 'https://tickettailor.com/events/anivasibharathi/sports2026',
    isFeatured: true
  },
  {
    id: 'evt-diwali-2026',
    title: 'Diwali Cultural Dhamaka 2026',
    date: '2026-11-08',
    startTime: '17:00',
    endTime: '23:30',
    location: 'Logensaal Kammerspiele, Hamburg',
    category: 'Festival',
    description: 'Celebrate the Festival of Lights! A grand evening filled with Bollywood and traditional dances, musical performances, lighting of Diya, and a lavish Indian buffet dinner. Meet old friends and make new ones in a festive environment.',
    imageUrl: 'https://images.unsplash.com/photo-1680459520309-189cf5b22212?auto=format&fit=crop&w=800&q=80',
    registrationLink: 'https://tickettailor.com/events/anivasibharathi/diwali2026',
    isFeatured: true
  },
  {
    id: 'evt-satsang-july',
    title: 'Monthly Spiritual Satsang & Bhajan Sandhya',
    date: '2026-07-04',
    startTime: '16:00',
    endTime: '18:30',
    location: 'Krummholzberg 9, 21073 Hamburg (Association Center)',
    category: 'Spiritual',
    description: 'Join us for our monthly devotional gathering. The program includes community singing of traditional Bhajans, a short spiritual discourse on Vedantic philosophy, followed by Aarti and distribution of Prasad. Bring family and friends to recharge your spiritual battery.',
    imageUrl: 'https://images.unsplash.com/photo-1663181888868-e3a44b1a8e2d?auto=format&fit=crop&w=800&q=80',
    registrationLink: '',
    isFeatured: false
  },
  {
    id: 'evt-holi-2026',
    title: 'Holi - Festival of Colors (Rescheduled/Completed)',
    date: '2026-03-08',
    startTime: '11:00',
    endTime: '16:00',
    location: 'Stadtpark Hamburg (Festwiese)',
    category: 'Festival',
    description: 'Celebrate spring with organic colors, music, and food! We gather at the park meadow to play with dry colors (Gulaal), enjoy Thandai, and dance to Holi tunes. Dry organic colors will be provided at the venue.',
    imageUrl: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=800&q=80',
    registrationLink: '',
    isFeatured: false
  }
];

const SEED_POPUP = {
  enabled: true,
  title: '🎉 Register for Hamburg Ganesha Utsav 2026!',
  content: 'Join Anivasi Bharathi e.V. for the largest community festival in Northern Germany from September 18th to 20th. Volunteer registration, cultural program entry, and Mahaprasad sponsorship details are now open.',
  imageUrl: 'https://unsplash.com/photos/lord-ganesha-figurine-ICt8jR9TAtQ?auto=format&fit=crop&w=800&q=80',
  actionText: 'Register Now',
  actionLink: 'https://tickettailor.com/events/anivasibharathi/ganesha2026',
  fromDate: '2026-06-20',
  toDate: '2026-06-30',
  duration: 8 // Display duration in seconds
};

const SEED_STATS = {
  members: 450,
  eventsOrganized: 35,
  volunteers: 120,
  activeDonors: 82
};

const SEED_CONTACTS = [
  {
    id: 'msg-1',
    name: 'Rajesh Sharma',
    email: 'rajesh.sharma@gmail.com',
    type: 'volunteer',
    volunteerRole: 'Food & Prasadam Service',
    message: 'Hello, I live in Harburg and would love to volunteer for the upcoming Ganesha Festival. I can help with setup or food distribution.',
    timestamp: '2026-06-19T14:32:00.000Z',
    read: false
  },
  {
    id: 'msg-2',
    name: 'Sarah Becker',
    email: 'sarah.becker@web.de',
    type: 'general',
    message: 'Hello! I am a student doing research on cultural diversity in Hamburg. Can I schedule a short interview with one of your organizers?',
    timestamp: '2026-06-20T10:15:00.000Z',
    read: true
  }
];

const SEED_DONATIONS = [
  {
    id: 'don-1',
    name: 'Amit Patel',
    email: 'amit.patel@gmx.de',
    amount: 50,
    cause: 'Ganesha Mahaprasad Sewa',
    timestamp: '2026-06-18T18:22:00.000Z'
  },
  {
    id: 'don-2',
    name: 'Dr. Priya Nair',
    email: 'priya.nair@uke.de',
    amount: 150,
    cause: 'Hall Rental Support',
    timestamp: '2026-06-19T10:05:00.000Z'
  },
  {
    id: 'don-3',
    name: 'Klaus Meier',
    email: 'klaus.meier@hamburg.de',
    amount: 25,
    cause: 'Student Welcome Kits',
    timestamp: '2026-06-20T08:44:00.000Z'
  }
];

const SEED_FAQS = [
  {
    id: 'faq-1',
    question: 'Are the community events free to attend?',
    answer: 'Yes, absolutely! Following our "Tan, Man, Dhan" philosophy, all our cultural celebrations and major festivals (like the Ganesha Festival and Yoga Day) are open to the public with free admission. We rely entirely on voluntary contributions and donations to keep it that way.'
  },
  {
    id: 'faq-2',
    question: 'How can I volunteer for the events?',
    answer: 'You can sign up directly using the volunteer form in the "Get in Touch" section. Choose "Become a Volunteer" and select your preferred role (e.g. Logistics, Food, Digital Crew, or Cultural Performances). Our coordinators will contact you soon.'
  },
  {
    id: 'faq-3',
    question: 'Can non-Indians participate in Anivasi Bharathi gatherings?',
    answer: 'Yes, we welcome everyone! Anivasi Bharathi e.V. is committed to cross-cultural integration. Many of our local German neighbors, students, and colleagues participate in our yoga sessions and Ganesha festival processions.'
  },
  {
    id: 'faq-4',
    question: 'Is the association officially registered?',
    answer: 'Yes, we are a registered non-profit association (eingetragener Verein) with the District Court of Hamburg (Amtsgericht Hamburg) under registration number VR 23894.'
  }
];

// LocalStorage helpers
const getJSON = (key, defaultValue) => {
  try {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : defaultValue;
  } catch (e) {
    console.error(`Error reading key ${key} from localStorage:`, e);
    return defaultValue;
  }
};

const setJSON = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error saving key ${key} to localStorage:`, e);
  }
};

export const database = {
  // Initialize Database with Seed Data if not present
  initialize: () => {
    // Self-healing check: Force update if browser contains outdated/broken/cat/premium image seeds in localStorage
    const cachedEvents = localStorage.getItem(STORAGE_KEYS.EVENTS);
    if (cachedEvents && (
      cachedEvents.includes('1609137144813-74b88a8d116c') || 
      cachedEvents.includes('1544367567-0f2fcb009e0b') || 
      cachedEvents.includes('1606293926075-69a00dbfde81') ||
      cachedEvents.includes('1530541930197-ff16ac917b0e') ||
      cachedEvents.includes('1540747737956-37872404a8de') ||
      cachedEvents.includes('1566847438217-76e82d383f84') ||
      cachedEvents.includes('1583089892943-e02e5b027f6a') ||
      cachedEvents.includes('1590050752117-238cb0fb12b1') ||
      cachedEvents.includes('1464306208223-e0b44d2a29fd') ||
      cachedEvents.includes('1719894820767-ed5ffca6f4dd') ||
      cachedEvents.includes('1769979628896-2faae5556b3e') ||
      cachedEvents.includes('1617694276915-762d9749e6f7')
    )) {
      localStorage.removeItem(STORAGE_KEYS.EVENTS);
    }

    const cachedPopup = localStorage.getItem(STORAGE_KEYS.POPUP_SETTINGS);
    if (cachedPopup && (
      cachedPopup.includes('1567591907373-c155d045d625') || 
      cachedPopup.includes('1609137144813-74b88a8d116c') ||
      cachedPopup.includes('1566847438217-76e82d383f84') ||
      cachedPopup.includes('1590050752117-238cb0fb12b1') ||
      cachedPopup.includes('1567878673047-0451c851056e')
    )) {
      localStorage.removeItem(STORAGE_KEYS.POPUP_SETTINGS);
    }

    if (!localStorage.getItem(STORAGE_KEYS.EVENTS)) {
      setJSON(STORAGE_KEYS.EVENTS, SEED_EVENTS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.POPUP_SETTINGS)) {
      setJSON(STORAGE_KEYS.POPUP_SETTINGS, SEED_POPUP);
    }
    if (!localStorage.getItem(STORAGE_KEYS.STATS)) {
      setJSON(STORAGE_KEYS.STATS, SEED_STATS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.CONTACTS)) {
      setJSON(STORAGE_KEYS.CONTACTS, SEED_CONTACTS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.DONATIONS)) {
      setJSON(STORAGE_KEYS.DONATIONS, SEED_DONATIONS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.FAQS)) {
      setJSON(STORAGE_KEYS.FAQS, SEED_FAQS);
    }
  },

  // RESET DATABASE TO DEFAULT SEEDS
  resetToDefaults: () => {
    localStorage.removeItem(STORAGE_KEYS.EVENTS);
    localStorage.removeItem(STORAGE_KEYS.POPUP_SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.STATS);
    localStorage.removeItem(STORAGE_KEYS.CONTACTS);
    localStorage.removeItem(STORAGE_KEYS.DONATIONS);
    localStorage.removeItem(STORAGE_KEYS.FAQS);
    database.initialize();
    window.location.reload();
  },

  // Events API
  getEvents: () => getJSON(STORAGE_KEYS.EVENTS, SEED_EVENTS),
  
  saveEvent: (event) => {
    const events = database.getEvents();
    if (event.id) {
      // Edit existing
      const idx = events.findIndex(e => e.id === event.id);
      if (idx !== -1) {
        events[idx] = { ...events[idx], ...event };
      }
    } else {
      // Create new
      const newEvent = {
        ...event,
        id: `evt-${Date.now()}`
      };
      events.push(newEvent);
    }
    setJSON(STORAGE_KEYS.EVENTS, events);
    return events;
  },

  deleteEvent: (id) => {
    const events = database.getEvents();
    const filtered = events.filter(e => e.id !== id);
    setJSON(STORAGE_KEYS.EVENTS, filtered);
    return filtered;
  },

  // Popup Settings API
  getPopupSettings: () => getJSON(STORAGE_KEYS.POPUP_SETTINGS, SEED_POPUP),
  
  savePopupSettings: (settings) => {
    setJSON(STORAGE_KEYS.POPUP_SETTINGS, settings);
    return settings;
  },

  // Stats API
  getStats: () => getJSON(STORAGE_KEYS.STATS, SEED_STATS),
  
  saveStats: (stats) => {
    setJSON(STORAGE_KEYS.STATS, stats);
    return stats;
  },

  // Contact / Submissions API
  getContactSubmissions: () => getJSON(STORAGE_KEYS.CONTACTS, SEED_CONTACTS),
  
  saveContactSubmission: (submission) => {
    const contacts = database.getContactSubmissions();
    const newSubmission = {
      ...submission,
      id: `msg-${Date.now()}`,
      timestamp: new Date().toISOString(),
      read: false
    };
    contacts.unshift(newSubmission);
    setJSON(STORAGE_KEYS.CONTACTS, contacts);
    return newSubmission;
  },

  markMessageAsRead: (id) => {
    const contacts = database.getContactSubmissions();
    const idx = contacts.findIndex(c => c.id === id);
    if (idx !== -1) {
      contacts[idx].read = true;
      setJSON(STORAGE_KEYS.CONTACTS, contacts);
    }
    return contacts;
  },

  deleteMessage: (id) => {
    const contacts = database.getContactSubmissions();
    const filtered = contacts.filter(c => c.id !== id);
    setJSON(STORAGE_KEYS.CONTACTS, filtered);
    return filtered;
  },

  // Donations API
  getDonations: () => getJSON(STORAGE_KEYS.DONATIONS, SEED_DONATIONS),
  
  saveDonation: (donation) => {
    const donations = database.getDonations();
    const newDonation = {
      ...donation,
      id: `don-${Date.now()}`,
      timestamp: new Date().toISOString()
    };
    donations.unshift(newDonation);
    setJSON(STORAGE_KEYS.DONATIONS, donations);
    
    // Auto-update active donors count in Stats!
    const stats = database.getStats();
    stats.activeDonors = (stats.activeDonors || 0) + 1;
    database.saveStats(stats);
    
    return donations;
  },

  // FAQs API
  getFaqs: () => getJSON(STORAGE_KEYS.FAQS, SEED_FAQS),
  
  saveFaq: (faq) => {
    const faqs = database.getFaqs();
    if (faq.id) {
      // Edit
      const idx = faqs.findIndex(f => f.id === faq.id);
      if (idx !== -1) {
        faqs[idx] = { ...faqs[idx], ...faq };
      }
    } else {
      // Add new
      const newFaq = {
        ...faq,
        id: `faq-${Date.now()}`
      };
      faqs.push(newFaq);
    }
    setJSON(STORAGE_KEYS.FAQS, faqs);
    return faqs;
  },

  deleteFaq: (id) => {
    const faqs = database.getFaqs();
    const filtered = faqs.filter(f => f.id !== id);
    setJSON(STORAGE_KEYS.FAQS, filtered);
    return filtered;
  }
};
