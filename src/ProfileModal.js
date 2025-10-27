import React from 'react';
import { X, User } from 'lucide-react';

const ProfileModal = ({ 
  showProfileModal, 
  setShowProfileModal, 
  profileData, 
  setProfileData,
  setShowAddBankModal,
  setShowAddCardModal
}) => {
  if (!showProfileModal) return null;

  const handleProfilePictureUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file (JPG, PNG)');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData(prev => ({...prev, profilePicture: e.target.result}));
        alert('Profile picture updated successfully!');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-purple-800 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-96 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Account Settings</h3>
          <button onClick={() => setShowProfileModal(false)}>
            <X size={24} />
          </button>
        </div>
        
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center overflow-hidden">
            {profileData.profilePicture ? (
              <img 
                src={profileData.profilePicture} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            ) : (
              <User size={32} />
            )}
          </div>
          <div>
            <input
              type="file"
              id="profilePictureInput"
              accept="image/*"
              onChange={handleProfilePictureUpload}
              className="hidden"
            />
            <label
              htmlFor="profilePictureInput"
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded cursor-pointer inline-block"
            >
              Upload Photo
            </label>
            <p className="text-sm text-purple-300 mt-1">JPG, PNG up to 5MB</p>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">First Name</label>
              <input
                type="text"
                value={profileData.firstName}
                onChange={(e) => setProfileData(prev => ({...prev, firstName: e.target.value}))}
                className="w-full bg-purple-700 text-white p-3 rounded border border-purple-600 focus:border-purple-400 focus:outline-none"
                placeholder="Enter first name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Last Name</label>
              <input
                type="text"
                value={profileData.lastName}
                onChange={(e) => setProfileData(prev => ({...prev, lastName: e.target.value}))}
                className="w-full bg-purple-700 text-white p-3 rounded border border-purple-600 focus:border-purple-400 focus:outline-none"
                placeholder="Enter last name"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={profileData.email}
              onChange={(e) => setProfileData(prev => ({...prev, email: e.target.value}))}
              className="w-full bg-purple-700 text-white p-3 rounded border border-purple-600 focus:border-purple-400 focus:outline-none"
              placeholder="Enter email address"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Phone</label>
            <input
              type="tel"
              value={profileData.phone}
              onChange={(e) => setProfileData(prev => ({...prev, phone: e.target.value}))}
              className="w-full bg-purple-700 text-white p-3 rounded border border-purple-600 focus:border-purple-400 focus:outline-none"
              placeholder="Enter phone number"
            />
          </div>
        </div>

        <div className="mb-6">
          <h4 className="font-medium mb-4">Notification Preferences</h4>
          <div className="space-y-3">
            {Object.entries(profileData.notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between p-3 bg-purple-700 rounded">
                <span className="capitalize">{key} Notifications</span>
                <button
                  onClick={() => setProfileData(prev => ({
                    ...prev,
                    notifications: { ...prev.notifications, [key]: !value }
                  }))}
                  className={`w-12 h-6 rounded-full ${value ? 'bg-blue-600' : 'bg-gray-600'} relative`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${value ? 'translate-x-6' : 'translate-x-0.5'}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => setShowAddBankModal(true)}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
          >
            Add Bank Account
          </button>
          <button
            onClick={() => setShowAddCardModal(true)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Add Credit/Debit Card
          </button>
        </div>

        <div className="flex space-x-3 mt-6">
          <button
            onClick={() => setShowProfileModal(false)}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              setShowProfileModal(false);
              alert('Profile updated successfully!');
            }}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;