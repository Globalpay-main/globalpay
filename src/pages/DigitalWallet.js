import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Download, Wallet, Shield, Zap, Globe, DollarSign, Lock, Award, Star, TrendingUp, CheckCircle, Users, Eye, Layers, Database, RefreshCw, ArrowRight, Smartphone, CreditCard, Bitcoin, Mail, PhoneCall, ChevronDown } from 'lucide-react';
import SignupModal from '../SignupModal';
import LoginModal from '../LoginModal';
import ActivateCardModal from '../ActivateCardModal';

const DigitalWalletsPage = () => {
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
                            item.path === '/digital-wallets' ? 'text-white font-medium bg-purple-700' : 'text-gray-200 hover:text-white'
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
          <div className="inline-flex items-center justify-center w-20 h-20 bg-cyan-600 rounded-full mb-6">
            <Wallet size={40} />
          </div>
          <h1 className="text-6xl font-bold mb-6">
            <span className="text-cyan-400">Multi-Currency</span>
            <br />
            Digital Wallets
            <br />
            <span className="text-green-400">For Crypto & Fiat</span>
          </h1>
          <p className="text-xl text-purple-200 mb-8 max-w-4xl mx-auto">
            Store, send, receive, and convert between 150+ currencies and 50+ cryptocurrencies in one secure wallet. FDIC-insured for USD deposits.
          </p>

          <div className="flex justify-center space-x-6">
            <button 
              onClick={() => setShowSignupModal(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Create Free Wallet
            </button>
            
            <button 
              onClick={() => setShowLoginModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Access My Wallet
            </button>
          </div>
        </div>

        {/* Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-purple-800 bg-opacity-50 rounded-lg p-8 backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
            <Layers className="text-cyan-400 mb-4" size={48} />
            <h3 className="text-2xl font-bold mb-3">Multi-Currency Support</h3>
            <p className="text-purple-200">
              Hold USD, EUR, GBP, JPY, and 150+ fiat currencies alongside Bitcoin, Ethereum, and 50+ cryptocurrencies—all in one wallet.
            </p>
          </div>

          <div className="bg-purple-800 bg-opacity-50 rounded-lg p-8 backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
            <Shield className="text-green-400 mb-4" size={48} />
            <h3 className="text-2xl font-bold mb-3">FDIC Protected</h3>
            <p className="text-purple-200">
              USD deposits are FDIC-insured up to $250,000 through our partner bank BankProv. Your crypto is secured with bank-grade encryption.
            </p>
          </div>

          <div className="bg-purple-800 bg-opacity-50 rounded-lg p-8 backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
            <RefreshCw className="text-purple-400 mb-4" size={48} />
            <h3 className="text-2xl font-bold mb-3">Instant Conversion</h3>
            <p className="text-purple-200">
              Convert between any supported currency or cryptocurrency instantly at competitive rates. No hidden fees.
            </p>
          </div>
        </div>

        {/* Wallet Types */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-12">Choose Your Wallet Type</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-lg p-8 border-2 border-blue-500">
              <div className="flex items-center mb-6">
                <DollarSign className="text-blue-400 mr-4" size={48} />
                <div>
                  <h3 className="text-2xl font-bold">Fiat Wallet</h3>
                  <p className="text-purple-300">Traditional currencies</p>
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="mr-3 flex-shrink-0 text-green-400 mt-1" size={20} />
                  <span>150+ supported currencies (USD, EUR, GBP, etc.)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-3 flex-shrink-0 text-green-400 mt-1" size={20} />
                  <span>FDIC insurance for USD deposits ($250K)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-3 flex-shrink-0 text-green-400 mt-1" size={20} />
                  <span>Free domestic transfers</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-3 flex-shrink-0 text-green-400 mt-1" size={20} />
                  <span>International transfers for $2</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-3 flex-shrink-0 text-green-400 mt-1" size={20} />
                  <span>Debit card integration</span>
                </li>
              </ul>
              <button 
                onClick={() => setShowSignupModal(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold transition-all"
              >
                Open Fiat Wallet
              </button>
            </div>

            <div className="bg-gradient-to-br from-orange-900 to-purple-900 rounded-lg p-8 border-2 border-orange-500">
              <div className="flex items-center mb-6">
                <Bitcoin className="text-orange-400 mr-4" size={48} />
                <div>
                  <h3 className="text-2xl font-bold">Crypto Wallet</h3>
                  <p className="text-purple-300">Digital currencies</p>
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="mr-3 flex-shrink-0 text-green-400 mt-1" size={20} />
                  <span>50+ cryptocurrencies (BTC, ETH, USDC, etc.)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-3 flex-shrink-0 text-green-400 mt-1" size={20} />
                  <span>Non-custodial option available</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-3 flex-shrink-0 text-green-400 mt-1" size={20} />
                  <span>Send to external wallets</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-3 flex-shrink-0 text-green-400 mt-1" size={20} />
                  <span>Instant crypto-to-fiat conversion</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-3 flex-shrink-0 text-green-400 mt-1" size={20} />
                  <span>Staking rewards available</span>
                </li>
              </ul>
              <button 
                onClick={() => setShowSignupModal(true)}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-bold transition-all"
              >
                Open Crypto Wallet
              </button>
            </div>
          </div>
        </div>

        {/* Security Features */}
        <div className="bg-blue-900 bg-opacity-50 rounded-lg p-12 mb-16">
          <h2 className="text-4xl font-bold text-center mb-12">Bank-Grade Security</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <Lock className="flex-shrink-0 text-green-400" size={32} />
              <div>
                <h4 className="text-xl font-bold mb-2">Military-Grade Encryption</h4>
                <p className="text-purple-200">AES-256 encryption protects your data at rest and TLS 1.3 secures data in transit</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Shield className="flex-shrink-0 text-blue-400" size={32} />
              <div>
                <h4 className="text-xl font-bold mb-2">Multi-Factor Authentication</h4>
                <p className="text-purple-200">2FA, biometric login, and hardware key support for maximum account security</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Eye className="flex-shrink-0 text-purple-400" size={32} />
              <div>
                <h4 className="text-xl font-bold mb-2">24/7 Monitoring</h4>
                <p className="text-purple-200">Real-time fraud detection and instant alerts for suspicious activity</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Database className="flex-shrink-0 text-cyan-400" size={32} />
              <div>
                <h4 className="text-xl font-bold mb-2">Cold Storage</h4>
                <p className="text-purple-200">95% of crypto assets stored offline in geographically distributed vaults</p>
              </div>
            </div>
          </div>
        </div>

        {/* Supported Assets */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-12">Supported Assets</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-center">Fiat Currencies</h3>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                {['USD 🇺🇸', 'EUR 🇪🇺', 'GBP 🇬🇧', 'JPY 🇯🇵', 'CAD 🇨🇦', 'AUD 🇦🇺', 'CHF 🇨🇭', 'CNY 🇨🇳', 'INR 🇮🇳', 'BRL 🇧🇷', 'MXN 🇲🇽', 'KRW 🇰🇷'].map((currency, idx) => (
                  <div key={idx} className="bg-purple-800 bg-opacity-60 p-4 rounded-lg text-center font-bold">
                    {currency}
                  </div>
                ))}
              </div>
              <p className="text-center text-purple-300 mt-4">+ 138 more fiat currencies</p>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6 text-center">Cryptocurrencies</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {['Bitcoin (BTC)', 'Ethereum (ETH)', 'USDC', 'USDT', 'Litecoin (LTC)', 'Cardano (ADA)', 'Solana (SOL)', 'Polygon (MATIC)', 'Chainlink (LINK)', 'Avalanche (AVAX)'].map((crypto, idx) => (
                  <div key={idx} className="bg-purple-800 bg-opacity-60 p-4 rounded-lg text-center font-bold">
                    {crypto}
                  </div>
                ))}
              </div>
              <p className="text-center text-purple-300 mt-4">+ 40 more cryptocurrencies</p>
            </div>
          </div>
        </div>

        {/* Features Comparison */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-12">Why GlobalPay Wallets?</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-purple-800 bg-opacity-60 rounded-lg overflow-hidden">
              <thead className="bg-purple-900">
                <tr>
                  <th className="p-4 text-left">Feature</th>
                  <th className="p-4 text-center">GlobalPay</th>
                  <th className="p-4 text-center">Traditional Bank</th>
                  <th className="p-4 text-center">Other Crypto Wallets</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-700">
                <tr>
                  <td className="p-4">Multi-Currency Support</td>
                  <td className="p-4 text-center"><CheckCircle className="inline text-green-400" /></td>
                  <td className="p-4 text-center text-red-400">Limited</td>
                  <td className="p-4 text-center"><CheckCircle className="inline text-green-400" /></td>
                </tr>
                <tr>
                  <td className="p-4">Crypto & Fiat Together</td>
                  <td className="p-4 text-center"><CheckCircle className="inline text-green-400" /></td>
                  <td className="p-4 text-center text-red-400">✗</td>
                  <td className="p-4 text-center text-red-400">Crypto Only</td>
                </tr>
                <tr>
                  <td className="p-4">FDIC Insurance</td>
                  <td className="p-4 text-center"><CheckCircle className="inline text-green-400" /></td>
                  <td className="p-4 text-center"><CheckCircle className="inline text-green-400" /></td>
                  <td className="p-4 text-center text-red-400">✗</td>
                </tr>
                <tr>
                  <td className="p-4">International Transfers ($2)</td>
                  <td className="p-4 text-center"><CheckCircle className="inline text-green-400" /></td>
                  <td className="p-4 text-center text-red-400">$25-50</td>
                  <td className="p-4 text-center text-red-400">N/A</td>
                </tr>
                <tr>
                  <td className="p-4">Instant Crypto Conversion</td>
                  <td className="p-4 text-center"><CheckCircle className="inline text-green-400" /></td>
                  <td className="p-4 text-center text-red-400">✗</td>
                  <td className="p-4 text-center"><CheckCircle className="inline text-green-400" /></td>
                </tr>
                <tr>
                  <td className="p-4">24/7 Support</td>
                  <td className="p-4 text-center"><CheckCircle className="inline text-green-400" /></td>
                  <td className="p-4 text-center text-red-400">Business Hours</td>
                  <td className="p-4 text-center text-yellow-400">Varies</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-cyan-600 to-purple-600 rounded-lg p-12 text-center">
          <h2 className="text-4xl font-bold mb-4">Start Managing Your Money Smarter</h2>
          <p className="text-xl mb-8">Open your free GlobalPay wallet today. No minimum balance. No monthly fees.</p>
          <button 
            onClick={() => setShowSignupModal(true)}
            className="bg-white text-purple-900 px-8 py-4 rounded-lg text-xl font-bold hover:bg-gray-100 transition-all transform hover:scale-105"
          >
            Create Free Wallet <ArrowRight className="inline ml-2" />
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

export default DigitalWalletsPage;