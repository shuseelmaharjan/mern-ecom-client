import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Layouts/Sidebar";
import MobileNav from "../../components/Layouts/MobileNav";
import { MdMenu } from "react-icons/md";

const Dashboard = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(
    JSON.parse(localStorage.getItem("isSidebarExpanded")) ?? true
  );
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // Sync sidebar state with local storage
  useEffect(() => {
    localStorage.setItem("isSidebarExpanded", JSON.stringify(isSidebarExpanded));
  }, [isSidebarExpanded]);

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

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
          <span>Welcome, User</span>
        </header>

        {/* Main Dashboard Content */}
        <div className="flex-1 mt-16 p-4 bg-gray-100">
          <h1 className="text-2xl font-bold">Main Content</h1>
          <p className="mt-2">This is where the main dashboard content will go.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
