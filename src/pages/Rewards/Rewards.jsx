import React from 'react';

const Rewards = () => {
  // Sample rewards data
  const rewards = [
    { id: 1, title: 'Free Shipping', points: 500, description: 'Get free shipping on your next order.' },
    { id: 2, title: '10% Off', points: 1000, description: 'Apply a 10% discount on any purchase.' },
    { id: 3, title: 'Exclusive Gift', points: 1500, description: 'Claim an exclusive gift with your purchase.' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <h2 className="text-3xl font-semibold text-gray-700 mb-6">Your Rewards</h2>

        {/* Rewards Overview Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Rewards Overview</h3>
          <div className="flex justify-between items-center">
            <div className="text-gray-600">
              <h4 className="text-lg font-semibold">Total Points: 1200</h4>
              <p className="text-sm">You can redeem your points for exciting rewards!</p>
            </div>
            <div>
              <button className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition">Redeem Points</button>
            </div>
          </div>
        </div>

        {/* Earned Rewards Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Earned Rewards</h3>
          {rewards.length === 0 ? (
            <p className="text-gray-700">You haven't earned any rewards yet. Start shopping to earn points!</p>
          ) : (
            <div className="space-y-4">
              {rewards.map((reward) => (
                <div key={reward.id} className="flex justify-between items-center border-b py-4">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">{reward.title}</h4>
                    <p className="text-sm text-gray-600">{reward.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-800">{reward.points} Points</p>
                    <button className="mt-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition">
                      Redeem
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Redeem Rewards Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Redeem Your Points</h3>
          <p className="text-gray-600 mb-4">Use your earned points to unlock discounts, free shipping, or exclusive gifts.</p>
          <div className="space-y-4">
            {rewards.map((reward) => (
              <div key={reward.id} className="flex justify-between items-center py-4 border-b">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">{reward.title}</h4>
                  <p className="text-sm text-gray-600">{reward.description}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">{reward.points} Points</p>
                  <button className="mt-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition">
                    Redeem
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rewards;
