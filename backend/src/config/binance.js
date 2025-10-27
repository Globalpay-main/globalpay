// src/config/binance.js - Binance API Configuration
const Binance = require('binance-api-node').default;

// Initialize Binance client
const binanceClient = Binance({
  apiKey: process.env.BINANCE_API_KEY || '',
  apiSecret: process.env.BINANCE_API_SECRET || '',
  // Use testnet for development
  ...(process.env.BINANCE_TESTNET === 'true' && {
    httpBase: 'https://testnet.binance.vision',
    wsBase: 'wss://testnet.binance.vision'
  })
});

/**
 * Test Binance API connection
 * @returns {Promise<boolean>}
 */
const testBinanceConnection = async () => {
  try {
    // Check if API keys are provided
    if (!process.env.BINANCE_API_KEY || !process.env.BINANCE_API_SECRET) {
      console.warn('⚠️  Binance API keys not configured. Running in mock mode.');
      return false;
    }

    // Ping Binance servers
    await binanceClient.ping();
    console.log('✅ Binance API connected successfully');
    
    // Get account info to verify API keys
    const accountInfo = await binanceClient.accountInfo();
    console.log(`✅ Binance account verified`);
    console.log(`   Can trade: ${accountInfo.canTrade}`);
    console.log(`   Can withdraw: ${accountInfo.canWithdraw}`);
    console.log(`   Can deposit: ${accountInfo.canDeposit}`);
    
    return true;
  } catch (error) {
    console.error('❌ Binance connection failed:', error.message);
    console.warn('⚠️  Running in mock mode. BTC purchases will be simulated.');
    return false;
  }
};

/**
 * Get current BTC price in USD
 * @returns {Promise<number>}
 */
const getBTCPrice = async () => {
  try {
    const ticker = await binanceClient.prices({ symbol: 'BTCUSDT' });
    const price = parseFloat(ticker.BTCUSDT);
    console.log(`💰 Current BTC price: $${price.toLocaleString()}`);
    return price;
  } catch (error) {
    console.error('Error fetching BTC price:', error.message);
    // Return mock price if API fails
    console.warn('⚠️  Using mock BTC price: $45,000');
    return 45000;
  }
};

/**
 * Buy BTC with USD (using USDT as proxy)
 * @param {number} usdAmount - Amount in USD to spend
 * @returns {Promise<Object>} Purchase result
 */
const buyBTC = async (usdAmount) => {
  try {
    // Get current BTC price
    const btcPrice = await getBTCPrice();
    
    // Calculate BTC quantity before markup
    const btcQuantityBeforeMarkup = usdAmount / btcPrice;
    
    // Add 5% markup
    const markup = parseFloat(process.env.BTC_MARKUP_PERCENTAGE || '5') / 100;
    const finalUsdAmount = usdAmount * (1 + markup);
    const finalBtcQuantity = parseFloat((finalUsdAmount / btcPrice).toFixed(8));
    
    console.log(`🔄 Purchasing BTC:`);
    console.log(`   USD Amount: $${usdAmount}`);
    console.log(`   Markup (${markup * 100}%): $${(finalUsdAmount - usdAmount).toFixed(2)}`);
    console.log(`   Total USD: $${finalUsdAmount.toFixed(2)}`);
    console.log(`   BTC Amount: ${finalBtcQuantity} BTC`);
    console.log(`   BTC Price: $${btcPrice.toLocaleString()}`);
    
    // In production mode with valid API keys
    if (process.env.NODE_ENV === 'production' && process.env.BINANCE_API_KEY) {
      try {
        // Execute market buy order
        const order = await binanceClient.order({
          symbol: 'BTCUSDT',
          side: 'BUY',
          type: 'MARKET',
          quoteOrderQty: finalUsdAmount.toFixed(2) // Buy with USD amount
        });
        
        console.log('✅ BTC purchase executed successfully');
        console.log(`   Order ID: ${order.orderId}`);
        
        return {
          success: true,
          btcAmount: parseFloat(order.executedQty),
          usdAmount: finalUsdAmount,
          originalUsdAmount: usdAmount,
          markup: (finalUsdAmount - usdAmount),
          price: btcPrice,
          orderId: order.orderId,
          transactionId: order.clientOrderId,
          timestamp: order.transactTime,
          mode: 'PRODUCTION'
        };
      } catch (orderError) {
        console.error('❌ Binance order failed:', orderError.message);
        throw orderError;
      }
    } else {
      // Development/mock mode
      console.log('⚠️  DEVELOPMENT MODE - Simulating BTC purchase');
      
      return {
        success: true,
        btcAmount: finalBtcQuantity,
        usdAmount: finalUsdAmount,
        originalUsdAmount: usdAmount,
        markup: (finalUsdAmount - usdAmount),
        price: btcPrice,
        orderId: 'DEV_' + Date.now(),
        transactionId: 'DEV_TX_' + Date.now(),
        timestamp: Date.now(),
        mode: 'DEVELOPMENT'
      };
    }
  } catch (error) {
    console.error('❌ Error in buyBTC:', error.message);
    throw new Error(`Failed to purchase BTC: ${error.message}`);
  }
};

/**
 * Get account balance for a specific asset
 * @param {string} asset - Asset symbol (e.g., 'USDT', 'BTC')
 * @returns {Promise<number>}
 */
const getBalance = async (asset = 'USDT') => {
  try {
    if (!process.env.BINANCE_API_KEY) {
      console.warn('⚠️  Binance API not configured. Returning mock balance.');
      return 10000; // Mock balance
    }

    const accountInfo = await binanceClient.accountInfo();
    const balance = accountInfo.balances.find(b => b.asset === asset);
    
    if (!balance) {
      console.warn(`⚠️  Asset ${asset} not found in account`);
      return 0;
    }

    const availableBalance = parseFloat(balance.free);
    console.log(`💰 ${asset} Balance: ${availableBalance}`);
    
    return availableBalance;
  } catch (error) {
    console.error('Error fetching balance:', error.message);
    return 0;
  }
};

/**
 * Get 24hr price change statistics
 * @param {string} symbol - Trading pair symbol (e.g., 'BTCUSDT')
 * @returns {Promise<Object>}
 */
const get24hrStats = async (symbol = 'BTCUSDT') => {
  try {
    const stats = await binanceClient.dailyStats({ symbol });
    
    return {
      symbol: stats.symbol,
      priceChange: parseFloat(stats.priceChange),
      priceChangePercent: parseFloat(stats.priceChangePercent),
      lastPrice: parseFloat(stats.lastPrice),
      highPrice: parseFloat(stats.highPrice),
      lowPrice: parseFloat(stats.lowPrice),
      volume: parseFloat(stats.volume)
    };
  } catch (error) {
    console.error('Error fetching 24hr stats:', error.message);
    return null;
  }
};

module.exports = {
  binanceClient,
  testBinanceConnection,
  getBTCPrice,
  buyBTC,
  getBalance,
  get24hrStats
};