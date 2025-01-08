import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService/authService";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash, FaFacebook, FaGoogle } from "react-icons/fa";
import "./Login.css";

const AuthRegister = ({ setIsLoginModalOpen, setIsRegisterModalOpen }) => {
  const [name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");

    const formData = {
      name,
      email,
      password,
    };

    try {
      const response = await authService.signup(formData);
      setMsg(response.message);
      navigate("/?message=User registered successfully.");
      openLoginModal();
    } catch (error) {
      setError("Error signing up. Please try again.");
      console.error(error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsRegisterModalOpen(false);
  };

  return (
    <>
      {error && !msg && (
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

      {msg && !error && (
        <div
          class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md mx-4 mt-6"
          role="alert"
        >
          <div class="flex">
            <div>
              <p class="font-bold">{msg}</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-12 mt-12 px-4">
        <div className="relative">
          <input
            type="name"
            id="name"
            value={name}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-400 bg-transparent text-black focus:outline-none peer transition-all duration-300"
            placeholder=" "
            required
          />
          <label
            htmlFor="name"
            className="absolute left-4 top-2 text-gray-500 text-base font-medium transform transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-[-2rem] peer-focus:text-base peer-focus:text-black peer-focus:left-0 bg-white"
          >
            Full Name
          </label>
        </div>
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
          <div
            onClick={togglePasswordVisibility}
            className="absolute text-xl right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>

        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-400 bg-transparent text-black focus:outline-none peer transition-all duration-300"
            placeholder=" "
            required
          />
          <label
            htmlFor="confirm-password"
            className="absolute left-4 top-2 text-gray-500 text-base font-medium transform transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-[-2rem] peer-focus:text-base peer-focus:text-black peer-focus:left-0 bg-white"
          >
            Confirm Password
          </label>
          <div
            onClick={toggleConfirmPasswordVisibility}
            className="absolute text-xl right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 font-bold text-lg text-white bg-gray-800 hover:bg-gray-900 transition-all duration-300"
        >
          Sign up
        </button>
      </form>

      <div className="text-center mt-4">
        <span className="text-base text-gray-600">
          Already have an account?
          <Link
            className="text-gray-800 hover:underline font-bold ml-1"
            onClick={openLoginModal}
          >
            Log in Now
          </Link>
        </span>
      </div>

      <div className="flex justify-center mt-6">Or, sign up with</div>
      <div className="flex justify-center mt-6 space-x-2">
        <FaFacebook className="text-blue-600 cursor-pointer text-2xl" />{" "}
        <span className="font-semibold">Facebook</span>
        <FaGoogle className="text-red-600 cursor-pointer text-2xl ml-2" />{" "}
        <span className="font-semibold">Google</span>
      </div>
    </>
  );
};

export default AuthRegister;
