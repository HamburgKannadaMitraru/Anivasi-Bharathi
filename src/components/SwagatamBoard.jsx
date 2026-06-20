import React, { useState } from 'react';
import './SwagatamBoard.css';

export default function SwagatamBoard() {
  const languagesData = [
    {
      lang: 'Sanskrit',
      greeting: 'स्वागतम्‌',
      transliteration: 'Swāgatam',
      scriptName: 'Devanagari',
      meaning: 'May your arrival be auspicious. An ancient welcoming invoking peace and unity.',
      welcomeText: 'Anivasi Bharathi e.V. welcomes you to our spiritual and cultural family.'
    },
    {
      lang: 'Hindi',
      greeting: 'नमस्ते',
      transliteration: 'Namaste',
      scriptName: 'Devanagari',
      meaning: 'I bow to the divine spark within you. Represents respect, peace, and humbleness.',
      welcomeText: 'A warm welcome to Hamburg\'s unified Indian diaspora hub.'
    },
    {
      lang: 'Tamil',
      greeting: 'வணக்கம்',
      transliteration: 'Vanakkam',
      scriptName: 'Tamil Script',
      meaning: 'Greeting the presence of goodness in you. A classical Dravidian greeting of hospitality.',
      welcomeText: 'Hamburg Anivasi Bharathi-il ungalai anbudan varuverkirom!'
    },
    {
      lang: 'Bengali',
      greeting: 'নমস্কার / স্বাগতম',
      transliteration: 'Nomoshkar / Shagotom',
      scriptName: 'Bengali Script',
      meaning: 'Welcoming you with deep respect, devotion, and a sweet festive spirit.',
      welcomeText: 'Anivasi Bharathi-te apnake sador amontron o shagotom.'
    },
    {
      lang: 'Punjabi',
      greeting: 'ਜੀ ਆਇਆਂ ਨੂੰ / ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ',
      transliteration: 'Ji Aayan Nu / Sat Sri Akal',
      scriptName: 'Gurmukhi',
      meaning: 'Greeting the Timeless True Lord in you. Welcoming with immense warmth and vigor.',
      welcomeText: 'Anivasi Bharathi wallon saareya da Hamburg vich jii aayan nu.'
    },
    {
      lang: 'Telugu',
      greeting: 'నమస్కారం / స్వాగతం',
      transliteration: 'Namaskaram / Swagatham',
      scriptName: 'Telugu Script',
      meaning: 'Gracious bows of welcome. Blending tradition, culture, and absolute warmth.',
      welcomeText: 'Anivasi Bharathi e.V. ki mee andariki svara-swagatham.'
    },
    {
      lang: 'Marathi',
      greeting: 'नमस्कार / स्वागत',
      transliteration: 'Namaskar / Swagat',
      scriptName: 'Devanagari',
      meaning: 'I salute your presence. A traditional welcome highlighting community hospitality.',
      welcomeText: 'Anivasi Bharathi e.V. madhye aaple saharsha swagat aahe.'
    },
    {
      lang: 'Kannada',
      greeting: 'ನಮಸ್ಕಾರ / ಸ್ವಾಗತ',
      transliteration: 'Namaskara / Swagatha',
      scriptName: 'Kannada Script',
      meaning: 'Bowing to you with absolute respect. Inviting you into our cultural sanctuary.',
      welcomeText: 'Hamburg Anivasi Bharathi e.V. ge nimagellarigu aadhara swagatha.'
    },
    {
      lang: 'Malayalam',
      greeting: 'നമസ്കാരം / സ്വാഗതം',
      transliteration: 'Namaskaram / Swagatham',
      scriptName: 'Malayalam Script',
      meaning: 'A warm welcome originating from the land of coconut palms. Gracious and hospitable.',
      welcomeText: 'Anivasi Bharathi-lekku ellarkkum snehadharam swagatham.'
    },
    {
      lang: 'Gujarati',
      greeting: 'સ્વાગત / કેમ છો',
      transliteration: 'Swagat / Kem Cho',
      scriptName: 'Gujarati Script',
      meaning: 'A sweet welcome to you. Representing a community of business, colors, and joy.',
      welcomeText: 'Anivasi Bharathi e.V. ma tamaru hardik swagat chhe.'
    }
  ];

  const [selectedLangIdx, setSelectedLangIdx] = useState(0);
  const current = languagesData[selectedLangIdx];

  return (
    <section className="swagatam-section">
      <div className="container">
        <div className="section-header">
          <h2>Vasudhaiva Kutumbakam</h2>
          <p>“The World is One Family.” Anivasi Bharathi e.V. brings together members from all corners of India. Select a language below to feel at home.</p>
        </div>

        <div className="swagatam-board glass-card animate-fade">
          {/* Left / Top Tabs Grid */}
          <div className="swagatam-tabs">
            {languagesData.map((data, idx) => (
              <button
                key={data.lang}
                className={`swagatam-tab-btn ${selectedLangIdx === idx ? 'active-lang-tab' : ''}`}
                onClick={() => setSelectedLangIdx(idx)}
              >
                <span className="tab-lang-name">{data.lang}</span>
                <span className="tab-lang-preview">{data.greeting}</span>
              </button>
            ))}
          </div>

          {/* Right / Center Detail Display */}
          <div className="swagatam-detail-display animate-scale">
            <div className="display-card-header">
              <span className="display-lang-badge">🗣️ Language: {current.lang}</span>
              <span className="display-script-badge">✍️ Script: {current.scriptName}</span>
            </div>

            <div className="display-calligraphy">
              <span className="calligraphy-script">{current.greeting}</span>
              <span className="calligraphy-pronounce">“ {current.transliteration} ”</span>
            </div>

            <div className="display-explanation">
              <h4>Cultural Philosophy</h4>
              <p className="philosophy-desc">{current.meaning}</p>
              
              <div className="display-welcome-box">
                <span className="welcome-quotes">“</span>
                <p>{current.welcomeText}</p>
                <span className="welcome-quotes right-quote">”</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
