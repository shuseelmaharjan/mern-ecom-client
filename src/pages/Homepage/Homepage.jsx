import React, { useState } from 'react';

const Homepage = () => {
  // Define state variables for each field
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [img1, setImg1] = useState(null);
  const [returnExchange, setReturnExchange] = useState(false);
  const [returningDays, setReturningDays] = useState('');
  const [returningDescription, setReturningDescription] = useState('');

  // State for dynamic colors
  const [colors, setColors] = useState([{ code: '', name: '' }]);

  // Handle adding new color fields
  const handleAddColor = () => {
    setColors([...colors, { code: '', name: '' }]);
  };

  // Handle color change
  const handleColorChange = (index, field, value) => {
    const updatedColors = [...colors];
    updatedColors[index][field] = value;
    setColors(updatedColors);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the form data using FormData to handle file uploads
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', parseFloat(price));
    formData.append('quantity', parseInt(quantity));
    formData.append('img1', img1);

    formData.append('returnExchange', returnExchange);
    if (returnExchange) {
      formData.append('returningDays', returningDays);
      formData.append('returningDescription', returningDescription);
    }

    try {
      const response = await fetch('http://localhost:5000/api/v1/create-product', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySW5mbyI6eyJlbWFpbCI6InZlbmRvcjFAZ21haWwuY29tIiwiaWQiOiI2Nzc1MTQxOGU3N2YzZmM0MzgwMjdmNGIiLCJyb2xlIjoidmVuZG9yIn0sImlhdCI6MTczNTgxMzMxNCwiZXhwIjoxNzM1ODE2OTE0fQ.ITmzRXHjdzfXq5jGpSjr5FKydiFzM6vW66lQFMSZG74`,
        },
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Product created successfully:', data);
      } else {
        console.error('Failed to create product:', data);
      }
    } catch (error) {
      console.error('Error sending data:', error.message || error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Create Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Field */}
        <div className="flex flex-col">
          <label className="font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        {/* Description Field */}
        <div className="flex flex-col">
          <label className="font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        {/* Price Field */}
        <div className="flex flex-col">
          <label className="font-medium">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        {/* Quantity Field */}
        <div className="flex flex-col">
          <label className="font-medium">Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        {/* Image Fields */}
        <div className="flex flex-col">
          <label className="font-medium">Img 1</label>
          <input
            type="file"
            onChange={(e) => setImg1(e.target.files[0])}
            className="p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        {/* Dynamic Colors */}
        <div>
          <h3 className="font-medium">Colors</h3>
          {colors.map((color, index) => (
            <div key={index} className="flex space-x-4 mb-2">
              <div className="flex flex-col flex-1">
                <label className="font-medium">Color Code</label>
                <input
                  type="text"
                  value={color.code}
                  onChange={(e) => handleColorChange(index, 'code', e.target.value)}
                  className="p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="flex flex-col flex-1">
                <label className="font-medium">Color Name</label>
                <input
                  type="text"
                  value={color.name}
                  onChange={(e) => handleColorChange(index, 'name', e.target.value)}
                  className="p-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddColor}
            className="text-blue-500 hover:underline"
          >
            Add Color
          </button>
        </div>

        <div className="flex flex-col">
          <label className="font-medium">Allow Return and Exchange?</label>
          <select
            value={returnExchange}
            onChange={(e) => setReturnExchange(e.target.value === 'true')}
            className="p-2 border border-gray-300 rounded-lg"
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>

        {returnExchange && (
          <>
            <div className="flex flex-col">
              <label className="font-medium">Returning Days</label>
              <input
                type="number"
                value={returningDays}
                onChange={(e) => setReturningDays(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium">Returning Description</label>
              <textarea
                value={returningDescription}
                onChange={(e) => setReturningDescription(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg"
              />
            </div>
          </>
        )}
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Homepage;
