import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router";
import { FaCalendarAlt } from "react-icons/fa";
import { MdOutlineTimer } from "react-icons/md";
import DateUtils from "../../utils/dateUtils";
import { GoDotFill } from "react-icons/go";
import campaignService from "../../services/campaignService/campaignService";
import config from "../../services/config";
import AddEngagement from "./AddEngagement";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

const BASE_URL = config.API_BASE_URL;

const Campaign = () => {
  const {accessToken} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const defaultParams = {
    event: "quicksale",
  };

  const [activeTab, setActiveTab] = useState(
    new URLSearchParams(location.search).get("event") || defaultParams.event
  );
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const updateParams = useCallback((updatedParams) => {
    const params = new URLSearchParams(location.search);
    const finalParams = { ...Object.fromEntries(params.entries()), ...updatedParams };
    navigate(`${location.pathname}?${new URLSearchParams(finalParams).toString()}`, { replace: true });
  }, [location.search, location.pathname, navigate]);

  const fetchCampaigns = useCallback(async (saleType) => {
    setLoading(true);
    try {
      const response = await campaignService.getCampaign(saleType);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCampaigns(activeTab);
    updateParams({ event: activeTab });
  }, [activeTab, fetchCampaigns, updateParams]);
  

  const handleTabClick = (type) => {
    setActiveTab(type);
  };

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [campaign, setCampaign] = useState('');
  const openEngagementModal = (campaign) => {
    setOpenCreateModal(true);
    setCampaign(campaign);
  }

  const [toastSuccessMsg, setToastMsg] = useState('');
  const [errorEngagement, setErrorEngagement] = useState('');
  const [emptySelection, setEmptySelection] = useState('');

  useEffect(() => {
    if (toastSuccessMsg) {
      toast.success(toastSuccessMsg);
      setToastMsg(''); 
    }
  }, [toastSuccessMsg]);  

  useEffect(() => {
    if (errorEngagement) {
      toast.error(errorEngagement);
      setErrorEngagement(''); 
    }
  }, [errorEngagement]);

  useEffect(() => {
    if (emptySelection) {
      toast.warn(emptySelection);
      setEmptySelection(''); 
    }
  }, [emptySelection]);
  return (
    <div className="block w-full h-auto p-6 shadow-lg rounded-lg gap-6 lg:gap-8 border-gray-100 border-2">
      <div className="flex mb-10 justify-between">
        <div className="flex space-x-4">
          {["sale", "quicksale", "festival", "freeshipping"].map((type) => (
            <button
              key={type}
              onClick={() => handleTabClick(type)}
              className={`py-2 px-4 ${
                activeTab === type ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-700"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1).replace(/([A-Z])/g, " $1")}
            </button>
          ))}
        </div>
      </div>
  
      {loading ? (
        <div>Loading...</div>
      ) : data.length === 0 ? (
        <div>No records found.</div>
      ) : (
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
                    Display on {campaign.priority}
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
                  <span className="bg-green-100 border-green-800 border-2 px-4 font-semibold py-1 text-green-800 rounded-full flex items-center">
                    <GoDotFill /> <span className="ml-2">Active</span>
                  </span>
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
  
                  {/* Total Visits Section */}
                  <div className="flex items-center space-x-2">
                    <h1 className="text-3xl font-semibold text-gray-800">{campaign.totalVisits}</h1>
                    <div className="text-gray-700">
                      <h2 className="font-medium">Total</h2>
                      <h2 className="font-medium">Visits</h2>
                    </div>
                  </div>
                  <div className="w-px h-12 bg-gray-600"></div>
                  <button
                    className="py-2 px-4 bg-gray-800 font-semibold text-white hover:bg-gray-700"
                    onClick={() => {openEngagementModal(campaign)}}
                  >
                    Make Engagement
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      {openCreateModal && (
        <AddEngagement setOpenCreateModal={setOpenCreateModal} fetchCampaigns={fetchCampaigns} campaign={campaign} accessToken={accessToken} setToastMsg={setToastMsg} setErrorEngagement={setErrorEngagement} setEmptySelection={setEmptySelection}/>
      )}
    </div>
  );
  
};

export default Campaign;
