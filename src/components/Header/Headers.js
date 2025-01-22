import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import config from "../../services/config";
import { FaSearch, FaRegUser, FaRegHeart } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { HiOutlineXMark } from "react-icons/hi2";
import AuthLogin from "../../pages/Auth/AuthLogin";
import AuthRegister from "../../pages/Auth/AuthRegister";
import ForgetPassword from "../../pages/Auth/ForgetPassword";
import { useAuth } from "../../context/AuthContext";
import ProfileMenu from "./ProfileMenu";
import { useLocation } from "react-router-dom";
import siteService from "../../services/site/siteService";
import HeadingAds from "./HeadingAds";
import { capitalizeFirstLetter } from "../../utils/textUtils";
import HomepageService from "../../services/homepageService/homepageService";
import { useCart } from "../../context/CartContext";

const Headers = () => {
  const [logo, setLogo] = useState("");
  const [search, setSearch] = useState("");
  const [showCategories, setShowCategories] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModelOpen, setIsRegisterModalOpen] = useState(false);
  const [forgetPasswordModalOpen, setForgetPasswordModalOpen] = useState(false);

  const { cart } = useCart();

  const BASE_URL = config.API_BASE_URL;

  const { accessToken, isLoggedIn } = useAuth();

  const handleSearch = () => {
    console.log("Search term:", search);
  };

  const toggleCategories = () => {
    setShowCategories((prev) => !prev);
  };

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const closeReisterModal = () => setIsRegisterModalOpen(false);
  const closeForgetPasswordModal = () => setForgetPasswordModalOpen(false);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const location = useLocation();
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const message = queryParams.get("message");

    if (message === "Please login") {
      setIsLoginModalOpen(true);
    }
  }, [location.search]);

  useEffect(() => {
    const fetchSiteData = async () => {
      try {
        const data = await siteService.getData(accessToken);
        setLogo(data.siteData.logo);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSiteData();
  }, [accessToken]);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await HomepageService.getCategories();
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <header className="w-full border-b border-gray-200 bg-white shadow-md sticky top-0 z-50">
        <HeadingAds />
        <div className="container mx-auto px-4 bg-white h-full">
          <div className="flex sm:flex-row items-center justify-between h-full">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Link to={"/"}>
                {logo ? (
                  <img
                    src={`${BASE_URL}${logo}`}
                    alt="Logo"
                    className="h-12 sm:h-16 object-contain py-2"
                  />
                ) : (
                  <span className="text-sm text-gray-500">Loading logo...</span>
                )}
              </Link>
            </div>

            {/* Search and Categories */}
            <div className="flex items-center justify-center mx-auto w-full hidden md:flex space-x-4 py-2 h-12">
              <div className="relative">
                <button
                  className="px-4 py-2 bg-gray-800 text-white font-semibold hover:bg-gray-700"
                  onClick={toggleCategories}
                >
                  Categories
                </button>
                {showCategories && (
                  <div className="absolute top-full w-64 bg-white border border-gray-200 shadow-lg z-10">
                    <ul className="space-y-2">
                      {categories.map((category) => (
                        <li key={category._id} className="hover:bg-gray-100">
                          <Link
                            to={`/category?category=${encodeURIComponent(
                              category.name
                            )}&src=${category._id}`}
                            className="block px-4 py-2 text-base font-medium text-gray-800 hover:text-gray-900"
                          >
                            {capitalizeFirstLetter(category.name)}
                          </Link>
                        </li>
                      ))}
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
            <div className="flex items-center space-x-6 h-16 relative">
              {isLoggedIn && (
                <div
                  className="relative h-full"
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  <button className="text-gray-600 hover:text-gray-800 h-full">
                    <FaRegUser className="w-6 h-6" />
                  </button>
                  {isDropdownOpen && (
                    <ul className="absolute top-full -left-4 w-56 bg-white border border-gray-200 rounded shadow-md z-10">
                      <ProfileMenu />
                    </ul>
                  )}
                </div>
              )}
              {!isLoggedIn && (
                <button
                  onClick={openLoginModal}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <FaRegUser className="w-6 h-6" />
                </button>
              )}
              <div className="relative">
                <Link to="/cart" className="text-gray-600 hover:text-gray-800">
                  <IoCartOutline className="w-6 h-6" />
                </Link>
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-5 font-bold bg-gray-800 text-white text-xs rounded-full px-2 py-1">
                    {cart.length}
                  </span>
                )}
              </div>
              <Link
                to={"/wishlist"}
                className="text-gray-600 hover:text-gray-800"
              >
                <FaRegHeart className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
      </header>
      {/* Login Modal */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg">
            <div className="flex justify-between">
              <h2 className="text-xl font-semibold ml-4">Login</h2>
              <button onClick={closeLoginModal} className="text-xl">
                <HiOutlineXMark />
              </button>
            </div>
            <AuthLogin
              setIsLoginModalOpen={setIsLoginModalOpen}
              setIsRegisterModalOpen={setIsRegisterModalOpen}
              setForgetPasswordModalOpen={setForgetPasswordModalOpen}
            />
          </div>
        </div>
      )}
      {isRegisterModelOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg">
            <div className="flex justify-between">
              <h2 className="text-xl font-semibold ml-4">Register</h2>
              <button onClick={closeReisterModal} className="text-xl">
                <HiOutlineXMark />
              </button>
            </div>

            <AuthRegister
              setIsLoginModalOpen={setIsLoginModalOpen}
              setIsRegisterModalOpen={setIsRegisterModalOpen}
            />
          </div>
        </div>
      )}
      {forgetPasswordModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg">
            <div className="flex justify-between">
              <h2 className="text-xl font-semibold ml-4">
                Forgot your password?
              </h2>
              <button onClick={closeForgetPasswordModal} className="text-xl">
                <HiOutlineXMark />
              </button>
            </div>

            <ForgetPassword
              setIsLoginModalOpen={setIsLoginModalOpen}
              setIsRegisterModalOpen={setIsRegisterModalOpen}
              setForgetPasswordModalOpen={setForgetPasswordModalOpen}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Headers;
