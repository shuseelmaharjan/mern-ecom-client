import React from "react";
import authService from "../../services/employeeService/employeeService";
import { useAuth } from "../../context/AuthContext";
import { CiCircleAlert } from "react-icons/ci";

const RemoveUserConfirmation = ({
  setRemoveUserModal,
  fetchData,
  setRemoveSuccessMsg,
  setRemoveErrorMsg,
  userId,
}) => {

    const {accessToken} = useAuth();

  const yesConfirm = async () => {
    try {
      const res = await authService.removeEmployee(accessToken, userId);
      setRemoveUserModal(false);
      setRemoveSuccessMsg(res.message);
      fetchData();
    } catch (error) {
      setRemoveErrorMsg(error.message || "An error occurred");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-11/12 sm:w-8/12 md:w-6/12 lg:w-4/12">
        {/* Header */}
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Confirm Removal
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Are you sure you want to remove this user? This action cannot be undone.
        </p>
        <div className="flex justify-center mt-6">
        <CiCircleAlert className="w-32 h-32 flex items-center justify-center bg-red-100 text-red-600 rounded-full shadow"/>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-10">
          <button
            type="button"
            onClick={yesConfirm}
            className="px-6 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition-all font-medium"
          >
            Remove User
          </button>
          <button
            type="button"
            onClick={() => setRemoveUserModal(false)}
            className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg shadow hover:bg-gray-400 transition-all font-medium"
          >
            Cancel
          </button>
        </div>

       
      </div>
    </div>
  );
};

export default RemoveUserConfirmation;
