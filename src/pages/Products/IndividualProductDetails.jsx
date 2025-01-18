import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

import config from "../../services/config";

const IndividualProductDetails = () => {

  const [searchParams] = useSearchParams();
  const BASE_URL = config.API_BASE_URL

  const productId = searchParams.get("src_identifier");

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/product/${productId}`);
        const data = response.data;

        if (data.success) {
          setProduct(data.data);
          const defaultImage = data.data.media.images.find((img) => img.default);
          setSelectedImage(defaultImage?.url || data.data.media.images[0]?.url);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (loading) {
    return <div className="text-center p-4">Loading product details...</div>;
  }

  if (!product) {
    return <div className="text-center p-4">Product not found.</div>;
  }

  const handleImageClick = (url) => {
    setSelectedImage(url);
  };

  return (
    <div className="container mx-auto p-4 mt-10">
      <h1 className="text-2xl font-bold mb-6">{product.title}</h1>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Product Images */}
        <div className="w-full md:w-1/2">
          <div className="mb-4">
            <img
              src={`${BASE_URL}/${selectedImage}`} 
              alt={product.title}
              className="w-full h-auto rounded-lg shadow-md border"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {product.media.images.map((img) => (
              <img
                key={img._id}
                src={`${BASE_URL}/${img.url}`} 
                alt={product.title}
                className={`w-20 h-20 rounded-lg cursor-pointer border ${
                  selectedImage === img.url ? "border-blue-500" : "border-gray-300"
                }`}
                onClick={() => handleImageClick(img.url)}
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2">
          <p className="text-lg mb-2">
            <strong>Description:</strong>
          </p>
          <div
            className="mb-4 text-gray-700"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
          <p className="text-lg mb-2">
            <strong>Price:</strong> ${product.price}
          </p>
          <p className="text-lg mb-2">
            <strong>Quantity Available:</strong> {product.quantity}
          </p>
          <p className="text-lg mb-2">
            <strong>Brand:</strong> {product.brand}
          </p>
          <p className="text-lg mb-2">
            <strong>SKU:</strong> {product.sku}
          </p>

          <p className="text-lg mb-4">
            <strong>Size:</strong> {product.size.join(", ")}
          </p>

          {/* Add to Cart Button */}
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default IndividualProductDetails;
