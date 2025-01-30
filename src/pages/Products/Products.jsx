import React, { useCallback, useEffect, useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import { IoGridSharp } from "react-icons/io5";
import { FaList } from "react-icons/fa6";
import { useAuth } from '../../context/AuthContext';
import apiHandler from '../../api/apiHandler';
import { useMessage } from '../../context/MessageContext';
import { toast, ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from '../../services/config';

const Products = () => {
  const navigate = useNavigate();
  const { message, setMessage } = useMessage();
  const { accessToken } = useAuth();
  const BASE_URL = config.API_BASE_URL;

  // State management
  const [activeTab, setActiveTab] = useState('active');
  const [viewType, setViewType] = useState('grid');
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState('latest');
  const [loading, setLoading] = useState(true);

  // Toast notifications
  useEffect(() => {
    if (message) {
      toast.success(message);
      setMessage(null);
    }
  }, [message, setMessage]);

  // Fetch products from API
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const isActive = activeTab === 'active';
      const isDraft = activeTab === 'drafts';
      

      const response = await apiHandler(null, `/api/v1/get-vendor-products/${sortBy}/${isActive}/${isDraft}`, "GET", accessToken);
      
      setProducts(response);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  }, [activeTab, sortBy, accessToken]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Tab handling
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    navigate(`?tab=${tab}&sort=${sortBy}`);
    fetchProducts();
  };

  // Sort handling
  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortBy(value);
    navigate(`?tab=${activeTab}&sort=${value}`);
    fetchProducts();
  };

  // Responsive grid classes
  const getGridClasses = () => {
    if (viewType === 'grid') {
      return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4';
    }
    return 'flex flex-col gap-4';
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
            onClick={() => navigate('/listing/create-listing')}
            className="py-2 px-4 bg-gray-800 font-semibold text-white hover:bg-gray-700 rounded"
          >
            Add Product
          </button>
        </div>
      </div>

      {/* Controls Section */}
      <div className="flex flex-col md:flex-row justify-between mb-6 space-y-4 md:space-y-0">
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

        <select
          value={sortBy}
          onChange={handleSortChange}
          className="p-2 rounded bg-gray-200 text-gray-700 md:w-48"
        >
          <option value="latest">Latest First</option>
          <option value="oldest">Oldest First</option>
          <option value="priceHighLow">Price High to Low</option>
          <option value="priceLowHigh">Price Low to High</option>
        </select>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="text-center py-8">Loading products...</div>
      ) : (
        <div className={getGridClasses()}>
          {products.map((product) => (
            <div
              key={product._id}
              className={`border rounded-lg shadow-sm overflow-hidden ${
                viewType === 'list' ? 'flex flex-col md:flex-row' : ''
              }`}
            >
              <img
                src={`${BASE_URL}${product.variations[0]?.media[0]}`}
                alt={product.title}
                className={`object-cover ${
                  viewType === 'grid' 
                    ? 'w-full h-48' 
                    : 'w-full md:w-48 h-48 md:h-auto'
                }`}
              />

              <div className="p-4 flex-1">
                <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
                <p className="text-gray-600 mb-2">${product.price}</p>
                <p className="text-sm mb-2">{product.quantity} in stock</p>

                {activeTab === 'drafts' && (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">
                      {product.description.substring(0, 100)}...
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {product.color?.map((c) => (
                        <span
                          key={c}
                          className="px-2 py-1 text-xs rounded-full bg-gray-100"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500">
                      Material: {product.material}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

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