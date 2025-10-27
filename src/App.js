import React, { useState, useEffect, useCallback } from 'react';
import { authAPI, walletAPI, cardAPI } from './apiService';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SignupModal from './SignupModal';
import LoginModal from './LoginModal';
import ActivateCardModal from './ActivateCardModal';
import ProfileModal from './ProfileModal';
import { CreditCard, Wallet, Plus, Send, Eye, EyeOff, LogOut, User, RefreshCw, ArrowDown, ArrowUp, Clock, DollarSign, Camera, Upload, Settings, Bell, MapPin, Shield, Copy, Check, X, Lock, Zap, Globe, Star, Award, Smartphone, CreditCard as CardIcon, Building, Users, TrendingUp, CheckCircle, AlertTriangle, Layers, Database, FileText, PhoneCall, Mail, MapPin as Location, QrCode, Download, Menu, ChevronDown, ArrowLeftRight, History, Repeat } from 'lucide-react';
import { supabase } from './supabaseClient';
// Import all page components
import ServicesPage from './pages/Services';
import CompanyPage from './pages/Company';
import SupportPage from './pages/Support';
import LegalPage from './pages/Legal';
import SendMoneyPage from './pages/SendMoney';
import CryptoCardsPage from './pages/CryptoCards';
import DigitalWalletsPage from './pages/DigitalWallet';
import BusinessSolutionsPage from './pages/BusinessSolution';
import AboutUsPage from './pages/AboutUs';
import CareersPage from './pages/Careers';
import PressPage from './pages/Press';
import SecurityPage from './pages/Security';
import TermsOfServicePage from './pages/Terms-Service';
import PrivacyPolicyPage from './pages/PrivacyPolicy';
import APIDocumentationPage from './pages/APIDocumentation';
import InvestorsPage from './pages/Investor';
import LicensePage from './pages/License';
import HelpCenterPage from './pages/HelpCenter';
import CompliancePage from './pages/Compliance';
import ContactUsPage from './pages/Contact';

const GlobalPayApp = () => {
  const [user, setUser] = useState(null);
  const [cryptoCards, setCryptoCards] = useState([]);
  const [wallets, setWallets] = useState([]);
  const [balances, setBalances] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [showBalances, setShowBalances] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [showKYCModal, setShowKYCModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showAddBankModal, setShowAddBankModal] = useState(false);
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [showLandingPage, setShowLandingPage] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showActivateCardModal, setShowActivateCardModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [showQRCode, setShowQRCode] = useState(false);
  const [loginStep, setLoginStep] = useState('email');
  const [signupStep, setSignupStep] = useState('details');
  const [selectedCrypto, setSelectedCrypto] = useState('BTC');
  const [showSendCryptoModal, setShowSendCryptoModal] = useState(false);
  const [showReceiveCryptoModal, setShowReceiveCryptoModal] = useState(false);
  const [showConvertCryptoModal, setShowConvertCryptoModal] = useState(false);
  const [showCryptoToCashModal, setShowCryptoToCashModal] = useState(false);
  const [showCreateWalletModal, setShowCreateWalletModal] = useState(false);
  const [showTopUpCardModal, setShowTopUpCardModal] = useState(false);
  const [showCardHistoryModal, setShowCardHistoryModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [transactionFilter, setTransactionFilter] = useState('all');
  const [loginData, setLoginData] = useState({
    email: '',
    phone: '',
    loginMethod: 'email',
    code: '',
    generatedCode: ''
  });
  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: 'US',
    code: '',
    generatedCode: ''
  });
  const [activateData, setActivateData] = useState({
    cardNumber: '',
    pin: '',
    code: '',
    generatedCode: ''
  });
  const [exchangeRates, setExchangeRates] = useState({});
  const [cryptoPrices, setCryptoPrices] = useState({});
  const [paymentInterface, setPaymentInterface] = useState(null);
  const [pin, setPin] = useState('');
  const [pendingAction, setPendingAction] = useState(null);
  const [copied, setCopied] = useState('');
  const [spendingLimit, setSpendingLimit] = useState({ daily: 900, monthly: 5000 });
  const [showKYCUpgrade, setShowKYCUpgrade] = useState(false);

  const countries = [
    { code: 'US', name: 'United States', flag: '🇺🇸', requiresSSN: true },
    { code: 'CA', name: 'Canada', flag: '🇨🇦', requiresSSN: false },
    { code: 'UK', name: 'United Kingdom', flag: '🇬🇧', requiresSSN: false },
    { code: 'DE', name: 'Germany', flag: '🇩🇪', requiresSSN: false },
    { code: 'FR', name: 'France', flag: '🇫🇷', requiresSSN: false },
    { code: 'NG', name: 'Nigeria', flag: '🇳🇬', requiresSSN: false },
    { code: 'GH', name: 'Ghana', flag: '🇬🇭', requiresSSN: false },
    { code: 'KE', name: 'Kenya', flag: '🇰🇪', requiresSSN: false },
    { code: 'ZA', name: 'South Africa', flag: '🇿🇦', requiresSSN: false },
    { code: 'BR', name: 'Brazil', flag: '🇧🇷', requiresSSN: false },
    { code: 'IN', name: 'India', flag: '🇮🇳', requiresSSN: false }
  ];

  const currencies = [
    { code: 'USD', symbol: '$', flag: '🇺🇸', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', flag: '🇪🇺', name: 'Euro' },
    { code: 'GBP', symbol: '£', flag: '🇬🇧', name: 'British Pound' },
    { code: 'NGN', symbol: '₦', flag: '🇳🇬', name: 'Nigerian Naira' },
    { code: 'GHS', symbol: '₵', flag: '🇬🇭', name: 'Ghanaian Cedi' },
    { code: 'XAF', symbol: 'FCFA', flag: '🇨🇲', name: 'Central African CFA Franc' },
    { code: 'KES', symbol: 'KSh', flag: '🇰🇪', name: 'Kenyan Shilling' },
    { code: 'BRL', symbol: 'R$', flag: '🇧🇷', name: 'Brazilian Real' },
    { code: 'ZAR', symbol: 'R', flag: '🇿🇦', name: 'South African Rand' },
    { code: 'INR', symbol: '₹', flag: '🇮🇳', name: 'Indian Rupee' },
    { code: 'UGX', symbol: 'USh', flag: '🇺🇬', name: 'Ugandan Shilling' },
    { code: 'CDF', symbol: 'FC', flag: '🇨🇩', name: 'Congolese Franc' },
    { code: 'XOF', symbol: 'CFA', flag: '🇧🇯', name: 'West African CFA Franc' },
    { code: 'PKR', symbol: '₨', flag: '🇵🇰', name: 'Pakistani Rupee' },
    { code: 'MAD', symbol: 'DH', flag: '🇲🇦', name: 'Moroccan Dirham' },
    { code: 'TND', symbol: 'DT', flag: '🇹🇳', name: 'Tunisian Dinar' },
    { code: 'ZMW', symbol: 'ZK', flag: '🇿🇲', name: 'Zambian Kwacha' },
    { code: 'RWF', symbol: 'RF', flag: '🇷🇼', name: 'Rwandan Franc' },
    { code: 'GMD', symbol: 'D', flag: '🇬🇲', name: 'Gambian Dalasi' },
    { code: 'MWK', symbol: 'MK', flag: '🇲🇼', name: 'Malawian Kwacha' }
  ];

  const cryptoOptions = [
    { code: 'BTC', name: 'Bitcoin', symbol: '₿', color: 'orange' },
    { code: 'ETH', name: 'Ethereum', symbol: 'Ξ', color: 'blue' },
    { code: 'USDC', name: 'USD Coin', symbol: '$', color: 'green' },
    { code: 'USDT', name: 'Tether', symbol: '₮', color: 'teal' },
    { code: 'BNB', name: 'Binance Coin', symbol: 'BNB', color: 'yellow' },
    { code: 'XRP', name: 'Ripple', symbol: 'XRP', color: 'gray' }
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

  const [transferData, setTransferData] = useState({
    recipientEmail: '',
    fromCurrency: 'USD',
    toCurrency: 'NGN',
    amount: '',
    message: '',
    paymentMethod: 'crypto',
    selectedCrypto: 'BTC',
    transferType: 'international',
    bankAccount: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    zipCode: ''
  });

  const [sendCryptoData, setSendCryptoData] = useState({
    crypto: 'BTC',
    recipientAddress: '',
    amount: '',
    note: ''
  });

  const [convertCryptoData, setConvertCryptoData] = useState({
    fromCrypto: 'BTC',
    toCrypto: 'ETH',
    amount: ''
  });

  const [cryptoToCashData, setCryptoToCashData] = useState({
    crypto: 'BTC',
    amount: '',
    currency: 'USD',
    withdrawMethod: 'bank'
  });

  const [cardData, setCardData] = useState({
    cardNumber: '',
    pin: ''
  });

  const [withdrawData, setWithdrawData] = useState({
    amount: '',
    method: 'bank',
    currency: 'USD'
  });

  const [topupData, setTopupData] = useState({
    amount: '',
    method: 'external',
    crypto: 'BTC',
    buyMethod: 'bank',
    cardAmount: '',
    paymentMethod: 'card'
  });

  const [profileData, setProfileData] = useState({
    firstName: 'Test',
    lastName: 'Phone',
    email: 'testphone@example.com',
    phone: '+1234567890',
    profilePicture: null,
    notifications: {
      email: true,
      sms: false,
      push: true,
      transactions: true
    }
  });

  const [kycData, setKycData] = useState({
    country: 'US',
    dateOfBirth: '',
    governmentId: null,
    selfieWithId: null,
    faceCapture: null
  });

  const [newBankData, setNewBankData] = useState({
    bankName: '',
    accountNumber: '',
    routingNumber: '',
    accountType: 'checking'
  });

  const [newWalletData, setNewWalletData] = useState({
    walletName: '',
    walletType: 'standard'
  });

  const handleSignupDataChange = useCallback((field, value) => {
    setSignupData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleLoginDataChange = useCallback((field, value) => {
    setLoginData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleActivateDataChange = useCallback((field, value) => {
    setActivateData(prev => ({ ...prev, [field]: value }));
  }, []);

  const [bankAccounts, setBankAccounts] = useState([
    { id: '1', bankName: 'Chase Bank', accountNumber: '****1234', type: 'checking' },
    { id: '2', bankName: 'Bank of America', accountNumber: '****5678', type: 'savings' }
  ]);
  
  const [creditCards, setCreditCards] = useState([]);
  const fetchExchangeRates = async () => {
    try {
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      const data = await response.json();
      setExchangeRates(data.rates);
    } catch (error) {
      console.error('Failed to fetch exchange rates:', error);
      setExchangeRates({
        USD: 1.0, EUR: 0.85, GBP: 0.73, CNY: 7.25, JPY: 110.0, CAD: 1.25, AUD: 1.35, CHF: 0.92,
        INR: 74.5, KRW: 1180.0, BRL: 5.2, MXN: 20.1, SGD: 1.35, ZAR: 14.8, SEK: 8.7, NOK: 8.9,
        DKK: 6.3, PLN: 3.9, CZK: 21.5, HUF: 295.0, NGN: 411.0, GHS: 6.1, XAF: 554.0, KES: 108.0,
        UGX: 3720.0, CDF: 2000.0, XOF: 554.0, PKR: 278.0, MAD: 10.1, TND: 3.1, ZMW: 18.5,
        RWF: 1030.0, GMD: 59.0, MWK: 820.0
      });
    }
  };

  const fetchCryptoPrices = async () => {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,usd-coin,tether,binancecoin,ripple&vs_currencies=usd');
      const data = await response.json();
      setCryptoPrices({
        BTC: data.bitcoin?.usd || 45000,
        ETH: data.ethereum?.usd || 3000,
        USDC: data['usd-coin']?.usd || 1,
        USDT: data.tether?.usd || 1,
        BNB: data.binancecoin?.usd || 300,
        XRP: data.ripple?.usd || 0.50
      });
    } catch (error) {
      console.error('Failed to fetch crypto prices:', error);
      setCryptoPrices({
        BTC: 45000,
        ETH: 3000,
        USDC: 1,
        USDT: 1,
        BNB: 300,
        XRP: 0.50
      });
    }
  };

 useEffect(() => {
    // Check for active session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        loadUserFromSupabase(session.user.id);
        setShowLandingPage(false);
      }
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        loadUserFromSupabase(session.user.id);
        setShowLandingPage(false);
      } else {
        setShowLandingPage(true);
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadUserFromSupabase = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;

    setUser({
      id: data.id,
      firstName: data.first_name,
      lastName: data.last_name,
      email: data.email,
      phone: data.phone,
      kycLevel: data.kyc_level,
      remainingLimit: data.remaining_limit,
      totalTransactionAmount: data.total_transaction_amount,
      profilePicture: data.profile_picture
    });

    setProfileData({
      firstName: data.first_name,
      lastName: data.last_name,
      email: data.email,
      phone: data.phone,
      profilePicture: data.profile_picture,
      notifications: {
        email: true,
        sms: false,
        push: true,
        transactions: true
      }
    });

    // Load REAL data from backend
    await loadRealDataFromBackend();
  } catch (error) {
    console.error('Error loading user:', error);
  }
};

const loadRealDataFromBackend = async () => {
  try {
    // Get real wallet data from backend
    const walletResponse = await walletAPI.getWallet();
    
    if (walletResponse.success && walletResponse.data) {
      const wallet = walletResponse.data;
      
      // Set REAL balances (should be $0 for new users)
      setBalances({
        BTC: wallet.btc_balance || 0,
        USD: wallet.usd_balance || 0,
        USDC: 0,
        ETH: 0,
        USDT: 0,
        BNB: 0,
        XRP: 0,
        totalUSD: wallet.usd_balance || 0
      });
    }

    // Load ALL wallets from Supabase
    await loadWallets();  // ⬅️ ADD THIS LINE!

    // Get real transactions from backend
    const txResponse = await walletAPI.getTransactions();
    if (txResponse.success) {
      setTransactions(txResponse.data.transactions || []);
    }

  } catch (error) {
    console.error('Error loading backend data:', error);
    // Set everything to ZERO for new accounts
    setBalances({
      BTC: 0,
      USD: 0,
      USDC: 0,
      ETH: 0,
      USDT: 0,
      BNB: 0,
      XRP: 0,
      totalUSD: 0
    });
    setWallets([]);
    setCryptoCards([]);
    setTransactions([]);
  }
};
const loadCryptoCards = async () => {
  // Cards will be loaded after user activates them via backend
  setCryptoCards([]);
};

  const loadWallets = async () => {
  try {
    // Get user's session
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    // Load wallets directly from Supabase
    const { data: walletsData, error } = await supabase
      .from('wallets')
      .select('*')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: true });

    if (error) throw error;

    console.log('✅ Loaded wallets from Supabase:', walletsData);
    console.log('📍 First wallet addresses:', walletsData[0]?.wallet_addresses);

// Transform wallets for display
    const transformedWallets = walletsData.map(wallet => ({
      id: wallet.id,
      name: wallet.name || 'Unnamed Wallet',
      wallet_addresses: wallet.wallet_addresses || {},
      shortAddress: wallet.wallet_addresses?.BTC 
        ? `...${wallet.wallet_addresses.BTC.slice(-8)}` 
        : `...${wallet.id.slice(-4)}`,
      balances: {
        BTC: (wallet.btc_balance || 0).toFixed(8),
        USD: (wallet.usd_balance || 0).toFixed(2),
        USDC: '0.00',
        ETH: '0.00',
        USDT: '0.00',
        BNB: '0.00',
        XRP: '0'
      }
    }));

        setWallets(transformedWallets);

    // Also update main balance from first wallet
    if (transformedWallets.length > 0) {
      const mainWallet = transformedWallets[0];
      setBalances({
        BTC: parseFloat(mainWallet.balances.BTC) || 0,
        USD: parseFloat(mainWallet.balances.USD) || 0,
        USDC: 0,
        ETH: 0,
        USDT: 0,
        BNB: 0,
        XRP: 0,
        totalUSD: parseFloat(mainWallet.balances.USD) || 0
      });
    }
  } catch (error) {
    console.error('Error loading wallets:', error);
    setWallets([]);
  }
};

  const loadTransactions = async () => {
  try {
    const response = await walletAPI.getTransactions();
    if (response.success) {
      setTransactions(response.data.transactions || []);
    }
  } catch (error) {
    console.error('Error loading transactions:', error);
    setTransactions([]);
  }
};
  const calculateExchangeAmount = (amount, fromCurrency, toCurrency) => {
    if (!amount || !fromCurrency || !toCurrency || !exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) return 0;
    const fromRate = exchangeRates[fromCurrency] || 1;
    const toRate = exchangeRates[toCurrency] || 1;
    return ((parseFloat(amount) / fromRate) * toRate).toFixed(2);
  };

  const calculateCryptoConversion = (amount, fromCrypto, toCrypto) => {
    if (!amount || !fromCrypto || !toCrypto || !cryptoPrices[fromCrypto] || !cryptoPrices[toCrypto]) return 0;
    const fromPrice = cryptoPrices[fromCrypto];
    const toPrice = cryptoPrices[toCrypto];
    return ((parseFloat(amount) * fromPrice) / toPrice).toFixed(8);
  };

  const calculateCryptoToCash = (amount, crypto, currency) => {
    if (!amount || !crypto || !currency || !cryptoPrices[crypto] || !exchangeRates[currency]) return 0;
    const cryptoPrice = cryptoPrices[crypto];
    const usdAmount = parseFloat(amount) * cryptoPrice;
    const rate = exchangeRates[currency] || 1;
    return (usdAmount * rate).toFixed(2);
  };

  const formatCurrency = (amount, currencyCode) => {
    const currency = currencies.find(c => c.code === currencyCode);
    return `${currency?.symbol || ''}${amount}`;
  };

  const checkKYCRequired = (amount) => {
    const currentTotal = user?.totalTransactionAmount || 0;
    return (currentTotal + parseFloat(amount)) > 900;
  };

  const checkSpendingLimit = (amount) => {
    const currentTotal = user?.totalTransactionAmount || 0;
    const newTotal = currentTotal + parseFloat(amount);
    
    if (user?.kycLevel === 'minimal' && newTotal > spendingLimit.daily) {
      return { exceeded: true, type: 'daily', limit: spendingLimit.daily };
    }
    if (user?.kycLevel === 'full' && newTotal > spendingLimit.monthly) {
      return { exceeded: true, type: 'monthly', limit: spendingLimit.monthly };
    }
    return { exceeded: false };
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(''), 2000);
  };

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
        setProfileData({...profileData, profilePicture: e.target.result});
        setUser({...user, profilePicture: e.target.result});
        alert('Profile picture updated successfully!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleKYCFileUpload = (event, fileType) => {
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
        setKycData({...kycData, [fileType]: e.target.result});
        alert(`${fileType.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} uploaded successfully!`);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateAuthCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const getFilteredTransactions = () => {
    if (transactionFilter === 'all') return transactions;
    return transactions.filter(tx => tx.type === transactionFilter);
  };
 const handleCardActivation = async () => {
  if (!activateData.cardNumber || !activateData.pin) {
    alert('Please enter card number and PIN');
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
      alert('Card activated successfully! Your wallet has been topped up.');
      setShowActivateCardModal(false);
      setActivateData({ cardNumber: '', pin: '', code: '', generatedCode: '' });
      
      // Reload REAL data from backend
      await loadRealDataFromBackend();
      await loadWallets();
      await loadTransactions();
      
      if (!user) {
        setShowLandingPage(false);
      }
    }
  } catch (error) {
    console.error('Card activation error:', error);
    alert(`Card activation failed: ${error.message}`);
  } finally {
    setLoading(false);
  }
};
const handleLogout = async () => {
  await supabase.auth.signOut();
  setShowLandingPage(true);
  setUser(null);
  setCryptoCards([]);
  setWallets([]);
  setBalances({});
  setTransactions([]);
  setActiveTab('dashboard');
  alert('You have been logged out successfully');
};

  const showPinVerification = (action) => {
    setPendingAction(action);
    setShowPinModal(true);
  };

  const handlePinVerification = () => {
    if (pin === '1234') {
      setShowPinModal(false);
      setPin('');
      if (pendingAction) {
        pendingAction();
        setPendingAction(null);
      }
    } else {
      alert('Invalid PIN. Demo PIN is 1234');
    }
  };
  const handleTransfer = async () => {
    const limitCheck = checkSpendingLimit(transferData.amount);
    if (limitCheck.exceeded) {
      setShowKYCUpgrade(true);
      return;
    }

    if (checkKYCRequired(transferData.amount) && user?.kycLevel === 'minimal') {
      setShowKYCModal(true);
      return;
    }
    
    showPinVerification(() => {
      setLoading(true);
      setTimeout(() => {
        const convertedAmount = calculateExchangeAmount(transferData.amount, transferData.fromCurrency, transferData.toCurrency);
        alert(`Transfer of ${formatCurrency(transferData.amount, transferData.fromCurrency)} (${formatCurrency(convertedAmount, transferData.toCurrency)}) initiated successfully!`);
        setTransferData({
          recipientEmail: '',
          fromCurrency: 'USD',
          toCurrency: 'NGN',
          amount: '',
          message: '',
          paymentMethod: 'crypto',
          selectedCrypto: 'BTC',
          transferType: 'international',
          bankAccount: '',
          cardNumber: '',
          cardName: '',
          expiryDate: '',
          cvv: '',
          zipCode: ''
        });
        setPaymentInterface(null);
        loadTransactions();
        setLoading(false);
      }, 2000);
    });
  };

  const handleSendCrypto = () => {
    showPinVerification(() => {
      setLoading(true);
      setTimeout(() => {
        alert(`Sent ${sendCryptoData.amount} ${sendCryptoData.crypto} to ${sendCryptoData.recipientAddress}`);
        setSendCryptoData({ crypto: 'BTC', recipientAddress: '', amount: '', note: '' });
        setShowSendCryptoModal(false);
        loadTransactions();
        loadWallets();
        setLoading(false);
      }, 2000);
    });
  };

  const handleConvertCrypto = () => {
    showPinVerification(() => {
      setLoading(true);
      setTimeout(() => {
        const convertedAmount = calculateCryptoConversion(convertCryptoData.amount, convertCryptoData.fromCrypto, convertCryptoData.toCrypto);
        alert(`Converted ${convertCryptoData.amount} ${convertCryptoData.fromCrypto} to ${convertedAmount} ${convertCryptoData.toCrypto}`);
        setConvertCryptoData({ fromCrypto: 'BTC', toCrypto: 'ETH', amount: '' });
        setShowConvertCryptoModal(false);
        loadTransactions();
        loadWallets();
        setLoading(false);
      }, 2000);
    });
  };

  const handleCryptoToCash = () => {
    showPinVerification(() => {
      setLoading(true);
      setTimeout(() => {
        const cashAmount = calculateCryptoToCash(cryptoToCashData.amount, cryptoToCashData.crypto, cryptoToCashData.currency);
        alert(`Converting ${cryptoToCashData.amount} ${cryptoToCashData.crypto} to ${formatCurrency(cashAmount, cryptoToCashData.currency)}`);
        setCryptoToCashData({ crypto: 'BTC', amount: '', currency: 'USD', withdrawMethod: 'bank' });
        setShowCryptoToCashModal(false);
        loadTransactions();
        setLoading(false);
      }, 2000);
    });
  };

  const handleWithdraw = async () => {
    showPinVerification(() => {
      setLoading(true);
      setTimeout(() => {
        alert(`Withdrawal of ${withdrawData.amount} ${withdrawData.currency} initiated!`);
        setWithdrawData({ amount: '', method: 'bank', currency: 'USD' });
        loadTransactions();
        setLoading(false);
      }, 2000);
    });
  };

  const handleTopup = async () => {
    const limitCheck = checkSpendingLimit(topupData.amount);
    if (limitCheck.exceeded) {
      setShowKYCUpgrade(true);
      return;
    }

    if (checkKYCRequired(topupData.amount) && user?.kycLevel === 'minimal') {
      setShowKYCModal(true);
      return;
    }
    
    showPinVerification(() => {
      setLoading(true);
      setTimeout(() => {
        alert(`Top-up of ${topupData.amount} ${topupData.crypto} initiated!`);
        setTopupData({ amount: '', method: 'external', crypto: 'BTC', buyMethod: 'bank', cardAmount: '', paymentMethod: 'card' });
        loadWallets();
        setLoading(false);
      }, 2000);
    });
  };

  const handleCardActivationInApp = async () => {
    showPinVerification(() => {
      setLoading(true);
      setTimeout(() => {
        alert('Card activation successful!');
        setCardData({ cardNumber: '', pin: '' });
        loadCryptoCards();
        loadWallets();
        setLoading(false);
      }, 2000);
    });
  };

  const handleAddBankAccount = () => {
    if (!newBankData.bankName || !newBankData.accountNumber || !newBankData.routingNumber) {
      alert('Please fill in all bank account details');
      return;
    }
    
    const newAccount = {
      id: Date.now().toString(),
      bankName: newBankData.bankName,
      accountNumber: `****${newBankData.accountNumber.slice(-4)}`,
      type: newBankData.accountType
    };
    
    setBankAccounts([...bankAccounts, newAccount]);
    setNewBankData({ bankName: '', accountNumber: '', routingNumber: '', accountType: 'checking' });
    setShowAddBankModal(false);
    alert('Bank account added successfully!');
  };

const handleCreateWallet = async () => {
  if (!newWalletData.walletName) {
    alert('Please enter a wallet name');
    return;
  }
  
  setLoading(true);
  try {
    // Call REAL backend API
    const response = await walletAPI.createWallet({
      name: newWalletData.walletName,
      wallet_type: newWalletData.walletType || 'primary'
    });

    if (response.success) {
      alert('Wallet created successfully!');
      setNewWalletData({ walletName: '', walletType: 'standard' });
      setShowCreateWalletModal(false);
      
      // Reload real data from backend
      await loadWallets();
    } else {
      alert(`Failed to create wallet: ${response.error || 'Unknown error'}`);
    }
  } catch (error) {
    console.error('Create wallet error:', error);
    alert(`Failed to create wallet: ${error.message}`);
  } finally {
    setLoading(false);
  }
};
  const handleCardTopUp = () => {
    if (!topupData.cardAmount) {
      alert('Please select or enter an amount');
      return;
    }

    const limitCheck = checkSpendingLimit(topupData.cardAmount);
    if (limitCheck.exceeded) {
      setShowKYCUpgrade(true);
      return;
    }

    if (checkKYCRequired(topupData.cardAmount) && user?.kycLevel === 'minimal') {
      setShowKYCModal(true);
      return;
    }

    showPinVerification(() => {
      setLoading(true);
      setTimeout(() => {
        alert(`Card topped up with $${topupData.cardAmount} successfully!`);
        setTopupData({ ...topupData, cardAmount: '' });
        setShowTopUpCardModal(false);
        loadCryptoCards();
        setLoading(false);
      }, 2000);
    });
  };

  const handleCardSelection = (card) => {
    setSelectedCard(card);
  };

  const handleViewCardHistory = () => {
    if (!selectedCard) {
      alert('Please select a card first by clicking on it');
      return;
    }
    setShowCardHistoryModal(true);
  };
  const KYCUpgradeModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-purple-800 rounded-lg p-6 max-w-lg w-full mx-4 max-h-96 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Complete KYC Verification</h3>
          <button onClick={() => setShowKYCUpgrade(false)} className="text-purple-300 hover:text-white">
            <X size={24} />
          </button>
        </div>
        <p className="text-purple-300 mb-4">
          Please complete your KYC verification to increase your spending limits and unlock all features.
        </p>
        
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">Country</label>
            <select
              value={kycData.country}
              onChange={(e) => setKycData(prev => ({...prev, country: e.target.value}))}
              className="w-full bg-purple-700 text-white p-3 rounded border border-purple-600 focus:border-purple-400 focus:outline-none"
            >
              {countries.map(country => (
                <option key={country.code} value={country.code}>
                  {country.flag} {country.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Date of Birth</label>
            <input
              type="date"
              value={kycData.dateOfBirth}
              onChange={(e) => setKycData(prev => ({...prev, dateOfBirth: e.target.value}))}
              className="w-full bg-purple-700 text-white p-3 rounded border border-purple-600 focus:border-purple-400 focus:outline-none"
            />
          </div>

          <div className="space-y-3">
            <h4 className="font-medium">Required Documents</h4>
            
            <div className="bg-purple-700 rounded p-3">
              <div className="flex items-center justify-between mb-2">
                <span>Government ID</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleKYCFileUpload(e, 'governmentId')}
                  className="hidden"
                  id="governmentId"
                />
                <label
                  htmlFor="governmentId"
                  className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm cursor-pointer"
                >
                  {kycData.governmentId ? 'Uploaded' : 'Upload'}
                </label>
              </div>
              <p className="text-xs text-purple-300">
                {countries.find(c => c.code === kycData.country)?.requiresSSN 
                  ? 'Driver\'s License, Passport, or State ID'
                  : 'National ID, Passport, or Driver\'s License'
                }
              </p>
            </div>

            <div className="bg-purple-700 rounded p-3">
              <div className="flex items-center justify-between mb-2">
                <span>3D Face Capture</span>
                <button
                  onClick={() => alert('3D Face capture would open camera interface')}
                  className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm"
                >
                  Capture
                </button>
              </div>
              <p className="text-xs text-purple-300">Live face verification</p>
            </div>

            <div className="bg-purple-700 rounded p-3">
              <div className="flex items-center justify-between mb-2">
                <span>Selfie with ID</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleKYCFileUpload(e, 'selfieWithId')}
                  className="hidden"
                  id="selfieWithId"
                />
                <label
                  htmlFor="selfieWithId"
                  className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm cursor-pointer"
                >
                  {kycData.selfieWithId ? 'Uploaded' : 'Upload'}
                </label>
              </div>
              <p className="text-xs text-purple-300">Photo of you holding your ID</p>
            </div>
          </div>

          <div className="bg-blue-900 bg-opacity-50 rounded p-3">
            <h4 className="font-medium mb-2 text-blue-300">After Verification:</h4>
            <ul className="text-sm space-y-1">
              <li>• Daily limit: $5,000</li>
              <li>• Monthly limit: $50,000</li>
              <li>• Priority support</li>
              <li>• All features unlocked</li>
            </ul>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <button
            onClick={() => setShowKYCUpgrade(false)}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded"
          >
            Maybe Later
          </button>
          <button
            onClick={() => {
              setShowKYCUpgrade(false);
              alert('KYC verification submitted for review!');
            }}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Submit Verification
          </button>
        </div>
      </div>
    </div>
  );
  const AddBankAccountModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-purple-800 rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Add Bank Account</h3>
          <button onClick={() => setShowAddBankModal(false)} className="text-purple-300 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Bank Name</label>
            <input
              type="text"
              value={newBankData.bankName}
              onChange={(e) => setNewBankData({...newBankData, bankName: e.target.value})}
              className="w-full bg-purple-700 text-white p-3 rounded border border-purple-600 focus:border-purple-400 focus:outline-none"
              placeholder="Chase Bank"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Account Number</label>
            <input
              type="text"
              value={newBankData.accountNumber}
              onChange={(e) => setNewBankData({...newBankData, accountNumber: e.target.value})}
              className="w-full bg-purple-700 text-white p-3 rounded border border-purple-600 focus:border-purple-400 focus:outline-none"
              placeholder="1234567890"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Routing Number</label>
            <input
              type="text"
              value={newBankData.routingNumber}
              onChange={(e) => setNewBankData({...newBankData, routingNumber: e.target.value})}
              className="w-full bg-purple-700 text-white p-3 rounded border border-purple-600 focus:border-purple-400 focus:outline-none"
              placeholder="021000021"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Account Type</label>
            <select
              value={newBankData.accountType}
              onChange={(e) => setNewBankData({...newBankData, accountType: e.target.value})}
              className="w-full bg-purple-700 text-white p-3 rounded border border-purple-600 focus:border-purple-400 focus:outline-none"
            >
              <option value="checking">Checking</option>
              <option value="savings">Savings</option>
            </select>
          </div>

          <button
            onClick={handleAddBankAccount}
            className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-medium transition-colors"
          >
            Add Bank Account
          </button>
        </div>
      </div>
    </div>
  );
  const CreateWalletModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-purple-800 rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Create New Wallet</h3>
          <button onClick={() => setShowCreateWalletModal(false)} className="text-purple-300 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Wallet Name</label>
            <input
  key="wallet-name-input"  // Add this line
  type="text"
  value={newWalletData.walletName}
  onChange={(e) => setNewWalletData({...newWalletData, walletName: e.target.value})}
  className="w-full bg-purple-700 text-white p-3 rounded border border-purple-600 focus:border-purple-400 focus:outline-none"
  placeholder="My Trading Wallet"
  autoFocus
/>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Wallet Type</label>
            <select
              value={newWalletData.walletType}
              onChange={(e) => setNewWalletData({...newWalletData, walletType: e.target.value})}
              className="w-full bg-purple-700 text-white p-3 rounded border border-purple-600 focus:border-purple-400 focus:outline-none"
            >
              <option value="standard">Standard Wallet</option>
              <option value="savings">Savings Wallet</option>
              <option value="trading">Trading Wallet</option>
            </select>
          </div>

          <div className="bg-blue-900 bg-opacity-40 rounded-lg p-3 border border-blue-600">
            <p className="text-sm">
              <strong>Note:</strong> Your wallet will support all available cryptocurrencies (BTC, ETH, USDC, USDT, BNB, XRP).
            </p>
          </div>

          <button
            onClick={handleCreateWallet}
            className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-lg font-medium transition-colors"
          >
            Create Wallet
          </button>
        </div>
      </div>
    </div>
  );
  const TopUpCardModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-purple-800 rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Top Up Card</h3>
          <button onClick={() => setShowTopUpCardModal(false)} className="text-purple-300 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Select Amount</label>
            <div className="grid grid-cols-2 gap-3 mb-3">
              {['50', '100', '200', '500'].map((amount) => (
                <button
                  key={amount}
                  onClick={() => setTopupData({...topupData, cardAmount: amount})}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    topupData.cardAmount === amount
                      ? 'border-green-500 bg-green-600 bg-opacity-20'
                      : 'border-purple-600 bg-purple-700 bg-opacity-30'
                  }`}
                >
                  <p className="text-2xl font-bold">${amount}</p>
                </button>
              ))}
            </div>
            <input
              type="number"
              value={topupData.cardAmount}
              onChange={(e) => setTopupData({...topupData, cardAmount: e.target.value})}
              className="w-full bg-purple-700 text-white p-3 rounded border border-purple-600 focus:border-purple-400 focus:outline-none"
              placeholder="Or enter custom amount"
            />
          </div>

        <div>
            <label className="block text-sm font-medium mb-2">Payment Method</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setTopupData({...topupData, paymentMethod: 'card'})}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  topupData.paymentMethod === 'card'
                    ? 'border-blue-500 bg-blue-600 bg-opacity-20'
                    : 'border-purple-600 bg-purple-700 bg-opacity-30'
                }`}
              >
                <CreditCard className="mx-auto mb-2" size={24} />
                <p className="font-bold text-sm">Debit/Credit</p>
              </button>
              <button
                onClick={() => setTopupData({...topupData, paymentMethod: 'bank'})}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  topupData.paymentMethod === 'bank'
                    ? 'border-green-500 bg-green-600 bg-opacity-20'
                    : 'border-purple-600 bg-purple-700 bg-opacity-30'
                }`}
              >
                <Building className="mx-auto mb-2" size={24} />
                <p className="font-bold text-sm">Bank Account</p>
              </button>
            </div>
          </div>

          <button
            onClick={handleCardTopUp}
            disabled={loading || !topupData.cardAmount}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed py-3 rounded-lg font-medium transition-colors"
          >
            {loading ? 'Processing...' : 'Top Up Card'}
          </button>
        </div>
      </div>
    </div>
  );
  const CardHistoryModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-purple-800 rounded-lg p-6 max-w-2xl w-full max-h-96 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Card Transaction History</h3>
          <button onClick={() => setShowCardHistoryModal(false)} className="text-purple-300 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {selectedCard ? (
          <>
            <div className="bg-purple-700 rounded-lg p-4 mb-4">
              <p className="text-sm text-purple-300">Card Number</p>
              <p className="text-xl font-bold font-mono">{selectedCard.maskedCardNumber}</p>
              <div className="flex justify-between mt-2">
                <div>
                  <p className="text-xs text-purple-300">Balance</p>
                  <p className="font-bold">${selectedCard.valueUSD}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-purple-300">Token ID</p>
                  <p className="font-bold">{selectedCard.tokenId}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {selectedCard.transactions && selectedCard.transactions.length > 0 ? (
                selectedCard.transactions.map((tx) => (
                  <div key={tx.id} className="bg-purple-700 bg-opacity-50 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold capitalize">{tx.type}</p>
                        {tx.merchant && <p className="text-sm text-purple-300">{tx.merchant}</p>}
                        <p className="text-xs text-purple-400">{new Date(tx.date).toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${tx.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {tx.amount > 0 ? '+' : ''}${Math.abs(tx.amount)}
                        </p>
                        <span className={`text-xs px-2 py-1 rounded ${
                          tx.status === 'confirmed' ? 'bg-green-600' : 'bg-yellow-600'
                        }`}>
                          {tx.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Clock className="text-purple-500 mx-auto mb-3" size={48} />
                  <p className="text-purple-300">No transactions yet</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <p className="text-purple-300 text-center py-8">No card selected</p>
        )}
      </div>
    </div>
  );
  const LandingPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white">
      <header className="bg-purple-900/50 backdrop-blur-sm border-b border-purple-700 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Globe className="w-8 h-8 text-green-400" />
              <span className="text-2xl font-bold">GlobalPay</span>
            </Link>

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
                          className="block p-3 hover:bg-purple-700 rounded-lg transition-colors text-gray-200 hover:text-white"
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

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-6">
            Send Money to<br />
            <span className="text-blue-400">180+ Countries</span>
            <br />
            <span className="text-green-400">Instantly & Securely</span>
          </h1>
          <p className="text-xl text-purple-200 mb-8 max-w-4xl mx-auto">
            Revolutionary blockchain-powered international payments with bank-grade security,
            end-to-end encryption, and smart contract automation. Bringing cryptocurrency 
            to the unbanked population globally with transparent pricing and instant settlement.
          </p>

          <div className="flex justify-center space-x-6 mb-8">
            <button 
              onClick={() => setShowSignupModal(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Get Started Free
            </button>
            
            <button 
              onClick={() => setShowLoginModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Login Now
            </button>
          </div>

          <button 
            onClick={() => setShowActivateCardModal(true)}
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105"
          >
            Have a Crypto Gift Card? Activate Here
          </button>
        </div>

        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-12">
            <Shield className="inline mr-3" size={40} />
            Bank-Grade Security & Full Compliance
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-purple-800 bg-opacity-60 rounded-lg p-6 backdrop-blur-sm border border-purple-600">
              <Lock className="text-green-400 mb-4" size={32} />
              <h3 className="text-lg font-bold mb-2">AES-256 Encryption</h3>
              <p className="text-purple-200 text-sm">
                Military-grade encryption protects all data and transactions
              </p>
            </div>

            <div className="bg-purple-800 bg-opacity-60 rounded-lg p-6 backdrop-blur-sm border border-purple-600">
              <Database className="text-blue-400 mb-4" size={32} />
              <h3 className="text-lg font-bold mb-2">Blockchain Security</h3>
              <p className="text-purple-200 text-sm">
                Immutable ledger technology ensures transaction integrity
              </p>
            </div>

            <div className="bg-purple-800 bg-opacity-60 rounded-lg p-6 backdrop-blur-sm border border-purple-600">
              <Layers className="text-yellow-400 mb-4" size={32} />
              <h3 className="text-lg font-bold mb-2">Smart Contracts</h3>
              <p className="text-purple-200 text-sm">
                Automated execution eliminates human error and fraud
              </p>
            </div>

            <div className="bg-purple-800 bg-opacity-60 rounded-lg p-6 backdrop-blur-sm border border-purple-600">
              <CheckCircle className="text-green-400 mb-4" size={32} />
              <h3 className="text-lg font-bold mb-2">Multi-Factor Auth</h3>
              <p className="text-purple-200 text-sm">
                Biometric verification and 2FA protect your account
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-lg p-8 border border-blue-500">
            <h3 className="text-2xl font-bold mb-6 text-center">
              <Award className="inline mr-2" size={28} />
              Fully Licensed & Regulated Financial Institution
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <Building className="text-blue-400 mx-auto mb-3" size={32} />
                <h4 className="font-bold mb-2">Money Transmission License</h4>
                <p className="text-sm text-blue-200">Licensed in all 50 US states and territories</p>
              </div>
              <div className="text-center">
                <FileText className="text-green-400 mx-auto mb-3" size={32} />
                <h4 className="font-bold mb-2">FinCEN Registration</h4>
                <p className="text-sm text-green-200">US Department of Treasury compliance</p>
              </div>
              <div className="text-center">
                <Globe className="text-purple-400 mx-auto mb-3" size={32} />
                <h4 className="font-bold mb-2">International Licenses</h4>
                <p className="text-sm text-purple-200">Central bank authorized in 45+ countries</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-purple-800 bg-opacity-50 rounded-lg p-8 backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
            <Zap className="text-yellow-400 text-5xl mb-4" />
            <h3 className="text-2xl font-bold mb-4">Lightning Fast</h3>
            <p className="text-purple-200">
              Transfers complete in under 30 seconds using cutting-edge blockchain technology
              with smart contract automation
            </p>
          </div>

          <div className="bg-purple-800 bg-opacity-50 rounded-lg p-8 backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
            <DollarSign className="text-green-400 text-5xl mb-4" />
            <h3 className="text-2xl font-bold mb-4">Ultra Low Fees</h3>
            <p className="text-purple-200">
              Flat $2 fee per transaction - save 90% vs traditional money transfer services
              with full transparency
            </p>
          </div>

          <div className="bg-purple-800 bg-opacity-50 rounded-lg p-8 backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
            <Globe className="text-blue-400 text-5xl mb-4" />
            <h3 className="text-2xl font-bold mb-4">Global Reach</h3>
            <p className="text-purple-200">
              Send to 180+ countries including Nigeria, China, Switzerland, Ghana, Kenya,
              and more with local banking partnerships
            </p>
          </div>
        </div>
      </div>

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
    </div>
  );

  if (showLandingPage) {
    return (
      <>
        <LandingPage />
       <SignupModal 
  showSignupModal={showSignupModal}
  setShowSignupModal={setShowSignupModal}
  signupData={signupData}
  setSignupData={setSignupData}
  countries={countries}
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
  onSuccess={async () => {
    // Reload wallet data after successful activation
    await loadRealDataFromBackend();
    await loadWallets();
    await loadTransactions();
    if (!user) {
      setShowLandingPage(false);
    }
  }}
/>
        {showKYCUpgrade && <KYCUpgradeModal />}
      </>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white">
      <header className="bg-purple-900 bg-opacity-50 backdrop-blur-sm border-b border-purple-700 sticky top-0 z-40">
  <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-2 md:space-x-4">
        <Globe className="w-6 h-6 md:w-8 md:h-8 text-green-400" />
        <div>
          <h1 className="text-lg md:text-2xl font-bold">GlobalPay</h1>
          <p className="text-xs text-purple-300 hidden md:block">Welcome back, {user?.firstName}!</p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        {/* Balance - Hidden on small screens */}
        <div className="text-right hidden lg:block">
          <p className="text-sm text-purple-300">Total Balance</p>
          <div className="flex items-center space-x-2">
            <p className="text-2xl font-bold">
              {showBalances ? `$${balances.totalUSD?.toFixed(2) || '0.00'}` : '****'}
            </p>
            <button onClick={() => setShowBalances(!showBalances)}>
              {showBalances ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
        </div>

        {/* Profile Button */}
        <button 
          onClick={() => setShowProfileModal(true)}
          className="bg-purple-700 hover:bg-purple-600 p-2 rounded-full transition-colors relative overflow-hidden"
        >
          {user?.profilePicture ? (
            <img 
              src={user.profilePicture} 
              alt="Profile" 
              className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover"
            />
          ) : (
            <User size={20} className="md:w-6 md:h-6" />
          )}
        </button>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 hover:bg-purple-700 rounded-lg transition-colors"
          aria-label="Menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Desktop Logout - Hidden on mobile */}
        <button 
          onClick={handleLogout}
          className="hidden md:flex bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg items-center space-x-2 transition-colors"
        >
          <LogOut size={20} />
          <span className="hidden lg:inline">Logout</span>
        </button>
      </div>
    </div>

    {/* Mobile Dropdown Menu */}
    {isMenuOpen && (
      <div className="mt-4 bg-purple-800 rounded-lg p-3 border border-purple-600">
        {/* Balance on Mobile */}
        <div className="lg:hidden mb-3 pb-3 border-b border-purple-600">
          <p className="text-sm text-purple-300">Total Balance</p>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold">
              {showBalances ? `$${balances.totalUSD?.toFixed(2) || '0.00'}` : '****'}
            </p>
            <button onClick={() => setShowBalances(!showBalances)}>
              {showBalances ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          {/* Profile Settings */}
          <button
            onClick={() => {
              setShowProfileModal(true);
              setIsMenuOpen(false);
            }}
            className="w-full text-left px-4 py-3 hover:bg-purple-700 rounded-lg transition-colors flex items-center space-x-3"
          >
            <User size={20} />
            <span>Profile Settings</span>
          </button>
          
          {/* KYC Verification */}
          <button
            onClick={() => {
              setShowKYCUpgrade(true);
              setIsMenuOpen(false);
            }}
            className="w-full text-left px-4 py-3 hover:bg-purple-700 rounded-lg transition-colors flex items-center space-x-3"
          >
            <Shield size={20} />
            <span>KYC Verification</span>
          </button>

          {/* Services Submenu */}
          <div className="border-t border-purple-600 my-2"></div>
          
          <button
            onClick={() => toggleSubmenu('Services')}
            className="w-full flex items-center justify-between px-4 py-3 hover:bg-purple-700 rounded-lg transition-colors"
          >
            <span className="font-semibold">Services</span>
            <ChevronDown 
              className={`w-5 h-5 transition-transform ${
                expandedMenu === 'Services' ? 'rotate-180' : ''
              }`}
            />
          </button>
          
          {expandedMenu === 'Services' && (
            <div className="ml-4 space-y-1">
              {menuItems.Services.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="block px-4 py-2 hover:bg-purple-700 rounded-lg transition-colors text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          )}

          {/* Company Submenu */}
          <button
            onClick={() => toggleSubmenu('Company')}
            className="w-full flex items-center justify-between px-4 py-3 hover:bg-purple-700 rounded-lg transition-colors"
          >
            <span className="font-semibold">Company</span>
            <ChevronDown 
              className={`w-5 h-5 transition-transform ${
                expandedMenu === 'Company' ? 'rotate-180' : ''
              }`}
            />
          </button>
          
          {expandedMenu === 'Company' && (
            <div className="ml-4 space-y-1">
              {menuItems.Company.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="block px-4 py-2 hover:bg-purple-700 rounded-lg transition-colors text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          )}

          {/* Support Submenu */}
          <button
            onClick={() => toggleSubmenu('Support')}
            className="w-full flex items-center justify-between px-4 py-3 hover:bg-purple-700 rounded-lg transition-colors"
          >
            <span className="font-semibold">Support</span>
            <ChevronDown 
              className={`w-5 h-5 transition-transform ${
                expandedMenu === 'Support' ? 'rotate-180' : ''
              }`}
            />
          </button>
          
          {expandedMenu === 'Support' && (
            <div className="ml-4 space-y-1">
              {menuItems.Support.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="block px-4 py-2 hover:bg-purple-700 rounded-lg transition-colors text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          )}

          {/* Legal Submenu */}
          <button
            onClick={() => toggleSubmenu('Legal')}
            className="w-full flex items-center justify-between px-4 py-3 hover:bg-purple-700 rounded-lg transition-colors"
          >
            <span className="font-semibold">Legal</span>
            <ChevronDown 
              className={`w-5 h-5 transition-transform ${
                expandedMenu === 'Legal' ? 'rotate-180' : ''
              }`}
            />
          </button>
          
          {expandedMenu === 'Legal' && (
            <div className="ml-4 space-y-1">
              {menuItems.Legal.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="block px-4 py-2 hover:bg-purple-700 rounded-lg transition-colors text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          )}

          {/* Logout */}
          <div className="border-t border-purple-600 my-2"></div>
          <button
            onClick={() => {
              handleLogout();
              setIsMenuOpen(false);
            }}
            className="w-full text-left px-4 py-3 hover:bg-red-700 bg-red-600 rounded-lg transition-colors flex items-center space-x-3"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    )}

    {/* Navigation Tabs */}
    <nav className="flex space-x-2 mt-4 overflow-x-auto pb-2">
      {['dashboard', 'send', 'crypto', 'cards', 'wallets', 'transactions', 'profile'].map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors text-sm md:text-base ${
            activeTab === tab
              ? 'bg-blue-600 text-white'
              : 'bg-purple-800 text-purple-300 hover:bg-purple-700'
          }`}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </nav>
  </div>
</header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-lg p-6 shadow-lg">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-green-200 text-sm">Total Balance</p>
                    <p className="text-3xl font-bold mt-2">${balances.totalUSD?.toFixed(2) || '0.00'}</p>
                  </div>
                  <DollarSign className="text-green-300" size={32} />
                </div>
                <p className="text-green-200 text-xs">Across all wallets and cards</p>
              </div>

              <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg p-6 shadow-lg">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-blue-200 text-sm">Crypto Cards</p>
                    <p className="text-3xl font-bold mt-2">{cryptoCards.length}</p>
                  </div>
                  <CreditCard className="text-blue-300" size={32} />
                </div>
                <p className="text-blue-200 text-xs">${cryptoCards.reduce((sum, card) => sum + card.valueUSD, 0).toFixed(2)} total value</p>
              </div>

              <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg p-6 shadow-lg">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-purple-200 text-sm">Active Wallets</p>
                    <p className="text-3xl font-bold mt-2">{wallets.length}</p>
                  </div>
                  <Wallet className="text-purple-300" size={32} />
                </div>
                <p className="text-purple-200 text-xs">Multi-currency support</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-purple-800 bg-opacity-60 rounded-lg p-6 backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Wallet className="mr-2 text-blue-400" size={24} />
                  Crypto Balances
                </h3>
                <div className="space-y-3">
                  {cryptoOptions.map((crypto) => (
                    <div key={crypto.code} className="flex justify-between items-center bg-purple-700 bg-opacity-50 rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full bg-${crypto.color}-500 flex items-center justify-center text-xl font-bold`}>
                          {crypto.symbol}
                        </div>
                        <div>
                          <p className="font-bold">{crypto.name}</p>
                          <p className="text-sm text-purple-300">{balances[crypto.code]?.toFixed(8) || '0.00000000'} {crypto.code}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">${((balances[crypto.code] || 0) * (cryptoPrices[crypto.code] || 0)).toFixed(2)}</p>
                        <p className="text-sm text-purple-300">${cryptoPrices[crypto.code]?.toLocaleString() || '0'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-purple-800 bg-opacity-60 rounded-lg p-6 backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <CreditCard className="mr-2 text-orange-400" size={24} />
                  Active Crypto Cards
                </h3>
                <div className="space-y-4">
                  {cryptoCards.map((card) => (
                    <div 
                      key={card.id} 
                      onClick={() => handleCardSelection(card)}
                      className={`bg-gradient-to-r from-orange-600 to-red-600 rounded-lg p-4 shadow-lg cursor-pointer transition-all ${
                        selectedCard?.id === card.id ? 'ring-4 ring-yellow-400' : 'hover:shadow-xl'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="text-sm text-orange-200">Card Number</p>
                          <p className="text-xl font-bold font-mono mt-1">{card.maskedCardNumber}</p>
                        </div>
                        <CreditCard size={32} className="text-orange-200" />
                      </div>
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-xs text-orange-200">Balance</p>
                          <p className="text-2xl font-bold">${card.valueUSD}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-orange-200">Activated</p>
                          <p className="text-sm">{new Date(card.activatedAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      setShowActivateCardModal(true);
                      setActivateData({ cardNumber: '', pin: '', code: '', generatedCode: '' });
                    }}
                    className="w-full bg-orange-600 hover:bg-orange-700 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                  >
                    <Plus size={20} />
                    <span>Activate New Card</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-purple-800 bg-opacity-60 rounded-lg p-6 backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Clock className="mr-2 text-green-400" size={24} />
                Recent Transactions
              </h3>
              <div className="space-y-3">
                {transactions.slice(0, 5).map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between bg-purple-700 bg-opacity-50 rounded-lg p-4">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-full ${
                        tx.type === 'received' ? 'bg-green-600' :
                        tx.type === 'sent' ? 'bg-red-600' :
                        tx.type === 'convert' ? 'bg-blue-600' :
                        'bg-yellow-600'
                      }`}>
                        {tx.type === 'received' ? <ArrowDown size={20} /> :
                         tx.type === 'sent' ? <ArrowUp size={20} /> :
                         tx.type === 'convert' ? <RefreshCw size={20} /> :
                         <DollarSign size={20} />}
                      </div>
                      <div>
                        <p className="font-bold capitalize">{tx.type}</p>
                        <p className="text-sm text-purple-300">
                          {new Date(tx.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${tx.type === 'received' ? 'text-green-400' : 'text-red-400'}`}>
                        {tx.type === 'received' ? '+' : '-'}{tx.amount} {tx.currency}
                      </p>
                      <p className={`text-xs ${
                        tx.status === 'confirmed' ? 'text-green-400' :
                        tx.status === 'pending' ? 'text-yellow-400' :
                        'text-red-400'
                      }`}>
                        {tx.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button
                onClick={() => setActiveTab('send')}
                className="bg-gradient-to-br from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 rounded-lg p-6 shadow-lg transition-all transform hover:scale-105"
              >
                <Send className="text-green-200 mb-3" size={32} />
                <h4 className="text-xl font-bold mb-2">send Money</h4>
                <p className="text-green-200 text-sm">Transfer to 180+ countries</p>
              </button>

              <button
                onClick={() => setActiveTab('crypto')}
                className="bg-gradient-to-br from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 rounded-lg p-6 shadow-lg transition-all transform hover:scale-105"
              >
                <ArrowLeftRight className="text-blue-200 mb-3" size={32} />
                <h4 className="text-xl font-bold mb-2">Crypto Operations</h4>
                <p className="text-blue-200 text-sm">Send, receive & convert crypto</p>
              </button>

              <button
                onClick={() => setShowKYCUpgrade(true)}
                className="bg-gradient-to-br from-yellow-600 to-yellow-800 hover:from-yellow-700 hover:to-yellow-900 rounded-lg p-6 shadow-lg transition-all transform hover:scale-105"
              >
                <Shield className="text-yellow-200 mb-3" size={32} />
                <h4 className="text-xl font-bold mb-2">Upgrade KYC</h4>
                <p className="text-yellow-200 text-sm">Increase your limits</p>
              </button>
            </div>
          </div>
        )}
        {activeTab === 'send' && (
          <div className="space-y-6">
            <div className="bg-purple-800 bg-opacity-60 rounded-lg p-6 backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Send className="mr-3 text-green-400" size={32} />
                Send Money
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Transfer Type</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setTransferData({...transferData, transferType: 'domestic'})}
                      className={`p-4 rounded-lg border-2 transition-colors ${
                        transferData.transferType === 'domestic'
                          ? 'border-green-500 bg-green-600 bg-opacity-20'
                          : 'border-purple-600 bg-purple-700 bg-opacity-30'
                      }`}
                    >
                      <MapPin className="mx-auto mb-2 text-green-400" size={24} />
                      <p className="font-bold">Domestic</p>
                      <p className="text-xs text-purple-300">Within your country (No fees)</p>
                    </button>
                    <button
                      onClick={() => setTransferData({...transferData, transferType: 'international'})}
                      className={`p-4 rounded-lg border-2 transition-colors ${
                        transferData.transferType === 'international'
                          ? 'border-blue-500 bg-blue-600 bg-opacity-20'
                          : 'border-purple-600 bg-purple-700 bg-opacity-30'
                      }`}
                    >
                      <Globe className="mx-auto mb-2 text-blue-400" size={24} />
                      <p className="font-bold">International</p>
                      <p className="text-xs text-purple-300">Send abroad ($2 fee)</p>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Recipient Email/Phone</label>
                  <input
                    type="text"
                    value={transferData.recipientEmail}
                    onChange={(e) => setTransferData({...transferData, recipientEmail: e.target.value})}
                    className="w-full bg-purple-700 text-white p-3 rounded border border-purple-600 focus:border-purple-400 focus:outline-none"
                    placeholder="recipient@example.com or +1234567890"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">You Send</label>
                    <select
                      value={transferData.fromCurrency}
                      onChange={(e) => setTransferData({...transferData, fromCurrency: e.target.value})}
                      className="w-full bg-purple-700 text-white p-3 rounded border border-purple-600 focus:border-purple-400 focus:outline-none mb-2"
                    >
                      {currencies.map(curr => (
                        <option key={curr.code} value={curr.code}>
                          {curr.flag} {curr.code} - {curr.name}
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      value={transferData.amount}
                      onChange={(e) => setTransferData({...transferData, amount: e.target.value})}
                      className="w-full bg-purple-700 text-white p-3 rounded border border-purple-600 focus:border-purple-400 focus:outline-none"
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">They Receive</label>
                    <select
                      value={transferData.toCurrency}
                      onChange={(e) => setTransferData({...transferData, toCurrency: e.target.value})}
                      className="w-full bg-purple-700 text-white p-3 rounded border border-purple-600 focus:border-purple-400 focus:outline-none mb-2"
                    >
                      {currencies.map(curr => (
                        <option key={curr.code} value={curr.code}>
                          {curr.flag} {curr.code} - {curr.name}
                        </option>
                      ))}
                    </select>
                    <div className="w-full bg-purple-900 text-white p-3 rounded border border-purple-600">
                      {calculateExchangeAmount(transferData.amount, transferData.fromCurrency, transferData.toCurrency)}
                    </div>
                  </div>
                </div>

                <div className="bg-blue-900 bg-opacity-40 rounded-lg p-4 border border-blue-600">
                  <div className="flex justify-between mb-2">
                    <span>Exchange Rate:</span>
                    <span className="font-bold">
                      1 {transferData.fromCurrency} = {(exchangeRates[transferData.toCurrency] / exchangeRates[transferData.fromCurrency]).toFixed(4)} {transferData.toCurrency}
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Transfer Fee:</span>
                    <span className="font-bold">{transferData.transferType === 'domestic' ? '$0.00' : '$2.00'}</span>
                  </div>
                  <div className="flex justify-between border-t border-blue-700 pt-2">
                    <span className="font-bold">Total to Pay:</span>
                    <span className="font-bold text-green-400">
                      {formatCurrency(
                        (parseFloat(transferData.amount) || 0) + (transferData.transferType === 'domestic' ? 0 : 2),
                        transferData.fromCurrency
                      )}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Payment Method</label>
                  <div className="grid grid-cols-3 gap-4">
                    <button
                      onClick={() => setTransferData({...transferData, paymentMethod: 'crypto'})}
                      className={`p-4 rounded-lg border-2 transition-colors ${
                        transferData.paymentMethod === 'crypto'
                          ? 'border-orange-500 bg-orange-600 bg-opacity-20'
                          : 'border-purple-600 bg-purple-700 bg-opacity-30'
                      }`}
                    >
                      <Wallet className="mx-auto mb-2" size={24} />
                      <p className="font-bold text-sm">Crypto Balance</p>
                    </button>
                    <button
                      onClick={() => setTransferData({...transferData, paymentMethod: 'card'})}
                      className={`p-4 rounded-lg border-2 transition-colors ${
                        transferData.paymentMethod === 'card'
                          ? 'border-blue-500 bg-blue-600 bg-opacity-20'
                          : 'border-purple-600 bg-purple-700 bg-opacity-30'
                      }`}
                    >
                      <CreditCard className="mx-auto mb-2" size={24} />
                      <p className="font-bold text-sm">Debit/Credit</p>
                    </button>
                    <button
                      onClick={() => setTransferData({...transferData, paymentMethod: 'bank'})}
                      className={`p-4 rounded-lg border-2 transition-colors ${
                        transferData.paymentMethod === 'bank'
                          ? 'border-green-500 bg-green-600 bg-opacity-20'
                          : 'border-purple-600 bg-purple-700 bg-opacity-30'
                      }`}
                    >
                      <Building className="mx-auto mb-2" size={24} />
                      <p className="font-bold text-sm">Bank Account</p>
                    </button>
                  </div>
                </div>

                {transferData.paymentMethod === 'crypto' && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Select Cryptocurrency</label>
                    <select
                      value={transferData.selectedCrypto}
                      onChange={(e) => setTransferData({...transferData, selectedCrypto: e.target.value})}
                      className="w-full bg-purple-700 text-white p-3 rounded border border-purple-600 focus:border-purple-400 focus:outline-none"
                    >
                      {cryptoOptions.map(crypto => (
                        <option key={crypto.code} value={crypto.code}>
                          {crypto.symbol} {crypto.name} - Balance: {balances[crypto.code]?.toFixed(8) || '0.00000000'}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {transferData.paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Card Holder Name</label>
                      <input
                        type="text"
                        value={transferData.cardName}
                        onChange={(e) => setTransferData({...transferData, cardName: e.target.value})}
                        className="w-full bg-purple-700 text-white p-3 rounded border border-purple-600 focus:border-purple-400 focus:outline-none"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Card Number</label>
                      <input
                        type="text"
                        value={transferData.cardNumber}
                        onChange={(e) => setTransferData({...transferData, cardNumber: e.target.value})}
                        className="w-full bg-purple-700 text-white p-3 rounded border border-purple-600 focus:border-purple-400 focus:outline-none"
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2">
                        <label className="block text-sm font-medium mb-2">Expiry Date</label>
                        <input
                          type="text"
                          value={transferData.expiryDate}
                          onChange={(e) => setTransferData({...transferData, expiryDate: e.target.value})}
                          className="w-full bg-purple-700 text-white p-3 rounded border border-purple-600 focus:border-purple-400 focus:outline-none"
                          placeholder="MM/YY"
                          maxLength={5}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">CVV</label>
                        <input
                          type="text"
                          value={transferData.cvv}
                          onChange={(e) => setTransferData({...transferData, cvv: e.target.value})}
                          className="w-full bg-purple-700 text-white p-3 rounded border border-purple-600 focus:border-purple-400 focus:outline-none"
                          placeholder="123"
                          maxLength={4}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Zip Code</label>
                      <input
                        type="text"
                        value={transferData.zipCode}
                        onChange={(e) => setTransferData({...transferData, zipCode: e.target.value})}
                        className="w-full bg-purple-700 text-white p-3 rounded border border-purple-600 focus:border-purple-400 focus:outline-none"
                        placeholder="10001"
                      />
                    </div>
                  </div>
                )}

                {transferData.paymentMethod === 'bank' && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Bank Account</label>
                    <select
                      value={transferData.bankAccount}
                      onChange={(e) => setTransferData({...transferData, bankAccount: e.target.value})}
                      className="w-full bg-purple-700 text-white p-3 rounded border border-purple-600 focus:border-purple-400 focus:outline-none"
                    >
                      <option value="">Select Bank Account</option>
                      {bankAccounts.map(account => (
                        <option key={account.id} value={account.id}>
                          {account.bankName} {account.accountNumber}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => setShowAddBankModal(true)}
                      className="mt-2 text-blue-400 hover:text-blue-300 text-sm"
                    >
                      + Add New Bank Account
                    </button>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-2">Message (Optional)</label>
                  <textarea
                    value={transferData.message}
                    onChange={(e) => setTransferData({...transferData, message: e.target.value})}
                    className="w-full bg-purple-700 text-white p-3 rounded border border-purple-600 focus:border-purple-400 focus:outline-none"
                    rows="3"
                    placeholder="Add a note..."
                  />
                </div>

                <button
                  onClick={handleTransfer}
                  disabled={loading || !transferData.recipientEmail || !transferData.amount}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-4 rounded-lg font-bold text-lg transition-colors flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="animate-spin" size={20} />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>Send Money</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'crypto' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <button
                onClick={() => setShowSendCryptoModal(true)}
                className="bg-gradient-to-br from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 rounded-lg p-6 shadow-lg transition-all transform hover:scale-105"
              >
                <Send className="text-blue-200 mb-3" size={32} />
                <h4 className="text-xl font-bold mb-2">Send Crypto</h4>
                <p className="text-blue-200 text-sm">Transfer to any wallet</p>
              </button>

              <button
                onClick={() => setShowReceiveCryptoModal(true)}
                className="bg-gradient-to-br from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 rounded-lg p-6 shadow-lg transition-all transform hover:scale-105"
              >
                <ArrowDown className="text-green-200 mb-3" size={32} />
                <h4 className="text-xl font-bold mb-2">Receive Crypto</h4>
                <p className="text-green-200 text-sm">Get your wallet address</p>
              </button>

              <button
                onClick={() => setShowConvertCryptoModal(true)}
                className="bg-gradient-to-br from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 rounded-lg p-6 shadow-lg transition-all transform hover:scale-105"
              >
                <ArrowLeftRight className="text-purple-200 mb-3" size={32} />
                <h4 className="text-xl font-bold mb-2">Convert Crypto</h4>
                <p className="text-purple-200 text-sm">Swap between coins</p>
              </button>

              <button
                onClick={() => setShowCryptoToCashModal(true)}
                className="bg-gradient-to-br from-yellow-600 to-yellow-800 hover:from-yellow-700 hover:to-yellow-900 rounded-lg p-6 shadow-lg transition-all transform hover:scale-105"
              >
                <DollarSign className="text-yellow-200 mb-3" size={32} />
                <h4 className="text-xl font-bold mb-2">Crypto to Cash</h4>
                <p className="text-yellow-200 text-sm">Withdraw to bank</p>
              </button>
            </div>

            <div className="bg-purple-800 bg-opacity-60 rounded-lg p-6 backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <TrendingUp className="mr-2 text-green-400" size={24} />
                Live Crypto Prices
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {cryptoOptions.map((crypto) => (
                  <div key={crypto.code} className="bg-purple-700 bg-opacity-50 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-bold text-lg">{crypto.name}</p>
                        <p className="text-sm text-purple-300">{crypto.code}</p>
                      </div>
                      <div className={`text-2xl font-bold text-${crypto.color}-400`}>
                        {crypto.symbol}
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-green-400">
                      ${cryptoPrices[crypto.code]?.toLocaleString() || '0'}
                    </p>
                    <p className="text-sm text-purple-300">
                      Balance: {balances[crypto.code]?.toFixed(8) || '0.00000000'}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-purple-800 bg-opacity-60 rounded-lg p-6 backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => setActiveTab('cards')}
                  className="bg-purple-700 hover:bg-purple-600 p-4 rounded-lg text-left transition-colors"
                >
                  <CreditCard className="text-orange-400 mb-2" size={24} />
                  <p className="font-bold">Buy Crypto with Card</p>
                  <p className="text-sm text-purple-300">Use debit/credit card</p>
                </button>

                <button
                  onClick={() => setShowKYCUpgrade(true)}
                  className="bg-purple-700 hover:bg-purple-600 p-4 rounded-lg text-left transition-colors"
                >
                  <Shield className="text-yellow-400 mb-2" size={24} />
                  <p className="font-bold">Increase Limits</p>
                  <p className="text-sm text-purple-300">Complete KYC verification</p>
                </button>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'cards' && (
          <div className="space-y-6">
            <div className="bg-purple-800 bg-opacity-60 rounded-lg p-6 backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <CreditCard className="mr-3 text-orange-400" size={32} />
                My Crypto Cards
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {cryptoCards.map((card) => (
                  <div 
                    key={card.id} 
                    onClick={() => handleCardSelection(card)}
                    className={`bg-gradient-to-br from-orange-600 to-red-600 rounded-xl p-6 shadow-xl cursor-pointer transition-all ${
                      selectedCard?.id === card.id ? 'ring-4 ring-yellow-400 scale-105' : 'hover:shadow-2xl'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-sm text-orange-200">GlobalPay Crypto Card</p>
                        <p className="text-xs text-orange-300">Prepaid Mastercard</p>
                      </div>
                      <CreditCard size={32} className="text-orange-200" />
                    </div>
                    <p className="text-2xl font-bold font-mono mb-4">{card.maskedCardNumber}</p>
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-xs text-orange-200">Available Balance</p>
                        <p className="text-3xl font-bold">${card.valueUSD}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-orange-200">Status</p>
                        <p className="text-sm font-bold text-green-300">Active</p>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-orange-500 flex justify-between text-xs">
                      <div>
                        <p className="text-orange-300">Activated</p>
                        <p className="font-bold">{new Date(card.activatedAt).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-orange-300">Token ID</p>
                        <p className="font-bold">{card.tokenId}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <button
                  onClick={() => {
                    setShowActivateCardModal(true);
                    setActivateData({ cardNumber: '', pin: '', code: '', generatedCode: '' });
                  }}
                  className="bg-green-600 hover:bg-green-700 p-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  <Plus size={20} />
                  <span>Activate New Card</span>
                </button>

                <button
                  onClick={() => setShowTopUpCardModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 p-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  <Wallet size={20} />
                  <span>Top Up Card</span>
                </button>

                <button
                  onClick={handleViewCardHistory}
                  className="bg-purple-600 hover:bg-purple-700 p-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  <History size={20} />
                  <span>Card History</span>
                </button>
              </div>
            </div>

            <div className="bg-purple-800 bg-opacity-60 rounded-lg p-6 backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-4">How Crypto Cards Work</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold">1</span>
                  </div>
                  <h4 className="font-bold mb-2">Purchase Card</h4>
                  <p className="text-sm text-purple-300">Buy crypto gift cards at major retailers nationwide</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold">2</span>
                  </div>
                  <h4 className="font-bold mb-2">Activate Online</h4>
                  <p className="text-sm text-purple-300">Enter card number and PIN to activate your crypto</p>
                </div>
                <div className="text-center">
                  <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold">3</span>
                  </div>
                  <h4 className="font-bold mb-2">Use Instantly</h4>
                  <p className="text-sm text-purple-300">Send, trade, or convert your crypto immediately</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'wallets' && (
          <div className="space-y-6">
            <div className="bg-purple-800 bg-opacity-60 rounded-lg p-6 backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Wallet className="mr-3 text-blue-400" size={32} />
                My Crypto Wallets
              </h2>

              <div className="space-y-4">
                {wallets.map((wallet) => (
                  <div key={wallet.id} className="bg-purple-700 bg-opacity-50 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-lg font-bold mb-1">{wallet.name}</p>
                        <p className="text-sm text-purple-300">Wallet Address</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <p className="font-mono text-lg">{wallet.shortAddress}</p>
                          <button
                            onClick={() => copyToClipboard(wallet.address)}
                            className="text-blue-400 hover:text-blue-300"
                          >
                            {copied === wallet.address ? <Check size={18} /> : <Copy size={18} />}
                          </button>
                        </div>
                        <p className="text-xs text-purple-400 mt-1">{wallet.address}</p>
                      </div>
                      <button
                        onClick={() => {
                          setShowReceiveCryptoModal(true);
                          setSelectedCrypto(wallet.id);
                        }}
                        className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-sm transition-colors"
                      >
                        Receive
                      </button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                      {Object.entries(wallet.balances).map(([crypto, balance]) => (
                        <div key={crypto} className="bg-purple-800 rounded-lg p-3">
                          <p className="text-xs text-purple-300">{crypto}</p>
                          <p className="font-bold text-sm">{balance}</p>
                          <p className="text-xs text-purple-400">
                            ${((parseFloat(balance) || 0) * (cryptoPrices[crypto] || 0)).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowCreateWalletModal(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 mt-4"
              >
                <Plus size={20} />
                <span>Create New Wallet</span>
              </button>
            </div>

            <div className="bg-purple-800 bg-opacity-60 rounded-lg p-6 backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-4">Wallet Security</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-bold">Multi-Signature Protection</p>
                    <p className="text-sm text-purple-300">Multiple approvals required for large transactions</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-bold">Cold Storage</p>
                    <p className="text-sm text-purple-300">95% of funds stored offline in secure vaults</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-bold">Insurance Coverage</p>
                    <p className="text-sm text-purple-300">$200M cryptocurrency custody insurance</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'transactions' && (
          <div className="space-y-6">
            <div className="bg-purple-800 bg-opacity-60 rounded-lg p-6 backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Clock className="mr-3 text-green-400" size={32} />
                Transaction History
              </h2>

              <div className="mb-4 flex flex-wrap gap-2">
                <button 
                  onClick={() => setTransactionFilter('all')}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                    transactionFilter === 'all' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-purple-700 hover:bg-purple-600 text-purple-300'
                  }`}
                >
                  All
                </button>
                <button 
                  onClick={() => setTransactionFilter('sent')}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                    transactionFilter === 'sent' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-purple-700 hover:bg-purple-600 text-purple-300'
                  }`}
                >
                  Sent
                </button>
                <button 
                  onClick={() => setTransactionFilter('received')}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                    transactionFilter === 'received' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-purple-700 hover:bg-purple-600 text-purple-300'
                  }`}
                >
                  Received
                </button>
                <button 
                  onClick={() => setTransactionFilter('convert')}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                    transactionFilter === 'convert' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-purple-700 hover:bg-purple-600 text-purple-300'
                  }`}
                >
                  Converted
                </button>
                <button 
                  onClick={() => setTransactionFilter('withdraw')}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                    transactionFilter === 'withdraw' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-purple-700 hover:bg-purple-600 text-purple-300'
                  }`}
                >
                  Withdrawn
                </button>
              </div>

              <div className="space-y-3">
                {getFilteredTransactions().map((tx) => (
                  <div key={tx.id} className="bg-purple-700 bg-opacity-50 rounded-lg p-4 hover:bg-opacity-70 transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 flex-1">
                        <div className={`p-3 rounded-full ${
                          tx.type === 'received' ? 'bg-green-600' :
                          tx.type === 'sent' ? 'bg-red-600' :
                          tx.type === 'convert' ? 'bg-blue-600' :
                          'bg-yellow-600'
                        }`}>
                          {tx.type === 'received' ? <ArrowDown size={20} /> :
                           tx.type === 'sent' ? <ArrowUp size={20} /> :
                           tx.type === 'convert' ? <ArrowLeftRight size={20} /> :
                           <DollarSign size={20} />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <p className="font-bold capitalize">{tx.type}</p>
                            <span className={`text-xs px-2 py-1 rounded ${
                              tx.status === 'confirmed' ? 'bg-green-600' :
                              tx.status === 'pending' ? 'bg-yellow-600' :
                              'bg-red-600'
                            }`}>
                              {tx.status}
                            </span>
                          </div>
                          <p className="text-sm text-purple-300">
                            {new Date(tx.timestamp).toLocaleString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                          {tx.from && <p className="text-xs text-purple-400">From: {tx.from}</p>}
                          {tx.to && <p className="text-xs text-purple-400">To: {tx.to}</p>}
                          {tx.txHash && (
                            <div className="flex items-center space-x-2 mt-1">
                              <p className="text-xs text-purple-400 font-mono">{tx.txHash}</p>
                              <button
                                onClick={() => copyToClipboard(tx.txHash)}
                                className="text-blue-400 hover:text-blue-300"
                              >
                                {copied === tx.txHash ? <Check size={14} /> : <Copy size={14} />}
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold text-lg ${tx.type === 'received' ? 'text-green-400' : 'text-red-400'}`}>
                          {tx.type === 'received' ? '+' : '-'}{tx.amount} {tx.currency}
                        </p>
                        {tx.type === 'convert' && (
                          <p className="text-sm text-purple-300">
                            {tx.from} → {tx.to}
                          </p>
                        )}
                        <p className="text-xs text-purple-400">
                          ${((parseFloat(tx.amount) || 0) * (cryptoPrices[tx.currency] || exchangeRates[tx.currency] || 1)).toFixed(2)} USD
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {getFilteredTransactions().length === 0 && (
                <div className="text-center py-12">
                  <Clock className="text-purple-500 mx-auto mb-4" size={48} />
                  <p className="text-purple-300">No transactions yet</p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-purple-800 bg-opacity-60 rounded-lg p-6">
                <p className="text-sm text-purple-300 mb-2">Total Sent</p>
                <p className="text-2xl font-bold">
                  ${transactions
                    .filter(tx => tx.type === 'sent')
                    .reduce((sum, tx) => sum + (parseFloat(tx.amount) * (cryptoPrices[tx.currency] || 1)), 0)
                    .toFixed(2)}
                </p>
              </div>
              <div className="bg-purple-800 bg-opacity-60 rounded-lg p-6">
                <p className="text-sm text-purple-300 mb-2">Total Received</p>
                <p className="text-2xl font-bold text-green-400">
                  ${transactions
                    .filter(tx => tx.type === 'received')
                    .reduce((sum, tx) => sum + (parseFloat(tx.amount) * (cryptoPrices[tx.currency] || 1)), 0)
                    .toFixed(2)}
                </p>
              </div>
              <div className="bg-purple-800 bg-opacity-60 rounded-lg p-6">
                <p className="text-sm text-purple-300 mb-2">Total Transactions</p>
                <p className="text-2xl font-bold">{transactions.length}</p>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div className="bg-purple-800 bg-opacity-60 rounded-lg p-6 backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <User className="mr-3 text-purple-400" size={32} />
                Profile Settings
              </h2>

              <div className="space-y-6">
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    {profileData.profilePicture ? (
                      <img src={profileData.profilePicture} alt="Profile" className="w-24 h-24 rounded-full object-cover" />
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-purple-600 flex items-center justify-center">
                        <User size={48} />
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePictureUpload}
                      className="hidden"
                      id="profilePicture"
                    />
                    <label
                      htmlFor="profilePicture"
                      className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 p-2 rounded-full cursor-pointer"
                    >
                      <Camera size={16} />
                    </label>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{user?.firstName} {user?.lastName}</p>
                    <p className="text-purple-300">{user?.email}</p>
                    <p className="text-purple-300">{user?.phone}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name</label>
                    <input
                      type="text"
                      value={profileData.firstName}
                      onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                      className="w-full bg-purple-700 text-white p-3 rounded border border-purple-600 focus:border-purple-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name</label>
                    <input
                      type="text"
                      value={profileData.lastName}
                      onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                      className="w-full bg-purple-700 text-white p-3 rounded border border-purple-600 focus:border-purple-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    className="w-full bg-purple-700 text-white p-3 rounded border border-purple-600 focus:border-purple-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    className="w-full bg-purple-700 text-white p-3 rounded border border-purple-600 focus:border-purple-400 focus:outline-none"
                  />
                </div>

                <div className="bg-purple-700 rounded-lg p-4">
                  <h4 className="font-bold mb-3">Notification Preferences</h4>
                  <div className="space-y-3">
                    {Object.entries(profileData.notifications).map(([key, value]) => (
                      <label key={key} className="flex items-center justify-between cursor-pointer">
                        <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <button
                          onClick={() => setProfileData({
                            ...profileData,
                            notifications: {...profileData.notifications, [key]: !value}
                          })}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            value ? 'bg-green-600' : 'bg-gray-600'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              value ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="bg-yellow-900 bg-opacity-40 rounded-lg p-4 border border-yellow-600">
                  <div className="flex items-start space-x-3">
                    <Shield className="text-yellow-400 flex-shrink-0 mt-1" size={20} />
                    <div className="flex-1">
                      <p className="font-bold text-yellow-300">KYC Status: {user?.kycLevel === 'minimal' ? 'Basic' : 'Verified'}</p>
                      <p className="text-sm text-yellow-200 mt-1">
                        {user?.kycLevel === 'minimal' 
                          ? `Daily limit: $${spendingLimit.daily} | Complete KYC to increase limits`
                          : `Monthly limit: $${spendingLimit.monthly} | Full access enabled`
                        }
                      </p>
                      {user?.kycLevel === 'minimal' && (
                        <button
                          onClick={() => setShowKYCUpgrade(true)}
                          className="mt-2 bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded text-sm transition-colors"
                        >
                          Upgrade KYC
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => alert('Profile updated successfully!')}
                  className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-medium transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {showSendCryptoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-purple-800 rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Send Cryptocurrency</h3>
              <button onClick={() => setShowSendCryptoModal(false)} className="text-purple-300 hover:text-white">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Select Crypto</label>
                <select
                  value={sendCryptoData.crypto}
                  onChange={(e) => setSendCryptoData({...sendCryptoData, crypto: e.target.value})}
                  className="w-full bg-purple-700 text-white p-3 rounded border border-purple-600 focus:border-purple-400 focus:outline-none"
                >
                  {cryptoOptions.map(crypto => (
                    <option key={crypto.code} value={crypto.code}>
                      {crypto.symbol} {crypto.name} - {balances[crypto.code]?.toFixed(8) || '0.00000000'}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Recipient Wallet Address</label>
                <input
                  type="text"
                  value={sendCryptoData.recipientAddress}
                  onChange={(e) => setSendCryptoData({...sendCryptoData, recipientAddress: e.target.value})}
                  className="w-full bg-purple-700 text-white p-3 rounded border border-purple-600 focus:border-purple-400 focus:outline-none"
                  placeholder="0x... or bc1q..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Amount</label>
                <input
                  type="number"
                  step="0.00000001"
                  value={sendCryptoData.amount}
                  onChange={(e) => setSendCryptoData({...sendCryptoData, amount: e.target.value})}
                  className="w-full bg-purple-700 text-white p-3 rounded border border-purple-600 focus:border-purple-400 focus:outline-none"
                  placeholder="0.00000000"
                />
                <p className="text-sm text-purple-300 mt-1">
                  Available: {balances[sendCryptoData.crypto]?.toFixed(8) || '0.00000000'} {sendCryptoData.crypto}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Note (Optional)</label>
                <input
                  type="text"
                  value={sendCryptoData.note}
                  onChange={(e) => setSendCryptoData({...sendCryptoData, note: e.target.value})}
                  className="w-full bg-purple-700 text-white p-3 rounded border border-purple-600 focus:border-purple-400 focus:outline-none"
                  placeholder="Payment for..."
                />
              </div>

              <div className="bg-blue-900 bg-opacity-40 rounded-lg p-3 border border-blue-600">
                <div className="flex justify-between text-sm">
                  <span>Value in USD:</span>
                  <span className="font-bold">
                    ${((parseFloat(sendCryptoData.amount) || 0) * (cryptoPrices[sendCryptoData.crypto] || 0)).toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleSendCrypto}
                disabled={loading || !sendCryptoData.recipientAddress || !sendCryptoData.amount}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed py-3 rounded-lg font-medium transition-colors"
              >
                {loading ? 'Processing...' : 'Send Crypto'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showReceiveCryptoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-purple-800 rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Receive Cryptocurrency</h3>
              <button onClick={() => setShowReceiveCryptoModal(false)} className="text-purple-300 hover:text-white">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Select Crypto to Receive</label>
                <select
                  value={selectedCrypto}
                  onChange={(e) => setSelectedCrypto(e.target.value)}
                  className="w-full bg-purple-700 text-white p-3 rounded border border-purple-600 focus:border-purple-400 focus:outline-none"
                >
                  {cryptoOptions.map(crypto => (
                    <option key={crypto.code} value={crypto.code}>
                      {crypto.symbol} {crypto.name}
                    </option>
                  ))}
                </select>
              </div>

              {wallets.length > 0 && (
                <>
                  <div className="bg-purple-700 rounded-lg p-4 text-center">
                    <div className="bg-white p-4 rounded-lg mb-3 inline-block">
                      <QrCode size={128} className="text-black" />
                    </div>
                    <p className="text-sm text-purple-300 mb-2">Your Wallet Address:</p>
                    <div className="bg-purple-900 rounded p-3 break-all font-mono text-sm">
                      <p className="text-sm text-purple-300 mb-2">Your Wallet Address:</p>
                    {console.log('🔍 Modal Debug:', {
                      walletsLength: wallets.length,
                      firstWallet: wallets[0],
                      walletAddresses: wallets[0]?.wallet_addresses,
                      selectedCrypto: selectedCrypto,
                      finalAddress: wallets[0]?.wallet_addresses?.[selectedCrypto]
                    })}
                    <div className="bg-purple-900 rounded p-3 break-all font-mono text-sm"></div>
                      {wallets[0].wallet_addresses?.[selectedCrypto] || 'Address not available'}
                    </div>
                    <button
                      onClick={() => copyToClipboard(wallets[0].wallet_addresses?.[selectedCrypto] || 'Address not available')}
                      className="mt-3 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center space-x-2 mx-auto transition-colors"
                              >
                      {copied === (wallets[0].wallet_addresses?.[selectedCrypto] || 'Address not available') ? (
                        <>
                          <Check size={18} />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={18} />
                          <span>Copy Address</span>
                        </>
                      )}  
                                          </button>
                  </div>

                  <div className="bg-yellow-900 bg-opacity-40 rounded-lg p-3 border border-yellow-600">
                    <p className="text-sm text-yellow-200">
                      <strong>Important:</strong> Only send {selectedCrypto} to this address. Sending other cryptocurrencies may result in permanent loss.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {showConvertCryptoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-purple-800 rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Convert Cryptocurrency</h3>
              <button onClick={() => setShowConvertCryptoModal(false)} className="text-purple-300 hover:text-white">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">From</label>
                <select
                  value={convertCryptoData.fromCrypto}
                  onChange={(e) => setConvertCryptoData({...convertCryptoData, fromCrypto: e.target.value})}
                  className="w-full bg-purple-700 text-white p-3 rounded border border-purple-600 focus:border-purple-400 focus:outline-none"
                >
                  {cryptoOptions.map(crypto => (
                    <option key={crypto.code} value={crypto.code}>
                      {crypto.symbol} {crypto.name} - {balances[crypto.code]?.toFixed(8) || '0.00000000'}
                    </option>
                  ))}
                </select>
              </div>

              <div className="text-center">
                <button
                  onClick={() => setConvertCryptoData({
                    fromCrypto: convertCryptoData.toCrypto,
                    toCrypto: convertCryptoData.fromCrypto,
                    amount: convertCryptoData.amount
                  })}
                  className="bg-purple-700 hover:bg-purple-600 p-2 rounded-full transition-colors"
                >
                  <Repeat size={24} />
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">To</label>
                <select
                  value={convertCryptoData.toCrypto}
                  onChange={(e) => setConvertCryptoData({...convertCryptoData, toCrypto: e.target.value})}
                  className="w-full bg-purple-700 text-white p-3 rounded border border-purple-600 focus:border-purple-400 focus:outline-none"
                >
                  {cryptoOptions.filter(c => c.code !== convertCryptoData.fromCrypto).map(crypto => (
                    <option key={crypto.code} value={crypto.code}>
                      {crypto.symbol} {crypto.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Amount to Convert</label>
                <input
                  type="number"
                  step="0.00000001"
                  value={convertCryptoData.amount}
                  onChange={(e) => setConvertCryptoData({...convertCryptoData, amount: e.target.value})}
                  className="w-full bg-purple-700 text-white p-3 rounded border border-purple-600 focus:border-purple-400 focus:outline-none"
                  placeholder="0.00000000"
                />
                <p className="text-sm text-purple-300 mt-1">
                  Available: {balances[convertCryptoData.fromCrypto]?.toFixed(8) || '0.00000000'} {convertCryptoData.fromCrypto}
                </p>
              </div>

              <div className="bg-blue-900 bg-opacity-40 rounded-lg p-4 border border-blue-600">
                <div className="flex justify-between mb-2">
                  <span>You Send:</span>
                  <span className="font-bold">{convertCryptoData.amount || '0'} {convertCryptoData.fromCrypto}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>You Receive (est):</span>
                  <span className="font-bold text-green-400">
                    {calculateCryptoConversion(convertCryptoData.amount, convertCryptoData.fromCrypto, convertCryptoData.toCrypto)} {convertCryptoData.toCrypto}
                  </span>
                </div>
                <div className="flex justify-between border-t border-blue-700 pt-2 text-sm">
                  <span>Rate:</span>
                  <span>1 {convertCryptoData.fromCrypto} = {(cryptoPrices[convertCryptoData.fromCrypto] / cryptoPrices[convertCryptoData.toCrypto]).toFixed(8)} {convertCryptoData.toCrypto}</span>
                </div>
              </div>

              <button
                onClick={handleConvertCrypto}
                disabled={loading || !convertCryptoData.amount}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed py-3 rounded-lg font-medium transition-colors"
              >
                {loading ? 'Processing...' : 'Convert Now'}
              </button>
            </div>
          </div>
        </div>
      )}
      {showCryptoToCashModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-purple-800 rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Convert Crypto to Cash</h3>
              <button onClick={() => setShowCryptoToCashModal(false)} className="text-purple-300 hover:text-white">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Select Crypto</label>
                <select
                  value={cryptoToCashData.crypto}
                  onChange={(e) => setCryptoToCashData({...cryptoToCashData, crypto: e.target.value})}
                  className="w-full bg-purple-700 text-white p-3 rounded border border-purple-600 focus:border-purple-400 focus:outline-none"
                >
                  {cryptoOptions.map(crypto => (
                    <option key={crypto.code} value={crypto.code}>
                      {crypto.symbol} {crypto.name} - {balances[crypto.code]?.toFixed(8) || '0.00000000'}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Amount</label>
                <input
                  type="number"
                  step="0.00000001"
                  value={cryptoToCashData.amount}
                  onChange={(e) => setCryptoToCashData({...cryptoToCashData, amount: e.target.value})}
                  className="w-full bg-purple-700 text-white p-3 rounded border border-purple-600 focus:border-purple-400 focus:outline-none"
                  placeholder="0.00000000"
                />
                <p className="text-sm text-purple-300 mt-1">
                  Available: {balances[cryptoToCashData.crypto]?.toFixed(8) || '0.00000000'} {cryptoToCashData.crypto}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Convert To</label>
                <select
                  value={cryptoToCashData.currency}
                  onChange={(e) => setCryptoToCashData({...cryptoToCashData, currency: e.target.value})}
                  className="w-full bg-purple-700 text-white p-3 rounded border border-purple-600 focus:border-purple-400 focus:outline-none"
                >
                  {currencies.map(curr => (
                    <option key={curr.code} value={curr.code}>
                      {curr.flag} {curr.code} - {curr.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Withdrawal Method</label>
                <select
                  value={cryptoToCashData.withdrawMethod}
                  onChange={(e) => setCryptoToCashData({...cryptoToCashData, withdrawMethod: e.target.value})}
                  className="w-full bg-purple-700 text-white p-3 rounded border border-purple-600 focus:border-purple-400 focus:outline-none"
                >
                  <option value="bank">Bank Transfer</option>
                  <option value="card">Debit Card</option>
                  <option value="mobile">Mobile Money</option>
                </select>
              </div>

              <div className="bg-blue-900 bg-opacity-40 rounded-lg p-4 border border-blue-600">
                <div className="flex justify-between mb-2">
                  <span>You Send:</span>
                  <span className="font-bold">{cryptoToCashData.amount || '0'} {cryptoToCashData.crypto}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>You Receive (est):</span>
                  <span className="font-bold text-green-400">
                    {formatCurrency(
                      calculateCryptoToCash(cryptoToCashData.amount, cryptoToCashData.crypto, cryptoToCashData.currency),
                      cryptoToCashData.currency
                    )}
                  </span>
                </div>
                <div className="flex justify-between border-t border-blue-700 pt-2 text-sm">
                  <span>Rate:</span>
                  <span>1 {cryptoToCashData.crypto} = {formatCurrency(cryptoPrices[cryptoToCashData.crypto] * (exchangeRates[cryptoToCashData.currency] || 1), cryptoToCashData.currency)}</span>
                </div>
              </div>

              <button
                onClick={handleCryptoToCash}
                disabled={loading || !cryptoToCashData.amount}
                className="w-full bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 disabled:cursor-not-allowed py-3 rounded-lg font-medium transition-colors"
              >
                {loading ? 'Processing...' : 'Withdraw to Bank'}
              </button>
            </div>
          </div>
        </div>
      )}
      {showPinModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-purple-800 rounded-lg p-6 max-w-sm w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Verify PIN</h3>
              <button onClick={() => setShowPinModal(false)} className="text-purple-300 hover:text-white">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Enter Your PIN</label>
                <input
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="w-full bg-purple-700 text-white p-3 rounded border border-purple-600 focus:border-purple-400 focus:outline-none text-center text-2xl tracking-widest"
                  placeholder="••••"
                  maxLength={4}
                />
                <p className="text-xs text-purple-300 mt-2 text-center">Demo PIN: 1234</p>
              </div>

              <button
                onClick={handlePinVerification}
                className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-lg font-medium transition-colors"
              >
                Verify
              </button>
            </div>
          </div>
        </div>
      )}

      {showKYCUpgrade && <KYCUpgradeModal />}
      {showAddBankModal && <AddBankAccountModal />}
      {showCreateWalletModal && <CreateWalletModal />}
      {showTopUpCardModal && <TopUpCardModal />}
      {showCardHistoryModal && <CardHistoryModal />}
       <ActivateCardModal 
        showActivateCardModal={showActivateCardModal}
        setShowActivateCardModal={setShowActivateCardModal}
        activateData={activateData}
        setActivateData={setActivateData}
        onSuccess={async () => {
          await loadRealDataFromBackend();
          await loadWallets();
          await loadTransactions();
          if (!user) {
            setShowLandingPage(false);
          }
        }}
      />
    </div>
  );
};
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GlobalPayApp />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/company" element={<CompanyPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/legal" element={<LegalPage />} />
        <Route path="/send-money" element={<SendMoneyPage />} />
        <Route path="/crypto-cards" element={<CryptoCardsPage />} />
        <Route path="/digital-wallets" element={<DigitalWalletsPage />} />
        <Route path="/business-solutions" element={<BusinessSolutionsPage />} />
        <Route path="/api-documentation" element={<APIDocumentationPage />} />
        <Route path="/security" element={<SecurityPage />} />
        <Route path="/terms-of-service" element={<TermsOfServicePage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/compliance" element={<CompliancePage />} />
        <Route path="/licenses" element={<LicensePage />} />
        <Route path="/press" element={<PressPage />} />
        <Route path="/investors" element={<InvestorsPage />} />
        <Route path="/help-center" element={<HelpCenterPage />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
      </Routes>
    </Router>
  );
}

export default App;