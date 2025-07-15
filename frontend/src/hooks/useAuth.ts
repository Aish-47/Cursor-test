import { useState, useEffect, useContext, createContext, ReactNode } from 'react';
import { User, AuthState } from '../types';
import { supabase } from '../services/supabase';
import { signIn, signUp, signOut, getCurrentUserProfile, acceptPartnerInvite, createPartnerInvite } from '../services/auth';
import toast from 'react-hot-toast';

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (email: string, password: string, name: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  acceptInvite: (inviteCode: string) => Promise<boolean>;
  createInvite: () => Promise<string | null>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  // Initialize auth state
  useEffect(() => {
    initializeAuth();
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          await loadUserProfile();
        } else if (event === 'SIGNED_OUT') {
          setAuthState({
            user: null,
            loading: false,
            error: null,
          });
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const initializeAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        await loadUserProfile();
      } else {
        setAuthState({
          user: null,
          loading: false,
          error: null,
        });
      }
    } catch (error) {
      setAuthState({
        user: null,
        loading: false,
        error: 'Failed to initialize authentication',
      });
    }
  };

  const loadUserProfile = async () => {
    try {
      const result = await getCurrentUserProfile();
      if (result.success && result.data) {
        setAuthState({
          user: result.data,
          loading: false,
          error: null,
        });
      } else {
        setAuthState({
          user: null,
          loading: false,
          error: result.error || 'Failed to load user profile',
        });
      }
    } catch (error) {
      setAuthState({
        user: null,
        loading: false,
        error: 'Failed to load user profile',
      });
    }
  };

  const handleSignIn = async (email: string, password: string): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    
    const result = await signIn(email, password);
    if (result.success && result.data) {
      setAuthState({
        user: result.data,
        loading: false,
        error: null,
      });
      toast.success('Welcome back!');
      return true;
    } else {
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: result.error || 'Failed to sign in',
      }));
      toast.error(result.error || 'Failed to sign in');
      return false;
    }
  };

  const handleSignUp = async (email: string, password: string, name: string): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    
    const result = await signUp(email, password, name);
    if (result.success && result.data) {
      setAuthState({
        user: result.data,
        loading: false,
        error: null,
      });
      toast.success('Account created successfully!');
      return true;
    } else {
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: result.error || 'Failed to sign up',
      }));
      toast.error(result.error || 'Failed to sign up');
      return false;
    }
  };

  const handleSignOut = async (): Promise<void> => {
    setAuthState(prev => ({ ...prev, loading: true }));
    
    const result = await signOut();
    if (result.success) {
      setAuthState({
        user: null,
        loading: false,
        error: null,
      });
      toast.success('Signed out successfully');
    } else {
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: result.error || 'Failed to sign out',
      }));
      toast.error(result.error || 'Failed to sign out');
    }
  };

  const handleAcceptInvite = async (inviteCode: string): Promise<boolean> => {
    if (!authState.user) {
      toast.error('You must be logged in to accept an invite');
      return false;
    }

    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    
    const result = await acceptPartnerInvite(inviteCode, authState.user.id);
    if (result.success && result.data) {
      setAuthState({
        user: result.data,
        loading: false,
        error: null,
      });
      toast.success('Partner connected successfully!');
      return true;
    } else {
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: result.error || 'Failed to accept invite',
      }));
      toast.error(result.error || 'Failed to accept invite');
      return false;
    }
  };

  const handleCreateInvite = async (): Promise<string | null> => {
    if (!authState.user) {
      toast.error('You must be logged in to create an invite');
      return null;
    }

    const result = await createPartnerInvite(authState.user.id);
    if (result.success && result.data) {
      toast.success('Partner invite created!');
      return result.data.inviteCode;
    } else {
      toast.error(result.error || 'Failed to create invite');
      return null;
    }
  };

  const refreshUser = async (): Promise<void> => {
    await loadUserProfile();
  };

  const value: AuthContextType = {
    ...authState,
    signIn: handleSignIn,
    signUp: handleSignUp,
    signOut: handleSignOut,
    acceptInvite: handleAcceptInvite,
    createInvite: handleCreateInvite,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};