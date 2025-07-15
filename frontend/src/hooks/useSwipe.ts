import { useState, useEffect, useCallback } from 'react';
import { BabyName, Match, SwipeState, MatchState } from '../types';
import { getBabyNames, getUserSwipedNameIds, recordSwipe, subscribeToMatches } from '../services/names';
import { useAuth } from './useAuth';
import toast from 'react-hot-toast';

interface UseSwipeReturn {
  // Swipe state
  swipeState: SwipeState;
  matchState: MatchState;
  
  // Actions
  swipeLeft: (nameId: string) => Promise<void>;
  swipeRight: (nameId: string) => Promise<void>;
  loadMoreNames: () => Promise<void>;
  clearNewMatch: () => void;
  setGenderFilter: (gender?: 'boy' | 'girl' | 'neutral') => void;
  
  // Current name
  currentName: BabyName | null;
  hasNames: boolean;
}

export const useSwipe = (): UseSwipeReturn => {
  const { user } = useAuth();
  const [swipeState, setSwipeState] = useState<SwipeState>({
    currentNames: [],
    currentIndex: 0,
    loading: true,
    hasMore: true,
  });
  
  const [matchState, setMatchState] = useState<MatchState>({
    matches: [],
    newMatch: null,
    loading: false,
  });

  const [genderFilter, setGenderFilterState] = useState<'boy' | 'girl' | 'neutral' | undefined>(undefined);
  const [swipedNameIds, setSwipedNameIds] = useState<string[]>([]);

  // Load initial names when user is available
  useEffect(() => {
    if (user) {
      initializeSwipe();
      
      // Subscribe to real-time matches
      const unsubscribe = subscribeToMatches(user.id, (match) => {
        setMatchState(prev => ({
          ...prev,
          newMatch: match,
          matches: [match, ...prev.matches],
        }));
        toast.success(`It's a match! You both like ${match.name.name} 💕`);
      });

      return unsubscribe;
    }
  }, [user]);

  // Reload names when gender filter changes
  useEffect(() => {
    if (user) {
      loadNames(true);
    }
  }, [genderFilter]);

  const initializeSwipe = async () => {
    if (!user) return;

    setSwipeState(prev => ({ ...prev, loading: true }));
    
    try {
      // Get user's swiped name IDs
      const swipedResult = await getUserSwipedNameIds(user.id);
      if (swipedResult.success && swipedResult.data) {
        setSwipedNameIds(swipedResult.data);
        await loadNames(true, swipedResult.data);
      } else {
        await loadNames(true);
      }
    } catch (error) {
      setSwipeState(prev => ({ ...prev, loading: false }));
      toast.error('Failed to load names');
    }
  };

  const loadNames = async (reset: boolean = false, excludeIds: string[] = swipedNameIds) => {
    if (!user) return;

    const offset = reset ? 0 : swipeState.currentNames.length;
    const limit = 20;

    try {
      const result = await getBabyNames(offset, limit, genderFilter, excludeIds);
      
      if (result.success && result.data) {
        setSwipeState(prev => ({
          ...prev,
          currentNames: reset ? result.data : [...prev.currentNames, ...result.data],
          currentIndex: reset ? 0 : prev.currentIndex,
          loading: false,
          hasMore: result.data.length === limit,
        }));
      } else {
        setSwipeState(prev => ({
          ...prev,
          loading: false,
          hasMore: false,
        }));
        if (result.error) {
          toast.error(result.error);
        }
      }
    } catch (error) {
      setSwipeState(prev => ({
        ...prev,
        loading: false,
        hasMore: false,
      }));
      toast.error('Failed to load names');
    }
  };

  const loadMoreNames = useCallback(async () => {
    if (swipeState.loading || !swipeState.hasMore) return;
    await loadNames(false);
  }, [swipeState.loading, swipeState.hasMore, swipedNameIds, genderFilter]);

  const performSwipe = async (nameId: string, isLike: boolean) => {
    if (!user) return;

    try {
      // Record the swipe
      const result = await recordSwipe(user.id, nameId, isLike);
      
      if (result.success && result.data) {
        // Update swiped IDs
        setSwipedNameIds(prev => [...prev, nameId]);
        
        // Move to next name
        setSwipeState(prev => ({
          ...prev,
          currentIndex: prev.currentIndex + 1,
        }));

        // If it's a match, handle it
        if (result.data.isMatch && result.data.match) {
          setMatchState(prev => ({
            ...prev,
            newMatch: result.data.match!,
            matches: [result.data.match!, ...prev.matches],
          }));
          toast.success(`It's a match! You both like ${result.data.match.name.name} 💕`);
        }

        // Load more names if we're running low
        if (swipeState.currentIndex >= swipeState.currentNames.length - 3 && swipeState.hasMore) {
          loadMoreNames();
        }
      } else {
        toast.error(result.error || 'Failed to record swipe');
      }
    } catch (error) {
      toast.error('Failed to record swipe');
    }
  };

  const swipeLeft = useCallback(async (nameId: string) => {
    await performSwipe(nameId, false);
  }, [user]);

  const swipeRight = useCallback(async (nameId: string) => {
    await performSwipe(nameId, true);
  }, [user]);

  const clearNewMatch = useCallback(() => {
    setMatchState(prev => ({ ...prev, newMatch: null }));
  }, []);

  const setGenderFilter = useCallback((gender?: 'boy' | 'girl' | 'neutral') => {
    setGenderFilterState(gender);
  }, []);

  // Current name being displayed
  const currentName = swipeState.currentNames[swipeState.currentIndex] || null;
  const hasNames = swipeState.currentNames.length > 0;

  return {
    swipeState,
    matchState,
    swipeLeft,
    swipeRight,
    loadMoreNames,
    clearNewMatch,
    setGenderFilter,
    currentName,
    hasNames,
  };
};