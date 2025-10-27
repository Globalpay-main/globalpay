import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Download, FileText, Shield, AlertTriangle, CheckCircle, Scale, Users, Globe, Lock, DollarSign, RefreshCw, XCircle, Gavel, BookOpen, MessageSquare, Mail, PhoneCall, ChevronDown } from 'lucide-react';
import SignupModal from '../SignupModal';
import LoginModal from '../LoginModal';
import ActivateCardModal from '../ActivateCardModal';

const TermsOfServicePage = () => {
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
                            item.path === '/terms-of-service' ? 'text-white font-medium bg-purple-700' : 'text-gray-200 hover:text-white'
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
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-full mb-6">
            <Scale size={40} />
          </div>
          <h1 className="text-5xl font-bold mb-4">Terms of Service</h1>
          <p className="text-xl text-purple-200 mb-4">
            Effective Date: January 1, 2025
          </p>
          <p className="text-purple-300 max-w-3xl mx-auto">
            Please read these Terms of Service carefully before using GlobalPay services. By creating an account or using our platform, you agree to be bound by these terms.
          </p>
        </div>

        {/* Quick Overview */}
        <div className="bg-blue-900 bg-opacity-50 rounded-lg p-8 border border-blue-500 mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <FileText className="mr-3" size={28} />
            Terms at a Glance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-bold mb-2">✓ You Must Be 18+</h4>
              <p className="text-purple-200 text-sm">Legal age required to use our services</p>
            </div>
            <div>
              <h4 className="font-bold mb-2">✓ KYC Required</h4>
              <p className="text-purple-200 text-sm">Identity verification mandatory for compliance</p>
            </div>
            <div>
              <h4 className="font-bold mb-2">✓ Fees Apply</h4>
              <p className="text-purple-200 text-sm">Transparent pricing with no hidden charges</p>
            </div>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-12">
          {/* Section 1 */}
          <div className="bg-purple-800 bg-opacity-60 rounded-lg p-8 backdrop-blur-sm border border-purple-600">
            <h2 className="text-3xl font-bold mb-6 flex items-center">
              <BookOpen className="mr-3 text-green-400" size={32} />
              1. Acceptance of Terms
            </h2>
            
            <div className="space-y-4 text-purple-200">
              <p>
                Welcome to GlobalPay! These Terms of Service ("Terms") constitute a legally binding agreement between you and GlobalPay Inc. ("GlobalPay," "we," "us," or "our") governing your access to and use of our financial technology platform, mobile applications, websites, and related services (collectively, the "Services").
              </p>
              
              <div className="bg-yellow-900 bg-opacity-40 border border-yellow-600 rounded-lg p-4">
                <div className="flex items-start">
                  <AlertTriangle className="mr-3 flex-shrink-0 text-yellow-400 mt-1" size={24} />
                  <div>
                    <h4 className="font-bold text-yellow-300 mb-2">Important</h4>
                    <p className="text-sm">
                      By clicking "I Agree," creating an account, or using any of our Services, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy. If you do not agree, you must not access or use our Services.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                These Terms apply to all users of the Services, including but not limited to users who are browsers, customers, merchants, and contributors of content.
              </p>
            </div>
          </div>

          {/* Section 2 */}
          <div className="bg-purple-800 bg-opacity-60 rounded-lg p-8 backdrop-blur-sm border border-purple-600">
            <h2 className="text-3xl font-bold mb-6 flex items-center">
              <Users className="mr-3 text-blue-400" size={32} />
              2. Eligibility & Account Registration
            </h2>
            
            <div className="space-y-6 text-purple-200">
              <div>
                <h3 className="text-xl font-bold text-white mb-3">2.1 Age Requirement</h3>
                <p>
                  You must be at least 18 years old to use GlobalPay Services. By agreeing to these Terms, you represent and warrant that you are of legal age to form a binding contract with GlobalPay.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">2.2 Account Creation</h3>
                <p className="mb-3">To access our Services, you must create an account by providing:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Accurate, complete, and current personal information</li>
                  <li>A valid email address and phone number</li>
                  <li>A secure password meeting our security requirements</li>
                  <li>Government-issued identification for KYC verification</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">2.3 Account Security</h3>
                <p className="mb-3">You are responsible for:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Maintaining the confidentiality of your account credentials</li>
                  <li>All activities that occur under your account</li>
                  <li>Notifying us immediately of any unauthorized access</li>
                  <li>Ensuring your account information remains accurate and up-to-date</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">2.4 One Account Per Person</h3>
                <p>
                  Each individual may maintain only one GlobalPay account. Creating multiple accounts, or allowing others to use your account, is strictly prohibited and may result in account termination.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="bg-purple-800 bg-opacity-60 rounded-lg p-8 backdrop-blur-sm border border-purple-600">
            <h2 className="text-3xl font-bold mb-6 flex items-center">
              <Shield className="mr-3 text-yellow-400" size={32} />
              3. Know Your Customer (KYC) & Verification
            </h2>
            
            <div className="space-y-6 text-purple-200">
              <div>
                <h3 className="text-xl font-bold text-white mb-3">3.1 Verification Requirements</h3>
                <p className="mb-3">
                  As a licensed money services business, GlobalPay is required to verify user identities under applicable Anti-Money Laundering (AML) and Know Your Customer (KYC) regulations. You must provide:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Full legal name and date of birth</li>
                  <li>Residential address</li>
                  <li>Government-issued photo ID (passport, driver's license, or national ID)</li>
                  <li>Social Security Number (US customers only)</li>
                  <li>Selfie or biometric verification</li>
                  <li>Source of funds documentation (for higher limits)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">3.2 Verification Levels</h3>
                <div className="space-y-3">
                  <div className="bg-purple-900 bg-opacity-60 p-4 rounded-lg">
                    <h4 className="font-bold text-green-400 mb-2">Level 1 - Basic (Unverified)</h4>
                    <ul className="text-sm space-y-1">
                      <li>• $500 monthly transaction limit</li>
                      <li>• Limited features</li>
                      <li>• Cannot withdraw funds</li>
                    </ul>
                  </div>
                  <div className="bg-purple-900 bg-opacity-60 p-4 rounded-lg">
                    <h4 className="font-bold text-blue-400 mb-2">Level 2 - Verified</h4>
                    <ul className="text-sm space-y-1">
                      <li>• $10,000 monthly transaction limit</li>
                      <li>• Full platform access</li>
                      <li>• Crypto card eligibility</li>
                    </ul>
                  </div>
                  <div className="bg-purple-900 bg-opacity-60 p-4 rounded-lg">
                    <h4 className="font-bold text-purple-400 mb-2">Level 3 - Enhanced</h4>
                    <ul className="text-sm space-y-1">
                      <li>• $100,000+ monthly limits</li>
                      <li>• Priority support</li>
                      <li>• Business account features</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">3.3 Ongoing Monitoring</h3>
                <p>
                  GlobalPay reserves the right to request additional information or documentation at any time to comply with regulatory requirements or to verify the legitimacy of your transactions.
                </p>
              </div>
            </div>
          </div>

          {/* Section 4 */}
          <div className="bg-purple-800 bg-opacity-60 rounded-lg p-8 backdrop-blur-sm border border-purple-600">
            <h2 className="text-3xl font-bold mb-6 flex items-center">
              <DollarSign className="mr-3 text-green-400" size={32} />
              4. Services & Features
            </h2>
            
            <div className="space-y-6 text-purple-200">
              <div>
                <h3 className="text-xl font-bold text-white mb-3">4.1 Money Transfer Services</h3>
                <p className="mb-3">GlobalPay enables you to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Send money domestically and internationally to 180+ countries</li>
                  <li>Receive funds from other GlobalPay users or external sources</li>
                  <li>Convert between fiat currencies and cryptocurrencies</li>
                  <li>Schedule recurring payments and batch transfers</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">4.2 Crypto Services</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Buy, sell, and hold cryptocurrency</li>
                  <li>Transfer crypto to external wallets</li>
                  <li>Receive crypto payments</li>
                  <li>Crypto-backed prepaid cards</li>
                  <li>Crypto gift card purchases and activations</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">4.3 Digital Wallets</h3>
                <p>
                  Store multiple currencies (fiat and crypto) in secure, FDIC-insured (for USD deposits) or blockchain-based wallets.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">4.4 Business Solutions</h3>
                <p className="mb-3">For verified business accounts:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>API integration for payment processing</li>
                  <li>Bulk payment capabilities</li>
                  <li>Smart contract creation and management</li>
                  <li>Invoice generation and management</li>
                </ul>
              </div>

              <div className="bg-orange-900 bg-opacity-40 border border-orange-600 rounded-lg p-4">
                <h4 className="font-bold text-orange-300 mb-2">Service Availability</h4>
                <p className="text-sm">
                  Service availability may vary by jurisdiction. GlobalPay reserves the right to modify, suspend, or discontinue any feature at any time with or without notice.
                </p>
              </div>
            </div>
          </div>

          {/* Section 5 */}
          <div className="bg-purple-800 bg-opacity-60 rounded-lg p-8 backdrop-blur-sm border border-purple-600">
            <h2 className="text-3xl font-bold mb-6 flex items-center">
              <DollarSign className="mr-3 text-yellow-400" size={32} />
              5. Fees & Charges
            </h2>
            
            <div className="space-y-6 text-purple-200">
              <div>
                <h3 className="text-xl font-bold text-white mb-3">5.1 Transaction Fees</h3>
                <div className="bg-purple-900 bg-opacity-60 p-6 rounded-lg">
                  <ul className="space-y-3">
                    <li><strong>International Transfers:</strong> Flat $2 fee (save up to 97% vs traditional banks)</li>
                    <li><strong>Domestic Transfers:</strong> Free for GlobalPay-to-GlobalPay transfers</li>
                    <li><strong>Crypto Purchases:</strong> 1.5% of transaction amount</li>
                    <li><strong>Crypto Withdrawals:</strong> Network fees apply (varies by blockchain)</li>
                    <li><strong>Card Transactions:</strong> Free (merchant pays processing fee)</li>
                    <li><strong>ATM Withdrawals:</strong> $2.50 per transaction</li>
                    <li><strong>Currency Conversion:</strong> Mid-market rate + 0.5% markup</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">5.2 Account Fees</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Account opening and maintenance: Free</li>
                  <li>Crypto card issuance: $10 one-time fee</li>
                  <li>Card replacement: $5</li>
                  <li>Inactive account (12+ months): $5/month</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">5.3 Fee Changes</h3>
                <p>
                  We reserve the right to modify our fee structure with 30 days' notice. Current fees are always displayed in your account dashboard and on our website.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">5.4 Third-Party Fees</h3>
                <p>
                  You may incur additional fees from third parties (banks, payment processors, network operators) which are beyond our control.
                </p>
              </div>
            </div>
          </div>

          {/* Section 6 */}
          <div className="bg-purple-800 bg-opacity-60 rounded-lg p-8 backdrop-blur-sm border border-purple-600">
            <h2 className="text-3xl font-bold mb-6 flex items-center">
              <XCircle className="mr-3 text-red-400" size={32} />
              6. Prohibited Activities
            </h2>
            
            <div className="space-y-4 text-purple-200">
              <p className="font-bold text-white">You agree NOT to use GlobalPay Services to:</p>
              
              <div className="space-y-3">
              <div className="bg-red-900 bg-opacity-30 border border-red-600 rounded-lg p-4">
                  <h4 className="font-bold text-red-300 mb-2">⚠ Illegal Activities</h4>
                  <ul className="text-sm space-y-1 ml-4">
                    <li>• Money laundering or terrorist financing</li>
                    <li>• Purchase of illegal goods or services</li>
                    <li>• Fraud, scams, or deceptive practices</li>
                    <li>• Tax evasion or regulatory violations</li>
                  </ul>
                </div>

                <div className="bg-red-900 bg-opacity-30 border border-red-600 rounded-lg p-4">
                  <h4 className="font-bold text-red-300 mb-2">⚠ Prohibited Transactions</h4>
                  <ul className="text-sm space-y-1 ml-4">
                    <li>• Gambling or betting services (where prohibited)</li>
                    <li>• Adult content or services</li>
                    <li>• Weapons, explosives, or controlled substances</li>
                    <li>• Counterfeit goods or intellectual property violations</li>
                    <li>• Pyramid schemes or multi-level marketing</li>
                  </ul>
                </div>

                <div className="bg-red-900 bg-opacity-30 border border-red-600 rounded-lg p-4">
                  <h4 className="font-bold text-red-300 mb-2">⚠ Account Misuse</h4>
                  <ul className="text-sm space-y-1 ml-4">
                    <li>• Create multiple accounts or share account access</li>
                    <li>• Manipulate or bypass security measures</li>
                    <li>• Use automated tools or bots</li>
                    <li>• Provide false or misleading information</li>
                    <li>• Engage in market manipulation or wash trading</li>
                  </ul>
                </div>

                <div className="bg-yellow-900 bg-opacity-40 border border-yellow-600 rounded-lg p-4 mt-4">
                  <p className="text-sm">
                    <strong>Violation Consequences:</strong> Engaging in prohibited activities may result in immediate account suspension, fund seizure, legal action, and reporting to law enforcement authorities.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 7 */}
          <div className="bg-purple-800 bg-opacity-60 rounded-lg p-8 backdrop-blur-sm border border-purple-600">
            <h2 className="text-3xl font-bold mb-6 flex items-center">
              <RefreshCw className="mr-3 text-purple-400" size={32} />
              7. Transaction Processing & Reversals
            </h2>
            
            <div className="space-y-6 text-purple-200">
              <div>
                <h3 className="text-xl font-bold text-white mb-3">7.1 Processing Times</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Crypto transactions:</strong> Typically within minutes, subject to blockchain confirmation times</li>
                  <li><strong>Domestic fiat transfers:</strong> 1-2 business days</li>
                  <li><strong>International transfers:</strong> 2-5 business days</li>
                  <li><strong>Card loads:</strong> Instant</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">7.2 Transaction Limits</h3>
                <p className="mb-3">Limits vary based on verification level, account history, and jurisdiction:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Per transaction limits apply</li>
                  <li>Daily and monthly cumulative limits enforced</li>
                  <li>Higher limits available upon request with additional verification</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">7.3 Cancellations & Reversals</h3>
                <p className="mb-3">
                  Cryptocurrency transactions on blockchain networks are irreversible. For fiat transactions:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Cancellation possible only if transaction hasn't been processed</li>
                  <li>Contact support immediately for cancellation requests</li>
                  <li>Disputed transactions require documentation and investigation</li>
                  <li>Chargebacks may result in account review or suspension</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">7.4 Rejected Transactions</h3>
                <p className="mb-3">GlobalPay may reject or delay transactions that:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Exceed account limits or appear fraudulent</li>
                  <li>Violate sanctions or regulatory requirements</li>
                  <li>Lack sufficient documentation or verification</li>
                  <li>Are flagged by our fraud detection systems</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 8 */}
          <div className="bg-purple-800 bg-opacity-60 rounded-lg p-8 backdrop-blur-sm border border-purple-600">
            <h2 className="text-3xl font-bold mb-6 flex items-center">
              <AlertTriangle className="mr-3 text-orange-400" size={32} />
              8. Risks & Disclaimers
            </h2>
            
            <div className="space-y-6 text-purple-200">
              <div>
                <h3 className="text-xl font-bold text-white mb-3">8.1 Cryptocurrency Risks</h3>
                <div className="bg-orange-900 bg-opacity-40 border border-orange-600 rounded-lg p-4">
                  <p className="mb-3 font-bold text-orange-300">IMPORTANT: Cryptocurrency investments carry significant risks:</p>
                  <ul className="text-sm space-y-2">
                    <li>• <strong>Volatility:</strong> Crypto values can fluctuate dramatically</li>
                    <li>• <strong>Loss Risk:</strong> You may lose your entire investment</li>
                    <li>• <strong>Irreversibility:</strong> Blockchain transactions cannot be reversed</li>
                    <li>• <strong>No Insurance:</strong> Crypto assets are NOT FDIC-insured</li>
                    <li>• <strong>Regulatory Changes:</strong> Laws affecting crypto may change</li>
                    <li>• <strong>Technical Risks:</strong> Smart contract bugs, network issues, or hacks</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">8.2 No Investment Advice</h3>
                <p>
                  GlobalPay is a technology platform, not a financial advisor. We do not provide investment advice, recommendations, or endorsements. You are solely responsible for your investment decisions.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">8.3 Banking Disclaimer</h3>
                <div className="bg-blue-900 bg-opacity-40 border border-blue-600 rounded-lg p-4">
                  <p className="text-sm">
                    GlobalPay is a financial technology platform and is NOT a bank. In the USA, banking services and FDIC insurance for USD deposits are provided by BankProv, Member FDIC. Deposit insurance only protects against bank failure. Cryptocurrency and non-bank digital wallet balances are not FDIC-insured and may lose value.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">8.4 Service Availability</h3>
                <p>
                  We strive for 99.9% uptime but cannot guarantee uninterrupted service. We are not liable for losses due to system downtime, maintenance, or technical issues.
                </p>
              </div>
            </div>
          </div>
          {/* Section 9 */}
          <div className="bg-purple-800 bg-opacity-60 rounded-lg p-8 backdrop-blur-sm border border-purple-600">
            <h2 className="text-3xl font-bold mb-6 flex items-center">
              <Shield className="mr-3 text-cyan-400" size={32} />
              9. Liability & Indemnification
            </h2>
            
            <div className="space-y-6 text-purple-200">
              <div>
                <h3 className="text-xl font-bold text-white mb-3">9.1 Limitation of Liability</h3>
                <p className="mb-3">
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, GLOBALPAY SHALL NOT BE LIABLE FOR:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Indirect, incidental, special, or consequential damages</li>
                  <li>Loss of profits, revenue, data, or business opportunities</li>
                  <li>Cryptocurrency price fluctuations or market losses</li>
                  <li>Unauthorized access to your account due to your negligence</li>
                  <li>Third-party actions or services</li>
                </ul>
                <p className="mt-3 text-sm">
                  Our total liability shall not exceed the fees you paid to GlobalPay in the 12 months preceding the claim or $100, whichever is greater.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">9.2 User Indemnification</h3>
                <p className="mb-3">
                  You agree to indemnify and hold harmless GlobalPay, its officers, directors, employees, and agents from any claims, damages, losses, or expenses (including legal fees) arising from:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Your violation of these Terms</li>
                  <li>Your use or misuse of the Services</li>
                  <li>Your violation of any laws or third-party rights</li>
                  <li>Your negligent or willful misconduct</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">9.3 Force Majeure</h3>
                <p>
                  GlobalPay is not liable for delays or failures due to circumstances beyond our reasonable control, including natural disasters, wars, terrorism, pandemics, government actions, or infrastructure failures.
                </p>
              </div>
            </div>
          </div>

          {/* Section 10 */}
          <div className="bg-purple-800 bg-opacity-60 rounded-lg p-8 backdrop-blur-sm border border-purple-600">
            <h2 className="text-3xl font-bold mb-6 flex items-center">
              <Lock className="mr-3 text-red-400" size={32} />
              10. Account Suspension & Termination
            </h2>
            
            <div className="space-y-6 text-purple-200">
              <div>
                <h3 className="text-xl font-bold text-white mb-3">10.1 Suspension Reasons</h3>
                <p className="mb-3">We may suspend or restrict your account if:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>You violate these Terms or applicable laws</li>
                  <li>We suspect fraudulent or suspicious activity</li>
                  <li>Required by law enforcement or regulators</li>
                  <li>You fail to provide requested verification documents</li>
                  <li>Your account shows signs of compromise</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">10.2 Termination by GlobalPay</h3>
                <p className="mb-3">
                  We reserve the right to terminate your account and refuse service at any time, with or without cause, with or without notice. Reasons may include:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Repeated Terms violations</li>
                  <li>Fraudulent activity or illegal conduct</li>
                  <li>Abusive behavior toward staff or other users</li>
                  <li>Extended account inactivity</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">10.3 Termination by You</h3>
                <p className="mb-3">
                  You may close your account at any time by:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Contacting customer support</li>
                  <li>Withdrawing all funds</li>
                  <li>Completing any pending transactions</li>
                </ul>
                <p className="mt-3 text-sm">
                  Account closure does not release you from obligations incurred prior to closure.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">10.4 Post-Termination</h3>
                <p>
                  Upon termination, you must immediately cease using the Services. We will return your funds (minus any applicable fees or amounts owed) within 30 days, subject to regulatory requirements and fraud investigations.
                </p>
              </div>
            </div>
          </div>

          {/* Section 11 */}
          <div className="bg-purple-800 bg-opacity-60 rounded-lg p-8 backdrop-blur-sm border border-purple-600">
            <h2 className="text-3xl font-bold mb-6 flex items-center">
              <Gavel className="mr-3 text-purple-400" size={32} />
              11. Dispute Resolution & Arbitration
            </h2>
            
            <div className="space-y-6 text-purple-200">
              <div>
                <h3 className="text-xl font-bold text-white mb-3">11.1 Informal Resolution</h3>
                <p>
                  Before initiating formal proceedings, you agree to contact us at disputes@globalpay.com to attempt to resolve the issue informally. Most disputes can be resolved quickly through our customer support team.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">11.2 Binding Arbitration</h3>
                <p className="mb-3">
                  If informal resolution fails, you agree that disputes will be resolved through binding arbitration rather than in court, except for:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Small claims court matters (under $10,000)</li>
                  <li>Intellectual property disputes</li>
                  <li>Injunctive relief requests</li>
                </ul>
                <p className="mt-3">
                  Arbitration will be conducted by the American Arbitration Association (AAA) under its Commercial Arbitration Rules.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">11.3 Class Action Waiver</h3>
                <div className="bg-yellow-900 bg-opacity-40 border border-yellow-600 rounded-lg p-4">
                  <p className="text-sm font-bold text-yellow-300 mb-2">
                    YOU AGREE THAT DISPUTES WILL BE RESOLVED INDIVIDUALLY, NOT AS A CLASS ACTION, CLASS ARBITRATION, OR CONSOLIDATED PROCEEDING.
                  </p>
                  <p className="text-sm">
                    You waive the right to participate in class action lawsuits against GlobalPay.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">11.4 Governing Law</h3>
                <p>
                  These Terms are governed by the laws of the State of New York, USA, without regard to conflict of law principles. Any court proceedings (where arbitration doesn't apply) must be brought in New York County, New York.
                </p>
              </div>
            </div>
          </div>

          {/* Section 12 */}
          <div className="bg-purple-800 bg-opacity-60 rounded-lg p-8 backdrop-blur-sm border border-purple-600">
            <h2 className="text-3xl font-bold mb-6 flex items-center">
              <Globe className="mr-3 text-green-400" size={32} />
              12. Intellectual Property
            </h2>
            
            <div className="space-y-4 text-purple-200">
              <div>
                <h3 className="text-xl font-bold text-white mb-3">12.1 GlobalPay Ownership</h3>
                <p>
                  All intellectual property rights in the Services, including trademarks, logos, software, designs, and content, are owned by GlobalPay or our licensors. You may not copy, modify, distribute, or create derivative works without our written permission.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">12.2 Limited License</h3>
                <p>
                  We grant you a limited, non-exclusive, non-transferable license to access and use the Services for personal or internal business purposes in accordance with these Terms.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">12.3 User Content</h3>
                <p>
                  You retain ownership of content you submit but grant GlobalPay a worldwide, royalty-free license to use, reproduce, and display such content for operating and improving the Services.
                </p>
              </div>
            </div>
          </div>

          {/* Section 13 */}
          <div className="bg-purple-800 bg-opacity-60 rounded-lg p-8 backdrop-blur-sm border border-purple-600">
            <h2 className="text-3xl font-bold mb-6 flex items-center">
              <RefreshCw className="mr-3 text-blue-400" size={32} />
              13. Modifications to Terms
            </h2>
            
            <div className="space-y-4 text-purple-200">
              <p>
                GlobalPay reserves the right to modify these Terms at any time. We will notify you of material changes via email or in-app notification at least 30 days before the changes take effect.
              </p>
              <p>
                Continued use of the Services after changes become effective constitutes acceptance of the modified Terms. If you do not agree to the changes, you must stop using the Services and close your account.
              </p>
              <p className="text-sm">
                The "Effective Date" at the top of these Terms reflects the most recent version. We encourage you to review these Terms periodically.
              </p>
            </div>
          </div>

          {/* Section 14 */}
          <div className="bg-purple-800 bg-opacity-60 rounded-lg p-8 backdrop-blur-sm border border-purple-600">
            <h2 className="text-3xl font-bold mb-6 flex items-center">
              <MessageSquare className="mr-3 text-cyan-400" size={32} />
              14. Communications & Notices
            </h2>
            
            <div className="space-y-4 text-purple-200">
              <div>
                <h3 className="text-xl font-bold text-white mb-3">14.1 Electronic Communications</h3>
                <p>
                  By using GlobalPay, you consent to receive electronic communications from us, including emails, in-app messages, and SMS. These communications may include service announcements, security alerts, and promotional offers (which you can opt out of).
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">14.2 Contact Information</h3>
                <p>
                  You must maintain accurate contact information. We are not responsible for failed communications due to incorrect information.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">14.3 Legal Notices</h3>
                <p>
                  Legal notices to GlobalPay must be sent to: legal@globalpay.com or GlobalPay Inc., Legal Department, 123 Financial District, New York, NY 10004.
                </p>
              </div>
            </div>
          </div>

          {/* Section 15 */}
          <div className="bg-purple-800 bg-opacity-60 rounded-lg p-8 backdrop-blur-sm border border-purple-600">
            <h2 className="text-3xl font-bold mb-6 flex items-center">
              <FileText className="mr-3 text-purple-400" size={32} />
              15. Miscellaneous
            </h2>
            
            <div className="space-y-4 text-purple-200">
              <div>
                <h3 className="text-xl font-bold text-white mb-3">15.1 Entire Agreement</h3>
                <p>
                  These Terms, together with our Privacy Policy and any additional terms for specific services, constitute the entire agreement between you and GlobalPay.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">15.2 Severability</h3>
                <p>
                  If any provision of these Terms is found unenforceable, the remaining provisions will continue in full force and effect.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">15.3 No Waiver</h3>
                <p>
                  Our failure to enforce any provision does not constitute a waiver of that provision or our right to enforce it later.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">15.4 Assignment</h3>
                <p>
                  You may not transfer or assign your account or these Terms without our written consent. We may assign these Terms at any time without notice.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">15.5 Survival</h3>
                <p>
                  Provisions that by their nature should survive termination (including liability limitations, indemnification, and dispute resolution) will continue after these Terms end.
                </p>
              </div>
            </div>
          </div>

          {/* Section 16 - Contact */}
          <div className="bg-purple-800 bg-opacity-60 rounded-lg p-8 backdrop-blur-sm border border-purple-600">
            <h2 className="text-3xl font-bold mb-6 flex items-center">
              <Mail className="mr-3 text-green-400" size={32} />
              16. Contact Information
            </h2>
            
            <div className="space-y-6 text-purple-200">
              <p>
                If you have questions about these Terms of Service, please contact us:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-purple-900 bg-opacity-60 p-6 rounded-lg">
                  <h4 className="font-bold text-white mb-4">Customer Support</h4>
                  <div className="space-y-2 text-sm">
                    <p className="flex items-center">
                      <Mail className="mr-2" size={16} />
                      support@globalpay.com
                    </p>
                    <p className="flex items-center">
                      <PhoneCall className="mr-2" size={16} />
                      +1-800-GLOBALPAY
                    </p>
                    <p className="text-purple-300">Available 24/7</p>
                  </div>
                </div>

                <div className="bg-purple-900 bg-opacity-60 p-6 rounded-lg">
                  <h4 className="font-bold text-white mb-4">Legal Department</h4>
                  <div className="space-y-2 text-sm">
                    <p className="flex items-center">
                      <Mail className="mr-2" size={16} />
                      legal@globalpay.com
                    </p>
                    <p>GlobalPay Inc.</p>
                    <p>123 Financial District</p>
                    <p>New York, NY 10004</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Acknowledgment */}
          <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-lg p-8 border-2 border-blue-500">
            <div className="flex items-start">
              <CheckCircle className="mr-4 flex-shrink-0 text-blue-400" size={32} />
              <div>
                <h3 className="text-2xl font-bold mb-3">Agreement Acknowledgment</h3>
                <p className="text-purple-200 mb-4">
                  By clicking "I Agree," creating an account, or using GlobalPay Services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
                </p>
                <p className="text-purple-300 text-sm">
                  Last Updated: January 1, 2025 | Version 2.0
                </p>
              </div>
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

export default TermsOfServicePage;