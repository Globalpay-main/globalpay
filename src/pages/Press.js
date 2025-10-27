import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Newspaper, Calendar, Download, Users, Award, TrendingUp, Globe, FileText, Camera, Mic, Video, Mail, Phone, Menu, X, ChevronDown } from 'lucide-react';
import SignupModal from '../SignupModal';
import LoginModal from '../LoginModal';
import ActivateCardModal from '../ActivateCardModal';

const PressPage = () => {
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

  const pressReleases = [
    {
      id: 1,
      title: "GlobalPay Raises $50M Series B to Expand Financial Inclusion Worldwide",
      date: "2024-12-15",
      category: "Funding",
      excerpt: "Leading fintech company secures major funding round led by Andreessen Horowitz to accelerate global expansion and serve the unbanked population.",
      featured: true
    },
    {
      id: 2,
      title: "GlobalPay Surpasses 2 Million Users Milestone",
      date: "2024-11-28",
      category: "Company News",
      excerpt: "Company reaches significant user milestone as demand for blockchain-powered international payments continues to grow rapidly."
    },
    {
      id: 3,
      title: "New Crypto Gift Card Program Launches in 50,000+ Retail Locations",
      date: "2024-10-22",
      category: "Product Launch",
      excerpt: "Revolutionary crypto access program now available at major retailers including CVS, Walgreens, and Walmart nationwide."
    },
    {
      id: 4,
      title: "GlobalPay Partners with Major African Banks for Remittance Corridors",
      date: "2024-09-18",
      category: "Partnerships",
      excerpt: "Strategic partnerships enable instant money transfers to Nigeria, Ghana, and Kenya with local bank integration."
    },
    {
      id: 5,
      title: "Company Achieves Carbon Neutral Operations Across All Global Offices",
      date: "2024-08-12",
      category: "Sustainability",
      excerpt: "Environmental commitment includes 100% renewable energy and blockchain efficiency optimization initiatives."
    },
    {
      id: 6,
      title: "GlobalPay Wins 'Most Innovative Fintech' at Financial Times Awards",
      date: "2024-07-05",
      category: "Awards",
      excerpt: "Recognition for outstanding contribution to financial inclusion and blockchain innovation in international payments."
    }
  ];

  const mediaKit = [
    {
      type: "Company Logos",
      items: ["High-res PNG", "Vector SVG", "Black & White", "Color Variations"],
      format: "ZIP Package",
      size: "2.4 MB"
    },
    {
      type: "Executive Photos",
      items: ["CEO Headshots", "Leadership Team", "Candid Office Photos", "Event Photos"],
      format: "JPG High-res",
      size: "15.2 MB"
    },
    {
      type: "Product Screenshots",
      items: ["Mobile App UI", "Web Dashboard", "API Documentation", "User Flows"],
      format: "PNG/JPG",
      size: "8.7 MB"
    },
    {
      type: "Brand Guidelines",
      items: ["Color Palette", "Typography", "Usage Guidelines", "Brand Voice"],
      format: "PDF",
      size: "1.2 MB"
    }
  ];

  const mediaContacts = [
    {
      name: "Sarah Mitchell",
      title: "VP Communications",
      email: "press@globalpay.com",
      phone: "+1 (415) 555-0150",
      region: "North America & Global"
    },
    {
      name: "James Wright",
      title: "Director, European Communications",
      email: "press.eu@globalpay.com",
      phone: "+44 20 7555 0350",
      region: "Europe & UK"
    },
    {
      name: "Amara Okafor",
      title: "Communications Manager, Africa",
      email: "press.africa@globalpay.com",
      phone: "+234 1 555 0450",
      region: "Africa & Middle East"
    },
    {
      name: "Raj Patel",
      title: "Communications Manager, APAC",
      email: "press.apac@globalpay.com",
      phone: "+65 6555 0550",
      region: "Asia-Pacific"
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
                            item.path === '/press' ? 'text-white font-medium bg-purple-700' : 'text-gray-200 hover:text-white'
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
              Press & <span className="text-blue-400">Media</span>
            </h1>
            <p className="text-xl text-purple-200 mb-8 max-w-4xl mx-auto">
              Latest news, press releases, and media resources from GlobalPay. 
              Stay updated on our mission to democratize global finance through blockchain innovation.
            </p>
            <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-full px-8 py-3 inline-block">
              <span className="text-lg font-bold">Breaking Financial Barriers • 2M+ Users • $2B+ Processed</span>
            </div>
          </div>

          {/* Featured Press Release */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Latest News</h2>
            {pressReleases.filter(release => release.featured).map((release) => (
              <div key={release.id} className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-lg p-8 border border-blue-500 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-green-600 text-white text-sm px-3 py-1 rounded-full font-medium">
                    {release.category}
                  </span>
                  <span className="text-purple-300 flex items-center">
                    <Calendar size={16} className="mr-1" />
                    {new Date(release.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
                <h3 className="text-3xl font-bold mb-4">{release.title}</h3>
                <p className="text-xl text-purple-200 mb-6">{release.excerpt}</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300">
                  Read Full Release
                </button>
              </div>
            ))}
          </div>

          {/* Press Releases Grid */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center mb-12">Recent Press Releases</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pressReleases.filter(release => !release.featured).map((release) => (
                <div key={release.id} className="bg-purple-800 bg-opacity-60 rounded-lg p-6 backdrop-blur-sm border border-purple-600 hover:border-blue-500 transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded font-medium">
                      {release.category}
                    </span>
                    <span className="text-purple-300 text-sm flex items-center">
                      <Calendar size={12} className="mr-1" />
                      {new Date(release.date).toLocaleDateString()}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold mb-3">{release.title}</h4>
                  <p className="text-purple-200 text-sm mb-4">{release.excerpt}</p>
                  <button className="text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors">
                    Read More →
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Media Kit */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center mb-12">Media Kit & Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mediaKit.map((kit, index) => (
                <div key={index} className="bg-purple-800 bg-opacity-60 rounded-lg p-6 backdrop-blur-sm border border-purple-600 hover:border-green-500 transition-all duration-300">
                  <FileText className="text-green-400 mb-4" size={32} />
                  <h4 className="text-lg font-bold mb-3">{kit.type}</h4>
                  <ul className="text-sm text-purple-200 mb-4 space-y-1">
                    {kit.items.map((item, itemIndex) => (
                      <li key={itemIndex}>• {item}</li>
                    ))}
                  </ul>
                  <div className="flex justify-between items-center text-xs text-purple-300 mb-4">
                    <span>{kit.format}</span>
                    <span>{kit.size}</span>
                  </div>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium w-full transition-all duration-300 flex items-center justify-center">
                    <Download size={16} className="mr-2" />
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Company Stats */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center mb-12">Key Company Statistics</h2>
            <div className="bg-gradient-to-r from-green-900 to-blue-900 rounded-lg p-8 border border-green-500">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-400 mb-2">2M+</div>
                  <div className="text-purple-300">Active Users</div>
                  <div className="text-sm text-purple-400">Across 180+ countries</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-400 mb-2">$2B+</div>
                  <div className="text-purple-300">Total Transferred</div>
                  <div className="text-sm text-purple-400">Since 2020 inception</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-400 mb-2">450+</div>
                  <div className="text-purple-300">Employees</div>
                  <div className="text-sm text-purple-400">6 global offices</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-400 mb-2">$75M</div>
                  <div className="text-purple-300">Total Funding</div>
                  <div className="text-sm text-purple-400">Series B completed</div>
                </div>
              </div>
            </div>
          </div>

          {/* Media Contacts */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center mb-12">Media Contacts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mediaContacts.map((contact, index) => (
                <div key={index} className="bg-purple-800 bg-opacity-60 rounded-lg p-6 backdrop-blur-sm border border-purple-600 hover:border-blue-500 transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <Users className="text-blue-400 mr-3" size={24} />
                    <div>
                      <h4 className="text-lg font-bold">{contact.name}</h4>
                      <p className="text-purple-300">{contact.title}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex items-center">
                      <Mail className="text-yellow-400 mr-2" size={14} />
                      <a href={`mailto:${contact.email}`} className="text-yellow-400 hover:text-yellow-300">
                        {contact.email}
                      </a>
                    </div>
                    <div className="flex items-center">
                      <Phone className="text-green-400 mr-2" size={14} />
                      <span className="text-green-400">{contact.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Globe className="text-purple-400 mr-2" size={14} />
                      <span className="text-purple-200">{contact.region}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Media Opportunities */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center mb-12">Media Opportunities</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              <div className="bg-purple-800 bg-opacity-60 rounded-lg p-6 backdrop-blur-sm border border-purple-600 text-center hover:border-green-500 transition-all duration-300">
                <Mic className="text-green-400 text-5xl mb-4 mx-auto" />
                <h4 className="text-xl font-bold mb-3">Interviews</h4>
                <p className="text-purple-200 mb-4">
                  Executive interviews available for TV, radio, and podcast appearances
                </p>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium w-full transition-all duration-300">
                  Request Interview
                </button>
              </div>

              <div className="bg-purple-800 bg-opacity-60 rounded-lg p-6 backdrop-blur-sm border border-purple-600 text-center hover:border-blue-500 transition-all duration-300">
                <Camera className="text-blue-400 text-5xl mb-4 mx-auto" />
                <h4 className="text-xl font-bold mb-3">Product Demos</h4>
                <p className="text-purple-200 mb-4">
                  Live demonstrations of our platform and technology for media
                </p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium w-full transition-all duration-300">
                  Schedule Demo
                </button>
              </div>

              <div className="bg-purple-800 bg-opacity-60 rounded-lg p-6 backdrop-blur-sm border border-purple-600 text-center hover:border-purple-500 transition-all duration-300">
                <Video className="text-purple-400 text-5xl mb-4 mx-auto" />
                <h4 className="text-xl font-bold mb-3">B-Roll Footage</h4>
                <p className="text-purple-200 mb-4">
                  High-quality video content and footage for news stories
                </p>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium w-full transition-all duration-300">
                  Access Footage
                </button>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-lg p-8 border border-blue-500 text-center">
            <h2 className="text-3xl font-bold mb-6">Media Inquiries</h2>
            <p className="text-xl text-purple-200 mb-8">
              Looking for quotes, data, or expert commentary on fintech and blockchain payments?
            </p>
            <div className="flex justify-center space-x-6">
              <a 
                href="mailto:press@globalpay.com"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 inline-block"
              >
                Contact Press Team
              </a>
              <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105">
                Download Media Kit
              </button>
            </div>
            <p className="text-sm text-blue-200 mt-4">Response within 2 hours • Available 24/7 for breaking news</p>
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
                  <p className="text-xs text-purple-400">non-bank digital wallet are notinsured by the FDIC, are not deposits, and may lose value.</p>
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

export default PressPage;