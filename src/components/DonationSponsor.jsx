import React, { useState } from 'react';
import './DonationSponsor.css';
import { database } from '../utils/mockDatabase';

export default function DonationSponsor({ onDonationSuccess }) {
  const [amount, setAmount] = useState(25);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedCause, setSelectedCause] = useState('Ganesha Mahaprasad Sewa');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');

  // Checkout modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState('form'); // 'form', 'loading', 'success'
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  const causes = [
    { name: 'Ganesha Mahaprasad Sewa', icon: '🍲', desc: 'Sponsor free food/prasad distribution for 3 days of Ganesha festival.' },
    { name: 'Hall & Venue Rental Support', icon: '🎪', desc: 'Help cover rental and setup costs of community halls in Hamburg.' },
    { name: 'Cultural Program Cost', icon: '🎶', desc: 'Support sound systems, stages, classical dancers, and artists.' },
    { name: 'Student Welcome Kits', icon: '🎓', desc: 'Assist incoming Indian students adapting to Hamburg university life.' }
  ];

  const presets = [15, 25, 50, 100];

  const getFinalAmount = () => {
    return amount === 'custom' ? parseFloat(customAmount) || 0 : amount;
  };

  const handleOpenCheckout = (e) => {
    e.preventDefault();
    const finalAmt = getFinalAmount();
    if (finalAmt <= 0) {
      alert('Please select or input a valid donation amount.');
      return;
    }
    if (!donorName || !donorEmail) {
      alert('Please fill out your name and email address.');
      return;
    }
    setIsModalOpen(true);
    setCheckoutStep('form');
  };

  const handleCloseCheckout = () => {
    setIsModalOpen(false);
    // Reset payment form
    setCardNumber('');
    setCardExpiry('');
    setCardCvc('');
  };

  const handlePay = (e) => {
    e.preventDefault();
    if (!cardNumber || !cardExpiry || !cardCvc) return;

    setCheckoutStep('loading');

    // Simulate payment processing
    setTimeout(() => {
      const finalAmt = getFinalAmount();
      
      // Save to local storage database
      database.saveDonation({
        name: donorName,
        email: donorEmail,
        amount: finalAmt,
        cause: selectedCause
      });

      setCheckoutStep('success');

      // Trigger callback in parent to refresh counters
      if (onDonationSuccess) {
        onDonationSuccess();
      }

      // Reset donor fields after 2.5 seconds
      setTimeout(() => {
        setDonorName('');
        setDonorEmail('');
        setAmount(25);
        setCustomAmount('');
        handleCloseCheckout();
      }, 2500);

    }, 1800);
  };

  // Format Card Number (adds spaces)
  const handleCardNumberChange = (e) => {
    const val = e.target.value.replace(/\s?/g, '').replace(/\D/g, '');
    const limit = 16;
    let formatted = '';
    for (let i = 0; i < val.length && i < limit; i++) {
      if (i > 0 && i % 4 === 0) formatted += ' ';
      formatted += val[i];
    }
    setCardNumber(formatted);
  };

  return (
    <section id="donate" className="donation-section section-padding">
      <div className="container">
        <div className="section-header">
          <h2>Sponsorship & Sewa</h2>
          <p>We host all our community events for free without tickets. Support our work by sponsoring a cause of your choice.</p>
        </div>

        <div className="donation-grid">
          {/* Causes Column */}
          <div className="causes-list">
            <h3>1. Select Your Cause</h3>
            <div className="causes-grid">
              {causes.map(cause => (
                <div 
                  key={cause.name} 
                  className={`cause-card glass-card ${selectedCause === cause.name ? 'active-cause' : ''}`}
                  onClick={() => setSelectedCause(cause.name)}
                >
                  <div className="cause-icon-container">
                    <span className="cause-icon">{cause.icon}</span>
                  </div>
                  <div className="cause-body">
                    <h4>{cause.name}</h4>
                    <p>{cause.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Amount / Form Column */}
          <div className="donation-form-panel glass-card">
            <h3>2. Contribution Details</h3>
            
            <form onSubmit={handleOpenCheckout} className="donation-form">
              <div className="form-group">
                <label className="form-label">Sponsorship Amount (€)</label>
                <div className="presets-row">
                  {presets.map(val => (
                    <button
                      key={val}
                      type="button"
                      className={`preset-btn ${amount === val ? 'active-preset' : ''}`}
                      onClick={() => {
                        setAmount(val);
                        setCustomAmount('');
                      }}
                    >
                      €{val}
                    </button>
                  ))}
                  <button
                    type="button"
                    className={`preset-btn ${amount === 'custom' ? 'active-preset' : ''}`}
                    onClick={() => setAmount('custom')}
                  >
                    Custom
                  </button>
                </div>

                {amount === 'custom' && (
                  <input
                    type="number"
                    min="1"
                    placeholder="Enter Custom Amount (€)"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="form-input custom-amount-input animate-fade"
                    required
                  />
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="donorName">Full Name</label>
                <input
                  type="text"
                  id="donorName"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  placeholder="Sponsor / Family Name"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="donorEmail">Email Address</label>
                <input
                  type="email"
                  id="donorEmail"
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="form-input"
                  required
                />
              </div>

              <div className="cause-alert">
                <span className="alert-emoji">🌱</span>
                <p>You are supporting: <strong>{selectedCause}</strong> with a contribution of <strong>€{getFinalAmount()}</strong>.</p>
              </div>

              <button type="submit" className="btn btn-primary sponsor-submit-btn">
                💖 Proceed to Sponsor
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* CHECKOUT MODAL OVERLAY */}
      {isModalOpen && (
        <div className="checkout-overlay" onClick={handleCloseCheckout}>
          <div className="checkout-modal glass-card" onClick={(e) => e.stopPropagation()}>
            <button className="checkout-close" onClick={handleCloseCheckout}>&times;</button>
            
            {checkoutStep === 'form' && (
              <form onSubmit={handlePay} className="payment-form">
                <div className="checkout-header">
                  <span className="checkout-badge">💳 Secure Checkout</span>
                  <h3>Sponsorship Payment</h3>
                  <p>Complete your voluntary contribution to Anivasi Bharathi e.V.</p>
                </div>

                <div className="payment-summary">
                  <div>
                    <span className="summary-label">Sponsorship Cause</span>
                    <span className="summary-val">{selectedCause}</span>
                  </div>
                  <div>
                    <span className="summary-label">Total Amount</span>
                    <span className="summary-val-amount">€{getFinalAmount()}</span>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Cardholder Name</label>
                  <input 
                    type="text" 
                    placeholder={donorName}
                    defaultValue={donorName}
                    className="form-input" 
                    required 
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Card Number</label>
                  <input 
                    type="text" 
                    value={cardNumber} 
                    onChange={handleCardNumberChange}
                    placeholder="xxxx xxxx xxxx xxxx" 
                    className="form-input card-num-input" 
                    required 
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Expiry Date</label>
                    <input 
                      type="text" 
                      value={cardExpiry}
                      onChange={(e) => {
                        let val = e.target.value.replace(/\D/g, '');
                        if (val.length > 2) val = val.substring(0,2) + '/' + val.substring(2,4);
                        setCardExpiry(val.substring(0, 5));
                      }}
                      placeholder="MM/YY" 
                      className="form-input" 
                      required 
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">CVC / CVV</label>
                    <input 
                      type="password" 
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, '').substring(0, 3))}
                      placeholder="123" 
                      className="form-input" 
                      required 
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary pay-btn">
                  💳 Complete Payment (€{getFinalAmount()})
                </button>
                <p className="secure-badge-footer">🔒 Sofort / Visa / Mastercard • Demo Simulation Only</p>
              </form>
            )}

            {checkoutStep === 'loading' && (
              <div className="checkout-processing">
                <div className="spinner"></div>
                <h4>Processing Sponsorship Payment...</h4>
                <p>Connecting with payment gateway, please do not close this window.</p>
              </div>
            )}

            {checkoutStep === 'success' && (
              <div className="checkout-success animate-scale">
                <div className="success-checkmark">
                  <span className="checkmark-icon">❤️</span>
                </div>
                <h4>Sponsorship Completed!</h4>
                <p>Dhanyavad! Thank you <strong>{donorName}</strong> for your valuable support. Your contribution helps keep our culture alive in Hamburg.</p>
              </div>
            )}

          </div>
        </div>
      )}

    </section>
  );
}
