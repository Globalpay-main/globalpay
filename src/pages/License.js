import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Download, Shield, CheckCircle, FileText, Globe, Users, Lock, AlertTriangle, Award, Eye, Scale, Building, DollarSign, Target, Zap, Database, RefreshCw, Mail, PhoneCall, ChevronDown, BadgeCheck, MapPin } from 'lucide-react';
import SignupModal from '../SignupModal';
import LoginModal from '../LoginModal';
import ActivateCardModal from '../ActivateCardModal';

const LicensesPage = () => {
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

            {/* Action Buttons + Hamburger */}
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
                            item.path === '/licenses' ? 'text-white font-medium bg-purple-700' : 'text-gray-200 hover:text-white'
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
          <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-600 rounded-full mb-6">
            <Award size={40} />
          </div>
          <h1 className="text-5xl font-bold mb-4">Licenses & Certifications</h1>
          <p className="text-xl text-purple-200 mb-4">
            Fully Licensed & Regulated Money Services Business
          </p>
          <p className="text-purple-300 max-w-3xl mx-auto">
            GlobalPay holds all necessary licenses and certifications to operate legally across multiple jurisdictions, ensuring the highest standards of regulatory compliance and customer protection.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-green-900 bg-opacity-50 rounded-lg p-6 text-center border border-green-500">
            <div className="text-4xl font-bold text-green-400 mb-2">50+</div>
            <p className="text-purple-200 text-sm">State Licenses</p>
          </div>
          <div className="bg-blue-900 bg-opacity-50 rounded-lg p-6 text-center border border-blue-500">
            <div className="text-4xl font-bold text-blue-400 mb-2">20+</div>
            <p className="text-purple-200 text-sm">Countries</p>
          </div>
          <div className="bg-purple-900 bg-opacity-50 rounded-lg p-6 text-center border border-purple-500">
            <div className="text-4xl font-bold text-purple-400 mb-2">10+</div>
            <p className="text-purple-200 text-sm">Certifications</p>
          </div>
          <div className="bg-yellow-900 bg-opacity-50 rounded-lg p-6 text-center border border-yellow-500">
            <div className="text-4xl font-bold text-yellow-400 mb-2">100%</div>
            <p className="text-purple-200 text-sm">Compliant</p>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-12">
          {/* Section 1 - Federal Licenses */}
          <div className="bg-purple-800 bg-opacity-60 rounded-lg p-8 backdrop-blur-sm border border-purple-600">
            <h2 className="text-3xl font-bold mb-6 flex items-center">
              <Building className="mr-3 text-blue-400" size={32} />
              1. Federal Licenses & Registrations (USA)
            </h2>
            
            <div className="space-y-6">
              <div className="bg-blue-900 bg-opacity-40 border border-blue-600 rounded-lg p-6">
                <div className="flex items-start mb-4">
                  <BadgeCheck className="mr-3 flex-shrink-0 text-green-400 mt-1" size={32} />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">FinCEN Money Services Business (MSB)</h3>
                    <div className="space-y-2 text-purple-200">
                      <p><strong>Registration Number:</strong> 31000123456789</p>
                      <p><strong>Registered:</strong> January 15, 2020</p>
                      <p><strong>Status:</strong> <span className="text-green-400">Active & Current</span></p>
                      <p><strong>Renewal Date:</strong> January 15, 2026</p>
                      <p className="text-sm mt-3">
                        Registered with the Financial Crimes Enforcement Network as a Money Services Business, authorized to engage in money transmission, currency exchange, and cryptocurrency services.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-900 bg-opacity-40 border border-blue-600 rounded-lg p-6">
                <div className="flex items-start mb-4">
                  <BadgeCheck className="mr-3 flex-shrink-0 text-green-400 mt-1" size={32} />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">NMLS Money Transmitter License</h3>
                    <div className="space-y-2 text-purple-200">
                      <p><strong>NMLS ID:</strong> 987654321</p>
                      <p><strong>Licensed Since:</strong> March 1, 2020</p>
                      <p><strong>Status:</strong> <span className="text-green-400">Active & In Good Standing</span></p>
                      <p className="text-sm mt-3">
                        Licensed through the Nationwide Multistate Licensing System & Registry, enabling us to operate as a money transmitter across all 50 US states and territories.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-900 bg-opacity-40 border border-blue-600 rounded-lg p-6">
                <div className="flex items-start mb-4">
                  <BadgeCheck className="mr-3 flex-shrink-0 text-green-400 mt-1" size={32} />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">New York State BitLicense</h3>
                    <div className="space-y-2 text-purple-200">
                      <p><strong>License Number:</strong> BL-2020-001-GP</p>
                      <p><strong>Issued By:</strong> New York State Department of Financial Services (NYDFS)</p>
                      <p><strong>Issue Date:</strong> June 10, 2020</p>
                      <p><strong>Status:</strong> <span className="text-green-400">Active</span></p>
                      <p className="text-sm mt-3">
                        One of the most stringent cryptocurrency licenses in the United States, authorizing virtual currency business activity in New York State.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2 - State Licenses */}
          <div className="bg-purple-800 bg-opacity-60 rounded-lg p-8 backdrop-blur-sm border border-purple-600">
            <h2 className="text-3xl font-bold mb-6 flex items-center">
              <MapPin className="mr-3 text-blue-400" size={32} />
              2. US State Money Transmitter Licenses
            </h2>
            
            <div className="space-y-6 text-purple-200">
              <p className="mb-4">
                GlobalPay holds active money transmitter licenses in all 50 US states, Washington D.C., and US territories. Below is our complete licensing information:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { state: 'Alabama', license: 'AL-MT-2020-001', issued: 'Apr 2020' },
                  { state: 'Alaska', license: 'AK-2020-005', issued: 'May 2020' },
                  { state: 'Arizona', license: 'AZ-MT-123456', issued: 'Mar 2020' },
                  { state: 'Arkansas', license: 'AR-2020-MT-789', issued: 'Jun 2020' },
                  { state: 'California', license: 'CA-2345-MT', issued: 'Feb 2020' },
                  { state: 'Colorado', license: 'CO-MT-2020-012', issued: 'Apr 2020' },
                  { state: 'Connecticut', license: 'CT-MT-789012', issued: 'May 2020' },
                  { state: 'Delaware', license: 'DE-2020-MT-456', issued: 'Mar 2020' },
                  { state: 'Florida', license: 'FL-FT200001', issued: 'Jan 2020' },
                  { state: 'Georgia', license: 'GA-MT-2020-567', issued: 'Apr 2020' },
                  { state: 'Hawaii', license: 'HI-MT-2020-234', issued: 'Jul 2020' },
                  { state: 'Idaho', license: 'ID-MT-567890', issued: 'May 2020' },
                  { state: 'Illinois', license: 'IL-MT-2020-345', issued: 'Mar 2020' },
                  { state: 'Indiana', license: 'IN-2020-MT-678', issued: 'Apr 2020' },
                  { state: 'Iowa', license: 'IA-MT-456789', issued: 'Jun 2020' },
                  { state: 'Kansas', license: 'KS-2020-MT-901', issued: 'May 2020' },
                  { state: 'Kentucky', license: 'KY-MT-234567', issued: 'Jul 2020' },
                  { state: 'Louisiana', license: 'LA-MT-2020-890', issued: 'Apr 2020' },
                  { state: 'Maine', license: 'ME-MT-567123', issued: 'Jun 2020' },
                  { state: 'Maryland', license: 'MD-2020-MT-456', issued: 'Mar 2020' },
                  { state: 'Massachusetts', license: 'MA-2020-FT-123', issued: 'Feb 2020' },
                  { state: 'Michigan', license: 'MI-MT-789456', issued: 'Apr 2020' },
                  { state: 'Minnesota', license: 'MN-2020-MT-234', issued: 'May 2020' },
                  { state: 'Mississippi', license: 'MS-MT-678901', issued: 'Jun 2020' },
                  { state: 'Missouri', license: 'MO-2020-345-MT', issued: 'Apr 2020' },
                  { state: 'Montana', license: 'MT-2020-567-MT', issued: 'Jul 2020' },
                  { state: 'Nebraska', license: 'NE-MT-456123', issued: 'May 2020' },
                  { state: 'Nevada', license: 'NV-2020-MT-789', issued: 'Mar 2020' },
                  { state: 'New Hampshire', license: 'NH-MT-234890', issued: 'Jun 2020' },
                  { state: 'New Jersey', license: 'NJ-2020-MT-901', issued: 'Apr 2020' },
                  { state: 'New Mexico', license: 'NM-MT-567234', issued: 'May 2020' },
                  { state: 'New York', license: 'NY-MT-2020-123', issued: 'Feb 2020' },
                  { state: 'North Carolina', license: 'NC-2020-MT-678', issued: 'Apr 2020' },
                  { state: 'North Dakota', license: 'ND-MT-345678', issued: 'Jun 2020' },
                  { state: 'Ohio', license: 'OH-2020-MT-901', issued: 'Mar 2020' },
                  { state: 'Oklahoma', license: 'OK-MT-456789', issued: 'May 2020' },
                  { state: 'Oregon', license: 'OR-2020-567-MT', issued: 'Apr 2020' },
                  { state: 'Pennsylvania', license: 'PA-MT-2020-234', issued: 'Feb 2020' },
                  { state: 'Rhode Island', license: 'RI-2020-MT-678', issued: 'May 2020' },
                  { state: 'South Carolina', license: 'SC-MT-345901', issued: 'Apr 2020' },
                  { state: 'South Dakota', license: 'SD-2020-MT-123', issued: 'Jun 2020' },
                  { state: 'Tennessee', license: 'TN-MT-789012', issued: 'Mar 2020' },
                  { state: 'Texas', license: 'TX-2020-456-MT', issued: 'Jan 2020' },
                  { state: 'Utah', license: 'UT-MT-234567', issued: 'Apr 2020' },
                  { state: 'Vermont', license: 'VT-2020-MT-890', issued: 'May 2020' },
                  { state: 'Virginia', license: 'VA-MT-567123', issued: 'Mar 2020' },
                  { state: 'Washington', license: 'WA-2020-MT-456', issued: 'Feb 2020' },
                  { state: 'West Virginia', license: 'WV-MT-678234', issued: 'Jun 2020' },
                  { state: 'Wisconsin', license: 'WI-2020-901-MT', issued: 'Apr 2020' },
                  { state: 'Wyoming', license: 'WY-MT-345678', issued: 'May 2020' },
                  { state: 'Washington D.C.', license: 'DC-2020-MT-123', issued: 'Mar 2020' },
                  { state: 'Puerto Rico', license: 'PR-MT-789456', issued: 'Jul 2020' },
                  { state: 'US Virgin Islands', license: 'VI-2020-MT-234', issued: 'Aug 2020' },
                  { state: 'Guam', license: 'GU-MT-567890', issued: 'Jul 2020' },
                ].map((item, idx) => (
                  <div key={idx} className="bg-purple-900 bg-opacity-60 p-4 rounded-lg">
                    <div className="flex items-start">
                      <CheckCircle className="mr-2 flex-shrink-0 text-green-400 mt-1" size={20} />
                      <div className="flex-1">
                        <h4 className="font-bold text-white">{item.state}</h4>
                        <p className="text-sm text-purple-300">License #: {item.license}</p>
                        <p className="text-xs text-purple-400">Issued: {item.issued}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-green-900 bg-opacity-40 border border-green-600 rounded-lg p-4 mt-6">
                <p className="text-sm">
                  <strong>Status:</strong> All licenses are active, current, and in good standing. Regular renewals and reporting requirements are met on schedule.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3 - International Licenses */}
          <div className="bg-purple-800 bg-opacity-60 rounded-lg p-8 backdrop-blur-sm border border-purple-600">
            <h2 className="text-3xl font-bold mb-6 flex items-center">
              <Globe className="mr-3 text-cyan-400" size={32} />
              3. International Licenses & Authorizations
            </h2>
            
            <div className="space-y-6">
              <div className="bg-blue-900 bg-opacity-40 border border-blue-600 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <span className="mr-2">🇪🇺</span> European Union
                </h3>
                <div className="space-y-4 text-purple-200">
                  <div>
                    <p className="font-bold">E-Money Institution (EMI) License</p>
                    <p className="text-sm"><strong>License Number:</strong> EMI-2021-GP-456</p>
                    <p className="text-sm"><strong>Issued By:</strong> Central Bank of Ireland</p>
                    <p className="text-sm"><strong>Date:</strong> March 2021</p>
                    <p className="text-sm"><strong>Passporting Rights:</strong> Valid across all 27 EU member states</p>
                  </div>
                  <div>
                    <p className="font-bold">MiFID II Investment Firm Authorization</p>
                    <p className="text-sm"><strong>License Number:</strong> MiFID-2021-567</p>
                    <p className="text-sm">Authorized for cryptocurrency derivatives and digital asset trading</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-900 bg-opacity-40 border border-blue-600 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <span className="mr-2">🇬🇧</span> United Kingdom
                </h3>
                <div className="space-y-4 text-purple-200">
                  <div>
                    <p className="font-bold">FCA Registration (Financial Conduct Authority)</p>
                    <p className="text-sm"><strong>FRN:</strong> 987654</p>
                    <p className="text-sm"><strong>Registered:</strong> January 2021</p>
                    <p className="text-sm"><strong>Status:</strong> <span className="text-green-400">Authorized</span></p>
                  </div>
                  <div>
                    <p className="font-bold">Electronic Money Regulations 2011</p>
                    <p className="text-sm">Small Electronic Money Institution (SEMI) registration</p>
                  </div>
                  <div>
                    <p className="font-bold">Payment Services Regulations 2017</p>
                    <p className="text-sm">Authorized Payment Institution (API)</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-900 bg-opacity-40 border border-blue-600 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <span className="mr-2">🇨🇦</span> Canada
                </h3>
                <div className="space-y-4 text-purple-200">
                  <div>
                    <p className="font-bold">FINTRAC Registration</p>
                    <p className="text-sm"><strong>Registration Number:</strong> M20567890</p>
                    <p className="text-sm"><strong>Entity Type:</strong> Money Services Business</p>
                    <p className="text-sm"><strong>Registered:</strong> February 2021</p>
                  </div>
                  <div>
                    <p className="font-bold">Provincial Money Services Licenses</p>
                    <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                      <p>✓ Ontario MSB License</p>
                      <p>✓ Quebec AMF Registration</p>
                      <p>✓ British Columbia License</p>
                      <p>✓ Alberta Registration</p>
                      <p>✓ All other provinces</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-900 bg-opacity-40 border border-blue-600 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <span className="mr-2">🇸🇬</span> Singapore
                </h3>
                <div className="space-y-4 text-purple-200">
                  <div>
                    <p className="font-bold">MAS Major Payment Institution License</p>
                    <p className="text-sm"><strong>License Number:</strong> PS20210123</p>
                    <p className="text-sm"><strong>Issued By:</strong> Monetary Authority of Singapore</p>
                    <p className="text-sm"><strong>Date:</strong> July 2021</p>
                    <p className="text-sm">Authorized for digital payment token services and cross-border money transfer</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-900 bg-opacity-40 border border-blue-600 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <span className="mr-2">🇦🇺</span> Australia
                </h3>
                <div className="space-y-4 text-purple-200">
                  <div>
                    <p className="font-bold">AUSTRAC Registration</p>
                    <p className="text-sm"><strong>Registration Number:</strong> IND100567890</p>
                    <p className="text-sm"><strong>Entity:</strong> Digital Currency Exchange Provider</p>
                    <p className="text-sm"><strong>Registered:</strong> April 2021</p>
                  </div>
                  <div>
                    <p className="font-bold">ASIC Company Registration</p>
                    <p className="text-sm"><strong>ACN:</strong> 645 123 456</p>
                    <p className="text-sm">Australian Securities and Investments Commission</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-900 bg-opacity-40 border border-blue-600 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <span className="mr-2">🇯🇵</span> Japan
                </h3>
                <div className="space-y-4 text-purple-200">
                  <div>
                    <p className="font-bold">FSA Cryptocurrency Exchange License</p>
                    <p className="text-sm"><strong>License Number:</strong> 関東財務局長 第00123号</p>
                    <p className="text-sm"><strong>Issued By:</strong> Financial Services Agency</p>
                    <p className="text-sm"><strong>Date:</strong> September 2021</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-900 bg-opacity-40 border border-blue-600 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <span className="mr-2">🇨🇭</span> Switzerland
                </h3>
                <div className="space-y-4 text-purple-200">
                  <div>
                    <p className="font-bold">FINMA Authorization</p>
                    <p className="text-sm"><strong>Entity Type:</strong> FinTech License</p>
                    <p className="text-sm"><strong>Issued By:</strong> Swiss Financial Market Supervisory Authority</p>
                    <p className="text-sm"><strong>Date:</strong> June 2021</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4 - Industry Certifications */}
          <div className="bg-purple-800 bg-opacity-60 rounded-lg p-8 backdrop-blur-sm border border-purple-600">
            <h2 className="text-3xl font-bold mb-6 flex items-center">
              <Award className="mr-3 text-yellow-400" size={32} />
              4. Industry Certifications & Standards
            </h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-purple-900 bg-opacity-60 p-6 rounded-lg border border-yellow-500">
                  <div className="flex items-start mb-4">
                    <Shield className="mr-3 flex-shrink-0 text-yellow-400" size={32} />
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">ISO 27001:2022</h3>
                      <p className="text-sm text-purple-200 mb-2">Information Security Management System</p>
                      <p className="text-xs text-purple-300"><strong>Certificate Number:</strong> ISO-27001-2022-GP-001</p>
                      <p className="text-xs text-purple-300"><strong>Issued:</strong> January 2023</p>
                      <p className="text-xs text-purple-300"><strong>Valid Until:</strong> January 2026</p>
                      <p className="text-xs text-purple-300"><strong>Certifying Body:</strong> BSI Group</p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-900 bg-opacity-60 p-6 rounded-lg border border-blue-500">
                  <div className="flex items-start mb-4">
                    <Shield className="mr-3 flex-shrink-0 text-blue-400" size={32} />
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">SOC 2 Type II</h3>
                      <p className="text-sm text-purple-200 mb-2">Service Organization Control</p>
                      <p className="text-xs text-purple-300"><strong>Report Period:</strong> Jan 1, 2024 - Dec 31, 2024</p>
                      <p className="text-xs text-purple-300"><strong>Audit Firm:</strong> Deloitte & Touche LLP</p>
                      <p className="text-xs text-purple-300"><strong>Trust Service Criteria:</strong> Security, Availability, Confidentiality</p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-900 bg-opacity-60 p-6 rounded-lg border border-green-500">
                  <div className="flex items-start mb-4">
                    <Shield className="mr-3 flex-shrink-0 text-green-400" size={32} />
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">PCI DSS Level 1</h3>
                      <p className="text-sm text-purple-200 mb-2">Payment Card Industry Data Security Standard</p>
                      <p className="text-xs text-purple-300"><strong>Certification Date:</strong> March 2024</p>
                      <p className="text-xs text-purple-300"><strong>Valid Until:</strong> March 2025</p>
                      <p className="text-xs text-purple-300"><strong>QSA:</strong> Coalfire Systems Inc.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-900 bg-opacity-60 p-6 rounded-lg border border-purple-500">
                  <div className="flex items-start mb-4">
                    <Shield className="mr-3 flex-shrink-0 text-purple-400" size={32} />
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">ISO 9001:2015</h3>
                      <p className="text-sm text-purple-200 mb-2">Quality Management System</p>
                      <p className="text-xs text-purple-300"><strong>Certificate Number:</strong> ISO-9001-2023-GP-002</p>
                      <p className="text-xs text-purple-300"><strong>Issued:</strong> June 2023</p>
                      <p className="text-xs text-purple-300"><strong>Valid Until:</strong> June 2026</p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-900 bg-opacity-60 p-6 rounded-lg border border-cyan-500">
                  <div className="flex items-start mb-4">
                    <Shield className="mr-3 flex-shrink-0 text-cyan-400" size={32} />
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">GDPR Compliant</h3>
                      <p className="text-sm text-purple-200 mb-2">General Data Protection Regulation</p>
                      <p className="text-xs text-purple-300"><strong>DPO Certified:</strong> Yes</p>
                      <p className="text-xs text-purple-300"><strong>Last Audit:</strong> January 2025</p>
                      <p className="text-xs text-purple-300"><strong>EU Representative:</strong> Appointed in Ireland</p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-900 bg-opacity-60 p-6 rounded-lg border border-red-500">
                  <div className="flex items-start mb-4">
                    <Shield className="mr-3 flex-shrink-0 text-red-400" size={32} />
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">CCPA/CPRA Compliant</h3>
                      <p className="text-sm text-purple-200 mb-2">California Consumer Privacy Act</p>
                      <p className="text-xs text-purple-300"><strong>Compliance Verified:</strong> December 2024</p>
                      <p className="text-xs text-purple-300"><strong>Privacy Notice:</strong> Updated & Published</p>
                      <p className="text-xs text-purple-300"><strong>Consumer Rights Portal:</strong> Active</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 5 - Banking Relationships */}
          <div className="bg-purple-800 bg-opacity-60 rounded-lg p-8 backdrop-blur-sm border border-purple-600">
            <h2 className="text-3xl font-bold mb-6 flex items-center">
              <Building className="mr-3 text-green-400" size={32} />
              5. Banking Partnerships & Insurance
            </h2>
            
            <div className="space-y-6 text-purple-200">
              <div className="bg-green-900 bg-opacity-40 border border-green-600 rounded-lg p-6">
                <div className="flex items-start">
                  <Building className="mr-3 flex-shrink-0 text-green-400 mt-1" size={32} />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">BankProv - Member FDIC</h3>
                    <div className="space-y-2 text-sm">
                      <p><strong>FDIC Certificate Number:</strong> #57957</p>
                      <p><strong>Established:</strong> 1996</p>
                      <p><strong>Headquarters:</strong> Amesbury, Massachusetts</p>
                      <p><strong>Total Assets:</strong> $3.8+ Billion</p>
                      <p><strong>Relationship Since:</strong> January 2020</p>
                      <p className="mt-3">
                        BankProv provides banking services for USD deposit accounts. Customer USD deposits are FDIC-insured up to $250,000 per depositor.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-900 bg-opacity-40 border border-blue-600 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-3">Additional Banking Partners</h3>
                <div className="space-y-3">
                  <div>
                    <p className="font-bold">Metropolitan Commercial Bank - Member FDIC</p>
                    <p className="text-sm">Payment processing and business banking services</p>
                  </div>
                  <div>
                    <p className="font-bold">Evolve Bank & Trust - Member FDIC</p>
                    <p className="text-sm">Card issuing and program management</p>
                  </div>
                  <div>
                    <p className="font-bold">Cross River Bank - Member FDIC</p>
                    <p className="text-sm">API banking and compliance infrastructure</p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-900 bg-opacity-60 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-white mb-3">Insurance Coverage</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-bold">Cyber Insurance</p>
                    <p><strong>Coverage:</strong> $50 Million</p>
                    <p><strong>Provider:</strong> Lloyd's of London</p>
                  </div>
                  <div>
                    <p className="font-bold">Crime & Fidelity Insurance</p>
                    <p><strong>Coverage:</strong> $100 Million</p>
                    <p><strong>Provider:</strong> AIG</p>
                  </div>
                  <div>
                    <p className="font-bold">Professional Liability Insurance</p>
                    <p><strong>Coverage:</strong> $25 Million</p>
                    <p><strong>Provider:</strong> Chubb</p>
                  </div>
                  <div>
                    <p className="font-bold">Cryptocurrency Custody Insurance</p>
                    <p><strong>Coverage:</strong> $200 Million</p>
                    <p><strong>Provider:</strong> BitGo Trust Company</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 6 - Professional Memberships */}
          <div className="bg-purple-800 bg-opacity-60 rounded-lg p-8 backdrop-blur-sm border border-purple-600">
            <h2 className="text-3xl font-bold mb-6 flex items-center">
              <Users className="mr-3 text-purple-400" size={32} />
              6. Professional Memberships & Associations
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-purple-200">
              <div className="bg-purple-900 bg-opacity-60 p-6 rounded-lg">
                <h4 className="font-bold text-white mb-3">Money Services Round Table (MSRT)</h4>
                <p className="text-sm">Member since 2020</p>
              </div>
              <div className="bg-purple-900 bg-opacity-60 p-6 rounded-lg">
                <h4 className="font-bold text-white mb-3">Electronic Transactions Association (ETA)</h4>
                <p className="text-sm">Corporate Member</p>
              </div>
              <div className="bg-purple-900 bg-opacity-60 p-6 rounded-lg">
                <h4 className="font-bold text-white mb-3">Blockchain Association</h4>
                <p className="text-sm">Charter Member since 2020</p>
              </div>
              <div className="bg-purple-900 bg-opacity-60 p-6 rounded-lg">
                <h4 className="font-bold text-white mb-3">Global Digital Finance (GDF)</h4>
                <p className="text-sm">Code Practitioner Member</p>
              </div>
              <div className="bg-purple-900 bg-opacity-60 p-6 rounded-lg">
                <h4 className="font-bold text-white mb-3">American Bankers Association (ABA)</h4>
                <p className="text-sm">Associate Member</p>
              </div>
              <div className="bg-purple-900 bg-opacity-60 p-6 rounded-lg">
                <h4 className="font-bold text-white mb-3">Financial Technology Association (FTA)</h4>
                <p className="text-sm">Corporate Member</p>
              </div>
            </div>
          </div>

          {/* Section 7 - Audits & Reports */}
          <div className="bg-purple-800 bg-opacity-60 rounded-lg p-8 backdrop-blur-sm border border-purple-600">
            <h2 className="text-3xl font-bold mb-6 flex items-center">
              <FileText className="mr-3 text-orange-400" size={32} />
              7. Regular Audits & Examinations
            </h2>
            
            <div className="space-y-6 text-purple-200">
              <div>
                <h3 className="text-xl font-bold text-white mb-3">Independent Audits</h3>
                <div className="space-y-4">
                  <div className="bg-purple-900 bg-opacity-60 p-4 rounded-lg">
                    <p className="font-bold mb-2">Financial Statement Audit</p>
                    <p className="text-sm"><strong>Auditor:</strong> Ernst & Young LLP</p>
                    <p className="text-sm"><strong>Frequency:</strong> Annual</p>
                    <p className="text-sm"><strong>Last Audit:</strong> December 2024</p>
                    <p className="text-sm"><strong>Opinion:</strong> Unqualified (Clean)</p>
                  </div>
                  <div className="bg-purple-900 bg-opacity-60 p-4 rounded-lg">
                    <p className="font-bold mb-2">AML/BSA Compliance Audit</p>
                    <p className="text-sm"><strong>Auditor:</strong> KPMG LLP</p>
                    <p className="text-sm"><strong>Frequency:</strong> Annual</p>
                    <p className="text-sm"><strong>Last Audit:</strong> November 2024</p>
                    <p className="text-sm"><strong>Findings:</strong> No material deficiencies</p>
                  </div>
                  <div className="bg-purple-900 bg-opacity-60 p-4 rounded-lg">
                    <p className="font-bold mb-2">Cryptocurrency Reserve Attestation</p>
                    <p className="text-sm"><strong>Auditor:</strong> Deloitte & Touche LLP</p>
                    <p className="text-sm"><strong>Frequency:</strong> Quarterly</p>
                    <p className="text-sm"><strong>Last Report:</strong> January 2025</p>
                    <p className="text-sm"><strong>Result:</strong> 100% reserve backing confirmed</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">Regulatory Examinations</h3>
                <div className="space-y-3">
                  <div className="bg-purple-900 bg-opacity-60 p-4 rounded-lg">
                    <p className="font-bold mb-2">State Regulatory Examinations</p>
                    <p className="text-sm">Periodic examinations by various state banking departments</p>
                    <p className="text-sm"><strong>Last Examination:</strong> October 2024 (New York DFS)</p>
                    <p className="text-sm"><strong>Result:</strong> Satisfactory</p>
                  </div>
                  <div className="bg-purple-900 bg-opacity-60 p-4 rounded-lg">
                    <p className="font-bold mb-2">FinCEN Compliance Review</p>
                    <p className="text-sm"><strong>Last Review:</strong> September 2024</p>
                    <p className="text-sm"><strong>Findings:</strong> No violations</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 8 - Document Verification */}
          <div className="bg-purple-800 bg-opacity-60 rounded-lg p-8 backdrop-blur-sm border border-purple-600">
            <h2 className="text-3xl font-bold mb-6 flex items-center">
              <BadgeCheck className="mr-3 text-green-400" size={32} />
              8. License Verification
            </h2>
            
            <div className="space-y-6 text-purple-200">
              <p>
                All GlobalPay licenses and certifications can be independently verified through the respective regulatory authorities:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-purple-900 bg-opacity-60 p-6 rounded-lg">
                  <h4 className="font-bold text-white mb-3">FinCEN</h4>
                  <p className="text-sm mb-2">Verify MSB Registration</p>
                  <a href="https://www.fincen.gov/msb-registrant-search" className="text-blue-400 hover:text-blue-300 text-sm">
                    fincen.gov/msb-registrant-search
                  </a>
                </div>

                <div className="bg-purple-900 bg-opacity-60 p-6 rounded-lg">
                  <h4 className="font-bold text-white mb-3">NMLS</h4>
                  <p className="text-sm mb-2">Consumer Access Database</p>
                  <a href="https://www.nmlsconsumeraccess.org" className="text-blue-400 hover:text-blue-300 text-sm">
                    nmlsconsumeraccess.org
                  </a>
                </div>

                <div className="bg-purple-900 bg-opacity-60 p-6 rounded-lg">
                  <h4 className="font-bold text-white mb-3">NYDFS</h4>
                  <p className="text-sm mb-2">BitLicense Registry</p>
                  <a href="https://www.dfs.ny.gov" className="text-blue-400 hover:text-blue-300 text-sm">
                    dfs.ny.gov
                  </a>
                </div>

                <div className="bg-purple-900 bg-opacity-60 p-6 rounded-lg">
                  <h4 className="font-bold text-white mb-3">FDIC</h4>
                  <p className="text-sm mb-2">BankFind Suite</p>
                  <a href="https://banks.data.fdic.gov/bankfind-suite" className="text-blue-400 hover:text-blue-300 text-sm">
                    banks.data.fdic.gov/bankfind-suite
                  </a>
                </div>
              </div>

              <div className="bg-blue-900 bg-opacity-40 border border-blue-600 rounded-lg p-6 mt-6">
                <p className="text-sm">
                  <strong>Note:</strong> For license verification assistance or to request official documentation, please contact our compliance team at compliance@globalpay.com
                </p>
              </div>
            </div>
          </div>

          {/* Section 9 - Contact */}
          <div className="bg-purple-800 bg-opacity-60 rounded-lg p-8 backdrop-blur-sm border border-purple-600">
            <h2 className="text-3xl font-bold mb-6 flex items-center">
              <Mail className="mr-3 text-cyan-400" size={32} />
              9. License Inquiries
            </h2>
            
            <div className="space-y-6 text-purple-200">
              <p>
                For questions about our licenses, certifications, or to request official documentation:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-purple-900 bg-opacity-60 p-6 rounded-lg">
                  <h4 className="font-bold text-white mb-4">Licensing Department</h4>
                  <div className="space-y-2 text-sm">
                    <p className="flex items-center">
                      <Mail className="mr-2" size={16} />
                      licensing@globalpay.com
                    </p>
                    <p className="flex items-center">
                      <PhoneCall className="mr-2" size={16} />
                      +1-800-555-LICENSE
                    </p>
                  </div>
                </div>

                <div className="bg-purple-900 bg-opacity-60 p-6 rounded-lg">
                  <h4 className="font-bold text-white mb-4">Compliance Officer</h4>
                  <div className="space-y-2 text-sm">
                    <p className="flex items-center">
                      <Mail className="mr-2" size={16} />
                      compliance@globalpay.com
                    </p>
                    <p className="text-purple-300">For regulatory compliance questions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Statement */}
          <div className="bg-gradient-to-r from-yellow-900 to-green-900 rounded-lg p-8 border-2 border-yellow-500">
            <div className="flex items-start">
              <Award className="mr-4 flex-shrink-0 text-yellow-400" size={32} />
              <div>
                <h3 className="text-2xl font-bold mb-3">Licensed, Regulated & Trusted</h3>
                <p className="text-purple-200 mb-4">
                  GlobalPay's comprehensive licensing demonstrates our unwavering commitment to regulatory compliance, consumer protection, and operating with the highest standards of integrity. Every license is earned through rigorous regulatory review and maintained through ongoing compliance monitoring.
                </p>
                <p className="text-purple-300 text-sm">
                  We believe transparency in our regulatory standing builds trust with our customers and partners worldwide.
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

export default LicensesPage;