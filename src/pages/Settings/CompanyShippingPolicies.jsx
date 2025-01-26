import React, { useEffect, useState } from "react";
import sitePolicyService from "../../services/sitePolicyService/sitePolicyService";
import AddShippingForm from "./AddShippingForm";
import { useAuth } from "../../context/AuthContext";

const CompanyShippingPolicies = () => {

  const {accessToken} = useAuth();

  const [data, setData] = useState('');
  const [addForm, setAddForm] = useState(false);


  const fetchData = async() => {
    try {
      const response = await sitePolicyService.getShippingPolicyData();
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  const openForm = () => {
    setAddForm(true);
  }

  const handleEdit = (item)=> {
    console.log(item);
  }

  const [dataId, setDataId] = useState('');
  const [dataName, setDataName] = useState('');
  const [removeConfirm, setRemoveConfirm] = useState(false);
  const handleRemove = async(id, name) => {
    setDataId(id);
    setDataName(name);
    setRemoveConfirm(true);
  }
  const handleConfirmRemove = async(id) => {
    try {
      await sitePolicyService.deactivateShippingPolicy(id, accessToken);
      fetchData();
      setRemoveConfirm(false);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <div className="flex gap-10 items-center justify-between">
        <div className="w-10/12 p-4 bg-yellow-100 border-yellow-500 border-2 mb-4">
          Here's the list of shipping policies you have created, It'll be
          displayed as a default shipping policy where vendors had
          selected default shipping policy.
        </div>
        <div className="w-2/12 bg-gray-800 text-white px-6 py-2 hover:bg-gray-700 transition duration-300 ease-in-out">
          <button onClick={openForm}>Add Shipping Policy</button>
        </div>
      </div>

      <div className="w-full">
        {data.length>0?(
          <>
          {data.map((item, index) => (
            <div key={index} className="p-4 border-2 border-gray-200 mb-4 text-gray-800">
              <div className="flex flex-col">
                <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold">{item.shippingPolicyName}</h1>
                <div className="flex gap-4">
                  <button className="font-semibold text-white bg-green-700 px-4 py-2" onClick={()=> handleEdit(item)}>Edit</button>
                  <button className="font-semibold text-white bg-red-500 px-4 py-2" onClick={() => handleRemove(item._id, item.shippingPolicyName)}>Remove</button>
                </div>
                </div>
                <div className="flex flex-col gap-2 mt-4">
                  <h2 className="text-lg font-semibold">Shipping Method: {item.shippingMethod}</h2>
                  <h2 className="text-lg font-semibold">Shipping Days: {item.shippingDays}</h2>
                  <h2 className="text-lg font-semibold">Cost of Delivery: {item.cod}</h2>
                  <p className="text-gray-500">{item.shippingPolicyDescription}</p>
                </div>
              </div>
            </div>
          ))}
          </>
        ):(
          <>
          <p>No records found</p>
          </>
        )}
      </div>

      {addForm && (
        <>
        <AddShippingForm fetchData={fetchData} setAddForm={setAddForm}/>
        </>
      )}

      {removeConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full sm:w-6/12 md:w-6/12 lg:w-4/12 p-6">
            <h3 className="text-lg font-semibold mb-4">Remove Shipping Policy</h3>
            <p>Are you sure you want to remove <span className="font-semibold">{dataName}</span>?</p>
            <div className="flex gap-4 mt-4 justify-end">
              <button className="bg-red-500 text-white px-4 py-2" onClick={()=> setRemoveConfirm(false)}>Cancel</button>
              <button className="bg-green-700 text-white px-4 py-2" onClick={()=> handleConfirmRemove(dataId)}>Yes Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyShippingPolicies;
