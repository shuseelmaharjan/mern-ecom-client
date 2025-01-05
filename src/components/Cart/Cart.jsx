import React from 'react';
import { useCart } from '../../context/CartContext';

const Cart = ({ cart }) => {
  const { cartItems, getCartTotal, removeFromCart, clearCart } = useCart();
  const getTotal = () => {
    return getCartTotal();
  }

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.title} - {item.quantity} x ${item.price.toFixed(2)} = ${(item.quantity * item.price).toFixed(2)}
                <button onClick={() => removeFromCart(item.id)} className='border 1px p-2 bg-red-500 text-white'>Remove</button>
              </li>
            ))}
          </ul>
          <h3>Total: ${getTotal().toFixed(2)}</h3>
        </div>
      )}
      <button onClick={() => clearCart()} className='border 1px p-2'>Clear All</button>
    </div>
  );
};

export default Cart;
