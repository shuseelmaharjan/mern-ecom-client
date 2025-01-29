import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaTrash, FaPlay, FaPause } from 'react-icons/fa';
import { FaXmark } from "react-icons/fa6";
import { RiImageAddFill } from "react-icons/ri";
import apiHandler from "../../api/apiHandler";

const AddMediaModal = ({ onClose, productId, accessToken, fetchVariationDetails }) => {
  const [media, setMedia] = useState(Array(10).fill(null));
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(null);

  const handleMediaChange = (index, event) => {
    setLoading(true);
    const file = event.target.files[0];
    if (!file) return;

    const newMedia = [...media];
    newMedia[index] = file;
    setMedia(newMedia);
    setSelectedMediaIndex(index);
    setLoading(false);
  };

  const handleRemoveMedia = () => {
    if (selectedMediaIndex !== null) {
      const newMedia = [...media];
      newMedia[selectedMediaIndex] = null;
      setMedia(newMedia);
      setSelectedMediaIndex(null);
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSaveMedia = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('haveVariations', 'false');
    media.forEach((file, index) => {
      if (file) {
        formData.append('files', file);
      }
    });

    try {
      await apiHandler(
        formData,
        `/api/v1/products/${productId}/variations`,
        "PUT",
        accessToken
      );
      await fetchVariationDetails(); 
      onClose();
    } catch (error) {
      console.error('Error saving media:', error);
      alert('Error saving media. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-white text-gray-700">
      <button
        type="button"
        className="absolute top-4 right-4 text-gray-500 text-2xl border-gray-500 rounded-full border-2 p-4 hover:text-gray-700"
        onClick={onClose}
      >
        <FaXmark />
      </button>
      
      <div className="w-full md:w-2/12 grid grid-cols-2 gap-4">
        {media.map((item, index) => (
          <div key={index} className="relative">
            <label
              className={`block w-full h-32 border-2 ${
                item ? 'border-gray-300' : 'border-dashed border-gray-300'
              } rounded-lg cursor-pointer flex items-center justify-center bg-gray-100 text-gray-500 ${
                selectedMediaIndex === index ? 'border-4 border-gray-800' : ''
              }`}
            >
              {loading ? (
                <div className="loader border-t-4 border-gray-800 rounded-full w-8 h-8 animate-spin"></div>
              ) : item ? (
                index === 9 ? (
                  <video
                    src={URL.createObjectURL(item)}
                    className="w-full h-full object-cover rounded-lg"
                    muted
                    autoPlay={isPlaying}
                    loop
                    onClick={() => setSelectedMediaIndex(index)}
                  />
                ) : (
                  <img
                    src={URL.createObjectURL(item)}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                    onClick={() => setSelectedMediaIndex(index)}
                  />
                )
              ) : (
                <span><RiImageAddFill className='text-[2rem]'/></span>
              )}
              <input
                type="file"
                accept={index === 9 ? "video/*" : "image/*"}
                className="hidden"
                onChange={(e) => handleMediaChange(index, e)}
                disabled={!!item}
              />
            </label>
          </div>
        ))}
      </div>
      <div className="w-auto h-screen md:w-7/12 flex flex-col items-center justify-center py-8 px-4">
        {selectedMediaIndex !== null && media[selectedMediaIndex] ? (
          selectedMediaIndex === 9 ? (
            <div className="relative w-auto h-full">
              <video
                src={URL.createObjectURL(media[selectedMediaIndex])}
                className="w-auto h-full object-cover rounded-lg"
                muted
                autoPlay={isPlaying}
                loop
                controls={false}
              />
              <button
                type="button"
                className="absolute bottom-2 right-2 bg-gray-800 text-white rounded-full p-1"
                onClick={handlePlayPause}
              >
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>
            </div>
          ) : (
            <img
              src={URL.createObjectURL(media[selectedMediaIndex])}
              alt="Selected Preview"
              className="w-auto h-full object-cover rounded-lg"
            />
          )
        ) : (
          <div className="w-[70%] h-full bg-gray-100 flex items-center justify-center dotted-border border-gray-800 border-2">
            <span>Select an image or video to preview</span>
          </div>
        )}
      </div>
      <div className="w-full md:w-2/12 flex flex-col items-center justify-center">
        <button
          type="button"
          className="bg-red-500 text-white rounded-full p-4 mb-4 flex items-center"
          onClick={handleRemoveMedia}
        >
          <FaTrash className="mr-2" /> Delete
        </button>
        <button
          type="button"
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
          onClick={handleSaveMedia}
        >
          Save Media
        </button>
      </div>
    </div>
  );
};

AddMediaModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  productId: PropTypes.string.isRequired,
  accessToken: PropTypes.string.isRequired,
  fetchVariationDetails: PropTypes.func.isRequired,
};

export default AddMediaModal;