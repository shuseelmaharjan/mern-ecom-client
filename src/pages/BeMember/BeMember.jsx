import React, { useState, useEffect, useCallback } from "react";
import { GoDotFill } from "react-icons/go";
import { SiTicktick, SiDailydotdev } from "react-icons/si";
import config from "../../services/config";
import siteService from "../../services/site/siteService";
import { useAuth } from "../../context/AuthContext";
import becomeVendorService from "../../services/beVendor/beVendor";

const saveToSessionStorage = (key, value) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

const getFromSessionStorage = (key) => {
  const data = sessionStorage.getItem(key);
  return data ? JSON.parse(data) : {};
};

const BeMember = () => {
  const BASE_URL = config.API_BASE_URL;
  const [siteLogo, setSiteLogo] = useState("");
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    shopName: "",
    ownerName: "",
    shopLogo: null,
    shopDescription: "",
    confirmation: false,
  });

  const siteManager = useCallback(async () => {
    try {
      const data = await siteService.getData();
      if (data.data && data.data.length > 0) {
        const siteData = data.data[0];
        setSiteLogo(BASE_URL + siteData.logo);
      } else {
        setSiteLogo("Logo");
      }
    } catch (error) {
      console.error("Server error:", error);
    }
  }, [BASE_URL]);

  useEffect(() => {
    siteManager();
  }, [siteManager]);

  useEffect(() => {
    const storedData = getFromSessionStorage("formData");
    if (storedData) {
      setFormData(storedData);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      console.log("File selected:", files[0]);
    }
    setFormData((prev) => {
      const newData = {
        ...prev,
        [name]:
          type === "checkbox" ? checked : type === "file" ? files[0] : value,
      };
      saveToSessionStorage("formData", newData);
      return newData;
    });
  };

  const validateStep = () => {
    const currentErrors = {};
    if (step === 1 && (!formData.shopName || !formData.shopName.trim())) {
      currentErrors.shopName = "Shop Name is required.";
    }
    if (step === 2 && (!formData.ownerName || !formData.ownerName.trim())) {
      currentErrors.ownerName = "Owner Name is required.";
    }
    if (
      step === 3 &&
      (!formData.shopDescription || !formData.shopDescription.trim())
    ) {
      currentErrors.shopDescription = "Shop Description is required.";
    }
    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const goToNextStep = () => {
    if (validateStep()) {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const goToPreviousStep = () => {
    setStep((prevStep) => Math.max(1, prevStep - 1));
  };

  const renderStepIcon = (index) => {
    if (step === index + 1) {
      return <SiDailydotdev className="text-blue-600 text-2xl" />;
    } else if (index + 1 < step) {
      return <SiTicktick className="text-green-500 text-2xl" />;
    } else {
      return <GoDotFill className="text-gray-500 text-2xl" />;
    }
  };

  const stepLabels = [
    "Enter Shop Name",
    "Owner Details & Logo",
    "Shop Description",
    "Billing Info",
    "Confirmation",
  ];

  const { accessToken } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep()) {
      try {
        const formDataToSend = new FormData();
        formDataToSend.append("shopName", formData.shopName);
        formDataToSend.append("ownerName", formData.ownerName);
        formDataToSend.append("shopDescription", formData.shopDescription);
        if (formData.shopLogo) {
          formDataToSend.append("shopLogo", formData.shopLogo);
        } else {
          console.log("No file selected");
        }

        console.log("FormData contents before submitting:", formDataToSend);

        const [upgradeResponse, vendorResponse] = await Promise.all([
          becomeVendorService.upgrade(accessToken),
          becomeVendorService.vendor(formDataToSend, accessToken),
        ]);

        console.log("Upgrade Response:", upgradeResponse);
        console.log("Vendor Response:", vendorResponse);

        alert("Form submitted successfully!");
        setFormData({
          shopName: "",
          ownerName: "",
          shopLogo: null,
          shopDescription: "",
          confirmation: false,
        });
        sessionStorage.removeItem("formData");
        setStep(1);
      } catch (error) {
        console.error("Error during form submission:", error);
        alert("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white text-white py-4 px-6 shadow-md">
        <div className="container mx-auto px-4">
          <img src={siteLogo} alt="site-logo" className="w-32" />
        </div>
      </header>
      <nav className="container mx-auto bg-white mt-12">
        <div className="flex justify-between items-center mb-6">
          {[...Array(5)].map((_, index) => (
            <React.Fragment key={index}>
              <div
                onClick={() => {
                  if (index + 1 <= step && validateStep()) {
                    setStep(index + 1);
                  }
                }}
                className="cursor-pointer flex flex-col items-center"
              >
                {renderStepIcon(index)}
                <span
                  className={`mt-2 text-sm ${
                    step === index + 1
                      ? "text-blue-600"
                      : index + 1 < step
                      ? "text-green-500"
                      : "text-gray-500"
                  }`}
                >
                  {stepLabels[index]}
                </span>
              </div>
              {index < 4 && (
                <div className="flex-1 h-1 bg-gray-300 mx-2 relative">
                  <div
                    className={`h-1 ${
                      index + 1 < step ? "bg-gray-800" : "bg-gray-300"
                    } absolute w-full`}
                  ></div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </nav>

      <div className="flex-1 px-6 py-8">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <div>
            {step === 1 && (
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  Step 1: {stepLabels[0]}
                </h3>
                <input
                  type="text"
                  name="shopName"
                  value={formData.shopName}
                  onChange={handleChange}
                  placeholder="Enter your shop name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.shopName && (
                  <p className="text-red-500 text-sm">{errors.shopName}</p>
                )}
              </div>
            )}

            {step === 2 && (
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  Step 2: {stepLabels[1]}
                </h3>
                <input
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.ownerName && (
                  <p className="text-red-500 text-sm">{errors.ownerName}</p>
                )}
                <div className="mt-4">
                  <input
                    type="file"
                    name="shopLogo"
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md py-2 px-4"
                  />
                  <p className="text-gray-500 mt-2">Upload your shop logo</p>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  Step 3: {stepLabels[2]}
                </h3>
                <textarea
                  name="shopDescription"
                  value={formData.shopDescription}
                  onChange={handleChange}
                  placeholder="Describe your shop and what you sell"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                />
                {errors.shopDescription && (
                  <p className="text-red-500 text-sm">
                    {errors.shopDescription}
                  </p>
                )}
              </div>
            )}
            {step === 4 && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Billing Info</h3>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="confirmation"
                    checked={formData.confirmation}
                    onChange={handleChange}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <label htmlFor="confirmation" className="ml-2 text-sm">
                    I confirm that the information provided is accurate and I
                    agree to the terms and conditions.
                  </label>
                </div>
              </div>
            )}

            {step === 5 && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Confirmation</h3>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="confirmation"
                    checked={formData.confirmation}
                    onChange={handleChange}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <label htmlFor="confirmation" className="ml-2 text-sm">
                    I confirm that the information provided is accurate and I
                    agree to the terms and conditions.
                  </label>
                </div>
              </div>
            )}

            <div className="mt-4 flex justify-end">
              {step > 1 && (
                <button
                  onClick={goToPreviousStep}
                  className="bg-gray-600 text-white px-6 py-3 rounded-md mr-auto"
                >
                  Previous
                </button>
              )}
              {step < 5 && (
                <button
                  onClick={goToNextStep}
                  className="bg-blue-600 text-white px-6 py-3 rounded-md"
                >
                  Next
                </button>
              )}
              {step === 5 && (
                <button
                  onClick={handleSubmit}
                  disabled={!formData.confirmation}
                  className={`px-6 py-3 rounded-md ${
                    formData.confirmation
                      ? "bg-blue-600 text-white cursor-pointer"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeMember;
