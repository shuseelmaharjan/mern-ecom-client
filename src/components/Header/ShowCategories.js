import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HomepageService from "../../services/homepageService/homepageService";
import { capitalizeFirstLetter } from "../../utils/textUtils";

const ShowCategories = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await HomepageService.getCategories();
        setCategories(response.data);
      } catch (err) {
        setError("Error fetching categories");
      }
    };

    fetchCategories();
  }, []);

  if (error) {
    return (
      <div className="text-center py-4 text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="absolute top-full w-64 bg-white border border-gray-200 shadow-lg z-10">
      <ul className="space-y-2 border bg-white shadow-lg overflow-hidden">
        {categories.map((category) => (
          <li key={category._id} className="hover:bg-gray-100">
            <Link
              to={`/category?category=${encodeURIComponent(
                category.name
              )}&src=${category._id}`}
              className="block px-4 py-2 text-base font-medium text-gray-800 hover:text-gray-900"
            >
              {capitalizeFirstLetter(category.name)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowCategories;
