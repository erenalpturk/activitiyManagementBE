// supabase.js
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Supabase API URL ve Anon Public Key
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

// Supabase istemcisini oluştur
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

module.exports = supabase;
