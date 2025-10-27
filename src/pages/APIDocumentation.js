import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Code, Book, Terminal, Key, Zap, Shield, Database, Globe, CheckCircle, Copy, Download, Menu, X, ChevronDown } from 'lucide-react';
import SignupModal from '../SignupModal';
import LoginModal from '../LoginModal';
import ActivateCardModal from '../ActivateCardModal';

const APIDocumentationPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [showQRCode, setShowQRCode] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showActivateCardModal, setShowActivateCardModal] = useState(false);
  const [copiedCode, setCopiedCode] = useState('');
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

  const copyToClipboard = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  const codeExamples = {
    authentication: `curl -X POST https://api.globalpay.com/v1/auth \\
  -H "Content-Type: application/json" \\
  -d '{
    "api_key": "your_api_key_here",
    "api_secret": "your_api_secret_here"
  }'`,
    transfer: `curl -X POST https://api.globalpay.com/v1/transfers \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 100.00,
    "currency": "USD",
    "recipient": "user@example.com",
    "destination_currency": "NGN"
  }'`,
    webhook: `{
  "event": "transfer.completed",
  "data": {
    "id": "txn_abc123",
    "amount": 100.00,
    "currency": "USD",
    "status": "completed",
    "timestamp": "2025-09-30T12:00:00Z"
  }
}`
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
                            item.path === '/api-documentation' ? 'text-white font-medium bg-purple-700' : 'text-gray-200 hover:text-white'
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
      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-bold mb-6">
              API <span className="text-blue-400">Documentation</span>
            </h1>
            <p className="text-xl text-purple-200 mb-8 max-w-4xl mx-auto">
              Comprehensive developer resources for integrating GlobalPay's payment infrastructure.
              RESTful APIs, SDKs, and webhooks for seamless integration.
            </p>
            <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-full px-8 py-3 inline-block">
              <span className="text-lg font-bold">99.99% Uptime • RESTful API • Real-time Webhooks</span>
            </div>
          </div>

          {/* Quick Start */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center mb-12">Quick Start</h2>
            <div className="bg-purple-800 bg-opacity-60 rounded-lg p-8 backdrop-blur-sm border border-purple-600">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold">1</span>
                  </div>
                  <h4 className="text-xl font-bold mb-3">Get API Keys</h4>
                  <p className="text-purple-200">Register for a developer account and generate your API credentials</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold">2</span>
                  </div>
                  <h4 className="text-xl font-bold mb-3">Test in Sandbox</h4>
                  <p className="text-purple-200">Use our sandbox environment to test your integration safely</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold">3</span>
                  </div>
                  <h4 className="text-xl font-bold mb-3">Go Live</h4>
                  <p className="text-purple-200">Switch to production credentials and start processing payments</p>
                </div>
              </div>

              <div className="bg-gray-900 rounded-lg p-6 relative">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-green-400 font-mono text-sm">Authentication Example</span>
                  <button
                    onClick={() => copyToClipboard(codeExamples.authentication, 'auth')}
                    className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded text-sm"
                  >
                    {copiedCode === 'auth' ? <CheckCircle size={16} /> : <Copy size={16} />}
                    <span>{copiedCode === 'auth' ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="text-green-400 font-mono text-sm overflow-x-auto">
                  <code>{codeExamples.authentication}</code>
                </pre>
              </div>
            </div>
          </div>

          {/* API Endpoints */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center mb-12">Core Endpoints</h2>
            <div className="space-y-6">
              {[
                {
                  method: 'POST',
                  endpoint: '/v1/transfers',
                  description: 'Create a new international transfer',
                  color: 'green'
                },
                {
                  method: 'GET',
                  endpoint: '/v1/transfers/:id',
                  description: 'Retrieve transfer details',
                  color: 'blue'
                },
                {
                  method: 'GET',
                  endpoint: '/v1/rates',
                  description: 'Get real-time exchange rates',
                  color: 'blue'
                },
                {
                  method: 'POST',
                  endpoint: '/v1/wallets',
                  description: 'Create a new wallet',
                  color: 'green'
                },
                {
                  method: 'GET',
                  endpoint: '/v1/wallets/:id/balance',
                  description: 'Check wallet balance',
                  color: 'blue'
                },
                {
                  method: 'POST',
                  endpoint: '/v1/webhooks',
                  description: 'Register webhook endpoints',
                  color: 'green'
                }
              ].map((endpoint, index) => (
                <div key={index} className="bg-purple-800 bg-opacity-60 rounded-lg p-6 backdrop-blur-sm border border-purple-600 hover:border-blue-500 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className={`${endpoint.color === 'green' ? 'bg-green-600' : 'bg-blue-600'} text-white px-3 py-1 rounded font-mono text-sm font-bold`}>
                        {endpoint.method}
                      </span>
                      <code className="text-blue-400 font-mono">{endpoint.endpoint}</code>
                    </div>
                    <button className="text-purple-300 hover:text-white">
                      View Docs →
                    </button>
                  </div>
                  <p className="text-purple-200 mt-3 ml-20">{endpoint.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* SDKs & Libraries */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center mb-12">SDKs & Libraries</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: 'Node.js', icon: '⬢', version: 'v2.1.0', downloads: '50K+' },
                { name: 'Python', icon: '🐍', version: 'v1.8.2', downloads: '35K+' },
                { name: 'PHP', icon: '🐘', version: 'v2.0.1', downloads: '28K+' },
                { name: 'Ruby', icon: '💎', version: 'v1.6.4', downloads: '18K+' },
                { name: 'Java', icon: '☕', version: 'v3.0.0', downloads: '42K+' },
                { name: 'Go', icon: '🔵', version: 'v1.5.0', downloads: '22K+' }
              ].map((sdk, index) => (
                <div key={index} className="bg-purple-800 bg-opacity-60 rounded-lg p-6 backdrop-blur-sm border border-purple-600 hover:border-green-500 transition-all duration-300">
                  <div className="text-4xl mb-3">{sdk.icon}</div>
                  <h4 className="text-xl font-bold mb-2">{sdk.name}</h4>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-purple-300 text-sm">{sdk.version}</span>
                    <span className="text-green-400 text-sm">{sdk.downloads}</span>
                  </div>
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center justify-center">
                    <Download size={16} className="mr-2" />
                    Install
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Webhooks */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center mb-12">Webhooks</h2>
            <div className="bg-purple-800 bg-opacity-60 rounded-lg p-8 backdrop-blur-sm border border-purple-600">
              <p className="text-purple-200 mb-6">
                Receive real-time notifications about events in your GlobalPay account. 
                Set up webhook endpoints to get instant updates on transfers, wallet activities, and more.
              </p>
              
              <div className="bg-gray-900 rounded-lg p-6 relative mb-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-green-400 font-mono text-sm">Webhook Payload Example</span>
                  <button
                    onClick={() => copyToClipboard(codeExamples.webhook, 'webhook')}
                    className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded text-sm"
                  >
                    {copiedCode === 'webhook' ? <CheckCircle size={16} /> : <Copy size={16} />}
                    <span>{copiedCode === 'webhook' ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="text-green-400 font-mono text-sm overflow-x-auto">
                  <code>{codeExamples.webhook}</code>
                </pre>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-purple-700 rounded-lg p-4">
                  <h5 className="font-bold mb-2">Available Events</h5>
                  <ul className="text-sm text-purple-200 space-y-1">
                    <li>• transfer.created</li>
                    <li>• transfer.completed</li>
                    <li>• transfer.failed</li>
                    <li>• wallet.credited</li>
                    <li>• wallet.debited</li>
                  </ul>
                </div>
                <div className="bg-purple-700 rounded-lg p-4">
                  <h5 className="font-bold mb-2">Security</h5>
                  <ul className="text-sm text-purple-200 space-y-1">
                    <li>• HMAC-SHA256 signatures</li>
                    <li>• IP whitelisting available</li>
                    <li>• Automatic retry logic</li>
                    <li>• Event verification</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Support */}
          <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-lg p-8 border border-blue-500 text-center">
            <h2 className="text-3xl font-bold mb-6">Need Help?</h2>
            <p className="text-xl text-purple-200 mb-8">
              Our developer support team is here to help you integrate successfully
            </p>
            <div className="flex justify-center space-x-6">
              <Link 
                to="/contact-us"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 inline-block"
              >
                Contact Support
              </Link>
              <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105">
                Join Developer Forum
              </button>
            </div>
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

export default APIDocumentationPage;