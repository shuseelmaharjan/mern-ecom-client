import React, { useEffect, useState } from 'react';
import apiHandler from '../../api/apiHandler';

const UpdateProductOrder = ({ orderId, accessToken, fetchOrderDetails }) => {
  const [logisticService, setLogisticService] = useState([]);
  const [formData, setFormData] = useState({
    logisticService: '',
    trackingNumber: '',
    logisticCost: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogistic = async () => {
      try {
        const data = await apiHandler(null, `/api/v1/shipping-methods`, 'GET', accessToken);
        setLogisticService(data);
      } catch (error) {
        console.error("Error getting logistic service:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLogistic();
  }, [accessToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.logisticService) newErrors.logisticService = 'Logistic Service is required';
    if (!formData.trackingNumber) newErrors.trackingNumber = 'Tracking Number is required';
    if (!formData.logisticCost) newErrors.logisticCost = 'Logistic Cost is required';
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
        shippingMethod: formData.logisticService,
        trackingNumber: formData.trackingNumber,
        logisticCost: formData.logisticCost
      };
      await apiHandler(data, `/api/v1/place-order/${orderId}`, 'PUT', accessToken);
      fetchOrderDetails();
    } catch (error) {
      console.error("Error updating product order:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <div className="animate-pulse flex flex-col space-y-4">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
        </div>
      ) : (
        <div className="flex flex-col mt-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-4 space-y-2">
              <label htmlFor="logisticService">Logistic Service</label>
              <select
                name="logisticService"
                id="logisticService"
                value={formData.logisticService}
                onChange={handleChange}
                className={`w-full border ${errors.logisticService ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
              >
                <option value="">Select Logistic Service</option>
                {logisticService.map((service) => (
                  <option key={service._id} value={service._id}>{service.shippingCompany}</option>
                ))}
              </select>
              {errors.logisticService && (
                <span className="text-red-500 text-sm">{errors.logisticService}</span>
              )}
            </div>
            <div className="mb-4 space-y-2">
              <label htmlFor="trackingNumber">Tracking Number</label>
              <input
                type="text"
                name="trackingNumber"
                id="trackingNumber"
                value={formData.trackingNumber}
                onChange={handleChange}
                className={`w-full border ${errors.trackingNumber ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
              />
              {errors.trackingNumber && (
                <span className="text-red-500 text-sm">{errors.trackingNumber}</span>
              )}
            </div>
            <div className="mb-4 space-y-2">
              <label htmlFor="logisticCost">Logistic Cost</label>
              <input
                type="text"
                name="logisticCost"
                id="logisticCost"
                value={formData.logisticCost}
                onChange={handleChange}
                className={`w-full border ${errors.logisticCost ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
              />
              {errors.logisticCost && (
                <span className="text-red-500 text-sm">{errors.logisticCost}</span>
              )}
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className={`px-4 py-2 bg-gray-800 text-white ml-auto font-semibold ${loading ? 'cursor-not-allowed bg-gray-800' : 'hover:bg-gray-700'}`}
                disabled={loading}
              >
                {loading ? 'Placing...' : 'Place Order'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateProductOrder;