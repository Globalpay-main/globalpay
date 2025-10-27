// src/pages/PrivacyPolicy.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Eye, Lock, Database, Globe, Users, FileText, AlertCircle, Mail, Phone, Menu, X, ChevronDown, CheckCircle } from 'lucide-react';
import SignupModal from '../SignupModal';
import LoginModal from '../LoginModal';
import ActivateCardModal from '../ActivateCardModal';

const PrivacyPolicyPage = () => {
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
                            item.path === '/privacy-policy' ? 'text-white font-medium bg-purple-700' : 'text-gray-200 hover:text-white'
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

      <div className="pt-20 pb-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-bold mb-6">
              Privacy <span className="text-blue-400">Policy</span>
            </h1>
            <p className="text-xl text-purple-200 mb-4">
              Last Updated: January 1, 2025
            </p>
            <p className="text-lg text-purple-300">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
          </div>

          {/* Quick Overview */}
          <div className="bg-blue-900 bg-opacity-50 rounded-lg p-8 border border-blue-500 mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Eye className="mr-3" size={28} />
              Privacy at a Glance
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold mb-2">What We Collect</h4>
                <ul className="text-purple-200 text-sm space-y-1">
                  <li>• Personal identification information</li>
                  <li>• Financial and transaction data</li>
                  <li>• Device and usage information</li>
                  <li>• KYC verification documents</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-2">How We Protect It</h4>
                <ul className="text-purple-200 text-sm space-y-1">
                  <li>• AES-256 encryption</li>
                  <li>• Secure data centers</li>
                  <li>• Regular security audits</li>
                  <li>• Strict access controls</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Detailed Sections */}
          <div className="space-y-12">
            {/* Section 1 */}
            <div className="bg-purple-800 bg-opacity-60 rounded-lg p-8 backdrop-blur-sm border border-purple-600">
              <h2 className="text-3xl font-bold mb-6 flex items-center">
                <FileText className="mr-3 text-green-400" size={32} />
                1. Information We Collect
              </h2>
              
              <div className="space-y-6 text-purple-200">
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">1.1 Personal Information</h3>
                  <p className="mb-3">
                    When you create an account with GlobalPay, we collect:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Full name, email address, and phone number</li>
                    <li>Date of birth and residential address</li>
                    <li>Government-issued identification documents</li>
                    <li>Social Security Number (for US customers only)</li>
                    <li>Biometric data (facial recognition for verification)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">1.2 Financial Information</h3>
                  <p className="mb-3">
                    To process transactions and comply with financial regulations:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Bank account details and routing numbers</li>
                    <li>Credit/debit card information</li>
                    <li>Transaction history and patterns</li>
                    <li>Cryptocurrency wallet addresses</li>
                    <li>Source of funds documentation</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-3">1.3 Technical Data</h3>
                  <p className="mb-3">
                    We automatically collect certain information when you use our services:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>IP address and device identifiers</li>
                    <li>Browser type and operating system</li>
                    <li>Location data (GPS, WiFi, cellular)</li>
                    <li>Usage patterns and interaction data</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div className="bg-purple-800 bg-opacity-60 rounded-lg p-8 backdrop-blur-sm border border-purple-600">
              <h2 className="text-3xl font-bold mb-6 flex items-center">
                <Database className="mr-3 text-blue-400" size={32} />
                2. How We Use Your Information
              </h2>
              
              <div className="space-y-6 text-purple-200">
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">2.1 Service Delivery</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Process and facilitate your transactions</li>
                    <li>Manage your account and provide customer support</li>
                    <li>Verify your identity and prevent fraud</li>
                    <li>Send service-related notifications and updates</li>
                    <li>Improve and personalize your experience</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-3">2.2 Compliance and Security</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Comply with legal obligations and regulations (KYC/AML)</li>
                    <li>Detect and prevent fraud, money laundering, and other illegal activities</li>
                    <li>Conduct risk assessments and security audits</li>
                    <li>Respond to legal requests and enforce our terms</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-3">2.3 Marketing and Analytics</h3>
                  <p className="mb-2">With your consent, we may use your information to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Send promotional materials and special offers</li>
                    <li>Conduct market research and analytics</li>
                    <li>Improve our products and services</li>
                    <li>Provide personalized recommendations</li>
                  </ul>
                  <p className="mt-3 text-sm italic">
                    You can opt-out of marketing communications at any time through your account settings or by clicking the unsubscribe link in our emails.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 3 */}
            <div className="bg-purple-800 bg-opacity-60 rounded-lg p-8 backdrop-blur-sm border border-purple-600">
              <h2 className="text-3xl font-bold mb-6 flex items-center">
                <Users className="mr-3 text-yellow-400" size={32} />
                3. Information Sharing and Disclosure
              </h2>
              
              <div className="space-y-6 text-purple-200">
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">3.1 Service Providers</h3>
                  <p className="mb-3">
                    We share your information with trusted third-party service providers who help us operate our business:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Payment processors and financial institutions (e.g., BankProv)</li>
                    <li>Identity verification services</li>
                    <li>Cloud hosting and data storage providers</li>
                    <li>Customer service and communication platforms</li>
                    <li>Analytics and marketing services</li>
                  </ul>
                  <p className="mt-3 text-sm">
                    These providers are contractually obligated to protect your information and use it only for the services they provide to us.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-3">3.2 Legal Requirements</h3>
                  <p className="mb-3">
                    We may disclose your information when required by law or to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Comply with legal processes, court orders, or government requests</li>
                    <li>Enforce our terms of service and other agreements</li>
                    <li>Protect our rights, property, or safety</li>
                    <li>Prevent fraud, abuse, or illegal activities</li>
                    <li>Respond to emergencies or threats to public safety</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-3">3.3 Business Transfers</h3>
                  <p>
                    In the event of a merger, acquisition, reorganization, or sale of assets, your information may be transferred to the acquiring entity. We will notify you of any such change and the choices you may have regarding your information.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-3">3.4 With Your Consent</h3>
                  <p>
                    We may share your information with other parties when you explicitly consent to such sharing, such as when you authorize a third-party app to access your GlobalPay account.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 4 */}
            <div className="bg-purple-800 bg-opacity-60 rounded-lg p-8 backdrop-blur-sm border border-purple-600">
              <h2 className="text-3xl font-bold mb-6 flex items-center">
                <Lock className="mr-3 text-red-400" size={32} />
                4. Data Security
              </h2>
              
              <div className="space-y-6 text-purple-200">
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">4.1 Security Measures</h3>
                  <p className="mb-3">
                    We implement industry-leading security practices to protect your information:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Encryption:</strong> AES-256 encryption for data at rest and TLS 1.3 for data in transit</li>
                    <li><strong>Access Controls:</strong> Multi-factor authentication and role-based access restrictions</li>
                    <li><strong>Network Security:</strong> Firewalls, intrusion detection systems, and DDoS protection</li>
                    <li><strong>Monitoring:</strong> 24/7 security monitoring and incident response team</li>
                    <li><strong>Compliance:</strong> Regular security audits and penetration testing</li>
                    <li><strong>Blockchain:</strong> Immutable transaction records on secure blockchain networks</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-3">4.2 Data Retention</h3>
                  <p className="mb-3">
                    We retain your information for as long as necessary to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Provide our services and maintain your account</li>
                    <li>Comply with legal and regulatory requirements (typically 7 years for financial records)</li>
                    <li>Resolve disputes and enforce our agreements</li>
                    <li>Detect and prevent fraud</li>
                  </ul>
                  <p className="mt-3">
                    When information is no longer needed, we securely delete or anonymize it in accordance with our data retention policy and applicable laws.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-3">4.3 Your Responsibility</h3>
                  <p>
                    While we implement robust security measures, you also play a crucial role in protecting your account:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                    <li>Keep your password and PIN confidential</li>
                    <li>Enable two-factor authentication</li>
                    <li>Monitor your account for unauthorized activity</li>
                    <li>Report suspicious activity immediately</li>
                    <li>Keep your contact information up to date</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 5 */}
            <div className="bg-purple-800 bg-opacity-60 rounded-lg p-8 backdrop-blur-sm border border-purple-600">
              <h2 className="text-3xl font-bold mb-6 flex items-center">
                <Shield className="mr-3 text-purple-400" size={32} />
                5. Your Rights and Choices
              </h2>
              
              <div className="space-y-6 text-purple-200">
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">5.1 Access and Correction</h3>
                  <p>
                    You have the right to access and update your personal information. You can:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                    <li>View and edit your profile information through your account settings</li>
                    <li>Request a copy of your personal data by contacting our support team</li>
                    <li>Correct inaccurate or incomplete information</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-3">5.2 Data Portability</h3>
                  <p>
                    You have the right to receive your personal data in a structured, commonly used, and machine-readable format. Contact us to request a data export.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-3">5.3 Deletion and Account Closure</h3>
                  <p className="mb-3">
                    You may request deletion of your personal data or closure of your account, subject to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Legal obligations to retain certain records</li>
                    <li>Completion of pending transactions</li>
                    <li>Resolution of disputes or investigations</li>
                  </ul>
                  <p className="mt-3">
                    Please note that account closure is permanent and you will lose access to all services and data associated with your account.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-3">5.4 Marketing Preferences</h3>
                  <p>
                    You can control marketing communications by:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                    <li>Adjusting preferences in your account settings</li>
                    <li>Clicking "unsubscribe" in our emails</li>
                    <li>Contacting customer support</li>
                  </ul>
                  <p className="mt-3 text-sm italic">
                    Note: You will still receive important service-related communications even if you opt out of marketing emails.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-3">5.5 Regional Rights</h3>
                  <p className="mb-3">
                    Depending on your location, you may have additional rights:
                  </p>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-bold text-white">For EU/EEA Residents (GDPR):</h4>
                      <ul className="list-disc list-inside ml-4 text-sm">
                        <li>Right to object to processing</li>
                        <li>Right to restrict processing</li>
                        <li>Right to lodge a complaint with supervisory authority</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-white">For California Residents (CCPA/CPRA):</h4>
                      <ul className="list-disc list-inside ml-4 text-sm">
                        <li>Right to know what personal information is collected</li>
                        <li>Right to opt-out of sale/sharing of personal information</li>
                        <li>Right to non-discrimination for exercising privacy rights</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 6 */}
            <div className="bg-purple-800 bg-opacity-60 rounded-lg p-8 backdrop-blur-sm border border-purple-600">
              <h2 className="text-3xl font-bold mb-6 flex items-center">
                <Globe className="mr-3 text-green-400" size={32} />
                6. International Data Transfers
              </h2>
              
              <div className="space-y-4 text-purple-200">
                <p>
                  GlobalPay operates globally and may transfer your information to countries other than where you reside. We ensure appropriate safeguards are in place:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Standard Contractual Clauses (SCCs) approved by the European Commission</li>
                  <li>Adequacy decisions by relevant data protection authorities</li>
                  <li>Privacy Shield Framework compliance where applicable</li>
                  <li>Binding corporate rules for intra-group transfers</li>
                </ul>
                <p className="mt-4">
                  All international transfers comply with applicable data protection laws and regulations.
                </p>
              </div>
            </div>

            {/* Section 7 */}
            <div className="bg-purple-800 bg-opacity-60 rounded-lg p-8 backdrop-blur-sm border border-purple-600">
              <h2 className="text-3xl font-bold mb-6 flex items-center">
                <Users className="mr-3 text-indigo-400" size={32} />
                7. Children's Privacy
              </h2>
              
              <div className="space-y-4 text-purple-200">
                <p>
                  GlobalPay services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children.
                </p>
                <p>
                  If we become aware that we have collected personal information from a child without parental consent, we will take steps to delete that information as quickly as possible.
                </p>
                <p>
                  If you believe we have collected information from a child, please contact us immediately at <a href="mailto:privacy@globalpay.com" className="text-blue-400 hover:underline">privacy@globalpay.com</a>
                </p>
              </div>
            </div>

            {/* Section 8 */}
            <div className="bg-purple-800 bg-opacity-60 rounded-lg p-8 backdrop-blur-sm border border-purple-600">
              <h2 className="text-3xl font-bold mb-6 flex items-center">
                <AlertCircle className="mr-3 text-orange-400" size={32} />
                8. Changes to This Privacy Policy
              </h2>
              
              <div className="space-y-4 text-purple-200">
                <p>
                  We may update this Privacy Policy from time to time to reflect changes in our practices, technologies, legal requirements, or other factors.
                </p>
                <p>
                  When we make material changes:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>We will notify you by email or through in-app notifications</li>
                  <li>We will update the "Last Updated" date at the top of this policy</li>
                  <li>For significant changes, we may require you to accept the new policy to continue using our services</li>
                </ul>
                <p className="mt-4">
                  We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information.
                </p>
              </div>
            </div>

            {/* Section 9 */}
            <div className="bg-purple-800 bg-opacity-60 rounded-lg p-8 backdrop-blur-sm border border-purple-600">
              <h2 className="text-3xl font-bold mb-6 flex items-center">
                <Mail className="mr-3 text-cyan-400" size={32} />
                9. Contact Us
              </h2>
              
              <div className="space-y-6 text-purple-200">
                <p>
                  If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-purple-900 bg-opacity-60 p-6 rounded-lg">
                    <h4 className="font-bold text-white mb-4">Data Protection Officer</h4>
                    <div className="space-y-2 text-sm">
                      <p className="flex items-center">
                        <Mail className="mr-2" size={16} />
                        <a href="mailto:privacy@globalpay.com" className="text-blue-400 hover:underline">privacy@globalpay.com</a>
                      </p>
                      <p className="flex items-center">
                        <Phone className="mr-2" size={16} />
                        +1-800-PRIVACY-GP
                      </p>
                    </div>
                  </div>

                  <div className="bg-purple-900 bg-opacity-60 p-6 rounded-lg">
                    <h4 className="font-bold text-white mb-4">Mailing Address</h4>
                    <div className="text-sm">
                      <p>GlobalPay Inc.</p>
                      <p>Attn: Data Protection Officer</p>
                      <p>123 Financial District</p>
                      <p>New York, NY 10004</p>
                      <p>United States</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-900 bg-opacity-50 rounded-lg p-6 border border-blue-500 mt-6">
                  <h4 className="font-bold text-white mb-3">For EU/EEA Residents:</h4>
                  <p className="text-sm">
                    If you are not satisfied with our response to your privacy concerns, you have the right to lodge a complaint with your local data protection authority.
                  </p>
                </div>
              </div>
            </div>

            {/* Acknowledgment */}
            <div className="bg-gradient-to-r from-green-900 to-blue-900 rounded-lg p-8 border-2 border-green-500">
              <div className="flex items-start">
                <CheckCircle className="mr-4 flex-shrink-0 text-green-400" size={32} />
                <div>
                  <h3 className="text-2xl font-bold mb-3">Your Privacy Matters</h3>
                  <p className="text-purple-200 mb-4">
                    At GlobalPay, protecting your privacy is fundamental to our mission. We are committed to transparency, security, and giving you control over your personal information.
                  </p>
                  <p className="text-purple-300 text-sm">
                    By using GlobalPay services, you acknowledge that you have read and understood this Privacy Policy and agree to our data practices as described herein.
                  </p>
                </div>
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

export default PrivacyPolicyPage;