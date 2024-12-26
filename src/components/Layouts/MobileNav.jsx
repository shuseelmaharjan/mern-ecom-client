import React, { useState } from "react";
import { MdClose  } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { BsShop, BsClipboard2Data } from "react-icons/bs";
import { IoMdArrowDropdown, IoIosInformationCircleOutline} from "react-icons/io";
import { MdLogout } from "react-icons/md";
import { PiGearSix } from "react-icons/pi";
import { IoHomeOutline , IoBarChartOutline} from "react-icons/io5";
import { LuShapes, LuMessageSquareText, LuUsersRound } from "react-icons/lu";
import { LiaBullhornSolid } from "react-icons/lia";
import { AiOutlineBank } from "react-icons/ai";

const MobileNav = ({toggleMobileNav}) => {
    const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
    const [isShopPopupOpen, setIsShopPopupOpen] = useState(false);

    const toggleProfilePopup = () => {
        setIsProfilePopupOpen(!isProfilePopupOpen);
      };
    
      const toggleShopName = () => {
        setIsShopPopupOpen(!isShopPopupOpen);
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
            <li className="hover:bg-gray-300 px-4 py-3 flex items-center text-sm sm:text-base md:text-lg lg:text-xl">
              
                <IoHomeOutline className="mx-2" />
                <span>Dashboard</span>
            </li>
            <li className="hover:bg-gray-300 px-4 py-3 flex items-center text-sm sm:text-base md:text-lg lg:text-xl">

                  <LuShapes className="mx-2" />
                  <span>Listing</span>
            </li>
            <li className="hover:bg-gray-300 px-4 py-3 flex items-center text-sm sm:text-base md:text-lg lg:text-xl">
                  <LuMessageSquareText className="mx-2" />
                  <span>Messages</span>                
            </li>
            <li className="hover:bg-gray-300 px-4 py-3 flex items-center text-sm sm:text-base md:text-lg lg:text-xl">
                  <BsClipboard2Data className="mx-2" />
                  <span>Order & Delivery</span>
            </li>

            <div className="my-4 border-t border-gray-500"></div>

            <li className="hover:bg-gray-300 px-4 py-3 flex items-center text-sm sm:text-base md:text-lg lg:text-xl">
                  <IoBarChartOutline className="mx-2" />
                  <span>Stats</span>
            </li>
            <li className="hover:bg-gray-300 px-4 py-3 flex items-center text-sm sm:text-base md:text-lg lg:text-xl">
                  <LiaBullhornSolid className="mx-2" />
                  <span>Marketing</span>
            </li>

            <div className="my-4 border-t border-gray-500"></div> {/* This creates a gap and a border */}

            <li className="hover:bg-gray-300 px-4 py-3 flex items-center text-sm sm:text-base md:text-lg lg:text-xl">
                  <AiOutlineBank className="mx-2" />
                  <span>Finances</span>
            </li>
            <li className="hover:bg-gray-300 px-4 py-3 flex items-center text-sm sm:text-base md:text-lg lg:text-xl">
                  <LuUsersRound className="mx-2" />
                  <span>Help</span>
            </li>
            <li className="hover:bg-gray-300 px-4 py-3 flex items-center text-sm sm:text-base md:text-lg lg:text-xl">
                  <PiGearSix className="mx-2" />
                  <span>Settings</span>
            </li>
          </ul>
        </nav>
        <div className={`fixed bottom-0 w-full mt-auto items-center justify-between border-t border-gray-300`}>
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
                  <IoIosInformationCircleOutline className="mx-2"/>
                  <span>Your Information</span>
                </li>
                <li className="flex items-center hover:bg-gray-300 px-4 py-2 cursor-pointer">              
                  <FaRegUserCircle className="mx-2"/>
                  <span>Your Profile</span>
                </li>
                <li className="flex items-center hover:bg-gray-300 px-4 py-2 cursor-pointer text-red-500">
                <MdLogout className="mx-2"/>
                <span>Logout</span>
                </li>
              </ul>
            </div>
          )}
        </div>
    </div>
    </>
  )
}

export default MobileNav