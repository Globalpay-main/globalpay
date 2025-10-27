// src/services/walletService.js - Wallet management service
const { supabase } = require('../config/database');
const { buyBTC, sellBTC, getBTCPrice } = require('../config/binance');
const { 
  generateMultiCryptoWallet,
  decryptPrivateKey
} = require('./walletGenerator');
const { 
  TRANSACTION_TYPES,
  TRANSACTION_STATUS,
  ERROR_CODES,
} = require('../config/constants');

/**
 * Create wallet for new user with REAL crypto addresses
 * @param {string} userId - User ID
 * @param {string} walletName - Wallet name
 * @param {string} walletType - Wallet type
 * @returns {Promise<Object>} Created wallet
 */
const createWallet = async (userId, walletName = 'Main Wallet', walletType = 'primary') => {
  try {
    console.log(`🔐 Generating real crypto addresses for user ${userId}...`);
    
    const walletData = generateMultiCryptoWallet();
    
    console.log(`✅ Generated addresses:`, {
      BTC: walletData.addresses.BTC,
      ETH: walletData.addresses.ETH
    });
    
    const { data: wallet, error } = await supabase
      .from('wallets')
      .insert({
        user_id: userId,
        name: walletName,
        wallet_type: walletType,
        wallet_addresses: walletData.addresses,
        encrypted_keys: walletData.encryptedKeys,
        encrypted_mnemonic: walletData.mnemonic,
        btc_balance: 0,
        eth_balance: 0,
        usdt_balance: 0,
        usdc_balance: 0,
        bnb_balance: 0,
        xrp_balance: 0
      })
      .select()
      .single();
    
    if (error) throw error;
    
    console.log(`✅ Wallet created for user ${userId} with real addresses`);
    
    return { 
      success: true, 
      wallet: {
        ...wallet,
        encrypted_keys: undefined,
        encrypted_mnemonic: undefined
      }
    };
    
  } catch (error) {
    console.error('Error creating wallet:', error);
    throw error;
  }
};

/**
 * Get wallet by user ID
 * @param {string} userId - User ID
 * @returns {Promise<Object>} Wallet data
 */
const getWallet = async (userId) => {
  try {
    const { data: wallet, error } = await supabase
      .from('wallets')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error || !wallet) {
      throw new Error('Wallet not found');
    }
    
    const safeWallet = {
      ...wallet,
      encrypted_keys: undefined,
      encrypted_mnemonic: undefined
    };
    
    return { success: true, wallet: safeWallet };
    
  } catch (error) {
    console.error('Error getting wallet:', error);
    throw error;
  }
};

/**
 * Reveal private key for a specific cryptocurrency
 * @param {string} userId - User ID
 * @param {string} walletId - Wallet ID
 * @param {string} crypto - Cryptocurrency (BTC, ETH, etc.)
 * @returns {Promise<Object>} Private key data
 */
const revealPrivateKey = async (userId, walletId, crypto) => {
  try {
    console.warn(`🔐 SECURITY: Revealing ${crypto} private key for user ${userId}, wallet ${walletId}`);
    
    const { data: wallet, error } = await supabase
      .from('wallets')
      .select('*')
      .eq('id', walletId)
      .eq('user_id', userId)
      .single();
    
    if (error || !wallet) {
      throw new Error('Wallet not found or access denied');
    }
    
    if (!wallet.encrypted_keys || !wallet.encrypted_keys[crypto]) {
      throw new Error(`No private key found for ${crypto}`);
    }
    
    const encryptedKey = wallet.encrypted_keys[crypto];
    const privateKey = decryptPrivateKey(encryptedKey);
    const address = wallet.wallet_addresses[crypto];
    
    console.warn(`⚠️ SECURITY ALERT: User ${userId} revealed ${crypto} private key at ${new Date().toISOString()}`);
    
    return {
      success: true,
      privateKey,
      address,
      crypto
    };
    
  } catch (error) {
    console.error('Error revealing private key:', error);
    throw error;
  }
};

/**
 * Top up wallet with card
 */
const topUpWithCard = async (userId, cardNumber, pin) => {
  try {
    console.log(`💳 Processing card top-up for user ${userId}...`);
    
    const { data: card, error: cardError } = await supabase
      .from('crypto_cards')
      .select('*')
      .eq('card_number', cardNumber)
      .single();
    
    if (cardError || !card) {
      throw new Error('Invalid card number');
    }
    
    if (card.status !== 'active') {
      throw new Error(`Card is ${card.status}`);
    }
    
    if (card.pin !== pin) {
      throw new Error('Invalid PIN');
    }
    
    if (card.current_balance <= 0) {
      throw new Error('Card has no balance');
    }
    
    const btcPrice = await getBTCPrice();
    const btcAmount = card.current_balance / btcPrice;
    
    const { data: wallet, error: walletError } = await supabase
      .from('wallets')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (walletError || !wallet) {
      throw new Error('Wallet not found');
    }
    
    const newBtcBalance = wallet.btc_balance + btcAmount;
    const newUsdBalance = wallet.usd_balance + card.current_balance;
    
    const { error: updateWalletError } = await supabase
      .from('wallets')
      .update({
        btc_balance: newBtcBalance,
        usd_balance: newUsdBalance,
        total_deposits: wallet.total_deposits + card.current_balance,
        updated_at: new Date()
      })
      .eq('user_id', userId);
    
    if (updateWalletError) throw updateWalletError;
    
    const { error: updateCardError } = await supabase
      .from('crypto_cards')
      .update({
        status: 'used',
        current_balance: 0,
        used_at: new Date(),
        used_by: userId
      })
      .eq('id', card.id);
    
    if (updateCardError) throw updateCardError;
    
    const { data: transaction, error: txError } = await supabase
      .from('transactions')
      .insert({
        user_id: userId,
        type: TRANSACTION_TYPES.DEPOSIT,
        amount: card.current_balance,
        btc_amount: btcAmount,
        btc_price: btcPrice,
        status: TRANSACTION_STATUS.COMPLETED,
        description: `Card top-up: ${cardNumber.slice(-4)}`,
        metadata: {
          card_id: card.id,
          card_number: cardNumber,
          original_amount: card.denomination
        }
      })
      .select()
      .single();
    
    if (txError) throw txError;
    
    console.log(`✅ Card top-up completed: $${card.current_balance} → ${btcAmount} BTC`);
    
    return {
      success: true,
      transaction,
      wallet: {
        btc_balance: newBtcBalance,
        usd_balance: newUsdBalance
      }
    };
    
  } catch (error) {
    console.error('Error topping up with card:', error);
    throw error;
  }
};

/**
 * Deposit USD and buy BTC
 */
const depositUSD = async (userId, amount) => {
  try {
    console.log(`💰 Processing USD deposit for user ${userId}: $${amount}`);
    
    if (amount < 10) {
      throw new Error('Minimum deposit is $10');
    }
    
    const btcPrice = await getBTCPrice();
    const btcAmount = amount / btcPrice;
    
    const { data: wallet, error: walletError } = await supabase
      .from('wallets')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (walletError || !wallet) {
      throw new Error('Wallet not found');
    }
    
    const newBtcBalance = wallet.btc_balance + btcAmount;
    const newUsdBalance = wallet.usd_balance + amount;
    
    const { error: updateError } = await supabase
      .from('wallets')
      .update({
        btc_balance: newBtcBalance,
        usd_balance: newUsdBalance,
        total_deposits: wallet.total_deposits + amount,
        updated_at: new Date()
      })
      .eq('user_id', userId);
    
    if (updateError) throw updateError;
    
    const { data: transaction, error: txError } = await supabase
      .from('transactions')
      .insert({
        user_id: userId,
        type: TRANSACTION_TYPES.DEPOSIT,
        amount: amount,
        btc_amount: btcAmount,
        btc_price: btcPrice,
        status: TRANSACTION_STATUS.COMPLETED,
        description: 'USD deposit'
      })
      .select()
      .single();
    
    if (txError) throw txError;
    
    console.log(`✅ Deposit completed: $${amount} → ${btcAmount} BTC`);
    
    return {
      success: true,
      transaction,
      wallet: {
        btc_balance: newBtcBalance,
        usd_balance: newUsdBalance
      }
    };
    
  } catch (error) {
    console.error('Error depositing USD:', error);
    throw error;
  }
};

/**
 * Withdraw BTC to external wallet
 */
const withdrawBTC = async (userId, btcAmount, toAddress) => {
  try {
    console.log(`🏦 Processing BTC withdrawal for user ${userId}: ${btcAmount} BTC`);
    
    const { data: wallet, error: walletError } = await supabase
      .from('wallets')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (walletError || !wallet) {
      throw new Error('Wallet not found');
    }
    
    if (wallet.btc_balance < btcAmount) {
      throw new Error('Insufficient BTC balance');
    }
    
    const btcPrice = await getBTCPrice();
    const usdAmount = btcAmount * btcPrice;
    
    const newBtcBalance = wallet.btc_balance - btcAmount;
    const newUsdBalance = wallet.usd_balance - usdAmount;
    
    const { error: updateError } = await supabase
      .from('wallets')
      .update({
        btc_balance: newBtcBalance,
        usd_balance: newUsdBalance,
        total_withdrawals: wallet.total_withdrawals + usdAmount,
        updated_at: new Date()
      })
      .eq('user_id', userId);
    
    if (updateError) throw updateError;
    
    const { data: transaction, error: txError } = await supabase
      .from('transactions')
      .insert({
        user_id: userId,
        type: TRANSACTION_TYPES.WITHDRAWAL,
        amount: usdAmount,
        btc_amount: btcAmount,
        btc_price: btcPrice,
        status: TRANSACTION_STATUS.PENDING,
        description: `BTC withdrawal to ${toAddress.slice(0, 8)}...`,
        metadata: {
          to_address: toAddress
        }
      })
      .select()
      .single();
    
    if (txError) throw txError;
    
    console.log(`✅ Withdrawal initiated: ${btcAmount} BTC → ${toAddress}`);
    
    return {
      success: true,
      transaction,
      wallet: {
        btc_balance: newBtcBalance,
        usd_balance: newUsdBalance
      }
    };
    
  } catch (error) {
    console.error('Error withdrawing BTC:', error);
    throw error;
  }
};

/**
 * Get transaction history
 */
const getTransactions = async (userId, filters = {}) => {
  try {
    let query = supabase
      .from('transactions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (filters.type) {
      query = query.eq('type', filters.type);
    }
    
    if (filters.status) {
      query = query.eq('status', filters.status);
    }
    
    if (filters.limit) {
      query = query.limit(filters.limit);
    }
    
    const { data: transactions, error } = await query;
    
    if (error) throw error;
    
    return { success: true, transactions };
    
  } catch (error) {
    console.error('Error getting transactions:', error);
    throw error;
  }
};

module.exports = {
  createWallet,
  getWallet,
  topUpWithCard,
  depositUSD,
  withdrawBTC,
  getTransactions,
  revealPrivateKey
};