import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";
import { MdMenu } from "react-icons/md";
import { useAuth } from '../../context/AuthContext';
import useEncryption from '../../hooks/useEncryption';

const DashLoadout = ({ children }) => {
  const { role } = useAuth();
  const { decrypt } = useEncryption();

  // Safely checking session data
  const r = sessionStorage.getItem('__usr');
  if (r) {
    const decryptedData = decrypt(r);
    console.log(decryptedData);
  } else {
    console.warn("Session data not found or is invalid.");
  }

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(
    JSON.parse(localStorage.getItem("isSidebarExpanded")) ?? true
  );
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("isSidebarExpanded", JSON.stringify(isSidebarExpanded));
  }, [isSidebarExpanded]);

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  if (role === 'admin' || role === 'vendor' || role === 'staff') {
    return (
      <div className="flex h-screen">
        {/* Sidebar for desktop */}
        <aside
          className={`fixed top-0 left-0 bg-gray-100 border-gray-250 border-r text-gray-800 transition-width duration-300 flex flex-col h-full hidden md:block ${
            isSidebarExpanded ? "w-72" : "w-24"
          }`}
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
            isSidebarExpanded ? "md:ml-72" : "md:ml-24"
          } ${isMobileNavOpen ? "ml-0" : ""} md:ml-0`}
        >
          {/* Header */}
          <header className="bg-blue-600 text-white p-4 fixed w-full z-10 shadow flex items-center justify-between">
            <button className="text-2xl md:hidden" onClick={toggleMobileNav}>
              <MdMenu />
            </button>
            <span>Welcome, {role}</span>
          </header>

          {/* Main DashLoadout Content */}
          <div className="flex-1 mt-16 p-4 bg-gray-100">
            {children}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-center p-8 bg-white shadow-lg rounded-lg max-w-sm mx-auto">
          <h2 className="text-4xl font-semibold text-red-600 mb-4">Page Not Found</h2>
          <p className="text-lg text-gray-600 mb-6">You do not have access to this page.</p>
          <p className="text-sm text-gray-400">If you believe this is a mistake, please contact support.</p>
        </div>
      </div>
    );
  }
};

export default DashLoadout;
