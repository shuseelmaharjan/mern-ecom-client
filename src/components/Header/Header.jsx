import React, { useState, useRef } from 'react';
import logo from '../../assets/felthub-logo.png';
import { FaSearch, FaBars, FaShoppingCart, FaRegHeart, FaUser, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaBox } from "react-icons/fa6";
import { LiaGiftSolid } from "react-icons/lia";
import { MdLogout } from "react-icons/md";
import Logout from '../../pages/Auth/Logout';

const Header = () => {
  const [showCategory, setShowCategory] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const {
    showLogoutModal,
    setShowLogoutModal,
    handleLogout,
    isLoggedIn,
  } = useAuth()

  const categoriesButtonRef = useRef(null); 

  

  return (
    <>
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo and Categories */}
          <div className="flex items-center space-x-4">
          <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="lg:hidden text-gray-700 hover:text-green-500 transition"
            >
              <FaBars className="text-2xl" />
            </button>

            <Link to="/">
              <img src={logo} alt="Logo" className="w-32" />
            </Link>
            <button
              onClick={() => setShowCategory(!showCategory)}
              className="hidden lg:flex items-center space-x-2 text-gray-700 hover:text-green-500 transition"
              ref={categoriesButtonRef} // Attach the ref to the button
            >
              <span className="text-lg font-medium">Categories</span>
              <FaBars className="text-xl" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-grow items-center mx-8">
            <input
              type="text"
              className="flex-grow py-2 px-4 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="Search for products..."
            />
            <button className="bg-green-500 text-white px-4 py-2 rounded-r-md hover:bg-green-600 transition flex items-center justify-center">
              <FaSearch className="text-xl h-full" />
            </button>
          </div>

          {/* Right-Side Icons */}
          <div className="flex items-center space-x-4">
            <Link
              to="/wishlist"
              className="text-gray-700 hover:text-green-500 transition"
            >
              <FaRegHeart className="text-2xl" />
            </Link>
            <Link
              to="/cart"
              className="text-gray-700 hover:text-green-500 transition relative"
            >
              <FaShoppingCart className="text-2xl" />
              {/* Example Badge */}
              <span className="absolute -top-1 -right-2 bg-green-500 text-white text-xs font-bold rounded-full px-1">
                0
              </span>
            </Link>
            <div className="relative">
              {isLoggedIn ? (
                <>
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="text-gray-700 hover:text-green-500 flex items-center space-x-2 transition"
                  >
                    <FaUser className="text-2xl" />
                    <span className="hidden lg:block">Hello, User</span>
                  </button>
                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg border rounded-md">
                    <ul className="divide-y divide-gray-200">
                      <li className="group">
                        <Link
                          to="/profile"
                          className="flex items-center px-4 py-2 hover:bg-gray-100"
                        >
                          <FaUser className="mr-2 text-gray-500 group-hover:text-gray-700" />
                          <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                            My Profile
                          </span>
                        </Link>
                      </li>
                      <li className="group">
                        <Link
                          to="/orders"
                          className="flex items-center px-4 py-2 hover:bg-gray-100"
                        >
                          <FaBox className="mr-2 text-gray-500 group-hover:text-gray-700" />
                          <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                            Orders
                          </span>
                        </Link>
                      </li>
                      <li className="group">
                        <Link
                          to="/wishlist"
                          className="flex items-center px-4 py-2 hover:bg-gray-100"
                        >
                          <FaRegHeart className="mr-2 text-gray-500 group-hover:text-gray-700" />
                          <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                            Wishlist
                          </span>
                        </Link>
                      </li>
                      <li className="group">
                        <Link
                          to="/rewards"
                          className="flex items-center px-4 py-2 hover:bg-gray-100"
                        >
                          <LiaGiftSolid className="mr-2 text-gray-500 group-hover:text-gray-700" />
                          <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                            Rewards
                          </span>
                        </Link>
                      </li>
                      <li className="group">
                        <button
                          className="flex items-center px-4 py-2 hover:bg-gray-100 w-full"
                          onClick={() => setShowLogoutModal(true)} // Show logout modal
                        >
                          <MdLogout className="mr-2 text-gray-500 group-hover:text-gray-700" />
                          <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                            Logout
                          </span>
                        </button>
                      </li>
                    </ul>
                  </div>
                  
                  )}
                </>
              ) : (
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-green-500 transition flex items-center space-x-2"
                >
                  <FaUser className="text-2xl" />
                  <span className="hidden lg:block">Login / Signup</span>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Dropdown for Categories */}
        {showCategory && (
          <div
            className="absolute bg-white shadow-lg border rounded-md"
            style={{
              left: categoriesButtonRef.current?.offsetLeft, 
              width: categoriesButtonRef.current?.offsetWidth + 80, 
            }}
          >
            <ul className="divide-y divide-gray-200">
                      <li className="group">
                        <Link className="flex items-center px-4 py-2 hover:bg-gray-100">
                          <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                           Option 1
                          </span>
                        </Link>
                      </li>
                      <li className="group">
                        <Link className="flex items-center px-4 py-2 hover:bg-gray-100">
                          <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                           Option 1
                          </span>
                        </Link>
                      </li>
                      <li className="group">
                        <Link className="flex items-center px-4 py-2 hover:bg-gray-100">
                          <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                           Option 1
                          </span>
                        </Link>
                      </li>
                      <li className="group">
                        <Link className="flex items-center px-4 py-2 hover:bg-gray-100">
                          <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                           Option 1
                          </span>
                        </Link>
                      </li>
                      <li className="group">
                        <Link className="flex items-center px-4 py-2 hover:bg-gray-100">
                          <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                           Option 1
                          </span>
                        </Link>
                      </li>
                      
                    </ul>
          </div>
        )}

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="lg:hidden bg-white text-gray-800 absolute inset-0 z-50">
            <div className='mx-auto px-4 py-3'>
            <Link to="/">
              <img src={logo} alt="Logo" className="w-32" />
            </Link>
            </div>
            
            <button
              onClick={() => setShowMobileMenu(false)}
              className="absolute top-4 right-4 text-gray-800"
            >
              <FaTimes className="text-2xl" />
            </button>
            <div className="flex flex-col space-y-4 px-8 py-6">
              <Link to="/" className="hover:text-green-500">Home</Link>
              <Link to="/category" className="hover:text-green-500">Categories</Link>
              <Link to="/login" className="hover:text-green-500">Login / Signup</Link>
            </div>
          </div>
        )}
        <div className="lg:hidden px-4 py-2 flex">
          <input
            type="text"
            className="w-[80vw] py-2 px-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
            placeholder="Search for products..."
          />
          {/* <input
              type="text"
              className="flex-grow py-2 px-4 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="Search for products..."
            /> */}
            <button className="bg-green-500 w-[20vw] text-white px-4 py-2 rounded-r-md hover:bg-green-600 transition flex items-center justify-center">
              <FaSearch className="text-xl h-full" />
            </button>
        </div>

        {showLogoutModal && (
        <Logout
          onClose={() => setShowLogoutModal(false)}
          onConfirm={handleLogout}
        />
      )}

      </header>
    </>
  );
};

export default Header;
