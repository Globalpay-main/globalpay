// components/Signup.jsx - Signup Component with Email/Phone Toggle
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import './Auth.css';

const Signup = () => {
  const navigate = useNavigate();
  const [signupMethod, setSignupMethod] = useState('email'); // 'email' or 'phone'
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    countryCode: '+1',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

  // Country codes for phone signup
  const countryCodes = [
    { code: '+1', country: 'US/CA', flag: '🇺🇸' },
    { code: '+44', country: 'UK', flag: '🇬🇧' },
    { code: '+234', country: 'Nigeria', flag: '🇳🇬' },
    { code: '+233', country: 'Ghana', flag: '🇬🇭' },
    { code: '+254', country: 'Kenya', flag: '🇰🇪' },
    { code: '+27', country: 'South Africa', flag: '🇿🇦' },
    { code: '+91', country: 'India', flag: '🇮🇳' },
    { code: '+86', country: 'China', flag: '🇨🇳' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    // Email/Phone validation based on selected method
    if (signupMethod === 'email') {
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      } else if (isTemporaryEmail(formData.email)) {
        newErrors.email = 'Temporary email addresses are not allowed';
      }
    } else {
      if (!formData.phone) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^\d{10,15}$/.test(formData.phone.replace(/\D/g, ''))) {
        newErrors.phone = 'Please enter a valid phone number';
      } else if (isGoogleNumber(formData.phone)) {
        newErrors.phone = 'Google Voice numbers are not allowed';
      }
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Security functions to block fraudulent numbers/emails
  const isTemporaryEmail = (email) => {
    const tempEmailDomains = [
      '10minutemail.com', 'tempmail.org', 'guerrillamail.com',
      'mailinator.com', 'throwaway.email', 'temp-mail.org',
      'getnada.com', 'maildrop.cc', 'yopmail.com'
    ];
    const domain = email.split('@')[1]?.toLowerCase();
    return tempEmailDomains.includes(domain);
  };

  const isGoogleNumber = (phone) => {
    // Basic check for Google Voice patterns (this would be enhanced with a real service)
    const googleVoicePatterns = [
      /^1(747|818|323|213|310|424|562)/,  // LA area codes commonly used by Google Voice
      // Add more patterns as needed
    ];
    const cleanPhone = phone.replace(/\D/g, '');
    return googleVoicePatterns.some(pattern => pattern.test(cleanPhone));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      const signupData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        password: formData.password,
        signupMethod,
        ...(signupMethod === 'email' 
          ? { email: formData.email }
          : { phone: `${formData.countryCode}${formData.phone}` }
        )
      };

      const response = await authAPI.signup(signupData);
      
      if (response.success) {
        setVerificationSent(true);
      } else {
        setErrors({ general: response.message || 'Signup failed. Please try again.' });
      }
    } catch (error) {
      setErrors({ general: error.message || 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleVerification = async (e) => {
    e.preventDefault();
    
    if (!verificationCode.trim()) {
      setErrors({ verification: 'Please enter the verification code' });
      return;
    }
    
    setLoading(true);
    
    try {
      const verifyData = {
        code: verificationCode,
        [signupMethod]: signupMethod === 'email' ? formData.email : `${formData.countryCode}${formData.phone}`
      };

      const response = await authAPI.verifySignup(verifyData);
      
      if (response.success) {
        localStorage.setItem('authToken', response.token);
        navigate('/dashboard');
      } else {
        setErrors({ verification: response.message || 'Invalid verification code' });
      }
    } catch (error) {
      setErrors({ verification: error.message || 'Verification failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const toggleSignupMethod = () => {
    setSignupMethod(prev => prev === 'email' ? 'phone' : 'email');
    setErrors({});
    setVerificationSent(false);
    setVerificationCode('');
  };

  if (verificationSent) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h2>Verify Your {signupMethod === 'email' ? 'Email' : 'Phone'}</h2>
            <p>
              We've sent a verification {signupMethod === 'email' ? 'link' : 'code'} to{' '}
              <strong>
                {signupMethod === 'email' 
                  ? formData.email 
                  : `${formData.countryCode}${formData.phone}`
                }
              </strong>
            </p>
          </div>

          <form onSubmit={handleVerification} className="auth-form">
            {signupMethod === 'phone' && (
              <div className="form-group">
                <label htmlFor="verificationCode">Verification Code</label>
                <input
                  id="verificationCode"
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="Enter 6-digit code"
                  maxLength="6"
                  className={errors.verification ? 'error' : ''}
                />
                {errors.verification && <span className="error-text">{errors.verification}</span>}
              </div>
            )}

            {signupMethod === 'email' && (
              <div className="verification-message">
                <p>Please check your email and click the verification link to complete your registration.</p>
              </div>
            )}

            {signupMethod === 'phone' && (
              <button type="submit" className="auth-btn primary" disabled={loading}>
                {loading ? 'Verifying...' : 'Verify Phone'}
              </button>
            )}

            <button 
              type="button" 
              className="auth-btn secondary"
              onClick={() => setVerificationSent(false)}
            >
              Back to Signup
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Create Your GlobalPay Account</h2>
          <p>Join thousands of users making secure digital payments worldwide</p>
        </div>

        <div className="signup-method-toggle">
          <div className="toggle-buttons">
            <button
              type="button"
              className={`toggle-btn ${signupMethod === 'email' ? 'active' : ''}`}
              onClick={() => setSignupMethod('email')}
            >
              📧 Email
            </button>
            <button
              type="button"
              className={`toggle-btn ${signupMethod === 'phone' ? 'active' : ''}`}
              onClick={() => setSignupMethod('phone')}
            >
              📱 Phone
            </button>
          </div>
        </div>

        <form onSubmit={handleSignup} className="auth-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleInputChange}
                className={errors.firstName ? 'error' : ''}
                placeholder="Enter your first name"
              />
              {errors.firstName && <span className="error-text">{errors.firstName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleInputChange}
                className={errors.lastName ? 'error' : ''}
                placeholder="Enter your last name"
              />
              {errors.lastName && <span className="error-text">{errors.lastName}</span>}
            </div>
          </div>

          {signupMethod === 'email' ? (
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className={errors.email ? 'error' : ''}
                placeholder="Enter your email address"
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>
          ) : (
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <div className="phone-input-group">
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleInputChange}
                  className="country-code-select"
                >
                  {countryCodes.map(country => (
                    <option key={country.code} value={country.code}>
                      {country.flag} {country.code}
                    </option>
                  ))}
                </select>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={errors.phone ? 'error' : ''}
                  placeholder="Enter your phone number"
                />
              </div>
              {errors.phone && <span className="error-text">{errors.phone}</span>}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              className={errors.password ? 'error' : ''}
              placeholder="Create a strong password"
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className={errors.confirmPassword ? 'error' : ''}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                name="agreeToTerms"
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                className={errors.agreeToTerms ? 'error' : ''}
              />
              <span className="checkmark"></span>
              I agree to the <a href="/terms" target="_blank">Terms of Service</a> and <a href="/privacy" target="_blank">Privacy Policy</a>
            </label>
            {errors.agreeToTerms && <span className="error-text">{errors.agreeToTerms}</span>}
          </div>

          {errors.general && (
            <div className="error-message">
              {errors.general}
            </div>
          )}

          <button type="submit" className="auth-btn primary" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>

          <div className="auth-links">
            <p>Already have an account? <button type="button" onClick={() => navigate('/login')} className="link-btn">Sign in</button></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;