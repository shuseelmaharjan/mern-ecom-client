import React, { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { VscSettings } from "react-icons/vsc";
import homepageService from "../../services/homepageService/homepageService"; 
import { capitalizeFirstLetter } from "../../utils/textUtils";

const GrandCategory = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");
  const categoryId = queryParams.get("src");
  const subcategory = queryParams.get("sub")
  const subCatId = queryParams.get("src_identify");
  const granCatName = queryParams.get('category-child');
  const grandCatId = queryParams.get('source');


  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    brands: "", 
    colors: "", 
    sizes: "", 
    tags: "", 
    minPrice: null, 
    maxPrice: null, 
  });
  const [filterAttributes, setFilterAttributes] = useState({
    brands: [],
    colors: [],
    sizes: [],
    tags: [],
  });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchProducts = useCallback(async (page = 1, filterParams = {}) => {
    setLoading(true);
    try {
      const data = await homepageService.fetchProducts2(grandCatId, page, filterParams);
      setProducts((prev) => (page === 1 ? data : [...prev, ...data]));
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, [grandCatId]);

  const fetchFilterAttributes = useCallback(async () => {
    try {
      const data = await homepageService.fetchFilterAttributes(categoryId);
      setFilterAttributes(data);
    } catch (error) {
      console.error("Error fetching filter attributes:", error);
    }
  }, [categoryId]);

  useEffect(() => {
    fetchProducts(page);
    fetchFilterAttributes();
  }, [subCatId, page, fetchProducts, fetchFilterAttributes]);
  

  const handleFilterClick = (filterType, value) => {
    setFilters((prev) => {
      const updatedFilters = {
        ...prev,
        [filterType]: prev[filterType] === value ? "" : value,
      };
      return updatedFilters;
    });
  };

  const handlePriceChange = (field, value) => {
    if (field === "minPrice" && (filters.maxPrice === null || value <= filters.maxPrice)) {
      setFilters((prev) => ({ ...prev, [field]: value }));
    } else if (field === "maxPrice" && (filters.minPrice === null || value >= filters.minPrice)) {
      setFilters((prev) => ({ ...prev, [field]: value }));
    }
  };

  const applyFilters = async () => {
    const filterParams = {
      brand: filters.brands,
      size: filters.sizes,
      price: `${filters.minPrice ? filters.minPrice : 0}-${filters.maxPrice ? filters.maxPrice : 0}`,
      tags: filters.tags,
    };

    try {
      const filteredProducts = await homepageService.fetchFilteredProducts1(
        grandCatId,
        filterParams,
        1,
        2
      );
      setProducts(filteredProducts);
    } catch (error) {
      console.error("Error fetching filtered products:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <nav className="mb-4">
        <ol className="flex space-x-2 text-gray-600">
          <Link to={"/"}>
          <li  className="flex items-center">
                Home
            </li>
          </Link>
          <span className="mx-2 text-gray-600">/ </span>
          <Link to={`/category?category=${category}&src=${categoryId}`}>
          <li  className="flex items-center">
                {capitalizeFirstLetter(category)}
            </li>
          </Link>
          <span className="mx-2 text-gray-600">/ </span>
          <Link 
          to={`/category/page2.html?category=${category}&src=${categoryId}&sub=${subcategory}&src_identify=${subCatId}`}
          >
             <li  className="flex items-center text-gray-600">
                {capitalizeFirstLetter(subcategory)}
            </li>
          </Link>
         
            <span className="mx-2 text-gray-600">/ </span>
            <li  className="flex items-center text-gray-400">
                {capitalizeFirstLetter(granCatName)}
            </li>
            
         
        </ol>
      </nav>
      <div className="flex gap-4">
        <div className="w-3/12 border-r-[1px] border-gray-300 p-4">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-semibold text-lg">Filters {category}</h3>
            <VscSettings />
          </div>

          <div className="block">
            <span className="font-semibold text-base text-gray-600">
              Filter by Price
            </span>
            <div className="flex gap-4 mb-4 mt-2">
              <div className="w-1/2">
                <label
                  htmlFor="minPrice"
                  className="block font-medium text-sm mb-2"
                >
                  Minimum Price
                </label>
                <input
                  type="number"
                  id="minPrice"
                  value={filters.minPrice}
                  onChange={(e) =>
                    handlePriceChange("minPrice", parseInt(e.target.value))
                  }
                  className="w-full border text-sm px-3 py-2 rounded-lg"
                  min={5}
                />
              </div>
              <span className="text-lg">to</span>
              <div className="w-1/2">
                <label
                  htmlFor="maxPrice"
                  className="block font-medium text-sm mb-2"
                >
                  Maximum Price
                </label>
                <input
                  type="number"
                  id="maxPrice"
                  value={filters.maxPrice}
                  onChange={(e) =>
                    handlePriceChange("maxPrice", parseInt(e.target.value))
                  }
                  className="w-full border text-sm px-3 py-2 rounded-lg"
                  min={5}
                />
              </div>
            </div>
          </div>

          <div className="block mt-4">
            <span className="font-semibold text-base text-gray-600">
              Filter by Color
            </span>
            <div className="mb-4 mt-2">
              {filterAttributes.colors.map((color, index) => (
                <span
                  key={index}
                  onClick={() => handleFilterClick("colors", color.name)}
                  className={`cursor-pointer inline-block px-3 py-1 m-1 rounded-full text-sm ${
                    filters.colors === color.name
                      ? "bg-gray-800 text-white"
                      : "text-gray-800 border-[1px] border-gray-800"
                  }`}
                >
                  {color.name}
                </span>
              ))}
            </div>
          </div>

          <div className="block mt-4">
            <span className="font-semibold text-base text-gray-600">
              Filter by Brand
            </span>
            <div className="mb-4 mt-2">
              {filterAttributes.brands.map((brand, index) => (
                <span
                  key={index}
                  onClick={() => handleFilterClick("brands", brand)}
                  className={`cursor-pointer inline-block px-3 py-1 m-1 rounded-full text-sm ${
                    filters.brands === brand
                      ? "bg-gray-800 text-white"
                      : "text-gray-800 border-[1px] border-gray-800"
                  }`}
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>

          <div className="block mt-4">
            <span className="font-semibold text-base text-gray-600">
              Filter by Size
            </span>
            <div className="mb-4 mt-2">
              {filterAttributes.sizes.map((size, index) => (
                <span
                  key={index}
                  onClick={() => handleFilterClick("sizes", size)}
                  className={`cursor-pointer inline-block px-3 py-1 m-1 rounded-full text-sm ${
                    filters.sizes === size
                      ? "bg-gray-800 text-white"
                      : "text-gray-800 border-[1px] border-gray-800"
                  }`}
                >
                  {size}
                </span>
              ))}
            </div>
          </div>

          <div className="block mt-4">
            <span className="font-semibold text-base text-gray-600">
              Filter by Tags
            </span>
            <div className="mb-4 mt-2">
              {filterAttributes.tags.map((tag, index) => (
                <span
                  key={index}
                  onClick={() => handleFilterClick("tags", tag)}
                  className={`cursor-pointer inline-block px-3 py-1 m-1 rounded-full text-sm ${
                    filters.tags === tag
                      ? "bg-gray-800 text-white"
                      : "text-gray-800 border-[1px] border-gray-800"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={applyFilters}
            className="w-full mt-4 px-6 py-2 bg-gray-800 text-white font-semibold text-sm hover:bg-gray-700 transition duration-300"
          >
            Apply Filters
          </button>
        </div>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((item) => (
            <Link
              key={item._id}
              to={`/product?${encodeURIComponent(
                item.title.replace(/ /g, "-")
              )}.html&src_identifier=${item._id}`}
              className="group bg-white relative shadow hover:shadow-lg transition-shadow duration-300"
            >
              {item.campaign && (
                <div className="absolute top-2 right-2 bg-orange-300 text-white text-xs font-semibold px-2 py-1 rounded">
                  {item.campaign.saleType} - {item.campaign.discountPercentage}%
                  Off
                </div>
              )}

              <div className="relative">
                <img
                  src={`http://localhost:5000/${item.defaultImage}`}
                  alt={item.title}
                  className={`w-full h-80 object-cover ${
                    item.secondImage
                      ? "transition-opacity duration-700 group-hover:opacity-0"
                      : ""
                  }`}
                />
                {item.secondImage && (
                  <img
                    src={`http://localhost:5000/${item.secondImage}`}
                    alt={item.title}
                    className="w-full h-80 object-cover absolute top-0 left-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                  />
                )}
              </div>

              <div className="p-4">
                <h3
                  className="text-sm font-semibold truncate mt-2"
                  title={item.title}
                >
                  {item.title}
                </h3>
                {item.brand && (
                  <p className="text-xs text-gray-500 text-left">
                    {item.brand}
                  </p>
                )}
                <div className="flex justify-start items-center mt-2">
                  {item.campaign ? (
                    <>
                      <p className="text-lg font-bold text-orange-500">
                        ${item.discountedPrice}
                      </p>
                      <p className="text-sm text-gray-800 line-through mx-2">
                        ${item.price}
                      </p>
                      <p className="text-sm text-gray-800 font-semibold">
                        -{item.campaign.discountPercentage}%
                      </p>
                      <span className="ml-2 bg-orange-100 border-orange-500 border-2 text-orange-500 px-2 rounded-full">
                        {item.campaign.saleType}
                      </span>
                    </>
                  ) : (
                    <p className="text-lg font-bold text-orange-500">
                      ${item.price}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}

          <div className="text-center mt-4 col-span-full">
            <button
              onClick={() => setPage(page + 1)}
              disabled={loading}
              className="w-2/12 mt-4 px-6 py-2 bg-gray-800 text-white font-semibold text-sm hover:bg-gray-700 transition duration-300"
              >
              {loading ? "Loading..." : "View More"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrandCategory;
