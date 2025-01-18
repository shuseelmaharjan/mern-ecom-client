import React, { useState, useEffect, useRef } from "react";
import { FaShoppingCart, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import HomepageService from "../../services/homepageService/homepageService";
import config from "../../services/config";
import Slider from "react-slick";

const FlashSale = () => {
  const [flashSaleItems, setFlashSaleItems] = useState([]);
  const BASE_URL = config.API_BASE_URL;

  const fetchDatas = async () => {
    try {
      const response = await HomepageService.flashSaleItems();
      setFlashSaleItems(response.data.products);
    } catch (error) {
      console.error("Error fetching banners:", error);
    }
  };

  useEffect(() => {
    fetchDatas();
  }, []);

  const navigate = useNavigate();
  const sliderRef = useRef(null);

  const goToNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const goToPrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const carouselSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    focusOnSelect: true,
    centerMode: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
    nextArrow: (
      <button className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700">
        <FaArrowRight size={20} />
      </button>
    ),
    prevArrow: (
      <button className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700">
        <FaArrowLeft size={20} />
      </button>
    ),
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {flashSaleItems.length > 0 ? (
        <>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Flash Sale</h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={goToPrev}
                className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
              >
                <FaArrowLeft size={20} />
              </button>
              <button
                onClick={goToNext}
                className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
              >
                <FaArrowRight size={20} />
              </button>
            </div>
          </div>

          <div className="relative">
            {flashSaleItems.length > 4 ? (
              <Slider {...carouselSettings} ref={sliderRef}>
                {flashSaleItems.map((item) => {
                  const defaultImage = item.media.images.find((img) => img.default);
                  const nextImage = item.media.images.find((img) => !img.default);
                  const discountedPrice =
                    item.price - (item.price * item.discountPercentage) / 100;

                  return (
                    <Link
                      key={item._id}
                      to={`/product/${item._id}`}
                      className="group bg-white relative shadow hover:shadow-lg transition-shadow duration-300"
                    >
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                        {item.discountPercentage}% Off
                      </div>
                      <div className="relative">
                        <img
                          src={`${BASE_URL}/${defaultImage?.url}`}
                          alt={item.title}
                          className="w-full h-80 object-cover transition-opacity duration-700 group-hover:opacity-0"
                        />
                        <img
                          src={`${BASE_URL}/${nextImage?.url}`}
                          alt={item.title}
                          className="w-full h-80 object-cover absolute top-0 left-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                        />
                      </div>
                      <h3
                        className="text-sm font-semibold text-center truncate mt-2 px-2"
                        title={item.title}
                      >
                        {item.title}
                      </h3>
                      <div className="flex justify-between items-center mt-2 px-4 mb-6">
                        <div className="flex">
                          <p className="text-lg font-bold text-orange-500">
                            ${discountedPrice.toFixed(2)}
                          </p>
                          <p className="text-lg text-gray-800 line-through ml-2">
                            ${item.price}
                          </p>
                        </div>
                        <button className="p-2 bg-gray-800 text-white rounded-full hover:bg-gray-600 transition duration-300">
                          <FaShoppingCart size={18} />
                        </button>
                      </div>
                    </Link>
                  );
                })}
              </Slider>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {flashSaleItems.map((item) => {
                  const defaultImage = item.media.images.find((img) => img.default);
                  const nextImage = item.media.images.find((img) => !img.default);
                  const discountedPrice =
                    item.price - (item.price * item.discountPercentage) / 100;

                  return (
                    <Link
                      key={item._id}
                      to={`/product/${item._id}`}
                      className="group bg-white relative shadow hover:shadow-lg transition-shadow duration-300"
                    >
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                        {item.discountPercentage}% Off
                      </div>
                      <div className="relative">
                        <img
                          src={`${BASE_URL}/${defaultImage?.url}`}
                          alt={item.title}
                          className="w-full h-80 object-cover transition-opacity duration-700 group-hover:opacity-0"
                        />
                        <img
                          src={`${BASE_URL}/${nextImage?.url}`}
                          alt={item.title}
                          className="w-full h-80 object-cover absolute top-0 left-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                        />
                      </div>
                      <h3
                        className="text-sm font-semibold text-center truncate mt-2 px-2"
                        title={item.title}
                      >
                        {item.title}
                      </h3>
                      <div className="flex justify-between items-center mt-2 px-4 mb-6">
                        <div className="flex">
                          <p className="text-lg font-bold text-orange-500">
                            ${discountedPrice.toFixed(2)}
                          </p>
                          <p className="text-lg text-gray-800 line-through ml-2">
                            ${item.price}
                          </p>
                        </div>
                        <button className="p-2 bg-gray-800 text-white rounded-full hover:bg-gray-600 transition duration-300">
                          <FaShoppingCart size={18} />
                        </button>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
          <div className="flex justify-end mt-8">
            <button
              className="px-6 py-2 bg-gray-800 text-white font-semibold hover:bg-gray-700 transition duration-300"
              onClick={() => navigate("/flash-sale")}
            >
              View More
            </button>
          </div>
        </>
      ) : (
        <div className="text-center text-xl font-semibold">No items on Flash Sale</div>
      )}
    </div>
  );
};

export default FlashSale;
