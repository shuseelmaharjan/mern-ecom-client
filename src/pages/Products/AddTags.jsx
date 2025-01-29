import React, { useState, useEffect, useCallback } from "react";
import apiHandler from "../../api/apiHandler";

const AddTags = ({ productId, accessToken }) => {
  const [productDetails, setProductDetails] = useState({
    tags: [],
  });
  const [tag, setTag] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchTags = useCallback(async () => {
    try {
      const data = await apiHandler(
        null,
        `/api/v1/get-tags/${productId}`,
        "GET",
        accessToken
      );
      setProductDetails({
        tags: data.tags,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [productId, accessToken]);

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  const handleAddTag = async () => {
    try {
      await apiHandler(
        { tags: tag.toLowerCase() },
        `/api/v1/add-tags/${productId}`,
        "PUT",
        accessToken
      );
      setTag("");
      await fetchTags();
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveTag = async (tagToRemove) => {
    try {
      await apiHandler(
        { tags: tagToRemove },
        `/api/v1/remove-tags/${productId}`,
        "PUT",
        accessToken
      );
      await fetchTags();
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
        <label htmlFor="tag" className="text-gray-800">
          Tags
        </label>
      </div>
      <div className="flex flex-col space-y-4 mt-4 md:items-center md:flex-row md:space-x-4">
        <input
          type="text"
          id="tag"
          name="tag"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          placeholder="Enter tag"
          className="w-full md:w-3/12 border border-gray-300 p-2 shadow-sm outline-none"
        />
        <button
          type="button"
          onClick={handleAddTag}
          className="bg-gray-800 text-white px-4 py-2 hover:bg-gray-700"
        >
          Add Tag
        </button>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800">
          Current Tags
        </h3>
        <div className="flex flex-wrap mt-4 gap-2">
          {productDetails.tags.map((tag, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 bg-gray-200 px-4 py-2 rounded-lg"
            >
              <span className="text-gray-800">{tag}</span>
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="text-red-500 hover:text-red-700"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AddTags;