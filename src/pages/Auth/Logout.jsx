import React from 'react';

const Logout = ({ onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Are you sure you want to log out?</h2>
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-200"
            onClick={onClose} // Cancel
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            onClick={onConfirm} // Confirm
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
