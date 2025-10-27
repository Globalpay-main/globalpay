// src/utils/validators.js - Input validation utilities
const { body, param, query, validationResult } = require('express-validator');
const { CARD_DENOMINATIONS, SUPPORTED_CRYPTOS, SUPPORTED_FIATS } = require('../config/constants');

/**
 * Middleware to check validation results
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 * @param {Function} next - Next middleware
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: errors.array().map(err => ({
        field: err.path || err.param,
        message: err.msg
      }))
    });
  }
  
  next();
};

/**
 * Validation rules for user signup
 */
const signupValidation = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Valid email is required')
    .normalizeEmail()
    .isLength({ max: 255 })
    .withMessage('Email must be less than 255 characters'),
  
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter')
    .matches(/[a-z]/)
    .withMessage('Password must contain at least one lowercase letter')
    .matches(/[0-9]/)
    .withMessage('Password must contain at least one number'),
  
  body('firstName')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('First name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z\s-]+$/)
    .withMessage('First name can only contain letters, spaces, and hyphens'),
  
  body('lastName')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Last name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z\s-]+$/)
    .withMessage('Last name can only contain letters, spaces, and hyphens'),
  
  body('phone')
    .optional()
    .trim()
    .matches(/^\+?[1-9]\d{9,19}$/)
    .withMessage('Valid phone number is required (10-20 digits)'),
  
  body('country')
    .optional()
    .isLength({ min: 2, max: 2 })
    .withMessage('Country code must be 2 characters (ISO 3166-1 alpha-2)')
];

/**
 * Validation rules for user login
 */
const loginValidation = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Valid email is required')
    .normalizeEmail(),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

/**
 * Validation rules for card activation
 */
const cardActivationValidation = [
  body('cardNumber')
    .trim()
    .matches(/^\d{12}$/)
    .withMessage('Card number must be exactly 12 digits'),
  
  body('pin')
    .trim()
    .matches(/^\d{4}$/)
    .withMessage('PIN must be exactly 4 digits')
];

/**
 * Validation rules for card generation (admin)
 */
const cardGenerationValidation = [
  body('denomination')
    .isInt()
    .withMessage('Denomination must be an integer')
    .custom((value) => {
      const validDenominations = Object.values(CARD_DENOMINATIONS);
      if (!validDenominations.includes(parseInt(value))) {
        throw new Error(`Denomination must be one of: ${validDenominations.join(', ')}`);
      }
      return true;
    }),
  
  body('quantity')
    .isInt({ min: 1, max: 1000 })
    .withMessage('Quantity must be between 1 and 1000'),
  
  body('assignToStore')
    .optional()
    .isUUID()
    .withMessage('Store ID must be a valid UUID')
];

/**
 * Validation rules for crypto send
 */
const cryptoSendValidation = [
  body('crypto')
    .trim()
    .toUpperCase()
    .isIn(SUPPORTED_CRYPTOS)
    .withMessage(`Cryptocurrency must be one of: ${SUPPORTED_CRYPTOS.join(', ')}`),
  
  body('recipientAddress')
    .trim()
    .notEmpty()
    .withMessage('Recipient address is required')
    .isLength({ min: 26, max: 100 })
    .withMessage('Invalid wallet address format'),
  
  body('amount')
    .isFloat({ min: 0.00000001 })
    .withMessage('Amount must be a positive number'),
  
  body('note')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Note must be less than 500 characters')
];

/**
 * Validation rules for crypto conversion
 */
const cryptoConvertValidation = [
  body('fromCrypto')
    .trim()
    .toUpperCase()
    .isIn(SUPPORTED_CRYPTOS)
    .withMessage(`From cryptocurrency must be one of: ${SUPPORTED_CRYPTOS.join(', ')}`),
  
  body('toCrypto')
    .trim()
    .toUpperCase()
    .isIn(SUPPORTED_CRYPTOS)
    .withMessage(`To cryptocurrency must be one of: ${SUPPORTED_CRYPTOS.join(', ')}`)
    .custom((value, { req }) => {
      if (value === req.body.fromCrypto) {
        throw new Error('Cannot convert to the same cryptocurrency');
      }
      return true;
    }),
  
  body('amount')
    .isFloat({ min: 0.00000001 })
    .withMessage('Amount must be a positive number')
];

/**
 * Validation rules for fiat withdrawal
 */
const fiatWithdrawalValidation = [
  body('crypto')
    .trim()
    .toUpperCase()
    .isIn(SUPPORTED_CRYPTOS)
    .withMessage(`Cryptocurrency must be one of: ${SUPPORTED_CRYPTOS.join(', ')}`),
  
  body('amount')
    .isFloat({ min: 0.00000001 })
    .withMessage('Amount must be a positive number'),
  
  body('currency')
    .trim()
    .toUpperCase()
    .isIn(SUPPORTED_FIATS)
    .withMessage(`Currency must be one of: ${SUPPORTED_FIATS.join(', ')}`),
  
  body('withdrawMethod')
    .trim()
    .toLowerCase()
    .isIn(['bank', 'card', 'mobile'])
    .withMessage('Withdrawal method must be: bank, card, or mobile')
];

/**
 * Validation rules for money transfer
 */
const moneyTransferValidation = [
  body('recipientEmail')
    .trim()
    .isEmail()
    .withMessage('Valid recipient email is required')
    .normalizeEmail(),
  
  body('fromCurrency')
    .trim()
    .toUpperCase()
    .isIn(SUPPORTED_FIATS)
    .withMessage(`From currency must be one of: ${SUPPORTED_FIATS.join(', ')}`),
  
  body('toCurrency')
    .trim()
    .toUpperCase()
    .isIn(SUPPORTED_FIATS)
    .withMessage(`To currency must be one of: ${SUPPORTED_FIATS.join(', ')}`),
  
  body('amount')
    .isFloat({ min: 1 })
    .withMessage('Amount must be at least 1'),
  
  body('transferType')
    .trim()
    .toLowerCase()
    .isIn(['domestic', 'international'])
    .withMessage('Transfer type must be: domestic or international'),
  
  body('message')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Message must be less than 500 characters')
];

/**
 * Validation rules for store registration
 */
const storeRegistrationValidation = [
  body('storeName')
    .trim()
    .isLength({ min: 3, max: 255 })
    .withMessage('Store name must be between 3 and 255 characters'),
  
  body('storeCode')
    .trim()
    .matches(/^[A-Z0-9]{4,10}$/)
    .withMessage('Store code must be 4-10 uppercase letters/numbers'),
  
  body('contactEmail')
    .trim()
    .isEmail()
    .withMessage('Valid contact email is required')
    .normalizeEmail(),
  
  body('contactPhone')
    .trim()
    .matches(/^\+?[1-9]\d{9,19}$/)
    .withMessage('Valid contact phone is required'),
  
  body('address')
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Address must be between 10 and 500 characters'),
  
  body('city')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('City must be between 2 and 100 characters'),
  
  body('country')
    .trim()
    .isLength({ min: 2, max: 2 })
    .withMessage('Country code must be 2 characters (ISO 3166-1 alpha-2)')
];

/**
 * Validation rules for store payment
 */
const storePaymentValidation = [
  body('amount')
    .isFloat({ min: 1 })
    .withMessage('Payment amount must be at least 1'),
  
  body('paymentMethod')
    .trim()
    .notEmpty()
    .withMessage('Payment method is required'),
  
  body('paymentReference')
    .trim()
    .notEmpty()
    .withMessage('Payment reference is required')
    .isLength({ max: 255 })
    .withMessage('Payment reference must be less than 255 characters'),
  
  body('cardIds')
    .isArray({ min: 1 })
    .withMessage('At least one card ID is required'),
  
  body('cardIds.*')
    .isUUID()
    .withMessage('Each card ID must be a valid UUID')
];

/**
 * Validation rules for KYC submission
 */
const kycSubmissionValidation = [
  body('dateOfBirth')
    .isISO8601()
    .withMessage('Valid date of birth is required (YYYY-MM-DD)')
    .custom((value) => {
      const age = Math.floor((new Date() - new Date(value)) / 31557600000);
      if (age < 18) {
        throw new Error('You must be at least 18 years old');
      }
      return true;
    }),
  
  body('country')
    .trim()
    .isLength({ min: 2, max: 2 })
    .withMessage('Country code must be 2 characters (ISO 3166-1 alpha-2)')
];

/**
 * Validation rules for profile update
 */
const profileUpdateValidation = [
  body('firstName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('First name must be between 2 and 100 characters'),
  
  body('lastName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Last name must be between 2 and 100 characters'),
  
  body('phone')
    .optional()
    .trim()
    .matches(/^\+?[1-9]\d{9,19}$/)
    .withMessage('Valid phone number is required'),
  
  body('dateOfBirth')
    .optional()
    .isISO8601()
    .withMessage('Valid date of birth is required (YYYY-MM-DD)')
];

/**
 * Validation rules for UUID parameter
 */
const uuidParamValidation = [
  param('id')
    .isUUID()
    .withMessage('Invalid ID format')
];

/**
 * Validation rules for pagination
 */
const paginationValidation = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  
  query('sort')
    .optional()
    .trim()
    .isIn(['asc', 'desc'])
    .withMessage('Sort must be: asc or desc')
];

module.exports = {
  validate,
  signupValidation,
  loginValidation,
  cardActivationValidation,
  cardGenerationValidation,
  cryptoSendValidation,
  cryptoConvertValidation,
  fiatWithdrawalValidation,
  moneyTransferValidation,
  storeRegistrationValidation,
  storePaymentValidation,
  kycSubmissionValidation,
  profileUpdateValidation,
  uuidParamValidation,
  paginationValidation
};