import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../services/authService/authService';
import Cookies from 'js-cookie'; // To handle cookies

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');
  const [accessToken, setAccessToken] = useState(''); 

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setError('');

    // Prepare form data
    const formData = {
      email,
      password
    };

    try {
      // Call the login API service
      const response = await authService.login(formData);

      const { accessToken } = response;

      setAccessToken(accessToken);

      const refreshToken = Cookies.get('xhr'); 

      console.log("Access Token:", accessToken);
      console.log("Refresh Token (from cookie):", refreshToken);

      // Success message
      setMsg('Login successful!');

      // Redirect to the dashboard or home page
      navigate('/dashboard');
    } catch (error) {
      setError('Error logging in. Please check your credentials and try again.');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-md shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        
        {msg && (
          <div className="text-green-500 text-sm text-center mb-4">
            {msg}
          </div>
        )}

        {error && (
          <div className="text-red-500 text-sm text-center mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-4">
          <span className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-green-500 hover:underline">
              Sign Up
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
