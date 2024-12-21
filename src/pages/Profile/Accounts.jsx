import React, { useState } from 'react';
import Nav from '../../components/Profile/Nav';

const Accounts = () => {
  const [region, setRegion] = useState('');
  const [language, setLanguage] = useState('');
  const [currency, setCurrency] = useState('');

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navigation */}
      <Nav />

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* About You Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">About You</h2>
          <div>
            <p className="text-gray-600">
              <span className="font-medium text-lg">Name:</span> John Doe
            </p>
            <p className="text-gray-600">
              <span className="font-medium text-lg">Member Since:</span> January 2020
            </p>
          </div>
        </div>

        {/* Location Settings */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Location Settings</h2>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-gray-600 font-medium mb-2 text-lg">Region</label>
              <select
                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 text-lg p-3"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              >
                <option value="">Select Region</option>
                <option value="NA">North America</option>
                <option value="EU">Europe</option>
                <option value="AS">Asia</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-600 font-medium mb-2 text-lg">Language</label>
              <select
                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 text-lg p-3"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="">Select Language</option>
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-600 font-medium mb-2 text-lg">Currency</label>
              <select
                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 text-lg p-3"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option value="">Select Currency</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="JPY">JPY</option>
              </select>
            </div>
          </div>
          <button className="mt-4 bg-green-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-green-600 transition text-lg font-bold">
            Save Settings
          </button>
        </div>

        {/* Password Change Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Password Change</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-600 font-medium mb-2 text-lg">Current Password</label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 text-lg p-3"
                placeholder="Enter your current password"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 font-medium mb-2">New Password</label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 text-lg p-3"
                placeholder="Enter your new password"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 font-medium mb-2">Confirm New Password</label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 text-lg p-3"
                placeholder="Confirm your new password"
              />
            </div>
            <button className="bg-green-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-green-600 transition text-lg font-bold">
              Change Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Accounts;
