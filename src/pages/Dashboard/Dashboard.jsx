import React from "react";
import { Line } from "react-chartjs-2";

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from "chart.js";

// Registering Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Sample data for the charts
const visitsData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Visits",
      data: [1000, 1200, 1400, 1600, 2000, 2200],
      borderColor: "#4CAF50", // Green color for visits
      backgroundColor: "rgba(76, 175, 80, 0.2)",
      tension: 0.4,
    },
  ],
};

const ordersData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Orders",
      data: [200, 400, 600, 800, 1000, 1200],
      borderColor: "#FF5722", // Red color for orders
      backgroundColor: "rgba(255, 87, 34, 0.2)",
      tension: 0.4,
    },
  ],
};

const conversionRateData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Conversion Rate (%)",
      data: [10, 15, 12, 20, 25, 30],
      borderColor: "#2196F3", // Blue color for conversion rate
      backgroundColor: "rgba(33, 150, 243, 0.2)",
      tension: 0.4,
    },
  ],
};

const revenueData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Revenue ($)",
      data: [2000, 3000, 4000, 5000, 6000, 7000],
      borderColor: "#FFC107", // Yellow color for revenue
      backgroundColor: "rgba(255, 193, 7, 0.2)",
      tension: 0.4,
    },
  ],
};

const Dashboard = () => {
  return (
    <div className="p-4 bg-gray-50">
      {/* Dashboard Header */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard</h2>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {/* Total Views */}
        <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
          <h3 className="text-xl font-semibold text-gray-800">Total Views</h3>
          <p className="text-2xl font-bold text-gray-600">1200</p>
        </div>
        {/* Views */}
        <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
          <h3 className="text-xl font-semibold text-gray-800">Views</h3>
          <p className="text-2xl font-bold text-gray-600">300</p>
        </div>
        {/* Orders */}
        <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
          <h3 className="text-xl font-semibold text-gray-800">Orders</h3>
          <p className="text-2xl font-bold text-gray-600">150</p>
        </div>
        {/* Revenue */}
        <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
          <h3 className="text-xl font-semibold text-gray-800">Revenue</h3>
          <p className="text-2xl font-bold text-gray-600">$5000</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Statistics</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {/* Visits Chart */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Visits</h4>
            <Line data={visitsData} options={{ responsive: true }} />
          </div>
          {/* Orders Chart */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Orders</h4>
            <Line data={ordersData} options={{ responsive: true }} />
          </div>
          {/* Conversion Rate Chart */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Conversion Rate</h4>
            <Line data={conversionRateData} options={{ responsive: true }} />
          </div>
          {/* Revenue Chart */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Revenue</h4>
            <Line data={revenueData} options={{ responsive: true }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
