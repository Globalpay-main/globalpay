// src/config/constants.js - Application Constants

module.exports = {
  // =====================================================
  // CARD CONFIGURATION
  // =====================================================
  
  // Card denominations in USD
  CARD_DENOMINATIONS: {
    FIFTY: 50,
    HUNDRED: 100,
    TWO_HUNDRED: 200,
    FIVE_HUNDRED: 500
  },
  
  // Card prefixes for easy identification (first 2 digits)
  CARD_PREFIXES: {
    50: '05',
    100: '10',
    200: '20',
    500: '50'
  },
  
  // Card number format: PREFIX + 10 random digits
  CARD_NUMBER_LENGTH: 12,
  CARD_PIN_LENGTH: 4,
  
  // Card expiry (1 year from generation)
  CARD_EXPIRY_DAYS: 365,
  
  // Maximum activation attempts before card is blocked
  MAX_ACTIVATION_ATTEMPTS: 3,
  
  // =====================================================
  // USER ROLES
  // =====================================================
  
  USER_ROLES: {
    CUSTOMER: 'customer',
    RETAIL_STORE: 'retail_store',
    ADMIN: 'admin',
    SUPER_ADMIN: 'super_admin'
  },
  
  // =====================================================
  // CARD STATUSES
  // =====================================================
  
  CARD_STATUS: {
    GENERATED: 'generated',           // Just created, not assigned
    ASSIGNED_TO_STORE: 'assigned_to_store', // Assigned to retail store
    SOLD: 'sold',                     // Store marked as sold, awaiting payment
    ACTIVATED: 'activated',           // User activated successfully
    USED: 'used',                     // Card balance fully spent
    EXPIRED: 'expired',               // Past expiry date
    BLOCKED: 'blocked'                // Too many failed attempts or admin blocked
  },
  
  // =====================================================
  // TRANSACTION TYPES
  // =====================================================
  
  TRANSACTION_TYPES: {
    CARD_ACTIVATION: 'card_activation',
    CRYPTO_PURCHASE: 'crypto_purchase',
    CRYPTO_SEND: 'crypto_send',
    CRYPTO_RECEIVE: 'crypto_receive',
    CRYPTO_CONVERT: 'crypto_convert',
    FIAT_WITHDRAWAL: 'fiat_withdrawal',
    MONEY_TRANSFER: 'money_transfer',
    CARD_TOPUP: 'card_topup'
  },
  
  // =====================================================
  // TRANSACTION STATUSES
  // =====================================================
  
  TRANSACTION_STATUS: {
    PENDING: 'pending',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    CANCELLED: 'cancelled'
  },
  
  // =====================================================
  // KYC CONFIGURATION
  // =====================================================
  
  KYC_LEVELS: {
    NONE: 'none',           // No KYC
    BASIC: 'basic',         // Email + Phone verified
    FULL: 'full',           // Basic + ID verification
    ENHANCED: 'enhanced'    // Full + Advanced verification
  },
  
  KYC_STATUS: {
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    UNDER_REVIEW: 'under_review'
  },
  
  // Spending limits by KYC level (USD)
  SPENDING_LIMITS: {
    none: { 
      daily: 0, 
      monthly: 0,
      perTransaction: 0
    },
    basic: { 
      daily: 900, 
      monthly: 5000,
      perTransaction: 500
    },
    full: { 
      daily: 10000, 
      monthly: 50000,
      perTransaction: 5000
    },
    enhanced: { 
      daily: 50000, 
      monthly: 200000,
      perTransaction: 25000
    }
  },
  
  // =====================================================
  // SUPPORTED CRYPTOCURRENCIES
  // =====================================================
  
  SUPPORTED_CRYPTOS: ['BTC', 'ETH', 'USDT', 'USDC', 'BNB', 'XRP'],
  
  CRYPTO_NAMES: {
    BTC: 'Bitcoin',
    ETH: 'Ethereum',
    USDT: 'Tether',
    USDC: 'USD Coin',
    BNB: 'Binance Coin',
    XRP: 'Ripple'
  },
  
  // Minimum transaction amounts
  MIN_CRYPTO_AMOUNTS: {
    BTC: 0.00001,
    ETH: 0.0001,
    USDT: 1,
    USDC: 1,
    BNB: 0.001,
    XRP: 1
  },
  
  // =====================================================
  // SUPPORTED FIAT CURRENCIES
  // =====================================================
  
  SUPPORTED_FIATS: [
    'USD', 'EUR', 'GBP', 'NGN', 'GHS', 'KES', 
    'ZAR', 'BRL', 'INR', 'XAF', 'XOF', 'PKR'
  ],
  
  FIAT_NAMES: {
    USD: 'US Dollar',
    EUR: 'Euro',
    GBP: 'British Pound',
    NGN: 'Nigerian Naira',
    GHS: 'Ghanaian Cedi',
    KES: 'Kenyan Shilling',
    ZAR: 'South African Rand',
    BRL: 'Brazilian Real',
    INR: 'Indian Rupee',
    XAF: 'Central African CFA Franc',
    XOF: 'West African CFA Franc',
    PKR: 'Pakistani Rupee'
  },
  
  // =====================================================
  // FEE STRUCTURE
  // =====================================================
  
  FEES: {
    // Card activation markup (5% on BTC purchase)
    CARD_ACTIVATION_MARKUP: 0.05,
    
    // Crypto transaction fees
    CRYPTO_SEND_PERCENTAGE: 0.001,      // 0.1%
    CRYPTO_CONVERT_PERCENTAGE: 0.01,    // 1%
    
    // Fiat transaction fees
    FIAT_WITHDRAWAL_FLAT: 2.00,         // $2 flat fee
    INTERNATIONAL_TRANSFER_FLAT: 2.00,   // $2 flat fee
    DOMESTIC_TRANSFER_FLAT: 0.00,        // Free
    
    // Minimum fees
    MIN_CRYPTO_FEE: 0.00001,
    MIN_FIAT_FEE: 0.50
  },
  
  // =====================================================
  // PAYMENT METHODS
  // =====================================================
  
  PAYMENT_METHODS: {
    CRYPTO: 'crypto',
    BANK_TRANSFER: 'bank',
    DEBIT_CARD: 'card',
    CREDIT_CARD: 'card',
    MOBILE_MONEY: 'mobile'
  },
  
  // =====================================================
  // STORE PAYMENT STATUS
  // =====================================================
  
  STORE_PAYMENT_STATUS: {
    PENDING: 'pending',
    PAID: 'paid',
    OVERDUE: 'overdue',
    PARTIAL: 'partial'
  },
  
  // =====================================================
  // API RATE LIMITS
  // =====================================================
  
  RATE_LIMITS: {
    // General API endpoints
    GENERAL: {
      windowMs: 15 * 60 * 1000,  // 15 minutes
      max: 100                    // 100 requests per window
    },
    
    // Auth endpoints (stricter)
    AUTH: {
      windowMs: 15 * 60 * 1000,  // 15 minutes
      max: 5                      // 5 attempts per window
    },
    
    // Card activation (very strict)
    CARD_ACTIVATION: {
      windowMs: 60 * 60 * 1000,  // 1 hour
      max: 10                     // 10 attempts per hour
    }
  },
  
  // =====================================================
  // VALIDATION RULES
  // =====================================================
  
  VALIDATION: {
    // Password requirements
    PASSWORD_MIN_LENGTH: 8,
    PASSWORD_REQUIRES_UPPERCASE: true,
    PASSWORD_REQUIRES_LOWERCASE: true,
    PASSWORD_REQUIRES_NUMBER: true,
    PASSWORD_REQUIRES_SPECIAL: false,
    
    // Email
    EMAIL_MAX_LENGTH: 255,
    
    // Phone
    PHONE_MIN_LENGTH: 10,
    PHONE_MAX_LENGTH: 20,
    
    // Names
    NAME_MIN_LENGTH: 2,
    NAME_MAX_LENGTH: 100,
    
    // Amounts
    MIN_TRANSFER_AMOUNT: 1,
    MAX_TRANSFER_AMOUNT_NO_KYC: 900
  },
  
  // =====================================================
  // JWT CONFIGURATION
  // =====================================================
  
  JWT: {
    ACCESS_TOKEN_EXPIRY: '24h',
    REFRESH_TOKEN_EXPIRY: '7d',
    ISSUER: 'globalpay-api',
    AUDIENCE: 'globalpay-app'
  },
  
  // =====================================================
  // ERROR CODES
  // =====================================================
  
  ERROR_CODES: {
    // Authentication errors
    AUTH_INVALID_CREDENTIALS: 'AUTH_001',
    AUTH_TOKEN_EXPIRED: 'AUTH_002',
    AUTH_TOKEN_INVALID: 'AUTH_003',
    AUTH_UNAUTHORIZED: 'AUTH_004',
    
    // Card errors
    CARD_NOT_FOUND: 'CARD_001',
    CARD_ALREADY_ACTIVATED: 'CARD_002',
    CARD_EXPIRED: 'CARD_003',
    CARD_BLOCKED: 'CARD_004',
    CARD_INVALID_PIN: 'CARD_005',
    CARD_NOT_SOLD: 'CARD_006',
    
    // User errors
    USER_NOT_FOUND: 'USER_001',
    USER_ALREADY_EXISTS: 'USER_002',
    USER_BLOCKED: 'USER_003',
    USER_KYC_REQUIRED: 'USER_004',
    
    // Transaction errors
    TRANSACTION_INSUFFICIENT_BALANCE: 'TXN_001',
    TRANSACTION_LIMIT_EXCEEDED: 'TXN_002',
    TRANSACTION_FAILED: 'TXN_003',
    
    // System errors
    SYSTEM_ERROR: 'SYS_001',
    DATABASE_ERROR: 'SYS_002',
    EXTERNAL_API_ERROR: 'SYS_003'
  },
  
  // =====================================================
  // SYSTEM MESSAGES
  // =====================================================
  
  MESSAGES: {
    SUCCESS: {
      CARD_ACTIVATED: 'Card activated successfully! BTC has been credited to your wallet.',
      TRANSACTION_COMPLETED: 'Transaction completed successfully.',
      PROFILE_UPDATED: 'Profile updated successfully.',
      KYC_SUBMITTED: 'KYC documents submitted for review.'
    },
    
    ERROR: {
      INVALID_CARD: 'Invalid card number or PIN.',
      CARD_EXPIRED: 'This card has expired.',
      INSUFFICIENT_BALANCE: 'Insufficient balance for this transaction.',
      LIMIT_EXCEEDED: 'Transaction limit exceeded. Please complete KYC verification.',
      SYSTEM_ERROR: 'Something went wrong. Please try again later.'
    }
  }
};