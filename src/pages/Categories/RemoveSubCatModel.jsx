import React from 'react'
import { capitalizeFirstLetter } from "../../utils/textUtils";
import categoryService from "../../services/categoryService/categoryService";

const RemoveSubCatModel = ({subCatId, subCatName, subCatParentName, getData, accessToken, setRemoveSubCategoryModal, setRemoveSubCatMsg, setRemoveSubCatError, parentId}) => {

    const handleConfirm = async () => {
        try {
          await categoryService.removeCSubategory(accessToken, subCatId, parentId);
          setRemoveSubCatMsg(`${capitalizeFirstLetter(subCatParentName)} child ${capitalizeFirstLetter(subCatName)} removed successfully.`);
          getData();
          setRemoveSubCategoryModal(false);
        } catch (error) {
          console.error(error);
          setRemoveSubCatError(`Failed to remove ${subCatParentName} child ${capitalizeFirstLetter(subCatName)}.`);
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
                {capitalizeFirstLetter(subCatName)}
              </span>
              ? This action cannot be undone.
            </p>
    
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setRemoveSubCategoryModal(false)}
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

export default RemoveSubCatModel