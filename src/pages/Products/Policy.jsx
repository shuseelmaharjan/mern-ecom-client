import React, { useEffect, useState, useCallback } from "react";
import apiHandler from "../../api/apiHandler";
import ChangeReturnPolicyModal from "./ChangeReturnPolicyModal";

const Policy = ({ productId, accessToken }) => {
  const [defaultShipping, setDefaultShipping] = useState(null);
  const [defaultReturnPolicy, setDefaultReturnPolicy] = useState(null);
  const [shippingPolicies, setShippingPolicies] = useState([]);
  const [returnPolicies, setReturnPolicies] = useState([]);
  const [returnPolicy, setReturnPolicy] = useState(null);

  const getInitialPolicyData = useCallback(async () => {
    try {
      const data = await apiHandler(
        null,
        `/api/v1/get-product-policy/${productId}`,
        "GET",
        accessToken
      );
      setDefaultShipping(data.defaultShipping);
      setDefaultReturnPolicy(data.defaultReturnPolicy);

      if (data.defaultShipping) {
        const shippingData = await apiHandler(
          null,
          `/api/v1/get-shipping-policy`,
          "GET",
          accessToken
        );
        setShippingPolicies(shippingData);
      }

      if (data.defaultReturnPolicy) {
        const returnData = await apiHandler(
          null,
          `/api/v1/get-return-policy`,
          "GET",
          accessToken
        );
        setReturnPolicies(returnData);
      } else {
        setReturnPolicy(data.returnPolicy);
      }
    } catch (err) {
      console.error(err);
    }
  }, [productId, accessToken]);

  useEffect(() => {
    getInitialPolicyData();
  }, [getInitialPolicyData]);

  const [changeReturnPolicyModal, setChangeReturnPolicyModal] = useState(false);
  const handleChangeReturnPolicy = () => {
    setChangeReturnPolicyModal(true);
  };

  return (
    <div className="flex flex-col space-y-2 mt-4">
      <h2 className="text-gray-800 text-lg font-bold">Shipping Policies</h2>
      {shippingPolicies.length > 0 ? (
        <>
          {shippingPolicies.map((policy) => (
            <div
              key={policy._id}
              className="policy-item p-4 border rounded-lg shadow-md"
            >
              {defaultReturnPolicy ? (
                <div className="flex mb-4">
                  <h3 className="text-gray-800 font-semibold">
                    {policy.shippingMethod}
                  </h3>
                  <div className="ml-4">
                    <span className="text-gray-800 bg-gray-100 px-4 py-2 border-gray-800 border-2 rounded-full">
                      Default
                    </span>
                  </div>
                </div>
              ) : (
                <h3 className="text-gray-800 font-semibold">
                  {policy.shippingMethod}
                </h3>
              )}
              <p className="text-gray-600">{policy.shippingDays}</p>
              <p className="text-gray-600">
                {policy.shippingPolicyDescription}
              </p>
            </div>
          ))}

          <div className="mt-4 py-6">
            <button
              type="button"
              className="bg-gray-800 text-white w-6/12 md:w-1/12 font-bold px-4 py-2 hover:bg-gray-700 rounded-full"
            >
              Change Policy
            </button>
          </div>
        </>
      ) : (
        <p className="text-gray-600">No shipping policies available.</p>
      )}

      <h2 className="text-gray-800 text-lg font-bold mt-4">Return Policies</h2>
      {defaultReturnPolicy ? (
        <>
          {returnPolicies.map((policy) => (
            <div
              key={policy._id}
              className="policy-item p-4 border rounded-lg shadow-md"
            >
              {policy.isDefault ? (
                <div className="flex mb-4">
                  <h3 className="text-gray-800 font-semibold">
                    {policy.policyName}
                  </h3>
                  <div className="ml-4">
                    <span className="text-gray-800 bg-gray-100 px-4 py-2 border-gray-800 border-2 rounded-full">
                      Default
                    </span>
                  </div>
                </div>
              ) : (
                <h3 className="text-gray-800 font-semibold">
                  {policy.policyName}
                </h3>
              )}
              <p className="text-gray-600">{policy.policyDescription}</p>
            </div>
          ))}

          <div className="mt-4 py-6">
            <button
              type="button"
              className="bg-gray-800 text-white w-6/12 md:w-1/12 font-bold px-4 py-2 hover:bg-gray-700 rounded-full"
              onClick={handleChangeReturnPolicy}
            >
              Change Policy
            </button>
          </div>
        </>
      ) : (
        returnPolicy && (
            <>
          <div className="policy-item p-4 border rounded-lg shadow-md">
            <div className="flex mb-4">
              <h3 className="text-gray-800 font-semibold">
                {returnPolicy.policyName}
              </h3>
            </div>
            <p className="text-gray-600">{returnPolicy.policyDescription}</p>
          </div>
           <div className="mt-4 py-6">
           <button
             type="button"
             className="bg-gray-800 text-white w-6/12 md:w-1/12 font-bold px-4 py-2 hover:bg-gray-700 rounded-full"
             onClick={handleChangeReturnPolicy}
           >
             Change Policy
           </button>
         </div>
         </>
        )
      )}

      {changeReturnPolicyModal && (
        <ChangeReturnPolicyModal
          productId={productId}
          setChangeReturnPolicyModal={setChangeReturnPolicyModal}
          accessToken={accessToken}
          getInitialPolicyData={getInitialPolicyData}
        />
      )}
    </div>
  );
};

export default Policy;