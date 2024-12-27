import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import config from '../services/config';
import authService from '../services/authService/authService';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import useEncryption from '../hooks/useEncryption';  

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const api = axios.create({
  baseURL: config.API_BASE_URL,
  withCredentials: true,
});

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('');
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();

  const { decrypt, encrypt } = useEncryption(); 

  const handleLogout = async () => {
    try {
      await authService.logout();
      setIsLoggedIn(false);
      setAccessToken(null);
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };

  const fetchCsrf = async () => {
    try {
      await api.get('/csrf-token');
    } catch (error) {
      console.error('Failed to fetch CSRF token:', error);
    }
  };

  const isCsrfValid = () => {
    const csrfToken = Cookies.get('_csrf');
    return csrfToken ? true : false;
  };

  const fetchAccessToken = async () => {
    try {
      const csrfToken = Cookies.get('_csrf');
      const refreshToken = Cookies.get('_r');

      const response = await api.get('/api/v2/refresh', {
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': csrfToken,
          '_r': refreshToken,
        },
      });

      setAccessToken(response.data.accessToken);
    } catch (error) {
      console.error('Failed to fetch access token:', error.response?.data || error.message);
    }
  };

  const validateSession = useCallback(() => {
    const encryptedSession = Cookies.get('_session');
    const encryptedRefreshToken = Cookies.get('_r');

    if (encryptedSession && encryptedRefreshToken) {
      const decryptedSession = decrypt(encryptedSession); 
      if (decryptedSession === 'true') {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, [decrypt]);  

  const fetchUserId = useCallback(async () => {
    if (!isLoggedIn) return; 

    let token = accessToken;
    if (!token) {
      await fetchAccessToken();
      token = accessToken;
    }

    if (token) {
      const decodedToken = jwtDecode(token);
      setRole(decodedToken.UserInfo?.role || '');
      setUserId(decodedToken.UserInfo?.id || '');

      const encryptedRole = encrypt(decodedToken.UserInfo?.role || '');
      sessionStorage.setItem('__usr', encryptedRole);
    }
  }, [accessToken, isLoggedIn, encrypt]);

  useEffect(() => {
    validateSession();
  }, [validateSession]);

  useEffect(() => {
    if (!isCsrfValid()) {
      fetchCsrf();
    }
  }, []);

  useEffect(() => {
    fetchUserId();
  }, [fetchUserId]);

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, handleLogout, isLoggedIn, role, userId }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
