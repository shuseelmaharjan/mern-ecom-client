import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
  // Sample cart items with id, name, price, quantity
  const initialCartItems = [
    {
      id: 1,
      name: 'Awesome T-shirt',
      image: 'https://via.placeholder.com/150',
      price: 25.99,
      quantity: 2,
    },
    {
      id: 2,
      name: 'Stylish Sneakers',
      image: 'https://via.placeholder.com/150',
      price: 49.99,
      quantity: 1,
    },
  ];

  // Set cart items to state to allow updates
  const [cartItems, setCartItems] = useState(initialCartItems);

  const shippingCost = 5.99;
  const discount = 10; // Percentage discount
  const taxRate = 0.08; // Tax rate (8%)

  // Calculate subtotal, discount, tax, and total
  const calculateTotals = () => {
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const discountAmount = (subtotal * discount) / 100;
    const taxAmount = (subtotal * taxRate);
    const total = subtotal + shippingCost - discountAmount + taxAmount;

    return { subtotal, discountAmount, taxAmount, total };
  };

  const { subtotal, discountAmount, taxAmount, total } = calculateTotals();

  // Handle quantity change (increase/decrease)
  const handleQuantityChange = (id, change) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(item.quantity + change, 1) } : item
      )
    );
  };

  // Handle removing item
  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <h2 className="text-3xl font-semibold text-gray-700 mb-6">Your Cart</h2>

        {/* Desktop Two-Column Layout */}
        <div className="md:grid md:grid-cols-2 md:gap-8">
          {/* Cart Items List (Left Column) */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6 md:mb-0">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Items in Your Cart</h3>

            {cartItems.length === 0 ? (
              <p className="text-gray-700">Your cart is empty.</p>
            ) : (
              <div>
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-4 border-b">
                    <div className="flex items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-md mr-4"
                      />
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800">{item.name}</h4>
                        <p className="text-gray-600">Price: ${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {/* Quantity Controls */}
                      <div className="flex items-center mr-4">
                        <button
                          onClick={() => handleQuantityChange(item.id, -1)}
                          className="px-2 py-1 bg-gray-200 text-gray-700 rounded-l-md hover:bg-gray-300"
                        >
                          -
                        </button>
                        <span className="mx-2 text-lg font-semibold text-gray-800">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, 1)}
                          className="px-2 py-1 bg-gray-200 text-gray-700 rounded-r-md hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>

                      {/* Item Total */}
                      <span className="text-lg font-semibold text-gray-800">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>

                      {/* Remove Item */}
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="ml-4 text-red-500 hover:text-red-700"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Order Summary and Payment (Right Column) */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Order Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-700">Subtotal:</span>
                <span className="text-gray-800">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Discount ({discount}%):</span>
                <span className="text-gray-800">-${discountAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Shipping:</span>
                <span className="text-gray-800">${shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Tax (8%):</span>
                <span className="text-gray-800">${taxAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <span className="text-gray-700">Total:</span>
                <span className="text-gray-800">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Coupon Code */}
            <div className="mt-4">
                <Link to="#" className="text-green-500 hover:text-green-600 transition">
                Apply Coupon Code
                </Link>
            </div>

            {/* Payment Methods */}
            <div className="mt-6">
              <h4 className="text-lg font-semibold text-gray-700 mb-4">How Would You Like to Pay?</h4>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input type="radio" id="creditCard" name="paymentMethod" className="mr-2" />
                  <label htmlFor="creditCard" className="text-gray-700">Credit Card</label>
                </div>
                <div className="flex items-center">
                  <input type="radio" id="paypal" name="paymentMethod" className="mr-2" />
                  <label htmlFor="paypal" className="text-gray-700">PayPal</label>
                </div>
                <div className="flex items-center">
                  <input type="radio" id="applePay" name="paymentMethod" className="mr-2" />
                  <label htmlFor="applePay" className="text-gray-700">Apple Pay</label>
                </div>
              </div>
            </div>

            {/* Checkout Button */}
            <div className="text-right mt-6">
              <button className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 transition text-lg font-semibold">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
