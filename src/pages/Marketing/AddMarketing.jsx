import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FaTrash } from "react-icons/fa";
import marketingService from "../../services/marketingService/marketingService";
import { useAuth } from "../../context/AuthContext";

const AddMarketing = ({ setOpenCreateModal }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    saleType: "SALE", 
    startTime: "",
    expiryTime: "",
    discountPercentage: "",
    priority: "BANNER", 
    showOnHeader: false,
  });
  

  const { accessToken } = useAuth();
  const [logoFile, setLogoFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    const updatedFormData = {
      ...formData,
      [id]: type === "checkbox" ? checked : value,
    };
    setFormData(updatedFormData);
  };
  

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
    }
  };

  const handleRemoveImage = () => {
    setLogoFile(null);
  };

  const handleDescriptionChange = (value) => {
    setFormData({ ...formData, description: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const formattedData = {
      ...formData,
      image: logoFile,
    };
  
  
    try {
      await marketingService.createCampaign(accessToken, formattedData);
      setLoading(false);
      setOpenCreateModal(false);
    } catch (error) {
      console.error("Error creating campaign:", error);
      setLoading(false);
    }
  };
  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full sm:w-8/12 md:w-8/12 lg:w-6/12 p-6">
        <h3 className="text-lg font-semibold mb-4">Add Campaign</h3>
        <form
          className="p-4 bg-white shadow rounded-lg"
          onSubmit={handleSubmit}
        >
          {/* Campaign Title */}
          <div className="mb-4">
            <label htmlFor="title" className="block mb-2 font-medium">
              Campaign Title
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 shadow-sm outline-none"
              required
            />
          </div>

          {/* Campaign Description */}
          <div className="mb-4">
            <label htmlFor="description" className="block mb-2 font-medium">
              Description
            </label>
            <ReactQuill
              value={formData.description}
              onChange={handleDescriptionChange}
              theme="snow"
              className="mt-2 text-base"
              modules={{ toolbar: false }}
            />
          </div>

          {/* Fields in a Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div>
              <label htmlFor="saleType" className="block mb-2 font-medium">
                Sale Type
              </label>
              <select
                id="saleType"
                value={formData.saleType}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 shadow-sm outline-none"
                required
              >
                <option value="SALE">SALE</option>
                <option value="QUICKSALE">QUICKSALE</option>
                <option value="FESTIVAL">FESTIVAL</option>
                <option value="FREESHIPPING">FREESHIPPING</option>
              </select>
            </div>
            <div>
              <label htmlFor="startTime" className="block mb-2 font-medium">
                Start Time
              </label>
              <input
                type="datetime-local"
                id="startTime"
                value={formData.startTime}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 shadow-sm outline-none"
                required
              />
            </div>
            <div>
              <label htmlFor="expiryTime" className="block mb-2 font-medium">
                Expiry Time
              </label>
              <input
                type="datetime-local"
                id="expiryTime"
                value={formData.expiryTime}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 shadow-sm outline-none"
                required
              />
            </div>
            <div>
              <label
                htmlFor="discountPercentage"
                className="block mb-2 font-medium"
              >
                Discount Percentage
              </label>
              <input
                type="number"
                id="discountPercentage"
                value={formData.discountPercentage}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 shadow-sm outline-none"
                min="0"
                max="100"
                required
              />
            </div>
            <div>
              <label htmlFor="priority" className="block mb-2 font-medium">
                Display On
              </label>
              <select
                id="priority"
                value={formData.priority}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 shadow-sm outline-none"
                required
              >
                <option value="BANNER">BANNER</option>
                <option value="FLASHSALE">FLASH SALE</option>
                <option value="HOME">HOMEPAGE</option>
              </select>
            </div>
            <div className="flex items-center">
              <label htmlFor="showOnHeader" className="mr-2 font-medium">
                Show on Header
              </label>
              <input
                type="checkbox"
                id="showOnHeader"
                checked={formData.showOnHeader}
                onChange={handleInputChange}
                className="w-5 h-5 border border-gray-300 shadow-sm focus:ring-2 focus:ring-gray-800"
              />
            </div>
          </div>

          {/* Banner Image */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">Banner</label>
            {!logoFile ? (
              <div
                className="h-48 w-full border-2 border-dashed border-gray-400 rounded flex items-center justify-center cursor-pointer hover:bg-gray-100"
                onClick={() => fileInputRef.current.click()}
              >
                <span className="text-gray-600">Select a new image</span>
              </div>
            ) : (
              <div className="h-48 w-full relative">
                <img
                  src={URL.createObjectURL(logoFile)}
                  alt="Preview"
                  className="w-full h-full object-cover rounded shadow-md border-2 border-dashed border-gray-400"
                />
                <FaTrash
                  className="absolute top-2 right-2 text-red-500 text-xl cursor-pointer hover:text-red-600"
                  onClick={handleRemoveImage}
                />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          <div className="flex justify-end gap-4 mt-4">
            <button
              type="submit"
              className={`px-4 py-2 bg-green-700 text-white font-semibold ${
                loading ? "cursor-not-allowed bg-green-500" : "hover:bg-green-800"
              }`}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              onClick={() => setOpenCreateModal(false)}
              className={`px-4 py-2 bg-red-500 text-white font-semibold ${
                loading ? "cursor-not-allowed bg-red-400" : "hover:bg-red-600"
              }`}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMarketing;