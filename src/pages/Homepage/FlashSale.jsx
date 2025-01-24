import React, { useState, useEffect, useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import HomepageService from "../../services/homepageService/homepageService";
import config from "../../services/config";

const FlashSale = () => {
  const [flashSaleItems, setFlashSaleItems] = useState([]);
  const[title, setTitle] = useState('');
  const [id, setId] = useState('');

  const BASE_URL = config.API_BASE_URL;
  const carouselRef = useRef(null);

  const fetchDatas = async () => {
    try {
      const response = await HomepageService.flashSaleItems();

      setFlashSaleItems(response.data.products.products); 
      setTitle(response.data.products.campaign.title);
      setId(response.data.products.campaign._id);
    } catch (error) {
      console.error("Error fetching banners:", error);
    }
  };

  useEffect(() => {
    fetchDatas();
  }, []);


  const handleScroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.offsetWidth;
      if (direction === "next") {
        carouselRef.current.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      } else if (direction === "prev") {
        carouselRef.current.scrollBy({
          left: -scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  const handleClick = () => {
    const url = `source?source_module=${encodeURIComponent(
      title.replace(/ /g, "-")
    )}.html&source_identifier=${id}&target=most-popular&page=1`;

    window.open(url, "_blank");

  };

  return (
    <div className="container mx-auto px-4 py-12">
      {flashSaleItems.length > 0 ? (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Flash Sale</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => handleScroll("prev")}
                className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600 transition duration-300"
              >
                <FaArrowLeft size={16} />
              </button>
              <button
                onClick={() => handleScroll("next")}
                className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600 transition duration-300"
              >
                <FaArrowRight size={16} />
              </button>
            </div>
          </div>
          <div
            ref={carouselRef}
            className="flex overflow-x-auto gap-4"
            style={{
              scrollbarWidth: "none", // Hide scrollbar in Firefox
              msOverflowStyle: "none", // Hide scrollbar in IE and Edge
            }}
          >
            {/* Hide scrollbar in WebKit (Chrome, Safari, Edge) */}
            <style>
              {`
              .no-scrollbar::-webkit-scrollbar {
                display: none;
              }
            `}
            </style>
            {flashSaleItems.map((item) => {
              const defaultImage = item.product.defaultImage;
              const nextImage = item.product.secondImage;

              const discountedPrice =
                item.product.price - (item.product.price * item.product.discountPercentage) / 100;

              return (
                <Link
                  key={item.product.id}
                  to={`/product?${encodeURIComponent(
                    item.product.title.replace(/ /g, "-")
                  )}.html&src_identifier=${item.product.id}`}
                  className="group bg-white relative shadow hover:shadow-lg transition-shadow duration-300 mb-4 flex-shrink-0 w-full sm:w-1/2 md:w-1/4 lg:w-1/5"
                >
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                    {item.product.discountPercentage}% Off
                  </div>
                  <div className="relative">
                    <img
                      src={`${BASE_URL}/${defaultImage}`}
                      alt={item.product.title}
                      className="w-full h-80 object-cover transition-opacity duration-700 group-hover:opacity-0"
                    />
                    <img
                      src={`${BASE_URL}/${nextImage}`}
                      alt={item.product.title}
                      className="w-full h-80 object-cover absolute top-0 left-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                    />
                  </div>
                  <h3
                    className="text-sm font-semibold text-center truncate mt-2 px-2"
                    title={item.product.title}
                  >
                    {item.product.title}
                  </h3>
                  <p className="text-sm font-semibold text-gray-800 ml-2">
                      Brand: {item.product.brand}
                      </p>
                  <div className="flex justify-between items-center mt-2 px-4 mb-6">
                  {item.product.discountPercentage > 0 ? (
                    <div className="flex">
                      <p className="text-lg font-bold text-orange-500">
                        ${discountedPrice.toFixed(2)}
                      </p>
                      <p className="text-lg text-gray-800 line-through ml-2">
                        ${item.product.price}
                      </p>
                    </div>
                  ) : (
                    <div className="flex">
                      <p className="text-lg font-bold text-orange-500">
                      ${item.product.price}
                      </p>
                    </div>
                  )}
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="flex justify-end mt-8">
            <button
              className="px-6 py-2 bg-gray-800 text-white font-semibold hover:bg-gray-700 transition duration-300"
              onClick={handleClick}
            >
              View More
            </button>
          </div>
        </>
      ) : (
        <div className="text-center text-xl font-semibold">
          No items on Flash Sale
        </div>
      )}
    </div>
  );
};

export default FlashSale;
