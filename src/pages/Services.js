import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Award, Users, Globe, DollarSign, Zap, Building, FileText, PhoneCall, Mail, CheckCircle, Layers, Database, Lock, Star, ArrowRight, ChevronRight, Menu, X, Download } from 'lucide-react';
import SignupModal from '../SignupModal';
import LoginModal from '../LoginModal';
import ActivateCardModal from '../ActivateCardModal';

const ServicesPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const generateAuthCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const setShowLandingPage = (value) => {
    // This would be handled by parent component or router in a real app
    console.log('Navigation would occur here:', value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white">
      {/* Header */}
      <header className="p-6 border-b border-purple-700">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-purple-900 font-bold">GP</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">GlobalPay</h1>
              <p className="text-sm text-purple-300">Fully Licensed & Regulated</p>
            </div>
          </Link>

          {/* Desktop Navigation and Buttons */}
          <div className="hidden lg:flex items-center space-x-8">
            <nav className="flex items-center space-x-6">
              <Link to="/" className="text-purple-300 hover:text-white">Home</Link>
              <Link to="/services" className="text-white font-medium">Services</Link>
              <Link to="/company" className="text-purple-300 hover:text-white">Company</Link>
              <Link to="/support" className="text-purple-300 hover:text-white">Support</Link>
              <Link to="/legal" className="text-purple-300 hover:text-white">Legal</Link>
            </nav>
            
            <div className="flex space-x-3">
              <button 
                onClick={() => setShowSignupModal(true)}
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-medium transition-all duration-300"
              >
                Sign Up
              </button>
              <button 
                onClick={() => setShowLoginModal(true)}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium transition-all duration-300"
              >
                Login
              </button>
              <button 
                onClick={() => setShowActivateCardModal(true)}
                className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-lg font-medium transition-all duration-300"
              >
                Activate Card
              </button>
              
              {/* Mobile App Download Dropdown */}
              <div className="relative group">
                <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2">
                  <Download size={16} />
                  <span>App</span>
                </button>
                
                {/* Dropdown */}
                <div className="absolute right-0 mt-2 w-64 bg-purple-800 rounded-lg shadow-xl border border-purple-600 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="p-4">
                    <h4 className="text-white font-bold mb-3 text-center">Download Now</h4>
                    
                    <a href="https://apps.apple.com/app/globalpay" className="flex items-center space-x-3 bg-gray-900 hover:bg-gray-800 text-white p-3 rounded-lg mb-2 transition-colors">
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                      </svg>
                      <div>
                        <div className="text-xs">Download on the</div>
                        <div className="text-sm font-bold">App Store</div>
                      </div>
                    </a>
                    
                    <a href="https://play.google.com/store/apps/details?id=com.globalpay.app" className="flex items-center space-x-3 bg-gray-900 hover:bg-gray-800 text-white p-3 rounded-lg transition-colors">
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                      </svg>
                      <div>
                        <div className="text-xs">Get it on</div>
                        <div className="text-sm font-bold">Google Play</div>
                      </div>
                    </a>
                    
                    <p className="text-purple-300 text-xs text-center mt-3">Available on iOS 14+ and Android 8+</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Hamburger Menu */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-white hover:text-purple-300 transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-purple-700">
            <nav className="flex flex-col space-y-4 mt-4">
              <Link to="/" className="text-purple-300 hover:text-white" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link to="/services" className="text-white font-medium" onClick={() => setIsMenuOpen(false)}>Services</Link>
              <Link to="/company" className="text-purple-300 hover:text-white" onClick={() => setIsMenuOpen(false)}>Company</Link>
              <Link to="/support" className="text-purple-300 hover:text-white" onClick={() => setIsMenuOpen(false)}>Support</Link>
              <Link to="/legal" className="text-purple-300 hover:text-white" onClick={() => setIsMenuOpen(false)}>Legal</Link>
              
              {/* Mobile Action Buttons */}
              <div className="flex flex-col space-y-3 mt-6 pt-4 border-t border-purple-600">
                <button 
                  onClick={() => {
                    setShowSignupModal(true);
                    setIsMenuOpen(false);
                  }}
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-medium"
                >
                  Sign Up
                </button>
                <button 
                  onClick={() => {
                    setShowLoginModal(true);
                    setIsMenuOpen(false);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium"
                >
                  Login
                </button>
                <button 
                  onClick={() => {
                    setShowActivateCardModal(true);
                    setIsMenuOpen(false);
                  }}
                  className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-lg font-medium"
                >
                  Activate Card
                </button>
                
                {/* Mobile App Download */}
                <div className="bg-purple-700 rounded-lg p-4">
                  <h4 className="text-white font-bold mb-3 text-center">Download App</h4>
                  
                  <a href="https://apps.apple.com/app/globalpay" className="flex items-center space-x-3 bg-gray-900 hover:bg-gray-800 text-white p-3 rounded-lg mb-2">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                    <div>
                      <div className="text-xs">Download on the</div>
                      <div className="text-sm font-bold">App Store</div>
                    </div>
                  </a>
                  
                  <a href="https://play.google.com/store/apps/details?id=com.globalpay.app" className="flex items-center space-x-3 bg-gray-900 hover:bg-gray-800 text-white p-3 rounded-lg">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                    </svg>
                    <div>
                      <div className="text-xs">Get it on</div>
                      <div className="text-sm font-bold">Google Play</div>
                    </div>
                  </a>
                  
                  <p className="text-purple-300 text-xs text-center mt-3">iOS 14+ and Android 8+</p>
                </div>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6">
              Revolutionary Financial <span className="text-blue-400">Services</span>
            </h1>
            <p className="text-xl text-purple-200 max-w-4xl mx-auto">
              Experience the future of international payments with blockchain-powered solutions 
              designed for individuals, businesses, and the unbanked population worldwide.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-purple-800 bg-opacity-60 rounded-lg p-8 backdrop-blur-sm border border-purple-600 hover:border-blue-500 transition-all duration-300">
              <div className="flex items-center mb-6">
                <DollarSign className="text-green-400 mr-4" size={40} />
                <h3 className="text-2xl font-bold">Send Money Globally</h3>
              </div>
              <p className="text-purple-200 mb-6">
                Transfer money to 180+ countries instantly with bank-grade security. 
                Flat $2 fee per transaction saves you up to 90% compared to traditional services.
              </p>
              <ul className="space-y-2 text-purple-200">
                <li className="flex items-center"><CheckCircle size={16} className="text-green-400 mr-2" />Instant settlement in under 30 seconds</li>
                <li className="flex items-center"><CheckCircle size={16} className="text-green-400 mr-2" />Real-time exchange rates</li>
                <li className="flex items-center"><CheckCircle size={16} className="text-green-400 mr-2" />Mobile money integration</li>
                <li className="flex items-center"><CheckCircle size={16} className="text-green-400 mr-2" />24/7 customer support</li>
              </ul>
            </div>

            <div className="bg-purple-800 bg-opacity-60 rounded-lg p-8 backdrop-blur-sm border border-purple-600 hover:border-orange-500 transition-all duration-300">
              <div className="flex items-center mb-6">
                <Building className="text-orange-400 mr-4" size={40} />
                <h3 className="text-2xl font-bold">Crypto Gift Cards</h3>
              </div>
              <p className="text-purple-200 mb-6">
                Revolutionary crypto access through physical gift cards available at thousands 
                of retail locations. Perfect for the unbanked population.
              </p>
              <ul className="space-y-2 text-purple-200">
                <li className="flex items-center"><CheckCircle size={16} className="text-orange-400 mr-2" />Available at major retailers nationwide</li>
                <li className="flex items-center"><CheckCircle size={16} className="text-orange-400 mr-2" />$50, $100, $200, $500 denominations</li>
                <li className="flex items-center"><CheckCircle size={16} className="text-orange-400 mr-2" />No bank account required</li>
                <li className="flex items-center"><CheckCircle size={16} className="text-orange-400 mr-2" />Instant Bitcoin conversion</li>
              </ul>
            </div>

            <div className="bg-purple-800 bg-opacity-60 rounded-lg p-8 backdrop-blur-sm border border-purple-600 hover:border-blue-500 transition-all duration-300">
              <div className="flex items-center mb-6">
                <Layers className="text-blue-400 mr-4" size={40} />
                <h3 className="text-2xl font-bold">Digital Wallets</h3>
              </div>
              <p className="text-purple-200 mb-6">
                Secure, multi-currency digital wallets supporting Bitcoin, Ethereum, USD Coin, 
                and traditional fiat currencies with advanced security features.
              </p>
              <ul className="space-y-2 text-purple-200">
                <li className="flex items-center"><CheckCircle size={16} className="text-blue-400 mr-2" />Multi-signature security</li>
                <li className="flex items-center"><CheckCircle size={16} className="text-blue-400 mr-2" />Hardware wallet integration</li>
                <li className="flex items-center"><CheckCircle size={16} className="text-blue-400 mr-2" />DeFi protocol access</li>
                <li className="flex items-center"><CheckCircle size={16} className="text-blue-400 mr-2" />Portfolio analytics</li>
              </ul>
            </div>

            <div className="bg-purple-800 bg-opacity-60 rounded-lg p-8 backdrop-blur-sm border border-purple-600 hover:border-green-500 transition-all duration-300">
              <div className="flex items-center mb-6">
                <Users className="text-green-400 mr-4" size={40} />
                <h3 className="text-2xl font-bold">Business Solutions</h3>
              </div>
              <p className="text-purple-200 mb-6">
                Enterprise-grade payment infrastructure for businesses of all sizes. 
                API integration, bulk payments, and treasury management.
              </p>
              <ul className="space-y-2 text-purple-200">
                <li className="flex items-center"><CheckCircle size={16} className="text-green-400 mr-2" />RESTful API integration</li>
                <li className="flex items-center"><CheckCircle size={16} className="text-green-400 mr-2" />Bulk payment processing</li>
                <li className="flex items-center"><CheckCircle size={16} className="text-green-400 mr-2" />White-label solutions</li>
                <li className="flex items-center"><CheckCircle size={16} className="text-green-400 mr-2" />Enterprise security</li>
              </ul>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-blue-900 to-purple-900 rounded-lg p-8 border border-blue-500">
            <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Financial Experience?</h3>
            <p className="text-xl text-purple-200 mb-6">Join millions of users who trust GlobalPay for their financial needs.</p>
            <button 
              onClick={() => setShowSignupModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 mr-4"
            >
              Get Started Free
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-purple-900 transition-all duration-300">
              Contact Sales
            </button>      
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
                <li><Link to="/services" className="hover:text-white">Send Money</Link></li>
                <li><Link to="/services" className="hover:text-white">Crypto Cards</Link></li>
                <li><Link to="/services" className="hover:text-white">Digital Wallets</Link></li>
                <li><Link to="/services" className="hover:text-white">Business Solutions</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Company</h4>
              <ul className="space-y-2 text-purple-300">
                <li><Link to="/company" className="hover:text-white">About Us</Link></li>
                <li><Link to="/company" className="hover:text-white">Careers</Link></li>
                <li><Link to="/company" className="hover:text-white">Press</Link></li>
                <li><Link to="/company" className="hover:text-white">Investors</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Support</h4>
              <ul className="space-y-2 text-purple-300">
                <li><Link to="/support" className="hover:text-white">Help Center</Link></li>
                <li><Link to="/support" className="hover:text-white">Contact Us</Link></li>
                <li><Link to="/support" className="hover:text-white">API Documentation</Link></li>
                <li><Link to="/support" className="hover:text-white">Security</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Legal</h4>
              <ul className="space-y-2 text-purple-300">
                <li><Link to="/legal" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link to="/legal" className="hover:text-white">Terms of Service</Link></li>
                <li><Link to="/legal" className="hover:text-white">Compliance</Link></li>
                <li><Link to="/legal" className="hover:text-white">Licenses</Link></li>
              </ul>
            </div>
          </div>
          
          {/* Copyright Section */}
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

export default ServicesPage;