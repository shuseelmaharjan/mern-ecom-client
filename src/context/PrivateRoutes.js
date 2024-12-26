import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import useEncryption from '../hooks/useEncryption';
import Cookies from 'js-cookie';

const PrivateRoutes = ({ children }) => {
  const { decrypt } = useEncryption();
  const [isLoggedIn, setIsLoggedIn] = useState(null); 

  useEffect(() => {
    const encryptedSession = Cookies.get('_session');
    const encryptedR = Cookies.get('_r'); 
    if (encryptedSession && encryptedR) {
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

  if (isLoggedIn === null) {
    return <div>Loading...</div>;
  }

  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoutes;
