import React, { useState } from "react";

const dummyData = {
  categories: [
    {
      id: 1,
      name: "Electronics",
      image: "https://via.placeholder.com/50",
      children: [
        {
          id: 101,
          name: "Mobile Phones",
          image: "https://via.placeholder.com/50",
          children: [
            { id: 1001, name: "iPhone", image: "https://via.placeholder.com/50" },
            { id: 1002, name: "Samsung", image: "https://via.placeholder.com/50" },
          ],
        },
        {
          id: 102,
          name: "Laptops",
          image: "https://via.placeholder.com/50",
          children: [
            { id: 2001, name: "MacBook", image: "https://via.placeholder.com/50" },
            { id: 2002, name: "Dell", image: "https://via.placeholder.com/50" },
          ],
        },
      ],
    },
    {
      id: 2,
      name: "Fashion",
      image: "https://via.placeholder.com/50",
      children: [
        {
          id: 201,
          name: "Men",
          image: "https://via.placeholder.com/50",
          children: [
            { id: 3001, name: "Shirts", image: "https://via.placeholder.com/50" },
            { id: 3002, name: "Trousers", image: "https://via.placeholder.com/50" },
          ],
        },
        {
          id: 202,
          name: "Women",
          image: "https://via.placeholder.com/50",
          children: [
            { id: 4001, name: "Dresses", image: "https://via.placeholder.com/50" },
            { id: 4002, name: "Skirts", image: "https://via.placeholder.com/50" },
          ],
        },
      ],
    },
  ],
};

const Categories = () => {
  const [categories] = useState(dummyData.categories);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedChild, setSelectedChild] = useState(categories[0].children[0]);
  const [selectedGrandChild, setSelectedGrandChild] = useState(
    categories[0].children[0].children[0]
  );

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedChild(category.children[0]);
    setSelectedGrandChild(category.children[0]?.children[0]);
  };

  const handleChildSelect = (child) => {
    setSelectedChild(child);
    setSelectedGrandChild(child.children[0]);
  };

  const handleGrandChildSelect = (grandChild) => {
    setSelectedGrandChild(grandChild);
  };

  return (
    <div className="flex flex-col lg:flex-row w-full h-auto p-6 shadow-lg rounded-lg gap-6 lg:gap-8 border-gray-100 border-2">
      {/* Category Column */}
      <div className="flex-1 bg-gray-100 rounded-lg p-4 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Categories</h2>
          <button className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700">
            Add Category
          </button>
        </div>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li
              key={category.id}
              onClick={() => handleCategorySelect(category)}
              className={`p-2 flex items-center space-x-4 rounded shadow-sm cursor-pointer ${
                selectedCategory.id === category.id
                  ? "bg-gray-300"
                  : "bg-white hover:bg-gray-200"
              }`}
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-12 h-12 object-cover rounded"
              />
              <span>{category.name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Category Child Column */}
      <div className="flex-1 bg-gray-100 rounded-lg p-4 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">
          {`Child of ${selectedCategory.name}`}
        </h2>
        <ul className="space-y-2">
          {selectedCategory.children.map((child) => (
            <li
              key={child.id}
              onClick={() => handleChildSelect(child)}
              className={`p-2 flex items-center space-x-4 rounded shadow-sm cursor-pointer ${
                selectedChild.id === child.id
                  ? "bg-gray-300"
                  : "bg-white hover:bg-gray-200"
              }`}
            >
              <img
                src={child.image}
                alt={child.name}
                className="w-12 h-12 object-cover rounded"
              />
              <span>{child.name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Grand Category Column */}
      <div className="flex-1 bg-gray-100 rounded-lg p-4 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">
          {`Child of ${selectedChild.name}`}
        </h2>
        <ul className="space-y-2">
          {selectedChild.children.map((grandChild) => (
            <li
              key={grandChild.id}
              onClick={() => handleGrandChildSelect(grandChild)}
              className={`p-2 flex items-center space-x-4 rounded shadow-sm cursor-pointer ${
                selectedGrandChild.id === grandChild.id
                  ? "bg-gray-300"
                  : "bg-white hover:bg-gray-200"
              }`}
            >
              <img
                src={grandChild.image}
                alt={grandChild.name}
                className="w-12 h-12 object-cover rounded"
              />
              <span>{grandChild.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Categories;
