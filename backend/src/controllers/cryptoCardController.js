// backend/controllers/cryptoCardController.js - Updated with Bulk Generation
const CryptoGiftCard = require('../models/CryptoGiftCard');
const CryptoWallet = require('../models/CryptoWallet');
const User = require('../models/User');
const blockchainService = require('../services/blockchainService');

// Generate crypto gift cards (Admin only) - UPDATED for bulk generation
const generateCards = async (req, res) => {
  try {
    const { valueUSD, count = 5, denominations } = req.body;
    const generatedBy = req.user.id;

    // Support both single denomination and bulk generation
    let cardsToGenerate = [];
    
    if (denominations) {
      // Bulk generation across multiple denominations
      for (const [value, qty] of Object.entries(denominations)) {
        const valueNum = parseInt(value);
        const quantity = parseInt(qty);
        
        // Validate each denomination
        if (![50, 100, 200, 500].includes(valueNum)) {
          return res.status(400).json({
            success: false,
            message: `Invalid denomination: $${valueNum}. Must be $50, $100, $200, or $500`
          });
        }
        
        if (quantity < 1 || quantity > 50) {
          return res.status(400).json({
            success: false,
            message: `Count for $${valueNum} must be between 1 and 50`
          });
        }
        
        cardsToGenerate.push({ value: valueNum, count: quantity });
      }
    } else {
      // Single denomination generation (original functionality)
      if (!valueUSD || ![50, 100, 200, 500].includes(valueUSD)) {
        return res.status(400).json({
          success: false,
          message: 'Value must be $50, $100, $200, or $500'
        });
      }

      if (count < 1 || count > 100) {
        return res.status(400).json({
          success: false,
          message: 'Count must be between 1 and 100'
        });
      }
      
      cardsToGenerate.push({ value: valueUSD, count });
    }

    // Generate all cards
    const allResults = [];
    const allBlockchainResults = [];
    let totalCards = 0;
    let totalValue = 0;
    
    for (const { value, count: qty } of cardsToGenerate) {
      try {
        // Generate batch for this denomination
        const result = await CryptoGiftCard.generateBatch(value, qty, generatedBy);
        
        // Mint cards on blockchain
        for (const card of result.cards) {
          try {
            const mintResult = await blockchainService.mintGiftCard(
              card.cardNumber,
              card.valueUSD
            );
            
            // Update card with blockchain info
            card.tokenId = mintResult.tokenId;
            card.mintTransactionHash = mintResult.transactionHash;
            await card.save();
            
            allBlockchainResults.push({
              cardNumber: card.maskedCardNumber,
              value: card.valueUSD,
              tokenId: mintResult.tokenId,
              transactionHash: mintResult.transactionHash
            });
          } catch (blockchainError) {
            console.error('Blockchain minting failed for card:', card.cardNumber, blockchainError);
            // Continue with other cards even if one fails
          }
        }
        
        allResults.push({
          denomination: `$${value}`,
          count: qty,
          batchId: result.batchId,
          cards: result.cards.map(card => ({
            id: card._id,
            cardNumber: card.cardNumber, // Full number for testing
            maskedCardNumber: card.maskedCardNumber,
            pin: card.pin, // Include PIN for testing
            valueUSD: card.valueUSD,
            tokenId: card.tokenId
          }))
        });
        
        totalCards += qty;
        totalValue += value * qty;
        
      } catch (error) {
        console.error(`Failed to generate $${value} cards:`, error);
        // Continue with other denominations
      }
    }

    if (allResults.length === 0) {
      return res.status(500).json({
        success: false,
        message: 'Failed to generate any cards'
      });
    }

    const response = {
      success: true,
      message: denominations 
        ? `Generated ${totalCards} crypto gift cards across ${Object.keys(denominations).length} denominations`
        : `Generated ${count} crypto gift cards worth $${valueUSD} each`,
      results: allResults,
      summary: {
        totalCards,
        totalValue,
        denominations: allResults.map(r => ({
          value: r.denomination,
          count: r.count,
          subtotal: r.cards[0].valueUSD * r.count
        }))
      },
      blockchainResults: allBlockchainResults
    };

    res.status(201).json(response);

  } catch (error) {
    console.error('Card generation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate crypto gift cards'
    });
  }
};

// Activate crypto gift card (unchanged)
const activateCard = async (req, res) => {
  try {
    const { cardNumber, pin } = req.body;
    const userId = req.user ? req.user.id : null;

    // Validate input
    if (!cardNumber || !pin) {
      return res.status(400).json({
        success: false,
        message: 'Card number and PIN are required'
      });
    }

    // Clean card number (remove spaces)
    const cleanCardNumber = cardNumber.replace(/\s/g, '');

    if (!/^\d{12}$/.test(cleanCardNumber)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid card number format'
      });
    }

    if (!/^\d{4}$/.test(pin)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid PIN format'
      });
    }

    // Find the card
    const card = await CryptoGiftCard.findOne({ cardNumber: cleanCardNumber });
    
    if (!card) {
      return res.status(404).json({
        success: false,
        message: 'Gift card not found'
      });
    }

    // Check card status
    if (card.status !== 'generated') {
      return res.status(400).json({
        success: false,
        message: 'Card has already been activated or is not available'
      });
    }

    // Check if card is expired
    if (card.isExpired()) {
      return res.status(400).json({
        success: false,
        message: 'Gift card has expired'
      });
    }

    // Verify PIN
    const isPinValid = await card.verifyPin(pin);
    if (!isPinValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid PIN'
      });
    }

    // Check if user needs to complete KYC first
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required for card activation',
        requiresAuth: true
      });
    }

    const user = await User.findById(userId);
    if (user.kycLevel === 'none') {
      return res.status(403).json({
        success: false,
        message: 'Minimal KYC verification required for card activation',
        requiresKYC: true,
        cardId: card._id
      });
    }

    // Check transaction limits
    if (!user.canPerformTransaction(card.valueUSD)) {
      return res.status(403).json({
        success: false,
        message: 'Card value exceeds your transaction limits. Complete full KYC to increase limits.',
        requiresFullKYC: true
      });
    }

    // Activate card on blockchain
    let blockchainResult = null;
    if (card.tokenId) {
      try {
        blockchainResult = await blockchainService.activateGiftCard(
          card.tokenId,
          user.walletAddress
        );
      } catch (blockchainError) {
        console.error('Blockchain activation failed:', blockchainError);
        // Continue with activation even if blockchain fails
      }
    }

    // Create crypto wallet for user
    const wallet = await CryptoWallet.createFromGiftCard(
      userId,
      card._id,
      card.valueUSD
    );

    // Fund the wallet
    try {
      await blockchainService.fundWallet(wallet.address, card.valueUSD);
    } catch (fundingError) {
      console.error('Wallet funding failed:', fundingError);
      // Continue even if funding fails - can be done manually
    }

    // Activate the card
    await card.activate(userId, blockchainResult?.transactionHash);

    // Update user's activated cards and total transaction amount
    user.activatedCards.push(card._id);
    user.wallets.push(wallet._id);
    user.totalTransactionAmount += card.valueUSD;
    await user.save();

    res.json({
      success: true,
      message: 'Crypto gift card activated successfully!',
      card: {
        id: card._id,
        maskedCardNumber: card.maskedCardNumber,
        valueUSD: card.valueUSD,
        activatedAt: card.activatedAt,
        tokenId: card.tokenId
      },
      wallet: {
        id: wallet._id,
        address: wallet.address,
        shortAddress: wallet.shortAddress,
        initialBalance: card.valueUSD
      },
      blockchainTransaction: blockchainResult?.transactionHash,
      remainingLimit: user.getRemainingLimit()
    });

  } catch (error) {
    console.error('Card activation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to activate crypto gift card'
    });
  }
};

// Get card information (for validation) (unchanged)
const getCardInfo = async (req, res) => {
  try {
    const { cardNumber } = req.params;
    const cleanCardNumber = cardNumber.replace(/\s/g, '');

    const card = await CryptoGiftCard.findOne({ cardNumber: cleanCardNumber })
      .select('valueUSD status expiresAt tokenId');

    if (!card) {
      return res.status(404).json({
        success: false,
        message: 'Card not found'
      });
    }

    // Get card value from prefix for display
    const getValue = () => {
      const prefix = cleanCardNumber.substring(0, 2);
      switch (prefix) {
        case '05': return '$50';
        case '10': return '$100';
        case '20': return '$200';
        case '50': return '$500';
        default: return 'Unknown';
      }
    };

    res.json({
      success: true,
      card: {
        value: getValue(),
        valueUSD: card.valueUSD,
        status: card.status,
        isExpired: card.isExpired(),
        expiresAt: card.expiresAt,
        hasBlockchainToken: !!card.tokenId
      }
    });

  } catch (error) {
    console.error('Get card info error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve card information'
    });
  }
};

// Get user's activated cards (unchanged)
const getUserCards = async (req, res) => {
  try {
    const userId = req.user.id;

    const cards = await CryptoGiftCard.find({ 
      activatedBy: userId 
    })
    .select('cardNumber valueUSD status activatedAt tokenId')
    .populate('walletCreated', 'address shortAddress')
    .sort({ activatedAt: -1 });

    const cardData = cards.map(card => ({
      id: card._id,
      maskedCardNumber: card.maskedCardNumber,
      valueUSD: card.valueUSD,
      status: card.status,
      activatedAt: card.activatedAt,
      tokenId: card.tokenId,
      wallet: card.walletCreated
    }));

    res.json({
      success: true,
      cards: cardData,
      totalCards: cardData.length,
      totalValue: cardData.reduce((sum, card) => sum + card.valueUSD, 0)
    });

  } catch (error) {
    console.error('Get user cards error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve user cards'
    });
  }
};

// Get card statistics (Admin only) (unchanged)
const getCardStatistics = async (req, res) => {
  try {
    const stats = await CryptoGiftCard.getStatistics();
    
    res.json({
      success: true,
      statistics: stats,
      timestamp: new Date()
    });

  } catch (error) {
    console.error('Get card statistics error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve card statistics'
    });
  }
};

// Verify card on blockchain (unchanged)
const verifyCardOnChain = async (req, res) => {
  try {
    const { cardNumber } = req.params;
    const cleanCardNumber = cardNumber.replace(/\s/g, '');

    const card = await CryptoGiftCard.findOne({ cardNumber: cleanCardNumber });
    
    if (!card || !card.tokenId) {
      return res.status(404).json({
        success: false,
        message: 'Card not found or not on blockchain'
      });
    }

    const verification = await blockchainService.verifyGiftCard(card.tokenId);
    
    res.json({
      success: true,
      verification: {
        valid: verification.valid,
        tokenId: card.tokenId,
        blockchainValue: verification.value,
        activated: verification.activated,
        owner: verification.owner,
        cardStatus: card.status,
        simulated: verification.simulated
      }
    });

  } catch (error) {
    console.error('Card verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to verify card on blockchain'
    });
  }
};

module.exports = {
  generateCards,
  activateCard,
  getCardInfo,
  getUserCards,
  getCardStatistics,
  verifyCardOnChain
};