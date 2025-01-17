import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { IoGridSharp } from "react-icons/io5";
import { FaList } from "react-icons/fa6";
import productService from '../../services/productService/productService';
import { useAuth } from '../../context/AuthContext';
import config from '../../services/config';

const Products = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { tab } = useParams();

  const { accessToken } = useAuth();
  const defaultTab = 'active';
  const defaultView = 'grid';

  const [activeTab, setActiveTab] = useState(defaultTab);
  const [viewType, setViewType] = useState(defaultView);
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState('');

  const BASE_URL = config.API_BASE_URL;

  const fetchData = useCallback(async () => {
    try {
      let response;
      if (activeTab === 'active') {
        response = await productService.getVendorsProduct(accessToken);
      } else if (activeTab === 'expired') {
        response = await productService.getInactiveVendorsProducts(accessToken);
      }
      if (response?.products?.products) {
        setProducts(response.products.products);
      }
    } catch (error) {
      console.error(error);
    }
  }, [activeTab, accessToken]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const currentTab = tab || defaultTab;
    const currentView = params.get('view') || defaultView;

    setActiveTab(currentTab);
    setViewType(currentView);
    fetchData();
  }, [location, tab, fetchData]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    navigate(`/listing/${tab}?view=${viewType}`);
  };

  const handleViewChange = (view) => {
    setViewType(view);
    navigate(`/listing/${activeTab}?view=${view}`);
  };

  const handleCreateProduct = () => {
    navigate('/listing/create-product');
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortBy(value);

    const sortedProducts = [...products];

    switch (value) {
      case 'latest':
        sortedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'oldest':
        sortedProducts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'priceHighLow':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'priceLowHigh':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'quantityHighLow':
        sortedProducts.sort((a, b) => b.quantity - a.quantity);
        break;
      case 'quantityLowHigh':
        sortedProducts.sort((a, b) => a.quantity - b.quantity);
        break;
      default:
        break;
    }

    setProducts(sortedProducts);
  };

  return (
    <div className="block w-full h-auto p-6 shadow-lg rounded-lg gap-6 lg:gap-8 border-gray-100 border-2">
      <div className="flex mb-10 justify-between">
        <div className="flex space-x-4">
          <button
            onClick={() => handleTabClick("active")}
            className={`py-2 px-4 ${activeTab === "active" ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-700"}`}
          >
            Active Listing
          </button>
          <button
            onClick={() => handleTabClick("expired")}
            className={`py-2 px-4 ${activeTab === "expired" ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-700"}`}
          >
            Expired Listing
          </button>
        </div>
        <button
          className="py-2 px-4 bg-gray-800 font-semibold text-white hover:bg-gray-700"
          onClick={handleCreateProduct}
        >
          Add Product
        </button>
      </div>

      <div className="flex space-x-4">
        <div className="w-10/12">
          <div className={viewType === "grid" ? "grid grid-cols-3 gap-4" : "flex flex-col gap-4"}>
            {products.map((product) => (
              <div key={product._id} className={viewType === "grid" ? "border shadow-md" : "flex items-center border p-4 shadow-md"}>
                <img
                  src={`${BASE_URL}/${product.media.images.find((img) => img.default)?.url}`}
                  alt={product.title}
                  className={viewType === "grid" ? "w-full h-72 object-cover" : "w-24 h-24"}
                />
                <div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{product.title}</h3>
                    <p>{product.quantity} in stock</p>
                    <p className="text-gray-600">${product.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-2/12">
          <div className="flex justify-end space-x-2 mb-6">
            <button
              onClick={() => handleViewChange("grid")}
              className={`py-2 px-4 ${viewType === "grid" ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-700"}`}
            >
              <IoGridSharp />
            </button>
            <button
              onClick={() => handleViewChange("list")}
              className={`py-2 px-4 ${viewType === "list" ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-700"}`}
            >
              <FaList />
            </button>
          </div>

          <div className="mb-6 w-full">
            <label htmlFor="sort" className="font-semibold text-base">Sort</label>
            <select
              id="sort"
              value={sortBy}
              onChange={handleSortChange}
              className="py-2 px-4 bg-gray-200 text-gray-700 w-full mt-4"
            >
              <option value="">Sort by</option>
              <option value="latest">Latest First</option>
              <option value="oldest">Oldest First</option>
              <option value="priceHighLow">Price High to Low</option>
              <option value="priceLowHigh">Price Low to High</option>
              <option value="quantityHighLow">Quantity High to Low</option>
              <option value="quantityLowHigh">Quantity Low to High</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
