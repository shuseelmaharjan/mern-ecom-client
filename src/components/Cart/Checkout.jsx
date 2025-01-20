import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Checkout = () => {
  const location = useLocation();
  const [selectedItems, setSelectedItems] = useState([]);
  const [totals, setTotals] = useState({
    totalRetailPrice: 0,
    totalDiscountedAmount: 0,
    totalOfferedCost: 0,
    totalShippingCost: 0,
  });

  useEffect(() => {
    // Parse query params
    const searchParams = new URLSearchParams(location.search);
    const items = [];
    let totalRetailPrice = 0;

    // Dynamically parse productId and quantity
    for (const [key, value] of searchParams.entries()) {
      if (key.startsWith('productId_')) {
        const index = key.split('_')[1];
        const productId = value;
        const quantity = parseInt(searchParams.get(`quantity_${index}`), 10) || 0;
        const retailPrice = quantity * 100; // Example: Each product costs $100
        totalRetailPrice += retailPrice;

        items.push({
          productId,
          quantity,
          retailPrice,
        });
      }
    }

    setSelectedItems(items);
    setTotals({
      totalRetailPrice,
      totalDiscountedAmount: totalRetailPrice * 0.1, // Example: 10% discount
      totalOfferedCost: totalRetailPrice * 0.9, // Example: After discount
      totalShippingCost: items.length > 0 ? 20 : 0, // Example: $20 shipping fee
    });
  }, [location.search]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Selected Items:</h2>
        {selectedItems.length > 0 ? (
          <ul>
            {selectedItems.map((item, index) => (
              <li key={index}>
                <div className="flex justify-between">
                  <span>
                    {item.productId} - Quantity: {item.quantity}
                  </span>
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
          <p>Total Retail Price: ${totals.totalRetailPrice}</p>
          <p>Total Discounted Amount: ${totals.totalDiscountedAmount}</p>
          <p>Total Offered Cost: ${totals.totalOfferedCost}</p>
          <p>Total Shipping Cost: ${totals.totalShippingCost}</p>
        </div>
      </div>

      <button className="px-6 py-2 bg-green-600 text-white font-semibold hover:bg-green-700 transition duration-300">
        Complete Purchase
      </button>
    </div>
  );
};

export default Checkout;
