import React, { useState, useEffect, useCallback } from "react";
import authService from "../../services/authService/authService";
import { useAuth } from "../../context/AuthContext";

const UpdateEmployeeModal = ({ setUpdateEmployeeModal, fetchData, setUpdateSuccessMsg, setUpdateErrorMsg, role, employeId }) => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressline2, setAddressLine2] = useState("");
  const [designation, setDesignation] = useState("");
  const [salary, setSalary] = useState("");
  const [phoneCode, setPhoneCode] = useState("");
  const [flag, setFlag] = useState("");
  const [employeeId, setEmployeeId] = useState("");

  const { accessToken } = useAuth();

  const fetchPreviousData = useCallback(async () => {
    try {
      const response = await authService.getUserInfo(accessToken, employeId);
      const userInfo = response;
  
      setName(userInfo.name);
      setEmail(userInfo.email);
      setPhone(userInfo.phoneNumber);
      setSelectedCountry(userInfo.shippingAddresses[0]?.country || "");
      setState(userInfo.shippingAddresses[0]?.state || "");
      setCity(userInfo.shippingAddresses[0]?.city || "");
      setPostalCode(userInfo.shippingAddresses[0]?.postalCode || "");
      setAddressLine1(userInfo.shippingAddresses[0]?.addressLine1 || "");
      setAddressLine2(userInfo.shippingAddresses[0]?.addressLine2 || "");
      setDesignation(userInfo.employee.designation || "");
      setEmployeeId(userInfo.employee.employeeId);
      setSalary(userInfo.employee.salary || "");
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, [accessToken, employeId]); 
  
  useEffect(() => {
    fetchPreviousData();
  }, [fetchPreviousData]); 
  

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
    setPhoneCode(selected.phoneCode);
    setFlag(selected.flag);
    setPhone(selected.phoneCode); 
  };
  

  useEffect(() => {
    fetchCountries();
    fetchPreviousData();
  }, [fetchPreviousData]);

  const handleDesignationChange = (e) => {
    setDesignation(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !phone || !state || !city || !postalCode || !addressLine1 || !selectedCountry || !designation || !salary) {
      alert("All fields except Address Line 2 are required.");
      return;
    }

    const formData = {
      name,
      email,
      country: selectedCountry,
      phone,
      state,
      city,
      postalCode,
      addressLine1,
      addressline2,
      designation,
      salary,
      phoneCode,
    };

    try {
      const request = await authService.updateUserData(accessToken, JSON.stringify(formData), employeId);
      setUpdateEmployeeModal(false);
      fetchData();
      setUpdateSuccessMsg(request.message);
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : "Error submitting form.";
      setUpdateErrorMsg(errorMessage);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50 text-gray-700">
      <div className="bg-white p-8 rounded-md w-10/12 max-w-full">
        <h2 className="text-xl font-semibold mb-6">Update Employee Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="block mb-2 font-semibold">Personal Information</div>
          <div className="border-gray-300 border-b border-1"></div>
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4 my-2">
            <div className="block">
              <label htmlFor="name" className="font-semibold text-sm">Full Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full mt-2 px-3 py-2 border border-gray-400 bg-transparent text-gray-800 focus:outline-none transition-all duration-300 text-base" placeholder="Name" required />
            </div>
            <div className="block">
              <label htmlFor="email" className="font-semibold text-sm">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full mt-2 px-3 py-2 border border-gray-400 bg-transparent text-gray-800 focus:outline-none transition-all duration-300 text-base" placeholder="Email" required />
            </div>
            <div className="block">
              <label htmlFor="country" className="font-semibold text-sm">Country</label>
              <select name="country" id="country" value={selectedCountry} onChange={handleCountryChange} required className="w-full mt-2 px-3 py-2 border border-gray-400 bg-transparent text-gray-800 focus:outline-none transition-all duration-300 text-base">
                <option value="">Select Country</option>
                {countries.map((country, index) => (
                  <option key={index} value={country.name}>{country.name}</option>
                ))}
              </select>
            </div>
            <div className="block">
              <label htmlFor="phone" className="font-semibold text-sm">Phone</label>
              <div className="relative w-full mt-2">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  {flag && <img src={flag} alt="flag" className="w-6 h-4" />}
                </div>
                <input type="text" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full pl-12 px-3 py-2 border border-gray-400 bg-transparent text-gray-800 focus:outline-none transition-all duration-300 text-base" placeholder="Phone" required />
              </div>
            </div>
            <div className="block">
              <label htmlFor="state" className="font-semibold text-sm">State</label>
              <input type="text" value={state} onChange={(e) => setState(e.target.value)} className="w-full mt-2 px-3 py-2 border border-gray-400 bg-transparent text-gray-800 focus:outline-none transition-all duration-300 text-base" placeholder="State" required />
            </div>
            <div className="block">
              <label htmlFor="city" className="font-semibold text-sm">City</label>
              <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className="w-full mt-2 px-3 py-2 border border-gray-400 bg-transparent text-gray-800 focus:outline-none transition-all duration-300 text-base" placeholder="City" required />
            </div>
            <div className="block">
              <label htmlFor="postalcode" className="font-semibold text-sm">Postal Code</label>
              <input type="number" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} className="w-full mt-2 px-3 py-2 border border-gray-400 bg-transparent text-gray-800 focus:outline-none transition-all duration-300 text-base" placeholder="Postal Code" />
            </div>
            <div className="block">
              <label htmlFor="addressLine1" className="font-semibold text-sm">Address Line 1</label>
              <input type="text" value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} className="w-full mt-2 px-3 py-2 border border-gray-400 bg-transparent text-gray-800 focus:outline-none transition-all duration-300 text-base" placeholder="Address Line 1" required />
            </div>
            <div className="block">
              <label htmlFor="addressline2" className="font-semibold texy-sm">Address Line 2</label>
              <input type="text" value={addressline2} onChange={(e) => setAddressLine2(e.target.value)} className="w-full mt-2 px-3 py-2 border border-gray-400 bg-transparent text-gray-800 focus:outline-none transition-all duration-300 text-base" placeholder="Address Line 2" />
            </div>
          </div>
          <div className="block mb-2 font-semibold mt-8">Employee Information</div>
          <div className="border-gray-300 border-b border-1"></div>
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4 my-2">
            <div className="block">
              <label htmlFor="designation" className="font-semibold text-sm">Designation</label>
              <select name="designation" id="designation" value={designation} onChange={handleDesignationChange} required className="w-full mt-2 px-3 py-2 border border-gray-400 bg-transparent text-gray-800 focus:outline-none transition-all duration-300 text-base">
                <option value="" disabled>Select Designation</option>
                {role === 'admin' && (
                  <>
                    <option value="admin">Admin</option>
                    <option value="hr">HR</option>
                    <option value="mm">Marketing Manager</option>
                    <option value="staff">Staff</option>
                  </>
                )}
                {role === 'hr' && (
                  <>
                    <option value="mm">Marketing Manager</option>
                    <option value="staff">Staff</option>
                  </>
                )}
              </select>
            </div>
            <div className="block">
              <label htmlFor="salary" className="font-semibold text-sm">Salary</label>
              <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} className="w-full mt-2 px-3 py-2 border border-gray-400 bg-transparent text-gray-800 focus:outline-none transition-all duration-300 text-base" placeholder="Salary" required />
            </div>
            <div className="block">
              <label htmlFor="employeeId" className="font-semibold text-sm">Empoyee Id</label>
              <input type="text" id="employeeId" value={employeeId} readOnly className="w-full mt-2 px-3 py-2 border border-gray-400 bg-transparent text-gray-800 focus:outline-none transition-all duration-300 text-base text-gray-600" />
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-10">
            <button type="submit" className="px-4 py-2 bg-gray-800 text-white hover:bg-gray-700 font-semibold">Update User</button>
            <button onClick={() => setUpdateEmployeeModal(false)} className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 font-semibold">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateEmployeeModal;
