import { createClient } from '@supabase/supabase-js';

// Environment variables for Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});

// Database table names as constants
export const TABLES = {
  USERS: 'users',
  BABY_NAMES: 'baby_names',
  USER_SWIPES: 'user_swipes',
  MATCHES: 'matches',
  PARTNER_INVITES: 'partner_invites'
} as const;

// Real-time channel types
export type RealtimeChannel = 'matches' | 'user_swipes' | 'partner_invites';

// Helper function to get user session
export const getUserSession = async () => {
  const { data: { session }, error } = await supabase.auth.getSession();
  return { session, error };
};

// Helper function to get current user
export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
};