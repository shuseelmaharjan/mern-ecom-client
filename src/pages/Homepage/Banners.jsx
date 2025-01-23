import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import HomepageService from "../../services/homepageService/homepageService";
import config from "../../services/config";
import { Link } from "react-router-dom";

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

  return (
    <div className="w-full max-w-full mx-auto">
      {loading ? (
        <div className="text-center">Loading banners...</div>
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
            <Link
              key={image._id}
              to={`/campaigns/${image._id}`}
              target="_blank"
            >
              <img
                src={`${BASE_URL}${image.banner}`} 
                alt={image.title}
                className="w-full h-[300px] shadow-lg object-cover"
              />
            
            </Link>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default Banners;
