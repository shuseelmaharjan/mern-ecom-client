import React from 'react';

const Dashboard = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-6 fixed h-full">
        <h2 className="text-center text-2xl font-bold mb-8">E-Commerce</h2>
        <ul className="space-y-4">
          <li><a href="#home" className="hover:text-gray-400">Dashboard</a></li>
          <li><a href="#orders" className="hover:text-gray-400">Orders</a></li>
          <li><a href="#products" className="hover:text-gray-400">Products</a></li>
          <li><a href="#customers" className="hover:text-gray-400">Customers</a></li>
          <li><a href="#settings" className="hover:text-gray-400">Settings</a></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 p-6">
        {/* Header */}
        <div className="flex justify-between items-center bg-white p-4 shadow-md rounded-lg mb-8">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">Logout</button>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold">Total Sales</h3>
            <p className="text-2xl font-bold text-green-500">$25,000</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold">Orders</h3>
            <p className="text-2xl font-bold text-blue-500">1,500</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold">Customers</h3>
            <p className="text-2xl font-bold text-yellow-500">800</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold">Products</h3>
            <p className="text-2xl font-bold text-purple-500">350</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
