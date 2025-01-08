import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import authService from "../../services/authService/authService";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import useEncryption from "../../hooks/useEncryption";
import { FaEye, FaEyeSlash, FaFacebook, FaGoogle } from "react-icons/fa";
import "./Login.css";
import { useLocation } from "react-router-dom";

const AuthLogin = ({
  setIsLoginModalOpen,
  setIsRegisterModalOpen,
  setForgetPasswordModalOpen,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { setAccessToken } = useAuth();
  const navigate = useNavigate();
  const { encrypt } = useEncryption();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formData = { email, password };

    try {
      const response = await authService.login(formData);
      setAccessToken(response.accessToken);
      const encryptedSession = encrypt("true");
      Cookies.set("_session", encryptedSession, {
        expires: 7,
        path: "/",
        secure: false,
        sameSite: "Lax",
      });
      navigate("/");
    } catch (error) {
      setError(
        "Error logging in. Please check your credentials and try again."
      );
      console.error("Login Error:", error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const openRegisterModal = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
  };

  const forgetPasswordModal = () => {
    setForgetPasswordModalOpen(true);
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(false);
  };

  const [successRegisterMsg, setSuccessRegisterMsg] = useState("");

  const location = useLocation();
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const message = queryParams.get("message");

    if (message === "User registered successfully.") {
      setSuccessRegisterMsg("User registered successfully.");
    }
  }, [location.search]);

  return (
    <>
      {error && (
        <div
          class="bg-red-500 border-t-4 border-red-700 rounded-b text-white px-4 py-3 shadow-md mx-4 mt-6"
          role="alert"
        >
          <div class="flex">
            <div>
              <p class="font-bold">{error}</p>
            </div>
          </div>
        </div>
      )}

      {successRegisterMsg && !error && (
        <div
          class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md mx-4 mt-6"
          role="alert"
        >
          <div class="flex">
            <div>
              <p class="font-bold">{successRegisterMsg}</p>
            </div>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-12 mt-12 px-4">
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

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-400 bg-transparent text-black focus:outline-none peer transition-all duration-300"
            placeholder=" "
            required
          />
          <label
            htmlFor="password"
            className="absolute left-4 top-2 text-gray-500 text-base font-medium transform transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-[-2rem] peer-focus:text-base peer-focus:text-black peer-focus:left-0 bg-white"
          >
            Password
          </label>
          {/* Eye icons for password visibility */}
          <div
            onClick={togglePasswordVisibility}
            className="absolute text-xl right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
          {/* Forgot Password link */}
          <Link
            onClick={forgetPasswordModal}
            className="absolute right-0 bottom-[-2rem] text-base text-gray-800 font-semibold hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full py-3 font-bold text-lg text-white bg-gray-800 hover:bg-gray-900 transition-all duration-300"
        >
          Login
        </button>
      </form>

      <div className="text-center mt-4">
        <span className="text-base text-gray-600">
          Don't have an account?
          <Link
            className="text-gray-800 hover:underline font-bold ml-1"
            onClick={openRegisterModal}
          >
            Sign Up
          </Link>
        </span>
      </div>

      <div className="flex justify-center mt-6">Or, login with</div>

      {/* Social login icons */}
      <div className="flex justify-center mt-6 space-x-2">
        <FaFacebook className="text-blue-600 cursor-pointer text-2xl" />{" "}
        <span className="font-semibold">Facebook</span>
        <FaGoogle className="text-red-600 cursor-pointer text-2xl ml-2" />{" "}
        <span className="font-semibold">Google</span>
      </div>
    </>
  );
};

export default AuthLogin;
