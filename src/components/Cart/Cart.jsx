import { createContext, useState, useEffect } from "react"

export const CartContext = createContext();
export const CartProvider = ({ children }) => {}

const Cart = () => {

  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id);
  
    if (isItemInCart) {
    setCartItems(
        cartItems.map((cartItem) =>
        cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
    );
    } else {
    setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  return (
    <>
      <h1>My Cart</h1>

      {/* {cartData.slice(0, 3).map((item) => (
      )} */}
    </>
  )
}

export default Cart