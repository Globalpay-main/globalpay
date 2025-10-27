// scripts/simpleTest.js - Create test cards manually
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
require('dotenv').config();

// Simple card schema for testing
const testCardSchema = new mongoose.Schema({
  cardNumber: { type: String, required: true, unique: true },
  pinHash: { type: String, required: true },
  valueUSD: { type: Number, required: true },
  prefix: { type: String, required: true },
  status: { type: String, default: 'generated' },
  generatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  tokenId: String,
  mintTransactionHash: String,
  batchId: String,
  securityHash: String
}, { timestamps: true });

async function createTestCards() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Create test model
    const TestCard = mongoose.model('CryptoGiftCard', testCardSchema);

    // Create admin user if needed
    const User = require('../models/User');
    let adminUser = await User.findOne({ email: 'admin@globalpay.com' });
    
    if (!adminUser) {
      adminUser = new User({
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@globalpay.com',
        password: 'Admin123!',
        signupMethod: 'email',
        isVerified: true,
        isAdmin: true,
        kycLevel: 'full',
        kycData: { emailVerified: true }
      });
      await adminUser.save();
      console.log('Admin user created');
    }

    // Generate test cards manually
    const cardValues = [
      { value: 50, prefix: '05', count: 3 },
      { value: 100, prefix: '10', count: 3 },
      { value: 200, prefix: '20', count: 2 },
      { value: 500, prefix: '50', count: 2 }
    ];

    const testCards = [];
    const batchId = crypto.randomUUID();

    for (const cardType of cardValues) {
      for (let i = 0; i < cardType.count; i++) {
        // Generate random 10 digits after prefix
        const randomDigits = Math.random().toString().slice(2, 12);
        const cardNumber = cardType.prefix + randomDigits;
        
        // Generate 4-digit PIN
        const pin = Math.floor(1000 + Math.random() * 9000).toString();
        
        // Hash the PIN
        const salt = await bcrypt.genSalt(12);
        const pinHash = await bcrypt.hash(pin, salt);
        
        const card = new TestCard({
          cardNumber,
          pinHash,
          valueUSD: cardType.value,
          prefix: cardType.prefix,
          generatedBy: adminUser._id,
          batchId,
          securityHash: crypto.createHash('sha256').update(`${cardNumber}${pin}${Date.now()}`).digest('hex')
        });

        await card.save();
        
        testCards.push({
          cardNumber,
          pin,
          value: `$${cardType.value}`,
          maskedNumber: `${cardNumber.slice(0, 4)} **** ${cardNumber.slice(-4)}`
        });

        console.log(`Created card: ${cardNumber} | PIN: ${pin} | Value: $${cardType.value}`);
      }
    }

    console.log('\n=== TEST CARDS CREATED ===');
    console.log('Admin Credentials:');
    console.log('Email: admin@globalpay.com');
    console.log('Password: Admin123!');
    
    console.log('\nTest Cards for Activation:');
    testCards.forEach((card, index) => {
      console.log(`${index + 1}. Card: ${card.cardNumber} | PIN: ${card.pin} | Value: ${card.value}`);
    });

    console.log(`\nTotal Cards: ${testCards.length}`);
    console.log('Batch ID:', batchId);

    process.exit(0);
  } catch (error) {
    console.error('Test setup failed:', error);
    process.exit(1);
  }
}

createTestCards();