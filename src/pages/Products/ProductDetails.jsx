import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie"; 
import config from "../../services/config";
import HomepageService from "../../services/homepageService/homepageService";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const Cat_id = queryParams.get("src_identifier");
  const BASE_URL = config.API_BASE_URL;

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  useEffect(() => {
    const fetchIndivudualProductDetail = async () => {
      try {
        const response = await HomepageService.individualProductProperty(Cat_id);
        const data = response.data;

        if (data.success) {
          setProduct(data.data);
          const defaultImage = data.data.media.images.find((img) => img.default);
          setSelectedImage(defaultImage?.url || data.data.media.images[0]?.url);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchIndivudualProductDetail();
  }, [Cat_id]);

  if (loading) {
    return <div className="text-center p-4">Loading product details...</div>;
  }

  const handleImageClick = (url) => {
    setSelectedImage(url);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleQuantityChange = (type) => {
    if (type === "increment") {
      if (selectedQuantity < product.productLimit) {
        setSelectedQuantity((prev) => prev + 1);
      }
    } else if (type === "decrement") {
      if (selectedQuantity > 1) {
        setSelectedQuantity((prev) => prev - 1);
      }
    }
  };

  const handleAddToCart = () => {
    if (!selectedColor) {
      toast.error("Please select a color variant");
      return;
    }
    if (!selectedSize) {
      toast.error("Please select a size variant");
      return;
    }
  
    const cartItem = {
      productId: product._id,
      title: product.title,
      colorVariant: selectedColor,
      sizeVariant: selectedSize,
      quantity: selectedQuantity,
      image: selectedImage || product.media.images[0]?.url,
      productLimit: product.productLimit,
    };
  
    const currentCart = JSON.parse(Cookies.get("cart") || "[]");
  
    const existingItem = currentCart.find(
      (item) =>
        item.productId === cartItem.productId &&
        item.colorVariant?.code === cartItem.colorVariant?.code &&
        item.sizeVariant === cartItem.sizeVariant
    );
  
    if (existingItem) {
      if (existingItem.quantity + cartItem.quantity > product.productLimit) {
        toast.error(
          `Cannot add more than ${product.productLimit} items for this variant.`
        );
        return;
      }
      existingItem.quantity += cartItem.quantity;
    } else {
      currentCart.push(cartItem);
    }
  
    Cookies.set("cart", JSON.stringify(currentCart), { expires: 7 });
    toast.success(`${cartItem.title} added to the cart.`);
  };
  

  return (
    <div className="container mx-auto p-4 mt-10">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Product Images */}
        <div className="w-full flex md:w-1/2 gap-20">
          <div className="flex flex-col gap-2">
            {product.media.images.map((img) => (
              <img
                key={img._id}
                src={`${BASE_URL}/${img.url}`}
                alt={product.title}
                className={`w-20 h-20 rounded-lg cursor-pointer border ${
                  selectedImage === img.url ? "border-gray-700 border-2" : "border-gray-300"
                }`}
                onClick={() => handleImageClick(img.url)}
              />
            ))}
          </div>
          <div className="mb-4">
            <img
              src={`${BASE_URL}/${selectedImage}`}
              alt={product.title}
              className="w-auto h-[70vh] object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2">
          <h1 className="text-2xl font-bold mb-6">{product.title}</h1>
          <p className="text-lg mb-2">
            <strong>SKU:</strong> {product.sku}
          </p>
          <p className="text-lg mb-2">
            <strong>Price:</strong> ${product.price}
          </p>
          <p className="text-lg mb-2">
            <strong>Description:</strong>
          </p>
          <div
            className="mb-4 text-gray-700"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
          <p className="text-lg mb-2">
            <strong>Quantity Available:</strong> {product.quantity}
          </p>

          {/* Color Selection */}
          {product.colors.isEnabled && (
            <div className="mb-4">
              <strong>Color:</strong>
              {selectedColor && (
                <p className="text-gray-700 mt-1">Selected Color: {selectedColor.name}</p>
              )}
              <div className="flex gap-4 mt-2">
                {product.colors.details.map((color) => (
                  <button
                    key={color._id}
                    className={`w-10 h-10 rounded-full border ${
                      selectedColor?.code === color.code
                        ? "border-blue-500"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color.code }}
                    onClick={() => handleColorSelect(color)}
                    title={color.name} 
                  />
                ))}
              </div>
            </div>
          )}

          {/* Size Selection */}
          <div className="mb-4">
            <strong>Size:</strong>
            <div className="flex gap-4 mt-2">
              {product.size.map((size) => (
                <button
                  key={size}
                  className={`px-4 py-2 rounded-lg border ${
                    selectedSize === size ? "border-blue-500" : "border-gray-300"
                  }`}
                  onClick={() => handleSizeSelect(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selection */}
          <div className="mb-4">
            <strong>Quantity:</strong>
            <div className="flex items-center gap-4 mt-2">
              <button
              className="px-4 py-2 bg-gray-800 text-white hover:bg-gray-700 font-semibold"
              onClick={() => handleQuantityChange("decrement")}
              >
                -
              </button>
              <span>{selectedQuantity}</span>
              <button
              className="px-4 py-2 bg-gray-800 text-white hover:bg-gray-700 font-semibold"
              onClick={() => handleQuantityChange("increment")}
              >
                +
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Maximum quantity allowed: {product.productLimit}
            </p>
          </div>

          {/* Add to Cart Button */}
          <button
              className="px-4 py-2 bg-gray-800 text-white hover:bg-gray-700 font-semibold"
              onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
