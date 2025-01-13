import React, { useState } from 'react';
import shippingService from '../../services/shippingService/shippingService';
import { useAuth } from "../../context/AuthContext";

const DefaultBillingAddress = ({addresses, fetchShippingDetails, openAddressTable}) => {
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const { accessToken } = useAuth();


  const handleRadioChange = (id) => {
    setSelectedAddressId(id);
  };

    const handleUpdateBillingAddress= async() => {
        try{
            await shippingService.updateDefaultBillingAddress(accessToken, selectedAddressId);
            openAddressTable(true);
            fetchShippingDetails();
        }catch(error){
            console.error("Error updating data", error);
        }
    }

  return (
    <div className="block w-full h-auto px-4 py-6">
    <table className="table-auto w-full">
      <thead className="bg-gray-100">
        <tr>
          <th className="border-t border-gray-300 px-4 py-2 text-left">Full Name</th>
          <th className="border-t border-gray-300 px-4 py-2 text-left">Address</th>
          <th className="border-t border-gray-300 px-4 py-2 text-left">Phone Number</th>
          <th className="border-t border-gray-300 px-4 py-2 text-left"></th>
          <th className="border-t border-gray-300 px-4 py-2 text-left"></th>
        </tr>
      </thead>
      <tbody className="border-b border-gray-300">
        {addresses.length === 0 ? (
          <tr>
            <td colSpan="5" className="text-center py-4">
              No addresses available.
            </td>
          </tr>
        ) : (
          addresses.map((address) => (
            <tr key={address._id}>
              <td className="border-t border-gray-300 px-4 py-2 text-left">{address.fullName}</td>
              <td className="border-t border-gray-300 px-4 py-2 text-left">
                {address.isHome ? (
                  <span className="bg-green-600 py-1 px-3 mr-2 text-white rounded-full text-[12px] font-semibold">
                    Home
                  </span>
                ) : (
                  <span className="bg-green-600 py-1 px-3 mr-2 text-white rounded-full text-[12px] font-semibold">
                    Office
                  </span>
                )}
                {`${address.addressLine1}, ${address.addressLine2 || ''}, 
                ${address.city}, ${address.state}, ${address.postalCode}, ${address.country}`}
              </td>
              <td className="border-t border-gray-300 px-4 py-2 text-left">{address.phone || 'N/A'}</td>
              <td className="border-t border-gray-300 px-4 py-2 text-left text-center text-sm">
                {address.defaultBilling ? 'Default Billing Address' : ''}
              </td>
              <td className="border-t border-gray-300 px-4 py-2 text-left text-center w-[4rem]">
              <input
                type="radio"
                name="defaultAddress"
                value={address._id}
                checked={selectedAddressId === address._id}
                onChange={() => handleRadioChange(address._id)}
                className="form-radio text-gray-800 focus:ring-gray-800 w-6 h-6 cursor-pointer my-2"
                />

              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
    <div className="flex justify-end mt-8 space-x-4">
      <button
        type="button"
        onClick={openAddressTable}
        className="bg-gray-300 text-black px-6 py-2 hover:bg-gray-400"
      >
        Back
      </button>
      <button
        className="bg-gray-800 text-white px-6 py-2 hover:bg-gray-700 transition duration-300 ease-in-out"
        onClick={handleUpdateBillingAddress}
      >
        Update Default Shipping Address
      </button>
    </div>
  </div>
  )
}

export default DefaultBillingAddress