// src/routes/cardRoutes.js - Card management routes
const express = require('express');
const router = express.Router();
const { authenticate, authorize, isAdmin, isSuperAdmin, isRetailStore } = require('../middleware/auth');
const { generateCards, activateCard, assignCardsToStore, getCardDetails } = require('../services/cardService');

/**
 * @route   POST /api/cards/generate
 * @desc    Generate crypto gift cards (Super Admin only)
 * @access  Private (Super Admin)
 */
router.post('/generate', authenticate, authorize([isSuperAdmin]), async (req, res) => {
  try {
    const { denomination, quantity, assignToStoreId } = req.body;
    
    // Validation
    if (!denomination || !quantity) {
      return res.status(400).json({
        success: false,
        error: 'Denomination and quantity are required'
      });
    }
    
    if (quantity < 1 || quantity > 1000) {
      return res.status(400).json({
        success: false,
        error: 'Quantity must be between 1 and 1000'
      });
    }
    
    const result = await generateCards(
      denomination,
      quantity,
      req.user.id,
      assignToStoreId
    );
    
    res.status(201).json({
      success: true,
      message: `Successfully generated ${quantity} cards`,
      data: result
    });
    
  } catch (error) {
    console.error('Generate cards error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate cards'
    });
  }
});

/**
 * @route   POST /api/cards/activate
 * @desc    Activate a crypto gift card
 * @access  Public (but requires valid card)
 */
router.post('/activate', async (req, res) => {
  try {
    const { cardNumber, pin } = req.body;
    
    // Validation
    if (!cardNumber || !pin) {
      return res.status(400).json({
        success: false,
        error: 'Card number and PIN are required'
      });
    }
    
    // Optional: If user is authenticated, pass their ID
    const userId = req.user ? req.user.id : null;
    
    const result = await activateCard(cardNumber, pin, userId);
    
    res.status(200).json({
      success: true,
      message: 'Card activated successfully',
      data: result
    });
    
  } catch (error) {
    console.error('Card activation error:', error);
    
    // Handle specific error cases
    if (error.message.includes('not found')) {
      return res.status(404).json({
        success: false,
        error: 'Invalid card number'
      });
    }
    
    if (error.message.includes('PIN')) {
      return res.status(401).json({
        success: false,
        error: 'Invalid PIN'
      });
    }
    
    if (error.message.includes('already activated')) {
      return res.status(400).json({
        success: false,
        error: 'Card has already been activated'
      });
    }
    
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to activate card'
    });
  }
});

/**
 * @route   POST /api/cards/assign-to-store
 * @desc    Assign cards to a retail store (Admin only)
 * @access  Private (Admin, Super Admin)
 */
router.post('/assign-to-store', authenticate, authorize([isAdmin, isSuperAdmin]), async (req, res) => {
  try {
    const { storeId, cardIds } = req.body;
    
    // Validation
    if (!storeId || !cardIds || !Array.isArray(cardIds)) {
      return res.status(400).json({
        success: false,
        error: 'Store ID and card IDs array are required'
      });
    }
    
    if (cardIds.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'At least one card ID is required'
      });
    }
    
    const result = await assignCardsToStore(storeId, cardIds, req.user.id);
    
    res.status(200).json({
      success: true,
      message: `Successfully assigned ${cardIds.length} cards to store`,
      data: result
    });
    
  } catch (error) {
    console.error('Assign cards error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to assign cards to store'
    });
  }
});

/**
 * @route   GET /api/cards/:cardId
 * @desc    Get card details
 * @access  Private
 */
router.get('/:cardId', authenticate, async (req, res) => {
  try {
    const { cardId } = req.params;
    
    const result = await getCardDetails(cardId);
    
    // Check if user has permission to view this card
    const card = result.card;
    const user = req.user;
    
    // Allow if:
    // 1. User is admin/super admin
    // 2. User activated this card
    // 3. User used this card
    const hasPermission = 
      user.role === 'admin' || 
      user.role === 'super_admin' ||
      card.activated_by === user.id ||
      card.used_by === user.id;
    
    if (!hasPermission) {
      return res.status(403).json({
        success: false,
        error: 'You do not have permission to view this card'
      });
    }
    
    res.status(200).json({
      success: true,
      data: result
    });
    
  } catch (error) {
    console.error('Get card details error:', error);
    
    if (error.message.includes('not found')) {
      return res.status(404).json({
        success: false,
        error: 'Card not found'
      });
    }
    
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to get card details'
    });
  }
});

/**
 * @route   GET /api/cards/store/:storeId
 * @desc    Get all cards assigned to a store (Store/Admin only)
 * @access  Private
 */
router.get('/store/:storeId', authenticate, authorize([isRetailStore, isAdmin, isSuperAdmin]), async (req, res) => {
  try {
    const { storeId } = req.params;
    const { status, page = 1, limit = 50 } = req.query;
    
    // If user is a store, make sure they can only see their own cards
    if (req.user.role === 'retail_store' && req.user.store_id !== storeId) {
      return res.status(403).json({
        success: false,
        error: 'You can only view cards for your own store'
      });
    }
    
    const { supabase } = require('../config/database');
    
    let query = supabase
      .from('crypto_cards')
      .select('*, assigned_store:assigned_store_id(id, store_name, store_code)', { count: 'exact' })
      .eq('assigned_store_id', storeId)
      .order('created_at', { ascending: false });
    
    if (status) {
      query = query.eq('status', status);
    }
    
    const offset = (page - 1) * limit;
    query = query.range(offset, offset + limit - 1);
    
    const { data: cards, error, count } = await query;
    
    if (error) throw error;
    
    res.status(200).json({
      success: true,
      data: {
        cards,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: count,
          pages: Math.ceil(count / limit)
        }
      }
    });
    
  } catch (error) {
    console.error('Get store cards error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to get store cards'
    });
  }
});

/**
 * @route   GET /api/cards/batch/:batchId
 * @desc    Get all cards in a batch (Admin only)
 * @access  Private (Admin, Super Admin)
 */
router.get('/batch/:batchId', authenticate, authorize([isAdmin, isSuperAdmin]), async (req, res) => {
  try {
    const { batchId } = req.params;
    const { status, page = 1, limit = 100 } = req.query;
    
    const { supabase } = require('../config/database');
    
    let query = supabase
      .from('crypto_cards')
      .select('*', { count: 'exact' })
      .eq('batch_id', batchId)
      .order('created_at', { ascending: false });
    
    if (status) {
      query = query.eq('status', status);
    }
    
    const offset = (page - 1) * limit;
    query = query.range(offset, offset + limit - 1);
    
    const { data: cards, error, count } = await query;
    
    if (error) throw error;
    
    res.status(200).json({
      success: true,
      data: {
        cards,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: count,
          pages: Math.ceil(count / limit)
        }
      }
    });
    
  } catch (error) {
    console.error('Get batch cards error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to get batch cards'
    });
  }
});

module.exports = router;