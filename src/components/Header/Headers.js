import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import config from "../../services/config";
import axios from "axios";
import { FaSearch, FaRegUser, FaRegHeart } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";

const Headers = () => {
  const [logo, setLogo] = useState("");
  const [search, setSearch] = useState("");
  const [showCategories, setShowCategories] = useState(false);
  const [hideBanner, setHideBanner] = useState(false);

  const BASE_URL = config.API_BASE_URL;

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/v1/site-manager`);
        setLogo(res.data.data[0].logo);
      } catch (error) {
        console.error("Error fetching logo:", error);
      }
    };

    fetchLogo();
  }, [BASE_URL]);

  const handleSearch = () => {
    console.log("Search term:", search);
  };

  const toggleCategories = () => {
    setShowCategories((prev) => !prev);
  };

  const handleScroll = () => {
    setHideBanner(window.scrollY > 50);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="w-full border-b border-gray-200 bg-white shadow-md sticky top-0 z-50">
      {/* Topbar */}
      {!hideBanner && (
        <Link>
          <div className="flex items-center justify-center h-auto bg-orange-300 text-black py-2 text-lg transition-transform duration-300">
            <span>Special offers and discounts available now!</span>
          </div>
        </Link>
      )}

      <div className="container mx-auto px-4 py-2 bg-white">
        <div className="flex sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link to={"/"}>
              {logo ? (
                <img
                  src={`${BASE_URL}${logo}`}
                  alt="Logo"
                  className="h-12 sm:h-16 object-contain"
                />
              ) : (
                <span className="text-sm text-gray-500">Loading logo...</span>
              )}
            </Link>
          </div>

          {/* Search and Categories */}
          <div className="flex items-center justify-center mx-auto w-full hidden md:flex space-x-4">
            <div className="relative">
              <button
                className="px-4 py-2 bg-gray-800 text-white font-semibold hover:bg-gray-700"
                onClick={toggleCategories}
              >
                Categories
              </button>
              {showCategories && (
                <div className="absolute top-full mt-2 w-64 bg-white border border-gray-200 shadow-lg z-10">
                  <ul className="flex flex-col divide-y divide-gray-200">
                    <li className="p-3 hover:bg-gray-100">Electronics</li>
                    <li className="p-3 hover:bg-gray-100">Fashion</li>
                    <li className="p-3 hover:bg-gray-100">Home & Garden</li>
                    <li className="p-3 hover:bg-gray-100">Sports</li>
                    <li className="p-3 hover:bg-gray-100">Toys</li>
                  </ul>
                </div>
              )}
            </div>

            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full px-4 py-2 border border-gray-800 shadow-sm focus:outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                className="absolute inset-y-0 right-0 flex items-center px-4 bg-gray-800 text-white font-semibold hover:bg-gray-700"
                onClick={handleSearch}
              >
                <FaSearch />
              </button>
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <Link to={"/login"} className="text-gray-600 hover:text-gray-800">
              <FaRegUser className="w-6 h-6" />
            </Link>
            <Link to={"/cart"} className="text-gray-600 hover:text-gray-800">
              <IoCartOutline className="w-6 h-6" />
            </Link>
            <Link
              to={"/wishlist"}
              className="text-gray-600 hover:text-gray-800"
            >
              <FaRegHeart className="w-6 h-6" />
            </Link>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="mt-4 sm:mt-0 flex justify-center md:hidden">
          <div className="relative w-full max-w-lg">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full pl-10 pr-16 py-2 border border-gray-800 focus:outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="absolute inset-y-0 right-0 flex items-center px-4 bg-gray-800 text-white font-semibold rounded-r-md hover:bg-gray-700"
              onClick={handleSearch}
            >
              <FaSearch />
            </button>
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaSearch className="text-gray-500" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Headers;