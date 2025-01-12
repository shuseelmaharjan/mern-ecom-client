import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { FaHome, FaBuilding } from "react-icons/fa";
import shippingService from "../../services/shippingService/shippingService";

const AddAddress = ({ openAddressTable, fetchShippingDetails, setAddSuccessMsg, setAddErrorMsg }) => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [flag, setFlag] = useState("");
  const [fullName, setFullName] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const { accessToken } = useAuth();

  const fetchCountries = async () => {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();
      const countryList = data
        .map((country) => ({
          name: country.name.common,
          phoneCode: country.idd.root
            ? `${country.idd.root}${country.idd.suffixes ? country.idd.suffixes[0] : ""}`
            : "",
          flag: country.flags.png || "",
        }))
        .sort((a, b) => a.name.localeCompare(b.name));
      setCountries(countryList);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const handleCountryChange = (e) => {
    const selected = countries.find((country) => country.name === e.target.value);
    setSelectedCountry(selected.name);
    setFlag(selected.flag);
    setPhone(selected.phoneCode);
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const handleOptionClick = (option) => {
    setSelectedOption(selectedOption === option ? "" : option);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedOption) {
      alert("Please select an address option (Home or Office).");
      return;
    }

    if (
      !fullName ||
      !addressLine1 ||
      !city ||
      !state ||
      !postalCode ||
      !selectedCountry ||
      !phone ||
      !selectedOption
    ) {
      alert("All fields are required!");
      return;
    }

    const formData = {
      fullName,
      addressLine1,
      city,
      state,
      postalCode,
      country: selectedCountry,
      phone,
      address: selectedOption,
    };

    try {
      const response = await shippingService.addShippingDetails(accessToken, formData);
      setAddSuccessMsg(response.message);
      fetchShippingDetails();
      openAddressTable();
    } catch (error) {
      console.error("Error adding details", error);
      setAddErrorMsg(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4 my-2 p-4">
          <div className="block">
            <label htmlFor="fullName" className="font-semibold text-sm">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full mt-2 px-3 py-2 border border-gray-400 bg-transparent text-gray-800 focus:outline-none transition-all duration-300 text-base"
              placeholder="Full Name"
              required
            />
          </div>

          {/* Country */}
          <div className="block">
            <label htmlFor="country" className="font-semibold text-sm">
              Country
            </label>
            <select
              name="country"
              id="country"
              value={selectedCountry}
              onChange={handleCountryChange}
              required
              className="w-full mt-2 px-3 py-2 border border-gray-400 bg-transparent text-gray-800 focus:outline-none transition-all duration-300 text-base"
            >
              <option value="">Select Country</option>
              {countries.map((country, index) => (
                <option key={index} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          {/* Phone */}
          <div className="block">
            <label htmlFor="phone" className="font-semibold text-sm">
              Phone
            </label>
            <div className="relative w-full mt-2">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                {flag && <img src={flag} alt="flag" className="w-6 h-4" />}
              </div>
              <input
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-12 px-3 py-2 border border-gray-400 bg-transparent text-gray-800 focus:outline-none transition-all duration-300 text-base"
                placeholder="Phone"
                required
              />
            </div>
          </div>

          {/* State */}
          <div className="block">
            <label htmlFor="state" className="font-semibold text-sm">
              State
            </label>
            <input
              type="text"
              id="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full mt-2 px-3 py-2 border border-gray-400 bg-transparent text-gray-800 focus:outline-none transition-all duration-300 text-base"
              placeholder="State"
              required
            />
          </div>

          {/* City */}
          <div className="block">
            <label htmlFor="city" className="font-semibold text-sm">
              City
            </label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full mt-2 px-3 py-2 border border-gray-400 bg-transparent text-gray-800 focus:outline-none transition-all duration-300 text-base"
              placeholder="City"
              required
            />
          </div>

          {/* Postal Code */}
          <div className="block">
            <label htmlFor="postalCode" className="font-semibold text-sm">
              Postal Code
            </label>
            <input
              type="text"
              id="postalCode"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              className="w-full mt-2 px-3 py-2 border border-gray-400 bg-transparent text-gray-800 focus:outline-none transition-all duration-300 text-base"
              placeholder="Postal Code"
              required
            />
          </div>

          {/* Address Line 1 */}
          <div className="block">
            <label htmlFor="addressLine" className="font-semibold text-sm">
              Address Line
            </label>
            <input
              type="text"
              id="addressLine"
              value={addressLine1}
              onChange={(e) => setAddressLine1(e.target.value)}
              className="w-full mt-2 px-3 py-2 border border-gray-400 bg-transparent text-gray-800 focus:outline-none transition-all duration-300 text-base"
              placeholder="Address Line"
              required
            />
          </div>

          <div className="block sm:col-span-2">
            <label className="font-semibold text-sm mb-2 block">
              Select a label for effective delivery:
            </label>
            <div className="flex gap-4">
              {/* Home Option */}
              <div
                onClick={() => handleOptionClick("Home")}
                className={`flex items-center justify-center px-3 py-2 border rounded-lg cursor-pointer transition-all duration-300 ${
                  selectedOption === "Home"
                    ? "bg-green-600 shadow-lg text-white border-green-800"
                    : "bg-gray-100 text-gray-800 border-gray-300"
                }`}
              >
                <FaHome className="text-2xl" />
                <span className="ml-2 text-sm font-medium">Home</span>
              </div>

              {/* Office Option */}
              <div
                onClick={() => handleOptionClick("Office")}
                className={`flex items-center justify-center px-3 py-2 border rounded-lg cursor-pointer transition-all duration-300 ${
                  selectedOption === "Office"
                    ? "bg-green-600 shadow-lg text-white border-green-800"
                    : "bg-gray-100 text-gray-800 border-gray-300"
                }`}
              >
                <FaBuilding className="text-2xl" />
                <span className="ml-2 text-sm font-medium">Office</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-6">
          <button
            type="button"
            onClick={openAddressTable}
            className="bg-gray-300 text-black px-6 py-2 hover:bg-gray-400"
          >
            Back
          </button>
          <button
            type="submit"
            className="bg-gray-800 text-white px-6 py-2 hover:bg-gray-700"
          >
            Save Address
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAddress;
