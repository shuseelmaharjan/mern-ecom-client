import React, { useState, useEffect, useCallback } from "react";
import DateUtils from "../../utils/dateUtils";
import productService from "../../services/productService/productService";
import campaignService from "../../services/campaignService/campaignService";

const AddEngagement = ({
  setOpenCreateModal,
  campaign,
  accessToken,
  setToastMsg,
  setErrorEngagement,
  setEmptySelection,
}) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [estimatedProfit, setEstimatedProfit] = useState(null);
  const [engagementDetails, setEngagementDetails] = useState({});

  const checkEngagement = useCallback(
    async (productId) => {
      try {
        const response = await campaignService.checkEngagement({
          productId,
          campaignId: campaign._id,
          accessToken,
        });
        return response || { success: false };
      } catch (error) {
        console.error("Error checking engagement:", error.message);
        return { success: false };
      }
    },
    [campaign._id, accessToken]
  );

  const fetchProducts = useCallback(async () => {
    try {
      const response = await productService.getVendorsProduct(accessToken);
      const productsWithEngagements = await Promise.all(
        response.products.products.map(async (product) => {
          const engagementCheck = await checkEngagement(product._id);
          return {
            ...product,
            isEngaged: engagementCheck.success,
            engagementDetails: engagementCheck.data || null,
          };
        })
      );
      setProducts(productsWithEngagements);
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  }, [accessToken, checkEngagement]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const calculateProfit = (productPrice) => {
    if (!productPrice || !campaign.discountPercentage) return 0;
    const discountAmount = (productPrice * campaign.discountPercentage) / 100;
    return productPrice - discountAmount;
  };

  const handleProductChange = (e) => {
    const selectedId = e.target.value;
    setSelectedProduct(selectedId);

    const selectedProduct = products.find((product) => product._id === selectedId);
    if (selectedProduct) {
      const profit = calculateProfit(selectedProduct.price);
      setEstimatedProfit(profit);
      setEngagementDetails(selectedProduct.engagementDetails || {});
    }
  };

  const handleSubmit = async () => {
    if (selectedProduct) {
      setLoading(true);
      try {
        await campaignService.submitEngagement(
          accessToken,
          selectedProduct,
          campaign._id,
          campaign.expiryTime
        );
        setOpenCreateModal(false);
        setToastMsg("Engagement added successfully");
      } catch (error) {
        console.error("Error submitting engagement:", error.message);
        setErrorEngagement(error);
      } finally {
        setLoading(false);
      }
    } else {
      setEmptySelection("Please select a product");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full sm:w-8/12 md:w-8/12 lg:w-6/12 p-6">
        <h1>
          Create Engagement for {campaign.title}, Start on{" "}
          {DateUtils.formatDate(campaign.startTime)} ends on{" "}
          {DateUtils.formatDate(campaign.expiryTime)}, Sale Discount Amount{" "}
          {campaign.discountPercentage}%
        </h1>

        <div className="mt-4">
          <label htmlFor="product" className="block text-gray-700 font-semibold mb-2">
            Select Product
          </label>
          <select
            id="product"
            value={selectedProduct}
            onChange={handleProductChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select a product</option>
            {products.length > 0 ? (
              products.map((product) => (
                <option
                  key={product._id}
                  value={product._id}
                  disabled={product.isEngaged}
                >
                  {product.title}, In Stock {product.quantity}, Price {product.price}
                  {product.isEngaged && " (Engaged)"}
                </option>
              ))
            ) : (
              <option value="">No products available</option>
            )}
          </select>
        </div>

        {estimatedProfit !== null && (
          <div className="mt-4">
            <p className="text-gray-700 font-semibold">
              Estimated Profit: <span className="font-bold">${estimatedProfit.toFixed(2)}</span>
            </p>
          </div>
        )}

        {engagementDetails && engagementDetails.createdAt && (
          <div className="mt-4">
            <p className="text-gray-700">
              <strong>Engagement Found:</strong>
            </p>
            <p className="text-gray-500">
              Created At: {DateUtils.formatDate(engagementDetails.createdAt)}
            </p>
            <p className="text-gray-500">
              Expiry Time: {DateUtils.formatDate(engagementDetails.expiryTime)}
            </p>
          </div>
        )}

        <div className="flex justify-end gap-4 mt-4">
          <button
            type="button"
            onClick={handleSubmit}
            className={`px-4 py-2 bg-green-700 text-white font-semibold ${
              loading ? "cursor-not-allowed bg-green-500" : "hover:bg-green-800"
            }`}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            onClick={() => setOpenCreateModal(false)}
            className={`px-4 py-2 bg-red-500 text-white font-semibold ${
              loading ? "cursor-not-allowed bg-red-400" : "hover:bg-red-600"
            }`}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEngagement;
