import React, { useState, useRef } from "react";
import { FaTrash } from "react-icons/fa";
import categoryService from "../../services/categoryService/categoryService";

const AddGrandCategory = ({ selectedParentCategoryId, selectedParentSubCategoryId, parentCategoryName, childCategoryName, getData, accessToken, setAddGrandCategoryModal }) => {
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!allowedTypes.includes(file.type)) {
        setErrorMessage("Only .jpg, .jpeg, or .png files are allowed.");
        return;
      }

      setErrorMessage(""); 
      setImageFile(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    fileInputRef.current.value = null;
  };

  const handleGrandChildFormSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setErrorMessage("Category name is required.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      await categoryService.createGrandCategory(accessToken, selectedParentCategoryId, selectedParentSubCategoryId, formData);

      setAddGrandCategoryModal(false); 
      getData();
    } catch (error) {
      console.error("Error creating category:", error.message);
      setErrorMessage(error.response.data.message);
      console.log(error.response.data.message);
    }
  };

  return (
    <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full sm:w-8/12 md:w-6/12 lg:w-4/12 p-6">
        <h2 className="text-xl font-semibold mb-4 text-center">Add Child Category for {parentCategoryName} of {childCategoryName}</h2>
        <form onSubmit={handleGrandChildFormSubmit}>
          {errorMessage && (
            <div className="mb-4 p-2 bg-red-200 text-red-800 rounded text-center">
              {errorMessage}
            </div>
          )}

          {/* Name Field */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
              Category Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-500 p-2 mb-4 outline-none"
              placeholder="Enter category name"
              required
            />
          </div>

          {/* Image Field */}
          <div className="mb-4">
          <label htmlFor="Image" className="block text-gray-700 font-semibold mb-2">
              Select an Image
            </label>
            {!imageFile ? (
              <div
                className="h-48 w-full border-2 border-dashed border-gray-400 rounded flex items-center justify-center cursor-pointer hover:bg-gray-100"
                onClick={() => fileInputRef.current.click()}
              >
                <span className="text-gray-600">Select an image</span>
              </div>
            ) : (
              <div className="h-48 w-full relative">
                <img
                  src={URL.createObjectURL(imageFile)}
                  alt="Preview"
                  className="w-full h-full object-cover rounded shadow-md border-2 border-dashed border-gray-400"
                />
                <FaTrash
                  className="absolute top-2 right-2 text-red-500 text-xl cursor-pointer hover:text-red-600"
                  onClick={handleRemoveImage}
                />
              </div>
            )}

            <input
              type="file"
              accept="image/jpeg, image/jpg, image/png"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-x-4">
            <button
              type="submit"
              className="px-4 py-2 bg-green-700 text-white hover:bg-green-800 font-semibold"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setAddGrandCategoryModal(false)}
              className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 font-semibold"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGrandCategory;
