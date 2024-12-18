import React, { useState } from 'react';
import logo from '../../assets/main.svg';
import { FaSearch, FaHeart, FaShoppingCart, FaRegHeart, FaUser, FaTimes } from 'react-icons/fa';

const Header = () => {
  // State to manage the category dropdown visibility
  const [showCategory, setShowCategory] = useState(false);

  // State to manage the mobile menu visibility
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <header className="bg-gray-800 text-white p-4 relative">
      <div className="container mx-auto">
        {/* Desktop View */}
        <div className="hidden lg:flex items-center justify-between relative">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            {/* Increased logo size */}
            <img src={logo} alt="Logo" className="h-30" /> {/* Adjust h-30 or h-40 based on your needs */}
            
            {/* Category Button */}
            <button
              onClick={() => setShowCategory(!showCategory)}
              className="text-white bg-gray-700 px-4 py-2 rounded-md"
            >
              Categories
            </button>

            {/* Category List (Dropdown) */}
            {showCategory && (
              <div className="absolute top-full left-0 bg-gray-700 text-white mt-2 p-4 rounded-md w-[80%] h-[80vh]">
                {/* Close Button on Desktop */}
                <button
                  onClick={() => setShowCategory(false)}
                  className="absolute top-0 right-0 p-2"
                >
                  <FaTimes className="text-white text-xl" />
                </button>
                <ul>
                  <li>Category 1</li>
                  <li>Category 2</li>
                  <li>Category 3</li>
                </ul>
              </div>
            )}
          </div>

          {/* Search Box */}
          <div className="flex items-center">
            <input
              type="text"
              className="w-[50vw] py-2 px-4 bg-gray-700 text-white rounded-md"
              placeholder="Search..."
            />
            <button className="ml-2">
              <FaSearch className="text-white text-xl" />
            </button>
          </div>

          {/* Favorite, Cart, Wishlist, and User Icons */}
          <div className="flex items-center space-x-6">
            <FaRegHeart className="text-xl cursor-pointer" />
            <FaShoppingCart className="text-xl cursor-pointer" />
            <FaHeart className="text-xl cursor-pointer" />
            <FaUser className="text-xl cursor-pointer" />
          </div>
        </div>

        {/* Mobile View */}
        <div className="lg:hidden">
          {/* First Row (Mobile Menu, Logo, and Icons) */}
          <div className="flex items-center justify-between mb-4">
            {/* Mobile Menu Bar */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="text-white"
            >
              <div className="w-6 h-1 bg-white mb-1"></div>
              <div className="w-6 h-1 bg-white mb-1"></div>
              <div className="w-6 h-1 bg-white"></div>
            </button>

            {/* Increased logo size in mobile */}
            <img src={logo} alt="Logo" className="h-30" /> {/* Adjust h-30 or h-40 based on your needs */}

            {/* Icons */}
            <div className="flex items-center space-x-4">
              <FaRegHeart className="text-xl cursor-pointer" />
              <FaShoppingCart className="text-xl cursor-pointer" />
              <FaHeart className="text-xl cursor-pointer" />
              <FaUser className="text-xl cursor-pointer" />
            </div>
          </div>

          {/* Category Dropdown for Mobile */}
          {showMobileMenu && (
            <div className="absolute top-0 left-0 w-full bg-gray-700 text-white p-4 z-10">
              {/* Close Button */}
              <button onClick={() => setShowMobileMenu(false)} className="text-white">
                <FaTimes className="text-xl" />
              </button>
              <div className="text-xl font-bold mt-4">Categories</div>
              <ul className="mt-4">
                <li>Category 1</li>
                <li>Category 2</li>
                <li>Category 3</li>
              </ul>
            </div>
          )}

          {/* Second Row (Search Box) */}
          <div className="w-full mt-4">
            <input
              type="text"
              className="w-full py-2 px-4 bg-gray-700 text-white rounded-md"
              placeholder="Search..."
            />
          </div>
        </div>

      </div>
    </header>
  );
};

export default Header;
