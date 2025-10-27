import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
      <footer className="bg-black bg-opacity-50 mt-16 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-lg mb-4">Services</h4>
              <ul className="space-y-2 text-purple-300">
                <li><Link to="/services" className="hover:text-white">Send Money</Link></li>
                <li><Link to="/services" className="hover:text-white">Crypto Cards</Link></li>
                <li><Link to="/services" className="hover:text-white">Digital Wallets</Link></li>
                <li><Link to="/services" className="hover:text-white">Business Solutions</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Company</h4>
              <ul className="space-y-2 text-purple-300">
                <li><Link to="/company" className="hover:text-white">About Us</Link></li>
                <li><Link to="/company" className="hover:text-white">Careers</Link></li>
                <li><Link to="/company" className="hover:text-white">Press</Link></li>
                <li><Link to="/company" className="hover:text-white">Investors</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Support</h4>
              <ul className="space-y-2 text-purple-300">
                <li><Link to="/support" className="hover:text-white">Help Center</Link></li>
                <li><Link to="/support" className="hover:text-white">Contact Us</Link></li>
                <li><Link to="/support" className="hover:text-white">API Documentation</Link></li>
                <li><Link to="/support" className="hover:text-white">Security</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Legal</h4>
              <ul className="space-y-2 text-purple-300">
                <li><Link to="/legal" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link to="/legal" className="hover:text-white">Terms of Service</Link></li>
                <li><Link to="/legal" className="hover:text-white">Compliance</Link></li>
                <li><Link to="/legal" className="hover:text-white">Licenses</Link></li>
              </ul>
            </div>
          </div>
          
          {/* Copyright Section */}
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
  );
};

export default Footer;