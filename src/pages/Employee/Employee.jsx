import React, { useEffect, useState } from "react";
import { FaSearch, FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import Pagination from "../../helper/Pagination";
import { FaEdit, FaTrash } from "react-icons/fa";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import employeeService from "../../services/employeeService/employeeService";
import { useAuth } from "../../context/AuthContext";
import { FaUserShield, FaBullhorn, FaUserSecret } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa6";
import DateUtils from "../../utils/dateUtils";

const Employee = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });
  const [employeeData, setEmployeeData] = useState("");

  const { accessToken } = useAuth();
  const token = Cookies.get("_r");
  const decodeToken = jwtDecode(token);
  const role = decodeToken.role;

  useEffect(() => {
    const getUserData = async () => {
      try {
        if (role === "admin") {
          const res = await employeeService.employees(accessToken);
          setEmployeeData(res);
        } else if (role === "hr") {
          const hrdata = await employeeService.staffs(accessToken);
          setEmployeeData(hrdata);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getUserData();
  }, [accessToken, role]);


  const sortedEmployees = [...employeeData].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedEmployees.slice(indexOfFirstItem, indexOfLastItem);

  const handleItemsPerPageChange = (itemsPerPage) => {
    setItemsPerPage(itemsPerPage);
    setCurrentPage(1);
  };

  const paginate = (direction) => {
    if (direction === "next" && indexOfLastItem < sortedEmployees.length) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && indexOfFirstItem > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSort = (key) => {
    if (sortConfig.key === key) {
      setSortConfig({
        key: key,
        direction: sortConfig.direction === "asc" ? "desc" : "asc",
      });
    } else {
      setSortConfig({
        key: key,
        direction: "asc",
      });
    }
  };

  return (
    <div className="block w-full h-auto p-6 shadow-lg rounded-lg gap-6 lg:gap-8 border-gray-100 border-2">
      <div className="flex flex-col lg:flex-row w-full items-center justify-between gap-4 lg:gap-8">
        <div className="relative w-full lg:w-3/12">
          <FaSearch className="absolute left-3 top-[1.3rem] transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            id="name"
            className="w-full pl-10 pr-4 py-2 border border-gray-400 rounded-md mb-4 outline-none"
            placeholder="Search Employee"
            required
          />
        </div>
        <button className="bg-gray-800 hover:bg-gray-900 p-2 text-white font-semibold text-sm mb-4">
          Add an Employee
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg bg-white">
        <table className="min-w-full table-auto rounded-lg border-b border-gray-200">
          <thead className="bg-black text-white">
            <tr>
              <th className="px-6 py-3 text-left">S.N.</th>
              <th
                className="px-6 py-3 text-left cursor-pointer"
                onClick={() => handleSort("name")}
              >
                Employee
                {sortConfig.key === "name" ? (
                  sortConfig.direction === "asc" ? (
                    <FaSortUp className="inline ml-2" />
                  ) : (
                    <FaSortDown className="inline ml-2" />
                  )
                ) : (
                  <FaSort className="inline ml-2" />
                )}
              </th>
              <th
                className="px-6 py-3 text-left cursor-pointer"
                onClick={() => handleSort("designation")}
              >
                Designation
                {sortConfig.key === "designation" ? (
                  sortConfig.direction === "asc" ? (
                    <FaSortUp className="inline ml-2" />
                  ) : (
                    <FaSortDown className="inline ml-2" />
                  )
                ) : (
                  <FaSort className="inline ml-2" />
                )}
              </th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Date of Joined</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((employee, index) => (
              <tr key={employee.id} className="border-t border-gray-200">
                <td className="px-6 py-4 text-gray-800">
                  {indexOfFirstItem + index + 1}
                </td>
                <td className="px-6 py-4 text-gray-800">{employee.name}</td>
                <td className="px-6 py-4 text-gray-800 flex items-center space-x-2">
                  {employee.designation === "admin" && (
                    <div className="flex items-center space-x-2">
                      <span className="text-red-500">
                        <FaUserShield />
                      </span>
                      <span className="bg-red-100 text-red-700 text-sm font-medium px-2 py-1 rounded-full">
                        Admin
                      </span>
                    </div>
                  )}
                  {employee.designation === "marketing manager" && (
                    <div className="flex items-center space-x-2">
                      <span className="text-blue-500">
                        <FaBullhorn />
                      </span>
                      <span className="bg-blue-100 text-blue-700 text-sm font-medium px-2 py-1 rounded-full">
                        Marketing Manager
                      </span>
                    </div>
                  )}
                  {employee.designation === "hr" && (
                    <div className="flex items-center space-x-2">
                      <span className="text-green-500">
                        <FaUserSecret />
                      </span>
                      <span className="bg-green-100 text-green-700 text-sm font-medium px-2 py-1 rounded-full">
                        HR
                      </span>
                    </div>
                  )}
                  {employee.designation === "staff" && (
                    <div className="flex items-center space-x-2">
                      <span className="text-yellow-500">
                        <FaUserTie />
                      </span>
                      <span className="bg-yellow-100 text-yellow-700 text-sm font-medium px-2 py-1 rounded-full">
                        Staff
                      </span>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 text-gray-800">{employee.email}</td>
                <td className="px-6 py-4 text-gray-800">
                  {DateUtils.formatDate(employee.joinedDate)}
                </td>
                <td className="px-6 py-4 text-gray-800">
                  <button className="text-blue-500 hover:text-blue-700">
                    <FaEdit />
                  </button>
                  <button className="ml-2 text-red-500 hover:text-red-700">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalItems={sortedEmployees.length}
        itemsPerPage={itemsPerPage}
        onPageChange={paginate}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </div>
  );
};

export default Employee;
