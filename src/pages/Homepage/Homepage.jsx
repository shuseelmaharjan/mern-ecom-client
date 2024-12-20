import React from 'react';
import { useAuth } from './../../context/AuthContext';

const Homepage = () => {
  const { accessToken } = useAuth(); 

  return (
    <div>
      <h1>Homepage</h1>
      {accessToken ? (
        <p>Access Token: {accessToken}</p>
      ) : (
        <p>No Access Token Found</p>
      )}
    </div>
  );
};

export default Homepage;
