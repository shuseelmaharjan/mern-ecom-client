import React, { useState } from 'react';
import axios from 'axios';
import config from "../../services/config";

const AddShippingPolicyModal = ({ setShippingPolicyModal, shopId, accessToken, setSuccessMsg, setErrorMsg, fetchData, setCallNewData }) => {
  const [formData, setFormData] = useState({
    shippingPolicyName: '',
    shippingDays: '',
    costofDelivery: '',
    shippingPolicyDescription: ''
  });
  const BASE_URL = config.API_BASE_URL;

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
    if (!formData.shippingPolicyName) newErrors.shippingPolicyName = 'Shipping Policy Name is required';
    if (!formData.shippingDays) newErrors.shippingDays = 'Shipping Days are required';
    if (!formData.costofDelivery) newErrors.costofDelivery = 'Cost of Delivery is required';
    if (!formData.shippingPolicyDescription) newErrors.shippingPolicyDescription = 'Shipping Policy Description is required';
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
    setCallNewData(true);
    try {
      await axios.post(
        `${BASE_URL}/api/v1/${shopId}/add-shipping-policy`,
        { ...formData },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          }
        }
      );
      fetchData()
      setLoading(false);
      setShippingPolicyModal(false);
      setSuccessMsg('Shipping Policy added successfully');
    } catch (error) {
      setLoading(false);
      setErrorMsg('Error adding shipping policy');
      console.error('Error saving shipping policy:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full sm:w-8/12 md:w-6/12 lg:w-4/12 p-6">
        <h3 className="text-lg font-semibold mb-4">Add Shipping Policy</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="shippingPolicyName">
              Shipping Policy Name
            </label>
            <input
              type="text"
              id="shippingPolicyName"
              name="shippingPolicyName"
              value={formData.shippingPolicyName}
              onChange={handleChange}
              className={`w-full mt-2 px-3 py-2 border ${
                errors.shippingPolicyName ? "border-red-500" : "border-gray-400"
              } bg-transparent text-gray-800 focus:outline-none transition-all duration-300 text-base`}
            />
            {errors.shippingPolicyName && (
              <span className="text-red-500 text-sm">{errors.shippingPolicyName}</span>
            )}
          </div>

          <div className="flex gap-10">
            <div className="mb-4 w-6/12">
              <label className="block text-sm font-medium mb-2" htmlFor="shippingDays">
                Shipping Days
              </label>
              <input
                type="text"
                id="shippingDays"
                name="shippingDays"
                value={formData.shippingDays}
                onChange={handleChange}
                className={`w-full mt-2 px-3 py-2 border ${
                  errors.shippingDays ? "border-red-500" : "border-gray-400"
                } bg-transparent text-gray-800 focus:outline-none transition-all duration-300 text-base`}
              />
              {errors.shippingDays && (
                <span className="text-red-500 text-sm">{errors.shippingDays}</span>
              )}
            </div>

            <div className="mb-4 w-6/12">
              <label className="block text-sm font-medium mb-2" htmlFor="costofDelivery">
                Cost of Delivery
              </label>
              <input
                type="number"
                id="costofDelivery"
                name="costofDelivery"
                value={formData.costofDelivery}
                onChange={handleChange}
                className={`w-full mt-2 px-3 py-2 border ${
                  errors.costofDelivery ? "border-red-500" : "border-gray-400"
                } bg-transparent text-gray-800 focus:outline-none transition-all duration-300 text-base`}
              />
              {errors.costofDelivery && (
                <span className="text-red-500 text-sm">{errors.costofDelivery}</span>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="shippingPolicyDescription">
              Shipping Policy Description
            </label>
            <textarea
              id="shippingPolicyDescription"
              name="shippingPolicyDescription"
              value={formData.shippingPolicyDescription}
              onChange={handleChange}
              rows="4"
              cols="50"
              className={`w-full mt-2 px-3 py-2 border ${
                errors.shippingPolicyDescription ? "border-red-500" : "border-gray-400"
              } bg-transparent text-gray-800 focus:outline-none transition-all duration-300 text-base`}
            ></textarea>
            {errors.shippingPolicyDescription && (
              <span className="text-red-500 text-sm">{errors.shippingPolicyDescription}</span>
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
              onClick={() => setShippingPolicyModal(false)}
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
  );
};

export default AddShippingPolicyModal;