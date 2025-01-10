import React from "react";
import { Link } from "react-router-dom";
import { PiGearSix } from "react-icons/pi";
import { IoHomeOutline, IoBarChartOutline } from "react-icons/io5";
import { LuShapes, LuMessageSquareText, LuUsersRound } from "react-icons/lu";
import { LiaBullhornSolid } from "react-icons/lia";
import { AiOutlineBank } from "react-icons/ai";
import { FaUsers } from "react-icons/fa6";
import { BsClipboard2Data } from "react-icons/bs";

export const HrNavbar = ({ isSidebarExpanded, isActive }) => {
  return (
    <nav
      className="flex-1 overflow-y-auto bg-white shadow-md rounded-lg mt-10"
      id="nav"
    >
      <ul className="flex flex-col gap-y-2 p-4">
        {/* Reusable Nav Item Component */}
        {[
          { path: "/dashboard", label: "Dashboard", Icon: IoHomeOutline },
          { path: "/employee", label: "Employee", Icon: FaUsers },
          { path: "/statistics", label: "Stats", Icon: IoBarChartOutline },
          { path: "/listing", label: "Listing", Icon: LuShapes },
          { path: "/messages", label: "Messages", Icon: LuMessageSquareText },
          {
            path: "/order-and-delivery",
            label: "Order & Delivery",
            Icon: BsClipboard2Data,
          },
          { path: "/marketing", label: "Marketing", Icon: LiaBullhornSolid },
          { path: "/finances", label: "Finances", Icon: AiOutlineBank },
          { path: "/settings", label: "Settings", Icon: PiGearSix },
          { path: "/help", label: "Help", Icon: LuUsersRound },
        ].map(({ path, label, Icon }, index) => (
          <Link to={path} key={index}>
            <li
              className={`${
                isActive(path) ? "bg-gray-900 text-white" : "text-gray-700"
              } hover:bg-gray-800 hover:text-white font-medium rounded-lg px-4 py-3 flex items-center text-base transition duration-300 ease-in-out`}
            >
              {/* Icon with consistent size */}
              <Icon className="text-lg transition-transform flex-shrink-0" />
              {/* Label, conditionally rendered */}
              {isSidebarExpanded && (
                <span className="ml-3 whitespace-nowrap">{label}</span>
              )}
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  );
};
