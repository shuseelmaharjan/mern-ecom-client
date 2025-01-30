import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoGridSharp } from "react-icons/io5";
import { FaList } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useAuth } from "../../context/AuthContext";
import apiHandler from "../../api/apiHandler";
import { useMessage } from "../../context/MessageContext";
import { toast, ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from "../../services/config";
import DateUtils from "../../utils/dateUtils";

const Products = () => {
  const navigate = useNavigate();
  const { message, setMessage } = useMessage();
  const { accessToken } = useAuth();
  const BASE_URL = config.API_BASE_URL;

  const [activeTab, setActiveTab] = useState("active");
  const [viewType, setViewType] = useState("grid");
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState("latest");
  const [loading, setLoading] = useState(true);
  const [openSettingsId, setOpenSettingsId] = useState(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (message) {
      toast.success(message);
      setMessage(null);
    }
  }, [message, setMessage]);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const isActive = activeTab === "active";
      const isDraft = activeTab === "drafts";
      const response = await apiHandler(
        null,
        `/api/v1/get-vendor-products/${sortBy}/${isActive}/${isDraft}`,
        "GET",
        accessToken
      );
      setProducts(response);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  }, [activeTab, sortBy, accessToken]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    navigate(`?tab=${tab}&sort=${sortBy}`);
    fetchProducts();
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortBy(value);
    navigate(`?tab=${activeTab}&sort=${value}`);
    fetchProducts();
  };

  const getGridClasses = () => {
    if (viewType === "grid") {
      return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4";
    }
    return "flex flex-col gap-4";
  };

  const handleToggle = () => {
    setEnabled(!enabled);
  };

  const handleSettingsToggle = (id) => {
    setOpenSettingsId(openSettingsId === id ? null : id);
  };

  return (
    <div className="block w-full h-auto p-6 shadow-lg rounded-lg gap-6 lg:gap-8 border-gray-100 border-2">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row mb-10 justify-between">
        <div className="flex space-x-4 mb-4 md:mb-0">
          <button
            onClick={() => handleTabClick("active")}
            className={`py-2 px-4 rounded ${
              activeTab === "active"
                ? "bg-gray-800 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Active Products
          </button>
          <button
            onClick={() => handleTabClick("drafts")}
            className={`py-2 px-4 rounded ${
              activeTab === "drafts"
                ? "bg-gray-800 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Drafts
          </button>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={() => navigate("/listing/create-listing")}
            className="py-2 px-4 bg-gray-800 font-semibold text-white hover:bg-gray-700 rounded"
          >
            Add Product
          </button>
        </div>
      </div>

      {/* Controls Section */}
      <div className="flex flex-col md:flex-row justify-between mb-6 space-y-4 space-x-4 md:space-y-0">
        {/* Product Grid Section */}
        <div className="w-full md:w-10/12">
          {loading ? (
            <div className="text-center py-8"></div>
          ) : (
            <div className={getGridClasses()}>
              {products.map((product) => (
                <div
                  key={product._id}
                  className={`border rounded-lg shadow-sm ${
                    viewType === "list" ? "flex flex-col md:flex-row" : ""
                  }`}
                >
                  <img
                    src={`${BASE_URL}${product.variations[0]?.media[0]}`}
                    alt={product.title}
                    className={`object-cover h-72 ${
                      viewType === "grid" ? " w-full" : " w-72 "
                    }`}
                  />
                  <div className="p-4 flex-1">
                    <div className="flex justify-between items-center mb-4 relative">
                      <h3 className="text-lg font-semibold mb-2">
                        {product.title}
                      </h3>
                      <div className="relative">
                        <button
                          className="p-2 hover:bg-gray-200 rounded-full"
                          onClick={() => handleSettingsToggle(product._id)}
                        >
                          <BsThreeDotsVertical size={20} />
                        </button>
                        {openSettingsId === product._id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-10">
                            <ul>
                              <li
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() =>
                                  navigate(`/listing/update-listing/${product._id}`)
                                }
                              >
                                Edit Product
                              </li>
                              <li
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() =>
                                  navigate(`/listing/view/${product._id}`)
                                }
                              >
                                View Product
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>

                    {enabled ? (
                      <>
                        <div className="flex justify-between items-center mb-4">
                          <p className="text-gray-600 mb-2 font-semibold">
                            ${product.price}
                          </p>
                          <p className="text-sm mb-2 font-semibold">
                            {product.quantity} in stock
                          </p>
                          <p className="text-sm mb-2">
                            Created At :{" "}
                            {DateUtils.formatDate(product.createdAt)}
                          </p>
                        </div>
                        {viewType === "grid" ? (
                          <div className="flex flex-col">
                            <div className="flex justify-between mb-4">
                              <p className="text-base text-gray-500 font-semibold">
                                Brand: {product.brand}
                              </p>
                              <p className="text-base text-gray-500 font-semibold">
                                Weight: {product.weight}
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {product.color?.map((c) => (
                                  <span
                                    key={c}
                                    className="px-2 py-1 text-xs rounded-full bg-orange-500 text-white font-semibold"
                                  >
                                    {c}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="flex justify-between mb-4">
                              <p className="text-base text-gray-500 font-semibold">
                                Material: {product.material}
                              </p>
                              <p className="text-base text-gray-500 font-semibold">
                                Custom Order:{" "}
                                {product.customOrder ? "Yes" : "No"}
                              </p>
                            </div>
                            <div className="flex justify-between mb-4">
                              <p className="text-base text-gray-500 font-semibold">
                                Views: {product.views}
                              </p>
                              <p className="text-base text-gray-500 font-semibold">
                                Rating: {product.rating}
                              </p>
                              <p className="text-base text-gray-500 font-semibold">
                                Total Sales: {product.rating}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="flex justify-between items-center mb-4">
                              <p className="text-base text-gray-500 font-semibold">
                                Brand: {product.brand}
                              </p>
                              <p className="text-base text-gray-500 font-semibold">
                                Weight: {product.weight}
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {product.color?.map((c) => (
                                  <span
                                    key={c}
                                    className="px-2 py-1 text-xs rounded-full text-white font-semibold bg-orange-400"
                                  >
                                    {c}
                                  </span>
                                ))}
                              </div>
                              <p className="text-base text-gray-500 font-semibold">
                                Material: {product.material}
                              </p>
                              <p className="text-base text-gray-500 font-semibold">
                                Custom Order:{" "}
                                {product.customOrder ? "Yes" : "No"}
                              </p>
                            </div>
                            <div className="flex justify-between items-center mb-4">
                              <p className="text-base text-gray-500 font-semibold">
                                Views: {product.views}
                              </p>
                              <p className="text-base text-gray-500 font-semibold">
                                Rating: {product.rating}
                              </p>
                              <p className="text-base text-gray-500 font-semibold">
                                Total Sales: {product.rating}
                              </p>
                            </div>
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        <div className="flex justify-between items-center mb-4">
                          <p className="text-gray-600 mb-2 font-semibold">
                            ${product.price}
                          </p>
                          <p className="text-sm mb-2 font-semibold">
                            {product.quantity} in stock
                          </p>
                          <p className="text-sm mb-2">
                            Created At :{" "}
                            {DateUtils.formatDate(product.createdAt)}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Settings Panel */}
        <div className="w-full md:w-2/12 flex flex-col items-end space-y-4">
          <div className="flex space-x-4 justify-between items-center w-full">
            <div className="flex items-center space-x-2">
          <span className="text-lg font-semibold">Stats</span>

            <div
              onClick={handleToggle}
              className={`relative w-16 h-8 flex items-center rounded-full cursor-pointer transition-all duration-300 ${
                enabled ? "bg-gray-800" : "bg-gray-300"
              }`}
            >
              <div
                className={`absolute left-1 top-1 w-6 h-6 bg-white rounded-full shadow-md transform transition-all duration-300 ${
                  enabled ? "translate-x-8" : "translate-x-0"
                }`}
              />
              <span
                className={`absolute left-2 text-xs font-medium transition-opacity ${
                  enabled ? "text-white opacity-100" : "text-gray-500 opacity-0"
                }`}
              >
                ON
              </span>
              <span
                className={`absolute right-2 text-xs font-medium transition-opacity ${
                  enabled
                    ? "text-gray-500 opacity-0"
                    : "text-gray-700 opacity-100"
                }`}
              >
                OFF
              </span>
            </div>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setViewType("grid")}
                className={`p-2 rounded ${
                  viewType === "grid"
                    ? "bg-gray-800 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                <IoGridSharp size={20} />
              </button>
              <button
                onClick={() => setViewType("list")}
                className={`p-2 rounded ${
                  viewType === "list"
                    ? "bg-gray-800 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                <FaList size={20} />
              </button>
            </div>
          </div>
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="p-2 rounded bg-gray-200 text-gray-700 w-full mb-6"
          >
            <option value="latest">Latest First</option>
            <option value="oldest">Oldest First</option>
            <option value="priceHighLow">Price High to Low</option>
            <option value="priceLowHigh">Price Low to High</option>
            <option value="quantityHighLow">Quantity High to Low</option>
            <option value="quantityLowHigh">Quantity Low to High</option>
          </select>
          <div className="flex flex-col space-y-2 w-full mt-4">
            <h1 className="text-base font-semibold">Total Products</h1>
            <h1 className="text-base font-semibold">Total Sold</h1>
            <h1 className="text-base font-semibold">Total Draft</h1>
            <h1 className="text-base font-semibold">Featured Products</h1>
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Flip}
      />
    </div>
  );
};

export default Products;