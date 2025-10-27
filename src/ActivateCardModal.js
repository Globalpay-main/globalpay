import React, { useState } from 'react';
import { X } from 'lucide-react';
import { cardAPI } from './apiService';

const ActivateCardModal = ({ 
  showActivateCardModal, 
  setShowActivateCardModal, 
  activateData, 
  setActivateData,
  onSuccess // NEW: callback when activation succeeds
}) => {
  const [loading, setLoading] = useState(false);

  if (!showActivateCardModal) return null;

  const handleCardActivation = async () => {
    if (!activateData.cardNumber || !activateData.pin) {
      alert('Please enter card number and PIN');
      return;
    }

    if (activateData.pin.length !== 4) {
      alert('PIN must be exactly 4 digits');
      return;
    }

    setLoading(true);
    
    try {
      // Call REAL backend API
      const response = await cardAPI.activateCard({
        cardNumber: activateData.cardNumber,
        pin: activateData.pin
      });

      if (response.success) {
        alert(`Card activated successfully!\nBalance added: $${response.data.valueUSD || response.data.value_usd || 50}`);
        setShowActivateCardModal(false);
        setActivateData({ cardNumber: '', pin: '', code: '', generatedCode: '' });
        
        // Trigger parent component to reload data
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (error) {
      console.error('Card activation error:', error);
      alert(`Card activation failed: ${error.message || 'Invalid card number or PIN'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-purple-800 rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Activate Your Card</h3>
          <button 
            onClick={() => setShowActivateCardModal(false)}
            disabled={loading}
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Card Number</label>
            <input
              type="text"
              value={activateData.cardNumber}
              onChange={(e) => setActivateData(prev => ({...prev, cardNumber: e.target.value}))}
              className="w-full bg-purple-700 text-white p-3 rounded border border-purple-600 focus:border-purple-400 focus:outline-none"
              placeholder="Enter your card number"
              maxLength={16}
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">PIN</label>
            <input
              type="password"
              value={activateData.pin}
              onChange={(e) => setActivateData(prev => ({...prev, pin: e.target.value}))}
              className="w-full bg-purple-700 text-white p-3 rounded border border-purple-600 focus:border-purple-400 focus:outline-none"
              placeholder="Enter 4-digit PIN"
              maxLength={4}
              disabled={loading}
            />
          </div>
          <p className="text-sm text-purple-300">
            Enter the card number and PIN from your crypto gift card.
          </p>
        </div>

        <div className="flex space-x-3 mt-6">
          <button
            onClick={() => setShowActivateCardModal(false)}
            disabled={loading}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleCardActivation}
            disabled={loading || !activateData.cardNumber || activateData.pin.length !== 4}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded disabled:opacity-50"
          >
            {loading ? 'Activating...' : 'Activate Card'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivateCardModal;