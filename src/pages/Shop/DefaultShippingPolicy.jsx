import React, { useEffect, useState } from "react";
import sitePolicyService from "../../services/sitePolicyService/sitePolicyService";

const DefaultShippingPolicy = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await sitePolicyService.getShippingPolicyData();
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {data.length > 0 ? (
        <>
          {data.map((item, index) => (
            <div key={index} className="p-4 border-2 border-gray-200 mb-4 rounded-lg shadow-md">
              <div className="flex flex-col text-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-base">{item.shippingMethod}</span>
                  <span className="px-3 py-1 border-2 border-gray-300 rounded-full bg-gray-100 text-gray-600">
                    Default
                  </span>
                </div>

                <div className="flex flex-wrap mt-2">
                  <div className="mr-4">
                    <span className="font-semibold">Delivery Days: </span>
                    <span className="mx-2">{item.shippingDays}</span>
                  </div>
                  <div>
                    <span className="font-semibold">Delivery Cost: </span>
                    <span className="mx-2">{item.costofDelivery}</span>
                  </div>
                </div>

                <div className="mt-2">
                  <span className="font-semibold">Description: </span>
                  <span className="mx-2">{item.shippingPolicyDescription}</span>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <p className="text-center text-gray-600">No records found</p>
      )}
    </div>
  );
};

export default DefaultShippingPolicy;