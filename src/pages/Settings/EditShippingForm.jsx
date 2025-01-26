import React, { useState, useEffect } from "react";
import sitePolicyService from "../../services/sitePolicyService/sitePolicyService";

const EditShippingForm = ({ fetchData, setEditForm, editData, accessToken }) => {
  const [formData, setFormData] = useState({
    shippingPolicyName: "",
    shippingMethod: "",
    shippingDays: "",
    shippingPolicyDescription: "",
    costofDelivery: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    shippingPolicyName: "",
    shippingMethod: "",
    shippingDays: "",
    shippingPolicyDescription: "",
    costofDelivery: "",
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        shippingPolicyName: editData.shippingPolicyName || "",
        shippingMethod: editData.shippingMethod || "",
        shippingDays: editData.shippingDays || "",
        shippingPolicyDescription: editData.shippingPolicyDescription || "",
        costofDelivery: editData.costofDelivery || "",
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.shippingPolicyName.trim()) {
      newErrors.shippingPolicyName = "Shipping Policy Name is required";
    }

    if (!formData.shippingMethod.trim()) {
      newErrors.shippingMethod = "Shipping Method is required";
    }
    if (!formData.shippingDays.trim()) {
      newErrors.shippingDays = "Shipping Days is required";
    }
    if (!formData.shippingPolicyDescription.trim()) {
      newErrors.shippingPolicyDescription = "Shipping Description is required";
    }
    if (!formData.costofDelivery.trim()) {
      newErrors.costofDelivery = "Cost of Delivery is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const response = await sitePolicyService.updateShippingPolicy(
        formData,
        accessToken,
        editData._id
      );
      console.log(response.data);
      fetchData();
      setEditForm(false);
    } catch (error) {
      console.error("Error updating shipping policy:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full sm:w-8/12 md:w-8/12 lg:w-6/12 p-6">
        <h3 className="text-lg font-semibold mb-4">Edit Shipping Policy</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="shippingPolicyName"
            >
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
              <span className="text-red-500 text-sm">
                {errors.shippingPolicyName}
              </span>
            )}
          </div>

          <div className="flex gap-10">
            <div className="mb-4 w-4/12">
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="shippingMethod"
              >
                Shipping Method
              </label>
              <input
                type="text"
                id="shippingMethod"
                name="shippingMethod"
                value={formData.shippingMethod}
                onChange={handleChange}
                className={`w-full mt-2 px-3 py-2 border ${
                  errors.shippingMethod ? "border-red-500" : "border-gray-400"
                } bg-transparent text-gray-800 focus:outline-none transition-all duration-300 text-base`}
              />
              {errors.shippingMethod && (
                <span className="text-red-500 text-sm">
                  {errors.shippingMethod}
                </span>
              )}
            </div>

            <div className="mb-4 w-4/12">
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="shippingDays"
              >
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
                <span className="text-red-500 text-sm">
                  {errors.shippingDays}
                </span>
              )}
            </div>

            <div className="mb-4 w-4/12">
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="costofDelivery"
              >
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
                <span className="text-red-500 text-sm">
                  {errors.costofDelivery}
                </span>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="shippingPolicyDescription"
            >
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
                errors.shippingPolicyDescription
                  ? "border-red-500"
                  : "border-gray-400"
              } bg-transparent text-gray-800 focus:outline-none transition-all duration-300 text-base`}
            ></textarea>
            {errors.shippingPolicyDescription && (
              <span className="text-red-500 text-sm">
                {errors.shippingPolicyDescription}
              </span>
            )}
          </div>

          <div className="flex justify-end gap-4 mt-4">
            <button
              type="submit"
              className={`px-4 py-2 bg-green-700 text-white font-semibold ${
                loading
                  ? "cursor-not-allowed bg-green-500"
                  : "hover:bg-green-800"
              }`}
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
            </button>
            <button
              type="button"
              onClick={() => setEditForm(false)}
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

export default EditShippingForm;
