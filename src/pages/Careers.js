import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Globe, Heart, Zap, Award, MapPin, Clock, Briefcase, Code, Palette, Building, TrendingUp, Coffee, Wifi, Plane, Menu, X, Download, Star, Target, Eye, ChevronDown } from 'lucide-react';
import SignupModal from '../SignupModal';
import LoginModal from '../LoginModal';
import ActivateCardModal from '../ActivateCardModal';

const CareersPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [showQRCode, setShowQRCode] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showActivateCardModal, setShowActivateCardModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
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

  const jobListings = [
    {
      id: 1,
      title: "Senior Blockchain Engineer",
      department: "Engineering",
      location: "San Francisco",
      type: "Full-time",
      experience: "5+ years",
      description: "Build and optimize our blockchain infrastructure for global payments"
    },
    {
      id: 2,
      title: "Product Designer",
      department: "Design",
      location: "Remote",
      type: "Full-time",
      experience: "3+ years",
      description: "Design intuitive user experiences for our global financial platform"
    },
    {
      id: 3,
      title: "Compliance Manager",
      department: "Legal",
      location: "London",
      type: "Full-time",
      experience: "7+ years",
      description: "Ensure regulatory compliance across international markets"
    },
    {
      id: 4,
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "Lagos",
      type: "Full-time",
      experience: "4+ years",
      description: "Drive customer satisfaction and growth in African markets"
    },
    {
      id: 5,
      title: "Full Stack Developer",
      department: "Engineering",
      location: "Toronto",
      type: "Full-time",
      experience: "3+ years",
      description: "Develop scalable web applications for our financial services"
    },
    {
      id: 6,
      title: "Marketing Manager",
      department: "Marketing",
      location: "Mumbai",
      type: "Full-time",
      experience: "5+ years",
      description: "Lead marketing initiatives for South Asian market expansion"
    },
    {
      id: 7,
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Singapore",
      type: "Full-time",
      experience: "4+ years",
      description: "Manage infrastructure and deployment for high-scale systems"
    },
    {
      id: 8,
      title: "Business Development Director",
      department: "Business Development",
      location: "San Francisco",
      type: "Full-time",
      experience: "8+ years",
      description: "Drive partnerships and business growth strategies"
    }
  ];

  const benefits = [
    {
      icon: <Heart className="text-red-400" size={32} />,
      title: "Health & Wellness",
      description: "Comprehensive health insurance, mental health support, and wellness programs"
    },
    {
      icon: <Globe className="text-blue-400" size={32} />,
      title: "Remote-First Culture",
      description: "Work from anywhere with flexible hours and global collaboration"
    },
    {
      icon: <TrendingUp className="text-green-400" size={32} />,
      title: "Equity & Growth",
      description: "Competitive equity packages and unlimited learning opportunities"
    },
    {
      icon: <Plane className="text-purple-400" size={32} />,
      title: "Travel & Exploration",
      description: "Annual travel stipend and quarterly team gatherings worldwide"
    },
    {
      icon: <Coffee className="text-orange-400" size={32} />,
      title: "Work-Life Balance",
      description: "Unlimited PTO, parental leave, and sabbatical opportunities"
    },
    {
      icon: <Award className="text-yellow-400" size={32} />,
      title: "Recognition & Rewards",
      description: "Performance bonuses, peer recognition programs, and career advancement"
    }
  ];

  const filteredJobs = jobListings.filter(job => {
    const departmentMatch = selectedDepartment === 'all' || job.department === selectedDepartment;
    const locationMatch = selectedLocation === 'all' || job.location === selectedLocation;
    return departmentMatch && locationMatch;
  });

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
                            item.path === '/careers' ? 'text-white font-medium bg-purple-700' : 'text-gray-200 hover:text-white'
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
              Join Our <span className="text-blue-400">Mission</span>
            </h1>
            <p className="text-xl text-purple-200 mb-8 max-w-4xl mx-auto">
              Help us democratize global finance and bring financial services to everyone, everywhere. 
              Be part of a team that's reshaping how money moves around the world through blockchain innovation.
            </p>
            <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-full px-8 py-3 inline-block">
              <span className="text-lg font-bold">450+ Employees • 6 Global Offices • Unlimited Growth</span>
            </div>
          </div>

          {/* Mission & Values */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center mb-12">Why Work at GlobalPay?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-lg p-8 border border-blue-500 text-center">
                <Target className="text-blue-400 text-5xl mb-4 mx-auto" />
                <h3 className="text-2xl font-bold mb-4">Meaningful Impact</h3>
                <p className="text-purple-200">
                  Your work directly impacts millions of people worldwide, bringing financial inclusion 
                  to the unbanked and connecting families across borders.
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-900 to-blue-900 rounded-lg p-8 border border-green-500 text-center">
                <Zap className="text-green-400 text-5xl mb-4 mx-auto" />
                <h3 className="text-2xl font-bold mb-4">Cutting-Edge Tech</h3>
                <p className="text-purple-200">
                  Work with the latest blockchain technologies, AI systems, and scalable infrastructure 
                  that processes billions in transactions.
                </p>
              </div>

              <div className="bg-gradient-to-r from-purple-900 to-pink-900 rounded-lg p-8 border border-purple-500 text-center">
                <Users className="text-purple-400 text-5xl mb-4 mx-auto" />
                <h3 className="text-2xl font-bold mb-4">Diverse Team</h3>
                <p className="text-purple-200">
                  Join a global team of 450+ passionate individuals from 40+ countries, 
                  working together to solve complex financial challenges.
                </p>
              </div>
            </div>
          </div>

          {/* Benefits & Perks */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center mb-12">Benefits & Perks</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-purple-800 bg-opacity-60 rounded-lg p-6 backdrop-blur-sm border border-purple-600 hover:border-green-500 transition-all duration-300">
                  <div className="flex items-center mb-4">
                    {benefit.icon}
                    <h4 className="text-xl font-bold ml-4">{benefit.title}</h4>
                  </div>
                  <p className="text-purple-200">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Company Culture */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center mb-12">Our Culture</h2>
            <div className="bg-gradient-to-r from-orange-900 to-red-900 rounded-lg p-8 border border-orange-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-6">Our Values</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Star className="text-yellow-400 mr-3 mt-1" size={20} />
                      <div>
                        <h4 className="font-bold">Customer First</h4>
                        <p className="text-purple-200 text-sm">Every decision we make prioritizes our customers' needs and success</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Heart className="text-red-400 mr-3 mt-1" size={20} />
                      <div>
                        <h4 className="font-bold">Empathy & Inclusion</h4>
                        <p className="text-purple-200 text-sm">We build products and culture with diverse perspectives and backgrounds</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Zap className="text-blue-400 mr-3 mt-1" size={20} />
                      <div>
                        <h4 className="font-bold">Innovation</h4>
                        <p className="text-purple-200 text-sm">We constantly push boundaries and challenge the status quo</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Award className="text-green-400 mr-3 mt-1" size={20} />
                      <div>
                        <h4 className="font-bold">Excellence</h4>
                        <p className="text-purple-200 text-sm">We strive for the highest quality in everything we do</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-6">Work Environment</h3>
                  <ul className="space-y-3 text-purple-200">
                    <li className="flex items-center"><Coffee size={16} className="text-orange-400 mr-3" />Flexible remote-first culture with optional office access</li>
                    <li className="flex items-center"><Wifi size={16} className="text-blue-400 mr-3" />State-of-the-art technology and equipment provided</li>
                    <li className="flex items-center"><Users size={16} className="text-green-400 mr-3" />Cross-functional collaboration and mentorship programs</li>
                    <li className="flex items-center"><Globe size={16} className="text-purple-400 mr-3" />Global teams with 24/7 coverage and support</li>
                    <li className="flex items-center"><TrendingUp size={16} className="text-yellow-400 mr-3" />Continuous learning and professional development</li>
                    <li className="flex items-center"><Heart size={16} className="text-red-400 mr-3" />Strong focus on work-life balance and mental health</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Job Listings */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center mb-12">Open Positions</h2>
            
            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-8 justify-center">
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="bg-purple-800 border border-purple-600 text-white px-4 py-2 rounded-lg focus:border-blue-400 focus:outline-none"
              >
                <option value="all">All Departments</option>
                <option value="Engineering">Engineering</option>
                <option value="Design">Design</option>
                <option value="Legal">Legal</option>
                <option value="Customer Success">Customer Success</option>
                <option value="Marketing">Marketing</option>
                <option value="Business Development">Business Development</option>
              </select>
              
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="bg-purple-800 border border-purple-600 text-white px-4 py-2 rounded-lg focus:border-blue-400 focus:outline-none"
              >
                <option value="all">All Locations</option>
                <option value="San Francisco">San Francisco</option>
                <option value="London">London</option>
                <option value="Lagos">Lagos</option>
                <option value="Singapore">Singapore</option>
                <option value="Toronto">Toronto</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Remote">Remote</option>
              </select>
            </div>

            {/* Job Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredJobs.map((job) => (
                <div key={job.id} className="bg-purple-800 bg-opacity-60 rounded-lg p-6 backdrop-blur-sm border border-purple-600 hover:border-blue-500 transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-xl font-bold mb-2">{job.title}</h4>
                      <div className="flex items-center space-x-4 text-sm text-purple-300">
                        <span className="flex items-center"><Building size={14} className="mr-1" />{job.department}</span>
                        <span className="flex items-center"><MapPin size={14} className="mr-1" />{job.location}</span>
                        <span className="flex items-center"><Clock size={14} className="mr-1" />{job.type}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">{job.experience}</span>
                    </div>
                  </div>
                  <p className="text-purple-200 mb-4">{job.description}</p>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 w-full">
                    Apply Now
                  </button>
                </div>
              ))}
            </div>

            {filteredJobs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-purple-300 text-lg">No positions found matching your criteria.</p>
                <p className="text-purple-400 mt-2">Try adjusting your filters or check back later for new opportunities.</p>
              </div>
            )}
          </div>

          {/* Diversity & Inclusion */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center mb-12">Diversity & Inclusion</h2>
            <div className="bg-gradient-to-r from-green-900 to-blue-900 rounded-lg p-8 border border-green-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-6">Our Commitment</h3>
                  <p className="text-purple-200 mb-4">
                    At GlobalPay, we believe that diversity drives innovation. Our team represents 
                    40+ countries, speaks 25+ languages, and brings unique perspectives that help 
                    us serve our global customer base better.
                  </p>
                  <p className="text-purple-200">
                    We're committed to creating an inclusive environment where everyone can thrive, 
                    regardless of their background, identity, or experience level.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-6">Our Numbers</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-400">47%</div>
                      <div className="text-purple-300">Women in Tech</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-400">40+</div>
                      <div className="text-purple-300">Countries</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-yellow-400">65%</div>
                      <div className="text-purple-300">Underrepresented Groups</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-400">25+</div>
                      <div className="text-purple-300">Languages</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interview Process */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center mb-12">Our Interview Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h4 className="text-xl font-bold mb-3">Application</h4>
                <p className="text-purple-200">Submit your application and we'll review it within 48 hours</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h4 className="text-xl font-bold mb-3">Phone Screen</h4>
                <p className="text-purple-200">30-minute conversation with our recruiting team</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h4 className="text-xl font-bold mb-3">Technical/Role Interview</h4>
                <p className="text-purple-200">Role-specific assessment with the hiring team</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">4</span>
                </div>
                <h4 className="text-xl font-bold mb-3">Final Interview</h4>
                <p className="text-purple-200">Meet with leadership and discuss company culture fit</p>
              </div>
            </div>
          </div>

          {/* Student & Graduate Programs */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center mb-12">Student & Graduate Programs</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              <div className="bg-purple-800 bg-opacity-60 rounded-lg p-6 backdrop-blur-sm border border-purple-600 hover:border-blue-500 transition-all duration-300">
                <Code className="text-blue-400 mb-4" size={32} />
                <h4 className="text-xl font-bold mb-3">Engineering Internship</h4>
                <p className="text-purple-200 mb-4">12-week paid internship working on real products with mentorship from senior engineers</p>
                <ul className="text-sm text-purple-300 space-y-1">
<li>• Competitive stipend + housing</li>
<li>• Full-time offer potential</li>
<li>• Global program (6 locations)</li>
</ul>
</div>
          <div className="bg-purple-800 bg-opacity-60 rounded-lg p-6 backdrop-blur-sm border border-purple-600 hover:border-green-500 transition-all duration-300">
            <Palette className="text-green-400 mb-4" size={32} />
            <h4 className="text-xl font-bold mb-3">New Graduate Program</h4>
            <p className="text-purple-200 mb-4">2-year rotational program for recent graduates across multiple departments</p>
            <ul className="text-sm text-purple-300 space-y-1">
              <li>• Structured mentorship</li>
              <li>• Leadership training</li>
              <li>• Cross-functional exposure</li>
            </ul>
          </div>

          <div className="bg-purple-800 bg-opacity-60 rounded-lg p-6 backdrop-blur-sm border border-purple-600 hover:border-orange-500 transition-all duration-300">
            <Award className="text-orange-400 mb-4" size={32} />
            <h4 className="text-xl font-bold mb-3">Scholarship Program</h4>
            <p className="text-purple-200 mb-4">$10,000 scholarships for underrepresented students in STEM fields</p>
            <ul className="text-sm text-purple-300 space-y-1">
              <li>• $10K annual scholarship</li>
              <li>• Mentorship program</li>
              <li>• Internship guarantee</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-lg p-8 border border-blue-500 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Change the World?</h2>
        <p className="text-xl text-purple-200 mb-8">
          Join us in building the future of global finance and making a real impact on billions of lives
        </p>
        <div className="flex justify-center space-x-6">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105">
            View All Positions
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105">
            Refer a Friend
          </button>
        </div>
        <p className="text-sm text-blue-200 mt-4">We're always looking for exceptional talent • Apply even if you don't see the perfect role</p>
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
export default CareersPage;