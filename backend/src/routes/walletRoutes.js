// src/routes/walletRoutes.js - Wallet management routes
const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/auth');
const { 
  createWallet,
  getWallet, 
  topUpWithCard, 
  depositUSD, 
  withdrawBTC, 
  getTransactions,
  revealPrivateKey
} = require('../services/walletService');

/**
 * @route   GET /api/wallet
 * @desc    Get user's wallet details
 * @access  Private
 */
router.get('/', authenticateUser, async (req, res) => {
  try {
    const result = await getWallet(req.user.id);
    
    res.status(200).json({
      success: true,
      data: result.wallet
    });
    
  } catch (error) {
    console.error('Get wallet error:', error);
    
    if (error.message.includes('not found')) {
      return res.status(200).json({
        success: true,
        data: null,
        message: 'No wallet found. Please create one.'
      });
    }
    
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to get wallet'
    });
  }
});

/**
 * @route   POST /api/wallet
 * @desc    Create a new wallet with REAL crypto addresses
 * @access  Private
 */
router.post('/', authenticateUser, async (req, res) => {
  try {
    const { name, wallet_type } = req.body;
    
    const walletName = name || 'Main Wallet';
    const walletType = wallet_type || 'primary';
    
    const result = await createWallet(req.user.id, walletName, walletType);
    
    res.status(201).json({
      success: true,
      message: 'Wallet created successfully',
      data: result.wallet
    });
  } catch (error) {
    console.error('Create wallet error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to create wallet'
    });
  }
});

/**
 * @route   POST /api/wallet/:walletId/reveal-key
 * @desc    Reveal private key for a specific cryptocurrency
 * @access  Private
 */
router.post('/:walletId/reveal-key', authenticateUser, async (req, res) => {
  try {
    const { walletId } = req.params;
    const { crypto } = req.body;
    
    if (!crypto) {
      return res.status(400).json({
        success: false,
        error: 'Cryptocurrency type is required'
      });
    }

    const validCryptos = ['BTC', 'ETH', 'USDC', 'USDT', 'BNB'];
    if (!validCryptos.includes(crypto.toUpperCase())) {
      return res.status(400).json({
        success: false,
        error: 'Invalid cryptocurrency type'
      });
    }

    const result = await revealPrivateKey(req.user.id, walletId, crypto.toUpperCase());
    
    console.warn(`🔐 SECURITY: User ${req.user.id} revealed ${crypto} private key for wallet ${walletId}`);
    
    res.status(200).json({
      success: true,
      data: {
        privateKey: result.privateKey,
        address: result.address,
        crypto: result.crypto,
        warning: 'NEVER share your private key with anyone.'
      }
    });
    
  } catch (error) {
    console.error('Reveal key error:', error);
    
    if (error.message.includes('not found')) {
      return res.status(404).json({
        success: false,
        error: 'Wallet not found or you do not have access'
      });
    }
    
    if (error.message.includes('No private key')) {
      return res.status(404).json({
        success: false,
        error: 'Private key not found for this cryptocurrency'
      });
    }
    
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to reveal private key'
    });
  }
});

/**
 * @route   POST /api/wallet/topup-card
 * @desc    Top up wallet using crypto gift card
 * @access  Private
 */
router.post('/topup-card', authenticateUser, async (req, res) => {
  try {
    const { cardNumber, pin } = req.body;
    
    if (!cardNumber || !pin) {
      return res.status(400).json({
        success: false,
        error: 'Card number and PIN are required'
      });
    }
    
    const result = await topUpWithCard(req.user.id, cardNumber, pin);
    
    res.status(200).json({
      success: true,
      message: 'Wallet topped up successfully',
      data: result
    });
    
  } catch (error) {
    console.error('Top-up error:', error);
    
    if (error.message.includes('Invalid card')) {
      return res.status(404).json({
        success: false,
        error: 'Invalid card number'
      });
    }
    
    if (error.message.includes('Invalid PIN')) {
      return res.status(401).json({
        success: false,
        error: 'Invalid PIN'
      });
    }
    
    if (error.message.includes('no balance')) {
      return res.status(400).json({
        success: false,
        error: 'Card has no balance'
      });
    }
    
    if (error.message.includes('Card is')) {
      return res.status(400).json({
        success: false,
        error: error.message
      });
    }
    
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to top up wallet'
    });
  }
});

/**
 * @route   POST /api/wallet/deposit
 * @desc    Deposit USD and buy BTC
 * @access  Private
 */
router.post('/deposit', authenticateUser, async (req, res) => {
  try {
    const { amount } = req.body;
    
    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Invalid amount'
      });
    }
    
    if (amount < 10) {
      return res.status(400).json({
        success: false,
        error: 'Minimum deposit is $10'
      });
    }
    
    if (amount > 10000) {
      return res.status(400).json({
        success: false,
        error: 'Maximum deposit is $10,000 per transaction'
      });
    }
    
    const result = await depositUSD(req.user.id, amount);
    
    res.status(200).json({
      success: true,
      message: 'Deposit successful',
      data: result
    });
    
  } catch (error) {
    console.error('Deposit error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to process deposit'
    });
  }
});

/**
 * @route   POST /api/wallet/withdraw
 * @desc    Withdraw BTC to external wallet
 * @access  Private
 */
router.post('/withdraw', authenticateUser, async (req, res) => {
  try {
    const { btcAmount, toAddress } = req.body;
    
    if (!btcAmount || !toAddress) {
      return res.status(400).json({
        success: false,
        error: 'BTC amount and destination address are required'
      });
    }
    
    if (btcAmount <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Invalid BTC amount'
      });
    }
    
    const btcAddressRegex = /^(1|3|bc1)[a-zA-Z0-9]{25,62}$/;
    if (!btcAddressRegex.test(toAddress)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid Bitcoin address format'
      });
    }
    
    const result = await withdrawBTC(req.user.id, btcAmount, toAddress);
    
    res.status(200).json({
      success: true,
      message: 'Withdrawal initiated successfully',
      data: result
    });
    
  } catch (error) {
    console.error('Withdrawal error:', error);
    
    if (error.message.includes('Insufficient')) {
      return res.status(400).json({
        success: false,
        error: 'Insufficient BTC balance'
      });
    }
    
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to process withdrawal'
    });
  }
});

/**
 * @route   GET /api/wallet/transactions
 * @desc    Get transaction history
 * @access  Private
 */
router.get('/transactions', authenticateUser, async (req, res) => {
  try {
    const { type, status, limit = 50, page = 1 } = req.query;
    
    const validLimit = Math.min(parseInt(limit) || 50, 100);
    const validPage = Math.max(parseInt(page) || 1, 1);
    
    const filters = {
      limit: validLimit
    };
    
    if (type) {
      const validTypes = ['deposit', 'withdrawal', 'transfer', 'card_topup'];
      if (validTypes.includes(type)) {
        filters.type = type;
      }
    }
    
    if (status) {
      const validStatuses = ['pending', 'completed', 'failed', 'cancelled'];
      if (validStatuses.includes(status)) {
        filters.status = status;
      }
    }
    
    const result = await getTransactions(req.user.id, filters);
    
    res.status(200).json({
      success: true,
      data: {
        transactions: result.transactions,
        pagination: {
          page: validPage,
          limit: validLimit,
          total: result.transactions.length
        }
      }
    });
    
  } catch (error) {
    console.error('Get transactions error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to get transactions'
    });
  }
});

/**
 * @route   GET /api/wallet/balance
 * @desc    Get wallet balance
 * @access  Private
 */
router.get('/balance', authenticateUser, async (req, res) => {
  try {
    const result = await getWallet(req.user.id);
    
    res.status(200).json({
      success: true,
      data: {
        btc_balance: result.wallet.btc_balance,
        eth_balance: result.wallet.eth_balance,
        usdt_balance: result.wallet.usdt_balance,
        usdc_balance: result.wallet.usdc_balance
      }
    });
    
  } catch (error) {
    console.error('Get balance error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to get balance'
    });
  }
});

/**
 * @route   GET /api/wallet/stats
 * @desc    Get wallet statistics
 * @access  Private
 */
router.get('/stats', authenticateUser, async (req, res) => {
  try {
    const result = await getWallet(req.user.id);
    const wallet = result.wallet;
    
    const stats = {
      current_btc_balance: wallet.btc_balance,
      current_eth_balance: wallet.eth_balance,
      current_usdt_balance: wallet.usdt_balance,
      current_usdc_balance: wallet.usdc_balance,
      wallet_name: wallet.name,
      wallet_type: wallet.wallet_type,
      created_at: wallet.created_at
    };
    
    res.status(200).json({
      success: true,
      data: stats
    });
    
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to get wallet stats'
    });
  }
});

module.exports = router;