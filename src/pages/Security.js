// src/pages/Security.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, Eye, Key, Server, AlertTriangle, CheckCircle, Award, Database, Globe, Menu, X, ChevronDown } from 'lucide-react';
import SignupModal from '../SignupModal';
import LoginModal from '../LoginModal';
import ActivateCardModal from '../ActivateCardModal';

const SecurityPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [showQRCode, setShowQRCode] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showActivateCardModal, setShowActivateCardModal] = useState(false);
  const [signupStep, setSignupStep] = useState('details');
  const [loginStep, setLoginStep] = useState('email');
  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: 'US',
    code: '',
    generatedCode: ''
  });
  const [loginData, setLoginData] = useState({
    email: '',
    phone: '',
    loginMethod: 'email',
    code: '',
    generatedCode: ''
  });
  const [activateData, setActivateData] = useState({
    cardNumber: '',
    pin: '',
    code: '',
    generatedCode: ''
  });

  const countries = [
    { code: 'US', name: 'United States', requiresSSN: true },
    { code: 'CA', name: 'Canada', requiresSSN: false },
    { code: 'UK', name: 'United Kingdom', requiresSSN: false },
    { code: 'DE', name: 'Germany', requiresSSN: false },
    { code: 'FR', name: 'France', requiresSSN: false },
    { code: 'NG', name: 'Nigeria', requiresSSN: false },
    { code: 'GH', name: 'Ghana', requiresSSN: false },
    { code: 'KE', name: 'Kenya', requiresSSN: false },
    { code: 'ZA', name: 'South Africa', requiresSSN: false },
    { code: 'BR', name: 'Brazil', requiresSSN: false },
    { code: 'IN', name: 'India', requiresSSN: false }
  ];

  const menuItems = {
    Services: [
      { name: 'Send Money', path: '/send-money' },
      { name: 'Crypto Cards', path: '/crypto-cards' },
      { name: 'Digital Wallets', path: '/digital-wallets' },
      { name: 'Business Solutions', path: '/business-solutions' }
    ],
    Company: [
      { name: 'About Us', path: '/about-us' },
      { name: 'Careers', path: '/careers' },
      { name: 'Press', path: '/press' },
      { name: 'Investors', path: '/investors' }
    ],
    Support: [
      { name: 'Help Center', path: '/help-center' },
      { name: 'Contact Us', path: '/contact-us' },
      { name: 'API Documentation', path: '/api-documentation' },
      { name: 'Security', path: '/security' }
    ],
    Legal: [
      { name: 'Terms of Service', path: '/terms-of-service' },
      { name: 'Privacy Policy', path: '/privacy-policy' },
      { name: 'Compliance', path: '/compliance' },
      { name: 'Licenses', path: '/licenses' }
    ]
  };

  const toggleSubmenu = (menu) => {
    setExpandedMenu(expandedMenu === menu ? null : menu);
  };

  const generateAuthCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const setShowLandingPage = (value) => {
    console.log('Navigation would occur here:', value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white">
      {/* Header */}
      <header className="bg-purple-900/50 backdrop-blur-sm border-b border-purple-700 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <Globe className="w-8 h-8 text-green-400" />
              <span className="text-2xl font-bold">GlobalPay</span>
            </Link>

            {/* Action Buttons + Hamburger (visible on all screen sizes) */}
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setShowSignupModal(true)}
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-medium text-sm md:text-base transition-colors"
              >
                Sign Up
              </button>
              <button 
                onClick={() => setShowLoginModal(true)}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium text-sm md:text-base transition-colors"
              >
                Login
              </button>
              <button 
                onClick={() => setShowActivateCardModal(true)}
                className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-lg font-medium text-sm md:text-base transition-colors"
              >
                Activate Card
              </button>
              
              {/* Hamburger Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 hover:bg-purple-700 rounded-lg transition-colors"
                aria-label="Menu"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Hamburger Dropdown Menu */}
        {isMenuOpen && (
          <div className="bg-purple-800 border-t border-purple-700 max-h-96 overflow-y-auto">
            <div className="container mx-auto px-4 py-4">
              {Object.entries(menuItems).map(([category, items]) => (
                <div key={category} className="mb-2">
                  <button
                    onClick={() => toggleSubmenu(category)}
                    className="w-full flex items-center justify-between p-3 hover:bg-purple-700 rounded-lg transition-colors"
                  >
                    <span className="font-semibold text-lg">{category}</span>
                    <ChevronDown 
                      className={`w-5 h-5 transition-transform ${
                        expandedMenu === category ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  
                  {expandedMenu === category && (
                    <div className="ml-4 mt-2 space-y-1 bg-purple-900/50 rounded-lg p-2">
                      {items.map((item) => (
                        <Link
                          key={item.name}
                          to={item.path}
                          className={`block p-3 hover:bg-purple-700 rounded-lg transition-colors ${
                            item.path === '/security' ? 'text-white font-medium bg-purple-700' : 'text-gray-200 hover:text-white'
                          }`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Fixed QR Code on Right Center Margin */}
      <div 
        className="fixed right-0 top-1/2 transform -translate-y-1/2 z-40 cursor-pointer"
        onMouseEnter={() => setShowQRCode(true)}
        onMouseLeave={() => setShowQRCode(false)}
      >
        <div className={`transition-all duration-300 ${showQRCode ? 'w-48' : 'w-16'} bg-purple-800 border-l-4 border-green-400 rounded-l-lg shadow-lg`}>
          {!showQRCode ? (
            <div className="p-4">
              <div className="w-8 h-8 bg-white rounded grid grid-cols-2 gap-0.5 p-1">
                <div className="bg-black"></div>
                <div className="bg-white"></div>
                <div className="bg-white"></div>
                <div className="bg-black"></div>
              </div>
            </div>
          ) : (
            <div className="p-4">
              <h3 className="text-sm font-bold mb-2 text-center">Get the GlobalPay App</h3>
              <div className="bg-white p-2 rounded mb-2">
                <div className="grid grid-cols-8 gap-0.5">
                  {[...Array(64)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`aspect-square ${Math.random() > 0.5 ? 'bg-black' : 'bg-white'}`}
                    ></div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <a 
                  href="https://apps.apple.com/app/globalpay" 
                  className="block text-center bg-gray-900 hover:bg-gray-800 px-2 py-1 rounded text-xs transition-colors"
                >
                  App Store
                </a>
                <a 
                  href="https://play.google.com/store/apps/details?id=com.globalpay.app" 
                  className="block text-center bg-gray-900 hover:bg-gray-800 px-2 py-1 rounded text-xs transition-colors"
                >
                  Google Play
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-bold mb-6">
              Security <span className="text-blue-400">Center</span>
            </h1>
            <p className="text-xl text-purple-200 mb-8 max-w-4xl mx-auto">
              Bank-grade security infrastructure protecting your funds and data. 
              Multi-layer protection with AES-256 encryption, biometric authentication, 
              and real-time fraud monitoring.
            </p>
            <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-full px-8 py-3 inline-block">
              <span className="text-lg font-bold">SOC 2 Type II • ISO 27001 • PCI DSS Level 1</span>
            </div>
          </div>

          {/* Security Layers */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center mb-12">Multi-Layer Security</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-purple-800 bg-opacity-60 rounded-lg p-8 backdrop-blur-sm border border-purple-600 text-center">
                <Lock className="text-green-400 text-5xl mb-4 mx-auto" />
                <h3 className="text-2xl font-bold mb-4">AES-256 Encryption</h3>
                <p className="text-purple-200">
                  Military-grade encryption protects all data at rest and in transit. 
                  Same encryption used by banks and government agencies.
                </p>
              </div>

              <div className="bg-purple-800 bg-opacity-60 rounded-lg p-8 backdrop-blur-sm border border-purple-600 text-center">
                <Key className="text-blue-400 text-5xl mb-4 mx-auto" />
                <h3 className="text-2xl font-bold mb-4">Multi-Factor Authentication</h3>
                <p className="text-purple-200">
                  Biometric verification (Face ID/Touch ID), SMS codes, 
                  and authenticator apps provide multiple layers of access control.
                </p>
              </div>

              <div className="bg-purple-800 bg-opacity-60 rounded-lg p-8 backdrop-blur-sm border border-purple-600 text-center">
                <Server className="text-yellow-400 text-5xl mb-4 mx-auto" />
                <h3 className="text-2xl font-bold mb-4">Cold Storage</h3>
                <p className="text-purple-200">
                  95% of crypto assets stored offline in geographically distributed 
                  cold wallets with multi-signature requirements.
                </p>
              </div>

              <div className="bg-purple-800 bg-opacity-60 rounded-lg p-8 backdrop-blur-sm border border-purple-600 text-center">
                <Eye className="text-purple-400 text-5xl mb-4 mx-auto" />
                <h3 className="text-2xl font-bold mb-4">24/7 Monitoring</h3>
                <p className="text-purple-200">
                  Real-time fraud detection with AI-powered anomaly detection 
                  and immediate alerts for suspicious activities.
                </p>
              </div>

              <div className="bg-purple-800 bg-opacity-60 rounded-lg p-8 backdrop-blur-sm border border-purple-600 text-center">
                <Database className="text-orange-400 text-5xl mb-4 mx-auto" />
                <h3 className="text-2xl font-bold mb-4">Blockchain Security</h3>
                <p className="text-purple-200">
                  Immutable transaction records on distributed ledger. 
                  Smart contracts audited by leading security firms.
                </p>
              </div>

              <div className="bg-purple-800 bg-opacity-60 rounded-lg p-8 backdrop-blur-sm border border-purple-600 text-center">
                <Globe className="text-red-400 text-5xl mb-4 mx-auto" />
                <h3 className="text-2xl font-bold mb-4">DDoS Protection</h3>
                <p className="text-purple-200">
                  Enterprise-grade DDoS mitigation with 99.99% uptime guarantee. 
                  Redundant systems across multiple data centers.
                </p>
              </div>
            </div>
          </div>

          {/* Compliance Certifications */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center mb-12">Certifications & Compliance</h2>
            <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-lg p-8 border border-blue-500">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <Award className="text-blue-400 mx-auto mb-3" size={48} />
                  <h4 className="font-bold text-xl mb-2">SOC 2 Type II</h4>
                  <p className="text-purple-200 text-sm">Audited security controls and procedures</p>
                </div>
                <div className="text-center">
                  <Award className="text-green-400 mx-auto mb-3" size={48} />
                  <h4 className="font-bold text-xl mb-2">ISO 27001</h4>
                  <p className="text-purple-200 text-sm">Information security management certified</p>
                </div>
                <div className="text-center">
                  <Award className="text-purple-400 mx-auto mb-3" size={48} />
                  <h4 className="font-bold text-xl mb-2">PCI DSS Level 1</h4>
                  <p className="text-purple-200 text-sm">Highest payment card security standard</p>
                </div>
              </div>
            </div>
          </div>

          {/* Security Best Practices */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center mb-12">Protect Your Account</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-green-900 bg-opacity-50 rounded-lg p-6 border border-green-500">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <CheckCircle className="text-green-400 mr-3" size={28} />
                  Do This
                </h3>
                <ul className="space-y-3 text-purple-200">
                  <li className="flex items-start">
                    <CheckCircle size={20} className="text-green-400 mr-3 mt-1 flex-shrink-0" />
                    <span>Enable two-factor authentication on your account</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={20} className="text-green-400 mr-3 mt-1 flex-shrink-0" />
                    <span>Use a strong, unique password with 12+ characters</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={20} className="text-green-400 mr-3 mt-1 flex-shrink-0" />
                    <span>Verify email addresses before clicking links</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={20} className="text-green-400 mr-3 mt-1 flex-shrink-0" />
                    <span>Keep your app and OS updated</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={20} className="text-green-400 mr-3 mt-1 flex-shrink-0" />
                    <span>Monitor account activity regularly</span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-900 bg-opacity-50 rounded-lg p-6 border border-red-500">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <AlertTriangle className="text-red-400 mr-3" size={28} />
                  Avoid This
                </h3>
                <ul className="space-y-3 text-purple-200">
                  <li className="flex items-start">
                    <AlertTriangle size={20} className="text-red-400 mr-3 mt-1 flex-shrink-0" />
                    <span>Never share your password or PIN with anyone</span>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle size={20} className="text-red-400 mr-3 mt-1 flex-shrink-0" />
                    <span>Don't use public Wi-Fi for financial transactions</span>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle size={20} className="text-red-400 mr-3 mt-1 flex-shrink-0" />
                    <span>Never respond to unsolicited requests for information</span>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle size={20} className="text-red-400 mr-3 mt-1 flex-shrink-0" />
                    <span>Avoid clicking suspicious links in emails or texts</span>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle size={20} className="text-red-400 mr-3 mt-1 flex-shrink-0" />
                    <span>Don't save passwords in your browser</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Report Security Issue */}
          <div className="bg-gradient-to-r from-red-900 to-purple-900 rounded-lg p-8 border border-red-500 text-center">
            <h2 className="text-3xl font-bold mb-6">Report a Security Issue</h2>
            <p className="text-xl text-purple-200 mb-8">
              Found a vulnerability? We take security seriously and appreciate responsible disclosure.
            </p>
            <div className="flex justify-center space-x-6">
              <a 
                href="mailto:security@globalpay.com"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105"
              >
                Report Vulnerability
              </a>
              <Link 
                to="/help-center"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105"
              >
                Security FAQ
              </Link>
            </div>
            <p className="text-sm text-purple-300 mt-4">Bug bounty program available for verified security researchers</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black bg-opacity-50 mt-16 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-lg mb-4">Services</h4>
              <ul className="space-y-2 text-purple-300">
                {menuItems.Services.map(item => (
                  <li key={item.name}>
                    <Link to={item.path} className="hover:text-white transition-colors">{item.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Company</h4>
              <ul className="space-y-2 text-purple-300">
                {menuItems.Company.map(item => (
                  <li key={item.name}>
                    <Link to={item.path} className="hover:text-white transition-colors">{item.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Support</h4>
              <ul className="space-y-2 text-purple-300">
                {menuItems.Support.map(item => (
                  <li key={item.name}>
                    <Link to={item.path} className="hover:text-white transition-colors">{item.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Legal</h4>
              <ul className="space-y-2 text-purple-300">
                {menuItems.Legal.map(item => (
                  <li key={item.name}>
                    <Link to={item.path} className="hover:text-white transition-colors">{item.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="border-t border-purple-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-3 mb-4 md:mb-0">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <span className="text-purple-900 font-bold text-sm">GP</span>
                </div>
                <div>
                  <span className="text-white font-bold">GlobalPay</span>
                  <p className="text-xs text-purple-400">GlobalPay is a financial technology platform. GlobalPay is not an FDIC-insured Bank or depositary</p>
                  <p className="text-xs text-purple-400">taking institution. In the USA, banking services for the placement of deposits where the customers'</p>
                  <p className="text-xs text-purple-400">funds may be placed are provided by BankProv, Member FDIC. Deposit insurance coverage only</p>
                  <p className="text-xs text-purple-400">protects against the failure of an FDIC insured depository institution. Crypto assets and</p>
                  <p className="text-xs text-purple-400">non-bank digital wallet are not insured by the FDIC, are not deposits, and may lose value.</p>
                </div>
              </div>
              
              <div className="text-center md:text-right">
                <p className="text-purple-300 text-sm">
                  © 2025 GlobalPay Inc. All rights reserved.
                </p>
                <p className="text-purple-400 text-xs mt-1">
                  Licensed by FinCEN • Regulated by NMLS • Member FDIC
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <SignupModal 
        showSignupModal={showSignupModal}
        setShowSignupModal={setShowSignupModal}
        signupStep={signupStep}
        setSignupStep={setSignupStep}
        signupData={signupData}
        setSignupData={setSignupData}
        countries={countries}
        generateAuthCode={generateAuthCode}
        setShowLandingPage={setShowLandingPage}
      />
      <LoginModal 
        showLoginModal={showLoginModal}
        setShowLoginModal={setShowLoginModal}
        loginStep={loginStep}
        setLoginStep={setLoginStep}
        loginData={loginData}
        setLoginData={setLoginData}
        generateAuthCode={generateAuthCode}
        setShowLandingPage={setShowLandingPage}
      />
      <ActivateCardModal 
        showActivateCardModal={showActivateCardModal}
        setShowActivateCardModal={setShowActivateCardModal}
        activateData={activateData}
        setActivateData={setActivateData}
        generateAuthCode={generateAuthCode}
        user={null}
        signupData={signupData}
        loginData={loginData}
        setShowLandingPage={setShowLandingPage}
      />
    </div>
  );
};

export default SecurityPage;