import React, { useState } from 'react';
import Nav from '../../components/Profile/Nav';

const CreditCard = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [billingAddress, setBillingAddress] = useState('');

  const handleSaveCard = (e) => {
    e.preventDefault();
    // Handle saving the card (e.g., API request)
    alert('Card information saved successfully!');
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navigation */}
      <Nav />

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <form onSubmit={handleSaveCard}>
          {/* Credit Card Info Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Credit Card Info</h2>
            <div className="space-y-6">
              {/* Card Number */}
              <div>
                <label className="block text-gray-600 font-medium mb-2 text-base">Card Number</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="Enter card number"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Expiration Date */}
              <div>
                <label className="block text-gray-600 font-medium mb-2 text-base">Expiration Date</label>
                <input
                  type="month"
                  value={expirationDate}
                  onChange={(e) => setExpirationDate(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* CVV */}
              <div>
                <label className="block text-gray-600 font-medium mb-2 text-base">CVV</label>
                <input
                  type="text"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  placeholder="Enter CVV"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Name on Card */}
              <div>
                <label className="block text-gray-600 font-medium mb-2 text-base">Name on Card</label>
                <input
                  type="text"
                  value={nameOnCard}
                  onChange={(e) => setNameOnCard(e.target.value)}
                  placeholder="Enter name on card"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Billing Address */}
              <div>
                <label className="block text-gray-600 font-medium mb-2 text-base">Billing Address</label>
                <input
                  type="text"
                  value={billingAddress}
                  onChange={(e) => setBillingAddress(e.target.value)}
                  placeholder="Enter billing address"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-between">
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-green-600 transition text-lg font-bold"
              >
                Save Card
              </button>
              <button
                type="button"
                className="bg-red-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-red-600 transition text-lg font-bold"
              >
                Remove Card
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreditCard;
