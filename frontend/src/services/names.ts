import { supabase, TABLES } from './supabase';
import { BabyName, UserSwipe, Match, ApiResponse } from '../types';

// Get baby names with pagination and filters
export const getBabyNames = async (
  offset: number = 0,
  limit: number = 20,
  gender?: 'boy' | 'girl' | 'neutral',
  excludeSwipedIds: string[] = []
): Promise<ApiResponse<BabyName[]>> => {
  try {
    let query = supabase
      .from(TABLES.BABY_NAMES)
      .select('*')
      .range(offset, offset + limit - 1)
      .order('popularity', { ascending: false });

    // Filter by gender if specified
    if (gender) {
      query = query.eq('gender', gender);
    }

    // Exclude already swiped names
    if (excludeSwipedIds.length > 0) {
      query = query.not('id', 'in', `(${excludeSwipedIds.join(',')})`);
    }

    const { data, error } = await query;

    if (error) {
      return { success: false, error: error.message };
    }

    const names: BabyName[] = (data || []).map(item => ({
      id: item.id,
      name: item.name,
      gender: item.gender,
      origin: item.origin,
      meaning: item.meaning,
      popularity: item.popularity,
      createdAt: item.created_at,
    }));

    return { success: true, data: names };
  } catch (error) {
    return { success: false, error: 'An unexpected error occurred' };
  }
};

// Get user's swiped name IDs
export const getUserSwipedNameIds = async (userId: string): Promise<ApiResponse<string[]>> => {
  try {
    const { data, error } = await supabase
      .from(TABLES.USER_SWIPES)
      .select('name_id')
      .eq('user_id', userId);

    if (error) {
      return { success: false, error: error.message };
    }

    const nameIds = (data || []).map(item => item.name_id);
    return { success: true, data: nameIds };
  } catch (error) {
    return { success: false, error: 'An unexpected error occurred' };
  }
};

// Record a swipe (like or dislike)
export const recordSwipe = async (
  userId: string,
  nameId: string,
  isLike: boolean
): Promise<ApiResponse<{ isMatch: boolean; match?: Match }>> => {
  try {
    // Insert the swipe
    const swipeData = {
      user_id: userId,
      name_id: nameId,
      is_like: isLike,
      swiped_at: new Date().toISOString(),
    };

    const { error: swipeError } = await supabase
      .from(TABLES.USER_SWIPES)
      .insert(swipeData);

    if (swipeError) {
      return { success: false, error: swipeError.message };
    }

    // If it's a like, check for matches
    if (isLike) {
      // Get current user's partner
      const { data: userData, error: userError } = await supabase
        .from(TABLES.USERS)
        .select('partner_id')
        .eq('id', userId)
        .single();

      if (userError || !userData.partner_id) {
        return { success: true, data: { isMatch: false } };
      }

      // Check if partner also liked this name
      const { data: partnerSwipe, error: partnerSwipeError } = await supabase
        .from(TABLES.USER_SWIPES)
        .select('*')
        .eq('user_id', userData.partner_id)
        .eq('name_id', nameId)
        .eq('is_like', true)
        .single();

      if (partnerSwipeError || !partnerSwipe) {
        return { success: true, data: { isMatch: false } };
      }

      // It's a match! Create match record
      const matchData = {
        name_id: nameId,
        user1_id: userId,
        user2_id: userData.partner_id,
        created_at: new Date().toISOString(),
      };

      const { data: matchResult, error: matchError } = await supabase
        .from(TABLES.MATCHES)
        .insert(matchData)
        .select(`
          *,
          name:baby_names(*)
        `)
        .single();

      if (matchError) {
        return { success: false, error: matchError.message };
      }

      const match: Match = {
        id: matchResult.id,
        nameId: matchResult.name_id,
        name: {
          id: matchResult.name.id,
          name: matchResult.name.name,
          gender: matchResult.name.gender,
          origin: matchResult.name.origin,
          meaning: matchResult.name.meaning,
          popularity: matchResult.name.popularity,
          createdAt: matchResult.name.created_at,
        },
        user1Id: matchResult.user1_id,
        user2Id: matchResult.user2_id,
        notes: matchResult.notes,
        createdAt: matchResult.created_at,
        updatedAt: matchResult.updated_at,
      };

      return { success: true, data: { isMatch: true, match } };
    }

    return { success: true, data: { isMatch: false } };
  } catch (error) {
    return { success: false, error: 'An unexpected error occurred' };
  }
};

// Get user matches
export const getUserMatches = async (userId: string): Promise<ApiResponse<Match[]>> => {
  try {
    const { data, error } = await supabase
      .from(TABLES.MATCHES)
      .select(`
        *,
        name:baby_names(*)
      `)
      .or(`user1_id.eq.${userId},user2_id.eq.${userId}`)
      .order('created_at', { ascending: false });

    if (error) {
      return { success: false, error: error.message };
    }

    const matches: Match[] = (data || []).map(item => ({
      id: item.id,
      nameId: item.name_id,
      name: {
        id: item.name.id,
        name: item.name.name,
        gender: item.name.gender,
        origin: item.name.origin,
        meaning: item.name.meaning,
        popularity: item.name.popularity,
        createdAt: item.name.created_at,
      },
      user1Id: item.user1_id,
      user2Id: item.user2_id,
      notes: item.notes,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
    }));

    return { success: true, data: matches };
  } catch (error) {
    return { success: false, error: 'An unexpected error occurred' };
  }
};

// Update match notes
export const updateMatchNotes = async (matchId: string, notes: string): Promise<ApiResponse<Match>> => {
  try {
    const { data, error } = await supabase
      .from(TABLES.MATCHES)
      .update({ 
        notes,
        updated_at: new Date().toISOString()
      })
      .eq('id', matchId)
      .select(`
        *,
        name:baby_names(*)
      `)
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    const match: Match = {
      id: data.id,
      nameId: data.name_id,
      name: {
        id: data.name.id,
        name: data.name.name,
        gender: data.name.gender,
        origin: data.name.origin,
        meaning: data.name.meaning,
        popularity: data.name.popularity,
        createdAt: data.name.created_at,
      },
      user1Id: data.user1_id,
      user2Id: data.user2_id,
      notes: data.notes,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };

    return { success: true, data: match };
  } catch (error) {
    return { success: false, error: 'An unexpected error occurred' };
  }
};

// Remove a match
export const removeMatch = async (matchId: string): Promise<ApiResponse<null>> => {
  try {
    const { error } = await supabase
      .from(TABLES.MATCHES)
      .delete()
      .eq('id', matchId);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: 'An unexpected error occurred' };
  }
};

// Search names by query
export const searchNames = async (
  query: string,
  gender?: 'boy' | 'girl' | 'neutral',
  limit: number = 20
): Promise<ApiResponse<BabyName[]>> => {
  try {
    let dbQuery = supabase
      .from(TABLES.BABY_NAMES)
      .select('*')
      .ilike('name', `%${query}%`)
      .limit(limit)
      .order('popularity', { ascending: false });

    if (gender) {
      dbQuery = dbQuery.eq('gender', gender);
    }

    const { data, error } = await dbQuery;

    if (error) {
      return { success: false, error: error.message };
    }

    const names: BabyName[] = (data || []).map(item => ({
      id: item.id,
      name: item.name,
      gender: item.gender,
      origin: item.origin,
      meaning: item.meaning,
      popularity: item.popularity,
      createdAt: item.created_at,
    }));

    return { success: true, data: names };
  } catch (error) {
    return { success: false, error: 'An unexpected error occurred' };
  }
};

// Subscribe to real-time matches for a user
export const subscribeToMatches = (userId: string, callback: (match: Match) => void) => {
  const channel = supabase
    .channel('matches')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: TABLES.MATCHES,
        filter: `user1_id=eq.${userId}`,
      },
      async (payload) => {
        // Fetch the complete match data with name details
        const { data } = await supabase
          .from(TABLES.MATCHES)
          .select(`
            *,
            name:baby_names(*)
          `)
          .eq('id', payload.new.id)
          .single();

        if (data) {
          const match: Match = {
            id: data.id,
            nameId: data.name_id,
            name: {
              id: data.name.id,
              name: data.name.name,
              gender: data.name.gender,
              origin: data.name.origin,
              meaning: data.name.meaning,
              popularity: data.name.popularity,
              createdAt: data.name.created_at,
            },
            user1Id: data.user1_id,
            user2Id: data.user2_id,
            notes: data.notes,
            createdAt: data.created_at,
            updatedAt: data.updated_at,
          };
          callback(match);
        }
      }
    )
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: TABLES.MATCHES,
        filter: `user2_id=eq.${userId}`,
      },
      async (payload) => {
        // Fetch the complete match data with name details
        const { data } = await supabase
          .from(TABLES.MATCHES)
          .select(`
            *,
            name:baby_names(*)
          `)
          .eq('id', payload.new.id)
          .single();

        if (data) {
          const match: Match = {
            id: data.id,
            nameId: data.name_id,
            name: {
              id: data.name.id,
              name: data.name.name,
              gender: data.name.gender,
              origin: data.name.origin,
              meaning: data.name.meaning,
              popularity: data.name.popularity,
              createdAt: data.name.created_at,
            },
            user1Id: data.user1_id,
            user2Id: data.user2_id,
            notes: data.notes,
            createdAt: data.created_at,
            updatedAt: data.updated_at,
          };
          callback(match);
        }
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
};