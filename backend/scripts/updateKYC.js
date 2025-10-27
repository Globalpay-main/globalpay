const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

async function updateUserKYC() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const result = await User.updateOne(
      { phone: "+1234567890" },
      { 
        $set: { 
          kycLevel: "minimal",
          "kycData.phoneVerified": true 
        } 
      }
    );

    console.log('Update result:', result);

    const user = await User.findOne({ phone: "+1234567890" });
    console.log('Updated user KYC level:', user.kycLevel);

    process.exit(0);
  } catch (error) {
    console.error('Update failed:', error);
    process.exit(1);
  }
}

updateUserKYC();