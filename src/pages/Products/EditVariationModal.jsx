import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FaRegTrashAlt, FaPlay, FaPause } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { RiImageAddFill } from "react-icons/ri";
import apiHandler from "../../api/apiHandler";
import config from "../../services/config";

const EditVariationModal = ({
  onClose, productId, variationId, accessToken, fetchVariationDetails
}) => {
  const BASE_URL = config.API_BASE_URL;

  const [media, setMedia] = useState(Array(10).fill(null));
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);
  const [colors, setColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [hasUniquePrice, setHasUniquePrice] = useState(false);
  const [price, setPrice] = useState("");
  const [hasUniqueWeight, setHasUniqueWeight] = useState(false);
  const [weight, setWeight] = useState("");
  const [hasUniqueStock, setHasUniqueStock] = useState(false);
  const [stock, setStock] = useState("");
  const [isDefault, setIsDefault] = useState(false);

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const data = await apiHandler(
          null,
          `/api/v1/get-colors/${productId}`,
          "GET",
          accessToken
        );
        setColors(data.colors);
      } catch (error) {
        console.error("Error fetching colors:", error);
      }
    };

    fetchColors();
  }, [productId, accessToken]);

  useEffect(() => {
    const fetchVariationDetails = async () => {
      try {
        const data = await apiHandler(
          null,
          `/api/v1/products/${productId}/variations/${variationId}`,
          "GET",
          accessToken
        );
        const variation = data.variation;

        const newMedia = Array(10).fill(null);
        variation.media.images.forEach((image, idx) => {
          newMedia[idx] = image;
        });
        if (variation.media.video) {
          newMedia[9] = variation.media.video;
        }

        setMedia(newMedia);
        setSelectedColor(variation.color || "");
        setHasUniquePrice(variation.hasUniquePrice);
        setPrice(variation.price || "");
        setHasUniqueWeight(variation.hasUniqueWeight);
        setWeight(variation.weight || "");
        setHasUniqueStock(variation.hasUniqueStock);
        setStock(variation.stock || "");
        setIsDefault(variation.isDefault);

        // Find the first non-null media item and set it as selected
        const firstNonNullIndex = newMedia.findIndex(item => item !== null);
        setSelectedMediaIndex(firstNonNullIndex !== -1 ? firstNonNullIndex : 0);
      } catch (error) {
        console.error("Error fetching variation details:", error);
      }
    };

    fetchVariationDetails();
  }, [productId, variationId, accessToken]);

  const handleMediaChange = (index, event) => {
    setLoading(true);
    const file = event.target.files[0];
    if (!file) {
      setLoading(false);
      return;
    }

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
    formData.append("haveVariations", "true");
    formData.append("color", selectedColor);
    formData.append("hasUniquePrice", hasUniquePrice);
    if (hasUniquePrice) formData.append("price", price);
    formData.append("hasUniqueWeight", hasUniqueWeight);
    if (hasUniqueWeight) formData.append("weight", weight);
    formData.append("hasUniqueStock", hasUniqueStock);
    if (hasUniqueStock) formData.append("stock", stock);

    const existingFiles = media.filter(file => typeof file === "string");
    const indexes = [];

    // Append the index and file to the form data
    media.forEach((file, index) => {
      if (file && typeof file !== "string") {
        formData.append("files", file);
        indexes.push(index); // Include the index of the file
      }
    });

    formData.append("existingFiles", JSON.stringify(existingFiles)); // Include existing file paths
    formData.append("indexes", indexes.join(",")); // Send indexes as a comma-separated string

    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    try {
      await apiHandler(
        formData,
        `/api/v1/products/${productId}/variations/${variationId}`,
        "PUT",
        accessToken
      );
      await fetchVariationDetails();
      onClose();
    } catch (error) {
      console.error("Error saving media:", error);
      if (error.response && error.response.data && error.response.data.message) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert("Error saving media. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const getMediaPreview = (item) => {
    if (typeof item === "string") {
      return BASE_URL + item;
    } else if (item) {
      return URL.createObjectURL(item);
    }
    return null;
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
                item ? "border-gray-300" : "border-dashed border-gray-300"
              } rounded-lg cursor-pointer flex items-center justify-center bg-gray-100 text-gray-500 ${
                selectedMediaIndex === index ? "border-4 border-gray-800" : ""
              }`}
            >
              {loading ? (
                <div className="loader border-t-4 border-gray-800 rounded-full w-8 h-8 animate-spin"></div>
              ) : item ? (
                index === 9 ? (
                  <video
                    src={getMediaPreview(item)}
                    className="w-full h-full object-cover rounded-lg"
                    muted
                    autoPlay={isPlaying}
                    loop
                    onClick={() => setSelectedMediaIndex(index)}
                  />
                ) : (
                  <img
                    src={getMediaPreview(item)}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                    onClick={() => setSelectedMediaIndex(index)}
                  />
                )
              ) : (
                <span>
                  <RiImageAddFill className="text-[2rem]" />
                </span>
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
                src={getMediaPreview(media[selectedMediaIndex])}
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
              src={getMediaPreview(media[selectedMediaIndex])}
              alt="Selected Preview"
              className="w-auto h-full object-cover rounded-lg"
            />
          )
        ) : (
          <div className="w-[70%] h-full bg-gray-100 flex flex-col items-center justify-center dotted-border border-gray-800 border-2">
            <span><RiImageAddFill className="text-[4rem]"/></span>
            <span className="mt-6">Select an image or video to preview</span>
          </div>
        )}
      </div>
      <div className="w-full md:w-2/12 flex flex-col items-center">
        {!isDefault && (
          <>
            <label htmlFor="color" className="text-gray-800 mb-2 mr-auto">
              Color
            </label>
            <select
              id="color"
              className="mb-4 p-2 border border-gray-300 rounded w-full"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
            >
              <option value="">Select a color</option>
              {colors.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>

            <div className="flex items-center mb-4 mr-auto">
              <label htmlFor="uniquePrice" className="text-gray-800 mr-2">
                Unique Price
              </label>
              <input
                id="uniquePrice"
                type="checkbox"
                className="form-checkbox h-5 w-5 text-gray-600"
                checked={hasUniquePrice}
                onChange={() => setHasUniquePrice(!hasUniquePrice)}
              />
            </div>
            <input
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mb-4 p-2 border border-gray-300 rounded w-full"
              disabled={!hasUniquePrice}
            />

            <div className="flex items-center mb-4 mr-auto">
              <label htmlFor="uniqueWeight" className="text-gray-800 mr-2">
                Unique Weight
              </label>
              <input
                id="uniqueWeight"
                type="checkbox"
                className="form-checkbox h-5 w-5 text-gray-600"
                checked={hasUniqueWeight}
                onChange={() => setHasUniqueWeight(!hasUniqueWeight)}
              />
            </div>
            <input
              type="number"
              placeholder="Enter weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="mb-4 p-2 border border-gray-300 rounded w-full"
              disabled={!hasUniqueWeight}
            />

            <div className="flex items-center mb-4 mr-auto">
              <label htmlFor="uniqueStock" className="text-gray-800 mr-2">
                Unique Stock
              </label>
              <input
                id="uniqueStock"
                type="checkbox"
                className="form-checkbox h-5 w-5 text-gray-600"
                checked={hasUniqueStock}
                onChange={() => setHasUniqueStock(!hasUniqueStock)}
              />
            </div>
            <input
              type="number"
              placeholder="Enter stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="mb-4 p-2 border border-gray-300 rounded w-full"
              disabled={!hasUniqueStock}
            />
          </>
        )}
        <button
          type="button"
          className="bg-gray-200 text-red-500 rounded-full p-4 mb-4 flex items-center"
          onClick={handleRemoveMedia}
        >
          <FaRegTrashAlt className="mr-2 text-red-500" /> Delete
        </button>
        <button
          type="button"
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 mt-12"
          onClick={handleSaveMedia}
        >
          Save Media
        </button>
      </div>
    </div>
  );
};

EditVariationModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  productId: PropTypes.string.isRequired,
  variationId: PropTypes.string.isRequired,
  accessToken: PropTypes.string.isRequired,
  fetchVariationDetails: PropTypes.func.isRequired,
};

export default EditVariationModal;