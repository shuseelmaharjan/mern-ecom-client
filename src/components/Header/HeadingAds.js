import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import homepageService from "../../services/homepageService/homepageService";

const HeadingAds = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await homepageService.getHeaderCampaign();

        if (Array.isArray(response.data.data)) {
          setCampaigns(response.data.data);
        } else if (response.data.data) {
          setCampaigns([response.data.data]);
        } else {
          setError("No campaigns found.");
        }
      } catch (err) {
        setError("Failed to fetch campaigns");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  const handleClick = (campaign) => {
    const url = `source?source_module=${encodeURIComponent(
      campaign.title.replace(/ /g, "-")
    )}.html&source_identifier=${campaign._id}&target=most-popular&page=1`;
    window.open(url, "_blank");
  };

  if (loading)
    return (
      <div className="h-auto py-2 flex items-center justify-center cursor-pointer bg-amber-300">
        Loading
      </div>
    );
  if (error)
    return (
      <div className="error-message bg-red-300 p-4 text-center">
        Error: {error}
      </div>
    );

  return (
    <div className="w-full overflow-hidden">
      {campaigns.length > 1 ? (
        <Slider {...settings}>
          {campaigns.map((campaign) => (
            <div
              key={campaign._id}
              className="h-auto py-2 flex items-center justify-center cursor-pointer bg-amber-300"
              onClick={() => handleClick(campaign)}
            >
              <div
                dangerouslySetInnerHTML={{ __html: campaign.description }}
                style={{ textAlign: "center", fontSize: "16px" }}
              />
            </div>
          ))}
        </Slider>
      ) : (
        campaigns.map((campaign) => (
          <div
            key={campaign._id}
            className="h-auto py-2 flex items-center justify-center cursor-pointer bg-amber-300"
            onClick={() => handleClick(campaign)}
          >
            <div
              dangerouslySetInnerHTML={{ __html: campaign.description }}
              style={{ textAlign: "center", fontSize: "16px" }}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default HeadingAds;
