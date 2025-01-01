import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../services/authService/authService';

const Register = () => {
  // State variables for form fields
  const [name, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // State for error messages
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  // Navigation hook
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password and confirm password
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Clear error if validation passes
    setError('');

    // Prepare the form data
    const formData = {
      name,
      email,
      password
    };

    try {
      // Call the signup service
      const response = await authService.signup(formData);
      setMsg(response);
      console.log(response);

      navigate('/login'); 
    } catch (error) {
      setError('Error signing up. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="h-[80vh] bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-md shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>
        {msg && (
          <div className="text-green-500 text-base text-center mb-4">
            {msg}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-base font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email */}
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

          {/* Password */}
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

          {/* Confirm Password */}
          <div>
            <label className="block text-base font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Confirm your password"
              required
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-500 text-base text-center mt-2">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2 bg-green-500 text-white font-bold text-base rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Sign Up
          </button>
        </form>
        <div className="text-center mt-4">
          <span className="text-base text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-green-500 hover:underline ml-1 font-bold">
              Login
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
