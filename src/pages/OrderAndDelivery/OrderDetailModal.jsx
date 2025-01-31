import React, { useCallback, useEffect, useState } from "react";
import apiHandler from "../../api/apiHandler";
import config from "../../services/config";
import DateUtils from "../../utils/dateUtils";
import UpdateProductOrder from "./UpdateProductOrder";
import { FaXmark } from "react-icons/fa6";
import ShippedOrder from "./ShippedOrder";

const OrderDetailModal = ({ selectedOrderId, setOrderModal, accessToken }) => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderStatus, setOrderStatus] = useState(null);

  const BASE_URL = config.API_BASE_URL;

  const fetchOrderDetails = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiHandler(
        null,
        `/api/v1/order-details/${selectedOrderId}`,
        "GET",
        accessToken
      );
      setOrderDetails(data);
      setOrderStatus(data.order.orderStatus);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [selectedOrderId, accessToken]);

  useEffect(() => {
    fetchOrderDetails();
  }, [fetchOrderDetails]);

  return (
    <div>
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white w-full md:w-1/2 lg:w-1/3 rounded-lg p-4 md:p-6" style={{ minHeight: '300px' }}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg md:text-xl font-semibold text-gray-800">
              {loading ? 'Loading...' : `Order Details #${orderDetails?.order?.orderId}`}
            </h2>
            <button
              onClick={() => setOrderModal(false)}
              className="text-gray-700 hover:text-gray-800"
            >
              <FaXmark />
            </button>
          </div>

          {loading ? (
            <div className="animate-pulse">
              <div className="flex mb-4">
                <div className="w-3/12 h-24 bg-gray-300 rounded"></div>
                <div className="ml-4 flex-grow space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </div>
            </div>
          ) : error ? (
            <div className="text-red-600 text-center">{error}</div>
          ) : (
            orderDetails && (
              <div>
                <div className="mb-4">
                  <div className="flex">
                    <img
                      src={`${BASE_URL}${orderDetails.product.image}`}
                      alt={orderDetails.product.title}
                      className="w-3/12 h-auto"
                    />
                    <div className="ml-4">
                      <h1 className="text-lg font-semibold mb-4">
                        {orderDetails.product.title}
                      </h1>
                      <p>
                        <strong>SKU:</strong> {orderDetails.order.sku}
                      </p>
                      <p>
                        <strong>Price:</strong> ${orderDetails.product.price}
                      </p>
                      <p>
                        <strong>Quantity:</strong> {orderDetails.order.quantity}
                      </p>
                      <p>
                        <strong>Stock:</strong> {orderDetails.product.stock}
                      </p>
                      <p>
                        <strong>Order Status:</strong>{" "}
                        {orderDetails.order.orderStatus}
                      </p>
                      <p>
                        <strong>Payment Status:</strong>{" "}
                        {orderDetails.order.paymentStatus}
                      </p>
                      <p>
                        <strong>Total Cost:</strong> $
                        {orderDetails.order.productCost +
                          orderDetails.order.shippingCost -
                          orderDetails.order.discount}
                      </p>
                      <p>
                        <strong>Order Date:</strong>{" "}
                        {DateUtils.formatDate(orderDetails.order.orderDate)}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-md font-semibold text-gray-800">
                    Receiver Information
                  </h3>
                  <div className="flex flex-col border border-gray-300 p-4 mt-4">
                    <p>
                      <strong>Name:</strong> {orderDetails.order.receiverName}
                    </p>
                    <p>
                      <strong>Phone:</strong> {orderDetails.order.receiverPhone}
                    </p>
                    <p>
                      <strong>Email:</strong> {orderDetails.order.receiverEmail}
                    </p>
                    <p>
                      <strong>Address:</strong>{" "}
                      {orderDetails.order.receiverAddress},{" "}
                      {orderDetails.order.receiverCity},{" "}
                      {orderDetails.order.receiverState},{" "}
                      {orderDetails.order.receiverPostalCode},{" "}
                      {orderDetails.order.receiverCountry}
                    </p>
                  </div>
                </div>
              </div>
            )
          )}

          {orderStatus === "PENDING" && (
            <UpdateProductOrder
              orderId={selectedOrderId}
              accessToken={accessToken}
              fetchOrderDetails={fetchOrderDetails}
            />
          )}
          {orderStatus === "SHIPPED" && (
            <ShippedOrder
              orderDetails={orderDetails.order}
              loading={loading}
              accessToken={accessToken}
              fetchOrderDetails={fetchOrderDetails}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailModal;