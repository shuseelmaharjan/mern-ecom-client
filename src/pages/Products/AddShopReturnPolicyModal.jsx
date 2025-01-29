import React, { useState } from 'react';
import ReactQuill from "react-quill";
import apiHandler from '../../api/apiHandler';

const AddShopReturnPolicyModal = ({ setAddShopPolicyModal, accessToken, fetchShopPolicy }) => {
  const [formData, setFormData] = useState({
    policyName: '',
    policyDescription: ''
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

  const handleDescriptionChange = (value) => {
    setFormData({
      ...formData,
      policyDescription: value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.policyName) newErrors.policyName = 'Policy Name is required';
    if (!formData.policyDescription) newErrors.policyDescription = 'Policy Description is required';
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
      await apiHandler(formData, '/api/v2/create-shop-return-policy', 'POST', accessToken);
      setLoading(false);
      setAddShopPolicyModal(false);
      fetchShopPolicy();
    } catch (error) {
      setLoading(false);
      console.error('Error saving return policy:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full sm:w-8/12 md:w-6/12 lg:w-4/12 p-6">
        <h3 className="text-lg font-semibold mb-4">Add Return Policy</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="policyName">
              Policy Name
            </label>
            <input
              type="text"
              id="policyName"
              name="policyName"
              value={formData.policyName}
              onChange={handleChange}
              className={`w-full mt-2 px-3 py-2 border ${
                errors.policyName ? "border-red-500" : "border-gray-400"
              } bg-transparent text-gray-800 focus:outline-none transition-all duration-300 text-base`}
            />
            {errors.policyName && (
              <span className="text-red-500 text-sm">{errors.policyName}</span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="policyDescription">
              Policy Description
            </label>
            <ReactQuill
              value={formData.policyDescription}
              onChange={handleDescriptionChange}
              modules={{ toolbar: false }}
              theme="snow"
              className={`w-full mt-2 ${
                errors.policyDescription ? "border-red-500" : "border-gray-400"
              } bg-transparent text-gray-800 focus:outline-none transition-all duration-300 text-base`}
            />
            {errors.policyDescription && (
              <span className="text-red-500 text-sm">{errors.policyDescription}</span>
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
              onClick={() => setAddShopPolicyModal(false)}
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

export default AddShopReturnPolicyModal;