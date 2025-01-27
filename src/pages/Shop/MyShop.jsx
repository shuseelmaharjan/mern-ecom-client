import React, { useEffect, useState, useCallback } from "react";
import shopService from "../../services/shop/shopSerivce";
import { useAuth } from "../../context/AuthContext";
import config from "../../services/config";
import axios from "axios";
import { toast } from "react-toastify";
import { FaRegEdit } from "react-icons/fa";
import ReactQuill from "react-quill";
import DefaultShippingPolicy from "./DefaultShippingPolicy";
import DefaultReturnPolicy from "./DefaultReturnPolicy";
import AddShippingPolicyModal from "./AddShippingPolicyModal";
import AddReturnPolicyModal from "./AddReturnPolicyModal";
import ShopShippingPolicy from "./ShopShippingPolicy";
import DateUtils from "../../utils/dateUtils";
import ShopReturnPolicy from "./ShopReturnPolicy";

const MyShop = () => {
  const { accessToken } = useAuth();
  const [shopData, setShopData] = useState(null);
  const BASE_URL = config.API_BASE_URL;

  const [selectedImage, setSelectedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProfile, setUploadProfile] = useState("");
  const [shopId, setShopId] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [description, setDescription] = useState("");
  const [editDescription, setEditDescription] = useState(false);
  const [isUpdatingDescription, setIsUpdatingDescription] = useState(false);
  const [callNewData, setCallNewData] = useState(false);

  useEffect(() => {
    if (successMsg) {
      toast.success(successMsg);
      setSuccessMsg("");
    }
    if (errorMsg) {
      toast.error(errorMsg);
      setErrorMsg("");
    }
  }, [successMsg, errorMsg]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setUploadProfile(file);
    }
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await shopService.getData(accessToken);
      setShopData(response.data);
      setShopId(response.data._id);
    } catch (error) {
      console.error(error);
    }
  }, [accessToken]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleProfileUpdate = async () => {
    if (!uploadProfile) {
      alert("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("shopLogo", uploadProfile);

    setIsUploading(true);
    try {
      const response = await axios.put(
        `${BASE_URL}/api/v1/${shopId}/logo`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        toast.success("Image uploaded successfully!");
        fetchData();
      } else {
        toast.error("Failed to upload image. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("An error occurred while uploading the image.");
    } finally {
      setIsUploading(false);
      setSelectedImage(null);
      setUploadProfile("");
    }
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  const handleDescriptionUpdate = async () => {
    if (!description.trim()) {
      toast.error("Description cannot be empty.");
      return;
    }

    setIsUpdatingDescription(true);
    try {
      const response = await axios.put(
        `${BASE_URL}/api/v1/${shopId}/description`,
        { shopDescription: description },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Description updated successfully!");
        fetchData();
        setEditDescription(false);
      } else {
        toast.error("Failed to update description. Please try again.");
      }
    } catch (error) {
      console.error("Error updating description:", error);
      toast.error("An error occurred while updating the description.");
    } finally {
      setIsUpdatingDescription(false);
    }
  };

  const [shippingPolicyModal, setShippingPolicyModal] = useState(false);
  const [returnPolicyModal, setReturnPolicyModal] = useState(false);
  const handleAddShippingPolicy = () => {
    setShippingPolicyModal(true);
  };

  const handleAddReturnPolicy = () => {
    setReturnPolicyModal(true);
  };

  return (
    <div className="w-full p-6 shadow-lg rounded-lg gap-6 lg:gap-8 border-gray-100 border-2">
      <div className="flex gap-4 mb-8">
        <div className="w-32 h-32 rounded-md overflow-hidden bg-gray-300 relative">
          {selectedImage ? (
            <img
              src={selectedImage}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-md mb-2 border-gray-400 border-2 absolute top-0 left-0 z-10"
            />
          ) : (
            shopData?.shopLogo && (
              <img
                src={`${BASE_URL}${shopData.shopLogo}`}
                alt={shopData.shopName}
                className="w-32 h-32 object-cover rounded-md mb-2 border-gray-400 border-2"
              />
            )
          )}
        </div>

        <div className="flex flex-col items-center justify-end space-y-4">
          <label className="cursor-pointer text-gray-800 hover:text-gray-700 text-center">
            {shopData?.shopLogo ? "Change Image" : "Upload Image"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>

          {selectedImage && (
            <button
              onClick={handleProfileUpdate}
              disabled={isUploading}
              className={`px-6 py-2 transition duration-300 ease-in-out ${
                isUploading
                  ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                  : "bg-gray-800 text-white hover:bg-gray-700"
              }`}
            >
              {isUploading ? "Uploading..." : "Save Image"}
            </button>
          )}
        </div>
      </div>

      {shopData && (
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-1/2">
            <h1 className="text-2xl font-semibold">{shopData.shopName}</h1>
            <p className="mt-2 text-gray-500">
              Created on: {DateUtils.formatDate(shopData.createdDate)}
            </p>
            <div className="mt-4">
              <p className="font-semibold text-gray-800 flex items-center">
                Shop Description
                <span
                  className="ml-2 cursor-pointer text-gray-600"
                  onClick={() => {
                    setDescription(shopData.shopDescription || "");
                    setEditDescription(true);
                  }}
                >
                  <FaRegEdit />
                </span>
              </p>
              {editDescription ? (
                <>
                  <ReactQuill
                    value={description}
                    onChange={handleDescriptionChange}
                    theme="snow"
                    className="mt-2 text-base"
                    modules={{ toolbar: false }}
                  />
                  <div className="flex gap-4 mt-4">
                    <button
                      onClick={handleDescriptionUpdate}
                      disabled={isUpdatingDescription}
                      className={`px-6 py-2 text-white font-semibold ${
                        isUpdatingDescription
                          ? "bg-gray-600 text-gray-100 cursor-not-allowed"
                          : "bg-gray-800 text-white hover:bg-gray-700"
                      }`}
                    >
                      {isUpdatingDescription ? "Saving..." : "Save"}
                    </button>
                    <button
                      onClick={() => setEditDescription(false)}
                      className="px-6 py-2 bg-gray-500 text-white hover:bg-gray-400 font-semibold"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <p
                  className="text-gray-600"
                  dangerouslySetInnerHTML={{ __html: shopData.shopDescription }}
                ></p>
              )}
            </div>
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-xl font-semibold mb-4">
              Categories You Can Sell
            </h2>
            <div className="grid grid-cols-auto-fit gap-4">
              {shopData.categories.map((category) => (
                <div
                  key={category._id}
                  className="border p-4 rounded-lg shadow-md flex justify-center items-center"
                >
                  <p className="text-center">{category.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col lg:flex-row gap-6 mt-8">
        <div className="lg:w-1/2">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold mb-4">Shipping Policies</h1>
            <button
              className="bg-gray-800 px-3 py-2 text-white font-semibold"
              onClick={handleAddShippingPolicy}
            >
              Add Policy
            </button>
          </div>
          <DefaultShippingPolicy />
          <ShopShippingPolicy
            accessToken={accessToken}
            shopId={shopId}
            setSuccessMsg={setSuccessMsg}
            setErrorMsg={setErrorMsg}
            callNewData={callNewData}
          />
        </div>

        <div className="lg:w-1/2">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold mb-4">Return Policies</h1>
            <button
              className="bg-gray-800 px-3 py-2 text-white font-semibold"
              onClick={handleAddReturnPolicy}
            >
              Add Policy
            </button>
          </div>
          <DefaultReturnPolicy />
          <ShopReturnPolicy
          accessToken={accessToken}
          shopId={shopId}
          setSuccessMsg={setSuccessMsg}
          setErrorMsg={setErrorMsg}
          callNewData={callNewData}
          />
        </div>
      </div>
      {shippingPolicyModal && (
        <AddShippingPolicyModal
          setShippingPolicyModal={setShippingPolicyModal}
          shopId={shopId}
          accessToken={accessToken}
          setSuccessMsg={setSuccessMsg}
          setErrorMsg={setErrorMsg}
          fetchData={fetchData}
          setCallNewData={setCallNewData}
        />
      )}
      {returnPolicyModal && (
        <AddReturnPolicyModal
          setReturnPolicyModal={setReturnPolicyModal}
          shopId={shopId}
          accessToken={accessToken}
          setSuccessMsg={setSuccessMsg}
          setErrorMsg={setErrorMsg}
          fetchData={fetchData}
          setCallNewData={setCallNewData}
        />
      )}
    </div>
  );
};

export default MyShop;