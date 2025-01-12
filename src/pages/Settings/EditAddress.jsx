import React from 'react'

const EditAddress = ({ address, openAddressTable }) => {
    return (
      <div>
        <button
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
          onClick={openAddressTable}
        >
          Back
        </button>
        <form>
          <h2 className="text-lg font-semibold mb-4">Edit Address</h2>
          {/* Pre-fill the form with the current address data */}
          <input
            type="text"
            defaultValue={address.fullName}
            className="block w-full mb-4 px-4 py-2 border rounded"
          />
          {/* Add more fields as necessary */}
        </form>
      </div>
    );
  };
  
  export default EditAddress;
  