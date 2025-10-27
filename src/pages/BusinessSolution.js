import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Download, Building, Zap, Globe, DollarSign, TrendingUp, Users, Shield, Award, CheckCircle, Code, Layers, Database, Clock, Target, BarChart, Briefcase, Settings, Lock, Mail, PhoneCall, ChevronDown } from 'lucide-react';
import SignupModal from '../SignupModal';
import LoginModal from '../LoginModal';
import ActivateCardModal from '../ActivateCardModal';

const BusinessSolutionsPage = () => {
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

        {/* Hamburger Dropdown Menu - Contains all 16 pages organized by category */}
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
                            item.path === '/business-solutions' ? 'text-white font-medium bg-purple-700' : 'text-gray-200 hover:text-white'
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
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-full mb-6">
            <Building size={40} />
          </div>
          <h1 className="text-6xl font-bold mb-6">
            Enterprise Payment Solutions
            <br />
            <span className="text-blue-400">For Modern Businesses</span>
          </h1>
          <p className="text-xl text-purple-200 mb-8 max-w-4xl mx-auto">
            Streamline your business payments with our comprehensive suite of financial tools. Accept crypto, automate payroll, integrate our API, and create custom smart contracts.
          </p>

          <div className="flex justify-center space-x-6">
            <button 
              onClick={() => setShowSignupModal(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Get Started
            </button>
            
            <Link 
              to="/contact-us"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg inline-block"
            >
              Contact Sales
            </Link>
          </div>
        </div>

        {/* Business Solutions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-lg p-8 border-2 border-blue-500">
            <Code className="text-blue-400 mb-4" size={48} />
            <h3 className="text-3xl font-bold mb-4">API Integration</h3>
            <p className="text-purple-200 mb-6">
              Integrate GlobalPay's payment infrastructure directly into your platform with our developer-friendly RESTful API.
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <CheckCircle className="mr-3 flex-shrink-0 text-green-400 mt-1" size={20} />
                <span>Accept payments in 150+ currencies</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="mr-3 flex-shrink-0 text-green-400 mt-1" size={20} />
                <span>Cryptocurrency payment processing</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="mr-3 flex-shrink-0 text-green-400 mt-1" size={20} />
                <span>Real-time transaction webhooks</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="mr-3 flex-shrink-0 text-green-400 mt-1" size={20} />
                <span>Comprehensive documentation</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="mr-3 flex-shrink-0 text-green-400 mt-1" size={20} />
                <span>24/7 developer support</span>
              </li>
            </ul>
            <Link to="/api-documentation" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold inline-block transition-all">
              View API Docs
            </Link>
          </div>

          <div className="bg-gradient-to-br from-purple-900 to-pink-900 rounded-lg p-8 border-2 border-purple-500">
            <Layers className="text-purple-400 mb-4" size={48} />
            <h3 className="text-3xl font-bold mb-4">Smart Contracts</h3>
            <p className="text-purple-200 mb-6">
              Custom blockchain smart contract development for your business automation needs.
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <CheckCircle className="mr-3 flex-shrink-0 text-green-400 mt-1" size={20} />
                <span>Automated payment escrow</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="mr-3 flex-shrink-0 text-green-400 mt-1" size={20} />
                <span>Multi-signature wallets</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="mr-3 flex-shrink-0 text-green-400 mt-1" size={20} />
                <span>Token creation & management</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="mr-3 flex-shrink-0 text-green-400 mt-1" size={20} />
                <span>DeFi protocol integration</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="mr-3 flex-shrink-0 text-green-400 mt-1" size={20} />
                <span>Security audits included</span>
              </li>
            </ul>
            <Link to="/contact-us" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-bold inline-block transition-all">
              Request Quote
            </Link>
          </div>

          <div className="bg-gradient-to-br from-green-900 to-teal-900 rounded-lg p-8 border-2 border-green-500">
            <Users className="text-green-400 mb-4" size={48} />
            <h3 className="text-3xl font-bold mb-4">Batch Payments</h3>
            <p className="text-purple-200 mb-6">
              Pay hundreds or thousands of employees, contractors, or vendors with a single transaction.
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <CheckCircle className="mr-3 flex-shrink-0 text-green-400 mt-1" size={20} />
                <span>Automated payroll processing</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="mr-3 flex-shrink-0 text-green-400 mt-1" size={20} />
                <span>International contractor payments</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="mr-3 flex-shrink-0 text-green-400 mt-1" size={20} />
                <span>Scheduled recurring payments</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="mr-3 flex-shrink-0 text-green-400 mt-1" size={20} />
                <span>CSV file upload support</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="mr-3 flex-shrink-0 text-green-400 mt-1" size={20} />
                <span>Save up to 95% on fees</span>
              </li>
            </ul>
            <button 
              onClick={() => setShowSignupModal(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold transition-all"
            >
              Start Free Trial
            </button>
          </div>

          <div className="bg-gradient-to-br from-orange-900 to-red-900 rounded-lg p-8 border-2 border-orange-500">
            <BarChart className="text-orange-400 mb-4" size={48} />
            <h3 className="text-3xl font-bold mb-4">Crypto Merchant Services</h3>
            <p className="text-purple-200 mb-6">
              Accept cryptocurrency payments from customers worldwide with instant fiat conversion.
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <CheckCircle className="mr-3 flex-shrink-0 text-green-400 mt-1" size={20} />
                <span>Accept 50+ cryptocurrencies</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="mr-3 flex-shrink-0 text-green-400 mt-1" size={20} />
                <span>Instant fiat settlement</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="mr-3 flex-shrink-0 text-green-400 mt-1" size={20} />
                <span>No chargeback risk</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="mr-3 flex-shrink-0 text-green-400 mt-1" size={20} />
                <span>Lower fees than credit cards</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="mr-3 flex-shrink-0 text-green-400 mt-1" size={20} />
                <span>Easy e-commerce integration</span>
              </li>
            </ul>
            <button 
              onClick={() => setShowSignupModal(true)}
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-bold transition-all"
            >
              Get Started
            </button>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-blue-900 bg-opacity-50 rounded-lg p-12 mb-16">
          <h2 className="text-4xl font-bold text-center mb-12">Why Businesses Choose GlobalPay</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <DollarSign className="mx-auto mb-4 text-green-400" size={48} />
              <h4 className="text-xl font-bold mb-3">Lower Costs</h4>
              <p className="text-purple-200">Save up to 97% on international payments compared to traditional banking</p>
            </div>
            <div className="text-center">
              <Zap className="mx-auto mb-4 text-yellow-400" size={48} />
              <h4 className="text-xl font-bold mb-3">Faster Settlements</h4>
              <p className="text-purple-200">Instant transfers worldwide vs 3-5 business days with banks</p>
            </div>
            <div className="text-center">
              <Globe className="mx-auto mb-4 text-blue-400" size={48} />
              <h4 className="text-xl font-bold mb-3">Global Reach</h4>
              <p className="text-purple-200">Accept payments in 180+ countries with 150+ currencies</p>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-12">Transparent Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-purple-800 bg-opacity-60 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Starter</h3>
              <div className="text-4xl font-bold mb-2">Free</div>
              <p className="text-purple-300 mb-6">Get started today</p>
              <ul className="text-left space-y-3 mb-8">
                <li className="flex items-start">
                  <CheckCircle className="mr-2 flex-shrink-0 text-green-400 mt-1" size={16} />
                  <span className="text-sm">$10,000/month volume</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-2 flex-shrink-0 text-green-400 mt-1" size={16} />
                  <span className="text-sm">API access</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-2 flex-shrink-0 text-green-400 mt-1" size={16} />
                  <span className="text-sm">Email support</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-2 flex-shrink-0 text-green-400 mt-1" size={16} />
                  <span className="text-sm">1.5% crypto fee</span>
                </li>
              </ul>
              <button 
                onClick={() => setShowSignupModal(true)}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-bold"
              >
                Start Free
              </button>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg p-8 text-center border-2 border-yellow-400 transform scale-105">
              <div className="bg-yellow-400 text-purple-900 font-bold text-xs px-3 py-1 rounded-full inline-block mb-3">
                MOST POPULAR
              </div>
              <h3 className="text-2xl font-bold mb-4">Business</h3>
              <div className="text-4xl font-bold mb-2">$299<span className="text-lg">/mo</span></div>
              <p className="text-purple-200 mb-6">For growing companies</p>
              <ul className="text-left space-y-3 mb-8">
                <li className="flex items-start">
                  <CheckCircle className="mr-2 flex-shrink-0 text-green-400 mt-1" size={16} />
                  <span className="text-sm">$500,000/month volume</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-2 flex-shrink-0 text-green-400 mt-1" size={16} />
                  <span className="text-sm">Priority API access</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-2 flex-shrink-0 text-green-400 mt-1" size={16} />
                  <span className="text-sm">24/7 phone support</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-2 flex-shrink-0 text-green-400 mt-1" size={16} />
                  <span className="text-sm">0.9% crypto fee</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-2 flex-shrink-0 text-green-400 mt-1" size={16} />
                  <span className="text-sm">Dedicated account manager</span>
                </li>
              </ul>
              <button 
                onClick={() => setShowSignupModal(true)}
                className="w-full bg-white text-purple-900 py-3 rounded-lg font-bold hover:bg-gray-100"
              >
                Start Trial
              </button>
            </div>

            <div className="bg-purple-800 bg-opacity-60 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Enterprise</h3>
              <div className="text-4xl font-bold mb-2">Custom</div>
              <p className="text-purple-300 mb-6">Tailored solutions</p>
              <ul className="text-left space-y-3 mb-8">
                <li className="flex items-start">
                  <CheckCircle className="mr-2 flex-shrink-0 text-green-400 mt-1" size={16} />
                  <span className="text-sm">Unlimited volume</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-2 flex-shrink-0 text-green-400 mt-1" size={16} />
                  <span className="text-sm">Custom API solutions</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-2 flex-shrink-0 text-green-400 mt-1" size={16} />
                  <span className="text-sm">White-label options</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-2 flex-shrink-0 text-green-400 mt-1" size={16} />
                  <span className="text-sm">Custom fees</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-2 flex-shrink-0 text-green-400 mt-1" size={16} />
                  <span className="text-sm">Smart contract development</span>
                </li>
              </ul>
              <Link 
                to="/contact-us"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold inline-block"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-12 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Business Payments?</h2>
          <p className="text-xl mb-8">Join thousands of businesses using GlobalPay</p>
          <div className="flex justify-center space-x-4">
            <button 
              onClick={() => setShowSignupModal(true)}
              className="bg-white text-purple-900 px-8 py-4 rounded-lg text-xl font-bold hover:bg-gray-100 transition-all"
            >
              Get Started Free
            </button>
            <Link 
              to="/contact-us"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-xl font-bold transition-all inline-block"
            >
              Schedule Demo
            </Link>
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

export default BusinessSolutionsPage;