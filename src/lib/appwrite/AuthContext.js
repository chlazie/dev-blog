// src/lib/appwrite/AuthContext.js
"use client";

import { useState, useEffect, createContext, useContext } from 'react';
import { account } from './appwrite'; // Import your configured Appwrite account

// 1. Create the context
const AuthContext = createContext();

// 2. Create the provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for the active user session on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await account.get();
        setUser(currentUser);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // Define authentication functions
  const login = async (email, password) => {
    await account.createEmailSession(email, password);
    const currentUser = await account.get();
    setUser(currentUser);
  };

  const register = async (email, password, name) => {
    await account.create(null, email, password, name);
    await login(email, password);
  };

  const logout = async () => {
    await account.deleteSession('current');
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Create a custom hook to use the context
export const useAuth = () => useContext(AuthContext);
