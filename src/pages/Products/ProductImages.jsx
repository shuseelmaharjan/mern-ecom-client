import React, { useState, useEffect, useCallback } from "react";
import apiHandler from "../../api/apiHandler";
import AddMediaModal from "./AddMediaModal";
import "./css/Products.css";
import config from "../../services/config";
import AddVariationModal from "./AddVariationModal";
import EditVariationModal from "./EditVariationModal";
import ConfirmationModal from "./ConfirmationModal";
import productService from "../../services/productService/productService";

const ProductImages = ({ productId, accessToken }) => {
  const BASE_URL = config.API_BASE_URL;

  const [variationDetails, setVariationDetails] = useState({
    haveVariations: false,
    variations: [],
  });
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [variationModalOpen, setVariationModalOpen] = useState(false);
  const [variationEditModalOpen, setEditVariationModalOpen] = useState(false);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [variationIdToDelete, setVariationIdToDelete] = useState(null);

  const fetchVariationDetails = useCallback(async () => {
    try {
      const data = await apiHandler(
        null,
        `/api/v1/get-product-variation/${productId}`,
        "GET",
        accessToken
      );
      setVariationDetails(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [productId, accessToken]);

  useEffect(() => {
    fetchVariationDetails();
  }, [fetchVariationDetails]);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleOpenVariationModal = () => {
    setVariationModalOpen(true);
  };

  const handleCloseModal = async () => {
    setModalOpen(false);
    await fetchVariationDetails();
  };

  const [variationId, setVariationId] = useState(null);
  const handleOpenEdit = async (variationId) => {
    setEditVariationModalOpen(true);
    setVariationId(variationId);
  };

  const handleCloseVariationModal = async () => {
    setVariationModalOpen(false);
    await fetchVariationDetails();
  };
  const handleCloseEditVariationModal = async () => {
    setEditVariationModalOpen(false);
    await fetchVariationDetails();
  };

  const handleToggle = async (field) => {
    const updatedValue = !variationDetails[field];

    try {
      await apiHandler(
        { [field]: updatedValue },
        `/api/v1/update-has-variations/${productId}`,
        "PUT",
        accessToken
      );
      setVariationDetails((prevDetails) => ({
        ...prevDetails,
        [field]: updatedValue,
      }));
    } catch (err) {
      console.error("Error updating haveVariations:", err);
    }
  };

  const handleOpenConfirmationModal = (variationId) => {
    setVariationIdToDelete(variationId);
    setConfirmationModalOpen(true);
  };

  const handleCloseConfirmationModal = () => {
    setConfirmationModalOpen(false);
    setVariationIdToDelete(null);
  };

  const handleConfirmDelete = async () => {
    try {
      await productService.removeVariation(productId, variationIdToDelete, accessToken);  
      await fetchVariationDetails();
      handleCloseConfirmationModal();
    } catch (err) {
      console.error("Error deleting variation:", err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const defaultVariation = variationDetails.variations.find(
    (variation) => variation.isDefault
  );

  const nonDefaultVariations = variationDetails.variations.filter(
    (variation) => !variation.isDefault
  );

  return (
    <div className="flex flex-col w-full">
      {defaultVariation ? (
        <div>
          <div className="images-grid">
            {defaultVariation.media.images.map((image, index) => (
              <div key={index} className="image-container">
                <img
                  src={`${BASE_URL}${image}`}
                  alt={`Product ${index + 1}`}
                  className="product-image"
                />
              </div>
            ))}
            {defaultVariation.media.video && (
              <div className="video-container">
                <video controls className="product-video">
                  <source
                    src={`${BASE_URL}${defaultVariation.media.video}`}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
          </div>

          <div className="edit-media-container">
            <button
              type="button"
              className="bg-gray-300 text-gray-800 font-bold px-4 py-2 hover:bg-gray-150 rounded-full"
              onClick={() => handleOpenEdit(defaultVariation._id)}
            >
              Edit Media Files
            </button>
          </div>
        </div>
      ) : (
        <div className="no-variations w-full">
          <div className="flex flex-col w-full justify-center items-center bg-gray-100 rounded-md h-56 border-4 border-dotted border-gray-300 py-4">
            <label className="text-gray-800 text-center mb-2">
              Photos and videos
            </label>
            <p className="text-center mb-4">Add up to 10 photos and 1 video</p>
            <div className="add-media-container">
              <button
                type="button"
                className="bg-gray-300 text-gray-800 font-bold px-4 py-2 hover:bg-gray-150 rounded-full"
                onClick={handleOpenModal}
              >
                Add up to 10 photos and 1 video
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col space-y-2 mt-4">
        <label htmlFor="haveVariations" className="text-gray-800">
          Have Product Variations
        </label>
        <button
          type="button"
          className={`${
            variationDetails.haveVariations ? "bg-gray-800" : "bg-gray-300"
          } relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ease-in-out`}
          onClick={() => handleToggle("haveVariations")}
        >
          <span
            className={`${
              variationDetails.haveVariations
                ? "translate-x-6"
                : "translate-x-1"
            } inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out`}
          />
        </button>
      </div>

      {variationDetails.haveVariations && (
        <div>
          {nonDefaultVariations.length > 0 ? (
            nonDefaultVariations.map((variation) => (
              <div key={variation._id} className="mt-10">
                <div className="images-grid">
                  {variation.media.images.map((image, index) => (
                    <div key={index} className="image-container">
                      <img
                        src={`${BASE_URL}${image}`}
                        alt={`Variation ${index + 1}`}
                        className="product-image"
                      />
                    </div>
                  ))}
                  {variation.media.video && (
                    <div className="video-container">
                      <video controls className="product-video">
                        <source
                          src={`${BASE_URL}${variation.media.video}`}
                          type="video/mp4"
                        />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  )}
                </div>
                <div className="edit-media-container flex gap-8">
                  <button
                    type="button"
                    className="bg-gray-300 text-gray-800 font-bold px-4 py-2 hover:bg-gray-150 rounded-full"
                    onClick={() => handleOpenEdit(variation._id)}
                  >
                    Edit Media Files
                  </button>

                  <button
                    type="button"
                    className="bg-red-500 text-white font-bold px-4 py-2 hover:bg-red-600 rounded-full"
                    onClick={() => handleOpenConfirmationModal(variation._id)}
                  >
                    Remove This Variation Media
                  </button>
                </div>
              </div>
            ))
          ) : null}

          <div className="no-variations w-full mt-10">
            <div className="flex flex-col w-full justify-center items-center bg-gray-100 rounded-md h-56 border-4 border-dotted border-gray-300 py-4">
              <label className="text-gray-800 text-center mb-2">
                Photos and videos
              </label>
              <p className="text-center mb-4">Add up to 10 photos and 1 video</p>
              <p className="text-center mb-4">
                Add up Media Files for the product variations.
              </p>
              <div className="add-media-container">
                <button
                  type="button"
                  className="bg-gray-300 text-gray-800 font-bold px-4 py-2 hover:bg-gray-150 rounded-full"
                  onClick={handleOpenVariationModal}
                >
                  Add Media
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {modalOpen && (
        <AddMediaModal
          onClose={handleCloseModal}
          productId={productId}
          initialHaveVariations={variationDetails.haveVariations}
          accessToken={accessToken}
          fetchVariationDetails={fetchVariationDetails}
        />
      )}

      {variationModalOpen && (
        <AddVariationModal
          onClose={handleCloseVariationModal}
          productId={productId}
          initialHaveVariations={variationDetails.haveVariations}
          accessToken={accessToken}
          fetchVariationDetails={fetchVariationDetails}
        />
      )}
      {variationEditModalOpen && (
        <EditVariationModal
          onClose={handleCloseEditVariationModal}
          productId={productId}
          variationId={variationId}
          initialHaveVariations={variationDetails.haveVariations}
          accessToken={accessToken}
          fetchVariationDetails={fetchVariationDetails}
        />
      )}
      {confirmationModalOpen && (
        <ConfirmationModal
          message="Are you sure you want to remove this variation?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCloseConfirmationModal}
        />
      )}
    </div>
  );
};

export default ProductImages;