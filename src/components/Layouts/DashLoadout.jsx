import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";
import { MdMenu } from "react-icons/md";
import { useAuth } from "../../context/AuthContext";
import PageNotFound from "../../pages/PageNotFound/PageNotFound";
import PathName from "./PathName";
import { capitalizeWords } from "../../utils/textUtils";

const DashLoadout = ({ children }) => {
  const { role } = useAuth();

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(
    JSON.parse(localStorage.getItem("_bar")) ?? true
  );
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("_bar", JSON.stringify(isSidebarExpanded));
  }, [isSidebarExpanded]);

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  if (role === "admin" || role === "vendor" || role === "staff") {
    return (
      <div className="flex h-screen">
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

        {isMobileNavOpen && <MobileNav toggleMobileNav={toggleMobileNav} />}

        <div
          className={`flex-1 flex flex-col transition-all duration-300 ${
            isSidebarExpanded ? "md:ml-72" : "md:ml-24"
          } ${isMobileNavOpen ? "ml-0" : ""} md:ml-0`}
        >
          <header className="bg-gray-100 text-gray-800 px-4 py-6 fixed w-full z-10 shadow flex items-center justify-between">
            <button className="text-2xl md:hidden" onClick={toggleMobileNav}>
              <MdMenu />
            </button>
            <span className="text-2xl font-bold text-gray-800">
              {capitalizeWords(PathName())}
            </span>
          </header>

          <div className="flex-1 mt-20 p-6 bg-gray-100">{children}</div>
        </div>
      </div>
    );
  } else {
    return <PageNotFound />;
  }
};

export default DashLoadout;
