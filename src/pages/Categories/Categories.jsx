import React, { useEffect, useState } from "react";
import AddCategoryModal from "./AddCategoryModal";
import { useAuth } from "../../context/AuthContext";
import categoryService from "../../services/categoryService/categoryService";
import config from "../../services/config";
import AddSubCategoryModal from "./AddSubCategoryModal";
import AddGrandCategory from "./AddGrandCategory";
import DateUtils from "../../utils/dateUtils";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { capitalizeFirstLetter } from "../../utils/textUtils";
import RemoveCatModel from "./RemoveCatModel";
import { toast } from "react-toastify";
import RemoveSubCatModel from "./RemoveSubCatModel";
import RemoveGrandCatModel from "./RemoveGrandCatModel";
import EditCategoryModal from "./EditCategoryModal";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedChild, setSelectedChild] = useState(null);
  const [selectedGrandChild, setSelectedGrandChild] = useState(null);
  const [loading, setLoading] = useState(true);
  const { accessToken } = useAuth();
  const BASE_URL = config.API_BASE_URL;

  const [addCategoryModal, setAddCategoryModal] = useState(false);
  const [addSubCategory, setAddSubCategory] = useState(false);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState(null);
  const [selectedParentCategoryId, setSelectedParentCategoryId] =
    useState(null);
  const [selectedParentSubCategoryId, setSelectedParentSubCategoryId] =
    useState(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState("");
  const [grandCategoryModal, setAddGrandCategoryModal] = useState(false);
  const [parentCategoryName, setParentCategoryName] = useState("");
  const [childCategoryName, setChildCategoryName] = useState("");

  const getData = async () => {
    try {
      const response = await categoryService.getCategory();
      setCategories(response.data);
      setLoading(false);

      if (response.data.length > 0) {
        setSelectedCategory(response.data[0]);
        setSelectedChild(response.data[0]?.subCategories[0] || null);
        setSelectedGrandChild(
          response.data[0]?.subCategories[0]?.grandCategories[0] || null
        );
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedChild(category?.subCategories[0] || null);
    setSelectedGrandChild(
      category?.subCategories[0]?.grandCategories[0] || null
    );
  };

  const handleChildSelect = (child) => {
    setSelectedChild(child);
    setSelectedGrandChild(child?.grandCategories[0] || null);
  };

  const handleGrandChildSelect = (grandChild) => {
    setSelectedGrandChild(grandChild);
  };

  const addCategory = () => {
    setAddCategoryModal(true);
  };
  const handleAddSubcategory = (categoryId, category) => {
    setSelectedSubCategoryId(categoryId);
    setSelectedCategoryName(category);
    setAddSubCategory(true);
  };

  const handleAddGrandCategory = (
    categoryId = null,
    subcategoryId = null,
    parentName,
    childName
  ) => {
    setSelectedParentCategoryId(categoryId);
    setSelectedParentSubCategoryId(subcategoryId);
    setParentCategoryName(parentName);
    setChildCategoryName(childName);
    setAddGrandCategoryModal(true);
  };

  const [removeCatId, setRemoveCatId] = useState("");
  const [removeCatName, setRemoveCatName] = useState("");
  const [removeCatModel, setRemoveCatModel] = useState(false);
  const [removeCatMsg, setRemoveCatMsg] = useState("");
  const [errorCatMsg, setErrorCatMsg] = useState("");

  const handleRemoveCategory = (catId, catName) => {
    setRemoveCatId(catId);
    setRemoveCatName(catName);
    setRemoveCatModel(true);
  };

  useEffect(() => {
    if (removeCatMsg) {
      toast.success(removeCatMsg);
      setRemoveCatMsg("");
    }
    if (errorCatMsg) {
      toast.error(errorCatMsg);
      setErrorCatMsg("");
    }
  }, [removeCatMsg, errorCatMsg]);

  const [subCatId, setSubCatId] = useState("");
  const [subCatName, setSubCatName] = useState('');
  const [subCatParentName, setSubCatParentName] = useState('');
  const [removeSubCategoryModal, setRemoveSubCategoryModal] = useState(false);
  const [removeSubCatMsg, setRemoveSubCatMsg] = useState('');
  const [removeSubCatError, setRemoveSubCatError] = useState('');
  const [parentId, setParentId] = useState('');

  const handleRemoveSubCategory = (subCatId, subCatName, parentName, parId) => {
    setSubCatId(subCatId);
    setSubCatName(subCatName);
    setSubCatParentName(parentName);
    setRemoveSubCategoryModal(true);
    setParentId(parId);
  }

  useEffect(() => {
    if (removeSubCatMsg) {
      toast.success(removeSubCatMsg);
      setRemoveSubCatMsg("");
    }
    if (removeSubCatError) {
      toast.error(removeSubCatError);
      setRemoveSubCatError("");
    }
  }, [removeSubCatMsg, removeSubCatError]);


  const [grandChildCatName, setGrandChildCatName] = useState('');
  const [grandChildCatId, setGrandChildCatId] = useState('');
  const [grandChildParentId, setGrandChildParentId] = useState('');
  const [grandChildParentName, setGrandChildParentName] = useState('');
  const [grandChildName, setGrandChildName] = useState('');
  const [grandChildId, setGrandChildId] = useState('');
  const [removeGrandCatModel, setRemoveGrandCatModel] = useState(false);
  const [grandRemoveSuccessMsg, setGrandRemoveSuccessMsg] = useState('');
  const [grandRemoveErrorMsg, setGrandRemoveErrorMsg] = useState('');
  
  const handleRemoveGrandCategory = (catId, catName, parentId, parentName, grandChildId, grandChildName) => {
    setGrandChildCatName(catName);
    setGrandChildCatId(catId);
    setGrandChildParentId(parentId);
    setGrandChildParentName(parentName);
    setGrandChildName(grandChildName);
    setGrandChildId(grandChildId);
    setRemoveGrandCatModel(true);

  }

  useEffect(() => {
    if (grandRemoveSuccessMsg) {
      toast.success(grandRemoveSuccessMsg);
      setGrandRemoveSuccessMsg("");
    }
    if (grandRemoveErrorMsg) {
      toast.error(grandRemoveErrorMsg);
      setGrandRemoveErrorMsg("");
    }
  }, [grandRemoveSuccessMsg, grandRemoveErrorMsg]);


  const [editCatId, setEditCatId] = useState('');
  const [editCatName, setEditCatname] = useState('');
  const [editCatImage, setEditCatimage] = useState('');
  const [editCatModal, setEditCatModal] = useState(false);
  const [editCatMsgSuccess, setEditCatMsgSuccess] = useState('');
  const [editCatMsgError, setEditCatMsgError] = useState('');
  const handleEditCategory =(catId, catName, catImage) => {
    setEditCatId(catId);
    setEditCatname(catName);
    setEditCatimage(catImage);
    setEditCatModal(true)
  }

  useEffect(() => {
    if (editCatMsgSuccess) {
      toast.success(editCatMsgSuccess);
      setEditCatMsgSuccess("");
    }
    if (editCatMsgError) {
      toast.error(editCatMsgError);
      setEditCatMsgError("");
    }
  }, [editCatMsgSuccess, editCatMsgError]);

  return (
    <div className="flex flex-col lg:flex-row w-full h-auto p-6 shadow-lg rounded-lg gap-6 lg:gap-8 border-gray-100 border-2">
      {/* Categories Column */}
      <div className="flex-1 border-gray-100 border-2 rounded-lg p-4 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Categories</h2>
          <button
            className="bg-gray-800 text-white px-4 py-2 hover:bg-gray-700"
            onClick={() => addCategory()}
          >
            Add Category
          </button>
        </div>

        {loading ? (
          <div className="space-y-2">
            <div className="p-2 flex items-center space-x-4 rounded shadow-sm animate-pulse">
              <div className="w-12 h-12 bg-gray-300 rounded"></div>
              <div className="w-24 h-4 bg-gray-300"></div>
            </div>
          </div>
        ) : (
          <ul className="space-y-2">
            {categories.map((category) => (
              <li
                key={category._id}
                onClick={() => handleCategorySelect(category)}
                className={`p-2 flex items-center justify-between space-x-4 rounded shadow-sm cursor-pointer ${
                  selectedCategory && selectedCategory._id === category._id
                    ? "bg-gray-300"
                    : "bg-white hover:bg-gray-200"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={`${BASE_URL}/${category.image}`}
                    alt={capitalizeFirstLetter(category.name)}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <span>{capitalizeFirstLetter(category.name)}</span>
                  <div className="flex flex-col text-xs">
                    <span className="text-gray-600">Author</span>
                    <span>
                      <span className="font-semibold text-gray-600 mr-2">
                        {category.activity?.performedBy?.name || "Unknown"}
                      </span>
                      ({category.activity?.performedBy?.role || "Unknown"})
                    </span>
                    <span className="text-gray-600">
                      {category.activity
                        ? category.activity.action === "INSERT"
                          ? `Created: ${DateUtils.formatDate(
                              category.activity.timestamp
                            )}`
                          : category.activity.action === "UPDATE"
                          ? `Updated: ${DateUtils.formatDate(
                              category.activity.timestamp
                            )}`
                          : ""
                        : "No activity"}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-center space-y-2 text-gray-600">
                  <FaEdit className="cursor-pointer hover:text-blue-700" onClick={() => handleEditCategory(category._id, category.name, category.image)}/>
                  <FaRegTrashAlt
                    className="cursor-pointer hover:text-red-500"
                    onClick={() =>
                      handleRemoveCategory(category._id, category.name)
                    }
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Subcategories Column */}
      <div className="flex-1 border-gray-100 border-2 rounded-lg p-4 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold mb-4">
            {`Child of ${
              capitalizeFirstLetter(selectedCategory)
                ? capitalizeFirstLetter(selectedCategory.name)
                : ""
            }`}
          </h2>
          <button
            className="bg-gray-800 text-white px-4 py-2 hover:bg-gray-700"
            onClick={() =>
              handleAddSubcategory(selectedCategory?._id, selectedCategory.name)
            }
          >
            Add Child for{" "}
            {capitalizeFirstLetter(selectedCategory)
              ? capitalizeFirstLetter(selectedCategory.name)
              : ""}
          </button>
        </div>

        {loading || !selectedCategory?.subCategories?.length ? (
          <div className="text-gray-500">
            {!selectedCategory?.subCategories?.length
              ? "No child found."
              : ""}
          </div>
        ) : (
          <ul className="space-y-2">
            {selectedCategory?.subCategories?.map((child) => (
              <li
                key={child._id}
                onClick={() => handleChildSelect(child)}
                className={`p-2 flex items-center justify-between space-x-4 rounded shadow-sm cursor-pointer ${
                  selectedChild && selectedChild._id === child._id
                    ? "bg-gray-300"
                    : "bg-white hover:bg-gray-200"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={`${BASE_URL}/${child.image}`}
                    alt={child.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <span>{capitalizeFirstLetter(child.name)}</span>
                  <div className="flex flex-col text-xs">
                    <span className="text-gray-600">Author</span>
                    <span>
                      <span className="font-semibold text-gray-600 mr-2">
                        {child.activity?.performedBy?.name || "Unknown"}
                      </span>
                      ({child.activity?.performedBy?.role || "Unknown"})
                    </span>

                    <span className="text-gray-600">
                      {child.activity
                        ? child.activity.action === "INSERT"
                          ? `Created: ${DateUtils.formatDate(
                              child.activity.timestamp
                            )}`
                          : child.activity.action === "UPDATE"
                          ? `Updated: ${DateUtils.formatDate(
                              child.activity.timestamp
                            )}`
                          : ""
                        : "No activity"}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-center space-y-2 text-gray-600">
                  <FaEdit className="cursor-pointer hover:text-blue-700" />
                  <FaRegTrashAlt
                    className="cursor-pointer hover:text-red-500"
                    onClick={() =>
                      handleRemoveSubCategory(child._id, child.name, selectedCategory.name, selectedCategory._id)
                    }
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex-1 border-gray-100 border-2 rounded-lg p-4 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold mb-4">
            {`Child of ${
              capitalizeFirstLetter(selectedChild)
                ? capitalizeFirstLetter(selectedChild.name)
                : ""
            }`}
          </h2>
          <button
            className="bg-gray-800 text-white px-4 py-2 hover:bg-gray-700"
            onClick={() =>
              handleAddGrandCategory(
                selectedCategory?._id,
                selectedChild?._id,
                selectedCategory.name,
                selectedChild.name
              )
            }
          >
            Add Child for{" "}
            {capitalizeFirstLetter(selectedChild)
              ? capitalizeFirstLetter(selectedChild.name)
              : ""}
          </button>
        </div>

        {loading || !selectedChild?.grandCategories?.length ? (
          <div className="text-gray-500">
            {!selectedChild?.grandCategories?.length
              ? `No child found.`
              : ""}
          </div>
        ) : (
          <ul className="space-y-2">
            {selectedChild?.grandCategories?.map((grandChild) => (
              <li
                key={grandChild._id}
                onClick={() => handleGrandChildSelect(grandChild)}
                className={`p-2 flex items-center justify-between space-x-4 rounded shadow-sm cursor-pointer ${
                  selectedGrandChild &&
                  selectedGrandChild._id === grandChild._id
                    ? "bg-gray-300"
                    : "bg-white hover:bg-gray-200"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={`${BASE_URL}/${grandChild.image}`}
                    alt={grandChild.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <span>{capitalizeFirstLetter(grandChild.name)}</span>
                  <div className="flex flex-col text-xs">
                    <span className="text-gray-600">Author</span>
                    <span>
                      <span className="font-semibold text-gray-600 mr-2">
                        {grandChild.activity?.performedBy?.name || "Unknown"}
                      </span>
                      ({grandChild.activity?.performedBy?.role || "Unknown"})
                    </span>

                    <span className="text-gray-600">
                      {grandChild.activity
                        ? grandChild.activity.action === "INSERT"
                          ? `Created: ${DateUtils.formatDate(
                              grandChild.activity.timestamp
                            )}`
                          : grandChild.activity.action === "UPDATE"
                          ? `Updated: ${DateUtils.formatDate(
                              grandChild.activity.timestamp
                            )}`
                          : ""
                        : "No activity"}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-center space-y-2 text-gray-600">
                  <FaEdit className="cursor-pointer hover:text-blue-700" />
                  <FaRegTrashAlt className="cursor-pointer hover:text-red-500"  onClick={() => handleRemoveGrandCategory(selectedCategory._id, selectedCategory.name, selectedChild._id, selectedChild.name, grandChild._id, grandChild.name)}/>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {addCategoryModal && (
        <AddCategoryModal
          setAddCategoryModal={setAddCategoryModal}
          accessToken={accessToken}
          getData={getData}
        />
      )}
      {addSubCategory && (
        <AddSubCategoryModal
          setAddSubCategory={setAddSubCategory}
          selectedSubCategoryId={selectedSubCategoryId}
          accessToken={accessToken}
          selectedCategoryName={selectedCategoryName}
          getData={getData}
        />
      )}
      {grandCategoryModal && (
        <AddGrandCategory
          selectedParentCategoryId={selectedParentCategoryId}
          selectedParentSubCategoryId={selectedParentSubCategoryId}
          parentCategoryName={parentCategoryName}
          childCategoryName={childCategoryName}
          getData={getData}
          accessToken={accessToken}
          setAddGrandCategoryModal={setAddGrandCategoryModal}
        />
      )}
      {removeCatModel && (
        <RemoveCatModel
          removeCatId={removeCatId}
          removeCatName={removeCatName}
          getData={getData}
          accessToken={accessToken}
          setRemoveCatModel={setRemoveCatModel}
          setRemoveCatMsg={setRemoveCatMsg}
          setErrorCatMsg={setErrorCatMsg}
        />
      )}
      {removeSubCategoryModal && (
        <RemoveSubCatModel
        subCatId = {subCatId}
        subCatName = {subCatName}
        subCatParentName = {subCatParentName}
        getData={getData}
        accessToken={accessToken}
        setRemoveSubCategoryModal={setRemoveSubCategoryModal}
        setRemoveSubCatMsg = {setRemoveSubCatMsg}
        setRemoveSubCatError = {setRemoveSubCatError}
        parentId={parentId}
        />
      )}

      {removeGrandCatModel && (
        <RemoveGrandCatModel
        grandChildCatId={grandChildCatId}
        grandChildCatName = {grandChildCatName}
        grandChildParentId = {grandChildParentId}
        grandChildParentName = {grandChildParentName}
        grandChildId={grandChildId}
        grandChildName = {grandChildName}
        setRemoveGrandCatModel={setRemoveGrandCatModel}
        getData={getData}
        accessToken={accessToken}
        setGrandRemoveSuccessMsg={setGrandRemoveSuccessMsg}
        setGrandRemoveErrorMsg={setGrandRemoveErrorMsg}
        />
      )}

      {editCatModal && (
        <EditCategoryModal
        editCatId = {editCatId}
        editCatName = {editCatName}
        editCatImage = {editCatImage}
        accessToken = {accessToken}
        setEditCatMsgSuccess={setEditCatMsgSuccess}
        setEditCatMsgError={setEditCatMsgError}
        setEditCatModal={setEditCatModal}
        getData={getData}
        />
      )}
    </div>
  );
};

export default Categories;
