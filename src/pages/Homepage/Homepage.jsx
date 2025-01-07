import React, { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import CategoryList from "./CategoryList";
import FlashSale from "./FlashSale";

const Homepage = () => {
  const [carouselImages, setCarouselImages] = useState([]);
  const [bannerAds, setBannerAds] = useState([]);

  useEffect(() => {
    setCarouselImages([
      {
        src: "https://img.ltwebstatic.com/images3_ccc/2025/01/06/7b/17361330377fbd4275700432e0deee8b25cd6168e7_thumbnail_2000x.webp",
        link: "/product/1",
      },
      {
        src: "https://img.ltwebstatic.com/images3_ccc/2025/01/06/d0/1736133057759fc7e2b13a8890fdb5e856eb9b01b1_thumbnail_2000x.webp",
        link: "/product/2",
      },
      {
        src: "https://img.ltwebstatic.com/images3_ccc/2025/01/06/be/1736133242ecb1caa6d29ba63482b04b35f9bf74f8_thumbnail_2000x.webp",
        link: "/product/3",
      },
    ]);

    setBannerAds([
      {
        src: "https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/d92000a0eed16cc8.jpg?q=20",
        link: "/category/1",
      },
      {
        src: "https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/d9290fb51138d286.png?q=20",
        link: "/category/2",
      },
      {
        src: "https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/7f3cde58a30f6024.jpg?q=20",
        link: "/category/3",
      },
    ]);
  }, []);

  return (
    <>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-[30%_70%] gap-4">
        <div className="flex flex-col w-full hidden md:block">
          {bannerAds.map((ad, index) => (
            <a key={index} href={ad.link} className="block">
              <img
                src={ad.src}
                alt={`Banner ${index + 1}`}
                className="w-full h-[100px] rounded-lg shadow-lg hover:opacity-90 object-cover"
              />
            </a>
          ))}
        </div>

        <div>
          <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            showArrows={true}
            dynamicHeight={false}
            interval={3000}
          >
            {carouselImages.map((image, index) => (
              <a key={index} href={image.link}>
                <img
                  src={image.src}
                  alt={`Carousel ${index + 1}`}
                  className="w-full h-[300px] rounded-lg shadow-lg object-cover"
                />
              </a>
            ))}
          </Carousel>
        </div>
      </div>

      <CategoryList />
      <FlashSale/>
    </>
  );
};

export default Homepage;
