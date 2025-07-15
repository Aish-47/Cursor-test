import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Toaster } from 'react-hot-toast';
import { theme } from './styles/theme';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { GlobalStyles } from './styles/GlobalStyles';

// Pages
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import InvitePartnerPage from './pages/InvitePartnerPage';
import SwipePage from './pages/SwipePage';
import MatchesPage from './pages/MatchesPage';
import SettingsPage from './pages/SettingsPage';
import LoadingScreen from './components/LoadingScreen';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <LoadingScreen />;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// Public Route Component (redirect if authenticated)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <LoadingScreen />;
  }
  
  if (user) {
    return <Navigate to="/swipe" replace />;
  }
  
  return <>{children}</>;
};

// Main App Routes
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route 
        path="/login" 
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        } 
      />
      <Route 
        path="/signup" 
        element={
          <PublicRoute>
            <SignupPage />
          </PublicRoute>
        } 
      />
      
      {/* Protected Routes */}
      <Route 
        path="/invite" 
        element={
          <ProtectedRoute>
            <InvitePartnerPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/swipe" 
        element={
          <ProtectedRoute>
            <SwipePage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/matches" 
        element={
          <ProtectedRoute>
            <MatchesPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/settings" 
        element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        } 
      />
      
      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/swipe" replace />} />
      <Route path="*" element={<Navigate to="/swipe" replace />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AuthProvider>
          <GlobalStyles />
          <AppRoutes />
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3000,
              style: {
                background: theme.colors.white,
                color: theme.colors.neutral[900],
                boxShadow: theme.shadows.md,
                borderRadius: theme.borderRadius.lg,
                fontSize: theme.typography.fontSize.sm,
                fontFamily: theme.typography.fontFamily.primary,
              },
              success: {
                iconTheme: {
                  primary: theme.colors.success,
                  secondary: theme.colors.white,
                },
              },
              error: {
                iconTheme: {
                  primary: theme.colors.error,
                  secondary: theme.colors.white,
                },
              },
            }}
          />
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
};

export default App;