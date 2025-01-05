import React from "react";
import { useCart } from "../../context/CartContext";

function CheckOut() {
  const { cartItems, getCartTotal, clearCart } = useCart();
  
  const handleClearCart = () => {
    clearCart();
  };

  return (
    <div>
      <h1>Checkout</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty. Add some items before proceeding to checkout.</p>
      ) : (
        <div>
          <h2>Review your order</h2>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.title} - {item.quantity} x ${item.price.toFixed(2)} = ${(item.quantity * item.price).toFixed(2)}
              </li>
            ))}
          </ul>
          <h3>Total: ${getCartTotal().toFixed(2)}</h3>
          <div>
            <h4>Payment Information</h4>
          </div>
          <button className="bg-green-500 text-white p-2 mt-5">Complete Purchase</button>
          <button onClick={handleClearCart} className="border p-2 mt-2">
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
}

export default CheckOut;
