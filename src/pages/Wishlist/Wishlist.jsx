import React from 'react';

const Wishlist = () => {
  // Sample wishlist items (in a real app, this would come from state or an API)
  const wishlistItems = [
    {
      id: 1,
      name: 'Awesome T-shirt',
      image: 'https://via.placeholder.com/150',
      price: '$25.99',
    },
    {
      id: 2,
      name: 'Stylish Sneakers',
      image: 'https://via.placeholder.com/150',
      price: '$49.99',
    },
    {
      id: 3,
      name: 'Smartwatch',
      image: 'https://via.placeholder.com/150',
      price: '$199.99',
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <h2 className="text-3xl font-semibold text-gray-700 mb-6">Your Wishlist</h2>

        {/* Wishlist Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.name}</h3>
              <p className="text-lg text-gray-600 mb-4">{item.price}</p>

              {/* Actions */}
              <div className="flex justify-between items-center">
                <button className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition">
                  Add to Cart
                </button>
                <button className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty Wishlist Message */}
        {wishlistItems.length === 0 && (
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <p className="text-lg text-gray-700">Your wishlist is empty.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
