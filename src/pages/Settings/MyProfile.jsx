import React, { useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import config from "../../services/config";
import { useAuth } from "../../context/AuthContext";
import authService from "../../services/authService/authService";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { IoMdMail } from "react-icons/io";

const MyProfile = () => {
  const token = Cookies.get("_r");
  const decodeToken = jwtDecode(token);
  const userId = decodeToken.id;

  const BASE_URL = config.API_BASE_URL;
  const { accessToken } = useAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProfile, setUploadProfile] = useState('');

  const [nameChange, setNameChange] = useState(false);
  const [name, setName] = useState('');
  const [newName, setNewName] = useState(name || "");

  const [emailChange, setEmailChange] = useState(false);
  const [email, setEmail] = useState('');
  const [newEmail, setNewEmail] = useState(email || "");
 
  
  const fetchData = useCallback(async () => {
    try {
      const data = await authService.settingProfileInfo(accessToken, userId);
      setUserInfo(data.data);
      setName(data.data.name);
      setNewName(data.data.name);
      setEmail(data.data.email);
      setNewEmail(data.data.email);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    } finally {
      setLoading(false);
    }
  }, [accessToken, userId]);

  useEffect(() => {
    fetchData();
  }, [accessToken, userId, fetchData]);


  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setUploadProfile(file);
    }
  };

  const handleProfileUpdate = async () => {
    if (!uploadProfile) return;

    const formData = new FormData();
    formData.append("profileImg", uploadProfile);

    setIsUploading(true);

    try {
      await authService.updateProfileImage(accessToken, userId, formData);
      setSelectedImage(null);
      fetchData();
    } catch (error) {
      console.error("Failed to update profile image:", error);
    } finally {
      setIsUploading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleNameEditForm = () => {
    setNameChange(true);
  };

  const handleNameEditCancel = () => {
    setNameChange(false);
  };

  const handleSaveChanges = async () => {
    try {
      await authService.updateUserName(accessToken, userId, { name: newName });
      setNameChange(false);
      fetchData();
      toast.success('Name updated successfully'); 
    } catch (error) {
      console.error("Failed to update name:", error);
      const errorMessage = "Failed to update name."; 
      toast.error(errorMessage); 
    }
  };

  const handleEmailChange = () => {
    setEmailChange(true);
  };

  const handleEmailCancel = () => {
    setEmailChange(false);
  };

  const handleSaveEmail = async () => {
    try {
      await authService.updateEmail(accessToken, userId, { email: newEmail });
      fetchData();
      setEmailChange(false);
      toast.success("Email updated successfully"); 
    } catch (error) {
      console.error("Failed to update email:", error);
      const errorMessage = "Failed to update email.";
      toast.error(errorMessage); 
    }
  };

  
  return (
    <div className="block w-full h-auto px-4 py-6">
      <div className="flex gap-4 mb-8">
        <div className="w-32 h-32 rounded-md overflow-hidden bg-gray-300 relative">
          {selectedImage ? (
            <img
              src={selectedImage}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-md mb-2 border-gray-400 border-2 absolute top-0 left-0 z-10"
            />
          ) : (
            userInfo.profileImg !== "null" &&
            userInfo.profileImg && (
              <img
                src={`${BASE_URL}${userInfo.profileImg}`}
                alt={userInfo.name}
                className="w-32 h-32 object-cover rounded-md mb-2 border-gray-400 border-2"
              />
            )
          )}
        </div>

        <div className="flex flex-col items-center justify-end space-y-4">
          {userInfo.profileImg === "null" || !userInfo.profileImg ? (
            <label className="cursor-pointer text-gray-800 hover:text-gray-700 text-center">
              Upload Image
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          ) : (
            <div className="text-center">
              <label className="cursor-pointer text-gray-800 hover:text-gray-700">
                Change Image
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          )}

          {selectedImage && !isUploading && (
            <button
              onClick={handleProfileUpdate}
              className="bg-gray-800 text-white px-6 py-2 hover:bg-gray-700 transition duration-300 ease-in-out"
            >
              Save Image
            </button>
          )}
        </div>
      </div>

      <div className="flex py-2 space-x-4">
        {nameChange ? (
          <>
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 w-6/12">
              <input
                type="text"
                value={newName}                
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Full Name"
                className="flex-grow border border-gray-300 p-2 shadow-sm outline-none"
              />
              <div className="flex space-x-2">
                <button className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 px-4 text-sm shadow-md transition duration-200 w-full"
                onClick={handleSaveChanges}>
                  Save Changes
                </button>
                <button
                  onClick={handleNameEditCancel}
                  className="bg-red-600 hover:bg-red-500 text-white font-semibold py-2 px-4 text-sm shadow-md transition duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-base font-semibold">{userInfo.name}</h2>
            <button className="text-lg" onClick={handleNameEditForm}>
              <FaEdit />
            </button>
          </>
        )}
      </div>
      <div className="flex py-2 space-x-4">
      {emailChange ? (
          <>
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 w-6/12">
              <input
                type="text"
                value={newEmail}                
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="Email"
                className="flex-grow border border-gray-300 p-2 shadow-sm outline-none"
              />
              <div className="flex space-x-2">
                <button className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 px-4 text-sm shadow-md transition duration-200 w-full"
                onClick={handleSaveEmail}>
                  Save Changes
                </button>
                <button
                  onClick={handleEmailCancel}
                  className="bg-red-600 hover:bg-red-500 text-white font-semibold py-2 px-4 text-sm shadow-md transition duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-base font-semibold flex items-center"><IoMdMail className="mr-2"/> {userInfo.email}</h2>
            <button className="text-lg" onClick={handleEmailChange}>
              <FaEdit />
            </button>
          </>
        )}
      </div>

      <div className="block p-4 border border-gray-300 rounded-md mt-4">
        <h1 className="text-xl font-bold mb-2">Default Shipping Address</h1>
        <p className="font-semibold text-lg">{userInfo.defaultAddress.fullName}</p>
        <p>{userInfo.defaultAddress.addressLine1}</p>
        {userInfo.defaultAddress.addressLine2 && <p>{userInfo.defaultAddress.addressLine2}</p>}
        <p>
          {userInfo.defaultAddress.city}, {userInfo.defaultAddress.state}
        </p>
        <p>Postal Code: {userInfo.defaultAddress.postalCode}</p>
        <p>Country: {userInfo.defaultAddress.country}</p>
        <p>Contact: {userInfo.defaultAddress.phone || 'N/A'}</p>
      </div>

    </div>
  );
};

export default MyProfile;
