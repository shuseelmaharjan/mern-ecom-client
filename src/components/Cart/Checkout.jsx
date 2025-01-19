import React from 'react';
import { useLocation } from 'react-router-dom';

const Checkout = () => {
  const location = useLocation();
  const { selectedItems, totalRetailPrice, totalDiscountedAmount, totalOfferedCost, totalShippingCost } = location.state || {};

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Selected Items:</h2>
        {selectedItems ? (
          <ul>
            {selectedItems.map((item, index) => (
              <li key={index}>
                <div className="flex justify-between">
                  <span>{item.productId} - Quantity: {item.quantity}</span>
                  <span>Price: ${item.retailPrice}</span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No items selected.</p>
        )}
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Order Summary:</h2>
        <div className="space-y-2">
          <p>Total Retail Price: ${totalRetailPrice}</p>
          <p>Total Discounted Amount: ${totalDiscountedAmount}</p>
          <p>Total Offered Cost: ${totalOfferedCost}</p>
          <p>Total Shipping Cost: ${totalShippingCost}</p>
        </div>
      </div>

      {/* You can add a checkout form or summary here */}
      <button className="px-6 py-2 bg-green-600 text-white font-semibold hover:bg-green-700 transition duration-300">
        Complete Purchase
      </button>
    </div>
  );
};

export default Checkout;
