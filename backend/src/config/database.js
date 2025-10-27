// src/config/database.js - Supabase Database Configuration
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ ERROR: SUPABASE_URL and SUPABASE_SERVICE_KEY must be set in environment variables');
  console.error('Please add them to your .env file');
  process.exit(1);
}

// Create Supabase client with service role key (full access for backend)
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

/**
 * Test database connection
 * @returns {Promise<boolean>}
 */
const testConnection = async () => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('count')
      .limit(1);
    
    if (error && error.code !== 'PGRST116') {
      throw error;
    }
    
    console.log('✅ Supabase connected successfully');
    console.log(`📊 Database URL: ${supabaseUrl}`);
    return true;
  } catch (error) {
    console.error('❌ Supabase connection failed:', error.message);
    return false;
  }
};

/**
 * Helper function to handle Supabase errors consistently
 * @param {Object} error - Supabase error object
 * @returns {Object|null} Formatted error or null
 */
const handleSupabaseError = (error) => {
  if (!error) return null;
  
  return {
    message: error.message || 'Database operation failed',
    code: error.code || 'DB_ERROR',
    details: error.details || error.hint || null,
    status: error.status || 500
  };
};

/**
 * Execute a query with error handling
 * @param {Function} queryFn - Async function that performs the query
 * @returns {Promise<{data: any, error: Object|null}>}
 */
const executeQuery = async (queryFn) => {
  try {
    const result = await queryFn();
    
    if (result.error) {
      return {
        data: null,
        error: handleSupabaseError(result.error)
      };
    }
    
    return {
      data: result.data,
      error: null
    };
  } catch (error) {
    return {
      data: null,
      error: {
        message: error.message,
        code: 'QUERY_ERROR',
        status: 500
      }
    };
  }
};

module.exports = { 
  supabase, 
  testConnection,
  handleSupabaseError,
  executeQuery
};