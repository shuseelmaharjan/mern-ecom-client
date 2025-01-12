import React, { useCallback, useEffect, useState, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import shippingService from "../../services/shippingService/shippingService";
import AddAddress from "./AddAddress";
import EditAddress from "./EditAddress";
import { toast } from "react-toastify";

const AddressBook = () => {
  const { accessToken } = useAuth();
  const [activeTable, setActiveTable] = useState(true);
  const [addAddressForm, setAddAddressForm] = useState(false);
  const [editAddressForm, setEditAddressForm] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [addMsg, setAddSuccessMsg] = useState('');
  const [addErrMsg, setAddErrorMsg] = useState('');

  const hasShownToast = useRef(false);
  
  const fetchShippingDetails = useCallback(async () => {
    try {
      setLoading(true);
      const data = await shippingService.getShippingDetails(accessToken);
      setAddresses(data);
    } catch (error) {
      console.error("Error fetching shipping details:", error);
      setError("Failed to fetch shipping addresses.");
    } finally {
      setLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    if (accessToken) {
      fetchShippingDetails();
    }
  }, [fetchShippingDetails, accessToken]);

  useEffect(() => {
    if (addMsg) {
      toast.success(addMsg);
      hasShownToast.current = false;
      setAddSuccessMsg("");
    }
  }, [addMsg]);

  useEffect(() => {
    if (addErrMsg) {
      toast.success(addErrMsg);
      hasShownToast.current = false;
      setAddErrorMsg("");
    }
  }, [addErrMsg]);

  const openAddAddress = () => {
    setAddAddressForm(true);
    setActiveTable(false);
    setEditAddressForm(false);
  };

  const handleEdit = (address) => {
    setSelectedAddress(address);
    setEditAddressForm(true);
    setActiveTable(false);
    setAddAddressForm(false);
  };

  const openAddressTable = () => {
    setActiveTable(true);
    setAddAddressForm(false);
    setEditAddressForm(false);
  };

  if (loading) return <div className="text-center mt-4">Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-4">{error}</div>;

 

    

  return (
    <>
      {activeTable && (
        <div className="block w-full h-auto px-4 py-6">
          <table className="table-auto w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="border-t border-gray-300 px-4 py-2 text-left text-left">Full Name</th>
                <th className="border-t border-gray-300 px-4 py-2 text-left text-left">Address</th>
                <th className="border-t border-gray-300 px-4 py-2 text-left text-left">Phone Number</th>
                <th className="border-t border-gray-300 px-4 py-2 text-left"></th>
                <th className="border-t border-gray-300 px-4 py-2 text-left">Actions</th>
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
                      {address.isHome ? <span className="bg-green-600 py-1 px-3 mr-2 text-white rounded-full text-[12px] font-semibold">Home</span>:<span className="bg-green-600 py-1 px-3 mr-2 text-white rounded-full text-[12px] font-semibold">Office</span>}
                      {`${address.addressLine1}, ${address.addressLine2 || ""}, 
                      ${address.city}, ${address.state}, ${address.postalCode}, ${address.country}`}
                    </td>
                    <td className="border-t border-gray-300 px-4 py-2 text-left">{address.phone || "N/A"}</td>
                    <td className="border-t border-gray-300 px-4 py-2 text-left text-center">
                      {address.isDefault ? "Default Shipping Address" : ""}
                    </td>
                    <td className="border-t border-gray-300 px-4 py-2 text-left text-center">
                      <button
                        className="px-4 py-2 text-gray-800 font-semibold"
                        onClick={() => handleEdit(address)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div className="flex justify-end mt-8">
            <button
              className="bg-gray-800 text-white px-6 py-2 hover:bg-gray-700 transition duration-300 ease-in-out"
              onClick={openAddAddress}
            >
              Add Address
            </button>
          </div>
        </div>
      )}

      {addAddressForm && <AddAddress openAddressTable={openAddressTable} fetchShippingDetails={fetchShippingDetails} setAddSuccessMsg={setAddSuccessMsg} setAddErrorMsg={setAddErrorMsg}/>}
      {editAddressForm && (
        <EditAddress address={selectedAddress} openAddressTable={openAddressTable} />
      )}
    </>
  );
};

export default AddressBook;
