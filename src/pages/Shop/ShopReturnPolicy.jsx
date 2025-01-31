import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import config from "../../services/config";
import { FaRegTrashAlt } from "react-icons/fa";
import DateUtils from "../../utils/dateUtils";

const ShopReturnPolicy = ({
  accessToken,
  shopId,
  setSuccessMsg,
  setErrorMsg,
  callNewData,
}) => {
  const BASE_URL = config.API_BASE_URL;

  const [data, setData] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/get-shop-return-policy/${shopId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [BASE_URL, accessToken, shopId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (callNewData) {
      fetchData();
    }
  }, [callNewData, fetchData]);

  const handleRemovePolicy = async (policyId) => {
    try {
      await axios.put(
        `${BASE_URL}/api/v1/deactivate-shop-return-policy/${policyId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setSuccessMsg("Return policy removed successfully");
      fetchData();
    } catch (error) {
      setErrorMsg("Error removing return policy");
      console.error("Error removing return policy:", error);
    }
  };

  return (
    <div>
      {data.length > 0 ? (
        <>
          {data.map((item, index) => (
            <div
              key={index}
              className="w-full p-4 border border-gray-300 shadow-sm mb-4 rounded-lg"
            >
              <div className="flex flex-col text-sm">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex gap-4 items-center">
                    <span className="font-semibold text-base">
                      {item.policyName}
                    </span>
                    <span className="italic">
                      Created At: {DateUtils.formatDate(item.createdAt)}
                    </span>
                  </div>
                  <button
                    onClick={() => handleRemovePolicy(item._id)}
                    className="px-3 py-1 border-2 border-red-500 rounded-full bg-red-500 text-white flex items-center gap-2"
                  >
                    <FaRegTrashAlt /> Remove
                  </button>
                </div>

                <span
                  dangerouslySetInnerHTML={{ __html: item.policyDescription }}
                ></span>
              </div>
            </div>
          ))}
        </>
      ) : (
        <p className="text-center text-gray-600">No records found</p>
      )}
    </div>
  );
};

export default ShopReturnPolicy;
