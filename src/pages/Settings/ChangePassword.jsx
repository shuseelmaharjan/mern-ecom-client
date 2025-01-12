import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import authService from "../../services/authService/authService";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { accessToken } = useAuth();

  const validatePassword = (password) => {
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword(newPassword)) {
      toast.error(
        "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }

    try {
      const response = await authService.changePassword(
        oldPassword,
        newPassword,
        accessToken
      );
      toast.success(response.message);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast.error(err.message || "Failed to change password.");
    }
  };

  const toggleVisibility = (field) => {
    if (field === "old") setShowOldPassword(!showOldPassword);
    if (field === "new") setShowNewPassword(!showNewPassword);
    if (field === "confirm") setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="block w-3/12 h-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="oldPassword" className="mb-2 font-medium">
            Current Password
          </label>
          <input
            type={showOldPassword ? "text" : "password"}
            id="oldPassword"
            className="flex-grow border border-gray-300 p-2 shadow-sm outline-none"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => toggleVisibility("old")}
            className="absolute right-2 top-8 text-gray-600"
          >
            {showOldPassword ? <FaEye/> : <FaEyeSlash/>}
          </button>
        </div>
        <div className="flex flex-col">
          <label htmlFor="newPassword" className="mb-2 font-medium">
            New Password
          </label>
          <input
            type={showNewPassword ? "text" : "password"}
            id="newPassword"
            className="flex-grow border border-gray-300 p-2 shadow-sm outline-none"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => toggleVisibility("new")}
            className="absolute right-2 top-8 text-gray-600"
          >
            {showNewPassword ? <FaEye/> : <FaEyeSlash/>}
          </button>
        </div>
        <div className="flex flex-col">
          <label htmlFor="confirmPassword" className="mb-2 font-medium">
            Confirm Password
          </label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            className="flex-grow border border-gray-300 p-2 shadow-sm outline-none"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => toggleVisibility("confirm")}
            className="absolute right-2 top-8 text-gray-600"
          >
            {showConfirmPassword ? <FaEye/> : <FaEyeSlash/>}
          </button>
        </div>
        <button
          type="submit"
          className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 px-4 text-sm shadow-md transition duration-200 w-full"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
