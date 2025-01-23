import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FaTrash } from "react-icons/fa";
import marketingService from "../../services/marketingService/marketingService";
import { useAuth } from "../../context/AuthContext";

const AddMarketing = ({ setOpenCreateModal, setAddSuccessCampaign, setAddErrorCampaign }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    saleType: "SALE",
    startTime: "",
    expiryTime: "",
    discountPercentage: "",
    priority: "HEADER",
  });

  const { accessToken } = useAuth();
  const [image, setImage] = useState(null);
  const [banner, setBanner] = useState(null);
  const [poster, setPoster] = useState(null);
  const bannerInputRef = useRef(null);
  const iamgeInputRef = useRef(null);
  const posterInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    const updatedFormData = {
      ...formData,
      [id]: type === "checkbox" ? checked : value,
    };
    setFormData(updatedFormData);
  };

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBanner(file);
    }
  };

  const handleRemoveBanner = () => {
    setBanner(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  const handlePosterChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPoster(file);
    }
  };

  const handleRemovePoster = () => {
    setPoster(null);
  };
  

  const handleDescriptionChange = (value) => {
    setFormData({ ...formData, description: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const formattedData = new FormData();
    Object.keys(formData).forEach(key => {
      formattedData.append(key, formData[key]);
    });
    if (banner) {
      formattedData.append("banner", banner);
    }
    if (image) {
      formattedData.append("image", image);
    }
    if (poster) {
      formattedData.append("poster", poster);
    }
  
    try {
      console.log("Formatted Data:", formattedData);
      await marketingService.createCampaign(accessToken, formattedData);
      setLoading(false);
      setOpenCreateModal(false);
      setAddSuccessCampaign('Campaign added successfully');
    } catch (error) {
      console.error("Error creating campaign:", error);
      setLoading(false);
      setAddErrorCampaign(error);
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div>
              <label htmlFor="priority" className="block mb-2 font-medium">
                Campaign Type
              </label>
              <select
                id="priority"
                value={formData.priority}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 shadow-sm outline-none"
                required
              >
                <option value="HEADER">Header</option>
                <option value="BANNER">Banner</option>
                <option value="DEAL">Deal</option>
                <option value="HOME">Home</option>
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
            {formData.priority === "HOME" && (
              <div>
                <label htmlFor="saleType" className="block mb-2 font-medium">
                  Display On
                </label>
                <select
                  id="saleType"
                  value={formData.saleType}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2 shadow-sm outline-none"
                  required
                >
                  <option value="SALE">Sale</option>
                  <option value="BRAND">Brand</option>
                  <option value="FESTIVAL">Festival</option>
                  <option value="FREESHIPPING">Free Shipping</option>
                </select>
              </div>
            )}
          </div>

          {/* Banner Image */}
          <div className="mb-4">
            {(formData.priority === "HEADER" ||
              formData.priority === "BANNER") && (
              <>
                <label className="block mb-2 font-medium">Banner</label>
                {!banner ? (
                  <div
                    className="h-48 w-full border-2 border-dashed border-gray-400 rounded flex items-center justify-center cursor-pointer hover:bg-gray-100"
                    onClick={() => bannerInputRef.current.click()}
                  >
                    <span className="text-gray-600">Select a new image</span>
                  </div>
                ) : (
                  <div className="h-48 w-full relative">
                    <img
                      src={URL.createObjectURL(banner)}
                      alt="Preview"
                      className="w-full h-full object-cover rounded shadow-md border-2 border-dashed border-gray-400"
                    />
                    <FaTrash
                      className="absolute top-2 right-2 text-red-500 text-xl cursor-pointer hover:text-red-600"
                      onClick={handleRemoveBanner}
                    />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/jpeg, image/jpg"
                  ref={bannerInputRef}
                  onChange={handleBannerChange}
                  className="hidden"
                />
              </>
            )}
            {(formData.priority === "DEAL" ||
              formData.priority === "HOME") && (
              <div className="flex space-x-4">
                {/* Image Section */}
                <div className="flex flex-col w-6/12">
                  <label className="block mb-2 font-medium">Select Image</label>
                  {!image ? (
                    <div
                      className="h-48 w-full border-2 border-dashed border-gray-400 rounded flex items-center justify-center cursor-pointer hover:bg-gray-100"
                      onClick={() => iamgeInputRef.current.click()}
                    >
                      <span className="text-gray-600">Select a new image</span>
                    </div>
                  ) : (
                    <div className="h-48 w-full relative">
                      <img
                        src={URL.createObjectURL(image)}
                        alt="Preview"
                        className="w-full h-full object-cover rounded shadow-md border-2 border-dashed border-gray-400"
                      />
                      <FaTrash
                        className="absolute top-2 right-2 text-red-500 text-xl cursor-pointer hover:text-red-600"
                        onClick={() => handleRemoveImage(setImage)}
                      />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/jpeg, image/jpg"
                    ref={iamgeInputRef}
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>

                {/* Poster Section */}
                <div className="flex flex-col w-6/12">
                  <label className="block mb-2 font-medium">Poster</label>
                  {!poster ? (
                    <div
                      className="h-48 w-full border-2 border-dashed border-gray-400 rounded flex items-center justify-center cursor-pointer hover:bg-gray-100"
                      onClick={() => posterInputRef.current.click()}
                    >
                      <span className="text-gray-600">Select a new poster</span>
                    </div>
                  ) : (
                    <div className="h-48 w-full relative">
                      <img
                        src={URL.createObjectURL(poster)}
                        alt="Poster Preview"
                        className="w-full h-full object-cover rounded shadow-md border-2 border-dashed border-gray-400"
                      />
                      <FaTrash
                        className="absolute top-2 right-2 text-red-500 text-xl cursor-pointer hover:text-red-600"
                        onClick={() => handleRemovePoster(setPoster)}
                      />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/png, image/gif"
                    ref={posterInputRef}
                    onChange={handlePosterChange}
                    className="hidden"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-4 mt-4">
            <button
              type="submit"
              className={`px-4 py-2 bg-green-700 text-white font-semibold ${
                loading
                  ? "cursor-not-allowed bg-green-500"
                  : "hover:bg-green-800"
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
