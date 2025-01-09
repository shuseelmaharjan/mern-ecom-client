import React from "react";
import { Link } from "react-router-dom";
import { PiGearSix } from "react-icons/pi";
import { IoHomeOutline, IoBarChartOutline } from "react-icons/io5";
import { LuShapes, LuMessageSquareText, LuUsersRound } from "react-icons/lu";
import { LiaBullhornSolid } from "react-icons/lia";
import { AiOutlineBank } from "react-icons/ai";

import { BsClipboard2Data } from "react-icons/bs";

export const VendorNavbar = ({ isSidebarExpanded, isActive }) => {
  return (
    <>
      <nav className="flex-1 overflow-y-auto mt-12 bg-white" id="nav">
        <ul className="flex flex-col gap-y-1">
          <Link to="/dashboard">
            <li
              className={`hover:bg-gray-900 hover:text-white font-semibold mx-4 rounded-lg px-4 py-3 flex transition duration-300 ease-in-out items-center text-base ${
                isActive("/dashboard") ? "bg-black text-white" : ""
              }`}
            >
              <IoHomeOutline
                className={`${isSidebarExpanded ? "" : "mx-auto"}`}
              />
              {isSidebarExpanded && <span className="mx-2">Dashboard</span>}
            </li>
          </Link>
          <Link to="/listing">
            <li
              className={`hover:bg-gray-900 hover:text-white font-semibold mx-4 rounded-lg px-4 py-3 flex transition duration-300 ease-in-out items-center text-base ${
                isActive("/listing") ? "bg-black text-white" : ""
              }`}
            >
              <LuShapes className={`${isSidebarExpanded ? "" : "mx-auto"}`} />
              {isSidebarExpanded && <span className="mx-2">Listing</span>}
            </li>
          </Link>
          <Link to="/messages">
            <li
              className={`hover:bg-gray-900 hover:text-white font-semibold mx-4 rounded-lg px-4 py-3 flex transition duration-300 ease-in-out items-center text-base ${
                isActive("/messages") ? "bg-black text-white" : ""
              }`}
            >
              <LuMessageSquareText
                className={`${isSidebarExpanded ? "" : "mx-auto"}`}
              />
              {isSidebarExpanded && <span className="mx-2">Messages</span>}
            </li>
          </Link>
          <Link to="/order-and-delivery">
            <li
              className={`hover:bg-gray-900 hover:text-white font-semibold mx-4 rounded-lg px-4 py-3 flex transition duration-300 ease-in-out items-center text-base ${
                isActive("/order-and-delivery") ? "bg-black text-white" : ""
              }`}
            >
              <BsClipboard2Data
                className={`${isSidebarExpanded ? "" : "mx-auto"}`}
              />
              {isSidebarExpanded && (
                <span className="mx-2">Order & Delivery</span>
              )}
            </li>
          </Link>
          <div className="my-4 border-t border-gray-200"></div>
          <Link to="/statistics">
            <li
              className={`hover:bg-gray-900 hover:text-white font-semibold mx-4 rounded-lg px-4 py-3 flex transition duration-300 ease-in-out items-center text-base ${
                isActive("/statistics") ? "bg-black text-white" : ""
              }`}
            >
              <IoBarChartOutline
                className={`${isSidebarExpanded ? "" : "mx-auto"}`}
              />
              {isSidebarExpanded && <span className="mx-2">Stats</span>}
            </li>
          </Link>
          <Link to="/marketing">
            <li
              className={`hover:bg-gray-900 hover:text-white font-semibold mx-4 rounded-lg px-4 py-3 flex transition duration-300 ease-in-out items-center text-base ${
                isActive("/marketing") ? "bg-black text-white" : ""
              }`}
            >
              <LiaBullhornSolid
                className={`${isSidebarExpanded ? "" : "mx-auto"}`}
              />
              {isSidebarExpanded && <span className="mx-2">Marketing</span>}
            </li>
          </Link>
          <div className="my-4 border-t border-gray-200"></div>
          <Link to="/finances">
            <li
              className={`hover:bg-gray-900 hover:text-white font-semibold mx-4 rounded-lg px-4 py-3 flex transition duration-300 ease-in-out items-center text-base ${
                isActive("/finances") ? "bg-black text-white" : ""
              }`}
            >
              <AiOutlineBank
                className={`${isSidebarExpanded ? "" : "mx-auto"}`}
              />
              {isSidebarExpanded && <span className="mx-2">Finances</span>}
            </li>
          </Link>
          <Link to="/help">
            <li
              className={`hover:bg-gray-900 hover:text-white font-semibold mx-4 rounded-lg px-4 py-3 flex transition duration-300 ease-in-out items-center text-base ${
                isActive("/help") ? "bg-black text-white" : ""
              }`}
            >
              <LuUsersRound
                className={`${isSidebarExpanded ? "" : "mx-auto"}`}
              />
              {isSidebarExpanded && <span className="mx-2">Help</span>}
            </li>
          </Link>
          <Link to="/settings">
            <li
              className={`hover:bg-gray-900 hover:text-white font-semibold mx-4 rounded-lg px-4 py-3 flex transition duration-300 ease-in-out items-center text-base ${
                isActive("/settings") ? "bg-black text-white" : ""
              }`}
            >
              <PiGearSix className={`${isSidebarExpanded ? "" : "mx-auto"}`} />
              {isSidebarExpanded && <span className="mx-2">Settings</span>}
            </li>
          </Link>
        </ul>
      </nav>
    </>
  );
};
