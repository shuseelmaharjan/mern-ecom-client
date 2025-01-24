import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HomepageService from "../../services/homepageService/homepageService";
import config from "../../services/config";
import { capitalizeFirstLetter } from "../../utils/textUtils";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await HomepageService.getCategories();
        setCategories(response.data);
      } catch (err) {
        setError("Error fetching categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const BASE_URL = config.API_BASE_URL;

  if (loading) {
    return <div></div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-4 mt-12">
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/category?category=${encodeURIComponent(category.name.replace(/ /g, "-"))}&src=${
              category._id
            }`}
            className="flex flex-col items-center"
          >
            <img
              src={`${BASE_URL}/${category.image}`}
              alt={category.name}
              className="w-28 h-28 rounded-full object-cover mb-4"
            />
            <h3 className="text-lg font-semibold text-center">
              {capitalizeFirstLetter(category.name)}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
