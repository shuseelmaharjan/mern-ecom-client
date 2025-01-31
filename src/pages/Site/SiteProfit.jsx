import { useEffect, useState, useCallback } from "react";
import apiHandler from "../../api/apiHandler";

const SiteProfit = ({ accessToken }) => {
  const [siteProfit, setSiteProfit] = useState([]);
  const [siteForm, setSiteForm] = useState(false);
  const [profitValue, setProfitValue] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    percentage: 0,
  });

  // Wrap fetchSiteProfit in useCallback to fix the useEffect dependency warning
  const fetchSiteProfit = useCallback(async () => {
    try {
      const data = await apiHandler(
        null,
        `/api/v1/site-charges`,
        "GET",
        accessToken
      );
      setSiteProfit(data); // Assuming data is an array
    } catch (error) {
      console.error("Error getting site profit:", error);
    }
  }, [accessToken]);

  useEffect(() => {
    fetchSiteProfit();
  }, [fetchSiteProfit]);

  const handleAddPercentage = () => {
    setProfitValue(false);
    setSiteForm(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiHandler(formData, `/api/v1/create-site-charge`, "POST", accessToken);
      setSiteForm(false);
      setProfitValue(true);
      fetchSiteProfit();
    } catch (error) {
      console.error("Error adding percentage:", error);
    }
  };

  return (
    <div>
      {siteProfit.length === 0 ? (
        <>
          {profitValue && (
            <div className="flex flex-col sm:flex-row w-full h-auto bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out justify-between items-center">
              <span className="text-gray-900 text-lg font-semibold items-center flex">
                No record found for site profit yet.
              </span>
              <button
                onClick={handleAddPercentage}
                className="flex gap-x-2 mt-2 sm:mt-0 text-white bg-gradient-to-r from-green-500 to-green-600 font-semibold py-2 px-5 items-center rounded-full shadow-md"
              >
                Add Percentage
              </button>
            </div>
          )}

          {siteForm && (
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4 bg-gray-100 p-4 rounded-lg shadow-md">
              <div className="flex flex-col">
                <label htmlFor="title" className="text-gray-700 font-semibold">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="p-2 border rounded"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="percentage" className="text-gray-700 font-semibold">
                  Percentage
                </label>
                <input
                  type="number"
                  id="percentage"
                  name="percentage"
                  value={formData.percentage}
                  onChange={handleChange}
                  className="p-2 border rounded"
                  required
                />
              </div>
              <button
                type="submit"
                className="self-end text-white bg-gradient-to-r from-blue-500 to-blue-600 font-semibold py-2 px-5 rounded-full shadow-md"
              >
                Submit
              </button>
            </form>
          )}
        </>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row w-full h-auto bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out justify-between items-center">
            <span className="text-gray-900 text-lg font-semibold items-center flex">
              Current site profit: {siteProfit[0].percentage}%
            </span>
            <button
              onClick={handleAddPercentage}
              className="flex gap-x-2 mt-2 sm:mt-0 text-white bg-gradient-to-r from-green-500 to-green-600 font-semibold py-2 px-5 items-center rounded-full shadow-md"
            >
              Update
            </button>
          </div>

          {siteForm && (
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4 bg-gray-100 p-4 rounded-lg shadow-md">
              <div className="flex flex-col">
                <label htmlFor="title" className="text-gray-700 font-semibold">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="p-2 border rounded"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="percentage" className="text-gray-700 font-semibold">
                  Percentage
                </label>
                <input
                  type="number"
                  id="percentage"
                  name="percentage"
                  value={formData.percentage}
                  onChange={handleChange}
                  className="p-2 border rounded"
                  required
                />
              </div>
              <button
                type="submit"
                className="self-end text-white bg-gradient-to-r from-blue-500 to-blue-600 font-semibold py-2 px-5 rounded-full shadow-md"
              >
                Submit
              </button>
            </form>
          )}
        </>
      )}
    </div>
  );
};

export default SiteProfit;