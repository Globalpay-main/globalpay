// components/ActivateCard.jsx - Card Activation Component
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cryptoCardAPI } from '../services/api';
import './Auth.css';

const ActivateCard = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cardNumber: '',
    pin: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showKYCForm, setShowKYCForm] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Format card number with spaces
    if (name === 'cardNumber') {
      const formatted = value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
      if (formatted.length <= 14) { // 12 digits + 2 spaces
        setFormData(prev => ({ ...prev, [name]: formatted }));
      }
    } else if (name === 'pin') {
      // Only allow 4 digits for PIN
      if (value.length <= 4 && /^\d*$/.test(value)) {
        setFormData(prev => ({ ...prev, [name]: value }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const cleanCardNumber = formData.cardNumber.replace(/\s/g, '');

    if (!cleanCardNumber) {
      newErrors.cardNumber = 'Card number is required';
    } else if (cleanCardNumber.length !== 12) {
      newErrors.cardNumber = 'Card number must be 12 digits';
    }

    if (!formData.pin) {
      newErrors.pin = 'PIN is required';
    } else if (formData.pin.length !== 4) {
      newErrors.pin = 'PIN must be 4 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleActivation = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      const cleanCardNumber = formData.cardNumber.replace(/\s/g, '');
      
      const response = await cryptoCardAPI.activate({
        cardNumber: cleanCardNumber,
        pin: formData.pin
      });
      
      if (response.success) {
        if (response.requiresKYC) {
          setShowKYCForm(true);
        } else {
          // Card activated successfully, navigate to wallet
          navigate('/wallet', { 
            state: { 
              message: 'Card activated successfully!',
              walletBalance: response.walletBalance 
            }
          });
        }
      } else {
        setErrors({ general: response.message || 'Card activation failed. Please try again.' });
      }
    } catch (error) {
      setErrors({ general: error.message || 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  // Determine card value based on prefix
  const getCardValue = () => {
    const cleanCardNumber = formData.cardNumber.replace(/\s/g, '');
    if (cleanCardNumber.length >= 2) {
      const prefix = cleanCardNumber.substring(0, 2);
      switch (prefix) {
        case '05': return '$50';
        case '10': return '$100';
        case '20': return '$200';
        case '50': return '$500';
        default: return '';
      }
    }
    return '';
  };

  if (showKYCForm) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h2>Complete KYC Verification</h2>
            <p>To activate your crypto card, please complete the minimal KYC requirements</p>
          </div>
          
          <div className="verification-message">
            <p>You will be redirected to complete your identity verification to activate the {getCardValue()} crypto card.</p>
            <button 
              className="auth-btn primary"
              onClick={() => navigate('/kyc', { state: { cardActivation: true } })}
            >
              Continue to KYC
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Activate Your Crypto Card</h2>
          <p>Enter your card details to activate and access your crypto wallet</p>
        </div>

        <form onSubmit={handleActivation} className="auth-form">
          <div className="form-group">
            <label htmlFor="cardNumber">Card Number</label>
            <input
              id="cardNumber"
              name="cardNumber"
              type="text"
              value={formData.cardNumber}
              onChange={handleInputChange}
              className={errors.cardNumber ? 'error' : ''}
              placeholder="0000 0000 0000"
              maxLength="14"
              style={{ 
                fontFamily: 'monospace', 
                fontSize: '1.1rem',
                letterSpacing: '0.1em'
              }}
            />
            {errors.cardNumber && <span className="error-text">{errors.cardNumber}</span>}
            {getCardValue() && (
              <div style={{ 
                marginTop: '0.5rem', 
                padding: '0.5rem', 
                background: '#e6fffa', 
                color: '#234e52',
                borderRadius: '4px',
                fontSize: '0.9rem'
              }}>
                Card Value: {getCardValue()}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="pin">4-Digit PIN</label>
            <input
              id="pin"
              name="pin"
              type="password"
              value={formData.pin}
              onChange={handleInputChange}
              className={errors.pin ? 'error' : ''}
              placeholder="Enter 4-digit PIN"
              maxLength="4"
              style={{ 
                fontFamily: 'monospace', 
                fontSize: '1.1rem',
                letterSpacing: '0.2em'
              }}
            />
            {errors.pin && <span className="error-text">{errors.pin}</span>}
          </div>

          {errors.general && (
            <div className="error-message">
              {errors.general}
            </div>
          )}

          <button type="submit" className="auth-btn primary" disabled={loading}>
            {loading ? 'Activating Card...' : 'Activate Card'}
          </button>

          <div className="auth-links">
            <p>
              Need help? <a href="/support" className="link-btn">Contact Support</a>
            </p>
            <p>
              <button type="button" onClick={() => navigate('/')} className="link-btn">
                ← Back to Home
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActivateCard;