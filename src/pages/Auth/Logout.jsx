import React from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService/authService';
import Cookies from 'js-cookie';

const Logout = ({ showLogoutModal, setShowLogoutModal }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authService.logout(); 
      setShowLogoutModal(false);
      Cookies.remove('_session');
      sessionStorage.removeItem('__usr');
      window.location.reload();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };

  const handleClose = () => {
    setShowLogoutModal(false);
  };

  if (!showLogoutModal) {
    return null; 
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Are you sure you want to log out?</h2>
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-200"
            onClick={handleClose} // Close modal
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            onClick={handleLogout} // Confirm logout
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
