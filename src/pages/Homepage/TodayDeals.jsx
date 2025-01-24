import React, { useState, useEffect, useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import HomepageService from "../../services/homepageService/homepageService";
import config from "../../services/config";
import { calculateTimeLeft } from "../../utils/timer";

const TodayDeals = () => {
  const [flashSaleData, setFlashSaleData] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);

  const BASE_URL = config.API_BASE_URL;
  const carouselRef = useRef(null);

  const fetchDatas = async () => {
    try {
      const response = await HomepageService.getTodayDealDatas();
      if (response.data && response.data.length > 0) {
        setFlashSaleData(response.data[0]);
      }
    } catch (error) {
      console.error("Error fetching flash sale data:", error);
    }
  };

  useEffect(() => {
    fetchDatas();
  }, []);

  useEffect(() => {
    if (flashSaleData?.campaignEndTime) {
      const expiryDate = new Date(flashSaleData.campaignEndTime);

      const updateTimer = () => {
        setTimeLeft(calculateTimeLeft(expiryDate));
      };

      updateTimer(); 
      const interval = setInterval(updateTimer, 1000);

      return () => clearInterval(interval); 
    }
  }, [flashSaleData]);

  const handleScroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.offsetWidth;
      carouselRef.current.scrollBy({
        left: direction === "next" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (!flashSaleData) {
    return (
      <div className="text-center text-xl font-semibold py-12">
        No items on Today's Deal
      </div>
    );
  }

  const { products, campaignName, poster, campaignId } = flashSaleData;

  const handleClick = () => {
    const url = `source?source_module=${encodeURIComponent(
      campaignName.replace(/ /g, "-")
    )}.html&source_identifier=${campaignId}&target=most-popular&page=1`;
    window.open(url, "_blank");
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">
          {campaignName}
          <span className="ml-4 text-red-500 text-lg font-medium">
            <span className="mr-2">Deal Ends after: </span>
            {timeLeft || ""}
          </span>
        </h2>
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
        className="flex overflow-x-auto gap-4 no-scrollbar"
      >
        {products.map((product) => {
          const { media, title, price, _id } = product;
          const discountedPrice = price * 0.95;

          return (
            <Link
              key={_id}
              to={`/product?${encodeURIComponent(
                title.replace(/ /g, "-")
              )}.html&src_identifier=${_id}`}
              className="group bg-white relative shadow hover:shadow-lg transition-shadow duration-300 mb-4 flex-shrink-0 w-full sm:w-1/2 md:w-1/4 lg:w-1/5"
            >
              <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                5% Off
              </div>
              <div className="relative">
                <img
                  src={`${BASE_URL}/${media.defaultImage}`}
                  alt={title}
                  className="w-full h-80 object-cover transition-opacity duration-700 group-hover:opacity-0"
                />
                <img
                  src={`${BASE_URL}/${media.secondImage}`}
                  alt={title}
                  className="w-full h-80 object-cover absolute top-0 left-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                />
                {poster && (
                  <img
                    src={`${BASE_URL}${poster}`}
                    alt={campaignName}
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-auto max-h-24 object-contain"
                  />
                )}
              </div>

              <h3
                className="text-sm font-semibold text-center truncate mt-2 px-2"
                title={title}
              >
                {title}
              </h3>
              <div className="flex justify-between items-center mt-2 px-4 mb-6">
                <div className="flex">
                  <p className="text-lg font-bold text-orange-500">
                    ${discountedPrice.toFixed(2)}
                  </p>
                  <p className="text-lg text-gray-800 line-through ml-2">
                    ${price.toFixed(2)}
                  </p>
                </div>
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
          View More Deals of {campaignName}
        </button>
      </div>
    </div>
  );
};

export default TodayDeals;
