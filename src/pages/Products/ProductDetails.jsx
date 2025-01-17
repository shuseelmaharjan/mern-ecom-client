import React from 'react';

const ProductDetails = ({ setTitle }) => {
  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value.trim() !== '') {
      setTitle(value);
    } else {
      setTitle(''); 
    }
  };

  return (
    <div>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        onChange={handleInputChange}
        className="border-gray-800 border"
        required
      />
    </div>
  );
};

export default ProductDetails;
