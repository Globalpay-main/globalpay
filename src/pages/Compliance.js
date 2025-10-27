import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Download, Shield, CheckCircle, FileText, Globe, Users, Lock, AlertTriangle, Award, Eye, Scale, Building, DollarSign, Target, Zap, Database, RefreshCw, Mail, PhoneCall, ChevronDown } from 'lucide-react';
import SignupModal from '../SignupModal';
import LoginModal from '../LoginModal';
import ActivateCardModal from '../ActivateCardModal';

const CompliancePage = () => {
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
                            item.path === '/compliance' ? 'text-white font-medium bg-purple-700' : 'text-gray-200 hover:text-white'
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
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-600 rounded-full mb-6">
            <Shield size={40} />
          </div>
          <h1 className="text-5xl font-bold mb-4">Regulatory Compliance</h1>
          <p className="text-xl text-purple-200 mb-4">
            Committed to Excellence in Financial Compliance
          </p>
          <p className="text-purple-300 max-w-3xl mx-auto">
            GlobalPay operates under the highest regulatory standards, maintaining full compliance with AML, KYC, and financial regulations across all jurisdictions where we operate.
          </p>
        </div>

        {/* Compliance Overview */}
        <div className="bg-green-900 bg-opacity-50 rounded-lg p-8 border border-green-500 mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <CheckCircle className="mr-3" size={28} />
            Our Compliance Commitment
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <Award className="mx-auto mb-3 text-yellow-400" size={32} />
              <h4 className="font-bold mb-2">Fully Licensed</h4>
              <p className="text-purple-200 text-sm">Operating under all required federal and state licenses</p>
            </div>
            <div className="text-center">
              <Eye className="mx-auto mb-3 text-blue-400" size={32} />
              <h4 className="font-bold mb-2">Transparent</h4>
              <p className="text-purple-200 text-sm">Clear reporting and adherence to regulations</p>
            </div>
            <div className="text-center">
              <Lock className="mx-auto mb-3 text-red-400" size={32} />
              <h4 className="font-bold mb-2">Secure</h4>
              <p className="text-purple-200 text-sm">Bank-grade security protecting your assets</p>
            </div>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-12">
          {/* Section 1 - AML/KYC */}
          <div className="bg-purple-800 bg-opacity-60 rounded-lg p-8 backdrop-blur-sm border border-purple-600">
            <h2 className="text-3xl font-bold mb-6 flex items-center">
              <Users className="mr-3 text-blue-400" size={32} />
              1. Anti-Money Laundering (AML) & Know Your Customer (KYC)
            </h2>
            
            <div className="space-y-6 text-purple-200">
              <div>
                <h3 className="text-xl font-bold text-white mb-3">1.1 AML Compliance Program</h3>
                <p className="mb-3">
                  GlobalPay maintains a comprehensive Anti-Money Laundering program that meets or exceeds requirements under the Bank Secrecy Act (BSA) and USA PATRIOT Act:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Customer Due Diligence (CDD) procedures</li>
                  <li>Enhanced Due Diligence (EDD) for high-risk customers</li>
                  <li>Suspicious Activity Reporting (SAR) protocols</li>
                  <li>Currency Transaction Reporting (CTR) for transactions over $10,000</li>
                  <li>Ongoing transaction monitoring and screening</li>
                  <li>Annual independent audits of AML controls</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">1.2 KYC Verification</h3>
                <p className="mb-3">Our multi-tier KYC process ensures identity verification:</p>
                <div className="bg-purple-900 bg-opacity-60 p-6 rounded-lg space-y-4">
                  <div>
                    <h4 className="font-bold text-green-400 mb-2">Basic Verification</h4>
                    <ul className="text-sm space-y-1 ml-4">
                      <li>• Government-issued photo ID verification</li>
                      <li>• Facial recognition biometric matching</li>
                      <li>• Address verification</li>
                      <li>• Phone and email validation</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-400 mb-2">Enhanced Verification</h4>
                    <ul className="text-sm space-y-1 ml-4">
                      <li>• Source of funds documentation</li>
                      <li>• Employment verification</li>
                      <li>• Bank account ownership proof</li>
                      <li>• Ongoing risk assessment</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-purple-400 mb-2">Business Verification</h4>
                    <ul className="text-sm space-y-1 ml-4">
                      <li>• Business registration documents</li>
                      <li>• Beneficial ownership identification</li>
                      <li>• Tax identification numbers</li>
                      <li>• Business banking information</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">1.3 Ongoing Monitoring</h3>
                <p className="mb-3">We employ sophisticated monitoring systems that:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Continuously screen transactions against OFAC and sanctions lists</li>
                  <li>Flag unusual or suspicious activity patterns</li>
                  <li>Monitor for structuring and smurfing attempts</li>
                  <li>Track PEP (Politically Exposed Person) relationships</li>
                  <li>Perform periodic customer profile reviews</li>
                </ul>
              </div>
            </div>
          </div>
{/* Section 2 - Regulatory Oversight */}
          <div className="bg-purple-800 bg-opacity-60 rounded-lg p-8 backdrop-blur-sm border border-purple-600">
            <h2 className="text-3xl font-bold mb-6 flex items-center">
              <Scale className="mr-3 text-yellow-400" size={32} />
              2. Regulatory Oversight & Licensing
            </h2>
            
            <div className="space-y-6 text-purple-200">
              <div>
                <h3 className="text-xl font-bold text-white mb-3">2.1 Federal Licenses & Registration</h3>
                <div className="bg-blue-900 bg-opacity-40 border border-blue-600 rounded-lg p-6 space-y-3">
                  <div className="flex items-start">
                    <CheckCircle className="mr-3 flex-shrink-0 text-green-400 mt-1" size={20} />
                    <div>
                      <h4 className="font-bold">FinCEN Registration</h4>
                      <p className="text-sm">Registered Money Services Business (MSB) with the Financial Crimes Enforcement Network</p>
                      <p className="text-xs text-purple-300 mt-1">Registration #: 31000123456789</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="mr-3 flex-shrink-0 text-green-400 mt-1" size={20} />
                    <div>
                      <h4 className="font-bold">NMLS Licensed</h4>
                      <p className="text-sm">Licensed money transmitter under the Nationwide Multistate Licensing System</p>
                      <p className="text-xs text-purple-300 mt-1">NMLS ID: 987654321</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="mr-3 flex-shrink-0 text-green-400 mt-1" size={20} />
                    <div>
                      <h4 className="font-bold">SEC Compliance</h4>
                      <p className="text-sm">Compliant with Securities and Exchange Commission regulations for digital assets</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="mr-3 flex-shrink-0 text-green-400 mt-1" size={20} />
                    <div>
                      <h4 className="font-bold">CFTC Registered</h4>
                      <p className="text-sm">Registered with Commodity Futures Trading Commission for crypto derivatives</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">2.2 State Money Transmitter Licenses</h3>
                <p className="mb-3">GlobalPay holds money transmitter licenses in all 50 US states and territories:</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'].map((state, idx) => (
                    <div key={idx} className="bg-purple-900 bg-opacity-60 p-2 rounded text-center text-sm">
                      <CheckCircle className="inline mr-1 text-green-400" size={14} />
                      {state}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-purple-300 mt-3">
                  Plus: Puerto Rico, US Virgin Islands, Guam, and other US territories
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">2.3 International Regulatory Compliance</h3>
                <div className="space-y-3">
                  <div className="bg-purple-900 bg-opacity-60 p-4 rounded-lg">
                    <h4 className="font-bold mb-2">🇪🇺 European Union</h4>
                    <ul className="text-sm space-y-1">
                      <li>• MiFID II compliant</li>
                      <li>• 5AMLD (5th Anti-Money Laundering Directive)</li>
                      <li>• GDPR data protection standards</li>
                      <li>• E-Money Institution (EMI) license</li>
                    </ul>
                  </div>
                  <div className="bg-purple-900 bg-opacity-60 p-4 rounded-lg">
                    <h4 className="font-bold mb-2">🇬🇧 United Kingdom</h4>
                    <ul className="text-sm space-y-1">
                      <li>• FCA (Financial Conduct Authority) registered</li>
                      <li>• Electronic Money Regulations 2011</li>
                      <li>• Payment Services Regulations 2017</li>
                    </ul>
                  </div>
                  <div className="bg-purple-900 bg-opacity-60 p-4 rounded-lg">
                    <h4 className="font-bold mb-2">🇨🇦 Canada</h4>
                    <ul className="text-sm space-y-1">
                      <li>• FINTRAC registered MSB</li>
                      <li>• Provincial licensing (all provinces)</li>
                      <li>• PIPEDA privacy compliance</li>
                    </ul>
                  </div>
                  <div className="bg-purple-900 bg-opacity-60 p-4 rounded-lg">
                    <h4 className="font-bold mb-2">🌏 Asia-Pacific</h4>
                    <ul className="text-sm space-y-1">
                      <li>• MAS (Singapore) regulated</li>
                      <li>• AUSTRAC (Australia) registered</li>
                      <li>• FSA (Japan) licensed</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3 - Banking Partnerships */}
          <div className="bg-purple-800 bg-opacity-60 rounded-lg p-8 backdrop-blur-sm border border-purple-600">
            <h2 className="text-3xl font-bold mb-6 flex items-center">
              <Building className="mr-3 text-green-400" size={32} />
              3. Banking Partners & FDIC Insurance
            </h2>
            
            <div className="space-y-6 text-purple-200">
              <div>
                <h3 className="text-xl font-bold text-white mb-3">3.1 Partner Banks</h3>
                <p className="mb-4">
                  GlobalPay partners with fully regulated financial institutions to ensure the safety of your funds:
                </p>
                <div className="bg-blue-900 bg-opacity-40 border border-blue-600 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <Building className="mr-3 text-blue-400" size={32} />
                    <div>
                      <h4 className="text-xl font-bold">BankProv</h4>
                      <p className="text-sm text-blue-300">Member FDIC | Equal Housing Lender</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p><strong>Role:</strong> Banking services provider for USD deposit accounts</p>
                    <p><strong>FDIC Certificate:</strong> #57957</p>
                    <p><strong>Established:</strong> 1996</p>
                    <p><strong>Headquarters:</strong> Amesbury, Massachusetts</p>
                    <p><strong>Assets:</strong> $3.8+ Billion</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">3.2 FDIC Insurance Coverage</h3>
                <div className="bg-green-900 bg-opacity-40 border border-green-600 rounded-lg p-6">
                  <div className="flex items-start mb-4">
                    <Shield className="mr-3 flex-shrink-0 text-green-400 mt-1" size={28} />
                    <div>
                      <h4 className="font-bold text-lg mb-2">Your Deposits Are Protected</h4>
                      <p className="text-sm mb-3">
                        USD deposits held in your GlobalPay account are eligible for FDIC insurance up to $250,000 per depositor, per ownership category, through our partner bank BankProv.
                      </p>
                      <div className="space-y-2 text-sm">
                        <p><strong>What's Covered:</strong></p>
                        <ul className="ml-4 space-y-1">
                          <li>✓ USD balance in your GlobalPay wallet</li>
                          <li>✓ USD loaded on GlobalPay crypto cards</li>
                          <li>✓ Pending USD transfers</li>
                        </ul>
                        <p className="mt-3"><strong>What's NOT Covered:</strong></p>
                        <ul className="ml-4 space-y-1">
                          <li>✗ Cryptocurrency holdings</li>
                          <li>✗ Non-USD foreign currency balances</li>
                          <li>✗ Investments in crypto assets</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="bg-blue-900 bg-opacity-60 p-3 rounded text-xs mt-4">
                    <p className="font-bold mb-1">Important Note:</p>
                    <p>
                      FDIC insurance only protects against bank failure. It does not protect against fraud, theft, or losses from market volatility. GlobalPay employs additional security measures to protect all your assets.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">3.3 Segregated Client Funds</h3>
                <p className="mb-3">
                  Your funds are held separately from GlobalPay's operating capital:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Customer funds held in dedicated accounts</li>
                  <li>Regular reconciliation and audits</li>
                  <li>Cannot be used for company operations</li>
                  <li>Protected in event of company insolvency</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 4 - Crypto Compliance */}
          <div className="bg-purple-800 bg-opacity-60 rounded-lg p-8 backdrop-blur-sm border border-purple-600">
            <h2 className="text-3xl font-bold mb-6 flex items-center">
              <Database className="mr-3 text-cyan-400" size={32} />
              4. Cryptocurrency Compliance
            </h2>
            
            <div className="space-y-6 text-purple-200">
              <div>
                <h3 className="text-xl font-bold text-white mb-3">4.1 BitLicense Compliance</h3>
                <p className="mb-3">
                  GlobalPay holds a New York State BitLicense, one of the most stringent cryptocurrency regulations:
                </p>
                <div className="bg-purple-900 bg-opacity-60 p-6 rounded-lg">
                  <p className="mb-3"><strong>BitLicense Requirements Met:</strong></p>
                  <ul className="space-y-2 text-sm">
                    <li>✓ Capital requirements maintained ($200,000+ minimum)</li>
                    <li>✓ Cybersecurity program implementation</li>
                    <li>✓ AML/KYC compliance program</li>
                    <li>✓ Consumer protection policies</li>
                    <li>✓ Quarterly financial reporting to NYDFS</li>
                    <li>✓ Independent annual audits</li>
                    <li>✓ Business continuity and disaster recovery plans</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">4.2 Travel Rule Compliance</h3>
                <p className="mb-3">
                  We comply with the "Travel Rule" (FinCEN's 31 CFR 1010.410(f)) for cryptocurrency transactions:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Collect and transmit originator information for transfers ≥ $3,000</li>
                  <li>Verify beneficiary information</li>
                  <li>Maintain records for 5 years</li>
                  <li>Share information with receiving institutions</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">4.3 Blockchain Analytics & Monitoring</h3>
                <p className="mb-3">
                  Advanced blockchain analytics ensure compliance and security:
                </p>
                <div className="bg-purple-900 bg-opacity-60 p-6 rounded-lg space-y-3">
                  <div>
                    <h4 className="font-bold text-blue-400 mb-2">Chainalysis Integration</h4>
                    <p className="text-sm">Real-time screening of cryptocurrency addresses against known illicit actors, darknet markets, and sanctioned entities</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-green-400 mb-2">Transaction Monitoring</h4>
                    <p className="text-sm">Automated detection of suspicious patterns including mixing services, high-risk exchanges, and ransomware addresses</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-purple-400 mb-2">Source of Funds Tracking</h4>
                    <p className="text-sm">Verification of cryptocurrency source and destination for enhanced due diligence</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">4.4 Stablecoin Reserves</h3>
                <p className="mb-3">
                  For stablecoins offered on our platform, we ensure:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Regular attestations by independent auditors</li>
                  <li>1:1 backing by fiat reserves or equivalent assets</li>
                  <li>Transparent reserve composition reporting</li>
                  <li>Compliance with emerging stablecoin regulations</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 5 - Sanctions Compliance */}
          <div className="bg-purple-800 bg-opacity-60 rounded-lg p-8 backdrop-blur-sm border border-purple-600">
            <h2 className="text-3xl font-bold mb-6 flex items-center">
              <Globe className="mr-3 text-red-400" size={32} />
              5. Sanctions & Watchlist Screening
            </h2>
            
            <div className="space-y-6 text-purple-200">
              <div>
                <h3 className="text-xl font-bold text-white mb-3">5.1 OFAC Compliance</h3>
                <p className="mb-3">
                  We maintain strict compliance with Office of Foreign Assets Control (OFAC) sanctions:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Real-time screening against SDN (Specially Designated Nationals) list</li>
                  <li>Geolocation blocking for sanctioned countries</li>
                  <li>Sectoral sanctions screening</li>
                  <li>50% Rule compliance for entity ownership</li>
                  <li>Immediate transaction blocking and asset freezing when required</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">5.2 Global Watchlists</h3>
                <p className="mb-3">Continuous monitoring against international sanctions lists:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-purple-900 bg-opacity-60 p-4 rounded-lg">
                    <h4 className="font-bold mb-2">United States</h4>
                    <ul className="text-sm space-y-1">
                      <li>• OFAC SDN List</li>
                      <li>• FBI Most Wanted</li>
                      <li>• DEA Fugitives</li>
                    </ul>
                  </div>
                  <div className="bg-purple-900 bg-opacity-60 p-4 rounded-lg">
                    <h4 className="font-bold mb-2">European Union</h4>
                    <ul className="text-sm space-y-1">
                      <li>• EU Consolidated List</li>
                      <li>• EU PEP Database</li>
                    </ul>
                  </div>
                  <div className="bg-purple-900 bg-opacity-60 p-4 rounded-lg">
                    <h4 className="font-bold mb-2">United Nations</h4>
                    <ul className="text-sm space-y-1">
                      <li>• UN Security Council List</li>
                      <li>• UN Terrorism List</li>
                    </ul>
                  </div>
                  <div className="bg-purple-900 bg-opacity-60 p-4 rounded-lg">
                    <h4 className="font-bold mb-2">Other</h4>
                    <ul className="text-sm space-y-1">
                      <li>• UK HM Treasury List</li>
                      <li>• Interpol Red Notices</li>
                      <li>• World Bank Debarment</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">5.3 Restricted Jurisdictions</h3>
                <p className="mb-3">
                  GlobalPay services are not available in certain jurisdictions due to regulatory restrictions or sanctions:
                </p>
                <div className="bg-red-900 bg-opacity-30 border border-red-600 rounded-lg p-4">
                  <p className="font-bold text-red-300 mb-2">Services Not Available In:</p>
                  <p className="text-sm">
                    Cuba, Iran, North Korea, Syria, Crimea region, and other OFAC-sanctioned territories. This list is updated regularly in accordance with regulatory changes.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 6 - Data Protection */}
          <div className="bg-purple-800 bg-opacity-60 rounded-lg p-8 backdrop-blur-sm border border-purple-600">
            <h2 className="text-3xl font-bold mb-6 flex items-center">
              <Lock className="mr-3 text-purple-400" size={32} />
              6. Data Protection & Privacy Compliance
            </h2>
            
            <div className="space-y-6 text-purple-200">
              <div>
                <h3 className="text-xl font-bold text-white mb-3">6.1 GDPR Compliance</h3>
                <p className="mb-3">
                  For European customers, we maintain full compliance with the General Data Protection Regulation:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Lawful basis for data processing</li>
                  <li>Data minimization principles</li>
                  <li>Right to access, rectification, and erasure</li>
                  <li>Data portability capabilities</li>
                  <li>Privacy by design and by default</li>
                  <li>Data Protection Impact Assessments (DPIAs)</li>
                  <li>EU representative appointed</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">6.2 CCPA/CPRA Compliance</h3>
                <p className="mb-3">
                  California residents have enhanced privacy rights under CCPA/CPRA:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Right to know what personal information is collected</li>
                  <li>Right to delete personal information</li>
                  <li>Right to opt-out of sale/sharing</li>
                  <li>Right to correct inaccurate information</li>
                  <li>Right to limit use of sensitive personal information</li>
                  <li>Non-discrimination for exercising rights</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">6.3 Data Security Standards</h3>
                <div className="bg-purple-900 bg-opacity-60 p-6 rounded-lg">
                  <p className="mb-3"><strong>We implement industry-leading security measures:</strong></p>
                  <ul className="space-y-2 text-sm">
                    <li>✓ ISO 27001 Information Security Management</li>
                    <li>✓ SOC 2 Type II certified</li>
                    <li>✓ PCI DSS Level 1 compliant</li>
                    <li>✓ Regular penetration testing</li>
                    <li>✓ 24/7 security monitoring</li>
                    <li>✓ Incident response procedures</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Section 7 - Reporting */}
          <div className="bg-purple-800 bg-opacity-60 rounded-lg p-8 backdrop-blur-sm border border-purple-600">
            <h2 className="text-3xl font-bold mb-6 flex items-center">
              <FileText className="mr-3 text-orange-400" size={32} />
              7. Regulatory Reporting & Transparency
            </h2>
            
            <div className="space-y-6 text-purple-200">
              <div>
                <h3 className="text-xl font-bold text-white mb-3">7.1 Suspicious Activity Reporting</h3>
                <p className="mb-3">
                  We file Suspicious Activity Reports (SARs) with FinCEN when:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Transactions involve $5,000+ and suspicious activity is detected</li>
                  <li>Patterns suggest money laundering or fraud</li>
                  <li>Customers refuse to provide required information</li>
                  <li>Transactions lack economic or lawful purpose</li>
                </ul>
                <p className="text-sm text-purple-300 mt-3">
                  Note: Federal law prohibits us from disclosing SAR filings to customers
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">7.2 Currency Transaction Reports</h3>
                <p>
                  CTRs are filed for transactions exceeding $10,000 in a single day, as required by the Bank Secrecy Act.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">7.3 Regular Audits</h3>
                <div className="space-y-3">
                  <div className="bg-purple-900 bg-opacity-60 p-4 rounded-lg">
                    <h4 className="font-bold mb-2">Internal Audits</h4>
                    <p className="text-sm">Quarterly compliance reviews by internal audit team</p>
                  </div>
                  <div className="bg-purple-900 bg-opacity-60 p-4 rounded-lg">
                    <h4 className="font-bold mb-2">External Audits</h4>
                    <p className="text-sm">Annual audits by Big Four accounting firms</p>
                  </div>
                  <div className="bg-purple-900 bg-opacity-60 p-4 rounded-lg">
                    <h4 className="font-bold mb-2">Regulatory Examinations</h4>
                    <p className="text-sm">Periodic examinations by state and federal regulators</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 8 - Contact */}
          <div className="bg-purple-800 bg-opacity-60 rounded-lg p-8 backdrop-blur-sm border border-purple-600">
            <h2 className="text-3xl font-bold mb-6 flex items-center">
              <Mail className="mr-3 text-cyan-400" size={32} />
              8. Compliance Inquiries
            </h2>
            
            <div className="space-y-6 text-purple-200">
              <p>
                For questions regarding our compliance programs or to report concerns, please contact:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-purple-900 bg-opacity-60 p-6 rounded-lg">
                  <h4 className="font-bold text-white mb-4">Compliance Officer</h4>
                  <div className="space-y-2 text-sm">
                    <p className="flex items-center">
                      <Mail className="mr-2" size={16} />
                      compliance@globalpay.com
                    </p>
                    <p className="flex items-center">
                      <PhoneCall className="mr-2" size={16} />
                      +1-800-555-COMPLY
                    </p>
                  </div>
                </div>

                <div className="bg-purple-900 bg-opacity-60 p-6 rounded-lg">
                  <h4 className="font-bold text-white mb-4">Report Suspicious Activity</h4>
                  <div className="space-y-2 text-sm">
                    <p className="flex items-center">
                      <Mail className="mr-2" size={16} />
                      fraud@globalpay.com
                    </p>
                    <p className="text-purple-300">Anonymous reporting available</p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-900 bg-opacity-40 border border-yellow-600 rounded-lg p-4">
                <h4 className="font-bold text-yellow-300 mb-2">Whistleblower Protection</h4>
                <p className="text-sm">
                  GlobalPay prohibits retaliation against individuals who report compliance violations in good faith. All reports are treated confidentially and investigated promptly.
                </p>
              </div>
            </div>
          </div>

          {/* Commitment Statement */}
          <div className="bg-gradient-to-r from-green-900 to-blue-900 rounded-lg p-8 border-2 border-green-500">
            <div className="flex items-start">
              <CheckCircle className="mr-4 flex-shrink-0 text-green-400" size={32} />
              <div>
                <h3 className="text-2xl font-bold mb-3">Our Commitment to Compliance</h3>
                <p className="text-purple-200 mb-4">
                  GlobalPay is committed to maintaining the highest standards of regulatory compliance. We continuously monitor regulatory developments, adapt our programs to evolving requirements, and invest in the technology and expertise needed to protect our customers and the integrity of the financial system.
                </p>
                <p className="text-purple-300 text-sm">
                  Compliance is not just a legal obligation—it's fundamental to our mission of providing secure, trustworthy financial services to customers worldwide.
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

export default CompliancePage;