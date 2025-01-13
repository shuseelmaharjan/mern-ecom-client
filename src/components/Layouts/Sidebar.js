import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { VendorNavbar } from "./VendorNavbar";
import { AdminNavbar } from "./AdminNavbar";
import { HrNavbar } from "./HrNavbar";
import { StaffNavbar } from "./StaffNavbar";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { MMNavbar } from "./MMNavbar";

const Sidebar = ({ isSidebarExpanded }) => {
  const location = useLocation();
  const [role, setRole] = useState("");

  useEffect(() => {
    localStorage.setItem("_bar", JSON.stringify(isSidebarExpanded));

    const token = Cookies.get("_r");
    if (token) {
      const dToken = jwtDecode(token);
      setRole(dToken.role);
    }
  }, [isSidebarExpanded]);

  const isActive = (path) => {
    return location.pathname.includes(path);
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {role === "vendor" && (
        <VendorNavbar
          isSidebarExpanded={isSidebarExpanded}
          isActive={isActive}
        />
      )}
      {role === "hr" && (
        <HrNavbar isSidebarExpanded={isSidebarExpanded} isActive={isActive} />
      )}
      {role === "staff" && (
        <StaffNavbar
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
      {role === "mm" && (
        <MMNavbar isSidebarExpanded={isSidebarExpanded} isActive={isActive} />
      )}
    </div>
  );
};

export default Sidebar;
