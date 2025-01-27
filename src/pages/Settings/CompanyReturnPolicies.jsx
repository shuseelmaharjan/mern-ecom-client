import React, { useEffect, useState } from "react";
import sitePolicyService from "../../services/sitePolicyService/sitePolicyService";
import { useAuth } from "../../context/AuthContext";
import DateUtils from "../../utils/dateUtils";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const CompanyReturnPolicy = () => {
  const { accessToken } = useAuth();

  const [companyPolicyData, setCompanyPolicyData] = useState([]);
  const [addPolicyForm, setAddPolicyForm] = useState(false);
  const [displayData, setDisplayData] = useState(true);
  const [editPolicyData, setEditPolicyData] = useState(false);
  const [formData, setFormData] = useState({
    policyName: "",
    policyDescription: "",
  });
  const [errors, setErrors] = useState({
    policyName: "",
    policyDescription: "",
  });

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

  const validateForm = () => {
    const newErrors = {};
    if (!formData.policyName.trim()) {
      newErrors.policyName = "Policy Name is required.";
    }
    if (!formData.policyDescription.trim()) {
      newErrors.policyDescription = "Policy Description is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleAddPolicy = () => {
    setAddPolicyForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await sitePolicyService.createReturnPolicy(
        formData,
        accessToken
      );
      setCompanyPolicyData([...companyPolicyData, response.data]);
      setFormData({ policyName: "", policyDescription: "" });
      setAddPolicyForm(false);
      toast.success('Policy added successfully');
    } catch (error) {
      console.error("Error adding company policy:", error);
      toast.error('Failed to add policy. Please try again.');
    }
  };

  const [oldPolicyName, setOldPolicyName] = useState('');
  const [oldPolicyDescription, setOldPolicyDescription] = useState('');
  const [policyId, setPolicyId] = useState('');

  const handleEditPolicy = async (policyName, policyId, policyDescription) => {
    console.log(policyName, policyId, policyDescription);
    setDisplayData(false);
    setAddPolicyForm(false);
    setEditPolicyData(true);
    setOldPolicyName(policyName);
    setOldPolicyDescription(policyDescription);
    setPolicyId(policyId);
  };


  const [newPolicyName, setNewPolicyName] = useState('');
  const [newPolicyDescription, setNewPolicyDescription] = useState('');
  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedPolicy = {
      policyName: newPolicyName || oldPolicyName, 
      policyDescription: newPolicyDescription || oldPolicyDescription,
    };
  
    const validationErrors = {};
    if (!updatedPolicy.policyName.trim()) {
      validationErrors.policyName = "Policy name is required.";
    }
    if (!updatedPolicy.policyDescription.trim()) {
      validationErrors.policyDescription = "Policy description is required.";
    }
  
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  
    try {
      await sitePolicyService.updateReturnPolicy(policyId, updatedPolicy, accessToken);
  
      setEditPolicyData(false);
      setOldPolicyName('');
      setOldPolicyDescription('');
      setNewPolicyName('');
      setNewPolicyDescription('');
      setPolicyId('');
      setDisplayData(true);
  
      const updatedPolicies = await sitePolicyService.getSiteReturnPolicyData();
      setCompanyPolicyData(updatedPolicies.data);
  
      toast.success("Return policy updated successfully.");
    } catch (error) {
      console.error("Error updating policy:", error);
      toast.error("Failed to update the policy. Please try again.");
    }
  };
  

  return (
    <>
      <div className="w-full p-4 bg-yellow-100 border-yellow-500 border-2 mb-4">
        Here you should add company return policy data.
      </div>
      {companyPolicyData.length === 0 ? (
        <>
          {addPolicyForm ? (
            <div className="w-full flex p-4 border border-gray-300 shadow-sm mb-4">
              <div className="w-full flex flex-col items-center justify-center text-gray-800">
                <form
                  onSubmit={handleSubmit}
                  className="w-full flex flex-col gap-4"
                >
                  <div>
                    <label htmlFor="policyName" className="block font-medium">
                      Policy Name:
                    </label>
                    <input
                      type="text"
                      id="policyName"
                      name="policyName"
                      value={formData.policyName}
                      onChange={handleInputChange}
                      className={`w-full mt-2 px-3 py-2 border ${
                        errors.policyName ? "border-red-500" : "border-gray-400"
                      } bg-transparent text-gray-800 focus:outline-none transition-all duration-300 text-base`}
                    />
                    {errors.policyName && (
                      <span className="text-red-500 text-sm">
                        {errors.policyName}
                      </span>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="policyDescription"
                      className="block font-medium"
                    >
                      Policy Description:
                    </label>
                    <textarea
                      id="policyDescription"
                      name="policyDescription"
                      value={formData.policyDescription}
                      onChange={handleInputChange}
                      cols="30"
                      rows="5"
                      className={`w-full mt-2 px-3 py-2 border ${
                        errors.policyDescription
                          ? "border-red-500"
                          : "border-gray-400"
                      } bg-transparent text-gray-800 focus:outline-none transition-all duration-300 text-base`}
                    ></textarea>
                    {errors.policyDescription && (
                      <span className="text-red-500 text-sm">
                        {errors.policyDescription}
                      </span>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="bg-gray-800 w-3/12 justify-end font-semibold text-white px-6 py-2 hover:bg-gray-700 transition duration-300 ease-in-out"
                  >
                    Submit Policy
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className="w-full flex p-4 border border-gray-300 shadow-sm mb-4">
              <div className="w-6/12 flex flex-col items-center justify-center">
                <h3 className="text-lg font-semibold">
                  Add Company Policy Title Here
                </h3>
                <p className="text-gray-600">
                  Add Company Title Description Here
                </p>
              </div>

              <div className="w-6/12 flex justify-end items-center">
                <button
                  className="bg-gray-800 text-white px-6 py-2 hover:bg-gray-700 transition duration-300 ease-in-out"
                  onClick={handleAddPolicy}
                >
                  Add Policy
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          {displayData && (
            <>
              {companyPolicyData &&
                companyPolicyData.map((policy, index) => (
                  <div
                    key={index}
                    className="w-full p-4 border border-gray-300 shadow-sm mb-4"
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">
                        {policy.policyName}
                      </h3>

                      <span>
                        <FaEdit
                          onClick={() =>
                            handleEditPolicy(
                              policy.policyName,
                              policy._id,
                              policy.policyDescription
                            )
                          }
                        />
                      </span>
                    </div>
                    <p className="text-gray-600">{policy.policyDescription}</p>
                    <p className="mt-4">
                      {policy.updatedDate === null ||
                      policy.updatedDate === "null" ? (
                        <>
                          Created At: {DateUtils.formatDate(policy.createdAt)}
                        </>
                      ) : (
                        <>
                          Updated At: {DateUtils.formatDate(policy.updatedDate)}
                        </>
                      )}
                    </p>
                  </div>
                ))}
            </>
          )}

          {editPolicyData && (
            <>
            <div className="w-full flex p-4 border border-gray-300 shadow-sm mb-4">
              <div className="w-full flex flex-col items-center justify-center text-gray-800">
                <form
                  onSubmit={handleUpdate}
                  className="w-full flex flex-col gap-4"
                >
                  <div>
                    <label htmlFor="policyName" className="block font-medium">
                      Policy Name:
                    </label>
                    <input
                      type="text"
                      id="policyName"
                      name="policyName"
                      value={newPolicyName || oldPolicyName}
                      onChange={(e) => setNewPolicyName(e.target.value)}
                      className={`w-full mt-2 px-3 py-2 border ${
                        errors.policyName ? "border-red-500" : "border-gray-400"
                      } bg-transparent text-gray-800 focus:outline-none transition-all duration-300 text-base`}
                    />
                    {errors.policyName && (
                      <span className="text-red-500 text-sm">
                        {errors.policyName}
                      </span>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="policyDescription"
                      className="block font-medium"
                    >
                      Policy Description:
                    </label>
                    <textarea
                      id="policyDescription"
                      name="policyDescription"
                      value={newPolicyDescription || oldPolicyDescription}
                      onChange={(e) => setNewPolicyDescription(e.target.value)}
                      cols="30"
                      rows="5"
                      className={`w-full mt-2 px-3 py-2 border ${
                        errors.policyDescription
                          ? "border-red-500"
                          : "border-gray-400"
                      } bg-transparent text-gray-800 focus:outline-none transition-all duration-300 text-base`}
                    ></textarea>
                    {errors.policyDescription && (
                      <span className="text-red-500 text-sm">
                        {errors.policyDescription}
                      </span>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="bg-gray-800 w-3/12 justify-end font-semibold text-white px-6 py-2 hover:bg-gray-700 transition duration-300 ease-in-out"
                  >
                    Update Policy
                  </button>
                </form>
              </div>
            </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default CompanyReturnPolicy;
