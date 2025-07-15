import { supabase, TABLES } from './supabase';
import { User, PartnerInvite, ApiResponse } from '../types';

// Generate random partner code
const generatePartnerCode = (): string => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

// Sign up new user
export const signUp = async (email: string, password: string, name: string): Promise<ApiResponse<User>> => {
  try {
    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      return { success: false, error: authError.message };
    }

    if (!authData.user) {
      return { success: false, error: 'Failed to create user' };
    }

    // Create user profile
    const userData = {
      id: authData.user.id,
      email,
      name,
      partner_code: generatePartnerCode(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data: profileData, error: profileError } = await supabase
      .from(TABLES.USERS)
      .insert(userData)
      .select()
      .single();

    if (profileError) {
      return { success: false, error: profileError.message };
    }

    return {
      success: true,
      data: {
        id: profileData.id,
        email: profileData.email,
        name: profileData.name,
        partnerCode: profileData.partner_code,
        partnerId: profileData.partner_id,
        createdAt: profileData.created_at,
        updatedAt: profileData.updated_at,
      }
    };
  } catch (error) {
    return { success: false, error: 'An unexpected error occurred' };
  }
};

// Sign in user
export const signIn = async (email: string, password: string): Promise<ApiResponse<User>> => {
  try {
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      return { success: false, error: authError.message };
    }

    if (!authData.user) {
      return { success: false, error: 'Failed to sign in' };
    }

    // Get user profile
    const { data: profileData, error: profileError } = await supabase
      .from(TABLES.USERS)
      .select('*')
      .eq('id', authData.user.id)
      .single();

    if (profileError) {
      return { success: false, error: profileError.message };
    }

    return {
      success: true,
      data: {
        id: profileData.id,
        email: profileData.email,
        name: profileData.name,
        partnerCode: profileData.partner_code,
        partnerId: profileData.partner_id,
        createdAt: profileData.created_at,
        updatedAt: profileData.updated_at,
      }
    };
  } catch (error) {
    return { success: false, error: 'An unexpected error occurred' };
  }
};

// Sign out user
export const signOut = async (): Promise<ApiResponse<null>> => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (error) {
    return { success: false, error: 'An unexpected error occurred' };
  }
};

// Create partner invite
export const createPartnerInvite = async (userId: string): Promise<ApiResponse<PartnerInvite>> => {
  try {
    // Get user info
    const { data: userData, error: userError } = await supabase
      .from(TABLES.USERS)
      .select('email, name')
      .eq('id', userId)
      .single();

    if (userError) {
      return { success: false, error: userError.message };
    }

    const inviteData = {
      invite_code: generatePartnerCode(),
      inviter_id: userId,
      inviter_email: userData.email,
      inviter_name: userData.name,
      used: false,
      created_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
    };

    const { data: inviteResult, error: inviteError } = await supabase
      .from(TABLES.PARTNER_INVITES)
      .insert(inviteData)
      .select()
      .single();

    if (inviteError) {
      return { success: false, error: inviteError.message };
    }

    return {
      success: true,
      data: {
        id: inviteResult.id,
        inviteCode: inviteResult.invite_code,
        inviterId: inviteResult.inviter_id,
        inviterEmail: inviteResult.inviter_email,
        inviterName: inviteResult.inviter_name,
        used: inviteResult.used,
        createdAt: inviteResult.created_at,
        expiresAt: inviteResult.expires_at,
      }
    };
  } catch (error) {
    return { success: false, error: 'An unexpected error occurred' };
  }
};

// Accept partner invite
export const acceptPartnerInvite = async (inviteCode: string, userId: string): Promise<ApiResponse<User>> => {
  try {
    // Find the invite
    const { data: inviteData, error: inviteError } = await supabase
      .from(TABLES.PARTNER_INVITES)
      .select('*')
      .eq('invite_code', inviteCode)
      .eq('used', false)
      .gt('expires_at', new Date().toISOString())
      .single();

    if (inviteError || !inviteData) {
      return { success: false, error: 'Invalid or expired invite code' };
    }

    // Update both users to be partners
    const { error: updateError1 } = await supabase
      .from(TABLES.USERS)
      .update({ 
        partner_id: userId,
        updated_at: new Date().toISOString()
      })
      .eq('id', inviteData.inviter_id);

    const { error: updateError2 } = await supabase
      .from(TABLES.USERS)
      .update({ 
        partner_id: inviteData.inviter_id,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId);

    if (updateError1 || updateError2) {
      return { success: false, error: 'Failed to connect partners' };
    }

    // Mark invite as used
    await supabase
      .from(TABLES.PARTNER_INVITES)
      .update({ used: true })
      .eq('id', inviteData.id);

    // Return updated user
    const { data: userData, error: userError } = await supabase
      .from(TABLES.USERS)
      .select('*')
      .eq('id', userId)
      .single();

    if (userError) {
      return { success: false, error: userError.message };
    }

    return {
      success: true,
      data: {
        id: userData.id,
        email: userData.email,
        name: userData.name,
        partnerCode: userData.partner_code,
        partnerId: userData.partner_id,
        createdAt: userData.created_at,
        updatedAt: userData.updated_at,
      }
    };
  } catch (error) {
    return { success: false, error: 'An unexpected error occurred' };
  }
};

// Get current user profile
export const getCurrentUserProfile = async (): Promise<ApiResponse<User>> => {
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return { success: false, error: 'User not authenticated' };
    }

    const { data: profileData, error: profileError } = await supabase
      .from(TABLES.USERS)
      .select('*')
      .eq('id', user.id)
      .single();

    if (profileError) {
      return { success: false, error: profileError.message };
    }

    return {
      success: true,
      data: {
        id: profileData.id,
        email: profileData.email,
        name: profileData.name,
        partnerCode: profileData.partner_code,
        partnerId: profileData.partner_id,
        createdAt: profileData.created_at,
        updatedAt: profileData.updated_at,
      }
    };
  } catch (error) {
    return { success: false, error: 'An unexpected error occurred' };
  }
};