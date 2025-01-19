import React, { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import HomepageService from "../../services/homepageService/homepageService";
import config from "../../services/config";

const JustForYou = () => {
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

  return (
    <div className="container mx-auto px-4 py-12">
      {flashSaleItems.length > 0 ? (
        <>
          <div className="flex justify-start items-center mb-6">
            <h2 className="text-2xl font-semibold">Just For You</h2>
          </div>{" "}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {flashSaleItems.slice(0, 10).map((item) => {
              const defaultImage = item.media.images.find((img) => img.default);
              const nextImage = item.media.images.find((img) => !img.default);

              const discountedPrice =
                item.price - (item.price * item.discountPercentage) / 100;

              return (
                <Link
                  key={item._id}
                  to={`/product?${encodeURIComponent(
                    item.title.replace(/ /g, "-")
                  )}.html&src_identifier=${item._id}&img_src_module=${defaultImage._id}`}                  
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
        </>
      ) : (
        <div className="text-center text-xl font-semibold">
          No items on Flash Sale
        </div>
      )}
    </div>
  );
};

export default JustForYou;
