import React, { useEffect, useState, useCallback } from "react";
import { FaXmark } from "react-icons/fa6";
import apiHandler from "../../api/apiHandler";
import AddShopReturnPolicyModal from "./AddShopReturnPolicyModal";

const ChangeReturnPolicyModal = ({
  productId,
  setChangeReturnPolicyModal,
  accessToken,
  getInitialPolicyData,
}) => {
  const [defaultPolicy, setDefaultPolicy] = useState([]);
  const [shopPolicy, setShopPolicy] = useState([]);
  const [selectedPolicy, setSelectedPolicy] = useState("");

  const onClose = () => {
    setChangeReturnPolicyModal(false);
  };

  const fetchDefaultPolicy = useCallback(async () => {
    try {
      const data = await apiHandler(
        null,
        "/api/v1/get-return-policy",
        "GET",
        accessToken
      );
      setDefaultPolicy(data);
    } catch (err) {
      console.error("Error fetching default policy:", err);
    }
  }, [accessToken]);

  const fetchShopPolicy = useCallback(async () => {
    try {
      const data = await apiHandler(
        null,
        "/api/v1/get-shop-return-policy",
        "GET",
        accessToken
      );
      setShopPolicy(data);
    } catch (err) {
      console.error("Error fetching shop policy:", err);
    }
  }, [accessToken]);

  const fetchProductPolicy = useCallback(async () => {
    try {
      const data = await apiHandler(
        null,
        `/api/v1/get-product-policy/${productId}`,
        "GET",
        accessToken
      );

      if (data.defaultReturnPolicy) {
        const defaultPolicyItem = defaultPolicy.find(
          (policy) => policy.isDefault
        );
        if (defaultPolicyItem) {
          setSelectedPolicy(defaultPolicyItem._id);
        }
      } else if (data.returnPolicy?._id) {
        setSelectedPolicy(data.returnPolicy._id);
      }
    } catch (err) {
      console.error("Error fetching product policy:", err);
    }
  }, [productId, accessToken, defaultPolicy]);

  useEffect(() => {
    fetchDefaultPolicy();
    fetchShopPolicy();
  }, [fetchDefaultPolicy, fetchShopPolicy]);

  useEffect(() => {
    if (defaultPolicy.length > 0 || shopPolicy.length > 0) {
      fetchProductPolicy();
    }
  }, [fetchProductPolicy, defaultPolicy, shopPolicy]);

  const handlePolicyClick = (policyId) => {
    setSelectedPolicy(policyId);
  };

  const handleAddPolicy = async () => {
    const isDefault = defaultPolicy.some(
      (policy) => policy._id === selectedPolicy
    );
    const payload = {
      defaultReturnPolicy: isDefault,
      returnPolicy: isDefault ? "" : selectedPolicy,
    };

    try {
      await apiHandler(
        payload,
        `/api/v1/update-product-policy/${productId}`,
        "PUT",
        accessToken
      );
      getInitialPolicyData();
      setChangeReturnPolicyModal(false);
    } catch (err) {
      console.error("Error updating policy:", err);
    }
  };

  const [addShopPolicyModal, setAddShopPolicyModal] = useState(false);
  const handleAddAnotherPolicy = () => {
    setAddShopPolicyModal(true);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-white text-gray-700 p-4 md:p-8">
      <button
        type="button"
        className="absolute top-4 right-4 text-gray-500 text-2xl border-gray-500 rounded-full border-2 p-2 md:p-4 hover:text-gray-700"
        onClick={onClose}
      >
        <FaXmark />
      </button>
      <div className="p-6 bg-white rounded-lg shadow-lg w-full max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Change Return Policy</h2>
          <button
            type="button"
            className="bg-gray-800 text-white font-bold px-4 py-2 hover:bg-gray-700 rounded-full"
            onClick={handleAddAnotherPolicy}
          >
            Add New Policy
          </button>
        </div>

        {defaultPolicy.length > 0 && (
          <div className="space-y-4">
            {defaultPolicy.map((policy) => (
              <div
                key={policy._id}
                className={`policy-item p-4 border rounded-lg shadow-md ${
                  selectedPolicy === policy._id ? "bg-gray-300" : ""
                }`}
                onClick={() => handlePolicyClick(policy._id)}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-gray-800">
                    {policy.policyName}
                  </h3>
                  {policy.isDefault && (
                    <span className="bg-gray-100 px-4 py-2 border-gray-800 border-2 rounded-full text-gray-800">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-gray-600">{policy.policyDescription}</p>
              </div>
            ))}
          </div>
        )}

        {shopPolicy.length > 0 && (
          <div className="space-y-4 mt-6">
            {shopPolicy.map((policy) => (
              <div
                key={policy._id}
                className={`policy-item p-4 border rounded-lg shadow-md ${
                  selectedPolicy === policy._id ? "bg-gray-300" : ""
                }`}
                onClick={() => handlePolicyClick(policy._id)}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-gray-800">
                    {policy.policyName}
                  </h3>
                </div>
                <p className="text-gray-600">{policy.policyDescription}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6">
          <button
            type="button"
            className="bg-gray-800 text-white w-full font-bold px-4 py-2 hover:bg-gray-700 rounded-full"
            onClick={handleAddPolicy}
          >
            Update Policy
          </button>
        </div>
      </div>
      {addShopPolicyModal && (
        <AddShopReturnPolicyModal
          setAddShopPolicyModal={setAddShopPolicyModal}
          accessToken={accessToken}
          fetchShopPolicy={fetchShopPolicy}
        />
      )}
    </div>
  );
};

export default ChangeReturnPolicyModal;