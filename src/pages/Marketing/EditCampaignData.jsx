import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FaTrash } from "react-icons/fa";
import marketingService from "../../services/marketingService/marketingService";
import { useAuth } from "../../context/AuthContext";
import config from "../../services/config";

const EditCampaignData = ({
  editCampaignData,
  fetchData,
  setEditCampaignModal,
  setSuccessUpdate,
  setErrorUpdate,
}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: editCampaignData.title || "",
    description: editCampaignData.description || "",
    saleType: editCampaignData.saleType || "SALE",
    startTime: editCampaignData.startTime
      ? new Date(editCampaignData.startTime).toISOString().slice(0, 16)
      : "",
    expiryTime: editCampaignData.expiryTime
      ? new Date(editCampaignData.expiryTime).toISOString().slice(0, 16)
      : "",
    discountPercentage: editCampaignData.discountPercentage || "",
    priority: editCampaignData.priority || "BANNER",
    showOnHeader: editCampaignData.showOnHeader || false,
  });
  const BASE_URL = config.API_BASE_URL;

  const { accessToken } = useAuth();
  const [logoFile, setLogoFile] = useState(null);
  const [currentImage, setCurrentImage] = useState(
    editCampaignData.banner || ""
  );
  const [imgFile, setImgFile] = useState(null);
  const [currentImg, setCurrentImg] = useState(editCampaignData.image || "");
  const [stickerFile, setStickerFIle] = useState(null);
  const [stickerImg, setStickerImg] = useState(editCampaignData.poster || "");
  const fileInputRef = useRef(null);
  const iamgeInputRef = useRef(null);
  const posterInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      setCurrentImage(null);
    }
  };

  const handleRemoveImage = () => {
    setCurrentImage(null);
    setLogoFile(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImgFile(file);
      setCurrentImg(null);
    }
  };

  const handleImageRemove = () => {
    setCurrentImg(null);
    setImgFile(null);
  };

  const handlePosterChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setStickerFIle(file);
      setStickerImg(null);
    }
  };

  const handlePosterRemove = () => {
    setStickerImg(null);
    setStickerFIle(null);
  };

  const handleDescriptionChange = (value) => {
    setFormData({ ...formData, description: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = new FormData();
    payload.append("title", formData.title);
    payload.append("description", formData.description);
    payload.append("saleType", formData.saleType);
    payload.append("startTime", formData.startTime);
    payload.append("expiryTime", formData.expiryTime);
    payload.append("discountPercentage", formData.discountPercentage);
    payload.append("priority", formData.priority);

    if (logoFile) {
      payload.append("banner", logoFile);

    }
    if(imgFile) {
      payload.append("image", imgFile);
    }
    if(stickerFile){
      payload.append("poster", stickerFile);

    }

    try {
      await marketingService.updateCampaign(
        accessToken,
        payload,
        editCampaignData._id
      );
      setLoading(false);
      fetchData();
      setEditCampaignModal(false);
      setSuccessUpdate('Campaign updated successfully');
    } catch (error) {
      console.error("Error updating campaign:", error);
      setLoading(false);
      setErrorUpdate(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full sm:w-8/12 md:w-8/12 lg:w-6/12 p-6">
        <h3 className="text-lg font-semibold mb-4">Edit Campaign</h3>
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
                {currentImage ? (
                  <div className="h-48 w-full relative">
                    <img
                      src={`${BASE_URL}${currentImage}`}
                      alt="Current Preview"
                      className="w-full h-full object-cover rounded shadow-md border-2 border-dashed border-gray-400"
                    />
                    <FaTrash
                      className="absolute top-2 right-2 text-red-500 text-xl cursor-pointer hover:text-red-600"
                      onClick={handleRemoveImage}
                    />
                  </div>
                ) : !logoFile ? (
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
                      alt="New Preview"
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
              </>
            )}

            {(formData.priority === "DEAL" || formData.priority === "HOME") && (
              <div className="flex space-x-4">
                {/* Image Section */}
                <div className="flex flex-col w-6/12">
                  <label className="block mb-2 font-medium">Select Image</label>
                  {currentImg ? (
                    <div className="h-48 w-full relative">
                      <img
                        src={`${BASE_URL}${currentImg}`}
                        alt="Current Preview"
                        className="w-full h-full object-cover rounded shadow-md border-2 border-dashed border-gray-400"
                      />
                      <FaTrash
                        className="absolute top-2 right-2 text-red-500 text-xl cursor-pointer hover:text-red-600"
                        onClick={handleImageRemove}
                      />
                    </div>
                  ) : !imgFile ? (
                    <div
                      className="h-48 w-full border-2 border-dashed border-gray-400 rounded flex items-center justify-center cursor-pointer hover:bg-gray-100"
                      onClick={() => iamgeInputRef.current.click()}
                    >
                      <span className="text-gray-600">Select a new image</span>
                    </div>
                  ) : (
                    <div className="h-48 w-full relative">
                      <img
                        src={URL.createObjectURL(imgFile)}
                        alt="Preview"
                        className="w-full h-full object-cover rounded shadow-md border-2 border-dashed border-gray-400"
                      />
                      <FaTrash
                        className="absolute top-2 right-2 text-red-500 text-xl cursor-pointer hover:text-red-600"
                        onClick={handleImageRemove}
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
                  {stickerImg ? (
                    <div className="h-48 w-full relative">
                      <img
                        src={`${BASE_URL}${stickerImg}`}
                        alt="Current Preview"
                        className="w-full h-full object-cover rounded shadow-md border-2 border-dashed border-gray-400"
                      />
                      <FaTrash
                        className="absolute top-2 right-2 text-red-500 text-xl cursor-pointer hover:text-red-600"
                        onClick={handlePosterRemove}
                      />
                    </div>
                  ) : !stickerFile ? (
                    <div
                      className="h-48 w-full border-2 border-dashed border-gray-400 rounded flex items-center justify-center cursor-pointer hover:bg-gray-100"
                      onClick={() => posterInputRef.current.click()}
                    >
                      <span className="text-gray-600">Select a new image</span>
                    </div>
                  ) : (
                    <div className="h-48 w-full relative">
                      <img
                        src={URL.createObjectURL(stickerFile)}
                        alt="Preview"
                        className="w-full h-full object-cover rounded shadow-md border-2 border-dashed border-gray-400"
                      />
                      <FaTrash
                        className="absolute top-2 right-2 text-red-500 text-xl cursor-pointer hover:text-red-600"
                        onClick={handlePosterRemove}
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
              {loading ? "Updating..." : "Update"}
            </button>
            <button
              type="button"
              onClick={() => setEditCampaignModal(false)}
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

export default EditCampaignData;
