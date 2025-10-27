import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MessageCircle, MapPin, Clock, Globe, Send, User, Building, CheckCircle, Menu, X, ChevronDown } from 'lucide-react';
import SignupModal from '../SignupModal';
import LoginModal from '../LoginModal';
import ActivateCardModal from '../ActivateCardModal';

const ContactUsPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [showQRCode, setShowQRCode] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showActivateCardModal, setShowActivateCardModal] = useState(false);
  const [signupStep, setSignupStep] = useState('details');
  const [loginStep, setLoginStep] = useState('email');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    category: 'general',
    message: '',
    priority: 'normal'
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setContactForm({
        name: '',
        email: '',
        company: '',
        subject: '',
        category: 'general',
        message: '',
        priority: 'normal'
      });
    }, 3000);
  };

  const handleInputChange = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value
    });
  };

  const offices = [
    {
      region: 'North America',
      locations: [
        {
          city: 'San Francisco',
          country: 'United States',
          address: '123 Market Street, Suite 400\nSan Francisco, CA 94105',
          phone: '+1 (415) 555-0100',
          email: 'sf@globalpay.com',
          hours: 'Mon-Fri: 9 AM - 6 PM PST'
        },
        {
          city: 'Toronto',
          country: 'Canada',
          address: '100 King Street West, Suite 200\nToronto, ON M5X 1C7',
          phone: '+1 (416) 555-0200',
          email: 'toronto@globalpay.com',
          hours: 'Mon-Fri: 9 AM - 6 PM EST'
        }
      ]
    },
    {
      region: 'Europe',
      locations: [
        {
          city: 'London',
          country: 'United Kingdom',
          address: '25 Old Broad Street\nLondon EC2N 1HQ',
          phone: '+44 20 7555 0300',
          email: 'london@globalpay.com',
          hours: 'Mon-Fri: 9 AM - 6 PM GMT'
        }
      ]
    },
    {
      region: 'Africa',
      locations: [
        {
          city: 'Lagos',
          country: 'Nigeria',
          address: 'Victoria Island\nLagos, Nigeria',
          phone: '+234 1 555 0400',
          email: 'lagos@globalpay.com',
          hours: 'Mon-Fri: 9 AM - 6 PM WAT'
        }
      ]
    },
    {
      region: 'Asia-Pacific',
      locations: [
        {
          city: 'Singapore',
          country: 'Singapore',
          address: '1 Raffles Place\nSingapore 048616',
          phone: '+65 6555 0500',
          email: 'singapore@globalpay.com',
          hours: 'Mon-Fri: 9 AM - 6 PM SGT'
        },
        {
          city: 'Mumbai',
          country: 'India',
          address: 'Bandra Kurla Complex\nMumbai 400051',
          phone: '+91 22 5555 0600',
          email: 'mumbai@globalpay.com',
          hours: 'Mon-Fri: 9 AM - 6 PM IST'
        }
      ]
    }
  ];

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
                            item.path === '/contact-us' ? 'text-white font-medium bg-purple-700' : 'text-gray-200 hover:text-white'
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

      {/* Hero Section */}
      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-bold mb-6">
              Contact <span className="text-blue-400">Us</span>
            </h1>
            <p className="text-xl text-purple-200 mb-8 max-w-4xl mx-auto">
              We're here to help 24/7. Get in touch with our support team, 
              sales experts, or technical specialists. Your success is our priority.
            </p>
            <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-full px-8 py-3 inline-block">
              <span className="text-lg font-bold">24/7 Support • Global Offices • Instant Response</span>
            </div>
          </div>

          {/* Contact Methods */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-purple-800 bg-opacity-60 rounded-lg p-8 backdrop-blur-sm border border-purple-600 text-center hover:border-green-500 transition-all duration-300">
              <Phone className="text-green-400 text-5xl mb-4 mx-auto" />
              <h3 className="text-2xl font-bold mb-4">Call Us</h3>
              <p className="text-purple-200 mb-4">Speak directly with our support team</p>
              <div className="space-y-2">
                <div className="text-green-400 font-bold">US: +1 (415) 555-0100</div>
                <div className="text-green-400 font-bold">UK: +44 20 7555 0300</div>
                <div className="text-green-400 font-bold">NG: +234 1 555 0400</div>
              </div>
              <p className="text-sm text-purple-300 mt-4">Available 24/7</p>
            </div>

            <div className="bg-purple-800 bg-opacity-60 rounded-lg p-8 backdrop-blur-sm border border-purple-600 text-center hover:border-blue-500 transition-all duration-300">
              <Mail className="text-blue-400 text-5xl mb-4 mx-auto" />
              <h3 className="text-2xl font-bold mb-4">Email Support</h3>
              <p className="text-purple-200 mb-4">Get detailed assistance via email</p>
              <div className="space-y-2">
                <div className="text-blue-400 font-bold">support@globalpay.com</div>
                <div className="text-blue-400 font-bold">business@globalpay.com</div>
                <div className="text-blue-400 font-bold">press@globalpay.com</div>
              </div>
              <p className="text-sm text-purple-300 mt-4">Response within 1 hour</p>
            </div>

            <div className="bg-purple-800 bg-opacity-60 rounded-lg p-8 backdrop-blur-sm border border-purple-600 text-center hover:border-yellow-500 transition-all duration-300">
              <MessageCircle className="text-yellow-400 text-5xl mb-4 mx-auto" />
              <h3 className="text-2xl font-bold mb-4">Live Chat</h3>
              <p className="text-purple-200 mb-4">Instant help through our chat system</p>
              <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300">
                Start Chat Now
              </button>
              <p className="text-sm text-purple-300 mt-4">Available in 15+ languages</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center mb-12">Send Us a Message</h2>
            <div className="max-w-4xl mx-auto">
              {formSubmitted ? (
                <div className="bg-green-900 border border-green-500 rounded-lg p-8 text-center">
                  <CheckCircle className="text-green-400 text-6xl mb-4 mx-auto" />
                  <h3 className="text-2xl font-bold mb-4 text-green-400">Message Sent Successfully!</h3>
                  <p className="text-purple-200 mb-4">
                    Thank you for contacting us. We've received your message and will respond within 1 hour.
                  </p>
                  <p className="text-sm text-purple-300">
                    Reference ID: GP-{Date.now().toString().slice(-6)}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="bg-purple-800 bg-opacity-60 rounded-lg p-8 backdrop-blur-sm border border-purple-600">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-purple-200 text-sm font-medium mb-2">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 text-purple-400" size={20} />
                        <input
                          type="text"
                          name="name"
                          value={contactForm.name}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 bg-purple-700 border border-purple-600 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:border-blue-500"
                          placeholder="Enter your full name"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-purple-200 text-sm font-medium mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 text-purple-400" size={20} />
                        <input
                          type="email"
                          name="email"
                          value={contactForm.email}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 bg-purple-700 border border-purple-600 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:border-blue-500"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-purple-200 text-sm font-medium mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={contactForm.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-purple-700 border border-purple-600 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:border-blue-500"
                      placeholder="Please provide details about your inquiry..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                  >
                    <Send className="mr-2" size={20} />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Office Locations */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center mb-12">Our Global Offices</h2>
            <div className="space-y-8">
              {offices.map((region, regionIndex) => (
                <div key={regionIndex}>
                  <h3 className="text-2xl font-bold mb-6 text-center text-blue-400">{region.region}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {region.locations.map((office, officeIndex) => (
                      <div key={officeIndex} className="bg-purple-800 bg-opacity-60 rounded-lg p-6 backdrop-blur-sm border border-purple-600 hover:border-green-500 transition-all duration-300">
                        <div className="flex items-center mb-4">
                          <MapPin className="text-green-400 mr-3" size={24} />
                          <div>
                            <h4 className="text-lg font-bold">{office.city}</h4>
                            <p className="text-purple-300">{office.country}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-3 text-sm">
                          <div>
                            <div className="flex items-center mb-1">
                              <Building className="text-blue-400 mr-2" size={16} />
                              <span className="text-purple-300">Address:</span>
                            </div>
                            <p className="text-white text-xs whitespace-pre-line pl-5">{office.address}</p>
                          </div>
                          
                          <div className="flex items-center">
                            <Phone className="text-green-400 mr-2" size={16} />
                            <span className="text-purple-300 mr-2">Phone:</span>
                            <span className="text-green-400">{office.phone}</span>
                          </div>
                          
                          <div className="flex items-center">
                            <Mail className="text-yellow-400 mr-2" size={16} />
                            <span className="text-purple-300 mr-2">Email:</span>
                            <a href={`mailto:${office.email}`} className="text-yellow-400 hover:text-yellow-300">{office.email}</a>
                          </div>
                          
                          <div className="flex items-center">
                            <Clock className="text-purple-400 mr-2" size={16} />
                            <span className="text-purple-300 mr-2">Hours:</span>
                            <span className="text-purple-200">{office.hours}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-lg p-8 border border-blue-500 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-purple-200 mb-8">
              Join millions of users who trust GlobalPay for their financial needs
            </p>
            <div className="flex justify-center space-x-6">
              <button 
                onClick={() => setShowSignupModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105"
              >
                Create Account
              </button>
              <Link 
                to="/help-center"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 inline-block"
              >
                Visit Help Center
              </Link>
            </div>
            <p className="text-sm text-blue-200 mt-4">Get started in minutes • No hidden fees • Full support</p>
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

export default ContactUsPage;