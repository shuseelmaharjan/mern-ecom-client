import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { FaShoppingCart, FaStar, FaRegStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const JustForYou = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://dummyjson.com/products?limit=10&skip=${(page - 1) * 10}`
      );
      const newProducts = response.data.products;
      setProducts((prevProducts) => {
        const existingIds = new Set(prevProducts.map((p) => p.id));
        return [...prevProducts, ...newProducts.filter((p) => !existingIds.has(p.id))];
      });
      setPage((prevPage) => prevPage + 1);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {Array.from({ length: fullStars }, (_, i) => (
          <FaStar key={`full-${i}`} className="text-yellow-500" />
        ))}
        {halfStar && <FaStar className="text-yellow-500 opacity-50" />}
        {Array.from({ length: emptyStars }, (_, i) => (
          <FaRegStar key={`empty-${i}`} className="text-gray-300" />
        ))}
      </>
    );
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-2xl font-semibold text-center mb-6">Just For You</h2>
      <div className="overflow-x-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="group flex-shrink-0 w-full sm:w-40 md:w-48 lg:w-56 xl:w-64 bg-white relative shadow shadow-md hover:shadow-lg"
            >
              <div className="relative">
                <img
                  src={product.thumbnail}
                  alt={product.thumbnail}
                  className="w-full h-80 object-cover mb-4 transition-opacity duration-900 group-hover:opacity-0"
                />
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-80 object-cover mb-4 absolute top-0 left-0 opacity-0 transition-opacity duration-900 group-hover:opacity-100"
                />
              </div>
              <h3
                className="text-base font-semibold text-center truncate px-4 py-2"
                title={product.title}
              >
                {product.title}
              </h3>
              <div className="flex justify-between items-center mt-2 px-4 py-2">
                <p className="text-xl font-bold text-orange-500">${product.price}</p>
                <button className="p-2 bg-gray-800 text-white rounded-full hover:bg-gray-600 transition duration-300">
                  <FaShoppingCart size={20} />
                </button>
              </div>
              {/* Rating Section */}
              <div className="flex justify-start mx-4 items-center mb-2">
                <div className="flex space-x-1">{renderStars(product.rating)} <span className="ml-2 text-gray-500 font-semibold">{product.rating}</span></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <button
          className="px-6 py-2 bg-gray-800 text-white font-semibold hover:bg-gray-700 disabled:opacity-50 transition duration-300"
          onClick={fetchProducts}
          disabled={loading}
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      </div>
    </div>
  );
};

export default JustForYou;
