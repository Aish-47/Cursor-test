export interface User {
  id: string;
  email: string;
  name: string;
  partnerId?: string;
  partnerCode?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BabyName {
  id: string;
  name: string;
  gender: 'boy' | 'girl' | 'neutral';
  origin: string;
  meaning: string;
  popularity?: number;
  createdAt: string;
}

export interface UserSwipe {
  id: string;
  userId: string;
  nameId: string;
  isLike: boolean;
  swipedAt: string;
}

export interface Match {
  id: string;
  nameId: string;
  name: BabyName;
  user1Id: string;
  user2Id: string;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface SwipeState {
  currentNames: BabyName[];
  currentIndex: number;
  loading: boolean;
  hasMore: boolean;
}

export interface MatchState {
  matches: Match[];
  newMatch: Match | null;
  loading: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface SwipeDirection {
  x: number;
  y: number;
  direction: 'left' | 'right' | 'up' | 'down';
}

export interface PartnerInvite {
  id: string;
  inviteCode: string;
  inviterId: string;
  inviterEmail: string;
  inviterName: string;
  used: boolean;
  createdAt: string;
  expiresAt: string;
}