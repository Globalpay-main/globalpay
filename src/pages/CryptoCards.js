import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Download, CreditCard, Shield, Zap, Globe, DollarSign, Smartphone, Lock, Award, Star, TrendingUp, CheckCircle, Users, Eye, Target, Gift, ShoppingCart, Wallet, MapPin, Clock, Mail, PhoneCall, ChevronDown } from 'lucide-react';
import SignupModal from '../SignupModal';
import LoginModal from '../LoginModal';
import ActivateCardModal from '../ActivateCardModal';

const CryptoCardsPage = () => {
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
                            item.path === '/crypto-cards' ? 'text-white font-medium bg-purple-700' : 'text-gray-200 hover:text-white'
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
          <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-600 rounded-full mb-6">
            <CreditCard size={40} />
          </div>
          <h1 className="text-6xl font-bold mb-6">
            <span className="text-orange-400">Crypto Gift Cards</span>
            <br />
            Bringing Crypto to<br />
            <span className="text-green-400">The Unbanked World</span>
          </h1>
          <p className="text-xl text-purple-200 mb-8 max-w-4xl mx-auto">
            Purchase GlobalPay Crypto Cards at 50,000+ retail locations worldwide. No bank account needed. Easy activation. Instant access to cryptocurrency.
          </p>

          <div className="flex justify-center space-x-6 mb-8">
            <button 
              onClick={() => setShowActivateCardModal(true)}
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Activate Your Card
            </button>
            
            <button 
              onClick={() => setShowSignupModal(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Create Account
            </button>
          </div>
        </div>

        {/* Where to Buy */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-12">Available at 50,000+ Locations</h2>
          <div className="bg-gradient-to-r from-orange-900 to-purple-900 rounded-lg p-8 border border-orange-500">
            <p className="text-center text-xl mb-8">Buy GlobalPay Crypto Gift Cards at these retailers:</p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {[
                '7-Eleven',
                'Walmart',
                'Target',
                'CVS',
                'Walgreens',
                'Gas Stations',
                'Starbucks',
                'Staples',
                'Home Depot',
                'Office Depot'
              ].map((store, idx) => (
                <div key={idx} className="bg-white bg-opacity-10 rounded-lg p-4 text-center hover:bg-opacity-20 transition-all">
                  <ShoppingCart className="mx-auto mb-2 text-orange-400" size={32} />
                  <p className="font-bold">{store}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-purple-300 mt-6">+ Many more retail locations worldwide</p>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: 1, icon: ShoppingCart, title: 'Purchase', desc: 'Buy a GlobalPay Crypto Card at any participating retailer' },
              { step: 2, icon: Gift, title: 'Receive Card', desc: 'Get your card with unique activation code' },
              { step: 3, icon: Smartphone, title: 'Activate', desc: 'Activate online or via our mobile app' },
              { step: 4, icon: Wallet, title: 'Use Crypto', desc: 'Access your crypto wallet instantly' }
            ].map((item, idx) => (
              <div key={idx} className="bg-purple-800 bg-opacity-60 rounded-lg p-6 text-center transform hover:scale-105 transition-all">
                <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon size={32} />
                </div>
                <div className="text-3xl font-bold text-orange-400 mb-2">Step {item.step}</div>
                <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                <p className="text-purple-300 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Card Features */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-12">Card Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-purple-800 bg-opacity-50 rounded-lg p-8 backdrop-blur-sm">
              <Lock className="text-green-400 mb-4" size={48} />
              <h3 className="text-2xl font-bold mb-3">Secure Activation</h3>
              <p className="text-purple-200">
                Each card comes with a unique PIN and activation code. Multi-factor authentication ensures only you can access your funds.
              </p>
            </div>

            <div className="bg-purple-800 bg-opacity-50 rounded-lg p-8 backdrop-blur-sm">
              <Globe className="text-blue-400 mb-4" size={48} />
              <h3 className="text-2xl font-bold mb-3">No Bank Required</h3>
              <p className="text-purple-200">
                Perfect for the unbanked population. No credit check, no bank account, no hassle. Just cash and you're ready to go.
              </p>
            </div>

            <div className="bg-purple-800 bg-opacity-50 rounded-lg p-8 backdrop-blur-sm">
              <Zap className="text-yellow-400 mb-4" size={48} />
              <h3 className="text-2xl font-bold mb-3">Instant Access</h3>
              <p className="text-purple-200">
                Once activated, your crypto wallet is ready immediately. Buy, sell, send, or receive cryptocurrency right away.
              </p>
            </div>
          </div>
        </div>

        {/* Card Denominations */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-12">Choose Your Amount</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { amount: '$25', popular: false },
              { amount: '$50', popular: true },
              { amount: '$100', popular: true },
              { amount: '$500', popular: false }
            ].map((card, idx) => (
              <div key={idx} className={`rounded-lg p-8 text-center transform hover:scale-105 transition-all ${card.popular ? 'bg-gradient-to-br from-orange-600 to-purple-600 border-2 border-yellow-400' : 'bg-purple-800 bg-opacity-60'}`}>
                {card.popular && (
                  <div className="bg-yellow-400 text-purple-900 font-bold text-xs px-3 py-1 rounded-full inline-block mb-3">
                    MOST POPULAR
                  </div>
                )}
                <div className="text-5xl font-bold mb-4">{card.amount}</div>
                <p className="text-purple-200 text-sm mb-4">Starting value</p>
                <ul className="text-left text-sm space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 flex-shrink-0 text-green-400 mt-1" size={16} />
                    <span>Instant activation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 flex-shrink-0 text-green-400 mt-1" size={16} />
                    <span>Full crypto access</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 flex-shrink-0 text-green-400 mt-1" size={16} />
                    <span>No expiration</span>
                  </li>
                </ul>
                <button 
                  onClick={() => setShowActivateCardModal(true)}
                  className="w-full bg-white text-purple-900 py-2 rounded-lg font-bold hover:bg-gray-100 transition-colors"
                >
                  Activate Card
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-blue-900 bg-opacity-50 rounded-lg p-12 mb-16">
          <h2 className="text-4xl font-bold text-center mb-12">Why Crypto Gift Cards?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <Users className="flex-shrink-0 text-green-400" size={32} />
              <div>
                <h4 className="text-xl font-bold mb-2">Financial Inclusion</h4>
                <p className="text-purple-200">Brings cryptocurrency access to the 1.7 billion unbanked adults worldwide</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Gift className="flex-shrink-0 text-orange-400" size={32} />
              <div>
                <h4 className="text-xl font-bold mb-2">Perfect Gift</h4>
                <p className="text-purple-200">Introduce friends and family to crypto with a tangible, easy-to-use gift card</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Shield className="flex-shrink-0 text-blue-400" size={32} />
              <div>
                <h4 className="text-xl font-bold mb-2">Privacy Focused</h4>
                <p className="text-purple-200">Purchase with cash for maximum privacy while maintaining full security</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <MapPin className="flex-shrink-0 text-purple-400" size={32} />
              <div>
                <h4 className="text-xl font-bold mb-2">Worldwide Availability</h4>
                <p className="text-purple-200">50,000+ locations across 180+ countries and growing</p>
              </div>
            </div>
          </div>
        </div>

        {/* Activation Process */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-12">Easy Activation in 3 Steps</h2>
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-purple-800 to-blue-800 rounded-lg p-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Scratch to Reveal</h4>
                  <p className="text-purple-200">Scratch off the protective coating on the back of your card to reveal your unique 16-digit card number and 6-digit PIN</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Enter Details</h4>
                  <p className="text-purple-200">Visit GlobalPay.com/activate or use our mobile app. Enter your card number and PIN when prompted</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Start Using</h4>
                  <p className="text-purple-200">Your crypto wallet is now active! Buy, sell, send, receive, and manage your cryptocurrency instantly</p>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <button 
                onClick={() => setShowActivateCardModal(true)}
                className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-bold text-lg transition-all"
              >
                Activate My Card Now
              </button>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            {[
              {
                q: 'Do I need a bank account to use a Crypto Gift Card?',
                a: 'No! That\'s the beauty of our Crypto Gift Cards. They\'re designed specifically for people without bank accounts, making cryptocurrency accessible to everyone.'
              },
              {
                q: 'Where can I purchase these cards?',
                a: 'Our cards are available at over 50,000 retail locations including 7-Eleven, Walmart, Target, CVS, Walgreens, and many gas stations and convenience stores worldwide.'
              },
              {
                q: 'Do the cards expire?',
                a: 'No, GlobalPay Crypto Gift Cards never expire. Your funds remain available as long as you maintain your account.'
              },
              {
                q: 'What cryptocurrencies can I access?',
                a: 'Once activated, you can access Bitcoin, Ethereum, USDC, USDT, and 50+ other cryptocurrencies through your GlobalPay wallet.'
              },
              {
                q: 'Is there an activation fee?',
                a: 'No activation fees! The full value of your card goes directly into your crypto wallet.'
              },
              {
                q: 'Can I reload my card?',
                a: 'Cards are one-time use for loading funds, but once activated, you can add more funds to your GlobalPay wallet through various methods including purchasing additional cards.'
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-purple-800 bg-opacity-60 rounded-lg p-6">
                <h4 className="text-xl font-bold mb-3 flex items-start">
                  <CheckCircle className="mr-3 flex-shrink-0 text-green-400 mt-1" size={24} />
                  {faq.q}
                </h4>
                <p className="text-purple-200 ml-9">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-orange-600 to-purple-600 rounded-lg p-12 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8">Purchase your GlobalPay Crypto Gift Card today at a store near you</p>
          <div className="flex justify-center space-x-4">
            <button 
              onClick={() => setShowActivateCardModal(true)}
              className="bg-white text-purple-900 px-8 py-4 rounded-lg text-xl font-bold hover:bg-gray-100 transition-all"
            >
              Activate Card
            </button>
            <button 
              onClick={() => setShowSignupModal(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-xl font-bold transition-all"
            >
              Create Account
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
                  <p className="text-xs text-purple-400">non-bankdigital wallet are not insured by the FDIC, are not deposits, and may lose value.</p>
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

export default CryptoCardsPage;