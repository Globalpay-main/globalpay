// backend/models/CryptoGiftCard.js - Crypto Gift Card Model
const mongoose = require('mongoose');
const crypto = require('crypto');

const cryptoGiftCardSchema = new mongoose.Schema({
  cardNumber: {
    type: String,
    required: true,
    unique: true,
    length: 12,
    validate: {
      validator: function(cardNumber) {
        return /^\d{12}$/.test(cardNumber);
      },
      message: 'Card number must be exactly 12 digits'
    }
  },
  pin: {
    type: String,
    validate: {
      validator: function(pin) {
        // Only validate if pin is present (for creation)
        return !pin || /^\d{4}$/.test(pin);
      },
      message: 'PIN must be exactly 4 digits'
    }
  },
  pinHash: {
    type: String,
    required: true
  },
  valueUSD: {
    type: Number,
    required: true,
    enum: [50, 100, 200, 500],
    validate: {
      validator: function(value) {
        return [50, 100, 200, 500].includes(value);
      },
      message: 'Card value must be $50, $100, $200, or $500'
    }
  },
  prefix: {
    type: String,
    required: true,
    enum: ['05', '10', '20', '50'],
    validate: {
      validator: function(prefix) {
        const valueMap = { 50: '05', 100: '10', 200: '20', 500: '50' };
        return valueMap[this.valueUSD] === prefix;
      },
      message: 'Prefix must match card value'
    }
  },
  status: {
    type: String,
    enum: ['generated', 'activated', 'used', 'expired'],
    default: 'generated'
  },
  // Blockchain integration fields
  tokenId: {
    type: String,
    unique: true,
    sparse: true
  },
  mintTransactionHash: String,
  activationTransactionHash: String,
  burnTransactionHash: String,
  blockchainNetwork: {
    type: String,
    default: 'hardhat'
  },
  // User and activation data
  activatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  activatedAt: Date,
  walletCreated: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CryptoWallet'
  },
  kycRequired: {
    type: Boolean,
    default: true
  },
  // Compliance and security
  generatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  batchId: String,
  expiresAt: {
    type: Date,
    default: function() {
      return new Date(Date.now() + 365 * 24 * 60 * 60 * 1000); // 1 year from creation
    }
  },
  securityHash: String,
  ipAddress: String,
  userAgent: String
}, {
  timestamps: true
});

// Indexes for performance and uniqueness
cryptoGiftCardSchema.index({ cardNumber: 1 }, { unique: true });
cryptoGiftCardSchema.index({ tokenId: 1 }, { unique: true, sparse: true });
cryptoGiftCardSchema.index({ status: 1 });
cryptoGiftCardSchema.index({ valueUSD: 1 });
cryptoGiftCardSchema.index({ activatedBy: 1 });
cryptoGiftCardSchema.index({ expiresAt: 1 });
cryptoGiftCardSchema.index({ batchId: 1 });

// Virtual for masked card number display
cryptoGiftCardSchema.virtual('maskedCardNumber').get(function() {
  if (!this.cardNumber) return '';
  return `${this.cardNumber.slice(0, 4)} **** ${this.cardNumber.slice(-4)}`;
});

// Pre-save middleware to hash PIN
// In CryptoGiftCard model - fix the pre-save middleware
cryptoGiftCardSchema.pre('save', async function(next) {
  if (!this.isModified('pin') || !this.pin) return next();
  
  const bcrypt = require('bcryptjs');
  const salt = await bcrypt.genSalt(12);
  this.pinHash = await bcrypt.hash(this.pin, salt);
  // Don't set pin to undefined - leave it for validation
  next();
});

// Method to verify PIN
cryptoGiftCardSchema.methods.verifyPin = async function(candidatePin) {
  const bcrypt = require('bcryptjs');
  return bcrypt.compare(candidatePin, this.pinHash);
};

// Method to generate unique card number with prefix
cryptoGiftCardSchema.statics.generateCardNumber = async function(valueUSD) {
  const prefixMap = { 50: '05', 100: '10', 200: '20', 500: '50' };
  const prefix = prefixMap[valueUSD];
  
  if (!prefix) {
    throw new Error('Invalid card value');
  }
  
  let cardNumber;
  let attempts = 0;
  const maxAttempts = 1000;
  
  do {
    // Generate 10 random digits after the 2-digit prefix
    const randomDigits = crypto.randomBytes(5).toString('hex').slice(0, 10);
    const randomNumbers = randomDigits.split('').map(char => 
      parseInt(char, 16) % 10
    ).join('');
    
    cardNumber = prefix + randomNumbers;
    attempts++;
    
    if (attempts > maxAttempts) {
      throw new Error('Failed to generate unique card number');
    }
    
    // Check if this card number already exists
    const existing = await this.findOne({ cardNumber });
    if (!existing) break;
    
  } while (true);
  
  return cardNumber;
};

// Method to generate secure PIN
cryptoGiftCardSchema.statics.generatePin = function() {
  return crypto.randomInt(1000, 9999).toString().padStart(4, '0');
};

// Method to activate card
cryptoGiftCardSchema.methods.activate = async function(userId, transactionHash = null) {
  if (this.status !== 'generated') {
    throw new Error('Card is not in generated status');
  }
  
  if (this.expiresAt < new Date()) {
    throw new Error('Card has expired');
  }
  
  this.status = 'activated';
  this.activatedBy = userId;
  this.activatedAt = new Date();
  
  if (transactionHash) {
    this.activationTransactionHash = transactionHash;
  }
  
  return this.save();
};

// Method to check if card is expired
cryptoGiftCardSchema.methods.isExpired = function() {
  return this.expiresAt < new Date();
};

// Method to get card info for display
cryptoGiftCardSchema.methods.getDisplayInfo = function() {
  return {
    maskedCardNumber: this.maskedCardNumber,
    valueUSD: this.valueUSD,
    status: this.status,
    activatedAt: this.activatedAt,
    expiresAt: this.expiresAt,
    tokenId: this.tokenId
  };
};

// Static method to generate batch of cards
cryptoGiftCardSchema.statics.generateBatch = async function(valueUSD, count, generatedBy) {
  const cards = [];
  const batchId = crypto.randomUUID();
  
  for (let i = 0; i < count; i++) {
    const cardNumber = await this.generateCardNumber(valueUSD);
    const pin = this.generatePin();
    const prefixMap = { 50: '05', 100: '10', 200: '20', 500: '50' };
    
    const cardData = {
      cardNumber,
      pin, // Will be hashed by pre-save middleware
      valueUSD,
      prefix: prefixMap[valueUSD],
      generatedBy,
      batchId,
      securityHash: crypto.createHash('sha256').update(`${cardNumber}${pin}${Date.now()}`).digest('hex')
    };
    
    // Create and save card - this will trigger the pre-save hook to hash the PIN
    const card = new this(cardData);
    await card.save();
    
    // Store the plain PIN temporarily for display purposes
    card.plainPin = pin;
    
    cards.push(card);
  }
  
  return { cards, batchId };
};

// Static method to get card statistics
cryptoGiftCardSchema.statics.getStatistics = async function() {
  const stats = await this.aggregate([
    {
      $group: {
        _id: {
          status: '$status',
          valueUSD: '$valueUSD'
        },
        count: { $sum: 1 },
        totalValue: { $sum: '$valueUSD' }
      }
    }
  ]);
  
  const summary = {
    total: await this.countDocuments(),
    byStatus: {},
    byValue: {},
    totalValue: 0
  };
  
  stats.forEach(stat => {
    const { status, valueUSD } = stat._id;
    
    if (!summary.byStatus[status]) {
      summary.byStatus[status] = { count: 0, value: 0 };
    }
    if (!summary.byValue[valueUSD]) {
      summary.byValue[valueUSD] = { count: 0, value: 0 };
    }
    
    summary.byStatus[status].count += stat.count;
    summary.byStatus[status].value += stat.totalValue;
    summary.byValue[valueUSD].count += stat.count;
    summary.byValue[valueUSD].value += stat.totalValue;
    summary.totalValue += stat.totalValue;
  });
  
  return summary;
};

module.exports = mongoose.model('CryptoGiftCard', cryptoGiftCardSchema);