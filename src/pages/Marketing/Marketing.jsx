import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AddMarketing from "./AddMarketing";
import marketingService from "../../services/marketingService/marketingService";
import { useAuth } from "../../context/AuthContext";
import config from "../../services/config";
import { FaCalendarAlt } from "react-icons/fa";
import { MdOutlineTimer } from "react-icons/md";
import { HiDotsHorizontal } from "react-icons/hi";
import DateUtils from "../../utils/dateUtils";
import { GoDotFill } from "react-icons/go";
import Loader from './Loader';
import EditCampaignData from "./EditCampaignData";

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

  const [openImage, setOpenImage] = useState(null);


  const openImageHandler = (imageUrl) => {
    setOpenImage(imageUrl);
  };

  const [showOptions, setShowOptions] = useState(false);
  const handleButtonClick = () => {
    setShowOptions(!showOptions);
  };

  const [editCampaignModal, setEditCampaignModal] = useState(false);
  const [editCampaignData, setEditCampaignData] = useState('');


  const handleEdit = (campaign) => {
    setEditCampaignData(campaign);
    setEditCampaignModal(true);
    console.log(campaign);

    setShowOptions(false);
  };

  const handleRemove = () => {
    console.log('Remove clicked');
    setShowOptions(false);
  };


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
          className="py-2 px-4 bg-gray-800 font-semibold text-white hover:bg-gray-700"
          onClick={handleCreateCampaign}
        >
          Create Campaign
        </button>
      </div>
      {loading && (
        <Loader/>
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
            className="flex flex-col sm:flex-row bg-white shadow-md rounded-lg p-4 space-y-4 sm:space-y-0 sm:space-x-4 border-black"
          >
            <div className="flex justify-center sm:justify-start">
              <img
                src={`${BASE_URL}/${campaign.image}`}
                alt={campaign.title}
                className="w-32 h-32 object-cover rounded"
                onClick={() => openImageHandler(campaign.image)}
              />
            </div>

            <div className="flex-1 flex flex-col justify-between">
              <div className="flex-grow">
                <h3 className="text-xl font-semibold">{campaign.title}</h3>
                <p
                  className="text-gray-600"
                  dangerouslySetInnerHTML={{ __html: campaign.description }}
                ></p>
              </div>

              <div className="flex space-x-2 mt-4">
                <span className="bg-gray-200 rounded-full px-3 py-2 font-semibold">
                  {campaign.saleType}
                </span>
                <span className="bg-gray-200 rounded-full px-3 py-2 font-semibold">
                  {campaign.priority}
                </span>
              </div>
            </div>

            <div className="sm:ml-auto flex flex-col justify-between sm:space-x-4 sm:space-y-0 space-y-2 h-auto">
              <div className="flex justify-end space-x-8">
                <p className="text-sm text-gray-500 text-xl flex space-x-2 items-center">
                  <span><FaCalendarAlt className="text-2xl" /></span>
                  <span className="text-lg">{DateUtils.formatDate(campaign.startTime)}</span>
                </p>
                <p className="text-sm text-gray-500 text-xl flex space-x-2 items-center">
                  <span><MdOutlineTimer className="text-2xl" /></span>
                  <span className="text-lg">{DateUtils.formatDate(campaign.expiryTime)}</span>
                </p>
                <span>
                  {activeTab === "upcoming" && !campaign.isActive ? (
                    <span className="bg-yellow-100 border-yellow-800 border-2 px-4 font-semibold py-1 text-yellow-800 rounded-full flex items-center">
                      <GoDotFill /> <span className="ml-2">Pending</span>
                    </span>
                  ) : campaign.isActive ? (
                    <span className="bg-green-100 border-green-800 border-2 px-4 font-semibold py-1 text-green-800 rounded-full flex items-center">
                      <GoDotFill /> <span className="ml-2">Active</span>
                    </span>
                  ) : (
                    <span className="bg-red-100 border-red-800 border-2 px-4 font-semibold py-1 text-red-800 rounded-full flex items-center">
                      <GoDotFill /> <span className="ml-2">Expired</span>
                    </span>
                  )}
                </span>
                {activeTab !== "expired" && (
                  <div className="relative">
                  <button
                    className="py-1 px-3 border-gray-400 border-2 text-gray-800 rounded hover:bg-gray-200"
                    onClick={handleButtonClick}
                  >
                    <HiDotsHorizontal />
                  </button>
            
                  {showOptions && (
                    <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg border border-gray-300">
                      <ul className="py-1">
                        <li>
                          <button
                            onClick={() => {handleEdit(campaign)}}
                            className="w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100"
                          >
                            Edit
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={handleRemove}
                            className="w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100"
                          >
                            Remove
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
                )}
              </div>

              <div className="flex mt-auto mb-0 space-x-6 items-center justify-end">
                {/* Discounted Percentage Section */}
                <div className="flex items-center space-x-2">
                  <h1 className="text-3xl font-semibold text-gray-800">{campaign.discountPercentage}%</h1>
                  <div className="text-gray-700">
                    <h2 className="font-medium">Discounted</h2>
                    <h2 className="font-medium">Percentage</h2>
                  </div>
                </div>

                <div className="w-px h-12 bg-gray-600"></div>

                {/* Total Sales Section */}
                <div className="flex items-center space-x-2">
                  <h1 className="text-3xl font-semibold text-gray-800">{campaign.totalSales}</h1>
                  <div className="text-gray-700">
                    <h2 className="font-medium">Total</h2>
                    <h2 className="font-medium">Sales</h2>
                  </div>
                </div>

                <div className="w-px h-12 bg-gray-600"></div>

                {/* Total Visits Section */}
                <div className="flex items-center space-x-2">
                  <h1 className="text-3xl font-semibold text-gray-800">{campaign.totalVisits}</h1>
                  <div className="text-gray-700">
                    <h2 className="font-medium">Total</h2>
                    <h2 className="font-medium">Visits</h2>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {openCreateModal && (
        <AddMarketing setOpenCreateModal={setOpenCreateModal} />
      )}

      {editCampaignModal && (
        <EditCampaignData editCampaignData={editCampaignData} fetchData={fetchData} setEditCampaignModal={setEditCampaignModal}/>
      )}
      {openImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setOpenImage(null)} 
        >
              <button
              className="absolute top-2 right-2 text-white text-2xl"
              onClick={() => setOpenImage(null)} 
            >
              &#x2715;
            </button>
          <div
            className="relative bg-white rounded-lg"
            onClick={(e) => e.stopPropagation()} 
          >
        
            <img
              src={`${BASE_URL}/${openImage}`}
              alt="Campaign"
              className="max-w-[80vw] max-h-[80vh] object-contain"
            />
          </div>
        </div>
      )}

    </div>
  );
};

export default Marketing;
