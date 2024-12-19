// src/context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';

// Create a context to hold the auth token
const AuthContext = createContext();

// A custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);

  // Set the access token
  const setToken = (token) => {
    setAccessToken(token);
  };

  return (
    <AuthContext.Provider value={{ accessToken, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
