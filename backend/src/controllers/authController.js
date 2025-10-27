// backend/controllers/authController.js - Authentication Controller (No Twilio)
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const validator = require('validator');

// SMS service disabled for testing - will be enabled with proper Twilio credentials
console.log('SMS service disabled - using console logging for phone verification');

// Initialize email transporter
const emailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Security validation functions
const isTemporaryEmail = (email) => {
  const tempEmailDomains = [
    '10minutemail.com', 'tempmail.org', 'guerrillamail.com',
    'mailinator.com', 'throwaway.email', 'temp-mail.org',
    'getnada.com', 'maildrop.cc', 'yopmail.com'
  ];
  const domain = email.split('@')[1]?.toLowerCase();
  return tempEmailDomains.includes(domain);
};

const isGoogleVoiceNumber = async (phone) => {
  // Simplified check for testing - in production use Twilio Lookup API
  console.log('Google Voice check disabled - allowing all phone numbers for testing');
  return false; // Allow all numbers for testing
};

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Signup controller
const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, signupMethod } = req.body;

    // Validation
    if (!firstName || !lastName || !password || !signupMethod) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Validate signup method and corresponding field
    if (signupMethod === 'email') {
      if (!email || !validator.isEmail(email)) {
        return res.status(400).json({
          success: false,
          message: 'Please provide a valid email address'
        });
      }

      // Check for temporary email
      if (isTemporaryEmail(email)) {
        return res.status(400).json({
          success: false,
          message: 'Temporary email addresses are not allowed'
        });
      }

      // Check if email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'An account with this email already exists'
        });
      }
    } else if (signupMethod === 'phone') {
      if (!phone) {
        return res.status(400).json({
          success: false,
          message: 'Please provide a phone number'
        });
      }

      // More flexible phone validation for testing
      if (!/^\+?[\d\s\-\(\)]{10,15}$/.test(phone)) {
        return res.status(400).json({
          success: false,
          message: 'Please provide a valid phone number (10-15 digits)'
        });
      }

      // Check for Google Voice number
      const isGoogleVoice = await isGoogleVoiceNumber(phone);
      if (isGoogleVoice) {
        return res.status(400).json({
          success: false,
          message: 'Google Voice numbers are not allowed'
        });
      }

      // Check if phone already exists
      const existingUser = await User.findOne({ phone });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'An account with this phone number already exists'
        });
      }
    }

    // Create user
    const userData = {
      firstName,
      lastName,
      password,
      signupMethod
    };

    if (signupMethod === 'email') {
      userData.email = email;
    } else {
      userData.phone = phone;
    }

    const user = new User(userData);
    const verificationToken = user.generateVerificationToken();
    await user.save();

    // Send verification
    if (signupMethod === 'email') {
      await sendEmailVerification(email, verificationToken, firstName);
    } else {
      await sendSMSVerification(phone, verificationToken);
    }

    res.status(201).json({
      success: true,
      message: `Verification ${signupMethod === 'email' ? 'email' : 'SMS'} sent successfully`,
      userId: user._id
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Send email verification
const sendEmailVerification = async (email, token, firstName) => {
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
  
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Verify Your GlobalPay Account',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #667eea;">Welcome to GlobalPay, ${firstName}!</h2>
        <p>Thank you for creating your GlobalPay account. Please verify your email address by clicking the button below:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}" style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; display: inline-block;">
            Verify Email Address
          </a>
        </div>
        <p>Or copy and paste this link in your browser:</p>
        <p style="word-break: break-all; color: #667eea;">${verificationUrl}</p>
        <p>This link will expire in 24 hours.</p>
        <p>If you didn't create this account, please ignore this email.</p>
      </div>
    `
  };

  try {
    await emailTransporter.sendMail(mailOptions);
    console.log(`Email verification sent to ${email}`);
  } catch (error) {
    console.error('Email sending failed:', error);
    // For testing, don't fail the signup if email fails
    console.log('Email service not configured - verification email not sent');
  }
};

// Send SMS verification (console logging for testing)
const sendSMSVerification = async (phone, token) => {
  // For testing without Twilio, log the verification code
  const code = token.slice(0, 6).toUpperCase();
  console.log(`\n=== SMS VERIFICATION ===`);
  console.log(`Phone: ${phone}`);
  console.log(`Verification Code: ${code}`);
  console.log(`Use this code to verify the phone number`);
  console.log(`========================\n`);
};

// Verify signup
const verifySignup = async (req, res) => {
  try {
    const { email, phone, code, token } = req.body;

    let user;
    
    if (email) {
      // Email verification
      user = await User.findOne({
        email,
        verificationToken: token,
        verificationExpires: { $gt: Date.now() }
      });
    } else if (phone) {
      // Phone verification - check if code matches first 6 chars of token
      user = await User.findOne({
        phone,
        verificationExpires: { $gt: Date.now() }
      });
      
      if (user && user.verificationToken.slice(0, 6).toUpperCase() !== code.toUpperCase()) {
        user = null;
      }
    }

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired verification code'
      });
    }

    // Mark user as verified
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationExpires = undefined;
    
    if (user.signupMethod === 'email') {
      user.kycData.emailVerified = true;
    } else {
      user.kycData.phoneVerified = true;
    }
    
    await user.save();

    // Generate JWT token
    const authToken = generateToken(user._id);

    res.json({
      success: true,
      message: 'Account verified successfully',
      token: authToken,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        kycLevel: user.kycLevel
      }
    });

  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Login controller
const login = async (req, res) => {
  try {
    const { identifier, password } = req.body; // identifier can be email or phone

    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email/phone and password'
      });
    }

    // Find user by email or phone
    const user = await User.findOne({
      $or: [
        { email: identifier },
        { phone: identifier }
      ]
    });

    if (!user || !await user.comparePassword(password)) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    if (!user.isVerified) {
      return res.status(401).json({
        success: false,
        message: 'Please verify your account before logging in'
      });
    }

    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Your account has been suspended. Please contact support.'
      });
    }

    // Generate JWT token
    const token = generateToken(user._id);

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        kycLevel: user.kycLevel,
        totalTransactionAmount: user.totalTransactionAmount
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

module.exports = {
  signup,
  verifySignup,
  login
};