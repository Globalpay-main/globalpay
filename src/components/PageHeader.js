import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Download } from 'lucide-react';

const PageHeader = ({ currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="p-6 border-b border-purple-700">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <span className="text-purple-900 font-bold">GP</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold">GlobalPay</h1>
            <p className="text-sm text-purple-300">Fully Licensed & Regulated</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            to="/services" 
            className={`${currentPage === 'services' ? 'text-white font-medium' : 'text-purple-300 hover:text-white'}`}
          >
            Services
          </Link>
          <Link 
            to="/company" 
            className={`${currentPage === 'company' ? 'text-white font-medium' : 'text-purple-300 hover:text-white'}`}
          >
            Company
          </Link>
          <Link 
            to="/support" 
            className={`${currentPage === 'support' ? 'text-white font-medium' : 'text-purple-300 hover:text-white'}`}
          >
            Support
          </Link>
          <Link 
            to="/legal" 
            className={`${currentPage === 'legal' ? 'text-white font-medium' : 'text-purple-300 hover:text-white'}`}
          >
            Legal
          </Link>
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex space-x-4">
          <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105">
            Sign Up
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105">
            Login
          </button>
          <button className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105">
            Activate Card
          </button>
          <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
            <Download size={16} />
            <span>App</span>
          </button>
        </div>

        {/* Mobile Hamburger Menu */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white hover:text-purple-300 transition-colors"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 pb-4 border-t border-purple-700">
          <nav className="flex flex-col space-y-4 mt-4">
            <Link 
              to="/services" 
              className={`${currentPage === 'services' ? 'text-white font-medium' : 'text-purple-300 hover:text-white'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link 
              to="/company" 
              className={`${currentPage === 'company' ? 'text-white font-medium' : 'text-purple-300 hover:text-white'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Company
            </Link>
            <Link 
              to="/support" 
              className={`${currentPage === 'support' ? 'text-white font-medium' : 'text-purple-300 hover:text-white'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Support
            </Link>
            <Link 
              to="/legal" 
              className={`${currentPage === 'legal' ? 'text-white font-medium' : 'text-purple-300 hover:text-white'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Legal
            </Link>
            
            {/* Mobile Action Buttons */}
            <div className="flex flex-col space-y-3 mt-6 pt-4 border-t border-purple-600">
              <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-medium">
                Sign Up
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium">
                Login
              </button>
              <button className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-lg font-medium">
                Activate Card
              </button>
              <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-medium flex items-center justify-center space-x-2">
                <Download size={16} />
                <span>Download App</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};