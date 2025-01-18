import React, { useState } from "react";
import ReactImageMagnify from "react-image-magnify";
import config from "../../services/config";

const MyReactImageMagnify = ({ selectedImage }) => {
  const BASE_URL = config.API_BASE_URL;
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setMousePosition({ x, y });
  };

  return (
    <div className="relative">
      <div onMouseMove={handleMouseMove} className="relative w-full h-full">
        <ReactImageMagnify
          {...{
            smallImage: {
              alt: "Product image",
              isFluidWidth: true,
              src: `${BASE_URL}/${selectedImage}`,
            },
            largeImage: {
              src: `${BASE_URL}/${selectedImage}`,
              width: 1200,
              height: 1800,
              objectFit: "cover", // Set objectFit to cover for zoomed image
            },
            enlargedImageContainerStyle: {
              position: "fixed",
              left: `${mousePosition.x}%`, // Dynamically adjust based on mouse x position
              top: `${mousePosition.y}%`, // Dynamically adjust based on mouse y position
              zIndex: 1500,
              width: "200px", // Adjust width as needed
              height: "200px", // Adjust height as needed
              transform: "translate(-50%, -50%)", // Keep the zoomed image centered on the cursor
            },
          }}
        />
      </div>
    </div>
  );
};

export default MyReactImageMagnify;
