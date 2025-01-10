import React, { useState } from "react";
import siteService from "../../services/site/siteService";

const TaglineModal = ({
    setTaglineModal,
    dataId,
    fetchData,
    accessToken,
    setTaglineMessage,
    setTaglineErrorMsg,
    siteTagline,
}) => {
    const [newTagline, setNewTagline] = useState(siteTagline || "");
    const [loading, setLoading] = useState(false);

    const handleUpdateTagline = async () => {
        if (!newTagline.trim()) {
            setTaglineErrorMsg("Title cannot be empty.");
            return;
        }

        setLoading(true);
        try {
            const response = await siteService.updateSiteData(dataId, { tagline: newTagline }, accessToken);
            setTaglineMessage(response.message);
            fetchData();
            setTaglineModal(false);
        } catch (error) {
            setTaglineErrorMsg(error?.response?.data?.message || "An error occurred.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg w-full sm:w-8/12 md:w-6/12 lg:w-4/12 p-6">
                <h3 className="text-lg font-semibold mb-4">Edit Site Tagline</h3>
                <input
                    type="text"
                    value={newTagline}
                    onChange={(e) => setNewTagline(e.target.value)}
                    placeholder="Enter new site tagline"
                    className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <div className="flex justify-end gap-4">

                    <button
                        onClick={handleUpdateTagline}
                        className="px-4 py-2 bg-green-700 text-white hover:bg-green-800 font-semibold"
                        disabled={loading}
                    >
                        {loading ? "Saving..." : "Save"}
                    </button>
                    <button
                        onClick={() => setTaglineModal(false)}
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

export default TaglineModal;
