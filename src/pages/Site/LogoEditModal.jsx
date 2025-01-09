import React, { useState, useRef } from 'react';
import siteService from '../../services/site/siteService';
import { FaTrash } from 'react-icons/fa';

const LogoEditModal = ({ setLogoModal, dataId, fetchData, accessToken, setMessage, setErrorMsg }) => {

    
    const [logoFile, setLogoFile] = useState(null);
    const fileInputRef = useRef(null);
  
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      setLogoFile(file);
    };
  
    const handleRemoveImage = () => {
      setLogoFile(null);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!logoFile) {
        setMessage("Please select an image file.");
        return;
      }
  
      const formData = new FormData();
      formData.append("logo", logoFile);
  
      try {
        const response = await siteService.updateSiteData(dataId, formData, accessToken);
          setMessage(response.message);
          setLogoModal(false); 
          await fetchData(); 

      } catch (error) {
        setErrorMsg(error);
        console.error(error);
      }
    };
  
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-xl font-semibold mb-4 text-center">Update Logo</h2>
  
          <div className="mb-4">
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
  
          <form onSubmit={handleSubmit}>
            <div className="flex justify-end gap-x-4">
              <button
                type="submit"
                className="px-4 py-2 bg-green-700 text-white hover:bg-green-800 font-semibold"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setLogoModal(false)}
                className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 font-semibold"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  

export default LogoEditModal;
