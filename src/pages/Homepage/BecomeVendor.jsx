import React, { useState, useEffect } from "react";
import siteService from "../../services/site/siteService";
import sellImg from "../../assets/sell.jpg";
import HomepageService from "../../services/homepageService/homepageService";
import { Link, useNavigate } from "react-router-dom";
import config from "../../services/config";
import bg from "../../assets/bg.jpg";
import homepageService from "../../services/homepageService/homepageService";
import { useAuth } from "../../context/AuthContext";
import { IoShieldCheckmark } from "react-icons/io5";

const tabs = [
  "Shop Name",
  "Shop Description",
  "Select category for what kind of product you sell.",
  "Overview",
  "Confirmation",
];

const BecomeVendor = () => {
  const BASE_URL = config.API_BASE_URL;
  const { accessToken } = useAuth();
  const navigate = useNavigate();

  const [currentTab, setCurrentTab] = useState(0);
  const [formData, setFormData] = useState({
    shopName: "",
    shopDescription: "",
    categories: [],
  });

  const [errors, setErrors] = useState({
    shopName: "",
    shopDescription: "",
    categories: "",
  });

  const [siteTitle, setSiteTitle] = useState("");
  const [siteData, setSiteData] = useState("");
  const [categoriesList, setCategoriesList] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const fetchSiteData = async () => {
      try {
        const data = await siteService.getData();
        setSiteTitle(data.siteData.title);
        setSiteData(data.siteData);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await HomepageService.getCategories();
        setCategoriesList(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSiteData();
    fetchCategories();
  }, []);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.shopName.trim()) {
      newErrors.shopName = "Shop Name is required";
    }
    if (!formData.shopDescription.trim()) {
      newErrors.shopDescription = "Shop Description is required";
    }
    if (formData.categories.length === 0) {
      newErrors.categories = "At least one category must be selected";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (e) => {
    e.preventDefault();

    const newErrors = {};

    // Validate based on the current tab
    if (currentTab === 0 && !formData.shopName.trim()) {
      newErrors.shopName = "Shop Name is required";
    }
    if (currentTab === 1 && !formData.shopDescription.trim()) {
      newErrors.shopDescription = "Shop Description is required";
    }
    if (currentTab === 2 && formData.categories.length === 0) {
      newErrors.categories = "At least one category must be selected";
    }

    setErrors(newErrors);

    // Proceed to the next tab only if no errors
    if (Object.keys(newErrors).length === 0 && currentTab < tabs.length - 1) {
      setCurrentTab(currentTab + 1);
    }
  };

  const handlePrevious = () => {
    if (currentTab > 0) {
      setCurrentTab(currentTab - 1);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCategoryAdd = (categoryId) => {
    if (formData.categories.some((cat) => cat === categoryId)) return;

    setFormData((prev) => ({
      ...prev,
      categories: [...prev.categories, categoryId],
    }));
    setErrors((prev) => ({ ...prev, categories: "" }));
  };

  const handleCategoryRemove = (categoryId) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.filter((cat) => cat !== categoryId),
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await homepageService.createShop(formData, accessToken);
      console.log(response);
      setShowSuccess(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSuccess = () => {
    navigate("/");
  };

  const renderContent = () => {
    switch (currentTab) {
      case 0:
        return (
          <div>
            <input
              type="text"
              name="shopName"
              value={formData.shopName}
              onChange={handleChange}
              placeholder="Shop Name"
              className={`w-full mt-2 px-3 py-2 border ${
                errors.shopName ? "border-red-500" : "border-gray-400"
              } bg-transparent text-gray-800 focus:outline-none transition-all duration-300 text-base`}
            />
            {errors.shopName && (
              <span className="text-red-500 text-sm text-left">
                {errors.shopName}
              </span>
            )}
          </div>
        );
      case 1:
        return (
          <div>
            <textarea
              name="shopDescription"
              value={formData.shopDescription}
              onChange={handleChange}
              placeholder="Shop Description"
              className={`w-full p-2 border ${
                errors.shopDescription ? "border-red-500" : "border-gray-300"
              } bg-transparent text-gray-800 focus:outline-none transition-all duration-300 text-base`}
            />
            {errors.shopDescription && (
              <span className="text-red-500 text-sm text-left">
                {errors.shopDescription}
              </span>
            )}
          </div>
        );
      case 2:
        return (
          <div>
            <div className="mb-4">
              <select
                className="w-full p-2 border border-gray-300 rounded"
                onChange={(e) => handleCategoryAdd(e.target.value)}
                defaultValue=""
              >
                <option value="" disabled>
                  Select a Category
                </option>
                {categoriesList.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              {formData.categories.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.categories.map((categoryId) => {
                    const category = categoriesList.find(
                      (cat) => cat._id === categoryId
                    );
                    return (
                      <span
                        key={categoryId}
                        className="px-3 py-1 bg-gray-200 rounded-full text-sm flex items-center"
                      >
                        {category?.name}
                        <button
                          type="button"
                          className="ml-2 text-red-500"
                          onClick={() => handleCategoryRemove(categoryId)}
                        >
                          ×
                        </button>
                      </span>
                    );
                  })}
                </div>
              )}
              {errors.categories && (
                <span className="text-red-500 text-sm">
                  {errors.categories}
                </span>
              )}
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <p>Shop Name: {formData.shopName}</p>
            <p>Shop Description: {formData.shopDescription}</p>
            <p>
              Categories:{" "}
              {formData.categories
                .map(
                  (categoryId) =>
                    categoriesList.find((cat) => cat._id === categoryId)?.name
                )
                .join(", ") || "None"}
            </p>
          </div>
        );
      case 4:
        return (
          <div>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="confirmation"
                checked={isConfirmed}
                onChange={(e) => setIsConfirmed(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="confirmation" className="text-sm text-gray-700">
                I confirm that all the data provided is accurate, and I agree to
                the{" "}
                <a
                  href="/terms-and-conditions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  Terms and Conditions
                </a>
                .
              </label>
            </div>
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={handlePrevious}
                className="px-4 py-2 rounded font-bold bg-gray-700 text-white"
              >
                Previous
              </button>
              <button
                onClick={handleSubmit}
                disabled={!isConfirmed}
                className={`px-4 py-2 rounded font-bold ${
                  isConfirmed
                    ? "bg-gray-800 text-white cursor-pointer"
                    : "bg-gray-400 text-gray-200 cursor-not-allowed"
                }`}
              >
                Submit
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <div className="absolute left-10 top-10 z-10">
        <Link to={"/"}>
          {siteData.logo ? (
            <>
              <div className="flex items-center gap-6">
                <img
                  src={`${BASE_URL}${siteData.logo}`}
                  alt="Logo"
                  className="h-12 sm:h-16 object-contain py-2"
                />
                <h1 className="text-white text-2xl font-bold">
                  {siteData.title}
                </h1>
              </div>
            </>
          ) : (
            <span className="text-sm text-gray-500">Loading logo...</span>
          )}
        </Link>
      </div>
      <div
        className="lg:w-1/2 w-full h-1/2 lg:h-full bg-cover bg-center relative"
        style={{
          backgroundImage: `
            linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0)),
            url(${bg})
            `,
        }}
      ></div>

      <div className="lg:w-1/2 w-full h-full p-8 flex flex-col justify-between items-center">
        <div className="my-auto mx-auto w-8/12 text-gray-800">
          <img src={sellImg} alt="Sell" />
          <h1 className="text-2xl mb-4 font-bold text-center">
            Sell on {siteTitle}
          </h1>
          <p className="text-center text-lg">{siteData.tagline}</p>
          <h1 className="text-2xl mb-4">{tabs[currentTab]}</h1>
          {renderContent()}
          <div className="flex justify-between mt-8">
            {currentTab > 0 && currentTab < tabs.length - 1 && (
              <button
                onClick={handlePrevious}
                className="px-4 py-2 rounded font-bold bg-gray-700 text-white"
              >
                Previous
              </button>
            )}
            {currentTab < tabs.length - 1 && (
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-gray-800 text-white font-bold rounded"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>

      {showSuccess && (
        <div className="modal-overlay fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="main-container bg-white text-gray-800 p-8 rounded-lg shadow-2xl transform scale-95 transition-transform duration-500 ease-out opacity-0 animate-success">
            <div className="check-container flex justify-center items-center mb-6">
              <div className="check-background p-3 bg-gradient-to-r from-green-400 via-green-500 to-green-600 rounded-full shadow-lg">
                <IoShieldCheckmark size={100} className="text-white" />
              </div>
            </div>
            <div className="check-shadow text-center">
              <p className="font-bold text-3xl mb-2">All Done!</p>
              <p className="text-lg mb-6">
                Success! Your shop has been created. Now logout once to get into admin dashboard.
              </p>
              <button
                className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 focus:outline-none transition duration-200 font-bold"
                onClick={handleSuccess}
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BecomeVendor;
