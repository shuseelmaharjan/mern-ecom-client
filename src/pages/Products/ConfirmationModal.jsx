import React from 'react';
import PropTypes from 'prop-types';

const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-lg font-bold mb-4">{message}</h2>
        <div className="flex justify-end gap-4">
          <button
            type="button"
            className="bg-gray-300 text-gray-800 font-bold px-4 py-2 hover:bg-gray-200 rounded-full"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="bg-red-500 text-white font-bold px-4 py-2 hover:bg-red-600 rounded-full"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

ConfirmationModal.propTypes = {
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ConfirmationModal;