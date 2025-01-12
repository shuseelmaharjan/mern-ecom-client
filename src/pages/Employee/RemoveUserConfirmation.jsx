import React from "react";
import authService from "../../services/employeeService/employeeService";
import { useAuth } from "../../context/AuthContext";
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

        {/* Buttons */}
        <div className="flex justify-center gap-4">
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

        {/* Decorative Icons */}
        <div className="flex justify-center mt-6">
          <span className="w-10 h-10 flex items-center justify-center bg-red-100 text-red-600 rounded-full shadow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.94-1.064 3.247-2.577l1.516-7.105c.387-1.814-.723-3.318-2.538-3.553L4.662 5.776c-1.814-.236-3.318.723-3.553 2.538l-1.516 7.105C-.048 16.936.962 18.64 2.401 18.997z"
              />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
};

export default RemoveUserConfirmation;
