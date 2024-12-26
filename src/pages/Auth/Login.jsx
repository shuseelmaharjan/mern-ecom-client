import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 
import authService from '../../services/authService/authService';
import { Link } from 'react-router-dom';
import { LoginSocialFacebook } from 'reactjs-social-login';
import { FaFacebookF } from "react-icons/fa";
import Cookies from 'js-cookie';
import useEncryption from '../../hooks/useEncryption';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  const { setAccessToken } = useAuth();
  const navigate = useNavigate();

  const { encrypt } = useEncryption();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const formData = { email, password };

    try {
      const response = await authService.login(formData); 
      setAccessToken(response.accessToken);
      const encryptedSession = encrypt('true');
      Cookies.set('_session', encryptedSession, { expires: 7, path: '/', secure: false, sameSite: 'Lax' });
      setMsg('Login successful!');
      navigate('/dashboard'); 
    } catch (error) {
      setError('Error logging in. Please check your credentials and try again.');
      console.error('Login Error:', error);
    }
  };

  return (
    <div className="h-[80vh] bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-md shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        {msg && <div className="text-green-500 text-base text-center mb-4">{msg}</div>}
        {error && <div className="text-red-500 text-base text-center mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-base font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-base font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="w-full py-2 bg-green-500 font-bold text-base text-white rounded-md hover:bg-green-600">
            Login
          </button>
        </form>

        <div className="text-center mt-4">
          <span className="text-base text-gray-600">
            Don't have an account? 
            <Link to="/signup" className="text-green-500 hover:underline font-bold ml-1">Sign Up</Link>
          </span>
        </div>
        <LoginSocialFacebook
          appId="1826756491428940"
          onResolve={(response) => {
            console.log('Login successful:', response);
          }}
          onReject={(error) => {
            console.error('Login failed:', error);
          }}
        >
          <FaFacebookF />
        </LoginSocialFacebook>
      </div>
    </div>
  );
};

export default Login;
