import React, { useCallback, useEffect, useState, useRef } from "react";
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
import AddEmployeeModal from "./AddEmployeeModal";
import { toast } from "react-toastify";
import RemoveUserConfirmation from "./RemoveUserConfirmation";
import UpdateEmployeeModal from "./UpdateEmployeeModal";

const Employee = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });
  const [employeeData, setEmployeeData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const { accessToken } = useAuth();
  const token = Cookies.get("_r");
  const decodeToken = jwtDecode(token);
  const role = decodeToken.role;
  const hasShownToast = useRef(false);

  

  const fetchData = useCallback(async () => {
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
  }, [accessToken, role]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);


  const filteredEmployees = employeeData.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
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

  const onPageChange = (direction) => {
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

  const [addEmployeModal, setAddEmployeeModal] = useState(false);
  const [userAddMsg, setUserAddMsg] = useState("");
  const [userAddErrMsg, setUserAddErrMsg] = useState("");
  const handleEmployeeAdd = () => {
    setAddEmployeeModal(true);
  };
  useEffect(() => {
    if (userAddMsg) {
      toast.success(userAddMsg);
      hasShownToast.current = false;
      setUserAddMsg("");
    }
  }, [userAddMsg]);

  useEffect(() => {
    if (userAddErrMsg) {
      toast.success(userAddErrMsg);
      hasShownToast.current = false;
      setUserAddMsg("");
    }
  }, [userAddErrMsg]);

  const [removeUserModal, setRemoveUserModal] = useState(false);
  const [removeSuccessMsg, setRemoveSuccessMsg] = useState('');
  const [removeErrorMsg, setRemoveErrorMsg] = useState('');
  const [userId, setUserId] = useState('');
  const handleRemoveUser = (id) => {
    setRemoveUserModal(true);
    setUserId(id);
  };

  useEffect(() => {
    if (removeSuccessMsg) {
      toast.success(removeSuccessMsg);
      hasShownToast.current = false;
      setRemoveSuccessMsg("");
    }
  }, [removeSuccessMsg]);

  useEffect(() => {
    if (removeErrorMsg) {
      toast.success(removeErrorMsg);
      hasShownToast.current = false;
      setRemoveErrorMsg("");
    }
  }, [removeErrorMsg]);

  const [updateEmployeeModal, setUpdateEmployeeModal] = useState(false);
  const [employeId, setEmployeeId] = useState('');
  const [updateSuccessMsg, setUpdateSuccessMsg] = useState('');
  const [updateErrorMsg, setUpdateErrorMsg] = useState('');
  
  const handleUpdateModal=(id) => {
    setUpdateEmployeeModal(true);
    setEmployeeId(id);
  }

  useEffect(() => {
    if (updateSuccessMsg) {
      toast.success(updateSuccessMsg);
      hasShownToast.current = false;
      setUpdateSuccessMsg("");
    }
  }, [updateSuccessMsg]);

  useEffect(() => {
    if (updateErrorMsg) {
      toast.success(updateErrorMsg);
      hasShownToast.current = false;
      setUpdateErrorMsg("");
    }
  }, [updateErrorMsg]);

  return (
    <div className="block w-full h-auto p-6 shadow-lg rounded-lg gap-6 lg:gap-8 border-gray-100 border-2">
      <div className="flex flex-col lg:flex-row w-full items-center justify-between gap-4 lg:gap-8">
        <div className="relative w-full lg:w-3/12">
          <FaSearch className="absolute left-3 top-[1.3rem] transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            id="name"
            className="w-full pl-10 pr-4 py-2 border border-gray-400 mb-4 outline-none"
            placeholder="Search Employee"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          className="bg-gray-800 hover:bg-gray-900 p-3 text-white font-semibold text-sm mb-4"
          onClick={handleEmployeeAdd}
        >
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
            {currentItems.length > 0 ? (
              currentItems.map((employee, index) => (
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
                    {employee.designation === "mm" && (
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
                    <button className="text-blue-500 hover:text-blue-700" onClick={() => handleUpdateModal(employee.id)}>
                      <FaEdit />
                    </button>
                    <button className="ml-2 text-red-500 hover:text-red-700" onClick={() => handleRemoveUser(employee.id)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-end mt-4">
        <Pagination
          totalItems={filteredEmployees.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={onPageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>

      {addEmployeModal && (
        <AddEmployeeModal
          setAddEmployeeModal={setAddEmployeeModal}
          fetchData={fetchData}
          setUserAddMsg={setUserAddMsg}
          setUserAddErrMsg={setUserAddErrMsg}
          role={role}
        />
      )}

      {removeUserModal && (
        <RemoveUserConfirmation
        setRemoveUserModal={setRemoveUserModal}
        fetchData={fetchData}
        setRemoveSuccessMsg = {setRemoveSuccessMsg}
        setRemoveErrorMsg = {setRemoveErrorMsg}
        userId={userId}
        />

      )}
      {updateEmployeeModal && (
        <UpdateEmployeeModal
        setUpdateEmployeeModal={setUpdateEmployeeModal}
        fetchData={fetchData}
        setUpdateSuccessMsg={setUpdateSuccessMsg}
        setUpdateErrorMsg={setUpdateErrorMsg}
        role={role}
        employeId={employeId}
        />
      )}
    </div>
    
  );
};

export default Employee;
