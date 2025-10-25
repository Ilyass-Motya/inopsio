import { useState, useEffect, useCallback } from 'react';
import { useSession } from './useSession';
import { auth } from '../utils/auth';
import type { User, LoginCredentials, RegisterData } from '../types/auth';

export function useAuth() {
  const { session, loading } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setUser(session.user);
      setIsAuthenticated(true);
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
  }, [session]);

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      const result = await auth.login(credentials);
      if (result.success) {
        setUser(result.user);
        setIsAuthenticated(true);
      }
      return result;
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Login failed' };
    }
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    try {
      const result = await auth.register(data);
      if (result.success) {
        setUser(result.user);
        setIsAuthenticated(true);
      }
      return result;
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'Registration failed' };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await auth.logout();
      setUser(null);
      setIsAuthenticated(false);
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      return { success: false, error: 'Logout failed' };
    }
  }, []);

  const refreshToken = useCallback(async () => {
    try {
      const result = await auth.refreshToken();
      if (result.success) {
        setUser(result.user);
        setIsAuthenticated(true);
      }
      return result;
    } catch (error) {
      console.error('Token refresh error:', error);
      return { success: false, error: 'Token refresh failed' };
    }
  }, []);

  return {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
    refreshToken,
  };
}
