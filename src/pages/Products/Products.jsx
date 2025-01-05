import React, { useState, useEffect } from "react";
import { FaPlus, FaBars } from "react-icons/fa6";
import { FaThLarge } from "react-icons/fa";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import productService from "../../services/productService/productService";
import { useAuth } from "../../context/AuthContext";
import config from "../../services/config";

const Products = () => {
  const { accessToken } = useAuth();
  const [products, setProducts] = useState([]);
  const [viewType, setViewType] = useState(
    Cookies.get("viewType") || "grid" 
  );
  const [sortOption, setSortOption] = useState("latest");




  const BASE_URL = config.API_BASE_URL;



  useEffect(() => {
    const getData = async () => {
      try {
        const data = await productService.getVendorsProduct(accessToken);
        setProducts(data.products);
        console.log(data.products);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, [accessToken]);

  const handleViewTypeChange = (type) => {
    setViewType(type);
    Cookies.set("viewType", type, { expires: 30 });
  };

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortOption) {
      case "latest":
        return new Date(b.createdAt) - new Date(a.createdAt);
      case "asc":
        return a.title.localeCompare(b.title);
      case "desc":
        return b.title.localeCompare(a.title);
      case "lowToHigh":
        return a.price - b.price;
      case "highToLow":
        return b.price - a.price;
      default:
        return 0;
    }
  });

  return (
    <div className="flex flex-col md:flex-row p-4 bg-white text-gray-800">
      {/* Main Content */}
      <div className="w-full md:w-3/4 p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Product List</h2>
          <div className="flex space-x-2">
            <button
              className={`p-2 border ${
                viewType === "grid" ? "bg-gray-200" : "bg-white"
              }`}
              onClick={() => handleViewTypeChange("grid")}
            >
              <FaThLarge />
            </button>
            <button
              className={`p-2 border ${
                viewType === "box" ? "bg-gray-200" : "bg-white"
              }`}
              onClick={() => handleViewTypeChange("box")}
            >
              <FaBars />
            </button>
          </div>
        </div>
        <div className={`grid ${viewType === 'grid' ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-1'} gap-4`}>
  {sortedProducts.map((product) => {
    const defaultImage = product.media.images.find((img) => img.default)?.url;
    return (
      <div
        key={product._id}
        className="border border-gray-200 rounded-lg p-4 flex flex-col items-center bg-white shadow-sm"
      >
        <img
          src={defaultImage ? `${BASE_URL}/${defaultImage}` : 'https://via.placeholder.com/150'}
          alt={product.title}
          className="h-32 w-full object-cover mb-4 rounded"
        />
        <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
        <p className="text-gray-600 mt-2">Price: ${product.price}</p>
        <p className="text-gray-600">Quantity: {product.quantity}</p>
      </div>
    );
  })}
</div>


      </div>

      {/* Right Sidebar */}
      <div className="w-full md:w-1/4 p-4 bg-gray-50 border-l border-gray-300">
        <Link
          to="/listing/create-product"
          className="w-full flex justify-between items-center mb-4 py-2 px-4 bg-black text-white font-bold"
        >
          <span className="items-center flex mx-auto">
            <FaPlus /> <span>Add Product</span>
          </span>
        </Link>
        <div className="mb-4">
          <label htmlFor="sort" className="block text-gray-600 mb-2">
            Sort By
          </label>
          <select
            id="sort"
            className="w-full py-2 px-4 bg-gray-100 border border-gray-300 text-gray-800 rounded"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="latest">Latest First</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>
        <div>
          <h3 className="text-gray-600 mb-2">Total Products</h3>
          <p className="text-gray-800">{products.length}</p>
        </div>
      </div>
    </div>
  );
};

export default Products;
