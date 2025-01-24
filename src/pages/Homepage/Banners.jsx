import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import HomepageService from "../../services/homepageService/homepageService";
import config from "../../services/config";

const Banners = () => {
  const [carouselImages, setCarouselImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const BASE_URL = config.API_BASE_URL;

  const fetchBanners = async () => {
    try {
      const response = await HomepageService.getBanners();
      setCarouselImages(response); 
    } catch (error) {
      console.error("Error fetching banners:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleRedirect = (image) => {
    const url = `source?source_module=${encodeURIComponent(
      image.title?.replace(/ /g, "-") || "default-title"
    )}.html&source_identifier=${image._id}&target=most-popular&page=1`;
    
    window.open(url, "_blank");
  };

  return (
    <div className="w-full max-w-full mx-auto">
      {loading ? (
        <div className="text-center"></div>
      ) : (
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          showArrows={true}
          dynamicHeight={false}
          interval={3000}
        >
          {carouselImages.map((image) => (
            <div
              key={image._id}
              onClick={() => handleRedirect(image)} 
              className="cursor-pointer"
            >
              <img
                src={`${BASE_URL}${image.banner}`} 
                alt={image.title || "Banner Image"}
                className="w-full h-[300px] shadow-lg object-cover"
              />
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default Banners;
