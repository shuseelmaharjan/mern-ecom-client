import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiHandler from '../../api/apiHandler';
import { useAuth } from "../../context/AuthContext";
import Pagination from '../../helper/Pagination';

const OrderAndDelivery = () => {
  const { orderPage: paramOrderPage } = useParams();
  const navigate = useNavigate();
  const { accessToken } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const defaultTab = "pending";

  const orderPage = paramOrderPage || defaultTab;
  
  useEffect(() => {
    if (!paramOrderPage) {
      navigate(`/order-and-delivery/pending`, { replace: true });
    }
  }, [paramOrderPage, navigate]);

  const activeTab = orderPage ? orderPage.toUpperCase() : 'PENDING';

  const fetchOrders = useCallback(async (status, date) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiHandler(null, `/api/v1/shop-orders/${status}/${date}`, 'GET', accessToken);
      setOrders(response);
    } catch (error) {
      setError('Error fetching orders, please try again.');
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    let date;
    switch (activeTab) {
      case 'PENDING':
        date = 'all';
        break;
      case 'SHIPPED':
        date = 'last-week';
        break;
      case 'DELIVERED':
        date = 'last-month';
        break;
      case 'CANCELLED':
        date = 'last-year';
        break;
      default:
        date = 'all';
    }
    fetchOrders(activeTab, date);
  }, [activeTab, fetchOrders]);

  const handleTabClick = (tab) => {
    navigate(`/order-and-delivery/${tab.toLowerCase()}`);
    setCurrentPage(1);
  };

  const handlePageChange = (direction) => {
    setCurrentPage(prev => direction === 'next' ? prev + 1 : prev - 1);
  };

  const handleItemsPerPageChange = (newSize) => {
    setItemsPerPage(newSize);
    setCurrentPage(1);
  };

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="block w-full h-auto p-4 md:p-6 shadow-lg rounded-lg gap-4 lg:gap-6 border-gray-100 border-2">
      <div className="flex flex-wrap gap-2 mb-4">
        {['PENDING', 'SHIPPED', 'DELIVERED', 'CANCELLED'].map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={`py-2 px-4 rounded-lg text-sm md:text-base transition-colors ${
              activeTab === tab 
                ? 'bg-gray-800 text-white hover:bg-gray-700' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {loading && (
        <div className="flex justify-center items-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600"></div>
        </div>
      )}

      {error && (
        <div className="text-red-600 text-center p-4 bg-red-50 rounded-lg">
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-4 py-3 text-left text-xs md:text-sm font-medium text-white">Order ID</th>
                  <th className="px-4 py-3 text-left text-xs md:text-sm font-medium text-white hidden md:table-cell">Status</th>
                  <th className="px-4 py-3 text-left text-xs md:text-sm font-medium text-white">Product</th>
                  <th className="px-4 py-3 text-left text-xs md:text-sm font-medium text-white hidden lg:table-cell">Payment</th>
                  <th className="px-4 py-3 text-left text-xs md:text-sm font-medium text-white hidden lg:table-cell">Customer</th>
                  <th className="px-4 py-3 text-left text-xs md:text-sm font-medium text-white">Qty</th>
                  <th className="px-4 py-3 text-left text-xs md:text-sm font-medium text-white hidden sm:table-cell">Total</th>
                  <th className="px-4 py-3 text-left text-xs md:text-sm font-medium text-white">Date</th>
                  <th className="px-4 py-3 text-left text-xs md:text-sm font-medium text-white">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentOrders.length > 0 ? (
                  currentOrders.map((order) => (
                    <tr key={order._id}>
                      <td className="px-4 py-3 text-sm text-gray-900">#{order.orderId}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 hidden md:table-cell">
                        <span className={`px-2 py-1 rounded-full ${
                          order.orderStatus === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                          order.orderStatus === 'SHIPPED' ? 'bg-blue-100 text-blue-800' :
                          order.orderStatus === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {order.orderStatus}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">{order.orderItem?.title}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 hidden lg:table-cell">{order.paymentStatus}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 hidden lg:table-cell">{order.orderBy?.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{order.quantity}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 hidden sm:table-cell">
                        ${(order.productCost + order.shippingCost).toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {new Date(order.orderDate).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-sm space-x-2">
                        {(activeTab === 'PENDING' || activeTab === 'SHIPPED') && (
                          <>
                            <button
                              className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-xs md:text-sm"
                              onClick={() => {/* Mark shipped/delivered logic */}}
                            >
                              {activeTab === 'PENDING' ? 'Process' : 'Deliver'}
                            </button>
                            <button
                              className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 text-xs md:text-sm"
                              onClick={() => {/* Cancel logic */}}
                            >
                              Cancel
                            </button>
                          </>
                        )}
                        {(activeTab === 'DELIVERED' || activeTab === 'CANCELLED') && (
                          <button
                            className="px-3 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-700 text-xs md:text-sm"
                            onClick={() => window.print()}
                          >
                            Print
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="px-4 py-6 text-center text-gray-500">
                      No orders found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <Pagination
            totalItems={orders.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        </>
      )}
    </div>
  );
};

export default OrderAndDelivery;