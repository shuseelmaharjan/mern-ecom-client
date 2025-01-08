import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import useEncryption from "../hooks/useEncryption";
import Cookies from "js-cookie";

const PrivateRoutes = ({ children }) => {
  const { decrypt } = useEncryption();
  const [isLoggedIn, setIsLoggedIn] = useState(null); // Keep the state as null to represent loading

  useEffect(() => {
    const encryptedSession = Cookies.get("_session");
    const encryptedR = Cookies.get("_r");

    if (encryptedSession && encryptedR) {
      const decryptedSession = decrypt(encryptedSession);
      // Check if the session is valid (decrypted value is "true")
      if (decryptedSession === "true") {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, [decrypt]);

  // While checking login status, show a loading message
  if (isLoggedIn === null) {
    return <div>Loading...</div>;
  }

  // If not logged in, redirect to login page with message in URL
  if (!isLoggedIn) {
    return <Navigate to="/?message=Please login" />;
  }

  // If logged in, render the protected content (children)
  return children;
};

export default PrivateRoutes;
