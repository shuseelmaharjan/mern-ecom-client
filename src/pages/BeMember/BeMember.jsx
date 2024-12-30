import React, { useState, useEffect } from 'react';

// Helper function to handle storing form data in session storage
const saveToSessionStorage = (key, value) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

// Helper function to get form data from session storage
const getFromSessionStorage = (key) => {
  const data = sessionStorage.getItem(key);
  return data ? JSON.parse(data) : {};
};

const BeMember = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    shopName: '',
    ownerName: '',
    shopLogo: null,
    shopDescription: '',
    confirmation: false,
  });

  // Load form data from session storage when component mounts
  useEffect(() => {
    const storedData = getFromSessionStorage('formData');
    if (storedData) {
      setFormData(storedData);
    }
  }, []);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => {
      const newData = {
        ...prev,
        [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
      };
      // Save the updated form data to session storage
      saveToSessionStorage('formData', newData);
      return newData;
    });
  };

  // Navigate to the next step
  const goToNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  // Navigate to the previous step
  const goToPreviousStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  // Submit the form (final step)
  const handleSubmit = () => {
    // Here you can handle form submission, like sending the data to a server
    console.log('Form submitted', formData);
    alert('Form submitted!');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 px-6">
        <h1 className="text-2xl font-semibold">Golden Future Institute</h1>
        <p>Your Future, Our Commitment</p>
      </header>

      {/* Main Content */}
      <div className="flex-1 px-6 py-8">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          
          {/* Subway Links */}
          <div className="flex justify-between mb-6">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                onClick={() => setStep(index + 1)}
                className={`cursor-pointer text-center py-2 px-4 rounded-full ${
                  step === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
                }`}
              >
                Step {index + 1}
              </div>
            ))}
          </div>

          {/* Step Content */}
          <div>
            {/* Step 1: Shop Name */}
            {step === 1 && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Step 1: Shop Name</h3>
                <input
                  type="text"
                  name="shopName"
                  value={formData.shopName}
                  onChange={handleChange}
                  placeholder="Enter your shop name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="mt-4">
                  <button
                    onClick={goToNextStep}
                    className="bg-blue-600 text-white px-6 py-3 rounded-md"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Owner Name and Shop Logo */}
            {step === 2 && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Step 2: Owner Name and Shop Logo</h3>
                <input
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="mt-4">
                  <input
                    type="file"
                    name="shopLogo"
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md py-2 px-4"
                  />
                  <p className="text-gray-500 mt-2">Upload your shop logo</p>
                </div>
                <div className="mt-4">
                  <button
                    onClick={goToNextStep}
                    className="bg-blue-600 text-white px-6 py-3 rounded-md"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Shop Description */}
            {step === 3 && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Step 3: Shop Description</h3>
                <textarea
                  name="shopDescription"
                  value={formData.shopDescription}
                  onChange={handleChange}
                  placeholder="Describe your shop and what you sell"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                />
                <div className="mt-4">
                  <button
                    onClick={goToNextStep}
                    className="bg-blue-600 text-white px-6 py-3 rounded-md"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Confirmation */}
            {step === 4 && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Step 4: Confirmation</h3>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="confirmation"
                    checked={formData.confirmation}
                    onChange={handleChange}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <label htmlFor="confirmation" className="ml-2 text-sm">
                    I confirm that the information provided is accurate and I agree to the terms and conditions.
                  </label>
                </div>
                <div className="mt-4">
                  <button
                    onClick={handleSubmit}
                    className="bg-blue-600 text-white px-6 py-3 rounded-md"
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeMember;
