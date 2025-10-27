import React, { useState, useEffect } from 'react';
import { User, CreditCard, Bell, Phone, MapPin, Mail, Camera, Plus, Trash2, Edit3 } from 'lucide-react';

const UserProfile = ({ currentUser, apiBaseUrl, onClose }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: currentUser.email || '',
    phone: '',
    address: '',
    city: '',
   State:'',
   Zip: '',
    country: '',
    profilePicture: null
  });
  
  const [savedCards, setSavedCards] = useState([]);
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    transactionAlerts: true,
    marketingEmails: false
  });

  const [loading, setLoading] = useState(false);
  const [showAddCard, setShowAddCard] = useState(false);

  // Load user profile data
  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const userIdentifier = currentUser.walletAddress || currentUser.email || currentUser.id;
        const response = await fetch(`${apiBaseUrl}/api/users/${userIdentifier}/profile`);
        if (response.ok) {
          const data = await response.json();
          setProfile(prev => ({ ...prev, ...data.profile }));
          setSavedCards(data.savedCards || []);
          setNotifications(prev => ({ ...prev, ...data.notifications }));
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      }
    };

    loadUserProfile();
  }, [currentUser, apiBaseUrl]);

  const handleProfileUpdate = async () => {
    setLoading(true);
    try {
      const userIdentifier = currentUser.walletAddress || currentUser.email || currentUser.id;
      const response = await fetch(`${apiBaseUrl}/api/users/${userIdentifier}/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile, notifications })
      });

      if (response.ok) {
        alert('Profile updated successfully!');
      } else {
        alert('Failed to update profile');
      }
    } catch (error) {
      alert('Error updating profile');
    }
    setLoading(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfile(prev => ({ ...prev, profilePicture: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeCard = async (cardId) => {
    try {
      const userIdentifier = currentUser.walletAddress || currentUser.email || currentUser.id;
      const response = await fetch(`${apiBaseUrl}/api/users/${userIdentifier}/cards/${cardId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setSavedCards(prev => prev.filter(card => card.id !== cardId));
        alert('Card removed successfully');
      }
    } catch (error) {
      alert('Error removing card');
    }
  };

  const handleAddNewCard = () => {
    alert('To add a new card, make a payment using a new card and check "Save card for future use"');
    setShowAddCard(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white/10 backdrop-blur-lg rounded-xl max-w-5xl w-full mx-4 max-h-[85vh] overflow-hidden border border-white/20">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/20">
          <h2 className="text-2xl font-bold text-white">Account Settings</h2>
          <button onClick={onClose} className="text-white hover:text-red-400 text-2xl">×</button>
        </div>

        <div className="flex h-[calc(85vh-140px)]">
          {/* Sidebar */}
          <div className="w-64 bg-white/5 border-r border-white/20 p-4">
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === 'profile' ? 'bg-blue-600 text-white' : 'text-white/70 hover:bg-white/10'
                }`}
              >
                <User className="w-5 h-5" />
                <span>Profile</span>
              </button>
              
              <button
                onClick={() => setActiveTab('cards')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === 'cards' ? 'bg-blue-600 text-white' : 'text-white/70 hover:bg-white/10'
                }`}
              >
                <CreditCard className="w-5 h-5" />
                <span>Payment Methods</span>
              </button>
              
              <button
                onClick={() => setActiveTab('notifications')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === 'notifications' ? 'bg-blue-600 text-white' : 'text-white/70 hover:bg-white/10'
                }`}
              >
                <Bell className="w-5 h-5" />
                <span>Notifications</span>
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col">
            <div className="flex-1 p-6 overflow-y-auto">
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Profile Information</h3>
                  
                  {/* Profile Picture */}
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center overflow-hidden">
                        {profile.profilePicture ? (
                          <img src={profile.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                          <User className="w-10 h-10 text-white/60" />
                        )}
                      </div>
                      <label className="absolute bottom-0 right-0 bg-blue-600 p-1 rounded-full cursor-pointer hover:bg-blue-700">
                        <Camera className="w-4 h-4 text-white" />
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                      </label>
                    </div>
                    <div>
                      <p className="text-white font-medium">Profile Picture</p>
                      <p className="text-white/60 text-sm">Upload a photo to personalize your account</p>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">First Name</label>
                      <input
                        type="text"
                        value={profile.firstName}
                        onChange={(e) => setProfile(prev => ({ ...prev, firstName: e.target.value }))}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter first name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">Last Name</label>
                      <input
                        type="text"
                        value={profile.lastName}
                        onChange={(e) => setProfile(prev => ({ ...prev, lastName: e.target.value }))}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter last name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Email</label>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-5 h-5 text-white/60" />
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                        className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter email address"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Phone Number</label>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-5 h-5 text-white/60" />
                      <input
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                        className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter phone number"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Address</label>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-5 h-5 text-white/60" />
                      <input
                        type="text"
                        value={profile.address}
                        onChange={(e) => setProfile(prev => ({ ...prev, address: e.target.value }))}
                        className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter street address"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">City</label>
                      <input
                        type="text"
                        value={profile.city}
                        onChange={(e) => setProfile(prev => ({ ...prev, city: e.target.value }))}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter city"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">Country</label>
                      <input
                        type="text"
                        value={profile.country}
                        onChange={(e) => setProfile(prev => ({ ...prev, country: e.target.value }))}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter country"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'cards' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-white">Saved Payment Methods</h3>
                    <button 
                      onClick={handleAddNewCard}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Card</span>
                    </button>
                  </div>

                  {savedCards.length === 0 ? (
                    <div className="text-center py-12">
                      <CreditCard className="w-16 h-16 text-white/30 mx-auto mb-4" />
                      <h4 className="text-white font-medium mb-2">No saved payment methods</h4>
                      <p className="text-white/60 text-sm mb-4">Add a card to make payments faster</p>
                      <button 
                        onClick={handleAddNewCard}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                      >
                        Add Your First Card
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {savedCards.map((card, index) => (
                        <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded flex items-center justify-center">
                                <CreditCard className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <p className="text-white font-medium">**** **** **** {card.last4}</p>
                                <p className="text-white/60 text-sm">{card.brand.toUpperCase()} • Expires {card.expiry}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <button className="text-white/60 hover:text-white">
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => removeCard(card.id)}
                                className="text-red-400 hover:text-red-300"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Notification Preferences</h3>
                  
                  <div className="space-y-4">
                    {Object.entries(notifications).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                        <div>
                          <p className="text-white font-medium">
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </p>
                          <p className="text-white/60 text-sm">
                            {key === 'emailNotifications' && 'Receive important updates via email'}
                            {key === 'smsNotifications' && 'Get SMS alerts for urgent notifications'}
                            {key === 'pushNotifications' && 'Browser notifications for real-time updates'}
                            {key === 'transactionAlerts' && 'Instant alerts for all transactions'}
                            {key === 'marketingEmails' && 'Promotional offers and product updates'}
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={value}
                            onChange={(e) => setNotifications(prev => ({ ...prev, [key]: e.target.checked }))}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer - Fixed at bottom */}
            <div className="p-6 border-t border-white/20 bg-white/5 flex justify-end space-x-4">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleProfileUpdate}
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50 flex items-center space-x-2"
              >
                {loading && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>}
                <span>{loading ? 'Saving...' : 'Save Changes'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;