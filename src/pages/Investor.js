import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Send, Globe, Clock, Shield, DollarSign, Zap, Users, CheckCircle, Building, Menu, X, ChevronDown, Download, Mail, Phone, FileText, Award, BarChart3, Activity, PieChart } from 'lucide-react';
import SignupModal from '../SignupModal';
import LoginModal from '../LoginModal';
import ActivateCardModal from '../ActivateCardModal';

const InvestorsPage = () => {
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

  const investors = [
    {
      name: "Andreessen Horowitz",
      type: "Lead Series B",
      amount: "$30M",
      stage: "Series B",
      year: "2024"
    },
    {
      name: "Coinbase Ventures",
      type: "Strategic",
      amount: "$15M",
      stage: "Series B",
      year: "2024"
    },
    {
      name: "Ribbit Capital",
      type: "Venture Capital",
      amount: "$5M",
      stage: "Series B",
      year: "2024"
    },
    {
      name: "Y Combinator",
      type: "Accelerator",
      amount: "$2M",
      stage: "Series A",
      year: "2023"
    },
    {
      name: "Founders Fund",
      type: "Venture Capital",
      amount: "$8M",
      stage: "Series A",
      year: "2023"
    },
    {
      name: "Index Ventures",
      type: "Venture Capital",
      amount: "$5M",
      stage: "Series A",
      year: "2023"
    }
  ];

  const financials = [
    {
      quarter: "Q4 2024",
      revenue: "$45M",
      growth: "+127%",
      users: "2.1M",
      volume: "$580M"
    },
    {
      quarter: "Q3 2024",
      revenue: "$32M",
      growth: "+98%",
      users: "1.8M",
      volume: "$420M"
    },
    {
      quarter: "Q2 2024",
      revenue: "$24M",
      growth: "+85%",
      users: "1.5M",
      volume: "$310M"
    },
    {
      quarter: "Q1 2024",
      revenue: "$18M",
      growth: "+67%",
      users: "1.2M",
      volume: "$240M"
    }
  ];

  const reports = [
    {
      title: "Q4 2024 Investor Letter",
      date: "2024-12-31",
      type: "Quarterly Report",
      size: "2.4 MB"
    },
    {
      title: "Annual Report 2024",
      date: "2024-12-31",
      type: "Annual Report",
      size: "5.8 MB"
    },
    {
      title: "Series B Funding Announcement",
      date: "2024-12-15",
      type: "Press Release",
      size: "1.2 MB"
    },
    {
      title: "Q3 2024 Financial Results",
      date: "2024-09-30",
      type: "Quarterly Report",
      size: "2.1 MB"
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
                            item.path === '/investors' ? 'text-white font-medium bg-purple-700' : 'text-gray-200 hover:text-white'
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
              Investor <span className="text-blue-400">Relations</span>
            </h1>
            <p className="text-xl text-purple-200 mb-8 max-w-4xl mx-auto">
              Building the future of global finance through strategic partnerships and sustainable growth. 
              Discover our financial performance, market opportunity, and long-term vision.
            </p>
            <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-full px-8 py-3 inline-block">
              <span className="text-lg font-bold">$500M Valuation • $75M Raised • 127% YoY Growth</span>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center mb-12">Key Performance Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-purple-800 bg-opacity-60 rounded-lg p-6 backdrop-blur-sm border border-purple-600">
                <DollarSign className="text-green-400 mb-4" size={32} />
                <h4 className="text-xl font-bold mb-3">Annual Revenue</h4>
                <div className="text-3xl font-bold text-green-400 mb-2">$120M</div>
                <p className="text-purple-300 text-sm">+127% YoY Growth</p>
              </div>

              <div className="bg-purple-800 bg-opacity-60 rounded-lg p-6 backdrop-blur-sm border border-purple-600">
                <Users className="text-blue-400 mb-4" size={32} />
                <h4 className="text-xl font-bold mb-3">Active Users</h4>
                <div className="text-3xl font-bold text-blue-400 mb-2">2.1M</div>
                <p className="text-purple-300 text-sm">75% Monthly Active</p>
              </div>

              <div className="bg-purple-800 bg-opacity-60 rounded-lg p-6 backdrop-blur-sm border border-purple-600">
                <Send className="text-purple-400 mb-4" size={32} />
                <h4 className="text-xl font-bold mb-3">Transaction Volume</h4>
                <div className="text-3xl font-bold text-purple-400 mb-2">$1.5B</div>
                <p className="text-purple-300 text-sm">Annualized 2024</p>
              </div>

              <div className="bg-purple-800 bg-opacity-60 rounded-lg p-6 backdrop-blur-sm border border-purple-600">
                <Award className="text-yellow-400 mb-4" size={32} />
                <h4 className="text-xl font-bold mb-3">Valuation</h4>
                <div className="text-3xl font-bold text-yellow-400 mb-2">$500M</div>
                <p className="text-purple-300 text-sm">Series B (2024)</p>
              </div>
            </div>
          </div>

          {/* Investors */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center mb-12">Our Investors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {investors.map((investor, index) => (
                <div key={index} className="bg-purple-800 bg-opacity-60 rounded-lg p-6 backdrop-blur-sm border border-purple-600 hover:border-blue-500 transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <Building className="text-blue-400 mr-3" size={24} />
                    <div>
                      <h4 className="text-lg font-bold">{investor.name}</h4>
                      <p className="text-purple-300 text-sm">{investor.type}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-2xl font-bold text-green-400">{investor.amount}</div>
                      <p className="text-purple-300 text-sm">{investor.stage} • {investor.year}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Performance */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center mb-12">Financial Performance</h2>
            <div className="bg-purple-800 bg-opacity-60 rounded-lg p-8 backdrop-blur-sm border border-purple-600">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-purple-900 bg-opacity-60">
                    <tr>
                      <th className="p-4 text-left">Quarter</th>
                      <th className="p-4 text-right">Revenue</th>
                      <th className="p-4 text-right">Growth</th>
                      <th className="p-4 text-right">Users</th>
                      <th className="p-4 text-right">Volume</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-700">
                    {financials.map((quarter, index) => (
                      <tr key={index} className="hover:bg-purple-700 hover:bg-opacity-40">
                        <td className="p-4 font-bold">{quarter.quarter}</td>
                        <td className="p-4 text-right text-green-400 font-bold">{quarter.revenue}</td>
                        <td className="p-4 text-right text-blue-400 font-bold">{quarter.growth}</td>
                        <td className="p-4 text-right">{quarter.users}</td>
                        <td className="p-4 text-right">{quarter.volume}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Investor Resources */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center mb-12">Investor Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reports.map((report, index) => (
                <div key={index} className="bg-purple-800 bg-opacity-60 rounded-lg p-6 backdrop-blur-sm border border-purple-600 hover:border-green-500 transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <FileText className="text-green-400 mr-3" size={24} />
                      <div>
                        <h4 className="text-lg font-bold">{report.title}</h4>
                        <p className="text-purple-300 text-sm">{report.type}</p>
                      </div>
                    </div>
                    <div className="text-right text-sm text-purple-300">
                      <div>{new Date(report.date).toLocaleDateString()}</div>
                      <div>{report.size}</div>
                    </div>
                  </div>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center">
                    <Download size={16} className="mr-2" />
                    Download PDF
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* ESG Commitment */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center mb-12">ESG Commitment</h2>
            <div className="bg-gradient-to-r from-green-900 to-blue-900 rounded-lg p-8 border border-green-500">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-green-400">Environmental</h3>
                  <ul className="space-y-2 text-purple-200">
                    <li>• Carbon-neutral operations since 2023</li>
                    <li>• 100% renewable energy offices</li>
                    <li>• Blockchain efficiency optimization</li>
                    <li>• $2M green technology investment</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-blue-400">Social</h3>
                  <ul className="space-y-2 text-purple-200">
                    <li>• 650K+ unbanked users served</li>
                    <li>• Financial literacy programs</li>
                    <li>• Diversity: 65% underrepresented</li>
                    <li>• $5M donated to nonprofits</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-purple-400">Governance</h3>
                  <ul className="space-y-2 text-purple-200">
                    <li>• Independent board directors</li>
                    <li>• SOC 2 Type II compliance</li>
                    <li>• Regular security audits</li>
                    <li>• Transparent reporting</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Investment Highlights */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center mb-12">Investment Highlights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="bg-purple-800 bg-opacity-60 rounded-lg p-6 backdrop-blur-sm border border-purple-600 text-center">
                <BarChart3 className="text-blue-400 mb-3 mx-auto" size={32} />
                <h4 className="font-bold mb-2">Revenue Growth</h4>
                <div className="text-2xl font-bold text-blue-400">127%</div>
                <p className="text-purple-300 text-sm">Year-over-year</p>
              </div>

              <div className="bg-purple-800 bg-opacity-60 rounded-lg p-6 backdrop-blur-sm border border-purple-600 text-center">
                <Users className="text-green-400 mb-3 mx-auto" size={32} />
                <h4 className="font-bold mb-2">User Retention</h4>
                <div className="text-2xl font-bold text-green-400">92%</div>
                <p className="text-purple-300 text-sm">12-month retention</p>
              </div>

              <div className="bg-purple-800 bg-opacity-60 rounded-lg p-6 backdrop-blur-sm border border-purple-600 text-center">
                <Activity className="text-yellow-400 mb-3 mx-auto" size={32} />
                <h4 className="font-bold mb-2">Gross Margin</h4>
                <div className="text-2xl font-bold text-yellow-400">78%</div>
                <p className="text-purple-300 text-sm">Q4 2024</p>
              </div>

              <div className="bg-purple-800 bg-opacity-60 rounded-lg p-6 backdrop-blur-sm border border-purple-600 text-center">
                <PieChart className="text-purple-400 mb-3 mx-auto" size={32} />
                <h4 className="font-bold mb-2">Market Share</h4>
                <div className="text-2xl font-bold text-purple-400">12%</div>
                <p className="text-purple-300 text-sm">Crypto remittances</p>
              </div>
            </div>
          </div>

          {/* Investor Contact */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center mb-12">Investor Relations Contact</h2>
            <div className="bg-purple-800 bg-opacity-60 rounded-lg p-8 backdrop-blur-sm border border-purple-600 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-6">Primary Contact</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-lg">David Rodriguez</h4>
                      <p className="text-purple-300">Chief Financial Officer</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Mail className="text-yellow-400 mr-2" size={16} />
                        <a href="mailto:investors@globalpay.com" className="text-yellow-400 hover:text-yellow-300">
                          investors@globalpay.com
                        </a>
                      </div>
                      <div className="flex items-center">
                        <Phone className="text-green-400 mr-2" size={16} />
                        <span className="text-green-400">+1 (415) 555-0175</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-6">Investor Relations</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-lg">Jennifer Walsh</h4>
                      <p className="text-purple-300">VP Investor Relations</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Mail className="text-yellow-400 mr-2" size={16} />
                        <a href="mailto:ir@globalpay.com" className="text-yellow-400 hover:text-yellow-300">
                          ir@globalpay.com
                        </a>
                      </div>
                      <div className="flex items-center">
                        <Phone className="text-green-400 mr-2" size={16} />
                        <span className="text-green-400">+1 (415) 555-0180</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-lg p-8 border border-blue-500 text-center">
            <h2 className="text-3xl font-bold mb-6">Partner With Us</h2>
            <p className="text-xl text-purple-200 mb-8">
              Join leading investors in building the future of global finance and financial inclusion
            </p>
            <div className="flex justify-center space-x-6">
              <a 
                href="mailto:investors@globalpay.com"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 inline-block"
              >
                Contact Investor Relations
              </a>
              <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105">
                Download Investor Deck
              </button>
            </div>
            <p className="text-sm text-blue-200 mt-4">Quarterly earnings calls • Annual investor day • Real-time updates</p>
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

export default InvestorsPage;