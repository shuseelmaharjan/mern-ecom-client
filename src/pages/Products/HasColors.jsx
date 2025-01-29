import React, { useState, useEffect, useCallback } from "react";
import apiHandler from "../../api/apiHandler";

const HasColors = ({ productId, accessToken }) => {
  const [productDetails, setProductDetails] = useState({
    colors: [],
    hasColor: false,
  });
  const [color, setColor] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchColors = useCallback(async () => {
    try {
      const data = await apiHandler(
        null,
        `/api/v1/get-colors/${productId}`,
        "GET",
        accessToken
      );
      setProductDetails({
        colors: data.colors,
        hasColor: data.hasColor,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [productId, accessToken]);

  useEffect(() => {
    fetchColors();
  }, [fetchColors]);

  const handleToggleColors = async () => {
    const newColorsState = !productDetails.hasColor;
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      hasColor: newColorsState,
    }));

    try {
      await apiHandler(
        { hasColor: newColorsState },
        `/api/v1/update-has-colors/${productId}`,
        "PUT",
        accessToken
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddColor = async () => {
    try {
      await apiHandler(
        { color: color.toLowerCase() },
        `/api/v1/add-color/${productId}`,
        "PUT",
        accessToken
      );
      setColor("");
      await fetchColors();
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveColor = async (colorToRemove) => {
    try {
      await apiHandler(
        { color: colorToRemove },
        `/api/v1/remove-color/${productId}`,
        "PUT",
        accessToken
      );
      await fetchColors();
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
        <label htmlFor="colors" className="text-gray-800">
          Colors
        </label>
        <button
          type="button"
          className={`${
            productDetails.hasColor ? "bg-gray-800" : "bg-gray-300"
          } relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ease-in-out`}
          onClick={handleToggleColors}
        >
          <span
            className={`${
              productDetails.hasColor ? "translate-x-6" : "translate-x-1"
            } inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out`}
          />
        </button>
      </div>
      {productDetails.hasColor && (
        <>
          <label htmlFor="color" className="text-gray-800">
            Add Color
          </label>
          <div className="flex flex-col space-y-4 mt-4 md:items-center md:flex-row md:space-x-4">
            <input
              type="text"
              id="color"
              name="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              placeholder="Enter color"
              className="w-full md:w-3/12 border border-gray-300 p-2 shadow-sm outline-none"
            />
            <button
              type="button"
              onClick={handleAddColor}
              className="bg-gray-800 text-white px-4 py-2 hover:bg-gray-700"
            >
              Add Color
            </button>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Current Colors
            </h3>
            <div className="flex flex-wrap mt-4 space-x-2">
              {productDetails.colors.map((color, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 bg-gray-200 px-4 py-2 rounded-lg"
                >
                  <span className="text-gray-800">{color}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveColor(color)}
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

export default HasColors;