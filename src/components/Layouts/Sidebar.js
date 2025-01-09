import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { VendorNavbar } from "./VendorNavbar";
import { AdminNavbar } from "./AdminNavbar";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../context/AuthContext";

const Sidebar = ({ isSidebarExpanded }) => {
  const location = useLocation();
  const [role, setRole] = useState("");

  useEffect(() => {
    localStorage.setItem("_bar", JSON.stringify(isSidebarExpanded));
  }, [isSidebarExpanded]);

  const isActive = (path) => {
    return location.pathname.includes(path);
  };

  const { accessToken } = useAuth();

  useEffect(() => {
    const dToken = jwtDecode(accessToken);
    setRole(dToken.UserInfo.role);
  }, [accessToken]);

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Navbar for Roles */}
      {role === "vendor" && (
        <VendorNavbar
          isSidebarExpanded={isSidebarExpanded}
          isActive={isActive}
        />
      )}
      {role === "admin" && (
        <AdminNavbar
          isSidebarExpanded={isSidebarExpanded}
          isActive={isActive}
        />
      )}

      {/* Profile Popup */}
      {/* {isProfilePopupOpen && (
        <div className="absolute left-4 bottom-full bg-white text-black shadow-lg rounded-lg w-64">
          <ul className="space-y-2 text-sm">
            <li className="flex items-center hover:bg-gray-300 px-4 py-3 cursor-pointer">
              <IoIosInformationCircleOutline className="mx-2" />
              <span>Your Information</span>
            </li>
            <li className="flex items-center hover:bg-gray-300 px-4 py-3 cursor-pointer text-red-500">
              <button
                className="flex items-center w-full"
                onClick={() => setShowLogoutModal(true)}
              >
                <MdLogout className="mr-2" />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      )} */}

      {/* Logout Modal */}
      {/* <Logout
        showLogoutModal={showLogoutModal}
        setShowLogoutModal={setShowLogoutModal}
      /> */}
    </div>
  );
};

export default Sidebar;
