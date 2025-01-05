import React, { useState } from 'react';

const Help = () => {
  const [activeTab, setActiveTab] = useState('help');

  return (
    <div className="bg-gray-50 py-8">
      {/* Tabs */}
      <div className="w-full mx-auto bg-white shadow-md rounded-lg">
        <div className="flex justify-around border-b">
          <button
            onClick={() => setActiveTab('help')}
            className={`w-1/3 py-4 text-center text-gray-700 font-medium ${
              activeTab === 'help' ? 'border-b-4 border-blue-600 text-blue-600' : 'hover:bg-gray-100'
            }`}
          >
            Help Center
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`w-1/3 py-4 text-center text-gray-700 font-medium ${
              activeTab === 'contact' ? 'border-b-4 border-blue-600 text-blue-600' : 'hover:bg-gray-100'
            }`}
          >
            Contact Us
          </button>
          <button
            onClick={() => setActiveTab('policies')}
            className={`w-1/3 py-4 text-center text-gray-700 font-medium ${
              activeTab === 'policies' ? 'border-b-4 border-blue-600 text-blue-600' : 'hover:bg-gray-100'
            }`}
          >
            Site Policies
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'help' && (
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">How can we help you?</h3>
              <p className="text-gray-600 mb-4">
                Welcome to our Help Center! Here you'll find answers to frequently asked questions and helpful guides on
                using our platform.
              </p>
              <div className="flex justify-center mb-4">
                <img
                  src="https://via.placeholder.com/400x300"
                  alt="Help Center"
                  className="rounded-lg shadow-md"
                />
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Frequently Asked Questions</h4>
              <ul className="list-disc pl-6 text-gray-600">
                <li>How to track my orders?</li>
                <li>How do I return or exchange items?</li>
                <li>How can I apply discount codes?</li>
                <li>What payment methods do you accept?</li>
              </ul>
            </div>
          )}

          {activeTab === 'contact' && (
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h3>
              <p className="text-gray-600 mb-4">
                If you need further assistance, feel free to reach out to us. We're here to help you.
              </p>
              <div className="mb-6">
                <h4 className="text-xl font-semibold text-gray-800 mb-2">Our Office</h4>
                <p className="text-gray-600 mb-2">Golden Future Institute</p>
                <p className="text-gray-600 mb-2">1234, Street Name, City, Country</p>
              </div>
              <div className="mb-6">
                <h4 className="text-xl font-semibold text-gray-800 mb-2">Email</h4>
                <p className="text-gray-600 mb-2">support@goldenfuture.com</p>
              </div>
              <div className="mb-6">
                <h4 className="text-xl font-semibold text-gray-800 mb-2">Phone</h4>
                <p className="text-gray-600 mb-2">+1 800 123 4567</p>
              </div>
              <div className="flex justify-center mb-4">
                <img
                  src="https://via.placeholder.com/400x300"
                  alt="Contact Us"
                  className="rounded-lg shadow-md"
                />
              </div>
            </div>
          )}

          {activeTab === 'policies' && (
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Site Policies</h3>
              <p className="text-gray-600 mb-4">
                Please read our site policies carefully before using our services. Here you'll find our terms of service,
                privacy policy, and return/exchange policy.
              </p>
              <div className="mb-6">
                <h4 className="text-xl font-semibold text-gray-800 mb-2">Terms of Service</h4>
                <p className="text-gray-600">
                  By using our platform, you agree to the terms of service and conditions listed here. Please ensure you
                  read them carefully.
                </p>
              </div>
              <div className="mb-6">
                <h4 className="text-xl font-semibold text-gray-800 mb-2">Privacy Policy</h4>
                <p className="text-gray-600">
                  Your privacy is important to us. We collect your information only for the purpose of providing a better
                  shopping experience. Read our privacy policy to learn more.
                </p>
              </div>
              <div className="mb-6">
                <h4 className="text-xl font-semibold text-gray-800 mb-2">Return/Exchange Policy</h4>
                <p className="text-gray-600">
                  If you're not satisfied with your purchase, you may return or exchange your item within 30 days of
                  receipt. Check out our detailed return policy for more info.
                </p>
              </div>
              <div className="flex justify-center mb-4">
                <img
                  src="https://via.placeholder.com/400x300"
                  alt="Site Policies"
                  className="rounded-lg shadow-md"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Help;
