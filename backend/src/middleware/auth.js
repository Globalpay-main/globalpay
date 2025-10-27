const { supabase } = require('../config/supabase');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');

const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, error: 'No token provided' });
    }
    const token = authHeader.substring(7);
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) {
      return res.status(401).json({ success: false, error: 'Invalid token' });
    }
    const { data: dbUser, error: dbError } = await supabase.from('users').select('*').eq('id', user.id).single();
    if (dbError && dbError.code === 'PGRST116') {
      const { data: newUser, error: createError } = await supabase.from('users').insert([{
        id: user.id, email: user.email, phone: user.phone || null,
        first_name: user.user_metadata?.first_name || 'User',
        last_name: user.user_metadata?.last_name || '',
        kyc_level: 'minimal', remaining_limit: 900, total_transaction_amount: 0
      }]).select().single();
      if (createError) {
        return res.status(500).json({ success: false, error: 'Failed to create user' });
      }

      req.user = newUser;
    } else if (dbError) {
      return res.status(500).json({ success: false, error: 'Database error' });
    } else {
      req.user = dbUser;
    }
    next();
  } catch (error) {
    return res.status(401).json({ success: false, error: 'Authentication failed' });
  }
};

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, error: 'No token provided' });
    }
    const token = authHeader.substring(7);
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (!error && user) {
      const { data: dbUser } = await supabase.from('users').select('*').eq('id', user.id).single();
      req.user = dbUser || { id: user.id, email: user.email };
      return next();
    }
    return res.status(401).json({ success: false, error: 'Invalid token' });
  } catch (error) {
    return res.status(401).json({ success: false, error: 'Authentication failed' });
  }
};

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'fallback-secret', { expiresIn: '30d' });
};

const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Authentication required' });
    }
    if (roles.length && !roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, error: 'Insufficient permissions' });
    }
    next();
  };
};

const userRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests, please try again later'
});

const isSuperAdmin = 'super_admin';
const isAdmin = 'admin';
const isRetailStore = 'retail_store';
const isUser = 'user';

module.exports = {
  authenticateUser, authenticate, generateToken, userRateLimit,
  authorize, isSuperAdmin, isAdmin, isRetailStore, isUser
};
