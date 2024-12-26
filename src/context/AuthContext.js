import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import config from '../services/config';
import authService from '../services/authService/authService';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const api = axios.create({
  baseURL: config.API_BASE_URL,
  withCredentials: true,
});

export const AuthProvider = ({ children }) => {

  const [accessToken, setAccessToken] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [role, setRole] = useState('');
  const [userId, setId] = useState('');
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authService.logout();
      window.location.reload();
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
      const rCookie = Cookies.get('_r');
      const response = await api.post('/api/v1/refresh', {}, {
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': csrfToken,
          'Cookie': `_csrf=${csrfToken}; _r=${rCookie}`,
        },
      });
      setAccessToken(response.data.accessToken);
    } catch (error) {
      console.error('Failed to fetch access token:', error);
    }
  };

  const fetchUserId = useCallback(async () => {
    let token = accessToken;
    if (!token) {
      await fetchAccessToken();
      token = accessToken;
    }
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      setRole(decodedToken.UserInfo?.role || null);
      setId(decodedToken.UserInfo?.id || null);
    }
  }, [accessToken]);

  useEffect(() => {
    if (!isCsrfValid()) {
      fetchCsrf();
    }
  }, []);

  useEffect(() => {
    fetchUserId();
  }, [fetchUserId]);

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, handleLogout, showLogoutModal, setShowLogoutModal }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
