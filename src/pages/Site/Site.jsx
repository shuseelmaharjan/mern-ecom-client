import React, { useEffect, useState, useRef, useCallback } from "react";
import { GoDotFill } from "react-icons/go";
import siteService from "../../services/site/siteService";
import { useAuth } from "../../context/AuthContext";
import config from "../../services/config";
import LogoEditModal from "./LogoEditModal";
import { toast } from 'react-toastify';
import TitleModal from "./TitleModal";

const Site = () => {
  const [siteLogo, setSiteLogo] = useState(null);
  const [siteTitle, setSiteTitle] = useState("");
  const [siteTagline, setSiteTagline] = useState("");
  const [siteDescription, setSiteDescription] = useState("");
  const [admins, setAdmins] = useState([]);
  const [logs, setLogs] = useState([]);
  const { accessToken } = useAuth();
  const BASE_URL = config.API_BASE_URL;
  const[dataId, setDataId] = useState('');
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const hasShownToast = useRef(false);

  const fetchData = useCallback(async () => {
    try {
      const data = await siteService.getData(accessToken);

      setDataId(data.siteData._id);
      setSiteTitle(data.siteData.title);
      setSiteTagline(data.siteData.tagline);
      setSiteDescription(data.siteData.description || "No description available.");
      setSiteLogo(data.siteData.logo);
      setAdmins(data.admins);
      setLogs(data.logs);
    } catch (error) {
      console.error(error);
    }
  }, [accessToken]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const [logoModal, setLogoModal] = useState(false);
  const handleEditLogoModal = () => {
    setLogoModal(true);

  }

  useEffect(() => {
    if (message && !hasShownToast.current) {
      toast.success(message);
      hasShownToast.current = true; 
    }
  }, [message]);  

  useEffect(() => {
    if(errorMsg && !hasShownToast.current){
      toast.error(errorMsg);
      hasShownToast.current = true;
    }
  }, [errorMsg]);

  const [titleModal, setTitleModel] = useState(false);
  const handleTitleModel =() => {
    setTitleModel(true);
  }
  const [titleMsg, setTitleMessage] = useState('');
  const [titleError, setTitleErrorMsg] = useState('');
  useEffect(() => {
    if (titleMsg && !hasShownToast.current) {
      toast.success(titleMsg);
      hasShownToast.current = true; 
    }
  }, [titleMsg]);  

  useEffect(() => {
    if(titleError && !hasShownToast.current){
      toast.error(titleError);
      hasShownToast.current = true;
    }
  }, [titleError]);
  
  return (
    <div className="flex flex-col lg:flex-row w-full h-auto p-6 shadow-lg rounded-lg gap-6 lg:gap-8 border-gray-100 border-2">
      {/* Main Content */}
      <div className="block w-full lg:w-8/12">
        {/* Site Logo */}
        <div className="flex flex-col mb-6">
          <span className="flex justify-between items-center">
            <h4 className="text-lg font-semibold">Site Logo</h4>
            <button className="bg-gray-800 hover:bg-gray-900 p-2 text-white font-semibold text-sm"               
            onClick={handleEditLogoModal}
            >
              Edit Logo
            </button>
          </span>
          {siteLogo ? (
            <img
              src={`${BASE_URL}${siteLogo}`}
              alt="Site Logo"
              className="h-32 md:h-48 md:w-48 mt-4 rounded-lg object-cover"
            />
          ) : (
            <div className="h-32 w-32 md:h-48 md:w-48 border-2 border-dashed border-gray-400 rounded flex items-center justify-center cursor-pointer hover:bg-gray-100">
              <span className="text-gray-600">No Image Found</span>
            </div>
          )}
        </div>

        {/* Site Title */}
        <div className="flex flex-col mb-6">
          <span className="flex justify-between items-center">
            <h4 className="text-lg font-semibold">Site Title</h4>
            <button onClick={handleTitleModel} className="bg-gray-800 hover:bg-gray-900 p-2 text-white font-semibold text-sm">
              Edit Site Title
            </button>
          </span>
          <h2 className="font-bold text-xl mt-2">{siteTitle}</h2>
        </div>

        {/* Site Tagline */}
        <div className="flex flex-col mb-6">
          <span className="flex justify-between items-center">
            <h4 className="text-lg font-semibold">Site Tagline</h4>
            <button className="bg-gray-800 hover:bg-gray-900 p-2 text-white font-semibold text-sm">
              Edit Site Tagline
            </button>
          </span>
          <h2 className="font-bold text-lg mt-2">{siteTagline}</h2>
        </div>

        {/* Site Description */}
        <div className="flex flex-col mb-6">
          <span className="flex justify-between items-center">
            <h4 className="text-lg font-semibold">Site Description</h4>
            <button className="bg-gray-800 hover:bg-gray-900 p-2 text-white font-semibold text-sm">
              Edit Description
            </button>
          </span>
          <p className="font-normal text-lg mt-4">{siteDescription}</p>
        </div>
      </div>

      {/* Site Members */}
      <div className="block w-full lg:w-4/12">
        <h4 className="text-lg font-semibold px-4">Site Members</h4>
        <div className="p-4 space-y-4">
          {admins.map((admin) => (
            <div
              key={admin._id}
              className="flex flex-col sm:flex-row w-full h-auto bg-gray-100 p-4 rounded-lg shadow-md p-4 hover:shadow-xl transition-shadow duration-300 ease-in-out justify-between items-center"
            >
              {/* User Name */}
              <span className="text-gray-900 text-lg font-semibold items-center flex">
                {admin.name}
              </span>
              {/* Status */}
              <span className="flex gap-x-2 mt-2 sm:mt-0 text-white bg-gradient-to-r from-green-500 to-green-600 font-semibold py-2 px-5 items-center rounded-full shadow-md">
                <GoDotFill /> Active
              </span>
            </div>
          ))}
        </div>

        <h4 className="text-lg font-semibold px-4 mt-4">Last 30 days site activities</h4>
        <div className="p-4 space-y-4">
          {logs.length > 0 ? (
            logs.map((log, index) => (
              <div
                key={index}
                className="bg-gray-100 p-4 rounded-lg shadow-md"
              >
                <p className="text-sm text-gray-700">{log}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No activity logs available.</p>
          )}
        </div>
      </div>
      
      <>
      {
        logoModal && (
          <LogoEditModal
          setLogoModal={setLogoModal}
          dataId={dataId}
          fetchData={fetchData}
          accessToken={accessToken}
          setMessage={setMessage} 
          setErrorMsg={setErrorMsg}
        />
        )
      }
      </>

      <>
      {titleModal && (
        <TitleModal
        setTitleModel={setTitleModel}
          dataId={dataId}
          fetchData={fetchData}
          accessToken={accessToken}
          setTitleMessage={setTitleMessage} 
          setTitleErrorMsg={setTitleErrorMsg}
          siteTitle={siteTitle}
        />
      )}
      </>

    </div>
  );
};

export default Site;
