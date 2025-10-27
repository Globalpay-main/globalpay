import React from 'react';
import { X } from 'lucide-react';
import { supabase } from './supabaseClient';

const LoginModal = ({ 
  showLoginModal, 
  setShowLoginModal, 
  loginStep, 
  setLoginStep, 
  loginData, 
  setLoginData, 
  generateAuthCode,
  setShowLandingPage 
}) => {
  if (!showLoginModal) return null;

  const handleLogin = async () => {
    if (loginStep === 'email') {
      const contactInfo = loginData.loginMethod === 'email' ? loginData.email : loginData.phone;
      
      if (!contactInfo) {
        alert(`Please enter your ${loginData.loginMethod}`);
        return;
      }
      
      try {
        // Use Supabase magic link authentication
        const { error } = await supabase.auth.signInWithOtp({
          email: loginData.email,
          options: {
            emailRedirectTo: window.location.origin
          }
        });

        if (error) throw error;

        alert(`Magic link sent to ${loginData.email}. Check your email and click the link to login.`);
        setShowLoginModal(false);
        
      } catch (error) {
        alert('Login failed: ' + error.message);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-purple-800 rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Login to GlobalPay</h3>
          <button onClick={() => setShowLoginModal(false)}>
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email Address</label>
            <input
              type="email"
              value={loginData.email}
              onChange={(e) => setLoginData({...loginData, email: e.target.value})}
              className="w-full bg-purple-700 text-white p-3 rounded border border-purple-600 focus:border-purple-400 focus:outline-none"
              placeholder="your@email.com"
            />
          </div>

          <p className="text-sm text-purple-300">
            We'll send you a magic link to login securely without a password.
          </p>

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
          >
            Send Magic Link
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;