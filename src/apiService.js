// apiService.js - Backend API integration with Supabase auth
import { supabase } from './supabaseClient';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://globalpay-backend-v2.onrender.com/api';

// Helper function to get Supabase auth token
const getAuthToken = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  return session?.access_token || null;
};

// Helper function to make API calls
const apiCall = async (endpoint, options = {}) => {
  const token = await getAuthToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || data.message || 'API request failed');
  }

  return data;
};

// Auth APIs
export const authAPI = {
  register: async (userData) => {
    return apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  login: async (credentials) => {
    return apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  logout: async () => {
    return apiCall('/auth/logout', {
      method: 'POST',
    });
  },

  getMe: async () => {
    return apiCall('/auth/me');
  },
};

// Wallet APIs
export const walletAPI = {
  getWallet: async () => {
    return apiCall('/wallet');
  },

  createWallet: async (walletData) => {
    return apiCall('/wallet', {
      method: 'POST',
      body: JSON.stringify(walletData),
    });
  },

  getBalance: async () => {
    return apiCall('/wallet/balance');
  },

  getTransactions: async (filters = {}) => {
    const params = new URLSearchParams(filters);
    return apiCall(`/wallet/transactions?${params}`);
  },

  topUpWithCard: async (cardData) => {
    return apiCall('/wallet/topup-card', {
      method: 'POST',
      body: JSON.stringify(cardData),
    });
  },

  deposit: async (amount) => {
    return apiCall('/wallet/deposit', {
      method: 'POST',
      body: JSON.stringify({ amount }),
    });
  },

  withdraw: async (withdrawData) => {
    return apiCall('/wallet/withdraw', {
      method: 'POST',
      body: JSON.stringify(withdrawData),
    });
  },
};

// Card APIs
export const cardAPI = {
  activateCard: async (cardData) => {
    return apiCall('/cards/activate', {
      method: 'POST',
      body: JSON.stringify(cardData),
    });
  },

  getCardDetails: async (cardId) => {
    return apiCall(`/cards/${cardId}`);
  },

  getStoreCards: async (storeId) => {
    return apiCall(`/cards/store/${storeId}`);
  },
};

export default {
  authAPI,
  walletAPI,
  cardAPI,
};