import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Nav = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);

  const navItems = [
    { label: "Account", to: "/account-settings" },
    { label: "Security", to: "/account-security" },
    { label: "Public Profile", to: "/public-profile" },
    { label: "Address", to: "/account-address" },
    { label: "Credit Card", to: "/credit-card" },
  ];

  return (
    <nav className="max-w-2xl mx-auto">
      <div className="container mx-auto px-4 py-3">
        <ul className="flex flex-wrap justify-around md:justify-between">
          {navItems.map((item) => (
            <li key={item.to} className="px-4 py-2">
              <Link
                to={item.to}
                onClick={() => setActiveTab(item.to)}
                className={`cursor-pointer text-gray-700 hover:text-green-500 transition text-lg ${
                  activeTab === item.to
                    ? "border-b-4 border-green-500 font-semibold"
                    : ""
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
