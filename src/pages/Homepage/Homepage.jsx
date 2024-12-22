import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Homepage = () => {
  const { isLoggedIn, role } = useAuth();

  return (
    <div>
      {isLoggedIn ? (
        <p>Welcome, your role is: {role}</p>
      ) : (
        <p>Please log in</p>
      )}
    </div>
  );
};

export default Homepage;
