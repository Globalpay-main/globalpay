import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, BookOpen, MessageCircle, Phone, Mail, Clock, ChevronDown, ChevronRight, HelpCircle, FileText, Shield, CreditCard, Wallet, Send, Users, Settings, Menu, X, Download, Globe } from 'lucide-react';
import SignupModal from '../SignupModal';
import LoginModal from '../LoginModal';
import ActivateCardModal from '../ActivateCardModal';

const HelpCenterPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [showQRCode, setShowQRCode] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showActivateCardModal, setShowActivateCardModal] = useState(false);
  const [signupStep, setSignupStep] = useState('details');
  const [loginStep, setLoginStep] = useState('email');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState(null);
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

  const faqData = [
    {
      id: 1,
      question: "How do I create a GlobalPay account?",
      answer: "Creating an account is simple! Click 'Sign Up' on our homepage, provide your basic information (name, email, phone), verify your email with the code we send, and you're ready to start. For full features like external wallet transfers, you'll need to complete KYC verification."
    },
    {
      id: 2,
      question: "What is KYC and why is it required?",
      answer: "KYC (Know Your Customer) is a regulatory requirement that helps us comply with international financial laws and protect your account. It's required for sending crypto to external wallets, receiving from external sources, and transactions over $1,000. You'll need to provide government ID, complete face verification, and submit a selfie with your ID."
    },
    {
      id: 3,
      question: "How do I send money internationally?",
      answer: "Log into your account, click 'Send Money', enter recipient details and destination country, choose your payment method (crypto or fiat), confirm the exchange rate, and complete the transfer with PIN verification. Transfers complete in under 30 seconds with our blockchain technology."
    },
    {
      id: 4,
      question: "Where can I buy crypto gift cards?",
      answer: "Our crypto gift cards are available at 50,000+ retail locations including CVS, Walgreens, 7-Eleven, Walmart, Target, and more. Cards come in $50, $100, $200, and $500 denominations. Use our store locator to find the nearest location."
    },
    {
      id: 5,
      question: "How do I activate my crypto gift card?",
      answer: "Visit our activation page or use our mobile app, enter your card number and PIN (found under the scratch-off area), verify with the code we send to your email/phone, and your crypto will be instantly available in your wallet."
    },
    {
      id: 6,
      question: "What cryptocurrencies do you support?",
      answer: "We support Bitcoin (BTC), Ethereum (ETH), USD Coin (USDC), Tether (USDT), Litecoin (LTC), and Cardano (ADA). You can hold, send, receive, and convert between these cryptocurrencies and traditional fiat currencies."
    },
    {
      id: 7,
      question: "What are your fees?",
      answer: "We charge a flat $2 fee per international transfer with no hidden costs or exchange rate markups. Crypto gift card activation is free. Wallet creation and holding funds in your account are completely free."
    },
    {
      id: 8,
      question: "How secure is my money?",
      answer: "Your funds are protected by bank-grade security including AES-256 encryption, multi-signature wallets, cold storage for majority of funds, SOC 2 Type II compliance, and FDIC insurance up to $250,000 for fiat balances."
    },
    {
      id: 9,
      question: "Can I send crypto to external wallets?",
      answer: "Yes, but only after completing full KYC verification. This includes sending to hardware wallets, other exchanges, or personal wallets. This requirement helps us comply with regulatory standards and protect against fraud."
    },
    {
      id: 10,
      question: "How do I integrate GlobalPay API for my business?",
      answer: "Visit our API documentation page for comprehensive guides, code examples, and SDKs. We offer RESTful APIs for payment processing, bulk transfers, crypto acceptance, and treasury management. Start with our sandbox environment for testing."
    }
  ];

  const helpCategories = [
    {
      title: "Getting Started",
      icon: <BookOpen className="text-blue-400" size={32} />,
      articles: 15,
      topics: ["Account Creation", "Email Verification", "First Transfer", "Mobile App Setup"]
    },
    {
      title: "Sending Money",
      icon: <Send className="text-green-400" size={32} />,
      articles: 12,
      topics: ["International Transfers", "Exchange Rates", "Transfer Status", "Recipient Setup"]
    },
    {
      title: "Crypto Cards",
      icon: <CreditCard className="text-orange-400" size={32} />,
      articles: 8,
      topics: ["Purchase Locations", "Card Activation", "Balance Check", "Troubleshooting"]
    },
    {
      title: "Digital Wallets",
      icon: <Wallet className="text-purple-400" size={32} />,
      articles: 10,
      topics: ["Multi-Currency Support", "DeFi Integration", "Hardware Wallets", "Portfolio Management"]
    },
    {
      title: "KYC & Verification",
      icon: <Shield className="text-red-400" size={32} />,
      articles: 6,
      topics: ["Identity Verification", "Document Upload", "Face Verification", "KYC Status"]
    },
    {
      title: "Business Solutions",
      icon: <Users className="text-yellow-400" size={32} />,
      articles: 14,
      topics: ["API Integration", "Bulk Payments", "Smart Contracts", "White Label"]
    },
    {
      title: "Security & Safety",
      icon: <Shield className="text-green-400" size={32} />,
      articles: 9,
      topics: ["Account Security", "Two-Factor Auth", "Fraud Prevention", "Best Practices"]
    },
    {
      title: "Account Settings",
      icon: <Settings className="text-blue-400" size={32} />,
      articles: 7,
      topics: ["Profile Management", "Notifications", "Privacy Settings", "Account Closure"]
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
                            item.path === '/help-center' ? 'text-white font-medium bg-purple-700' : 'text-gray-200 hover:text-white'
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
              Help <span className="text-blue-400">Center</span>
            </h1>
            <p className="text-xl text-purple-200 mb-8 max-w-4xl mx-auto">
              Find answers to your questions, get step-by-step guides, and access 24/7 support. 
              We're here to help you make the most of GlobalPay's services.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400" size={20} />
                <input
                  type="text"
                  placeholder="Search for help articles, guides, or FAQs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-purple-800 bg-opacity-60 text-white placeholder-purple-300 border border-purple-600 rounded-lg py-4 pl-12 pr-4 focus:border-blue-400 focus:outline-none backdrop-blur-sm"
                />
              </div>
            </div>
          </div>

          {/* Quick Support Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-purple-800 bg-opacity-60 rounded-lg p-8 backdrop-blur-sm border border-purple-600 text-center hover:border-green-500 transition-all duration-300">
              <MessageCircle className="text-green-400 text-5xl mb-4 mx-auto" />
              <h3 className="text-2xl font-bold mb-4">Live Chat</h3>
              <p className="text-purple-200 mb-6">
                Get instant help from our support team. Average response time: 30 seconds
              </p>
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300">
                Start Chat
              </button>
              <p className="text-sm text-purple-300 mt-2">Available 24/7</p>
            </div>

            <div className="bg-purple-800 bg-opacity-60 rounded-lg p-8 backdrop-blur-sm border border-purple-600 text-center hover:border-blue-500 transition-all duration-300">
              <Phone className="text-blue-400 text-5xl mb-4 mx-auto" />
              <h3 className="text-2xl font-bold mb-4">Phone Support</h3>
              <p className="text-purple-200 mb-6">
                Speak directly with our expert support representatives
              </p>
              <div className="text-xl font-bold text-blue-400 mb-2">+1-800-GLOBALPAY</div>
              <p className="text-sm text-purple-300">24/7 Worldwide</p>
            </div>

            <div className="bg-purple-800 bg-opacity-60 rounded-lg p-8 backdrop-blur-sm border border-purple-600 text-center hover:border-yellow-500 transition-all duration-300">
              <Mail className="text-yellow-400 text-5xl mb-4 mx-auto" />
              <h3 className="text-2xl font-bold mb-4">Email Support</h3>
              <p className="text-purple-200 mb-6">
                Send us detailed questions and get comprehensive answers
              </p>
              <div className="text-lg font-bold text-yellow-400 mb-2">support@globalpay.com</div>
              <p className="text-sm text-purple-300">Response within 1 hour</p>
            </div>
          </div>

          {/* Help Categories */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center mb-12">Browse Help Topics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {helpCategories.map((category, index) => (
                <div key={index} className="bg-purple-800 bg-opacity-60 rounded-lg p-6 backdrop-blur-sm border border-purple-600 hover:border-blue-500 transition-all duration-300 cursor-pointer">
                  <div className="flex items-center mb-4">
                    {category.icon}
                    <div className="ml-4">
                      <h4 className="text-lg font-bold">{category.title}</h4>
                      <p className="text-purple-300 text-sm">{category.articles} articles</p>
                    </div>
                  </div>
                  <ul className="space-y-1 text-sm text-purple-200">
                    {category.topics.map((topic, topicIndex) => (
                      <li key={topicIndex} className="flex items-center">
                        <ChevronRight size={12} className="text-purple-400 mr-2" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="max-w-4xl mx-auto space-y-4">
              {faqData.map((faq) => (
                <div key={faq.id} className="bg-purple-800 bg-opacity-60 rounded-lg backdrop-blur-sm border border-purple-600">
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                    className="w-full text-left p-6 flex justify-between items-center hover:bg-purple-700 hover:bg-opacity-40 transition-all duration-300"
                  >
                    <span className="text-lg font-medium">{faq.question}</span>
                    {expandedFAQ === faq.id ? (
                      <ChevronDown className="text-purple-400" size={20} />
                    ) : (
                      <ChevronRight className="text-purple-400" size={20} />
                    )}
                  </button>
                  {expandedFAQ === faq.id && (
                    <div className="px-6 pb-6">
                      <p className="text-purple-200 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Popular Articles */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center mb-12">Popular Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "How to Complete KYC Verification",
                  description: "Step-by-step guide to identity verification",
                  readTime: "5 min read",
                  category: "Verification"
                },
                {
                  title: "Setting Up Your First International Transfer",
                  description: "Complete walkthrough for new users",
                  readTime: "3 min read",
                  category: "Getting Started"
                },
                {
                  title: "Crypto Gift Card Activation Guide",
                  description: "How to activate and use your crypto cards",
                  readTime: "2 min read",
                  category: "Crypto Cards"
                },
                {
                  title: "Understanding Exchange Rates and Fees",
                  description: "How our pricing works and what you pay",
                  readTime: "4 min read",
                  category: "Fees & Rates"
                },
                {
                  title: "Business API Integration Tutorial",
                  description: "Get started with GlobalPay APIs",
                  readTime: "10 min read",
                  category: "Business"
                },
                {
                  title: "Security Best Practices",
                  description: "Keep your account and funds safe",
                  readTime: "6 min read",
                  category: "Security"
                }
              ].map((article, index) => (
                <div key={index} className="bg-purple-800 bg-opacity-60 rounded-lg p-6 backdrop-blur-sm border border-purple-600 hover:border-green-500 transition-all duration-300 cursor-pointer">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">{article.category}</span>
                    <span className="text-purple-300 text-xs">{article.readTime}</span>
                  </div>
                  <h4 className="text-lg font-bold mb-2">{article.title}</h4>
                  <p className="text-purple-200 text-sm mb-4">{article.description}</p>
                  <div className="flex items-center text-green-400 text-sm font-medium">
                    <span>Read Article</span>
                    <ChevronRight size={16} className="ml-1" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Status */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center mb-12">System Status</h2>
            <div className="bg-purple-800 bg-opacity-60 rounded-lg p-8 backdrop-blur-sm border border-purple-600 max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">All Systems Operational</h3>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-green-400 font-medium">Online</span>
                </div>
              </div>
              
              <div className="space-y-4">
                {[
                  { service: "Payment Processing", status: "operational" },
                  { service: "API Services", status: "operational" },
                  { service: "Mobile Applications", status: "operational" },
                  { service: "Crypto Card Activation", status: "operational" },
                  { service: "Customer Support", status: "operational" }
                ].map((service, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-purple-600 last:border-b-0">
                    <span className="text-purple-200">{service.service}</span>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-green-400 text-sm">Operational</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300">
                  View Full Status Page
                </button>
              </div>
            </div>
          </div>

          {/* Contact Options */}
          <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-lg p-8 border border-blue-500 text-center">
            <h2 className="text-3xl font-bold mb-6">Still Need Help?</h2>
            <p className="text-xl text-purple-200 mb-8">
              Our support team is available 24/7 to assist you with any questions or issues
            </p>
            <div className="flex justify-center space-x-6">
              <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105">
                Start Live Chat
              </button>
              <Link 
                to="/contact-us"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 inline-block"
              >
                Contact Support
              </Link>
            </div>
            <p className="text-sm text-blue-200 mt-4">Average response time: Under 1 minute</p>
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

export default HelpCenterPage;