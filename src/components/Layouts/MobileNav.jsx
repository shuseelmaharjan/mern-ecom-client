import React, { useState } from "react";
import { MdClose, MdLogout } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { BsShop, BsClipboard2Data } from "react-icons/bs";
import { IoMdArrowDropdown, IoIosInformationCircleOutline } from "react-icons/io";
import { IoHomeOutline, IoBarChartOutline } from "react-icons/io5";
import { LuShapes, LuMessageSquareText, LuUsersRound } from "react-icons/lu";
import { LiaBullhornSolid } from "react-icons/lia";
import { AiOutlineBank } from "react-icons/ai";
import { NavLink } from "react-router-dom"; 
import { PiGearSix } from "react-icons/pi";
import { useLocation } from "react-router-dom";


const MobileNav = ({ toggleMobileNav }) => {
  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
  const [isShopPopupOpen, setIsShopPopupOpen] = useState(false);
  const location = useLocation();

  const toggleProfilePopup = () => {
    setIsProfilePopupOpen(!isProfilePopupOpen);
  };

  const toggleShopName = () => {
    setIsShopPopupOpen(!isShopPopupOpen);
  };

  const handleNavLinkClick = () => {
    toggleMobileNav(); 
  };

  const isActive = (path) => {
    return location.pathname.includes(path);
  };


  return (
    <>
      <div
        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10"
        onClick={toggleMobileNav}
      ></div>
      <div
        className="fixed top-0 left-0 bg-gray-100 w-64 h-full z-20 shadow-lg transition-transform transform translate-x-0 md:-translate-x-full duration-500"
      >
        <div className="border-b border-gray-300">
          <button
            className="text-gray-800 px-4 p-4 w-full text-left focus:outline-none flex text-xl sm:text-xl lg:text-2xl"
            onClick={toggleShopName}
          >
            <span className="flex mx-auto">
              <BsShop className="my-auto" />
              <span className="ml-2">Shop Name</span>
              <IoMdArrowDropdown className="my-auto" />
            </span>
          </button>
        </div>
        <button
          className="absolute top-4 right-4 text-gray-800 text-2xl"
          onClick={toggleMobileNav}
        >
          <MdClose />
        </button>
        <nav className="flex-1 overflow-y-auto mt-12" id="nav">
          <ul>
            <li>
              <NavLink
                to="/dashboard"
                className={`hover:bg-gray-300 px-4 py-3 flex items-center text-sm sm:text-base md:text-lg lg:text-xl ${isActive("/dashboard") ? 'bg-gray-300' : ''}`}
                activeClassName="bg-gray-300"
                onClick={handleNavLinkClick}
              >
                <IoHomeOutline className="mx-2" />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/listing"
                className={`hover:bg-gray-300 px-4 py-3 flex items-center text-sm sm:text-base md:text-lg lg:text-xl ${isActive("/listing") ? 'bg-gray-300' : ''}`}
                activeClassName="bg-gray-300"
                onClick={handleNavLinkClick}
              >
                <LuShapes className="mx-2" />
                <span>Listing</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/messages"
                className={`hover:bg-gray-300 px-4 py-3 flex items-center text-sm sm:text-base md:text-lg lg:text-xl ${isActive("/messages") ? 'bg-gray-300' : ''}`}
                activeClassName="bg-gray-300"
                onClick={handleNavLinkClick}
              >
                <LuMessageSquareText className="mx-2" />
                <span>Messages</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/order-and-delivery"
                className={`hover:bg-gray-300 px-4 py-3 flex items-center text-sm sm:text-base md:text-lg lg:text-xl ${isActive("/order-and-delivery") ? 'bg-gray-300' : ''}`}
                activeClassName="bg-gray-300"
                onClick={handleNavLinkClick}
              >
                <BsClipboard2Data className="mx-2" />
                <span>Order & Delivery</span>
              </NavLink>
            </li>

            <div className="my-4 border-t border-gray-500"></div>

            <li>
              <NavLink
                to="/statistics"
                className={`hover:bg-gray-300 px-4 py-3 flex items-center text-sm sm:text-base md:text-lg lg:text-xl ${isActive("/statistics") ? 'bg-gray-300' : ''}`}
                activeClassName="bg-gray-300"
                onClick={handleNavLinkClick}
              >
                <IoBarChartOutline className="mx-2" />
                <span>Stats</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/marketing"
                className={`hover:bg-gray-300 px-4 py-3 flex items-center text-sm sm:text-base md:text-lg lg:text-xl ${isActive("/marketing") ? 'bg-gray-300' : ''}`}
                activeClassName="bg-gray-300"
                onClick={handleNavLinkClick}
              >
                <LiaBullhornSolid className="mx-2" />
                <span>Marketing</span>
              </NavLink>
            </li>

            <div className="my-4 border-t border-gray-500"></div>

            <li>
              <NavLink
                to="/finances"
                className={`hover:bg-gray-300 px-4 py-3 flex items-center text-sm sm:text-base md:text-lg lg:text-xl ${isActive("/finances") ? 'bg-gray-300' : ''}`}
                activeClassName="bg-gray-300"
                onClick={handleNavLinkClick}
              >
                <AiOutlineBank className="mx-2" />
                <span>Finances</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/help"
                className={`hover:bg-gray-300 px-4 py-3 flex items-center text-sm sm:text-base md:text-lg lg:text-xl ${isActive("/help") ? 'bg-gray-300' : ''}`}
                activeClassName="bg-gray-300"
                onClick={handleNavLinkClick}
              >
                <LuUsersRound className="mx-2" />
                <span>Help</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/settings"
                className={`hover:bg-gray-300 px-4 py-3 flex items-center text-sm sm:text-base md:text-lg lg:text-xl ${isActive("/settings") ? 'bg-gray-300' : ''}`}
                activeClassName="bg-gray-300"
                onClick={handleNavLinkClick}
              >
                <PiGearSix className="mx-2" />
                <span>Settings</span>
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="fixed bottom-0 w-full mt-auto items-center justify-between border-t border-gray-300">
          <button
            className="flex items-center gap-2 p-6 text-gray-800 font-bold focus:outline-none w-full text-left"
            onClick={toggleProfilePopup}
          >
            <FaRegUserCircle className="text-xl sm:text-2xl" />
            <span className="text-sm sm:text-base lg:text-lg">Your Name</span>
          </button>

          {isProfilePopupOpen && (
            <div className="absolute left-4 bottom-full bg-white text-black shadow-lg rounded-lg w-64">
              <ul className="space-y-2 text-sm sm:text-base lg:text-lg">
                <li className="flex items-center hover:bg-gray-300 px-4 py-2 cursor-pointer">
                  <IoIosInformationCircleOutline className="mx-2" />
                  <span>Your Information</span>
                </li>
                <li className="flex items-center hover:bg-gray-300 px-4 py-2 cursor-pointer">
                  <FaRegUserCircle className="mx-2" />
                  <span>Your Profile</span>
                </li>
                <li className="flex items-center hover:bg-gray-300 px-4 py-2 cursor-pointer text-red-500">
                  <MdLogout className="mx-2" />
                  <span>Logout</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MobileNav;
