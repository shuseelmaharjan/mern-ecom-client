import React, { useEffect, useState, useCallback } from "react";
import sitePolicyService from "../../services/sitePolicyService/sitePolicyService";
import DateUtils from "../../utils/dateUtils";
import { FaRegTrashAlt } from "react-icons/fa";

const ShopShippingPolicy = ({ accessToken, shopId, setSuccessMsg, setErrorMsg, callNewData }) => {
  const [data, setData] = useState([]);

  const fetchDataInternal = useCallback(async () => {
    try {
      const response = await sitePolicyService.getShopShippingPolicyData(shopId);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [shopId]);

  useEffect(() => {
    fetchDataInternal();
  }, [fetchDataInternal]);

  const handleDeactivatePolicy = async (policyId) => {
    try {
      await sitePolicyService.deactivateShopShippingPolicy(policyId, accessToken);
      setSuccessMsg("Shipping policy deactivated successfully");
      fetchDataInternal();
    } catch (error) {
      setErrorMsg("Error deactivating shipping policy");
      console.error("Error deactivating shipping policy:", error);
    }
  };

  useEffect(() => {
    if (callNewData) {
      fetchDataInternal();
    }
  }, [callNewData, fetchDataInternal]);

  return (
    <div>
      {data.length > 0 ? (
        <>
          {data.map((item, index) => (
            <div key={index} className="w-full p-4 border border-gray-300 shadow-sm mb-4 rounded-lg">
              <div className="flex flex-col text-sm">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex gap-4 items-center">
                    <span className="font-semibold text-base">{item.shippingPolicyName}</span>
                    <span className="italic">Created At: {DateUtils.formatDate(item.createdAt)}</span>
                  </div>
                  <button
                    onClick={() => handleDeactivatePolicy(item._id)}
                    className="px-3 py-1 border-2 border-red-500 rounded-full bg-red-500 text-white flex items-center gap-2"
                  >
                    <FaRegTrashAlt /> Remove
                  </button>
                </div>
                <div className="flex flex-wrap mt-2">
                  <div className="mr-4">
                    <span className="font-semibold">Delivery Days:</span>
                    <span className="mx-2">{item.shippingDays}</span>
                  </div>
                  <div>
                    <span className="font-semibold">Delivery Cost:</span>
                    <span className="mx-2">{item.costofDelivery}</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="font-semibold">Description:</span>
                  <span className="mx-2">{item.shippingPolicyDescription}</span>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ShopShippingPolicy;