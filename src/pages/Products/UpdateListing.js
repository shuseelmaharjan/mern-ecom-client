import React, { useState, useEffect, useCallback } from "react";
import apiHandler from "../../api/apiHandler";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import HasColors from "./HasColors";
import HasSize from "./HasSize";
import AddTags from "./AddTags";
import ProductImages from "./ProductImages";
import Policy from "./Policy";
import { useNavigate } from "react-router-dom";
import { useMessage } from "../../context/MessageContext";

const UpdateListing = () => {
  const { productId } = useParams();
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const { setMessage } = useMessage();

  const [productDetails, setProductDetails] = useState({
    title: "",
    description: "",
    price: "",
    quantity: "",
    limit: "",
    brand: "",
    weight: "",
    shape: "",
    hasDimension: false,
    productHeight: "",
    productWidth: "",
    material: "",
    customOrder: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProductDetails = useCallback(async () => {
    try {
      const data = await apiHandler(
        null,
        `/api/v1/product-details/${productId}`,
        "GET",
        accessToken
      );
      setProductDetails(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [productId, accessToken]);

  useEffect(() => {
    fetchProductDetails();
  }, [fetchProductDetails]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleToggle = (field) => {
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      [field]: !prevDetails[field],
      ...(field === "hasDimension" && !prevDetails[field] === false
        ? { productHeight: "", productWidth: "" }
        : {}),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      console.log("productDetails", productDetails);
      const updatedProduct = await apiHandler(
        productDetails,
        `/api/v1/update-product/${productId}`,
        "PUT",
        accessToken
      );
      setProductDetails(updatedProduct);
      setMessage("Product updated successfully!");
      navigate("/listing");
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching product details: {error.message}</div>;
  }

  return (
    <div className="block w-full h-auto p-6 shadow-lg rounded-lg gap-6 lg:gap-8 border-gray-100 border-2">
      <h1 className="text-2xl font-bold text-gray-800">
        Update Product Listing
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 mt-6">
        <div className="flex flex-col space-y-2 md:flex-col md:space-x-4 border border-gray-200 p-4 rounded-lg space-y-6">
          <div className="flex flex-col space-y-2">
            <h2 className="text-lg font-semibold text-gray-800">
              Product Details
            </h2>
          </div>
          <div className="flex flex-col space-y-2 mt-4">
            <label htmlFor="title" className="text-gray-800">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={productDetails.title}
              onChange={handleInputChange}
              placeholder="Enter product title"
              className="w-full border border-gray-300 p-2 shadow-sm outline-none"
            />
          </div>

          <div className="flex flex-col space-y-2 mt-4">
            <label htmlFor="description" className="text-gray-800">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={productDetails.description}
              onChange={handleInputChange}
              placeholder="Enter product description"
              className="w-full border border-gray-300 p-2 shadow-sm outline-none"
            ></textarea>
          </div>

          <div className="flex flex-col space-y-2 mt-4">
            <label htmlFor="price" className="text-gray-800">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={productDetails.price}
              onChange={handleInputChange}
              placeholder="Enter product price"
              className="w-full md:w-4/12 border border-gray-300 p-2 shadow-sm outline-none"
            />
          </div>

          <div className="flex flex-col space-y-2 mt-4">
            <label htmlFor="quantity" className="text-gray-800">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={productDetails.quantity}
              onChange={handleInputChange}
              placeholder="Enter product quantity"
              className="w-full md:w-4/12 border border-gray-300 p-2 shadow-sm outline-none"
            />
          </div>
          <div className="flex flex-col space-y-2 mt-4">
            <label htmlFor="limit" className="text-gray-800">
              Product Limit
            </label>
            <input
              type="number"
              id="limit"
              name="limit"
              value={productDetails.limit}
              onChange={handleInputChange}
              placeholder="Enter product limit"
              className="w-full md:w-4/12 border border-gray-300 p-2 shadow-sm outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col space-y-2 md:flex-col md:space-x-4 border border-gray-200 p-4 rounded-lg space-y-6">
          <div className="flex flex-col space-y-2">
            <h2 className="text-lg font-semibold text-gray-800">
              Product Meta
            </h2>
          </div>
          <div className="flex flex-col space-y-2 mt-4">
            <label htmlFor="brand" className="text-gray-800">
              Brand
            </label>
            <input
              type="text"
              id="brand"
              name="brand"
              value={productDetails.brand}
              onChange={handleInputChange}
              placeholder="Enter product brand"
              className="w-full md:w-3/12 border border-gray-300 p-2 shadow-sm outline-none"
            />
          </div>
          <div className="flex flex-col space-y-2 mt-4">
            <label htmlFor="weight" className="text-gray-800">
              Weight
            </label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={productDetails.weight}
              onChange={handleInputChange}
              placeholder="Enter product weight"
              className="w-full md:w-3/12 border border-gray-300 p-2 shadow-sm outline-none"
            />
          </div>
          <div className="flex flex-col space-y-2 mt-4">
            <label htmlFor="shape" className="text-gray-800">
              Shape
            </label>
            <input
              type="text"
              id="shape"
              name="shape"
              value={productDetails.shape}
              onChange={handleInputChange}
              placeholder="Enter product shape"
              className="w-full md:w-3/12 border border-gray-300 p-2 shadow-sm outline-none"
            />
          </div>

          <div className="flex flex-col space-y-2 mt-4">
            <label htmlFor="material" className="text-gray-800">
              Materials
            </label>
            <input
              type="text"
              id="material"
              name="material"
              value={productDetails.material}
              onChange={handleInputChange}
              placeholder="Enter product material"
              className="w-full md:w-3/12 border border-gray-300 p-2 shadow-sm outline-none"
            />
          </div>

          <div className="flex flex-col space-y-2 mt-4">
            <label htmlFor="hasDimension" className="text-gray-800">
              Dimensions
            </label>
            <button
              type="button"
              className={`${
                productDetails.hasDimension ? "bg-gray-800" : "bg-gray-300"
              } relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ease-in-out`}
              onClick={() => handleToggle("hasDimension")}
            >
              <span
                className={`${
                  productDetails.hasDimension
                    ? "translate-x-6"
                    : "translate-x-1"
                } inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out`}
              />
            </button>
          </div>
          {productDetails.hasDimension && (
            <>
              <div className="flex flex-col w-full space-y-2 mt-4 md:flex-row md:space-x-4">
                <div className="flex flex-col space-y-2 w-full md:w-4/12">
                  <label htmlFor="width" className="text-gray-800">
                    Width
                  </label>
                  <input
                    type="text"
                    id="width"
                    name="productWidth"
                    value={productDetails.productWidth}
                    onChange={handleInputChange}
                    placeholder="Enter width"
                    className="w-full border border-gray-300 p-2 shadow-sm outline-none"
                    disabled={!productDetails.hasDimension}
                  />
                </div>
                <div className="flex flex-col space-y-2 w-full md:w-4/12">
                  <label htmlFor="height" className="text-gray-800">
                    Height
                  </label>
                  <input
                    type="text"
                    id="height"
                    name="productHeight"
                    value={productDetails.productHeight}
                    onChange={handleInputChange}
                    placeholder="Enter height"
                    className="w-full border border-gray-300 p-2 shadow-sm outline-none"
                    disabled={!productDetails.hasDimension}
                  />
                </div>
              </div>
            </>
          )}

          <HasColors productId={productId} accessToken={accessToken} />
          <HasSize productId={productId} accessToken={accessToken} />
          <AddTags productId={productId} accessToken={accessToken} />
          <div className="flex flex-col space-y-2 mt-4">
            <label htmlFor="customOrder" className="text-gray-800">
              Custom Order
            </label>
            <button
              type="button"
              className={`${
                productDetails.customOrder ? "bg-gray-800" : "bg-gray-300"
              } relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ease-in-out`}
              onClick={() => handleToggle("customOrder")}
            >
              <span
                className={`${
                  productDetails.customOrder ? "translate-x-6" : "translate-x-1"
                } inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out`}
              />
            </button>
          </div>
        </div>

        <div className="flex flex-col space-y-2 md:flex-col md:space-x-4 border border-gray-200 p-4 rounded-lg space-y-6">
          <div className="flex flex-col space-y-2">
            <h2 className="text-lg font-semibold text-gray-800">
              Product Media
            </h2>
          </div>
          <ProductImages productId={productId} accessToken={accessToken} />
        </div>

        <div className="flex flex-col space-y-2 md:flex-col md:space-x-4 border border-gray-200 p-4 rounded-lg space-y-6">
          <div className="flex flex-col space-y-2">
            <h2 className="text-lg font-semibold text-gray-800">
              Shipping and Return Policy
            </h2>
          </div>
          <Policy productId={productId} accessToken={accessToken} />
        </div>

        <div className="flex flex-col justify-end space-y-2 mt-4">
          <button
            type="submit"
            className="bg-gray-800 w-3/12 ml-auto text-white px-6 py-2 hover:bg-gray-700"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateListing;
