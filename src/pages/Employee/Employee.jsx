import React, { useState } from "react";
import { FaSearch, FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import Pagination from "../../helper/Pagination";

const employeeData = [
  { id: 1, name: 'John Doe', designation: 'Software Engineer', status: 'Active' },
  { id: 2, name: 'Jane Smith', designation: 'Product Manager', status: 'Inactive' },
  { id: 3, name: 'Alice Brown', designation: 'UX Designer', status: 'Active' },
  { id: 4, name: 'Bob White', designation: 'QA Engineer', status: 'Active' },
  { id: 5, name: 'Charlie Green', designation: 'DevOps Engineer', status: 'Inactive' },
  { id: 6, name: 'John Dooe', designation: 'Software Engineer', status: 'Active' },
  { id: 7, name: 'Jane Smith', designation: 'Product Manager', status: 'Inactive' },
  { id: 8, name: 'Alice Brown', designation: 'UX Designer', status: 'Active' },
  { id: 9, name: 'Bob White', designation: 'QA Engineer', status: 'Active' },
  { id: 10, name: 'Charlie Green', designation: 'DevOps Engineer', status: 'Inactive' },
  { id: 11, name: 'John Doee', designation: 'Software Engineer', status: 'Active' },
  { id: 12, name: 'Jane Smith', designation: 'Product Manager', status: 'Inactive' },
  { id: 13, name: 'Alice Brown', designation: 'UX Designer', status: 'Active' },
  { id: 14, name: 'Bob White', designation: 'QA Engineer', status: 'Active' },
  { id: 15, name: 'Charlie Green', designation: 'DevOps Engineer', status: 'Inactive' },
];
const Employee = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });

  const sortedEmployees = [...employeeData].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
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
        direction: sortConfig.direction === 'asc' ? 'desc' : 'asc',
      });
    } else {
      setSortConfig({
        key: key,
        direction: 'asc',
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
              <th className="px-6 py-3 text-left cursor-pointer" onClick={() => handleSort('name')}>
                Employee
                {sortConfig.key === 'name' ? (
                  sortConfig.direction === 'asc' ? (
                    <FaSortUp className="inline ml-2" />
                  ) : (
                    <FaSortDown className="inline ml-2" />
                  )
                ) : (
                  <FaSort className="inline ml-2" />
                )}
              </th>
              <th className="px-6 py-3 text-left cursor-pointer" onClick={() => handleSort('designation')}>
                Designation
                {sortConfig.key === 'designation' ? (
                  sortConfig.direction === 'asc' ? (
                    <FaSortUp className="inline ml-2" />
                  ) : (
                    <FaSortDown className="inline ml-2" />
                  )
                ) : (
                  <FaSort className="inline ml-2" />
                )}
              </th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((employee, index) => (
              <tr key={employee.id} className="border-t border-gray-200">
                <td className="px-6 py-4 text-gray-800">{indexOfFirstItem + index + 1}</td>
                <td className="px-6 py-4 text-gray-800">{employee.name}</td>
                <td className="px-6 py-4 text-gray-800">{employee.designation}</td>
                <td className="px-6 py-4 text-gray-800">
                  <span
                    className={`px-2 py-1 rounded-full ${
                      employee.status === 'Active' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                    }`}
                  >
                    {employee.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-800">
                  <button className="text-blue-500 hover:text-blue-700">Edit</button>
                  <button className="ml-2 text-red-500 hover:text-red-700">Delete</button>
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