import React from 'react';

const OrderHistory = () => {
  // Sample orders
  const currentOrders = [
    { id: 1, item: 'Wireless Headphones', status: 'Processing', total: 120.99, date: '2024-12-15' },
    { id: 2, item: 'Laptop Stand', status: 'Shipped', total: 45.50, date: '2024-12-10' },
  ];

  const orderHistory = [
    { id: 1, item: 'Smartphone', status: 'Delivered', total: 699.99, date: '2024-11-25' },
    { id: 2, item: 'Bluetooth Speaker', status: 'Delivered', total: 89.99, date: '2024-11-10' },
    { id: 3, item: 'Backpack', status: 'Delivered', total: 59.99, date: '2024-10-30' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <h2 className="text-3xl font-semibold text-gray-700 mb-6">Order History</h2>

        {/* Responsive Layout: Desktop Two-Column, Mobile Single-Column */}
        <div className="md:grid md:grid-cols-2 md:gap-8">
          {/* Current Orders (Left Column) */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6 md:mb-0">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Current Orders</h3>
            {currentOrders.length === 0 ? (
              <p className="text-gray-700">You don't have any active orders.</p>
            ) : (
              <div>
                {currentOrders.map((order) => (
                  <div key={order.id} className="flex justify-between items-center py-4 border-b">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">{order.item}</h4>
                      <p className="text-gray-600">Date: {order.date}</p>
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className={`font-semibold ${order.status === 'Shipped' ? 'text-green-600' : 'text-yellow-600'}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-semibold">Total: ${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Order History (Right Column) */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Order History</h3>
            {orderHistory.length === 0 ? (
              <p className="text-gray-700">You haven't made any past purchases yet.</p>
            ) : (
              <div>
                {orderHistory.map((order) => (
                  <div key={order.id} className="flex justify-between items-center py-4 border-b">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">{order.item}</h4>
                      <p className="text-gray-600">Date: {order.date}</p>
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className={`font-semibold ${order.status === 'Delivered' ? 'text-green-600' : 'text-red-600'}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-semibold">Total: ${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
