import React, { useState } from 'react';
import apiHandler from '../../api/apiHandler';

const AddShippingMethodModal = ({ setShippingMethodModal, accessToken, setSuccessMsg, setErrorMsg, fetchData, setCallNewData }) => {
  const [formData, setFormData] = useState({
    name: '',
    shippingCompany: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Logistic Name is required';
    if (!formData.shippingCompany) newErrors.shippingCompany = 'Shipping Company is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setLoading(true);
    try {
      const data = {
        name: formData.name,
        shippingCompany: formData.shippingCompany,
      };
      await apiHandler(data, '/api/v1/create-logistic-company', 'POST', accessToken);
      setSuccessMsg('Shipping method created successfully');
      setShippingMethodModal(false);
      fetchData();
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
      setCallNewData(false);
    }
  };

  return (
    <div>
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white w-full md:w-1/2 lg:w-1/3 rounded-lg p-4 md:p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg md:text-xl font-semibold text-gray-800">
              Add Shipping Method
            </h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="name">Logistic Name</label>
              <input type="text" id='name' name='name' value={formData.name} onChange={handleChange} className={`w-full mt-2 px-3 py-2 border ${
                errors.name ? "border-red-500" : "border-gray-400"
              } bg-transparent text-gray-800 focus:outline-none transition-all duration-300 text-base`}
              />
              {errors.name && (
                <span className="text-red-500 text-sm">{errors.name}</span>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="shippingCompany">Shipping Company</label>
              <input type="text" id='shippingCompany' name='shippingCompany' value={formData.shippingCompany} onChange={handleChange} className={`w-full mt-2 px-3 py-2 border ${
                errors.shippingCompany ? "border-red-500" : "border-gray-400"
              } bg-transparent text-gray-800 focus:outline-none transition-all duration-300 text-base`}
              />
              {errors.shippingCompany && (
                <span className="text-red-500 text-sm">{errors.shippingCompany}</span>
              )}
            </div>
            <div className="flex justify-end gap-4 mt-4">
              <button
                type="submit"
                className={`px-4 py-2 bg-green-700 text-white font-semibold ${
                  loading ? "cursor-not-allowed bg-green-500" : "hover:bg-green-800"
                }`}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
              <button
                type="button"
                onClick={() => setShippingMethodModal(false)}
                className={`px-4 py-2 bg-red-500 text-white font-semibold ${
                  loading ? "cursor-not-allowed bg-red-400" : "hover:bg-red-600"
                }`}
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddShippingMethodModal;