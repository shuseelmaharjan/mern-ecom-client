import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import HomepageService from "../../services/homepageService/homepageService"; 
import config from "../../services/config"; 

const RelatedItems = ({ productId }) => {
  const [relatedItems, setRelatedItems] = useState([]);
  const [loading, setLoading] = useState(true);  

  const BASE_URL = config.API_BASE_URL;

  const fetchRelatedItems = useCallback(async () => {
    try {
      const response = await HomepageService.getRelatedProducts(productId);
      setRelatedItems(response || []);  
    } catch (error) {
      console.error("Error fetching related items:", error);
    } finally {
      setLoading(false); 
    }
  }, [productId]); 

  useEffect(() => {
    fetchRelatedItems();
  }, [productId, fetchRelatedItems]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-start items-center mb-6">
        <h2 className="text-2xl font-semibold">Related Items</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {relatedItems.length > 0 ? (
          relatedItems.slice(0, 10).map((item) => {
            const defaultImage = item.media.find((img) => img.default);
            const nextImage = item.media.find((img) => !img.default);

            const hasCampaign = !!item.campaign;
            const discountedPrice = hasCampaign
              ? item.price - (item.price * item.campaign.discountPercentage) / 100
              : null;

            return (
              <Link
                key={item.productId}
                to={`/product?${encodeURIComponent(item.title.replace(/ /g, "-"))}.html&src_identifier=${item.productId}`}
                className="group bg-white relative shadow hover:shadow-lg transition-shadow duration-300"
              >
                {hasCampaign && (
                  <div className="absolute top-2 right-2 bg-orange-300 text-white text-xs font-semibold px-2 py-1 rounded">
                    {item.campaign.saleType} - {item.campaign.discountPercentage}% Off
                  </div>
                )}
                <div className="relative">
                  <img
                    src={`${BASE_URL}/${defaultImage?.url}`}
                    alt={item.title}
                    className={`w-full h-80 object-cover ${nextImage ? "transition-opacity duration-700 group-hover:opacity-0" : ""}`}
                  />
                  {nextImage && (
                    <img
                      src={`${BASE_URL}/${nextImage.url}`}
                      alt={item.title}
                      className="w-full h-80 object-cover absolute top-0 left-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                    />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-semibold truncate mt-2" title={item.title}>
                    {item.title}
                  </h3>
                  {item.brand && (
                    <p className="text-xs text-gray-500 text-left">{item.brand}</p>
                  )}
                  <div className="flex justify-start items-center mt-2">
                    {hasCampaign ? (
                      <>
                        <p className="text-lg font-bold text-orange-500">
                          ${discountedPrice.toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-800 line-through mx-2">
                          ${item.price.toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-800 font-semibold">
                          -{item.campaign.discountPercentage}% 
                        </p>
                        <span className="ml-2 bg-orange-100 border-orange-500 border-2 text-orange-500 px-2 rounded-full">
                          {item.campaign.saleType}
                        </span>
                      </>
                    ) : (
                      <p className="text-lg font-bold text-orange-500">
                        ${item.price.toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <p>No related items available.</p>
        )}
      </div>
    </div>
  );
};

export default RelatedItems;
