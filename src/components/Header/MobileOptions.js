import React from "react";
import logo from "../../assets/felthub-logo.png";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const MobileOptions = ({ setShowMobileMenu }) => {
  return (
    <>
      <div className="lg:hidden bg-white text-gray-800 absolute inset-0 z-50">
        <div className="mx-auto px-4 py-3">
          <Link to="/">
            <img src={logo} alt="Logo" className="w-32" />
          </Link>
        </div>

        <button
          onClick={() => setShowMobileMenu(false)}
          className="absolute top-4 right-4 text-gray-800"
        >
          <FaTimes className="text-2xl" />
        </button>
        <div className="flex flex-col space-y-4 px-8 py-6">
          <Link to="/" className="hover:text-green-500">
            Home
          </Link>
          <Link to="/category" className="hover:text-green-500">
            Categories
          </Link>
          <Link to="/login" className="hover:text-green-500">
            Login / Signup
          </Link>
        </div>
      </div>
    </>
  );
};

export default MobileOptions;
