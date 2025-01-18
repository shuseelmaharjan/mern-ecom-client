import React, { useState, useEffect } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { LuMessageSquareMore } from "react-icons/lu";
import { FaBox, FaRegHeart, FaUser } from "react-icons/fa";
import { LiaGiftSolid } from "react-icons/lia";
import { MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";
import Logout from "../../pages/Auth/Logout";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { capitalizeFirstLetter, lowercaseAll } from "../../utils/textUtils";

const ProfileMenu = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

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
      setRole(decodedToken.role);
    }
  }, []);
  const menuItems = [
    {
      to: "/dashboard",
      icon: <FaUser />,
      label: role === "vendor" ? "My Shop" : "Dashboard",
      roles: ["admin", "hr", "vendor", "staff", "mm"],
    },
    { to: "/profile", icon: <FaUser />, label: "My Profile" },
    { to: "/myorders", icon: <FaBox />, label: "Orders" },
    { to: "/wishlist", icon: <FaRegHeart />, label: "Wishlist" },
    { to: "/rewards", icon: <LiaGiftSolid />, label: "Rewards" },
    { to: "/chat", icon: <LuMessageSquareMore />, label: "Messages" },
    {
      to: "/be-a-member",
      icon: <LuMessageSquareMore />,
      label: companyName ? `Sell on ${companyName}` : "Loading...",
      roles: ["user"],
      external: true,
    },
    {
      to: "/account-settings",
      icon: <IoSettingsOutline />,
      label: "Account Settings",
    },
  ];

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

      {menuItems.map(
        ({ to, icon, label, roles, external }) =>
          (!roles || roles.includes(role)) && (
            <li key={to} className="group">
              {external ? (
                <a
                  href={to}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 hover:bg-gray-100"
                >
                  {React.cloneElement(icon, {
                    className: "mr-2 text-gray-500 group-hover:text-gray-700",
                  })}
                  <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                    {label}
                  </span>
                </a>
              ) : (
                <Link
                  to={to}
                  className="flex items-center px-4 py-2 hover:bg-gray-100"
                >
                  {React.cloneElement(icon, {
                    className: "mr-2 text-gray-500 group-hover:text-gray-700",
                  })}
                  <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                    {label}
                  </span>
                </Link>
              )}
            </li>
          )
      )}

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
