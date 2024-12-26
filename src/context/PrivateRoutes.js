import React from 'react';
import { Navigate } from 'react-router-dom';
// import { useAuth } from './AuthContext';

const PrivateRoutes = ({ children }) => {
//   const { isLoggedIn, setToken} = useAuth();
//   console.log(isLoggedIn);
//   console.log(setToken);

  const loggedStatus = sessionStorage.getItem('l');

  return loggedStatus ? children : <Navigate to="/login" />;
};

export default PrivateRoutes;
