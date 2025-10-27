// src/services/cardService.js - Card generation and activation service
const { supabase } = require('../config/database');
const { buyBTC, getBTCPrice } = require('../config/binance');
const { 
  generateCardNumber, 
  generatePin, 
  hashPin, 
  comparePin,
  generateBatchId,
  maskCardNumber
} = require('../utils/crypto');
const { 
  CARD_DENOMINATIONS, 
  CARD_STATUS, 
  TRANSACTION_TYPES,
  TRANSACTION_STATUS,
  ERROR_CODES,
  CARD_EXPIRY_DAYS,
  MAX_ACTIVATION_ATTEMPTS
} = require('../config/constants');

/**
 * Generate crypto gift cards in bulk
 * @param {number} denomination - Card denomination (50, 100, 200, 500)
 * @param {number} quantity - Number of cards to generate
 * @param {string} adminId - ID of admin generating cards
 * @param {string} assignToStoreId - Optional store ID to assign cards to
 * @returns {Promise<Object>} Generated cards info
 */
const generateCards = async (denomination, quantity, adminId, assignToStoreId = null) => {
  try {
    console.log(`🎫 Generating ${quantity} cards of $${denomination} denomination...`);
    
    // Validate denomination
    const validDenominations = Object.values(CARD_DENOMINATIONS);
    if (!validDenominations.includes(denomination)) {
      throw new Error(`Invalid denomination. Must be one of: ${validDenominations.join(', ')}`);
    }
    
    // Validate quantity
    if (quantity < 1 || quantity > 1000) {
      throw new Error('Quantity must be between 1 and 1000');
    }
    
    // Generate batch ID
    const batchId = generateBatchId();
    
    // Calculate expiry date
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + CARD_EXPIRY_DAYS);
    
    const cards = [];
    const generatedCards = [];
    
    // Generate each card
    for (let i = 0; i < quantity; i++) {
      // Generate unique card number
      let cardNumber;
      let isUnique = false;
      let attempts = 0;
      
      while (!isUnique && attempts < 10) {
        cardNumber = generateCardNumber(denomination);
        
        // Check if card number already exists
        const { data: existing } = await supabase
          .from('crypto_cards')
          .select('id')
          .eq('card_number', cardNumber)
          .single();
        
        if (!existing) {
          isUnique = true;
        }
        attempts++;
      }
      
      if (!isUnique) {
        throw new Error('Failed to generate unique card number after 10 attempts');
      }
      
      // Generate PIN
      const pin = generatePin();
      const pinHash = await hashPin(pin);
      
      // Prepare card data
      const cardData = {
        card_number: cardNumber,
        card_pin_hash: pinHash,
        denomination: denomination,
        status: assignToStoreId ? CARD_STATUS.ASSIGNED_TO_STORE : CARD_STATUS.GENERATED,
        batch_id: batchId,
        assigned_store_id: assignToStoreId,
        assigned_at: assignToStoreId ? new Date().toISOString() : null,
        expires_at: expiryDate.toISOString(),
        created_at: new Date().toISOString()
      };
      
      cards.push(cardData);
      
      // Store card details for response (including plain PIN)
      generatedCards.push({
        cardNumber: cardNumber,
        pin: pin,
        denomination: denomination,
        maskedCardNumber: maskCardNumber(cardNumber)
      });
    }
    
    // Insert all cards in batch
    const { data: insertedCards, error: insertError } = await supabase
      .from('crypto_cards')
      .insert(cards)
      .select();
    
    if (insertError) {
      console.error('Error inserting cards:', insertError);
      throw new Error('Failed to save cards to database');
    }
    
    // Log admin activity
    await supabase
      .from('admin_activity_log')
      .insert({
        admin_id: adminId,
        action: 'GENERATE_CARDS',
        resource_type: 'crypto_cards',
        details: {
          batch_id: batchId,
          denomination: denomination,
          quantity: quantity,
          assigned_store_id: assignToStoreId
        }
      });
    
    console.log(`✅ Successfully generated ${quantity} cards`);
    console.log(`   Batch ID: ${batchId}`);
    console.log(`   Denomination: $${denomination}`);
    console.log(`   Expires: ${expiryDate.toLocaleDateString()}`);
    
    return {
      success: true,
      batchId: batchId,
      quantity: quantity,
      denomination: denomination,
      expiresAt: expiryDate.toISOString(),
      cards: generatedCards,
      assignedToStore: assignToStoreId
    };
    
  } catch (error) {
    console.error('Error generating cards:', error);
    throw error;
  }
};

/**
 * Activate a crypto gift card
 * @param {string} cardNumber - 12-digit card number
 * @param {string} pin - 4-digit PIN
 * @param {string} userId - User ID activating the card
 * @returns {Promise<Object>} Activation result with BTC amount
 */
const activateCard = async (cardNumber, pin, userId) => {
  try {
    console.log(`🔓 Attempting to activate card: ${maskCardNumber(cardNumber)}`);
    
    // Get card from database
    const { data: card, error: cardError } = await supabase
      .from('crypto_cards')
      .select('*')
      .eq('card_number', cardNumber)
      .single();
    
    if (cardError || !card) {
      throw new Error('Card not found');
    }
    
    // Check card status
    if (card.status === CARD_STATUS.ACTIVATED) {
      throw new Error('Card has already been activated');
    }
    
    if (card.status === CARD_STATUS.BLOCKED) {
      throw new Error('Card is blocked due to too many failed attempts');
    }
    
    if (card.status === CARD_STATUS.EXPIRED) {
      throw new Error('Card has expired');
    }
    
    // Check if card has been sold and payment received
    if (card.status !== CARD_STATUS.SOLD && card.store_payment_status !== 'paid') {
      throw new Error('Card cannot be activated. Store payment pending.');
    }
    
    // Check expiry
    if (new Date(card.expires_at) < new Date()) {
      // Update card status to expired
      await supabase
        .from('crypto_cards')
        .update({ status: CARD_STATUS.EXPIRED })
        .eq('id', card.id);
      
      throw new Error('Card has expired');
    }
    
    // Verify PIN
    const isPinValid = await comparePin(pin, card.card_pin_hash);
    
    if (!isPinValid) {
      // Increment activation attempts
      const newAttempts = (card.activation_attempts || 0) + 1;
      
      const updateData = {
        activation_attempts: newAttempts
      };
      
      // Block card after max attempts
      if (newAttempts >= MAX_ACTIVATION_ATTEMPTS) {
        updateData.status = CARD_STATUS.BLOCKED;
      }
      
      await supabase
        .from('crypto_cards')
        .update(updateData)
        .eq('id', card.id);
      
      const remainingAttempts = MAX_ACTIVATION_ATTEMPTS - newAttempts;
      
      if (remainingAttempts <= 0) {
        throw new Error('Card is now blocked due to too many failed PIN attempts');
      }
      
      throw new Error(`Invalid PIN. ${remainingAttempts} attempt(s) remaining`);
    }
    
    // Purchase BTC from Binance
    console.log(`💰 Purchasing BTC for $${card.denomination}...`);
    const btcPurchase = await buyBTC(card.denomination);
    
    if (!btcPurchase.success) {
      throw new Error('Failed to purchase BTC');
    }
    
    console.log(`✅ BTC purchased: ${btcPurchase.btcAmount} BTC`);
    
    // Get or create user's wallet
    let { data: wallet } = await supabase
      .from('crypto_wallets')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true)
      .single();
    
    if (!wallet) {
      // Create new wallet for user
      const { data: newWallet, error: walletError } = await supabase
        .from('crypto_wallets')
        .insert({
          user_id: userId,
          wallet_name: 'Main Wallet',
          btc_balance: 0,
          eth_balance: 0,
          usdt_balance: 0,
          usdc_balance: 0,
          bnb_balance: 0,
          xrp_balance: 0
        })
        .select()
        .single();
      
      if (walletError) {
        throw new Error('Failed to create wallet');
      }
      
      wallet = newWallet;
    }
    
    // Credit BTC to user's wallet
    const newBtcBalance = parseFloat(wallet.btc_balance || 0) + parseFloat(btcPurchase.btcAmount);
    
    const { error: walletUpdateError } = await supabase
      .from('crypto_wallets')
      .update({ btc_balance: newBtcBalance })
      .eq('id', wallet.id);
    
    if (walletUpdateError) {
      throw new Error('Failed to credit BTC to wallet');
    }
    
    // Update card status
    const { error: cardUpdateError } = await supabase
      .from('crypto_cards')
      .update({
        status: CARD_STATUS.ACTIVATED,
        activated_by: userId,
        activated_at: new Date().toISOString(),
        btc_amount_credited: btcPurchase.btcAmount,
        btc_purchase_price: btcPurchase.price
      })
      .eq('id', card.id);
    
    if (cardUpdateError) {
      throw new Error('Failed to update card status');
    }
    
    // Create transaction record
    const { error: txError } = await supabase
      .from('transactions')
      .insert({
        user_id: userId,
        wallet_id: wallet.id,
        card_id: card.id,
        type: TRANSACTION_TYPES.CARD_ACTIVATION,
        status: TRANSACTION_STATUS.COMPLETED,
        amount: btcPurchase.btcAmount,
        currency: 'BTC',
        description: `Card activation - $${card.denomination} → ${btcPurchase.btcAmount} BTC`,
        external_tx_id: btcPurchase.transactionId,
        metadata: {
          card_denomination: card.denomination,
          btc_price: btcPurchase.price,
          markup: btcPurchase.markup,
          mode: btcPurchase.mode
        }
      });
    
    if (txError) {
      console.error('Failed to create transaction record:', txError);
    }
    
    console.log(`✅ Card activated successfully!`);
    console.log(`   Card: ${maskCardNumber(cardNumber)}`);
    console.log(`   BTC credited: ${btcPurchase.btcAmount}`);
    console.log(`   New balance: ${newBtcBalance} BTC`);
    
    return {
      success: true,
      message: 'Card activated successfully! BTC has been credited to your wallet.',
      btcAmount: btcPurchase.btcAmount,
      btcPrice: btcPurchase.price,
      cardDenomination: card.denomination,
      walletBalance: newBtcBalance,
      transactionId: btcPurchase.transactionId
    };
    
  } catch (error) {
    console.error('Card activation error:', error);
    throw error;
  }
};

/**
 * Assign cards to a retail store
 * @param {Array<string>} cardIds - Array of card IDs
 * @param {string} storeId - Store ID
 * @param {string} adminId - Admin performing the action
 * @returns {Promise<Object>}
 */
const assignCardsToStore = async (cardIds, storeId, adminId) => {
  try {
    // Verify store exists
    const { data: store } = await supabase
      .from('retail_stores')
      .select('id, store_name')
      .eq('id', storeId)
      .single();
    
    if (!store) {
      throw new Error('Store not found');
    }
    
    // Update cards
    const { data: updatedCards, error } = await supabase
      .from('crypto_cards')
      .update({
        status: CARD_STATUS.ASSIGNED_TO_STORE,
        assigned_store_id: storeId,
        assigned_at: new Date().toISOString()
      })
      .in('id', cardIds)
      .eq('status', CARD_STATUS.GENERATED)
      .select();
    
    if (error) {
      throw new Error('Failed to assign cards to store');
    }
    
    // Log activity
    await supabase
      .from('admin_activity_log')
      .insert({
        admin_id: adminId,
        action: 'ASSIGN_CARDS_TO_STORE',
        resource_type: 'crypto_cards',
        details: {
          store_id: storeId,
          store_name: store.store_name,
          card_ids: cardIds,
          count: updatedCards?.length || 0
        }
      });
    
    return {
      success: true,
      assignedCount: updatedCards?.length || 0,
      storeName: store.store_name
    };
    
  } catch (error) {
    console.error('Error assigning cards to store:', error);
    throw error;
  }
};

/**
 * Get card details (for admin/store viewing)
 * @param {string} cardId - Card ID
 * @returns {Promise<Object>}
 */
const getCardDetails = async (cardId) => {
  try {
    const { data: card, error } = await supabase
      .from('crypto_cards')
      .select(`
        *,
        activated_by_user:activated_by (
          id,
          email,
          first_name,
          last_name
        ),
        assigned_store:assigned_store_id (
          id,
          store_name,
          store_code
        )
      `)
      .eq('id', cardId)
      .single();
    
    if (error || !card) {
      throw new Error('Card not found');
    }
    
    return {
      success: true,
      card: {
        ...card,
        masked_card_number: maskCardNumber(card.card_number)
      }
    };
    
  } catch (error) {
    console.error('Error getting card details:', error);
    throw error;
  }
};

module.exports = {
  generateCards,
  activateCard,
  assignCardsToStore,
  getCardDetails
};