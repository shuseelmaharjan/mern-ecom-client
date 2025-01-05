import React, { useState } from 'react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Account Settings</h1>

        <div className="flex space-x-4 mb-6">
          {/* Tab navigation */}
          <button
            onClick={() => setActiveTab('profile')}
            className={`w-1/4 text-center py-2 rounded-lg ${activeTab === 'profile' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab('password')}
            className={`w-1/4 text-center py-2 rounded-lg ${activeTab === 'password' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Password
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`w-1/4 text-center py-2 rounded-lg ${activeTab === 'notifications' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Notifications
          </button>
          <button
            onClick={() => setActiveTab('payment')}
            className={`w-1/4 text-center py-2 rounded-lg ${activeTab === 'payment' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Payments
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-700">Profile Information</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600">First Name</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-gray-600">Last Name</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-lg" />
                </div>
              </div>
              <div>
                <label className="block text-gray-600">Email Address</label>
                <input type="email" className="w-full p-3 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg">Save Changes</button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'password' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-700">Change Password</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-600">Current Password</label>
                <input type="password" className="w-full p-3 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-gray-600">New Password</label>
                <input type="password" className="w-full p-3 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-gray-600">Confirm New Password</label>
                <input type="password" className="w-full p-3 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg">Update Password</button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-700">Notification Preferences</h2>
            <form className="space-y-4">
              <div className="flex items-center space-x-4">
                <input type="checkbox" id="emailNotifications" className="form-checkbox h-5 w-5 text-blue-600" />
                <label htmlFor="emailNotifications" className="text-gray-600">Email Notifications</label>
              </div>
              <div className="flex items-center space-x-4">
                <input type="checkbox" id="smsNotifications" className="form-checkbox h-5 w-5 text-blue-600" />
                <label htmlFor="smsNotifications" className="text-gray-600">SMS Notifications</label>
              </div>
              <div>
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg">Save Preferences</button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'payment' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-700">Payment Methods</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-600">Add Credit/Debit Card</label>
                <input type="text" placeholder="Card Number" className="w-full p-3 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-gray-600">Expiration Date</label>
                <input type="month" className="w-full p-3 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-gray-600">CVV</label>
                <input type="text" className="w-full p-3 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg">Add Payment Method</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
