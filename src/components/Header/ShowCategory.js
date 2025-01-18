import React from "react";

const ShowCategory = () => {
  return (
    <>
      <div className="absolute top-full mt-2 w-64 bg-white border border-gray-200 shadow-lg z-10">
        <ul className="flex flex-col divide-y divide-gray-200">
          <li className="p-3 hover:bg-gray-100">Electronics</li>
          <li className="p-3 hover:bg-gray-100">Fashion</li>
          <li className="p-3 hover:bg-gray-100">Home & Garden</li>
          <li className="p-3 hover:bg-gray-100">Sports</li>
          <li className="p-3 hover:bg-gray-100">Toys</li>
        </ul>
      </div>
    </>
  );
};

export default ShowCategory;
