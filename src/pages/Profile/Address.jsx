import React, { useState } from 'react';
import Nav from '../../components/Profile/Nav';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const Address = () => {
  const [addresses, setAddresses] = useState([
    { id: 1, address: '123 Main Street, Apartment 4B, New York, NY, 10001' },
    { id: 2, address: '456 Elm Street, Suite 305, Los Angeles, CA, 90001' },
  ]);

  const handleAddAddress = () => {
    // Handle adding a new address
    const newAddress = prompt('Enter new shipping address:');
    if (newAddress) {
      setAddresses([
        ...addresses,
        { id: addresses.length + 1, address: newAddress },
      ]);
    }
  };

  const handleEditAddress = (id) => {
    const updatedAddress = prompt('Edit the address:', addresses.find((address) => address.id === id).address);
    if (updatedAddress) {
      setAddresses(
        addresses.map((address) =>
          address.id === id ? { ...address, address: updatedAddress } : address
        )
      );
    }
  };

  const handleRemoveAddress = (id) => {
    const confirmRemove = window.confirm('Are you sure you want to remove this address?');
    if (confirmRemove) {
      setAddresses(addresses.filter((address) => address.id !== id));
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navigation */}
      <Nav />

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Shipping Address Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Your Shipping Address
          </h2>
          <button
            onClick={handleAddAddress}
            className="bg-green-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-green-600 transition text-lg font-bold mb-4"
          >
            Add Address
          </button>

          {/* Address List */}
          <div>
            {addresses.length === 0 ? (
              <p className="text-gray-600">No addresses added yet.</p>
            ) : (
              <ul>
                {addresses.map((address) => (
                  <li
                    key={address.id}
                    className="bg-gray-100 p-4 mb-4 rounded-lg shadow-sm flex justify-between items-center text-gray-700"
                  >
                    <span>{address.address}</span>
                    <div className="flex space-x-4">
                      <button
                        onClick={() => handleEditAddress(address.id)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleRemoveAddress(address.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Address;
