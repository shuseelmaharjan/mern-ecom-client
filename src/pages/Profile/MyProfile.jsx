import React from 'react';

const MyProfile = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-5xl mx-auto bg-white shadow rounded-lg">
        {/* Header Section */}
        <div className="bg-green-500 text-white rounded-t-lg p-6 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src="https://via.placeholder.com/100"
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-white object-cover"
            />
            <div>
              <h1 className="text-2xl font-semibold">John Doe</h1>
              <p className="text-base">johndoe@example.com</p>
            </div>
          </div>
          <button className="mt-4 md:mt-0 bg-white text-blue-600 px-4 py-2 rounded shadow hover:bg-blue-100">
            Edit Profile
          </button>
        </div>

        {/* Main Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="bg-gray-50 p-4 rounded shadow">
              <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
              <ul className="space-y-2">
                <li>
                  <strong>Name:</strong> John Doe
                </li>
                <li>
                  <strong>Email:</strong> johndoe@example.com
                </li>
                <li>
                  <strong>Phone:</strong> +123 456 7890
                </li>
                <li>
                  <strong>Address:</strong> 123 Main Street, City, Country
                </li>
              </ul>
            </div>

            

            {/* Order History */}
            <div className="bg-gray-50 p-4 rounded shadow">
              <h2 className="text-xl font-semibold mb-4">Order History</h2>
              <ul className="space-y-2">
                <li>
                  <strong>Order #12345</strong> - Delivered
                </li>
                <li>
                  <strong>Order #12346</strong> - In Progress
                </li>
                <li>
                  <strong>Order #12347</strong> - Cancelled
                </li>
              </ul>
              <button className="mt-4 text-blue-600 hover:underline">
                View All Orders
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
