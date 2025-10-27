// scripts/setupTestData.js - Setup test admin and generate crypto cards
const mongoose = require('mongoose');
const User = require('../models/User');
const CryptoGiftCard = require('../models/CryptoGiftCard');
require('dotenv').config();

async function setupTestData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Create admin user if doesn't exist
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
        kycData: {
          emailVerified: true
        }
      });
      
      await adminUser.save();
      console.log('Admin user created:', adminUser.email);
    } else {
      console.log('Admin user already exists:', adminUser.email);
    }

    // Generate test crypto gift cards
    console.log('\nGenerating test crypto gift cards...');
    
    // Generate 5 cards of each value
    const cardValues = [50, 100, 200, 500];
    const results = [];
    
    for (const value of cardValues) {
      const batch = await CryptoGiftCard.generateBatch(value, 5, adminUser._id);
      results.push({
        value: `${value}`,
        count: batch.cards.length,
        batchId: batch.batchId,
        cards: batch.cards.map(card => ({
          cardNumber: card.cardNumber,
          pin: card.plainPin || 'HASHED', // Use the temporary plain PIN
          maskedNumber: card.maskedCardNumber
        }))
      });
      
      console.log(`Generated ${batch.cards.length} cards worth $${value} each`);
    }

    // Display summary
    console.log('\n=== TEST DATA SETUP COMPLETE ===');
    console.log('Admin Login Credentials:');
    console.log('Email: admin@globalpay.com');
    console.log('Password: Admin123!');
    
    console.log('\nGenerated Cards Summary:');
    results.forEach(result => {
      console.log(`\n${result.value} Cards (${result.count} cards):`);
      result.cards.forEach((card, index) => {
        console.log(`  ${index + 1}. Card: ${card.cardNumber} | PIN: [Check database]`);
      });
    });

    console.log('\nTotal cards generated:', results.reduce((sum, r) => sum + r.count, 0));
    console.log('Total value:', results.reduce((sum, r) => sum + (parseInt(r.value.slice(1)) * r.count), 0));

    process.exit(0);
  } catch (error) {
    console.error('Setup failed:', error);
    process.exit(1);
  }
}

setupTestData();