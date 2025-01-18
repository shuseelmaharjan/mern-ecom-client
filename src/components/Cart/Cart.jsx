import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import config from "../../services/config";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  const BASE_URL = config.API_BASE_URL;

  useEffect(() => {
    const storedCartItems = JSON.parse(Cookies.get("cart") || "[]");
    setCartItems(storedCartItems);
  }, []);

  useEffect(() => {
    const total = cartItems.reduce(
      (sum, item) => sum + item.quantity * item.productPrice,
      0
    );
    setSubtotal(total);
  }, [cartItems]);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedCartItems = cartItems.map((item) =>
      item.productId === productId
        ? { ...item, quantity: newQuantity }
        : item
    );
    
    setCartItems(updatedCartItems);
    Cookies.set("cart", JSON.stringify(updatedCartItems), { expires: 7 });
  };

  const handleRemoveItem = (productId) => {
    const updatedCartItems = cartItems.filter((item) => item.productId !== productId);
    setCartItems(updatedCartItems);
    Cookies.set("cart", JSON.stringify(updatedCartItems), { expires: 7 });
    toast.success("Item removed from the cart.");
  };

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Panel: Product Details */}
        <div className="lg:w-2/3 w-full bg-white p-6 rounded-md shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
          {cartItems.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.productId}
                  className="flex items-center justify-between bg-gray-50 p-4 rounded-md shadow-sm"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={`${BASE_URL}/${item.image}`}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p className="text-sm text-gray-500">
                        Color: {item.colorVariant.name} | Size: {item.sizeVariant}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.productId, parseInt(e.target.value))
                      }
                      className="w-16 text-center border rounded-md"
                    />
                    <span className="text-lg font-semibold">
                      ${(item.productPrice * item.quantity).toFixed(2)}
                    </span>
                    <button
                      onClick={() => handleRemoveItem(item.productId)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Panel: Order Summary */}
        <div className="lg:w-1/3 w-full bg-white p-6 rounded-md shadow-md mt-6 lg:mt-0 lg:ml-6">
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-semibold">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">Shipping</span>
            <span className="font-semibold">Free</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">Total</span>
            <span className="font-semibold">${subtotal.toFixed(2)}</span>
          </div>
          <button
              className="px-6 py-2 bg-gray-800 text-white font-semibold hover:bg-gray-700 transition duration-300"
            disabled={cartItems.length === 0}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
