import React, { useState } from "react";

const Categories = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubcategory, setActiveSubcategory] = useState(null);

  const categories = [
    {
      name: "Electronics",
      subcategories: [
        {
          name: "Mobile Phones",
          subcategories: [{ name: "Smartphones" }, { name: "Feature Phones" }],
        },
        { name: "Laptops" },
        { name: "Cameras" },
      ],
    },
    {
      name: "Fashion",
      subcategories: [
        {
          name: "Men",
          subcategories: [{ name: "Shirts" }, { name: "Trousers" }],
        },
        {
          name: "Women",
          subcategories: [{ name: "Dresses" }, { name: "Skirts" }],
        },
      ],
    },
  ];

  const renderSubcategories = (subcategories, depth = 0) => {
    if (!subcategories) return null;

    return (
      <ul
        className={`absolute bg-white shadow-md w-60 ${
          depth === 1 ? "left-full top-0" : "ml-4"
        }`}
      >
        {subcategories.map((subcategory, index) => (
          <li
            key={index}
            className="relative p-2 hover:bg-gray-200 cursor-pointer w-60"
            onMouseEnter={() => setActiveSubcategory(index)}
            onMouseLeave={() => setActiveSubcategory(null)}
          >
            {subcategory.name}
            {activeSubcategory === index &&
              renderSubcategories(subcategory.subcategories, depth + 1)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="categories relative">
      {/* Categories Button */}
      <button
        className="btn p-4 bg-blue-600 text-white rounded hover:bg-blue-700"
        onMouseEnter={() => setShowMenu(true)}
        onMouseLeave={() => {
          setShowMenu(false);
          setActiveCategory(null);
        }}
      >
        Categories
      </button>

      {/* Categories Dropdown */}
      {showMenu && (
        <ul
          className="absolute top-full left-0 w-60 bg-white shadow-md"
          onMouseEnter={() => setShowMenu(true)}
          onMouseLeave={() => {
            setShowMenu(false);
            setActiveCategory(null);
          }}
        >
          {categories.map((category, index) => (
            <li
              key={index}
              className="relative p-2 hover:bg-gray-200 cursor-pointer w-60"
              onMouseEnter={() => setActiveCategory(index)}
              onMouseLeave={() => setActiveCategory(null)}
            >
              {category.name}
              {activeCategory === index &&
                renderSubcategories(category.subcategories, 1)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Categories;
