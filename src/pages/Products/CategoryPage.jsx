import React from "react";
import { useLocation } from "react-router-dom";

const CategoryPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");
  const catId = queryParams.get("src");

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Category: {category}</h1>
      <p>Category ID: {catId}</p>
    </div>
  );
};

export default CategoryPage;
