// src/utils/crypto.js - Cryptography utilities
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

// Encryption configuration
const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;
const SALT_ROUNDS = 12;
const AUTH_TAG_LENGTH = 16;

/**
 * Get encryption key from environment or generate error
 * @returns {Buffer}
 */
const getEncryptionKey = () => {
  const key = process.env.WALLET_ENCRYPTION_KEY;
  
  if (!key) {
    throw new Error('WALLET_ENCRYPTION_KEY not set in environment variables');
  }
  
  // Create a 32-byte key from the environment variable
  return crypto.createHash('sha256').update(key).digest();
};

/**
 * Encrypt sensitive data (bank accounts, card numbers, etc.)
 * @param {string} text - Text to encrypt
 * @returns {string} Encrypted string in format: iv:authTag:encryptedData
 */
const encrypt = (text) => {
  try {
    const key = getEncryptionKey();
    const iv = crypto.randomBytes(IV_LENGTH);
    
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
    
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const authTag = cipher.getAuthTag();
    
    // Return format: iv:authTag:encryptedData
    return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
  } catch (error) {
    console.error('Encryption error:', error.message);
    throw new Error('Failed to encrypt data');
  }
};

/**
 * Decrypt sensitive data
 * @param {string} encryptedText - Encrypted string in format: iv:authTag:encryptedData
 * @returns {string} Decrypted text
 */
const decrypt = (encryptedText) => {
  try {
    const key = getEncryptionKey();
    const parts = encryptedText.split(':');
    
    if (parts.length !== 3) {
      throw new Error('Invalid encrypted data format');
    }
    
    const iv = Buffer.from(parts[0], 'hex');
    const authTag = Buffer.from(parts[1], 'hex');
    const encrypted = parts[2];
    
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(authTag);
    
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  } catch (error) {
    console.error('Decryption error:', error.message);
    throw new Error('Failed to decrypt data');
  }
};

/**
 * Hash password using bcrypt
 * @param {string} password - Plain text password
 * @returns {Promise<string>} Hashed password
 */
const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    console.error('Password hashing error:', error.message);
    throw new Error('Failed to hash password');
  }
};

/**
 * Compare password with hash
 * @param {string} password - Plain text password
 * @param {string} hash - Hashed password
 * @returns {Promise<boolean>}
 */
const comparePassword = async (password, hash) => {
  try {
    return await bcrypt.compare(password, hash);
  } catch (error) {
    console.error('Password comparison error:', error.message);
    return false;
  }
};

/**
 * Hash card PIN (4-digit number)
 * @param {string} pin - 4-digit PIN
 * @returns {Promise<string>} Hashed PIN
 */
const hashPin = async (pin) => {
  try {
    // Validate PIN is 4 digits
    if (!/^\d{4}$/.test(pin)) {
      throw new Error('PIN must be exactly 4 digits');
    }
    
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hash = await bcrypt.hash(pin, salt);
    return hash;
  } catch (error) {
    console.error('PIN hashing error:', error.message);
    throw new Error('Failed to hash PIN');
  }
};

/**
 * Compare PIN with hash
 * @param {string} pin - 4-digit PIN
 * @param {string} hash - Hashed PIN
 * @returns {Promise<boolean>}
 */
const comparePin = async (pin, hash) => {
  try {
    return await bcrypt.compare(pin, hash);
  } catch (error) {
    console.error('PIN comparison error:', error.message);
    return false;
  }
};

/**
 * Generate random card number with denomination prefix
 * @param {number} denomination - Card denomination (50, 100, 200, 500)
 * @returns {string} 12-digit card number
 */
const generateCardNumber = (denomination) => {
  const { CARD_PREFIXES } = require('./constants');
  
  const prefix = CARD_PREFIXES[denomination];
  if (!prefix) {
    throw new Error(`Invalid denomination: ${denomination}`);
  }
  
  // Generate 10 random digits
  let randomDigits = '';
  for (let i = 0; i < 10; i++) {
    randomDigits += Math.floor(Math.random() * 10);
  }
  
  return prefix + randomDigits;
};

/**
 * Generate random 4-digit PIN
 * @returns {string} 4-digit PIN
 */
const generatePin = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

/**
 * Generate unique batch ID for card generation
 * @returns {string} Batch ID in format: BATCH-YYYYMMDD-HHMMSS-RANDOM
 */
const generateBatchId = () => {
  const now = new Date();
  const date = now.toISOString().slice(0, 10).replace(/-/g, '');
  const time = now.toISOString().slice(11, 19).replace(/:/g, '');
  const random = crypto.randomBytes(4).toString('hex').toUpperCase();
  
  return `BATCH-${date}-${time}-${random}`;
};

/**
 * Generate random verification code (6 digits)
 * @returns {string} 6-digit code
 */
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * Generate secure random token
 * @param {number} length - Token length in bytes (default 32)
 * @returns {string} Hex token
 */
const generateToken = (length = 32) => {
  return crypto.randomBytes(length).toString('hex');
};

/**
 * Mask card number (show only last 4 digits)
 * @param {string} cardNumber - Full card number
 * @returns {string} Masked card number (e.g., "****1234")
 */
const maskCardNumber = (cardNumber) => {
  if (!cardNumber || cardNumber.length < 4) {
    return '****';
  }
  
  const lastFour = cardNumber.slice(-4);
  const masked = '*'.repeat(cardNumber.length - 4) + lastFour;
  
  // Format as groups of 4
  return masked.match(/.{1,4}/g).join(' ');
};

/**
 * Mask account number (show only last 4 digits)
 * @param {string} accountNumber - Full account number
 * @returns {string} Masked account number (e.g., "****5678")
 */
const maskAccountNumber = (accountNumber) => {
  if (!accountNumber || accountNumber.length < 4) {
    return '****';
  }
  
  const lastFour = accountNumber.slice(-4);
  return '****' + lastFour;
};

/**
 * Generate UUID v4
 * @returns {string} UUID
 */
const generateUUID = () => {
  return crypto.randomUUID();
};

/**
 * Create hash of data (for integrity checks)
 * @param {string} data - Data to hash
 * @param {string} algorithm - Hash algorithm (default: sha256)
 * @returns {string} Hex hash
 */
const createHash = (data, algorithm = 'sha256') => {
  return crypto.createHash(algorithm).update(data).digest('hex');
};

/**
 * Generate HMAC signature
 * @param {string} data - Data to sign
 * @param {string} secret - Secret key
 * @returns {string} HMAC signature
 */
const generateHMAC = (data, secret) => {
  return crypto.createHmac('sha256', secret).update(data).digest('hex');
};

/**
 * Verify HMAC signature
 * @param {string} data - Original data
 * @param {string} signature - HMAC signature to verify
 * @param {string} secret - Secret key
 * @returns {boolean}
 */
const verifyHMAC = (data, signature, secret) => {
  const expectedSignature = generateHMAC(data, secret);
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
};

module.exports = {
  encrypt,
  decrypt,
  hashPassword,
  comparePassword,
  hashPin,
  comparePin,
  generateCardNumber,
  generatePin,
  generateBatchId,
  generateVerificationCode,
  generateToken,
  maskCardNumber,
  maskAccountNumber,
  generateUUID,
  createHash,
  generateHMAC,
  verifyHMAC
};