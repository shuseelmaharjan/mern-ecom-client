import React, { useState, useEffect } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { LuMessageSquareMore } from "react-icons/lu";
import { FaBox } from "react-icons/fa6";
import { LiaGiftSolid } from "react-icons/lia";
import { MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FaRegHeart, FaUser } from "react-icons/fa";
import Logout from "../../pages/Auth/Logout";

const ProfileMenu = () => {
  const { role } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [companyName, setCompanyName] = useState("");

  useEffect(() => {
    const siteDetails = JSON.parse(sessionStorage.getItem("siteDetails"));
    if (siteDetails) {
      setCompanyName(siteDetails.title);
    }
  }, []);

  return (
    <>
      <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg border rounded-md z-100">
        <ul className="divide-y divide-gray-200">
          {role === "admin" && (
            <>
              <li className="group">
                <Link
                  to="/dashboard"
                  className="flex items-center px-4 py-2 hover:bg-gray-100"
                >
                  <FaUser className="mr-2 text-gray-500 group-hover:text-gray-700" />
                  <span className="text-base font-medium text-gray-700 group-hover:text-gray-900">
                    Dashboard
                  </span>
                </Link>
              </li>
            </>
          )}
          {role === "vendor" && (
            <>
              <li className="group">
                <Link
                  to="/dashboard"
                  className="flex items-center px-4 py-2 hover:bg-gray-100"
                >
                  <FaUser className="mr-2 text-gray-500 group-hover:text-gray-700" />
                  <span className="text-base font-medium text-gray-700 group-hover:text-gray-900">
                    My Shop
                  </span>
                </Link>
              </li>
            </>
          )}

          <li className="group">
            <Link
              to="/profile"
              className="flex items-center px-4 py-2 hover:bg-gray-100"
            >
              <FaUser className="mr-2 text-gray-500 group-hover:text-gray-700" />
              <span className="text-base font-medium text-gray-700 group-hover:text-gray-900">
                My Profile
              </span>
            </Link>
          </li>
          <li className="group">
            <Link
              to="/myorders"
              className="flex items-center px-4 py-2 hover:bg-gray-100"
            >
              <FaBox className="mr-2 text-gray-500 group-hover:text-gray-700" />
              <span className="text-base font-medium text-gray-700 group-hover:text-gray-900">
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
              <span className="text-base font-medium text-gray-700 group-hover:text-gray-900">
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
              <span className="text-base font-medium text-gray-700 group-hover:text-gray-900">
                Rewards
              </span>
            </Link>
          </li>
          <li className="group">
            <Link
              to="/chat"
              className="flex items-center px-4 py-2 hover:bg-gray-100"
            >
              <LuMessageSquareMore className="mr-2 text-gray-500 group-hover:text-gray-700" />
              <span className="text-base font-medium text-gray-700 group-hover:text-gray-900">
                Messages
              </span>
            </Link>
          </li>
          {role === "user" && (
            <li className="group">
              <Link
                to="/be-a-member"
                className="flex items-center px-4 py-2 hover:bg-gray-100"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LuMessageSquareMore className="mr-2 text-gray-500 group-hover:text-gray-700" />
                <span className="text-base font-medium text-gray-700 group-hover:text-gray-900">
                  {companyName ? `Sell on ${companyName}` : "Loading..."}
                </span>
              </Link>
            </li>
          )}

          <li className="group">
            <Link
              to="/account-settings"
              className="flex items-center px-4 py-2 hover:bg-gray-100"
            >
              <IoSettingsOutline className="mr-2 text-gray-500 group-hover:text-gray-700" />
              <span className="text-base font-medium text-gray-700 group-hover:text-gray-900">
                Account Settings
              </span>
            </Link>
          </li>
          <li className="group">
            <button
              className="flex items-center px-4 py-2 hover:bg-gray-100 w-full"
              onClick={() => setShowLogoutModal(true)}
            >
              <MdLogout className="mr-2 text-gray-500 group-hover:text-gray-700" />
              <span className="text-base font-medium text-gray-700 group-hover:text-gray-900">
                Logout
              </span>
            </button>
          </li>
          <Logout
            showLogoutModal={showLogoutModal}
            setShowLogoutModal={setShowLogoutModal}
          />
        </ul>
      </div>
    </>
  );
};

export default ProfileMenu;
