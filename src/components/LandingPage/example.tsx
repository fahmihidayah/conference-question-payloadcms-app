// Example of how to use the LandingPage component in your application

'use client';

import { useState, useEffect } from 'react';
import LandingPage from './index';
import { getMeUser } from '@/utilities/getMeUser';

// This is an example component showing how to integrate the LandingPage
const LandingPageWithAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check user authentication status
    const checkAuthStatus = async () => {
      try {
        const user = await getMeUser();
        if (user) {
          setIsAuthenticated(true);
          setUserName(user.user.name || user.user.email);
        }
      } catch (error) {
        console.log('User not authenticated');
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const handleLogout = async () => {
    try {
      // Add your logout logic here
      // Example: await logout();
      setIsAuthenticated(false);
      setUserName(undefined);
      // Redirect to home page or refresh
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <LandingPage 
      isAuthenticated={isAuthenticated}
      userName={userName}
      onLogout={handleLogout}
    />
  );
};

export default LandingPageWithAuth;