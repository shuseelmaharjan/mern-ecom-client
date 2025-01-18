import React from "react";
import CategoryList from "./CategoryList";
import FlashSale from "./FlashSale";
import Banners from "./Banners";
// import JustForYou from "./JustForYou";

const Homepage = () => {

  return (
    <>
      <div className="container mx-auto grid grid-cols-1 gap-4">

        <Banners/>
      </div>

      <CategoryList />
      <FlashSale/>
      {/* <JustForYou/> */}
    </>
  );
};

export default Homepage;
