import React, { useState, useEffect } from "react";
import CategoryList from "./CategoryList";
import FlashSale from "./FlashSale";
import Banners from "./Banners";
import JustForYou from "./JustForYou";
import homepageService from "../../services/homepageService/homepageService";
import TodayDeals from "./TodayDeals";
import Brand from "./Brand";
import Festival from "./Festival";
import FreeShipping from "./FreeShipping";

const Homepage = () => {
  const [banner, setBanner] = useState(false);
  const [todayDeal, setTodayDeal] = useState(false);
  const [sale, setSale] = useState(false);
  const [brand, setBrand] = useState(false);
  const [festival, setFestival] = useState(false);
  const [shipping, setShipping] = useState(false);

  useEffect(() => {
    const getActiveHeader = async () => {
      try {
        const response = await homepageService.getCampaignStatus();
        setBanner(response.data.isBannerActive);
        setTodayDeal(response.data.isDealActive);
        setSale(response.data.homeSaleTypes.SALE);
        setBrand(response.data.homeSaleTypes.BRAND);
        setFestival(response.data.homeSaleTypes.FESTIVAL);
        setShipping(response.data.homeSaleTypes.FREESHIPPING)
      } catch (error) {
        console.error(error);
      }
    };
    getActiveHeader();
  }, []);
  return (
    <>
      {banner && (
        <div className="container mx-auto grid grid-cols-1 gap-4">
          <Banners />
        </div>
      )}
      <CategoryList />

      {todayDeal && <TodayDeals />}
      {festival && <Festival />}
      {brand && <Brand />}
      {sale && <FlashSale />}
      {shipping && <FreeShipping />}

      <JustForYou />
    </>
  );
};

export default Homepage;
