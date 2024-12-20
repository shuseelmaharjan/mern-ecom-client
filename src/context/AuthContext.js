import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import config from '../services/config';

const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

const api = axios.create({
  baseURL: config.API_BASE_URL,
  withCredentials: true,
});

// Provider component
export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(() => {
    return window.accessToken || null; 
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  // Function to set the access token
  const setToken = (token) => {
    setAccessToken(token);
    if (token) {
      window.accessToken = token; 
      setIsLoggedIn(true); 
    } else {
      delete window.accessToken; 
      setIsLoggedIn(false); 
    }
  };

  // Function to refresh the token
  const refreshToken = useCallback(async () => {
    try {
      const response = await api.get('/api/v1/refresh', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const newToken = response.data.accessToken;
      setToken(newToken); 
    } catch (error) {
      console.error('Error refreshing token:', error);
      setToken(null); 
    }
  }, [accessToken]);

  // Function to check if the token is valid and update login state
  const checkToken = useCallback(async () => {
    if (!accessToken) {
      await refreshToken();
      return;
    }

    try {
      const response = await api.get('/api/v1/check-token', {
        headers: {
          Authorization: `Bearer ${accessToken}`, 
        },
      });

      if (!response.data.valid) {
        await refreshToken();
      }
    } catch (error) {
      console.error('Error checking token validity:', error);
      await refreshToken(); 
    }
  }, [accessToken, refreshToken]);

  // Function to check if the cookie is expired
  const checkCookieExpiration = useCallback(() => {
    const cookie = document.cookie.split('; ').find(row => row.startsWith('xhr='));
    if (cookie) {
      const cookieValue = cookie.split('=')[1];
      const decodedToken = JSON.parse(atob(cookieValue.split('.')[1])); 
      const expiryDate = new Date(decodedToken.exp * 1000);
      const currentDate = new Date();

      if (currentDate > expiryDate) {
        // If the token is expired
        setIsLoggedIn(false);
        setToken(null); 
      } else {
        // If token is still valid
        setIsLoggedIn(true);
      }
    }
  }, []); 


  // On provider initialization, validate or refresh the token and check the cookie expiration
  useEffect(() => {
    if (accessToken) {
      checkToken();
    } else {
      refreshToken();
    }

    checkCookieExpiration(); // Check if the cookie is expired on every page load or refresh
  }, [accessToken, checkToken, refreshToken, checkCookieExpiration]); 

  return (
    <AuthContext.Provider value={{ accessToken, setToken, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
