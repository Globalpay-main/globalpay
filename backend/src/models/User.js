// backend/models/User.js - User Model (Complete Fixed Version)
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [50, 'Last name cannot exceed 50 characters']
  },
  email: {
    type: String,
    unique: true,
    sparse: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      },
      message: 'Please provide a valid email address'
    }
  },
  phone: {
    type: String,
    unique: true,
    sparse: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long']
  },
  signupMethod: {
    type: String,
    enum: ['email', 'phone'],
    required: [true, 'Signup method is required']
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationToken: String,
  verificationExpires: Date,
  kycLevel: {
    type: String,
    enum: ['none', 'minimal', 'full'],
    default: 'none'
  },
  kycData: {
    dateOfBirth: Date,
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      zipCode: String
    },
    governmentId: {
      type: String,
      number: String,
      verified: { type: Boolean, default: false }
    },
    phoneVerified: { type: Boolean, default: false },
    emailVerified: { type: Boolean, default: false }
  },
  totalTransactionAmount: {
    type: Number,
    default: 0
  },
  // Blockchain integration fields
  walletAddress: {
    type: String,
    unique: true,
    sparse: true
  },
  privateKeyEncrypted: String,
  blockchainTransactions: [{
    txHash: String,
    blockNumber: Number,
    amount: String,
    tokenAddress: String,
    timestamp: Date,
    type: { type: String, enum: ['send', 'receive', 'mint', 'burn'] }
  }],
  wallets: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CryptoWallet'
  }],
  activatedCards: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CryptoGiftCard'
  }],
  complianceFlags: [{
    flag: String,
    timestamp: { type: Date, default: Date.now },
    reason: String,
    reviewed: { type: Boolean, default: false }
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  isComplianceOfficer: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Indexes for performance
userSchema.index({ email: 1 });
userSchema.index({ phone: 1 });
userSchema.index({ walletAddress: 1 });
userSchema.index({ isVerified: 1 });
userSchema.index({ kycLevel: 1 });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Generate verification token
userSchema.methods.generateVerificationToken = function() {
  const token = crypto.randomBytes(32).toString('hex');
  this.verificationToken = token;
  this.verificationExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
  return token;
};

// Check if user can perform transaction based on KYC level
userSchema.methods.canPerformTransaction = function(amount) {
  if (this.kycLevel === 'full') return true;
  if (this.kycLevel === 'minimal') {
    return (this.totalTransactionAmount + amount) <= 900;
  }
  return false;
};

// Get remaining transaction limit
userSchema.methods.getRemainingLimit = function() {
  if (this.kycLevel === 'full') return Infinity;
  if (this.kycLevel === 'minimal') {
    return Math.max(0, 900 - this.totalTransactionAmount);
  }
  return 0;
};

// Add blockchain transaction record
userSchema.methods.addBlockchainTransaction = function(txData) {
  this.blockchainTransactions.push({
    txHash: txData.hash,
    blockNumber: txData.blockNumber,
    amount: txData.amount,
    tokenAddress: txData.tokenAddress,
    timestamp: new Date(),
    type: txData.type
  });
  return this.save();
};

module.exports = mongoose.model('User', userSchema);