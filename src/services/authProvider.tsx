import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  loginUser, logoutUser, getUserProfile, UserdeleteAccount,
  UpdateAllergies, UpdateNotificationDay, UpdatePreferences,
  UpdatePreferredNotificationHour, JoinProductList
} from './apiClient';
import { User } from '../entitites/User';


interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<string | undefined>;
  logout: () => Promise<void>;
  deleteAccount: (password: string) => Promise<any>;
  updateAllergies: (allergies: string[]) => Promise<void>;
  updateNotificationDay: (notificationDay: number) => Promise<void>;
  updatePreferences: (preferences: string[]) => Promise<void>;
  joinProductList: (productId: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

 const profile = async () => {
    try {
      const profile = await getUserProfile();
      if (profile) {
        setUser(profile);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Failed to load profile:', error);
      setIsAuthenticated(false);
      sessionStorage.removeItem('accessToken'); // Elimină token-ul invalid
    }
  };


  useEffect(() => {
    const token = sessionStorage.getItem('accessToken');
    if (token) {
      profile();
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const accessToken = await loginUser(email, password);
      if (accessToken) {
          const profile = await getUserProfile();
          setUser(profile!);
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

  const deleteAccount = async (password: string) => {
    try {
      const response = await UserdeleteAccount(password);
      setIsAuthenticated(false);
      return response;
    } catch (error) {
      console.error('Delete account failed:', error);
    }
  };

  const updateAllergies = async (allergies: string[]) => {
    try {
      await UpdateAllergies(allergies);
      profile();
    } catch (error) {
      console.error('Update allergies failed:', error);
    }
  };

  const updateNotificationDay = async (notificationDay: number) => {
    try {
      await UpdateNotificationDay(notificationDay);
      profile();
    } catch (error) {
      console.error('Update notification day failed:', error);
    }
  };

  const updatePreferences = async (preferences: string[]) => {
    try {
      await UpdatePreferences(preferences);
      profile();
    } catch (error) {
      console.error('Update preferences failed:', error);
    }
  };


  const joinProductList = async (productId: string) => {
    try {
      await JoinProductList(productId);
    } catch (error) {
      console.error('Join product list failed:', error);
    }
  };


  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, deleteAccount, updateAllergies, updateNotificationDay, updatePreferences, joinProductList }}>
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
