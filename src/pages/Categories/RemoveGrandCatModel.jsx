import React from "react";
import { capitalizeFirstLetter } from "../../utils/textUtils";
import categoryService from "../../services/categoryService/categoryService";

const RemoveGrandCatModel = ({grandChildCatId, grandChildCatName, grandChildParentId,  grandChildParentName, grandChildId, grandChildName, setRemoveGrandCatModel, getData, accessToken, setGrandRemoveSuccessMsg, setGrandRemoveErrorMsg}) => {
    const handleConfirm = async () => {
        console.log(grandChildId);
        try {
          await categoryService.removeGrandCategory(accessToken, grandChildCatId, grandChildParentId, grandChildId);
        setGrandRemoveSuccessMsg(
            `${capitalizeFirstLetter(
                grandChildParentName
            )} child ${capitalizeFirstLetter(grandChildName)} removed successfully.`
          );
          getData();
          setRemoveGrandCatModel(false);
        } catch (error) {
          console.error(error);
          setGrandRemoveErrorMsg(
            `Failed to remove ${grandChildName} child ${capitalizeFirstLetter(
                grandChildParentName
            )}.`
          );
        }
      };
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
              Confirm Removal
            </h2>
            <p className="text-center text-gray-600 mb-8">
              Are you sure you want to remove{" "}
              <span className="font-semibold text-gray-800">
                {capitalizeFirstLetter(grandChildName)}
              </span>
              ? Child of <span className="font-semibold text-gray-800">{capitalizeFirstLetter(grandChildCatName)}</span> and <span className="font-semibold text-gray-800">{capitalizeFirstLetter(grandChildParentName)}</span> This action cannot be undone.
            </p>
    
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setRemoveGrandCatModel(false)}
                className="w-1/2 px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 mr-2"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="w-1/2 px-4 py-2 bg-red-500 text-white hover:bg-red-600 ml-2"
              >
                Yes, Confirm
              </button>
            </div>
          </div>
        </div>
  )
}

export default RemoveGrandCatModel