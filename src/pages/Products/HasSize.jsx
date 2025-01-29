import React, { useState, useEffect, useCallback } from "react";
import apiHandler from "../../api/apiHandler";

const HasSize = ({ productId, accessToken }) => {
  const [productDetails, setProductDetails] = useState({
    size: [],
    hasSize: false,
  });
  const [size, setSize] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchSizes = useCallback(async () => {
    try {
      const data = await apiHandler(
        null,
        `/api/v1/get-size/${productId}`,
        "GET",
        accessToken
      );
      setProductDetails({
        size: data.size,
        hasSize: data.hasSize,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [productId, accessToken]);

  useEffect(() => {
    fetchSizes();
  }, [fetchSizes]);

  const handleToggleSize = async () => {
    const newSizeState = !productDetails.hasSize;
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      hasSize: newSizeState,
    }));

    try {
      await apiHandler(
        { hasSize: newSizeState },
        `/api/v1/update-has-size/${productId}`,
        "PUT",
        accessToken
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddSize = async () => {
    try {
      await apiHandler(
        { size: size.toLowerCase() },
        `/api/v1/add-size/${productId}`,
        "PUT",
        accessToken
      );
      setSize("");
      await fetchSizes();
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveSize = async (sizeToRemove) => {
    try {
      await apiHandler(
        { size: sizeToRemove },
        `/api/v1/remove-size/${productId}`,
        "PUT",
        accessToken
      );
      await fetchSizes();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <></>;
  }

  return (
    <>
      <div className="flex flex-col space-y-2 mt-4">
        <label htmlFor="size" className="text-gray-800">
          Sizes
        </label>
        <button
          type="button"
          className={`${
            productDetails.hasSize ? "bg-gray-800" : "bg-gray-300"
          } relative inline-flex items-center h-6 rounded-full w-11 transition-size duration-200 ease-in-out`}
          onClick={handleToggleSize}
        >
          <span
            className={`${
              productDetails.hasSize ? "translate-x-6" : "translate-x-1"
            } inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out`}
          />
        </button>
      </div>
      {productDetails.hasSize && (
        <>
          <label htmlFor="size" className="text-gray-800">
            Add Size
          </label>
          <div className="flex flex-col space-y-4 mt-4 md:items-center md:flex-row md:space-x-4">
            <input
              type="text"
              id="size"
              name="size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              placeholder="Enter size"
              className="w-full md:w-3/12 border border-gray-300 p-2 shadow-sm outline-none"
            />
            <button
              type="button"
              onClick={handleAddSize}
              className="bg-gray-800 text-white px-4 py-2 hover:bg-gray-700"
            >
              Add Size
            </button>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Current size
            </h3>
            <div className="flex flex-wrap mt-4 space-x-2">
              {productDetails.size.map((size, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 bg-gray-200 px-4 py-2 rounded-lg"
                >
                  <span className="text-gray-800">{size}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSize(size)}
                    className="text-red-500 hover:text-red-700"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default HasSize;