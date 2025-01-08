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
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { capitalizeFirstLetter, lowercaseAll } from "../../utils/textUtils";

const ProfileMenu = () => {
  const { role } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const siteDetails = JSON.parse(sessionStorage.getItem("siteDetails"));
    if (siteDetails) {
      setCompanyName(siteDetails.title);
    }
  }, []);

  useEffect(() => {
    const token = Cookies.get("_r");

    if (token) {
      const decodedToken = jwtDecode(token);
      setName(decodedToken.name);
      setEmail(decodedToken.email);
    }
  }, []);
  return (
    <>
      <li className="group px-4 py-2 bg-gray-100 flex flex-col items-start">
        <span className="text-sm font-medium text-gray-800">
          {capitalizeFirstLetter(name) || "Full Name"}
        </span>
        <span className="text-sm text-gray-600">
          {lowercaseAll(email) || "email@example.com"}
        </span>
      </li>
      <hr className="border-t border-gray-200 my-2" />

      {role === "admin" && (
        <li className="group">
          <Link
            to="/dashboard"
            className="flex items-center px-4 py-2 hover:bg-gray-100"
          >
            <FaUser className="mr-2 text-gray-500 group-hover:text-gray-700" />
            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
              Dashboard
            </span>
          </Link>
        </li>
      )}

      {role === "vendor" && (
        <li className="group">
          <Link
            to="/dashboard"
            className="flex items-center px-4 py-2 hover:bg-gray-100"
          >
            <FaUser className="mr-2 text-gray-500 group-hover:text-gray-700" />
            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
              My Shop
            </span>
          </Link>
        </li>
      )}

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
          to="/myorders"
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
        <Link
          to="/chat"
          className="flex items-center px-4 py-2 hover:bg-gray-100"
        >
          <LuMessageSquareMore className="mr-2 text-gray-500 group-hover:text-gray-700" />
          <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
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
            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
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
          <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
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
          <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
            Logout
          </span>
        </button>
      </li>

      <Logout
        showLogoutModal={showLogoutModal}
        setShowLogoutModal={setShowLogoutModal}
      />
    </>
  );
};

export default ProfileMenu;
