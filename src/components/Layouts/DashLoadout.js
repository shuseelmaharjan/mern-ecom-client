import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";
import { MdMenu } from "react-icons/md";
import { useAuth } from "../../context/AuthContext";
import PageNotFound from "../../pages/PageNotFound/PageNotFound";
import PathName from "./PathName";
import { capitalizeWords } from "../../utils/textUtils";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { FaUser } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";
import { IoMdNotifications } from "react-icons/io";

const DashLoadout = ({ children }) => {
  const { role } = useAuth();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [name, setName] = useState("");
  const [isProfileOptions, setProfileOptions] = useState(false);
  const [notificationBox, setNotificationBox] = useState(false);

  useEffect(() => {
    localStorage.setItem("_bar", JSON.stringify(isSidebarExpanded));
  }, [isSidebarExpanded]);

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarExpanded((prevState) => !prevState);
  };

  useEffect(() => {
    const getName = () => {
      const nameToken = Cookies.get("_r");
      const decodeToken = jwtDecode(nameToken);
      setName(decodeToken.name);
    };
    getName();
  }, []);

  const notifications = [
    {
      id: 1,
      message: "Your order #1234 has been shipped.",
      time: "2 hours ago",
    },
    {
      id: 2,
      message: "Flash sale is live now. Check it out!",
      time: "5 hours ago",
    },
    {
      id: 3,
      message: "New discounts on electronics just for you.",
      time: "1 day ago",
    },
  ];

  const toggleNotifications = () => {
    setNotificationBox((prev) => !prev);
  };

  const toggleProfileOptions = () => {
    setProfileOptions((prev) => !prev);
  };

  if (role === "admin" || role === "vendor" || role === "staff") {
    return (
      <div className="flex h-screen">
        {/* Sidebar */}
        <aside
          className={`fixed top-0 left-0 text-white border-gray-100 border-r transition-width duration-300 flex flex-col h-full py-12 ${
            isSidebarExpanded ? "w-72" : "w-20"
          } hidden md:block bg-gray-900`}
        >
          <Sidebar
            isSidebarExpanded={isSidebarExpanded}
            setIsSidebarExpanded={setIsSidebarExpanded}
          />
        </aside>

        {/* Mobile Navigation */}
        {isMobileNavOpen && <MobileNav toggleMobileNav={toggleMobileNav} />}

        {/* Main Content */}
        <div
          className={`flex-1 flex flex-col transition-all duration-300 ${
            isSidebarExpanded ? "md:ml-72" : "md:ml-20"
          }`}
        >
          {/* Header */}
          <header className="fixed top-0 left-0 w-full z-20 bg-white text-gray-800 shadow-md flex items-center justify-between h-20 px-6">
            <button
              className="text-2xl md:hidden focus:outline-none"
              onClick={toggleMobileNav}
            >
              <MdMenu />
            </button>
            <div className="flex-1 flex items-center">
              <div
                className={`${
                  isSidebarExpanded ? "w-64" : "w-20"
                } transition-all duration-300 ease-in-out`}
              >
                {isSidebarExpanded ? "Shop Name" : "Shop"}
              </div>
              <div className="flex-1 flex justify-between items-center">
                <div
                  className={`flex items-center transition-all duration-300 ease-in-out ${
                    isSidebarExpanded ? "ml-6" : "ml-2"
                  }`}
                >
                  <button
                    className="text-2xl md:block focus:outline-none"
                    onClick={toggleSidebar}
                  >
                    <MdMenu />
                  </button>
                  <h1 className="text-xl font-semibold ml-6">
                    {capitalizeWords(PathName())}
                  </h1>
                </div>
                <div className="flex items-center gap-4 mr-2">
                  <span
                    className="relative text-gray-800 hover:bg-gray-200 p-4 rounded-full"
                    onClick={toggleNotifications}
                  >
                    <IoMdNotifications className="text-2xl" />
                    {notificationBox && (
                      <div className="absolute top-full right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                        <div className="p-4 border-b border-gray-200">
                          <h3 className="text-lg font-medium text-gray-800">
                            Notifications
                          </h3>
                        </div>
                        <ul className="max-h-60 overflow-y-auto">
                          {notifications.length > 0 ? (
                            notifications.map((notification) => (
                              <li
                                key={notification.id}
                                className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
                              >
                                <p className="text-sm text-gray-700">
                                  {notification.message}
                                </p>
                                <span className="text-xs text-gray-500">
                                  {notification.time}
                                </span>
                              </li>
                            ))
                          ) : (
                            <li className="px-4 py-3 text-sm text-gray-500">
                              No new notifications
                            </li>
                          )}
                        </ul>
                        <div className="p-4 text-center border-t border-gray-200">
                          <button className="text-sm font-medium text-blue-500 hover:underline">
                            View All
                          </button>
                        </div>
                      </div>
                    )}
                  </span>
                  <span
                    className="relative text-lg font-medium h-full text-gray-700 cursor-pointer select-none"
                    onClick={toggleProfileOptions}
                  >
                    {name}
                    {isProfileOptions && (
                      <ul className="absolute top-full -left-2 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-10 text-sm">
                        <li className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex items-center gap-2">
                          <FaUser className="text-gray-500" />
                          <span>Profile</span>
                        </li>
                        <li className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex items-center gap-2">
                          <IoSettingsSharp className="text-gray-500" />
                          <span>Settings</span>
                        </li>
                        <li className="border-t border-gray-200">
                          <span className="flex items-center gap-2 px-4 py-3 hover:bg-red-100 text-red-600 font-semibold cursor-pointer">
                            <IoLogOut />
                            Logout
                          </span>
                        </li>
                      </ul>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </header>

          {/* Content Area */}
          <div className="flex-1 mt-20 p-6 bg-white overflow-auto">
            {children}
          </div>
        </div>
      </div>
    );
  } else {
    return <PageNotFound />;
  }
};

export default DashLoadout;
