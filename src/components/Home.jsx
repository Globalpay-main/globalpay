// components/Home.jsx - Updated Home Page Component
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  
  // Currency options with country flags
  const currencies = [
    { code: 'USD', name: 'US Dollar', flag: '🇺🇸' },
    { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
    { code: 'GBP', name: 'British Pound', flag: '🇬🇧' },
    { code: 'CAD', name: 'Canadian Dollar', flag: '🇨🇦' },
    { code: 'AUD', name: 'Australian Dollar', flag: '🇦🇺' },
    { code: 'JPY', name: 'Japanese Yen', flag: '🇯🇵' },
    { code: 'NGN', name: 'Nigerian Naira', flag: '🇳🇬' },
    { code: 'GHS', name: 'Ghanaian Cedi', flag: '🇬🇭' },
    { code: 'KES', name: 'Kenyan Shilling', flag: '🇰🇪' },
    { code: 'ZAR', name: 'South African Rand', flag: '🇿🇦' }
  ];

  const handleSignup = () => {
    navigate('/signup');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleActivateCard = () => {
    navigate('/activate-card');
  };

  const handleCurrencyChange = (e) => {
    setSelectedCurrency(e.target.value);
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="logo-section">
          <h1 className="app-title">GlobalPay</h1>
          <p className="app-subtitle">Secure Digital Payments & Crypto Solutions</p>
        </div>
        
        <div className="currency-selector">
          <label htmlFor="currency-select">Currency:</label>
          <select 
            id="currency-select"
            value={selectedCurrency}
            onChange={handleCurrencyChange}
            className="currency-dropdown"
          >
            {currencies.map(currency => (
              <option key={currency.code} value={currency.code}>
                {currency.flag} {currency.code} - {currency.name}
              </option>
            ))}
          </select>
        </div>
      </header>

      <main className="home-main">
        <section className="hero-section">
          <h2>Welcome to GlobalPay</h2>
          <p>Your gateway to secure cryptocurrency transactions and international payments</p>
        </section>

        <section className="action-buttons-section">
          <div className="primary-actions">
            <button 
              className="action-btn signup-btn"
              onClick={handleSignup}
            >
              <div className="btn-icon">👤</div>
              <div className="btn-content">
                <h3>Sign Up</h3>
                <p>Create your account to get started</p>
              </div>
            </button>

            <button 
              className="action-btn login-btn"
              onClick={handleLogin}
            >
              <div className="btn-icon">🔐</div>
              <div className="btn-content">
                <h3>Login</h3>
                <p>Access your existing account</p>
              </div>
            </button>

            <button 
              className="action-btn activate-card-btn"
              onClick={handleActivateCard}
            >
              <div className="btn-icon">💳</div>
              <div className="btn-content">
                <h3>Activate Crypto Card</h3>
                <p>Activate your crypto gift card</p>
              </div>
            </button>
          </div>
        </section>

        <section className="features-section">
          <div className="feature-grid">
            <div className="feature-item">
              <h4>🚀 Fast Transactions</h4>
              <p>Lightning-fast crypto and fiat transactions worldwide</p>
            </div>
            <div className="feature-item">
              <h4>🔒 Secure & Compliant</h4>
              <p>Bank-level security with full regulatory compliance</p>
            </div>
            <div className="feature-item">
              <h4>🌍 Global Reach</h4>
              <p>Send money internationally with competitive rates</p>
            </div>
            <div className="feature-item">
              <h4>💼 Easy KYC</h4>
              <p>Simple verification process to get you started quickly</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="home-footer">
        <p>&copy; 2025 GlobalPay. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;