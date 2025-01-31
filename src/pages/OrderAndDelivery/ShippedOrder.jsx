import React, { useState } from "react";
import DateUtils from "../../utils/dateUtils";
import orderService from "../../services/orderService/orderService";

const ShippedOrder = ({
  orderDetails,
  loading: initialLoading,
  accessToken,
  fetchOrderDetails,
}) => {
  const [loading, setLoading] = useState(initialLoading);
  const orderId = orderDetails._id;

  const handleCompleteDelivery = async () => {
    setLoading(true);
    try {
      await orderService.completeDelivery(orderId, accessToken);
      fetchOrderDetails();
    } catch (error) {
      console.error("Error completing delivery:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      {loading ? (
        <div className="animate-pulse flex flex-col space-y-4">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
        </div>
      ) : (
        orderDetails && (
          <div className="w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Shipping Information
              </h3>
            </div>
            <div className="flex flex-col border border-gray-300 p-4 mt-4">
              <div className="flex justify-between items-center mb-4">
                <p>
                  <strong>Method: </strong>
                  {orderDetails.shippingMethod?.shippingCompany || "N/A"}
                </p>
                <p>
                  <strong>COD: </strong>${orderDetails.logisticCost}
                </p>
                <p>
                  <strong>Shipped At: </strong>
                  {orderDetails.shippingDate
                    ? DateUtils.formatDate(orderDetails.shippingDate)
                    : "N/A"}
                </p>
              </div>
              <p>
                <strong>Tracking Number: </strong>
                {orderDetails.trackingNumber || "N/A"}
              </p>
            </div>
          </div>
        )
      )}

      <div className="flex justify-end items-center mt-4">
        <button
          type="submit"
          className={`px-4 py-2 bg-gray-800 text-white ml-auto font-semibold ${
            loading ? "cursor-not-allowed bg-gray-800" : "hover:bg-gray-700"
          }`}
          disabled={loading}
          onClick={handleCompleteDelivery}
        >
          {loading ? "Delivering..." : "Order Delivered"}
        </button>
      </div>
    </div>
  );
};

export default ShippedOrder;