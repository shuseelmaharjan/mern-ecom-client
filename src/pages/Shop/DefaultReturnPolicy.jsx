import React, { useEffect, useState } from "react";
import sitePolicyService from "../../services/sitePolicyService/sitePolicyService";

const DefaultReturnPolicy = () => {
  const [companyPolicyData, setCompanyPolicyData] = useState([]);

  useEffect(() => {
    const getCompanyPolicy = async () => {
      try {
        const response = await sitePolicyService.getSiteReturnPolicyData();
        setCompanyPolicyData(response.data);
      } catch (error) {
        console.error("Error getting company policy:", error);
      }
    };
    getCompanyPolicy();
  }, []);

  return (
    <div className="space-y-4">
      {companyPolicyData &&
        companyPolicyData.map((policy, index) => (
          <div
            key={index}
            className="w-full p-6 border border-gray-200 shadow-md rounded-lg mb-4 bg-white"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                {policy.policyName}
              </h3>
              <span className="px-3 py-1 border-2 border-gray-800 rounded-full bg-gray-100 text-gray-800 text-sm">
                    Default
                  </span>
            </div>
            <p className="text-gray-600">{policy.policyDescription}</p>
          </div>
        ))}
    </div>
  );
};

export default DefaultReturnPolicy;