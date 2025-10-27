import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Download, Send, Globe, Clock, Shield, DollarSign, Zap, Users, CheckCircle, ArrowRight, TrendingUp, Award, Lock, Smartphone, CreditCard, Target, Star, MapPin, Mail, PhoneCall, ChevronDown } from 'lucide-react';
import SignupModal from '../SignupModal';
import LoginModal from '../LoginModal';
import ActivateCardModal from '../ActivateCardModal';

const SendMoneyPage = () => {
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
    if (value === false) {
      // Store authentication state in sessionStorage
      sessionStorage.setItem('isAuthenticated', 'true');
      // Navigate to the main app dashboard
      window.location.href = '/';
    }
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
                            item.path === '/send-money' ? 'text-white font-medium bg-purple-700' : 'text-gray-200 hover:text-white'
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-600 rounded-full mb-6">
            <Send size={40} />
          </div>
          <h1 className="text-6xl font-bold mb-6">
            Send Money to<br />
            <span className="text-blue-400">180+ Countries</span>
            <br />
            <span className="text-green-400">Instantly & Securely</span>
          </h1>
          <p className="text-xl text-purple-200 mb-8 max-w-4xl mx-auto">
            Revolutionary blockchain-powered international payments with bank-grade security.
            Save up to 97% on fees with flat $2 transfers worldwide.
          </p>

          <div className="flex justify-center space-x-6 mb-8">
            <button 
              onClick={() => setShowSignupModal(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Get Started Free
            </button>
            
            <button 
              onClick={() => setShowLoginModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Login Now
            </button>
          </div>
        </div>

        {/* Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-purple-800 bg-opacity-50 rounded-lg p-8 backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
            <DollarSign className="text-green-400 mb-4" size={48} />
            <h3 className="text-2xl font-bold mb-3">Flat $2 Fee</h3>
            <p className="text-purple-200">
              Send any amount internationally for just $2. No hidden fees, no percentage cuts. Save up to 97% compared to traditional banks.
            </p>
          </div>

          <div className="bg-purple-800 bg-opacity-50 rounded-lg p-8 backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
            <Clock className="text-blue-400 mb-4" size={48} />
            <h3 className="text-2xl font-bold mb-3">Instant Transfers</h3>
            <p className="text-purple-200">
              Money arrives in minutes, not days. Real-time blockchain technology ensures your funds reach recipients instantly.
            </p>
          </div>

          <div className="bg-purple-800 bg-opacity-50 rounded-lg p-8 backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
            <Globe className="text-purple-400 mb-4" size={48} />
            <h3 className="text-2xl font-bold mb-3">180+ Countries</h3>
            <p className="text-purple-200">
              Send money to virtually anywhere in the world. Support for 150+ currencies and all major payment methods.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: 1, icon: Users, title: 'Sign Up', desc: 'Create your free account in under 2 minutes' },
              { step: 2, icon: Target, title: 'Enter Details', desc: 'Add recipient info and amount to send' },
              { step: 3, icon: Lock, title: 'Verify & Pay', desc: 'Secure verification with instant payment' },
              { step: 4, icon: CheckCircle, title: 'Done', desc: 'Recipient receives funds instantly' }
            ].map((item, idx) => (
              <div key={idx} className="bg-purple-800 bg-opacity-60 rounded-lg p-6 text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon size={32} />
                </div>
                <div className="text-3xl font-bold text-green-400 mb-2">Step {item.step}</div>
                <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                <p className="text-purple-300 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose GlobalPay */}
        <div className="bg-blue-900 bg-opacity-50 rounded-lg p-12 mb-16">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose GlobalPay?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <Shield className="flex-shrink-0 text-green-400" size={32} />
              <div>
                <h4 className="text-xl font-bold mb-2">Bank-Level Security</h4>
                <p className="text-purple-200">AES-256 encryption, 2FA, biometric authentication, and FDIC insurance protection</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Zap className="flex-shrink-0 text-yellow-400" size={32} />
              <div>
                <h4 className="text-xl font-bold mb-2">Lightning Fast</h4>
                <p className="text-purple-200">Blockchain technology enables instant cross-border transfers 24/7/365</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Award className="flex-shrink-0 text-purple-400" size={32} />
              <div>
                <h4 className="text-xl font-bold mb-2">Fully Licensed</h4>
                <p className="text-purple-200">Regulated by FinCEN, licensed in all 50 US states, BitLicense holder</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Star className="flex-shrink-0 text-blue-400" size={32} />
              <div>
                <h4 className="text-xl font-bold mb-2">4.9★ Rated</h4>
                <p className="text-purple-200">Trusted by millions with over 100,000 5-star reviews worldwide</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Comparison */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-12">Transparent Pricing</h2>
          <div className="bg-gradient-to-r from-green-900 to-blue-900 rounded-lg p-8 max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-2xl mb-4">Send $1,000 from USA to India</p>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-purple-900 bg-opacity-60 p-4 rounded">
                <span className="font-bold">Traditional Bank</span>
                <span className="text-red-400">$45 fee</span>
              </div>
              <div className="flex justify-between items-center bg-purple-900 bg-opacity-60 p-4 rounded">
                <span className="font-bold">MoneyGram</span>
                <span className="text-red-400">$35 fee</span>
              </div>
              <div className="flex justify-between items-center bg-purple-900 bg-opacity-60 p-4 rounded">
                <span className="font-bold">Western Union</span>
                <span className="text-red-400">$30 fee</span>
              </div>
              <div className="flex justify-between items-center bg-green-600 p-4 rounded shadow-lg">
                <span className="font-bold text-xl">GlobalPay</span>
                <span className="text-white text-xl font-bold">$2 fee</span>
              </div>
            </div>
            <div className="text-center mt-6">
              <p className="text-green-400 font-bold text-2xl">Save $43 per transfer!</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-12 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Saving?</h2>
          <p className="text-xl mb-8">Join millions sending money smarter with GlobalPay</p>
          <button 
            onClick={() => setShowSignupModal(true)}
            className="bg-white text-purple-900 px-8 py-4 rounded-lg text-xl font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
          >
            Create Free Account <ArrowRight className="inline ml-2" />
          </button>
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

export default SendMoneyPage;