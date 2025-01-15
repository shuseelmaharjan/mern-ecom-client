import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AddMarketing from "./AddMarketing";
import marketingService from "../../services/marketingService/marketingService";
import { useAuth } from "../../context/AuthContext";
import config from "../../services/config";

const Marketing = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("active");
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const { accessToken } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const BASE_URL = config.API_BASE_URL;


  useEffect(() => {
    const currentTab = location.pathname.split("/")[2] || "active";
    setActiveTab(currentTab);
  }, [location]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    navigate(`/marketing/${tab}`);
  };

  const handleCreateCampaign = () => {
    setOpenCreateModal(true);
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let response;
      switch (activeTab) {
        case "active":
          response = await marketingService.getActiveCampaign(accessToken);
          break;
        case "upcoming":
          response = await marketingService.getUpcomingCampaign(accessToken);
          break;
        case "expired":
          response = await marketingService.getExpiredCampaign(accessToken);
          break;
        default:
          response = [];
          break;
      }
      setData(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load campaigns. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [activeTab, accessToken]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="block w-full h-auto p-6 shadow-lg rounded-lg gap-6 lg:gap-8 border-gray-100 border-2">
      <div className="flex mb-10 justify-between">
        <div className="flex space-x-4">
          <button
            onClick={() => handleTabClick("active")}
            className={`py-2 px-4 ${
              activeTab === "active"
                ? "bg-gray-800 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Active
          </button>
          <button
            onClick={() => handleTabClick("upcoming")}
            className={`py-2 px-4 ${
              activeTab === "upcoming"
                ? "bg-gray-800 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => handleTabClick("expired")}
            className={`py-2 px-4 ${
              activeTab === "expired"
                ? "bg-gray-800 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Expired
          </button>
        </div>
        <button
          className="py-2 px-4 bg-gray-800 font-semibold text-white rounded hover:bg-gray-700"
          onClick={handleCreateCampaign}
        >
          Create Campaign
        </button>
      </div>
      {loading && (
        <p className="text-center text-gray-600">Loading campaigns...</p>
      )}
      {error && <p className="text-center text-red-600">{error}</p>}

      {!loading && !error && data.length === 0 && (
        <p className="text-center text-gray-600">
          No campaigns available for this tab.
        </p>
      )}

      <ul className="space-y-4">
        {data.map((campaign) => (
          <li
            key={campaign._id}
            className="flex bg-white shadow rounded-lg p-4 space-y-2 border-black"
          >
            <div className="flex space-x-4">
              <img
                src={`${BASE_URL}/${campaign.image}`}
                alt={campaign.title}
                className="w-32 h-32 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{campaign.title}</h3>
                <p
                  className="text-gray-600"
                  dangerouslySetInnerHTML={{ __html: campaign.description }}
                ></p>
                <p className="text-sm text-gray-500 mt-2">
                  Sale Type: {campaign.saleType}
                </p>
                <p className="text-sm text-gray-500">
                  Priority: {campaign.priority}
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center mt-4">
              <div>
                <p className="text-sm text-gray-500">
                  Start Date: {new Date(campaign.startTime).toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">
                  End Date: {new Date(campaign.expiryTime).toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 font-semibold">
                  Status: {campaign.isActive ? "Running" : "Inactive"}
                </p>
              </div>
              <button className="py-1 px-3 bg-gray-800 text-white rounded hover:bg-gray-700">
                Options
              </button>
            </div>

            <div className="mt-4 flex justify-between">
              <p className="text-sm text-gray-500">
                Discounted Percentage: {campaign.discountPercentage}%
              </p>
              <p className="text-sm text-gray-500">
                Total Sales: {campaign.totalSales}
              </p>
              <p className="text-sm text-gray-500">
                Total Visits: {campaign.totalVisits}
              </p>
            </div>
          </li>
        ))}
      </ul>
      {openCreateModal && (
        <AddMarketing setOpenCreateModal={setOpenCreateModal} />
      )}
    </div>
  );
};

export default Marketing;
