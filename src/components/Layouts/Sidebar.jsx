import React, { useState, useEffect } from "react";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight  } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { BsShop, BsClipboard2Data } from "react-icons/bs";
import { IoMdArrowDropdown, IoIosInformationCircleOutline} from "react-icons/io";
import { MdLogout } from "react-icons/md";
import { PiGearSix } from "react-icons/pi";
import { IoHomeOutline , IoBarChartOutline} from "react-icons/io5";
import { LuShapes, LuMessageSquareText, LuUsersRound } from "react-icons/lu";
import { LiaBullhornSolid } from "react-icons/lia";
import { AiOutlineBank } from "react-icons/ai";
const Sidebar = (isSidebarExpanded, setIsSidebarExpanded) => {
      const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
      const [isShopPopupOpen, setIsShopPopupOpen] = useState(false);
    
    
      useEffect(() => {
        localStorage.setItem("isSidebarExpanded", JSON.stringify(isSidebarExpanded));
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
  return (
    <>
        <div className="border-b border-gray-300">
  <button
    className="text-gray-800 px-4 p-4 w-full text-left focus:outline-none flex text-xl sm:text-xl lg:text-2xl"
    onClick={toggleShopName}
  >
    {isSidebarExpanded ? (
      <span className="flex mx-auto">
        <BsShop className="my-auto" />
        <span className="ml-2">Shop Name</span>
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
          <div className={`absolute top-16 left-0 bg-white text-black shadow-md rounded-lg ${isSidebarExpanded ? "w-full" : "max-w-xs sm:max-w-sm lg:max-w-md"}`}>    
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
                    <span>
                      Shop Manager
                    </span>
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => (window.location.href = "/marketplace")}
                  className="w-full text-left hover:bg-gray-200 text-gray-800 py-4 px-4 text-lg font-bold shadow focus:outline-none"
                >
                  <span className="flex items-center">
                    <span className="bg-green-800 p-2 rounded-full mr-2">
                      <BsShop className="text-white text-xl sm:text-2xl mx-auto" />
                    </span>
                    <span>
                      Marketplace
                    </span>
                  </span>
                </button>
              </li>
            </ul>
          </div>
        )}


        <nav className="flex-1 overflow-y-auto mt-12" id="nav">
          <ul>
            <li className="hover:bg-gray-300 px-4 py-3 flex items-center text-sm sm:text-base md:text-lg lg:text-xl">
              {isSidebarExpanded?(
              <>
                <IoHomeOutline className="mx-2" />
                <span>Dashboard</span>
              </>
              ):(
                <IoHomeOutline className="mx-auto" />
              )}
              
            </li>
            <li className="hover:bg-gray-300 px-4 py-3 flex items-center text-sm sm:text-base md:text-lg lg:text-xl">
              {isSidebarExpanded?(
                <>
                  <LuShapes className="mx-2" />
                  <span>Listing</span>
                </>
              ):(
                <LuShapes className="mx-auto" />
              )}
              
            </li>
            <li className="hover:bg-gray-300 px-4 py-3 flex items-center text-sm sm:text-base md:text-lg lg:text-xl">
              {isSidebarExpanded?(
                <>
                  <LuMessageSquareText className="mx-2" />
                  <span>Messages</span>                
                </>
              ):(
                <LuMessageSquareText className="mx-auto" />
              )}
            </li>
            <li className="hover:bg-gray-300 px-4 py-3 flex items-center text-sm sm:text-base md:text-lg lg:text-xl">
              {isSidebarExpanded ? (
                <>
                  <BsClipboard2Data className="mx-2" />
                  <span>Order & Delivery</span>
                </>
              ):(
                <BsClipboard2Data className="mx-auto" />
              )}
            </li>

            <div className="my-4 border-t border-gray-500"></div>

            <li className="hover:bg-gray-300 px-4 py-3 flex items-center text-sm sm:text-base md:text-lg lg:text-xl">
              {isSidebarExpanded ? (
                <>
                  <IoBarChartOutline className="mx-2" />
                  <span>Stats</span>
                </>
              ):(
                <IoBarChartOutline className="mx-auto" />
              )}
            </li>
            <li className="hover:bg-gray-300 px-4 py-3 flex items-center text-sm sm:text-base md:text-lg lg:text-xl">
              {isSidebarExpanded ? (
                <>
                  <LiaBullhornSolid className="mx-2" />
                  <span>Marketing</span>
                </>
              ):(
                <LiaBullhornSolid className="mx-auto" />
              )}
            </li>

            <div className="my-4 border-t border-gray-500"></div> {/* This creates a gap and a border */}

            <li className="hover:bg-gray-300 px-4 py-3 flex items-center text-sm sm:text-base md:text-lg lg:text-xl">
              {isSidebarExpanded ? (
                <>
                  <AiOutlineBank className="mx-2" />
                  <span>Finances</span>
                </>
              ):(
                <AiOutlineBank className="mx-auto" />
              )}
            </li>
            <li className="hover:bg-gray-300 px-4 py-3 flex items-center text-sm sm:text-base md:text-lg lg:text-xl">
              {isSidebarExpanded ? (
                <>
                  <LuUsersRound className="mx-2" />
                  <span>Help</span>
                </>
              ) : (
                <LuUsersRound className="mx-auto" />
              )}
              
            </li>
            <li className="hover:bg-gray-300 px-4 py-3 flex items-center text-sm sm:text-base md:text-lg lg:text-xl">
              {isSidebarExpanded ? (
                <>
                  <PiGearSix className="mx-2" />
                  <span>Settings</span>
                </>
              ) : (
                <PiGearSix className="mx-auto" />
              )}
            </li>
          </ul>
        </nav>



        <div className={`relative mt-auto ${isSidebarExpanded ? "flex" : "block"}  items-center justify-between border-t border-gray-300`}>
            <button
              className="flex items-center gap-2 p-6 text-gray-800 font-bold focus:outline-none w-full text-left"
              onClick={toggleProfilePopup}
            >
                        {isSidebarExpanded ? (
                          <>

              <FaRegUserCircle className="text-xl sm:text-2xl" />
              <span className="text-sm sm:text-base lg:text-lg">Your Name</span>
              </>
            ):(
              <FaRegUserCircle className="text-xl sm:text-2xl mx-auto" />
            )}

            </button>

          <button
            className={`text-gray-800 font-bold text-center focus:outline-none transition-all duration-300 p-6
              ${isSidebarExpanded ? "w-auto border-l border-gray-300" : "w-full border-t border-gray-300"} 
              text-xl sm:text-2xl lg:text-3xl`}
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

    </>
  )
}

export default Sidebar