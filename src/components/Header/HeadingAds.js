import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HeadingAds = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/v1/header-campaigns"
        );
        const data = await response.json();
        if (data.success) {
          setCampaigns(data.data);
        } else {
          setError(data.message);
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

  const handleClick = (url) => {
    window.location.href = url;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full overflow-hidden">
      {campaigns.length > 1 ? (
        <Slider {...settings}>
          {campaigns.map((campaign) => (
            <div
              key={campaign._id}
              className="h-auto py-2 flex items-center justify-center cursor-pointer bg-amber-300"
              onClick={() => handleClick(campaign.link)}
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
            onClick={() => handleClick(campaign.link)}
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
