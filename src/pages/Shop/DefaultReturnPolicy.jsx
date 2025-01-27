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
    <>
      {companyPolicyData &&
        companyPolicyData.map((policy, index) => (
          <div
            key={index}
            className="w-full p-4 border border-gray-300 shadow-sm mb-4 rounded-lg"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xl font-semibold text-gray-800">
                {policy.policyName}
              </h3>
            </div>
            <p className="text-gray-600 mb-4">{policy.policyDescription}</p>
          </div>
        ))}
    </>
  );
};

export default DefaultReturnPolicy;
