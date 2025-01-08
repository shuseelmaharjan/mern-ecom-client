import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgetPassword = ({
  setIsLoginModalOpen,
  setIsRegisterModalOpen,
  setForgetPasswordModalOpen,
}) => {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const backtoLogin = () => {
    setIsLoginModalOpen(true);
    setIsRegisterModalOpen(false);
    setForgetPasswordModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() === "") {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    setErrorMessage("");
    setSuccessMessage(
      "Password reset instructions have been sent to your email."
    );
    setEmail("");
  };

  return (
    <>
      <div className="mt-6 px-4 mb-6 text-gray-700">
        Please enter the email associated with your account to reset the
        password.
      </div>
      <form onSubmit={handleSubmit} className="space-y-12 mt-12 px-4">
        {/* Email Input */}
        <div className="relative">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-400 bg-transparent text-black focus:outline-none peer transition-all duration-300"
            placeholder=" "
            required
          />
          <label
            htmlFor="email"
            className="absolute left-4 top-2 text-gray-500 text-base font-medium transform transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-[-2rem] peer-focus:text-base peer-focus:text-black peer-focus:left-0 bg-white"
          >
            Email
          </label>
        </div>

        {successMessage && (
          <div className="text-green-600 text-sm">{successMessage}</div>
        )}
        {errorMessage && (
          <div className="text-red-600 text-sm">{errorMessage}</div>
        )}

        <button
          type="submit"
          className="w-full py-3 font-bold text-lg text-white bg-gray-800 hover:bg-gray-900 transition-all duration-300"
        >
          Submit
        </button>
      </form>

      <div className="text-center mt-4">
        <span className="text-base text-gray-600">
          <Link
            className="text-gray-800 hover:underline font-bold ml-1"
            onClick={backtoLogin}
          >
            Back to Login{" "}
          </Link>
        </span>
      </div>
    </>
  );
};

export default ForgetPassword;
