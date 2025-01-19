import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import config from "../../services/config";
import { FaRegTrashAlt } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import { toast } from "react-toastify";
import HomepageService from "../../services/homepageService/homepageService";
import {useAuth} from '../../context/AuthContext';
import { FaMapMarkerAlt } from "react-icons/fa";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [address, setAddress] = useState('');


  const BASE_URL = config.API_BASE_URL;
  const { removeFromCart } = useCart();
  const {accessToken} = useAuth();

  useEffect(() => {
    const cartData = Cookies.get("cart") ? JSON.parse(Cookies.get("cart")) : [];
    setCart(cartData);
    setSelectedProducts(cartData.map((item) => item.productId));

    if (cartData.length > 0) {
      HomepageService.getProductCartDetails(cartData)
        .then((data) => {
          setProductDetails(data);
        })
        .catch((error) => {
          console.error("Error fetching product details:", error);
        });
    }
  }, []);

  const handleQuantityChange = (productId, newQuantity) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) => {
        if (item.productId === productId) {
          const productDetail = productDetails.find(
            (product) => product.productId === productId
          );
          const productLimit = productDetail ? productDetail.productLimit : 1;
          const updatedQuantity = Math.max(
            1,
            Math.min(newQuantity, productLimit)
          );
          return { ...item, quantity: updatedQuantity };
        }
        return item;
      });

      Cookies.set("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const handleDeleteProduct = (productId) => {
    const updatedCart = cart.filter((item) => item.productId !== productId);
    setCart(updatedCart);
    Cookies.set("cart", JSON.stringify(updatedCart));
    removeFromCart(productId);
    toast.success("Item removed successfully.");
  };

  const handleSelectProduct = (productId) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(productId)
        ? prevSelected.filter((id) => id !== productId)
        : [...prevSelected, productId]
    );
  };

  const handleSelectAll = () => {
    setSelectedProducts(cart.map((item) => item.productId));
  };

  const handleDeselectAll = () => {
    setSelectedProducts([]);
  };

  const calculateTotal = () => {
    let totalRetailPrice = 0;
    let totalDiscountedAmount = 0;
    let totalOfferedCost = 0;
    let totalShippingCost = 0;

    selectedProducts.forEach((productId) => {
      const item = cart.find((cartItem) => cartItem.productId === productId);
      const productDetail = productDetails.find(
        (product) => product.productId === productId
      );

      if (item && productDetail) {
        const retailPrice = productDetail.totalAmount;
        const discountedPrice = productDetail.campaignStatus
          ? productDetail.offeredCost
          : productDetail.price;

        totalRetailPrice += item.quantity * retailPrice;
        totalDiscountedAmount +=
          item.quantity * (retailPrice - discountedPrice);
        totalOfferedCost += item.quantity * discountedPrice;
        totalShippingCost += productDetail.shippingCost || 0; 
      }
    });

    return {
      totalRetailPrice,
      totalDiscountedAmount,
      totalOfferedCost,
      totalShippingCost,
    };
  };

  const {
    totalRetailPrice,
    totalDiscountedAmount,
    totalOfferedCost,
    totalShippingCost,
  } = calculateTotal();



  useEffect(() => {
    const getAddress = async() => {
      try{
        const response = await HomepageService.getDefaultAddress(accessToken);
        setAddress(response.data);
        console.log(response.data);
      }catch(error){
        console.error(error);
      }
    }
    getAddress();
  }, [accessToken]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      <div className="flex justify-between mb-4">
        <button
          onClick={handleSelectAll}
          className="px-6 py-2 bg-gray-800 text-white font-semibold hover:bg-gray-700 transition duration-300"
        >
          {selectedProducts.length === cart.length
            ? "Deselect All"
            : "Select All"}
        </button>
        <button
          onClick={handleDeselectAll}
          className="px-6 py-2 bg-gray-800 text-white font-semibold hover:bg-gray-700 transition duration-300 hidden"
        >
          Deselect All
        </button>
      </div>
      <div className="flex space-x-4">
        <div className="space-y-4 w-8/12">
          {cart.map((item, index) => {
            const productDetail = productDetails.find(
              (product) => product.productId === item.productId
            );
            if (!productDetail) return null;

            return (
              <div key={index} className="flex border p-4 rounded shadow">
                <div className="flex-1 flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(item.productId)}
                    onChange={() => handleSelectProduct(item.productId)}
                    className="mr-2 w-6 h-6 text-gray-800 bg-gray-800"
                  />
                  <img
                    src={`${BASE_URL}/${productDetail.media.url}`}
                    alt={productDetail.title}
                    className="w-24 h-24 object-cover mx-4"
                  />
                  <div className="block w-8/12">
                    <h1 className="text-xl w-full">{productDetail.title}</h1>

                    <div className="flex space-x-4 items-center">
                      <p>
                        <strong>Color:</strong>
                        <span
                          className="w-6 h-6 rounded-full shadow-md border-2 border-gray-300 cursor-pointer"
                          style={{ backgroundColor: item.color }}
                          title={item.color}
                        ></span>
                      </p>
                      <p>
                        <strong>Size:</strong> {item.size}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col ">
                    {productDetail.campaignStatus ? (
                      <span className="text-center">
                        <p>
                          <span className="line-through text-gray-500 mx-2">
                            $ {productDetail.price}
                          </span>
                        </p>
                        <p>
                          <strong>${productDetail.offeredCost}</strong>
                        </p>
                      </span>
                    ) : (
                      <p>
                        <strong>${productDetail.price}</strong>
                      </p>
                    )}
                    <span className="flex justify-end">
                      <FaRegTrashAlt
                        onClick={() => handleDeleteProduct(item.productId)}
                        className="text-gray-600"
                      />
                    </span>
                  </div>
                </div>

                {/* Quantity and Delete */}
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="mb-4">
                    <div className="flex items-center justify-start gap-4 mt-2 border-gray-300">
                      <button
                        className="px-6 py-2 bg-gray-800 text-white font-semibold hover:bg-gray-700 transition duration-300"
                        onClick={() =>
                          handleQuantityChange(
                            item.productId,
                            item.quantity - 1
                          )
                        }
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        min="1"
                        max={productDetail.productLimit}
                        onChange={(e) =>
                          handleQuantityChange(
                            item.productId,
                            parseInt(e.target.value)
                          )
                        }
                        className="w-16 text-center border rounded-md bg-gray-100"
                        hidden
                      />
                      <span>{item.quantity}</span>
                      <button
                        className="px-6 py-2 bg-gray-800 text-white font-semibold hover:bg-gray-700 transition duration-300"
                        onClick={() =>
                          handleQuantityChange(
                            item.productId,
                            item.quantity + 1
                          )
                        }
                      >
                        +
                      </button>
                    </div>

                    <p className="text-sm text-gray-500 text-left mt-2">
                      Max selectable quantity: {productDetail.productLimit}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="space-y-4 w-4/12 border p-4 rounded shadow">
          <div className="bg-white max-w-md mx-auto flex items-start gap-3 border-b border-gray-300">
          <span className="text-gray-800 flex-shrink-0">
            <FaMapMarkerAlt className="text-[2.5rem]" />
          </span>

          <span className="text-gray-700 text-base leading-6">
            {address.addressLine1}, {address.city}, {address.state}, {address.postalCode}, {address.country}, {address.phone}
          </span>
        </div>

          <div className="min-h-48">
            <h2 className="font-semibold text-lg">Order Summary</h2>

            {selectedProducts.length > 0 ? (
              selectedProducts.map((productId, index) => {
                const item = cart.find(
                  (cartItem) => cartItem.productId === productId
                );
                const productDetail = productDetails.find(
                  (product) => product.productId === productId
                );
                if (!productDetail || !item) return null;

                return (
                  <div
                    key={index}
                    className="flex justify-between border-b p-2"
                  >
                    <img
                      src={`${BASE_URL}/${productDetail.media.url}`}
                      alt={productDetail.title}
                      className="w-12 h-12 object-cover"
                    />
                    <p className="text-sm font-semibold text-center truncate mt-2 px-2">
                      {productDetail.title} - {item.quantity} x $
                      {productDetail.campaignStatus
                        ? productDetail.offeredCost
                        : productDetail.price}
                    </p>
                    <p>
                      ${(item.quantity * productDetail.totalAmount).toFixed(2)}
                    </p>
                  </div>
                );
              })
            ) : (
              <p>No items selected for billing.</p>
            )}
          </div>

          <div>
            <div className="w-full bg-gray-300 h-[1px] mb-4"></div>
            <div className="flex justify-between">
              <span>Retail Price</span>
              <span>${totalRetailPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Discounted Amount</span>
              <span>${totalDiscountedAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping Cost</span>
              <span>${totalShippingCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>${(totalOfferedCost + totalShippingCost).toFixed(2)}</span>
            </div>

            <div className="mt-4">
              <button className="px-6 w-full py-2 bg-gray-800 text-white font-semibold hover:bg-gray-700 transition duration-300">
                Checkout Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
