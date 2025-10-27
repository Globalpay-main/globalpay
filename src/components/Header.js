import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, Download } from 'lucide-react';

const Header = ({ 
  showSignupModal, 
  setShowSignupModal, 
  showLoginModal, 
  setShowLoginModal, 
  showActivateCardModal, 
  setShowActivateCardModal 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState(null);

  const menuStructure = {
    services: [
      { name: 'Send Money', path: '/send-money' },
      { name: 'Crypto Cards', path: '/crypto-cards' },
      { name: 'Digital Wallets', path: '/digital-wallets' },
      { name: 'Business Solutions', path: '/business-solutions' }
    ],
    company: [
      { name: 'About Us', path: '/about-us' },
      { name: 'Careers', path: '/careers' },
      { name: 'Press', path: '/press' },
      { name: 'Investors', path: '/investors' }
    ],
    support: [
      { name: 'Help Center', path: '/help-center' },
      { name: 'Contact Us', path: '/contact-us' },
      { name: 'API Documentation', path: '/api-documentation' },
      { name: 'Security', path: '/security' }
    ],
    legal: [
      { name: 'Privacy Policy', path: '/legal' },
      { name: 'Terms of Service', path: '/legal' },
      { name: 'Compliance', path: '/legal' },
      { name: 'Licenses', path: '/legal' }
    ]
  };

  return (
    <header className="p-6 border-b border-purple-700">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <span className="text-purple-900 font-bold">GP</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold">GlobalPay</h1>
            <p className="text-sm text-purple-300">Fully Licensed & Regulated</p>
          </div>
        </Link>

        <div className="hidden lg:flex items-center space-x-8">
          <nav className="flex items-center space-x-6">
            <Link to="/" className="text-white font-bold hover:text-purple-300">Home</Link>
            
            <div 
              className="relative group"
              onMouseEnter={() => setHoveredMenu('services')}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              <button className="text-white font-bold hover:text-purple-300 flex items-center">
                Services
                <ChevronDown size={16} className="ml-1" />
              </button>
              {hoveredMenu === 'services' && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-purple-800 rounded-lg shadow-xl border border-purple-600 py-2 z-50">
                  {menuStructure.services.map((item, index) => (
                    <Link
                      key={index}
                      to={item.path}
                      className="block px-4 py-2 text-purple-200 hover:bg-purple-700 hover:text-white"
                      onClick={() => setHoveredMenu(null)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div 
              className="relative group"
              onMouseEnter={() => setHoveredMenu('company')}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              <button className="text-white font-bold hover:text-purple-300 flex items-center">
                Company
                <ChevronDown size={16} className="ml-1" />
              </button>
              {hoveredMenu === 'company' && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-purple-800 rounded-lg shadow-xl border border-purple-600 py-2 z-50">
                  {menuStructure.company.map((item, index) => (
                    <Link
                      key={index}
                      to={item.path}
                      className="block px-4 py-2 text-purple-200 hover:bg-purple-700 hover:text-white"
                      onClick={() => setHoveredMenu(null)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div 
              className="relative group"
              onMouseEnter={() => setHoveredMenu('support')}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              <button className="text-white font-bold hover:text-purple-300 flex items-center">
                Support
                <ChevronDown size={16} className="ml-1" />
              </button>
              {hoveredMenu === 'support' && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-purple-800 rounded-lg shadow-xl border border-purple-600 py-2 z-50">
                  {menuStructure.support.map((item, index) => (
                    <Link
                      key={index}
                      to={item.path}
                      className="block px-4 py-2 text-purple-200 hover:bg-purple-700 hover:text-white"
                      onClick={() => setHoveredMenu(null)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div 
              className="relative group"
              onMouseEnter={() => setHoveredMenu('legal')}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              <button className="text-white font-bold hover:text-purple-300 flex items-center">
                Legal
                <ChevronDown size={16} className="ml-1" />
              </button>
              {hoveredMenu === 'legal' && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-purple-800 rounded-lg shadow-xl border border-purple-600 py-2 z-50">
                  {menuStructure.legal.map((item, index) => (
                    <Link
                      key={index}
                      to={item.path}
                      className="block px-4 py-2 text-purple-200 hover:bg-purple-700 hover:text-white"
                      onClick={() => setHoveredMenu(null)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>
          
          <div className="flex space-x-3">
            <button 
              onClick={() => setShowSignupModal(true)}
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-medium transition-all duration-300"
            >
              Sign Up
            </button>
            <button 
              onClick={() => setShowLoginModal(true)}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium transition-all duration-300"
            >
              Login
            </button>
            <button 
              onClick={() => setShowActivateCardModal(true)}
              className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-lg font-medium transition-all duration-300"
            >
              Activate Card
            </button>
            
            <div className="relative group">
              <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2">
                <Download size={16} />
                <span>App</span>
              </button>
              
              <div className="absolute right-0 mt-2 w-64 bg-purple-800 rounded-lg shadow-xl border border-purple-600 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="p-4">
                  <h4 className="text-white font-bold mb-3 text-center">Download Now</h4>
                  
                  <a href="https://apps.apple.com/app/globalpay" className="flex items-center space-x-3 bg-gray-900 hover:bg-gray-800 text-white p-3 rounded-lg mb-2 transition-colors">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                    <div>
                      <div className="text-xs">Download on the</div>
                      <div className="text-sm font-bold">App Store</div>
                    </div>
                  </a>
                  
                  <a href="https://play.google.com/store/apps/details?id=com.globalpay.app" className="flex items-center space-x-3 bg-gray-900 hover:bg-gray-800 text-white p-3 rounded-lg transition-colors">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                    </svg>
                    <div>
                      <div className="text-xs">Get it on</div>
                      <div className="text-sm font-bold">Google Play</div>
                    </div>
                  </a>
                  
                  <p className="text-purple-300 text-xs text-center mt-3">Available on iOS 14+ and Android 8+</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden text-white hover:text-purple-300 transition-colors"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden mt-4 pb-4 border-t border-purple-700">
          <nav className="flex flex-col space-y-4 mt-4">
            <Link to="/" className="text-white font-bold hover:text-purple-300" onClick={() => setIsMenuOpen(false)}>Home</Link>
            
            <div>
              <div 
                className="text-white font-bold hover:text-purple-300 cursor-pointer flex items-center justify-between"
                onClick={() => setHoveredMenu(hoveredMenu === 'services' ? null : 'services')}
              >
                <span>Services</span>
                <ChevronDown size={16} className={`transition-transform ${hoveredMenu === 'services' ? 'rotate-180' : ''}`} />
              </div>
              {hoveredMenu === 'services' && (
                <div className="pl-4 mt-2 space-y-2 border-l-2 border-purple-600">
                  {menuStructure.services.map((item, index) => (
                    <Link
                      key={index}
                      to={item.path}
                      className="block text-purple-300 hover:text-white"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div>
              <div 
                className="text-white font-bold hover:text-purple-300 cursor-pointer flex items-center justify-between"
                onClick={() => setHoveredMenu(hoveredMenu === 'company' ? null : 'company')}
              >
                <span>Company</span>
                <ChevronDown size={16} className={`transition-transform ${hoveredMenu === 'company' ? 'rotate-180' : ''}`} />
              </div>
              {hoveredMenu === 'company' && (
                <div className="pl-4 mt-2 space-y-2 border-l-2 border-purple-600">
                  {menuStructure.company.map((item, index) => (
                    <Link
                      key={index}
                      to={item.path}
                      className="block text-purple-300 hover:text-white"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div>
              <div 
                className="text-white font-bold hover:text-purple-300 cursor-pointer flex items-center justify-between"
                onClick={() => setHoveredMenu(hoveredMenu === 'support' ? null : 'support')}
              >
                <span>Support</span>
                <ChevronDown size={16} className={`transition-transform ${hoveredMenu === 'support' ? 'rotate-180' : ''}`} />
              </div>
              {hoveredMenu === 'support' && (
                <div className="pl-4 mt-2 space-y-2 border-l-2 border-purple-600">
                  {menuStructure.support.map((item, index) => (
                    <Link
                      key={index}
                      to={item.path}
                      className="block text-purple-300 hover:text-white"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div>
              <div 
                className="text-white font-bold hover:text-purple-300 cursor-pointer flex items-center justify-between"
                onClick={() => setHoveredMenu(hoveredMenu === 'legal' ? null : 'legal')}
              >
                <span>Legal</span>
                <ChevronDown size={16} className={`transition-transform ${hoveredMenu === 'legal' ? 'rotate-180' : ''}`} />
              </div>
              {hoveredMenu === 'legal' && (
                <div className="pl-4 mt-2 space-y-2 border-l-2 border-purple-600">
                  {menuStructure.legal.map((item, index) => (
                    <Link
                      key={index}
                      to={item.path}
                      className="block text-purple-300 hover:text-white"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            <div className="flex flex-col space-y-3 mt-6 pt-4 border-t border-purple-600">
              <button 
                onClick={() => {
                  setShowSignupModal(true);
                  setIsMenuOpen(false);
                }}
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-medium"
              >
                Sign Up
              </button>
              <button 
                onClick={() => {
                  setShowLoginModal(true);
                  setIsMenuOpen(false);
                }}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium"
              >
                Login
              </button>
              <button 
                onClick={() => {
                  setShowActivateCardModal(true);
                  setIsMenuOpen(false);
                }}
                className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-lg font-medium"
              >
                Activate Card
              </button>
              
              <div className="bg-purple-700 rounded-lg p-4">
                <h4 className="text-white font-bold mb-3 text-center">Download App</h4>
                
                <a href="https://apps.apple.com/app/globalpay" className="flex items-center space-x-3 bg-gray-900 hover:bg-gray-800 text-white p-3 rounded-lg mb-2">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <div>
                    <div className="text-xs">Download on the</div>
                    <div className="text-sm font-bold">App Store</div>
                  </div>
                </a>
                
                <a href="https://play.google.com/store/apps/details?id=com.globalpay.app" className="flex items-center space-x-3 bg-gray-900 hover:bg-gray-800 text-white p-3 rounded-lg">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                  <div>
                    <div className="text-xs">Get it on</div>
                    <div className="text-sm font-bold">Google Play</div>
                  </div>
                </a>
                
                <p className="text-purple-300 text-xs text-center mt-3">iOS 14+ and Android 8+</p>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;