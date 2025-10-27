// backend/models/CryptoWallet.js - Crypto Wallet Model with Working Encryption
const mongoose = require('mongoose');
const crypto = require('crypto');

const cryptoWalletSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  address: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(address) {
        return /^0x[a-fA-F0-9]{40}$/.test(address);
      },
      message: 'Invalid Ethereum address format'
    }
  },
  // Encrypted private key (never store plain text)
  encryptedPrivateKey: {
    type: String,
    required: true
  },
  // Key derivation info
  derivationPath: String,
  mnemonic: String, // Encrypted if stored
  
  // Wallet type and source
  walletType: {
    type: String,
    enum: ['generated', 'imported', 'hardware'],
    default: 'generated'
  },
  createdFrom: {
    type: String,
    enum: ['gift_card', 'manual', 'kyc_completion'],
    required: true
  },
  sourceCardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CryptoGiftCard'
  },
  
  // Blockchain network info
  network: {
    type: String,
    default: 'hardhat',
    enum: ['mainnet', 'goerli', 'sepolia', 'hardhat', 'polygon', 'bsc']
  },
  chainId: {
    type: Number,
    default: 31337 // Hardhat default
  },
  
  // Balance tracking
  balances: {
    ETH: {
      type: String,
      default: '0'
    },
    USDC: {
      type: String,
      default: '0'
    },
    USDT: {
      type: String,
      default: '0'
    },
    // Add other tokens as needed
  },
  
  // Token configurations
  supportedTokens: [{
    symbol: String,
    contractAddress: String,
    decimals: Number,
    balance: {
      type: String,
      default: '0'
    }
  }],
  
  // Transaction history
  transactions: [{
    hash: String,
    type: {
      type: String,
      enum: ['send', 'receive', 'mint', 'burn', 'approve', 'swap']
    },
    token: String,
    amount: String,
    to: String,
    from: String,
    blockNumber: Number,
    timestamp: Date,
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'failed'],
      default: 'pending'
    },
    gasUsed: String,
    gasPrice: String
  }],
  
  // Security and compliance
  isActive: {
    type: Boolean,
    default: true
  },
  frozenUntil: Date,
  freezeReason: String,
  
  // Last sync with blockchain
  lastSyncBlock: {
    type: Number,
    default: 0
  },
  lastSyncAt: Date,
  
  // Compliance flags
  kycVerified: {
    type: Boolean,
    default: false
  },
  maxDailyLimit: {
    type: Number,
    default: 900 // $900 for minimal KYC
  },
  dailySpent: {
    type: Number,
    default: 0
  },
  lastResetDate: Date,
  
  // Metadata
  label: String,
  description: String,
  tags: [String]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes - Remove duplicate index warning
cryptoWalletSchema.index({ owner: 1 });
cryptoWalletSchema.index({ network: 1 });
cryptoWalletSchema.index({ walletType: 1 });
cryptoWalletSchema.index({ createdFrom: 1 });
cryptoWalletSchema.index({ isActive: 1 });
cryptoWalletSchema.index({ 'transactions.hash': 1 });

// Virtual for total USD value (calculated)
cryptoWalletSchema.virtual('totalUSDValue').get(function() {
  // This would calculate based on current exchange rates
  // For now, return a placeholder
  return 0;
});

// Virtual for formatted address
cryptoWalletSchema.virtual('shortAddress').get(function() {
  if (!this.address) return '';
  return `${this.address.slice(0, 6)}...${this.address.slice(-4)}`;
});

// WORKING ENCRYPTION METHODS - Compatible with Node.js crypto API
cryptoWalletSchema.methods.encryptPrivateKey = function(privateKey, password) {
    try {
        // Simple but secure encryption using Node.js crypto
        const algorithm = 'aes-256-cbc';
        
        // Generate salt and derive key
        const salt = crypto.randomBytes(32);
        const key = crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha256');
        const iv = crypto.randomBytes(16);
        
        // Create cipher using correct Node.js API
        // Create cipher using correct Node.js API  
        const cipher = crypto.createCipheriv(algorithm, key, iv);
        let encrypted = cipher.update(privateKey, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        
        // Combine with metadata
        return {
            encrypted: iv.toString('hex') + ':' + encrypted,
            salt: salt.toString('hex'),
            algorithm: 'aes-256-cbc',
            iterations: 100000
        };
    } catch (error) {
        console.error('Encryption error:', error);
        throw new Error('Failed to encrypt private key');
    }
};

cryptoWalletSchema.methods.decryptPrivateKey = function(encryptedData, password) {
    try {
        // Handle both string and object formats
        let data = encryptedData;
        if (typeof encryptedData === 'string') {
            try {
                data = JSON.parse(encryptedData);
            } catch (e) {
                throw new Error('Invalid encrypted data format');
            }
        }
        
        // Extract IV and encrypted text
        const parts = data.encrypted.split(':');
        if (parts.length !== 2) {
            throw new Error('Invalid encrypted data format');
        }
        
        const iv = Buffer.from(parts[0], 'hex');
        const encryptedText = parts[1];
        
        // Derive key
        const salt = Buffer.from(data.salt, 'hex');
        const key = crypto.pbkdf2Sync(password, salt, data.iterations || 100000, 32, 'sha256');
        
        // Decrypt using correct Node.js API
        const decipher = crypto.createDecipheriv(data.algorithm || 'aes-256-cbc', key, iv);
        let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        
        return decrypted;
    } catch (error) {
        console.error('Decryption error:', error);
        throw new Error('Failed to decrypt private key - invalid password or corrupted data');
    }
};

// Method to safely set encrypted private key
cryptoWalletSchema.methods.setEncryptedPrivateKey = function(privateKey, password) {
    const encryptedData = this.encryptPrivateKey(privateKey, password);
    this.encryptedPrivateKey = JSON.stringify(encryptedData);
    return this;
};

// Method to safely get decrypted private key
cryptoWalletSchema.methods.getDecryptedPrivateKey = function(password) {
    return this.decryptPrivateKey(this.encryptedPrivateKey, password);
};

// Method to add transaction
cryptoWalletSchema.methods.addTransaction = function(txData) {
  this.transactions.push({
    hash: txData.hash,
    type: txData.type,
    token: txData.token || 'ETH',
    amount: txData.amount,
    to: txData.to,
    from: txData.from,
    blockNumber: txData.blockNumber,
    timestamp: txData.timestamp || new Date(),
    status: txData.status || 'pending',
    gasUsed: txData.gasUsed,
    gasPrice: txData.gasPrice
  });
  
  return this.save();
};

// Method to update balance
cryptoWalletSchema.methods.updateBalance = function(token, balance) {
  if (this.balances[token] !== undefined) {
    this.balances[token] = balance.toString();
  } else {
    // Handle custom tokens
    const existingToken = this.supportedTokens.find(t => t.symbol === token);
    if (existingToken) {
      existingToken.balance = balance.toString();
    }
  }
  
  return this.save();
};

// Method to check daily spending limits
cryptoWalletSchema.methods.checkDailyLimit = function(amount) {
  const today = new Date().toDateString();
  const lastReset = this.lastResetDate ? this.lastResetDate.toDateString() : null;
  
  // Reset daily spent if it's a new day
  if (lastReset !== today) {
    this.dailySpent = 0;
    this.lastResetDate = new Date();
  }
  
  return (this.dailySpent + amount) <= this.maxDailyLimit;
};

// Method to record spending
cryptoWalletSchema.methods.recordSpending = function(amount) {
  this.dailySpent += amount;
  return this.save();
};

// Method to freeze wallet
cryptoWalletSchema.methods.freeze = function(reason, duration = null) {
  this.isActive = false;
  this.freezeReason = reason;
  
  if (duration) {
    this.frozenUntil = new Date(Date.now() + duration);
  }
  
  return this.save();
};

// Method to unfreeze wallet
cryptoWalletSchema.methods.unfreeze = function() {
  this.isActive = true;
  this.freezeReason = undefined;
  this.frozenUntil = undefined;
  
  return this.save();
};

// UPDATED: Static method to create wallet from gift card with working encryption
cryptoWalletSchema.statics.createFromGiftCard = async function(userId, giftCardId, initialBalance) {
  const ethers = require('ethers');
  
  try {
    // Generate new wallet
    const wallet = ethers.Wallet.createRandom();
    
    // Create wallet document
    const walletDoc = new this({
      owner: userId,
      address: wallet.address,
      walletType: 'generated',
      createdFrom: 'gift_card',
      sourceCardId: giftCardId,
      balances: {
        ETH: '0',
        USDC: initialBalance.toString(),
        USDT: '0'
      }
    });
    
    // Create a secure password for encryption using environment variable + user data
    const basePassword = process.env.WALLET_ENCRYPTION_KEY || 'globalpay-default-key-2025';
    const encryptionPassword = `${basePassword}-${userId}-${giftCardId}`;
    
    // Encrypt and store private key using our working method
    walletDoc.setEncryptedPrivateKey(wallet.privateKey, encryptionPassword);
    
    await walletDoc.save();
    
    console.log(`Wallet created successfully for user ${userId} from gift card ${giftCardId}`);
    return walletDoc;
    
  } catch (error) {
    console.error('Error creating wallet from gift card:', error);
    throw new Error(`Failed to create wallet: ${error.message}`);
  }
};

// Static method to get user's wallets
cryptoWalletSchema.statics.getUserWallets = function(userId) {
  return this.find({ owner: userId, isActive: true })
    .select('-encryptedPrivateKey')
    .populate('sourceCardId', 'maskedCardNumber valueUSD')
    .sort({ createdAt: -1 });
};

// Static method to get wallet statistics
cryptoWalletSchema.statics.getStatistics = async function() {
  const stats = await this.aggregate([
    {
      $group: {
        _id: {
          network: '$network',
          walletType: '$walletType'
        },
        count: { $sum: 1 },
        totalEthBalance: { $sum: { $toDouble: '$balances.ETH' } },
        totalUsdcBalance: { $sum: { $toDouble: '$balances.USDC' } }
      }
    }
  ]);
  
  return {
    total: await this.countDocuments(),
    active: await this.countDocuments({ isActive: true }),
    byNetwork: stats,
    frozen: await this.countDocuments({ isActive: false })
  };
};

// Security validation before save
cryptoWalletSchema.pre('save', function(next) {
  if (this.isNew && !this.encryptedPrivateKey) {
    return next(new Error('Private key must be encrypted before saving'));
  }
  next();
});

module.exports = mongoose.model('CryptoWallet', cryptoWalletSchema);