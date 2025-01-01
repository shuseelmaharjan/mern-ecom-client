import React, { useState, useRef, useEffect, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import {
  FaSearch,
  FaBars,
  FaShoppingCart,
  FaRegHeart,
  FaUser,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Logout from "../../pages/Auth/Logout";
import { useLocation } from "react-router-dom";

import ProfileMenu from "./ProfileMenu";
import ShowCategories from "./ShowCategories";
import MobileOptions from "./MobileOptions";
import siteService from "../../services/site/siteService";
import config from "../../services/config";
import Cookies from 'js-cookie';

const Header = () => {
  const BASE_URL = config.API_BASE_URL;

  const [showCategory, setShowCategory] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [siteLogo, setSiteLogo] = useState("");
  const [name, setName] = useState("");

  const location = useLocation();
  const categoriesButtonRef = useRef(null);

  const {
    isLoggedIn,
    showLogoutModal,
    handleLogout,
    setShowLogoutModal,
  } = useAuth();

  useEffect(() => {
    const token = Cookies.get('_r');
    
    if (token) {
      const decodedToken = jwtDecode(token);
      setName(decodedToken.name);
    }
  }, []);

  // Fetch site details
  const siteManager = useCallback(async () => {
    try {
      const data = await siteService.getData();

      if (data.data && data.data.length > 0) {
        const siteData = data.data[0];

        setSiteLogo(BASE_URL + siteData.logo);

        const siteDetails = {
          title: siteData.title,
          narration: siteData.narration,
          primaryColor: siteData.primaryColor,
          secondaryColor: siteData.secondaryColor,
          buttonColor: siteData.buttonColor,
          hoverButtonColor: siteData.hoverButtonColor,
        };

        sessionStorage.setItem("siteDetails", JSON.stringify(siteDetails));
      } else {
        setSiteLogo("Logo");
      }
    } catch (error) {
      console.error("Server error:", error);
    }
  }, [BASE_URL]);

  useEffect(() => {
    siteManager();
  }, [siteManager]);

  // // Fetch user info
  // const fetchUserInfo = useCallback(async () => {
  //   try {
  //     const response = await authService.userInfo(accessToken);
  //     setUserName(response.name);
  //   } catch (error) {
  //     console.error("Error fetching user info:", error);
  //   }
  // }, [accessToken]);

  // useEffect(() => {
  //   if (accessToken) {
  //     fetchUserInfo();
  //   }
  // }, [accessToken, fetchUserInfo]);

  // Close menus on location change
  useEffect(() => {
    setShowCategory(false);
    setShowMobileMenu(false);
  }, [location]);

  return (
    <>
      <header className="bg-white h-15 shadow-md border-b border-gray-200 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowMobileMenu((prev) => !prev)}
              className="lg:hidden text-gray-700 hover:text-green-500 transition"
            >
              <FaBars className="text-2xl" />
            </button>

            <Link to="/">
              <img src={siteLogo} alt="Logo" className="w-32" />
            </Link>
            <button
              onClick={() => setShowCategory((prev) => !prev)}
              className="hidden lg:flex items-center space-x-2 text-gray-700 hover:text-green-500 transition"
              ref={categoriesButtonRef}
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
              <span className="absolute -top-1 -right-2 bg-green-500 text-white text-xs font-bold rounded-full px-1">
                0
              </span>
            </Link>
            <div className="relative">
              {isLoggedIn ? (
                <>
                  <button
                    onClick={() => setShowProfileMenu((prev) => !prev)}
                    className="text-gray-700 hover:text-green-500 flex items-center space-x-2 transition"
                  >
                    <FaUser className="text-2xl" />
                    <span className="hidden lg:block">
                      Hello, {name || "User"}
                    </span>
                  </button>
                  {showProfileMenu && <ProfileMenu />}
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
            className="absolute bg-white shadow-lg border rounded-md z-100"
            style={{
              left: categoriesButtonRef.current?.offsetLeft,
              width: categoriesButtonRef.current?.offsetWidth + 80,
            }}
          >
            <ShowCategories />
          </div>
        )}

        {/* Mobile Menu */}
        {showMobileMenu && (
          <MobileOptions setShowMobileMenu={setShowMobileMenu} />
        )}
        <div className="lg:hidden px-4 py-2 flex">
          <input
            type="text"
            className="w-[80vw] py-2 px-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
            placeholder="Search for products..."
          />
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
