import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
  MdLogout,
} from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { BsShop, BsClipboard2Data } from "react-icons/bs";
import {
  IoMdArrowDropdown,
  IoIosInformationCircleOutline,
} from "react-icons/io";
import { PiGearSix } from "react-icons/pi";
import { IoHomeOutline, IoBarChartOutline } from "react-icons/io5";
import { LuShapes, LuMessageSquareText, LuUsersRound } from "react-icons/lu";
import { LiaBullhornSolid } from "react-icons/lia";
import { AiOutlineBank } from "react-icons/ai";
import Logout from "../../pages/Auth/Logout";

import { useAuth } from "../../context/AuthContext";
import authService from "../../services/authService/authService";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const Sidebar = ({ isSidebarExpanded, setIsSidebarExpanded }) => {
  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
  const [isShopPopupOpen, setIsShopPopupOpen] = useState(false);
  const location = useLocation();
  const [shopName, setShopName] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    localStorage.setItem("_bar", JSON.stringify(isSidebarExpanded));
  }, [isSidebarExpanded]);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  const toggleProfilePopup = () => {
    setIsProfilePopupOpen(!isProfilePopupOpen);
  };

  const toggleShopName = () => {
    setIsShopPopupOpen(!isShopPopupOpen);
  };

  const isActive = (path) => {
    return location.pathname.includes(path);
  };

  const { showLogoutModal, setShowLogoutModal, accessToken } = useAuth();

  useEffect(() => {
    const fetchShopName = async () => {
      try {
        const response = await authService.shopInfo(accessToken);
        setShopName(response.shop.shopName);
      } catch (error) {
        console.error("Failed to fetch shop name:", error);
        setShopName("Error fetching shop name");
      }
    };

    fetchShopName();
  }, [accessToken]);

  useEffect(() => {
    const token = Cookies.get("_r");
    console.log(jwtDecode(token));

    if (token) {
      const decodedToken = jwtDecode(token);
      setName(decodedToken.name);
    }
  }, []);

  return (
    <div className="flex flex-col h-full border-r border-gray-300">
      {/* Shop Name Section */}
      <div>
        <button
          className="text-gray-800 px-4 py-4 w-full text-left focus:outline-none flex text-xl sm:text-xl lg:text-2xl"
          onClick={toggleShopName}
        >
          {isSidebarExpanded ? (
            <span className="flex mx-auto">
              <BsShop className="my-auto" />
              <span className="ml-2">{shopName}</span>
              <IoMdArrowDropdown className="my-auto" />
            </span>
          ) : (
            <div className="bg-gray-800 p-2 rounded-full mx-auto">
              <BsShop className="text-white text-xl sm:text-2xl mx-auto" />
            </div>
          )}
        </button>
      </div>
      {isShopPopupOpen && (
        <div
          className={`absolute top-16 left-0 bg-white text-black shadow-md rounded-lg ${
            isSidebarExpanded ? "w-full" : "max-w-xs"
          }`}
        >
          <ul>
            <li>
              <button
                onClick={() => (window.location.href = "/dashboard")}
                className="w-full text-left hover:bg-gray-200 text-gray-800 py-4 font-bold text-lg px-4 shadow focus:outline-none"
              >
                <span className="flex items-center">
                  <span className="bg-gray-800 p-2 rounded-full mr-2">
                    <BsShop className="text-white text-xl sm:text-2xl mx-auto" />
                  </span>
                  <span>Shop Manager</span>
                </span>
              </button>
            </li>
            <li>
              <button
                onClick={() => (window.location.href = "/")}
                className="w-full text-left hover:bg-gray-200 text-gray-800 py-4 px-4 text-lg font-bold shadow focus:outline-none"
              >
                <span className="flex items-center">
                  <span className="bg-green-800 p-2 rounded-full mr-2">
                    <BsShop className="text-white text-xl sm:text-2xl mx-auto" />
                  </span>
                  <span>Marketplace</span>
                </span>
              </button>
            </li>
          </ul>
        </div>
      )}

      {/* Navigation Section */}
      <nav className="flex-1 overflow-y-auto mt-12" id="nav">
        <ul>
          <Link to="/dashboard">
            <li
              className={`hover:bg-gray-800 hover:text-gray-100 px-4 py-3 flex items-center text-lg ${
                isActive("/dashboard") ? "bg-gray-800 text-gray-100" : ""
              }`}
            >
              <IoHomeOutline
                className={`${isSidebarExpanded ? "" : "mx-auto"}`}
              />
              {isSidebarExpanded && <span className="mx-2">Dashboard</span>}
            </li>
          </Link>
          <Link to="/listing">
            <li
              className={`hover:bg-gray-800 hover:text-gray-100 px-4 py-3 flex items-center text-lg ${
                isActive("/listing") ? "bg-gray-800 text-gray-100" : ""
              }`}
            >
              <LuShapes className={`${isSidebarExpanded ? "" : "mx-auto"}`} />
              {isSidebarExpanded && <span className="mx-2">Listing</span>}
            </li>
          </Link>
          <Link to="/messages">
            <li
              className={`hover:bg-gray-800 hover:text-gray-100 px-4 py-3 flex items-center text-lg ${
                isActive("/messages") ? "bg-gray-800 text-gray-100" : ""
              }`}
            >
              <LuMessageSquareText
                className={`${isSidebarExpanded ? "" : "mx-auto"}`}
              />
              {isSidebarExpanded && <span className="mx-2">Messages</span>}
            </li>
          </Link>
          <Link to="/order-and-delivery">
            <li
              className={`hover:bg-gray-800 hover:text-gray-100 px-4 py-3 flex items-center text-lg ${
                isActive("/order-and-delivery")
                  ? "bg-gray-800 text-gray-100"
                  : ""
              }`}
            >
              <BsClipboard2Data
                className={`${isSidebarExpanded ? "" : "mx-auto"}`}
              />
              {isSidebarExpanded && (
                <span className="mx-2">Order & Delivery</span>
              )}
            </li>
          </Link>
          <div className="my-4 border-t border-gray-500"></div>
          <Link to="/statistics">
            <li
              className={`hover:bg-gray-800 hover:text-gray-100 px-4 py-3 flex items-center text-lg ${
                isActive("/statistics") ? "bg-gray-800 text-gray-100" : ""
              }`}
            >
              <IoBarChartOutline
                className={`${isSidebarExpanded ? "" : "mx-auto"}`}
              />
              {isSidebarExpanded && <span className="mx-2">Stats</span>}
            </li>
          </Link>
          <Link to="/marketing">
            <li
              className={`hover:bg-gray-800 hover:text-gray-100 px-4 py-3 flex items-center text-lg ${
                isActive("/marketing") ? "bg-gray-800 text-gray-100" : ""
              }`}
            >
              <LiaBullhornSolid
                className={`${isSidebarExpanded ? "" : "mx-auto"}`}
              />
              {isSidebarExpanded && <span className="mx-2">Marketing</span>}
            </li>
          </Link>
          <div className="my-4 border-t border-gray-500"></div>
          <Link to="/finances">
            <li
              className={`hover:bg-gray-800 hover:text-gray-100 px-4 py-3 flex items-center text-lg ${
                isActive("/finances") ? "bg-gray-800 text-gray-100" : ""
              }`}
            >
              <AiOutlineBank
                className={`${isSidebarExpanded ? "" : "mx-auto"}`}
              />
              {isSidebarExpanded && <span className="mx-2">Finances</span>}
            </li>
          </Link>
          <Link to="/help">
            <li
              className={`hover:bg-gray-800 hover:text-gray-100 px-4 py-3 flex items-center text-lg ${
                isActive("/help") ? "bg-gray-800 text-gray-100" : ""
              }`}
            >
              <LuUsersRound
                className={`${isSidebarExpanded ? "" : "mx-auto"}`}
              />
              {isSidebarExpanded && <span className="mx-2">Help</span>}
            </li>
          </Link>
          <Link to="/settings">
            <li
              className={`hover:bg-gray-800 hover:text-gray-100 px-4 py-3 flex items-center text-lg ${
                isActive("/settings") ? "bg-gray-800 text-gray-100" : ""
              }`}
            >
              <PiGearSix className={`${isSidebarExpanded ? "" : "mx-auto"}`} />
              {isSidebarExpanded && <span className="mx-2">Settings</span>}
            </li>
          </Link>
        </ul>
      </nav>

      {/* Footer Section */}
      <div
        className={`relative mt-auto ${
          isSidebarExpanded ? "flex" : "block"
        } items-center justify-between border-t border-gray-300`}
      >
        <button
          className="flex items-center gap-2 p-6 text-gray-800 font-bold focus:outline-none w-full text-left"
          onClick={toggleProfilePopup}
        >
          {isSidebarExpanded ? (
            <>
              <FaRegUserCircle className="text-xl sm:text-2xl" />
              <span className="text-sm sm:text-base lg:text-lg">{name}</span>
            </>
          ) : (
            <FaRegUserCircle className="text-xl sm:text-2xl mx-auto" />
          )}
        </button>
        <button
          className={`text-gray-800 font-bold text-center focus:outline-none transition-all duration-300 p-6 ${
            isSidebarExpanded
              ? "w-auto border-l border-gray-300"
              : "w-full border-t border-gray-300"
          } text-xl sm:text-2xl lg:text-3xl`}
          onClick={toggleSidebar}
        >
          {isSidebarExpanded ? (
            <MdKeyboardDoubleArrowLeft />
          ) : (
            <MdKeyboardDoubleArrowRight className="mx-auto" />
          )}
        </button>
        {isProfilePopupOpen && (
          <div className="absolute left-4 bottom-full bg-white text-black shadow-lg rounded-lg w-64">
            <ul className="space-y-2 text-sm">
              <li className="flex items-center hover:bg-gray-300 px-4 py-3 cursor-pointer">
                <IoIosInformationCircleOutline className="mx-2" />
                <span>Your Information</span>
              </li>
              <li className="flex items-center hover:bg-gray-300 px-4 py-3 cursor-pointer text-red-500">
                <button
                  className="flex items-center px-4 py-3 w-full"
                  onClick={() => setShowLogoutModal(true)}
                >
                  <MdLogout className="mr-2 text-gray-500 group-hover:text-gray-700" />
                  <span className="text-base font-medium text-gray-700 group-hover:text-gray-900">
                    Logout
                  </span>
                </button>
              </li>
            </ul>
          </div>
        )}
        <Logout
          showLogoutModal={showLogoutModal}
          setShowLogoutModal={setShowLogoutModal}
        />
      </div>
    </div>
  );
};

export default Sidebar;
