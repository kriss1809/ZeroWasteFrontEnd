import React, { createContext, useContext, useEffect, useState } from 'react';
import { loginUser, logoutUser, getUserProfile } from './apiClient';


interface AuthContextValue {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<string | undefined>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (email: string, password: string) => {
    try {
      const accessToken = await loginUser(email, password);
      if (accessToken) {
          setIsAuthenticated(true);
          return accessToken;
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const logout = async () => {
    try {
      await logoutUser();

      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
