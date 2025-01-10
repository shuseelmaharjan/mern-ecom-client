import React, { useState } from "react";
import siteService from "../../services/site/siteService";

const TitleModal = ({
  setTitleModel,
  dataId,
  fetchData,
  accessToken,
  setTitleMessage,
  setTitleErrorMsg,
  siteTitle,
}) => {
  const [newTitle, setNewTitle] = useState(siteTitle || "");
  const [loading, setLoading] = useState(false);

  const handleUpdateTitle = async () => {
    if (!newTitle.trim()) {
      setTitleErrorMsg("Title cannot be empty.");
      return;
    }

    setLoading(true);
    try {
      const response = await siteService.updateSiteData(
        dataId,
        { title: newTitle },
        accessToken
      );
      setTitleMessage(response.message);
      fetchData();
      setTitleModel(false);
    } catch (error) {
      setTitleErrorMsg(error?.response?.data?.message || "An error occurred.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full sm:w-8/12 md:w-6/12 lg:w-4/12 p-6">
        <h3 className="text-lg font-semibold mb-4">Edit Site Title</h3>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Enter new site title"
          className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <div className="flex justify-end gap-4">
          <button
            onClick={handleUpdateTitle}
            className="px-4 py-2 bg-green-700 text-white hover:bg-green-800 font-semibold"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
          <button
            onClick={() => setTitleModel(false)}
            className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 font-semibold"
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TitleModal;
