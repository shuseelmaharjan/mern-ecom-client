import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import siteService from "../../services/site/siteService";

const DescriptionModal = ({
  setDescriptionModal,
  dataId,
  fetchData,
  accessToken,
  setDescriptionMsg,
  setDescriptionError,
  siteDescription,
}) => {
  const [newDescription, setNewDescription] = useState(siteDescription || "");
  const [loading, setLoading] = useState(false);

  const handleUpdateDescription = async () => {
    if (!newDescription.trim()) {
      setDescriptionError("Description cannot be empty.");
      return;
    }

    setLoading(true);
    try {
      const response = await siteService.updateSiteData(
        dataId,
        { description: newDescription },
        accessToken
      );
      setDescriptionMsg(response.message);
      fetchData();
      setDescriptionModal(false);
    } catch (error) {
      setDescriptionError(
        error?.response?.data?.message || "An error occurred."
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full sm:w-8/12 md:w-6/12 lg:w-4/12 p-6">
        <h3 className="text-lg font-semibold mb-4">Edit Site Description</h3>
        <ReactQuill
          value={newDescription}
          onChange={setNewDescription}
          theme="snow"
          className="mt-2 text-base"
          modules={{
            toolbar: [
              ["bold", "italic", "underline", "strike"],
              ["blockquote", "code-block"],
              [{ list: "ordered" }, { list: "bullet" }],
              [{ align: [] }],
              ["link"],
            ],
          }}
        />
        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={handleUpdateDescription}
            className="px-4 py-2 bg-green-700 text-white hover:bg-green-800 font-semibold"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
          <button
            onClick={() => setDescriptionModal(false)}
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

export default DescriptionModal;
