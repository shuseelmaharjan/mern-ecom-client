import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import config from "../../services/config";
import HomepageService from "../../services/homepageService/homepageService";
import { toast } from "react-toastify";
import { capitalizeFirstLetter } from "../../utils/textUtils";
import FlashSale from "../Homepage/FlashSale";
import { useCart } from "../../context/CartContext";

const ProductDetails = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const Cat_id = queryParams.get("src_identifier");
  const BASE_URL = config.API_BASE_URL;

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [breadcrumb, setBreadcrumb] = useState([]);
  const [campaign, setCampaign] = useState(null);
  const [engagement, setEngagement] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchIndivudualProductDetail = async () => {
      try {
        const response = await HomepageService.individualProductProperty(
          Cat_id
        );
        const data = response.data;

        if (data.success) {
          setProduct(data.data.product);
          setCampaign(data.data.campaign);
          setEngagement(data.data.engagement);
          const defaultImage = data.data.product.media.images.find(
            (img) => img.default
          );
          setSelectedImage(
            defaultImage?.url || data.data.product.media.images[0]?.url
          );

          if (data.data.product.colors.isEnabled) {
            setSelectedColor(data.data.product.colors.details[0].code);
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchBreadCrumb = async () => {
      try {
        const res = await HomepageService.getBreadCrumbDetails(Cat_id);
        const data = res.data;

        const details = data.data.data.details;
        const breadcrumbData = [
          { name: "Home", link: "/" },
          {
            name: capitalizeFirstLetter(details.parentCategory.categoryName),
            link: `/category/${details.parentCategory.categoryId}`,
          },
        ];

        if (details.parentSubCategory) {
          breadcrumbData.push({
            name: capitalizeFirstLetter(
              details.parentSubCategory.subCategoryName
            ),
            link: `/subcategory/${details.parentSubCategory.subCategoryId}`,
          });
        }

        if (details.grandCategoryName) {
          breadcrumbData.push({
            name: capitalizeFirstLetter(details.grandCategoryName),
            link: `/grandcategory/${details.grandCategoryId}`,
          });
        }

        breadcrumbData.push({ name: data.data.productId, link: "" });
        setBreadcrumb(breadcrumbData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBreadCrumb();
    fetchIndivudualProductDetail();
  }, [Cat_id]);

  useEffect(() => {
    if (campaign?.details?.expiryTime) {
      const interval = setInterval(() => {
        const expiryDate = new Date(campaign.details.expiryTime);
        const now = new Date();
        const timeDiff = expiryDate - now;

        if (timeDiff <= 0) {
          clearInterval(interval);
          setTimeLeft(null);
        } else {
          const hours = Math.floor(
            (timeDiff % (1000 * 3600 * 24)) / (1000 * 3600)
          );
          const minutes = Math.floor((timeDiff % (1000 * 3600)) / (1000 * 60));
          const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
          setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [campaign]);

  if (loading) {
    return <div className="text-center p-4">Loading product details...</div>;
  }

  const handleImageClick = (url) => {
    setSelectedImage(url);
  };

  const calculatePrice = () => {
    let price = product.price;
    if (campaign?.status && engagement?.status) {
      const discount = (price * campaign.details.discountPercentage) / 100;
      price -= discount;
    }
    return price;
  };

  const displayPrice = () => {
    if (campaign?.status && engagement?.status) {
      return calculatePrice().toFixed(2);
    }
    return product.price;
  };

  const handleColorChange = (colorCode) => {
    if (selectedColor !== colorCode) {
      setSelectedColor(colorCode);
    }
  };


  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      toast.error("Please select color and size.");
      return;
    }
  
    const productData = {
      productId: Cat_id,
      color: selectedColor,
      size: selectedSize,
      quantity: quantity,
    };
  
    const existingCart = Cookies.get("cart") ? JSON.parse(Cookies.get("cart")) : [];
  
    const existingProductIndex = existingCart.findIndex(
      (item) =>
        item.productId === productData.productId &&
        item.color === productData.color &&
        item.size === productData.size
    );
  
    if (existingProductIndex !== -1) {
      existingCart[existingProductIndex].quantity += productData.quantity;
    } else {
      existingCart.push(productData);
    }
  
    Cookies.set("cart", JSON.stringify(existingCart), { expires: 7 });
  
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("cartUpdated", Date.now());
    }
  
    console.log("Updated Cart:", existingCart);
    addToCart(Cat_id);
  
    toast.success("Product added to cart!");
  };
  

  return (
    <>
      <div className="container mx-auto p-4">
        {/* Breadcrumb */}
        <nav className="mb-4">
          <ol className="flex space-x-2 text-gray-600">
            {breadcrumb.map((item, index) => (
              <li key={index} className="flex items-center">
                {item.link ? (
                  <Link to={item.link} className="hover:text-blue-500">
                    {item.name}
                  </Link>
                ) : (
                  <span>{item.name}</span>
                )}
                {index < breadcrumb.length - 1 && (
                  <span className="mx-2 text-gray-400">/ </span>
                )}
              </li>
            ))}
            {product.title}
          </ol>
        </nav>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full flex md:w-1/2 gap-20">
            <div className="flex flex-col gap-2">
              {product.media.images.map((img) => (
                <img
                  key={img._id}
                  src={`${BASE_URL}/${img.url}`}
                  alt={product.title}
                  className={`w-20 h-20 rounded-lg cursor-pointer border ${
                    selectedImage === img.url
                      ? "border-gray-700 border-2"
                      : "border-gray-300"
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

          <div className="w-full md:w-1/2">
            <h1 className="text-2xl font-bold">{product.title}</h1>
            <p className="text-sm mb-2">
              <strong>SKU:</strong> {product.sku}
            </p>
            {engagement.status ? (
              <p className="text-lg mb-2 block items-center">
                <span className="flex items-center mb-2">
                  <strong>Price:</strong>
                  <span className="font-semibold mx-2">${displayPrice()}</span>
                  <span className="line-through text-gray-500 mx-2">
                    $ {product.price}
                  </span>
                  <span className="text-sm bg-orange-400 font-semibold px-2 text-white rounded-full">
                    {campaign.details.saleType}
                  </span>
                </span>
                <span>
                  <span className="bg-orange-200 text-orange-600 text-base p-2">
                    <span className="mr-2">Estimated Profit</span>
                    {engagement.status && displayPrice()
                      ? ((displayPrice() / product.price - 1) * 100).toFixed(2)
                      : 0}
                    %
                  </span>
                  {campaign?.status && (
                    <div className="mt-4">
                      <strong>Offer expires in: </strong>
                      <span className="text-red-600 font-bold">
                        {timeLeft || ""}
                      </span>
                    </div>
                  )}
                </span>
              </p>
            ) : (
              <p className="text-lg mb-2">
                <strong>Price:</strong> {product.price}
              </p>
            )}

            {/* Product Colors */}
            {product.colors.isEnabled && (
              <div className="mb-4">
                <strong>Available Colors:</strong>
                <span className="ml-2 font-semibold">
                  {capitalizeFirstLetter(
                    selectedColor &&
                      product.colors.details.find(
                        (c) => c.code === selectedColor
                      )?.name
                  )}
                </span>{" "}
                {/* Display color name */}
                <div className="flex gap-2 mt-2">
                  {product.colors.details.map((color) => (
                    <span
                      key={color._id}
                      className={`w-6 h-6 rounded-full cursor-pointer border-2 border-gray-300 ${
                        selectedColor === color.code
                          ? "border-2 border-gray-700"
                          : ""
                      }`}
                      style={{ backgroundColor: color.code }}
                      onClick={() => handleColorChange(color.code)}
                    ></span>
                  ))}
                </div>
              </div>
            )}

            {/* Product Size */}
            {product.size && (
              <div className="mb-4">
                <strong>Available Sizes:</strong>
                <div className="flex gap-4 mt-2">
                  {product.size.map((size, index) => (
                    <span
                      key={index}
                      className={`px-4 py-2 border rounded-md cursor-pointer ${
                        selectedSize === size ? "bg-gray-700 text-white" : ""
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div className="mb-4">
              <strong>Quantity:</strong>
              <div className="flex items-center justify-start gap-4 mt-2 border-gray-300">
                <button
                  className="px-6 py-2 bg-gray-800 text-white font-semibold hover:bg-gray-700 transition duration-300"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  min="1"
                  max={product.productLimit}
                  readOnly
                  hidden
                  className="w-16 text-center border rounded-md bg-gray-100 cursor-not-allowed"
                />
                <span>{quantity}</span>
                <button
                  className="px-6 py-2 bg-gray-800 text-white font-semibold hover:bg-gray-700 transition duration-300"
                  onClick={() =>
                    setQuantity(Math.min(product.productLimit, quantity + 1))
                  }
                >
                  +
                </button>
              </div>
              <p className="text-sm text-gray-500 text-left mt-2">
                Max selectable quantity: {product.productLimit}
              </p>
            </div>

            <div className="mt-6 flex gap-4">
              <button
                onClick={handleAddToCart}
                className="px-6 py-2 bg-gray-800 text-white font-semibold hover:bg-gray-700 transition duration-300"
              >
                Add to Cart
              </button>
              <button className="px-6 py-2 bg-amber-300 text-gray-700 font-semibold hover:bg-amber-400 transition duration-300">
                Add to Wishlist
              </button>
            </div>

            {/* Product Description */}
            <p className="text-lg mb-2 mt-6">
              <strong>Description:</strong>
            </p>
            <div
              className="text-sm text-gray-700"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </div>
        </div>
      </div>
      <FlashSale />
    </>
  );
};

export default ProductDetails;
