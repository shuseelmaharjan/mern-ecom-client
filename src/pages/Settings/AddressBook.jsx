import React, { useCallback, useEffect, useState, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import shippingService from "../../services/shippingService/shippingService";
import AddAddress from "./AddAddress";
import EditAddress from "./EditAddress";
import { toast } from "react-toastify";
import DefaultBillingAddress from "./DefaultBillingAddress";
import DefaultShippingAddress from "./DefaultShippingAddress";

const AddressBook = () => {
  const { accessToken } = useAuth();
  const [activeTable, setActiveTable] = useState(true);
  const [addAddressForm, setAddAddressForm] = useState(false);
  const [editAddressForm, setEditAddressForm] = useState(false);
  const [defaultShipping, setDefaultShipping] = useState(false);
  const [defaultBilling, setDefaultBilling] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [allListViewOptions, setAllListViewOptions] = useState(true);
  const [showBillingOption, setShowBillingOption] = useState(false);
  const [showShippingOption, setShowShippingOption] = useState(false)

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
      toast.error(addErrMsg);
      hasShownToast.current = false;
      setAddErrorMsg("");
    }
  }, [addErrMsg]);

  const openAddAddress = () => {
    setAddAddressForm(true);
    setActiveTable(false);
    setEditAddressForm(false);
    setAllListViewOptions(false)
    setShowBillingOption(false);
    setShowShippingOption(false)
  };

  const handleEdit = (address) => {
    setSelectedAddress(address);
    setEditAddressForm(true);
    setActiveTable(false);
    setAddAddressForm(false);
    setAllListViewOptions(false)
    setShowBillingOption(false);
    setShowShippingOption(false)
  };

  const openAddressTable = () => {
    setActiveTable(true);
    setAddAddressForm(false);
    setEditAddressForm(false);
    setDefaultShipping(false);
    setDefaultBilling(false);
    fetchShippingDetails();
    setAllListViewOptions(true);
    setShowBillingOption(false);
    setShowShippingOption(false)
  };

  const openDefaultBillingAddress = () => {
    setActiveTable(false);
    setDefaultBilling(true);
    setDefaultShipping(false);
    setAllListViewOptions(false);
    setShowBillingOption(true);
    setShowShippingOption(false)
  };

  const openDefaultShippingAddress = () => {
    setActiveTable(false);
    setDefaultShipping(true);
    setDefaultBilling(false);
    setAllListViewOptions(false);
    setShowBillingOption(false);
    setShowShippingOption(true)
  };

  if (loading) return <div className="text-center mt-4">Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-4">{error}</div>;




  return(
    <>
    {allListViewOptions && (
      <div className="flex justify-end gap-4 text-green-600 font-bold items-center">
        <span className="cursor-pointer" onClick={openDefaultBillingAddress}>Default Billing Address</span>
        <span className="border-l border-green-600 h-6"></span> 
        <span className="cursor-pointer" onClick={openDefaultShippingAddress}>Default Shipping Address</span>
      </div>
    )
    }
    {showBillingOption && (
      <div className="flex justify-end gap-4 text-green-600 font-bold items-center">
      <span className="cursor-pointer" onClick={openDefaultBillingAddress}>Default Billing Address</span>
    </div>
    )}
    {showShippingOption && (
      <div className="flex justify-end gap-4 text-green-600 font-bold items-center">
      <span className="cursor-pointer" onClick={openDefaultShippingAddress}>Default Shipping Address</span>
    </div>
    )}
   


      {defaultShipping && (
    <DefaultShippingAddress setDefaultShipping={setDefaultShipping} addresses={addresses} fetchShippingDetails={fetchShippingDetails} openAddressTable={openAddressTable}/>
      )}

      {defaultBilling && (
        <DefaultBillingAddress setDefaultBilling = {setDefaultBilling}  addresses={addresses} fetchShippingDetails={fetchShippingDetails} openAddressTable={openAddressTable}/>
      )}
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
                    <td className="block border-t border-gray-300 px-4 text-left text-center text-sm">
                      {address.isDefault && (
                        <span className="block text-gray-800 rounded-full px-2 py-1">
                          Default Shipping Address
                        </span>
                      )}
                      {address.defaultBilling && (
                        <span className="block text-gray-800 rounded-full px-2 py-1">
                          Default Billing Address
                        </span>
                      )}
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
        <EditAddress address={selectedAddress} openAddressTable={openAddressTable} fetchShippingDetails={fetchShippingDetails} setAddSuccessMsg={setAddSuccessMsg} setAddErrorMsg={setAddErrorMsg}/>
      )}
    </>
  );
};

export default AddressBook;
