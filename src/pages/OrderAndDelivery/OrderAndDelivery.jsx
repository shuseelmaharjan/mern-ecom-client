import React, { useState } from "react";

const OrderAndDelivery = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sample order data
  const orderItems = [
    { id: 1, name: "Product 1", quantity: 2, price: 50, total: 100 },
    { id: 2, name: "Product 2", quantity: 1, price: 30, total: 30 },
  ];

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="p-6 bg-gray-50">
      {/* Page Header */}
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Order Listing</h2>

      {/* Order Summary */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Order Details</h3>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left text-gray-600">Item</th>
                <th className="py-2 text-left text-gray-600">Quantity</th>
                <th className="py-2 text-left text-gray-600">Price</th>
                <th className="py-2 text-left text-gray-600">Total</th>
                <th className="py-2 text-left text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {orderItems.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="py-2 text-gray-600">{item.name}</td>
                  <td className="py-2 text-gray-600">{item.quantity}</td>
                  <td className="py-2 text-gray-600">${item.price}</td>
                  <td className="py-2 text-gray-600">${item.total}</td>
                  <td className="py-2 text-blue-600 cursor-pointer" onClick={handleOpenModal}>
                    Proceed to Delivery
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between mt-4">
          <p className="text-xl font-semibold text-gray-800">Total: ${orderItems.reduce((total, item) => total + item.total, 0)}</p>
        </div>
      </div>

      {/* Delivery Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 sm:w-96 p-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Delivery Details</h3>

            <form>
              {/* Name */}
              <div className="mb-4">
                <label className="block text-gray-600">Full Name</label>
                <input
                  type="text"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Address */}
              <div className="mb-4">
                <label className="block text-gray-600">Address</label>
                <input
                  type="text"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
                  placeholder="Enter your address"
                />
              </div>

              {/* Phone Number */}
              <div className="mb-4">
                <label className="block text-gray-600">Phone Number</label>
                <input
                  type="tel"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
                  placeholder="Enter your phone number"
                />
              </div>

              {/* Shipping Method */}
              <div className="mb-4">
                <label className="block text-gray-600">Shipping Method</label>
                <select
                  className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
                >
                  <option>Standard Shipping (5-7 days)</option>
                  <option>Express Shipping (2-3 days)</option>
                  <option>Overnight Shipping (1 day)</option>
                </select>
              </div>

              {/* Payment Method */}
              <div className="mb-4">
                <label className="block text-gray-600">Payment Method</label>
                <select
                  className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
                >
                  <option>Credit/Debit Card</option>
                  <option>PayPal</option>
                  <option>Cash on Delivery</option>
                </select>
              </div>

              {/* Submit Button */}
              <div className="flex justify-between items-center">
                <button
                  type="button"
                  className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700"
                >
                  Confirm Delivery
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderAndDelivery;
