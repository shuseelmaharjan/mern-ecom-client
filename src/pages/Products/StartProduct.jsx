import React, { useState, useEffect, useRef } from 'react';
import apiHandler from '../../api/apiHandler';
import bgImage from '../../assets/create.jpg';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router';

const StartProduct = () => {
  const { accessToken } = useAuth();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef(null);
  const TITLE_CHAR_LIMIT = 140;

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedCategoryId = selectedCategory ? getLastChildId(selectedCategory) : '';
  
    try {
      const response = await apiHandler(
        {
          title,
          category: selectedCategoryId,
        },
        '/api/v1/create-product',
        'POST',
        accessToken
      );
  
      if (response && response._id) {
        setTitle('');
        setCategory('');
        setSelectedCategory(null);
        setSuggestions([]);
        navigate(`/listing/create-listing/${response._id}`);
      } else {
        console.error('Unexpected response format:', response);
      }
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  const fetchSuggestions = async (value) => {
    if (value.length > 1) {
      try {
        const response = await apiHandler(
          null,
          `/api/cat-suggestions?keyword=${value}`,
          'GET'
        );
        setSuggestions(response.suggestions);
        setShowSuggestions(true);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setCategory(value);
    fetchSuggestions(value);
  };

  const handleTitleChange = (e) => {
    const { value } = e.target;
    if (value.length <= TITLE_CHAR_LIMIT) {
      setTitle(value);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const categoryPath = getSuggestionValue(suggestion);
    setSelectedCategory(suggestion);
    setCategory(categoryPath);
    setShowSuggestions(false);
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      setHighlightedIndex((prevIndex) => (prevIndex + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp') {
      setHighlightedIndex((prevIndex) => (prevIndex - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === 'Enter' && highlightedIndex >= 0) {
      handleSuggestionClick(suggestions[highlightedIndex]);
      setHighlightedIndex(-1);
    }
  };

  const getSuggestionValue = (suggestion) => {
    let categoryPath = suggestion.parentCategory.name;
    if (suggestion.subCategories.length > 0) {
      categoryPath += ` > ${suggestion.subCategories[0].name}`;
      if (suggestion.subCategories[0].grandCategories.length > 0) {
        categoryPath += ` > ${suggestion.subCategories[0].grandCategories[0].name}`;
      }
    }
    return categoryPath;
  };

  const getLastChildId = (suggestion) => {
    if (suggestion.subCategories.length > 0) {
      if (suggestion.subCategories[0].grandCategories.length > 0) {
        return suggestion.subCategories[0].grandCategories[0].id;
      }
      return suggestion.subCategories[0].id;
    }
    return suggestion.parentCategory.id;
  };

  const renderSuggestion = (suggestion, index) => {
    const categoryPath = getSuggestionValue(suggestion);
    return (
      <div
        key={categoryPath}
        onMouseDown={(e) => {
          e.preventDefault();
          handleSuggestionClick(suggestion);
        }}
        className={`cursor-pointer p-2 hover:bg-gray-200 ${highlightedIndex === index ? 'bg-gray-200' : ''}`}
      >
        {categoryPath}
      </div>
    );
  };

  const clearSelectedCategory = () => {
    setSelectedCategory(null);
    setCategory('');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [inputRef]);

  return (
    <div className="flex flex-col md:flex-row items-center justify-center p-6">
      <div className="w-full md:w-6/12 mb-6 md:mb-0 md:mr-6 flex items-center justify-center">
        <img src={bgImage} alt="Product" className="w-auto h-auto md:h-[80vh] object-cover" />
      </div>
      <div className="w-full md:w-6/12">
        <h1 className="text-2xl font-bold mb-4">Create Listing</h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div>
            <label htmlFor="title" className="block text-lg font-medium text-gray-800">Title:</label>
            <div className="relative">
              <input
                type="text"
                id="title"
                value={title}
                onChange={handleTitleChange}
                required
                className="w-full mt-2 px-3 py-2 border border-gray-400 bg-transparent text-gray-800 focus:outline-none transition-all duration-300 text-base"
              />
              <div className="flex justify-end">
                <span className="relative right-2 top-2 text-right text-gray-600">{title.length}/{TITLE_CHAR_LIMIT}</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <label htmlFor="category" className="block text-lg font-medium text-gray-800">Category:</label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              required
              ref={inputRef}
              className="w-full mt-2 px-3 py-2 border border-gray-400 bg-transparent text-gray-800 focus:outline-none transition-all duration-300 text-base"
              placeholder="Type to search categories"
            />
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute z-10 w-full bg-white border border-gray-400 mt-1 rounded-md shadow-lg">
                {suggestions.map((suggestion, index) => renderSuggestion(suggestion, index))}
              </div>
            )}
          </div>
          {selectedCategory && (
            <div className="bg-gray-100 p-4 rounded-md">
              <p><strong>Your product will be display at:</strong> {getSuggestionValue(selectedCategory)}</p>
              <button
                type="button"
                onClick={clearSelectedCategory}
                className="mt-2 text-red-500 hover:text-red-700"
              >
                Remove Selected Category
              </button>
            </div>
          )}
          <button
            type="submit"
            className="bg-gray-800 text-white px-6 py-2 hover:bg-gray-700"
          >
            Proceed
          </button>
        </form>
      </div>
    </div>
  );
};

export default StartProduct;