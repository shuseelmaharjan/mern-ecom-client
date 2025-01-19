import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const cartData = Cookies.get("cart") ? JSON.parse(Cookies.get("cart")) : [];
    if (Array.isArray(cartData)) {
      setCart(cartData);
    }
  }, []);

  const addToCart = (product) => {
    const updatedCart = [...cart];
    const existingProductIndex = updatedCart.findIndex(
      (item) =>
        item.productId === product.productId &&
        item.color === product.color &&
        item.size === product.size
    );

    if (existingProductIndex !== -1) {
      updatedCart[existingProductIndex].quantity += product.quantity;
    } else {
      updatedCart.push(product);
    }

    setCart(updatedCart);
    Cookies.set("cart", JSON.stringify(updatedCart), { expires: 7 });
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.productId !== productId);
    setCart(updatedCart);
    Cookies.set("cart", JSON.stringify(updatedCart), { expires: 7 });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
