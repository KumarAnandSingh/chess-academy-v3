import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { useThemeStore } from './stores/themeStore';

// Layout components
import Layout from './components/ui/Layout';

// Page components (we'll create these)
import DashboardPage from './pages/DashboardPage';
import LessonsPage from './pages/LessonsPage';
import LessonPage from './pages/LessonPage';
import PuzzlesPage from './pages/PuzzlesPage';
import PlayComputerPage from './pages/PlayComputerPage';
import ProfilePage from './pages/ProfilePage';
import LeaderboardPage from './pages/LeaderboardPage';
import SettingsPage from './pages/SettingsPage';
import DebugPage from './pages/DebugPage';
import Phase0Demo from './pages/Phase0Demo';
import StrengthAssessmentPage from './pages/StrengthAssessmentPage';

// Multiplayer components - ✅ RESTORED with ChessBoard wrapper fix!
import SimpleMultiplayerLobby from './components/multiplayer/SimpleMultiplayerLobby';
import ImprovedLiveChessGame from './components/multiplayer/ImprovedLiveChessGame';
import { useParams } from 'react-router-dom';

// Wrapper to handle route parameters
const LiveChessGameWrapper: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  return <ImprovedLiveChessGame gameId={gameId || ''} />;
};

// SEO Landing Pages removed to prevent duplicate content penalty
// Static HTML files (.html) serve SEO content directly to search engines

// Auth components
import { GoogleCallback } from './components/auth/GoogleCallback';
import { AuthSuccess } from './components/auth/AuthSuccess';

// Stores and providers
import { AuthProvider } from './components/auth/AuthProvider';

// Theme initialization component
const ThemeInitializer: React.FC = () => {
  const { theme } = useThemeStore();
  
  useEffect(() => {
    // Apply theme to document on mount and theme changes
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
  
  return null;
};

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Import ProtectedRoute for authentication
import { ProtectedRoute, PublicRoute } from './components/auth/ProtectedRoute';

// Wrapper components for different route types
const AuthRequiredRoute: React.FC<{ children: React.ReactNode; featureName?: string }> = ({ 
  children, 
  featureName 
}) => {
  return (
    <ProtectedRoute requireAuth={true} featureName={featureName}>
      {children}
    </ProtectedRoute>
  );
};

const PublicAppRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <PublicRoute>
      {children}
    </PublicRoute>
  );
};

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeInitializer />
          <Router>
        <div className="app-container">
          <Routes>
            {/* Home Route - redirects to play (primary action) */}
            <Route path="/" element={<Navigate to="/play" replace />} />

            {/* Public Dashboard - No authentication needed */}
            <Route path="/dashboard" element={
              <PublicAppRoute>
                <Layout>
                  <DashboardPage />
                </Layout>
              </PublicAppRoute>
            } />
            
            {/* Public Lesson Routes - Guest access allowed, login for progress saving */}
            <Route path="/lessons" element={
              <PublicAppRoute>
                <Layout>
                  <LessonsPage />
                </Layout>
              </PublicAppRoute>
            } />
            
            <Route path="/lessons/:lessonId" element={
              <PublicAppRoute>
                <Layout>
                  <LessonPage />
                </Layout>
              </PublicAppRoute>
            } />
            
            {/* Public Puzzles Route - Guest access allowed, login for progress saving */}
            <Route path="/puzzles" element={
              <PublicAppRoute>
                <Layout>
                  <PuzzlesPage />
                </Layout>
              </PublicAppRoute>
            } />
            
            {/* Public Play Route - Guest access allowed, login for game history */}
            <Route path="/play" element={
              <PublicAppRoute>
                <Layout>
                  <PlayComputerPage />
                </Layout>
              </PublicAppRoute>
            } />
            
            {/* Protected Profile Route - Authentication Required */}
            <Route path="/profile" element={
              <AuthRequiredRoute featureName="your profile">
                <Layout>
                  <ProfilePage />
                </Layout>
              </AuthRequiredRoute>
            } />
            
            {/* Public Leaderboard - No authentication needed */}
            <Route path="/leaderboard" element={
              <PublicAppRoute>
                <Layout>
                  <LeaderboardPage />
                </Layout>
              </PublicAppRoute>
            } />
            
            {/* Protected Settings Route - Authentication Required */}
            <Route path="/settings" element={
              <AuthRequiredRoute featureName="settings">
                <Layout>
                  <SettingsPage />
                </Layout>
              </AuthRequiredRoute>
            } />
            
            <Route path="/debug" element={
              <PublicAppRoute>
                <Layout>
                  <DebugPage />
                </Layout>
              </PublicAppRoute>
            } />

            <Route path="/phase0" element={
              <PublicAppRoute>
                <Phase0Demo />
              </PublicAppRoute>
            } />

            <Route path="/strength-assessment" element={
              <PublicAppRoute>
                <StrengthAssessmentPage />
              </PublicAppRoute>
            } />


            {/* Multiplayer Chess Routes - ✅ RESTORED with ChessBoard wrapper fix! */}
            <Route path="/multiplayer" element={
              <PublicAppRoute>
                <Layout>
                  <SimpleMultiplayerLobby />
                </Layout>
              </PublicAppRoute>
            } />
            
            <Route path="/game/:gameId" element={
              <PublicAppRoute>
                <Layout>
                  <LiveChessGameWrapper />
                </Layout>
              </PublicAppRoute>
            } />
            
            <Route path="/spectate/:gameId" element={
              <PublicAppRoute>
                <Layout>
                  <LiveChessGameWrapper />
                </Layout>
              </PublicAppRoute>
            } />

            {/* SEO routes removed - using static HTML files (.html) to prevent duplicate content penalty
               Search engines will index the static .html versions with proper SEO meta tags */}

            {/* Auth routes */}
            <Route path="/auth/callback" element={<GoogleCallback />} />
            <Route path="/auth/success" element={<AuthSuccess />} />

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
