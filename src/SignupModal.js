import React from 'react';
import { X } from 'lucide-react';
import { supabase } from './supabaseClient';

const SignupModal = ({ 
  showSignupModal, 
  setShowSignupModal, 
  signupData, 
  setSignupData, 
  countries,
  setShowLandingPage 
}) => {
  if (!showSignupModal) return null;

  const handleSignup = async () => {
    if (!signupData.firstName || !signupData.lastName || !signupData.email || !signupData.phone) {
      alert('Please fill in all required fields');
      return;
    }
    
    try {
      // Create user account with Supabase
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: signupData.email,
        password: Math.random().toString(36).slice(-8) + 'Aa1!',
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            first_name: signupData.firstName,
            last_name: signupData.lastName,
            phone: signupData.phone,
          }
        }
      });

      if (authError) throw authError;

      // Create user profile in database
      const { error: profileError } = await supabase
        .from('users')
        .insert([
          {
            id: authData.user.id,
            email: signupData.email,
            phone: signupData.phone,
            first_name: signupData.firstName,
            last_name: signupData.lastName,
            kyc_status: 'pending',
            kyc_level: 'minimal'
          }
        ]);

      if (profileError) throw profileError;

      alert('Account created successfully!\n\nIMPORTANT: Check your email (' + signupData.email + ') for a verification link from Supabase (noreply@mail.app.supabase.io).\n\nYou MUST click the verification link before you can log in.\n\nCheck your spam/junk folder if you don\'t see it in your inbox within 2 minutes.');
      setShowSignupModal(false);
      setSignupData({ firstName: '', lastName: '', email: '', phone: '', country: 'US' });
      
    } catch (error) {
      alert('Signup failed: ' + error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-purple-800 rounded-lg p-6 max-w-md w-full mx-4 max-h-96 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Create Account</h3>
          <button onClick={() => setShowSignupModal(false)}>
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">First Name</label>
              <input
                type="text"
                value={signupData.firstName}
                onChange={(e) => setSignupData({...signupData, firstName: e.target.value})}
                className="w-full bg-purple-700 text-white p-3 rounded border border-purple-600 focus:border-purple-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Last Name</label>
              <input
                type="text"
                value={signupData.lastName}
                onChange={(e) => setSignupData({...signupData, lastName: e.target.value})}
                className="w-full bg-purple-700 text-white p-3 rounded border border-purple-600 focus:border-purple-400 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={signupData.email}
              onChange={(e) => setSignupData({...signupData, email: e.target.value})}
              className="w-full bg-purple-700 text-white p-3 rounded border border-purple-600 focus:border-purple-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Phone</label>
            <input
              type="tel"
              value={signupData.phone}
              onChange={(e) => setSignupData({...signupData, phone: e.target.value})}
              className="w-full bg-purple-700 text-white p-3 rounded border border-purple-600 focus:border-purple-400 focus:outline-none"
              placeholder="+1234567890"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Country</label>
            <select
              value={signupData.country}
              onChange={(e) => setSignupData({...signupData, country: e.target.value})}
              className="w-full bg-purple-700 text-white p-3 rounded border border-purple-600 focus:border-purple-400 focus:outline-none"
            >
              {countries.map(country => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleSignup}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-colors"
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;