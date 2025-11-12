'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '@/lib/types';
import { authApi } from '@/lib/api/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, role?: UserRole) => Promise<void>;
  register: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user and token
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      
      if (storedUser && token) {
        try {
          setUser(JSON.parse(storedUser));
          // Optionally verify token with backend
          // authApi.getCurrentUser().then(setUser).catch(() => {
          //   localStorage.removeItem('user');
          //   localStorage.removeItem('token');
          // });
        } catch (error) {
          console.error('Error parsing stored user:', error);
          localStorage.removeItem('user');
          localStorage.removeItem('token');
        }
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string, role?: UserRole) => {
    try {
      // For development: use mock API if backend is not available
      const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true' || !process.env.NEXT_PUBLIC_API_URL;
      
      if (USE_MOCK) {
        const { mockApi } = await import('@/lib/mocks');
        const { user: userData, token } = await mockApi.login(email, password, role);
        setUser(userData);
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(userData));
        }
      } else {
        const { user: userData, token } = await authApi.login({ email, password, role });
        setUser(userData);
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(userData));
        }
      }
    } catch (error) {
      throw error;
    }
  };

  const register = async (email: string, password: string, role: UserRole) => {
    try {
      // For development: use mock API if backend is not available
      const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true' || !process.env.NEXT_PUBLIC_API_URL;
      
      if (USE_MOCK) {
        const { mockApi } = await import('@/lib/mocks');
        const { user: userData, token } = await mockApi.register(email, password, role);
        setUser(userData);
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(userData));
        }
      } else {
        const { user: userData, token } = await authApi.register({
          email,
          password,
          confirmPassword: password,
          role,
          terms: true,
        });
        setUser(userData);
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(userData));
        }
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  };

  const updateUser = (userData: User) => {
    setUser(userData);
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(userData));
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

