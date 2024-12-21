import React, { useState } from 'react';
import Nav from '../../components/Profile/Nav';

const PublicProfile = () => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [city, setCity] = useState('');
  const [dob, setDob] = useState('');
  const [about, setAbout] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [shop, setShop] = useState(false);
  const [favoriteItems, setFavoriteItems] = useState(false);
  const [favoriteShop, setFavoriteShop] = useState(false);

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(URL.createObjectURL(file)); // Preview the image
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would handle the form submission (e.g., sending the data to the backend)
    alert('Profile updated successfully!');
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navigation */}
      <Nav />

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <form onSubmit={handleSubmit}>
          {/* Profile Picture Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Update Profile Picture</h2>
            <div className="flex flex-col items-center mb-4">
              <input
                type="file"
                onChange={handleProfilePictureChange}
                className="border border-gray-300 rounded-md p-2"
              />
              {profilePicture && (
                <img
                  src={profilePicture}
                  alt="Profile Preview"
                  className="mt-4 rounded-full w-32 h-32 object-cover"
                />
              )}
            </div>
          </div>

          {/* Name Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Update Name</h2>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Gender Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Update Gender</h2>
            <div className="flex space-x-6">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="Male"
                  checked={gender === 'Male'}
                  onChange={() => setGender('Male')}
                  className="mr-2"
                />
                Male
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="Female"
                  checked={gender === 'Female'}
                  onChange={() => setGender('Female')}
                  className="mr-2"
                />
                Female
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="Other"
                  checked={gender === 'Other'}
                  onChange={() => setGender('Other')}
                  className="mr-2"
                />
                Other
              </label>
            </div>
          </div>

          {/* City Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Update City</h2>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter your city"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Date of Birth Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Update Date of Birth</h2>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* About Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">About You</h2>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="Write something about yourself"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              rows="4"
            />
          </div>

          {/* Profile Options */}
          <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Include on Your Profile</h2>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={shop}
                  onChange={() => setShop(!shop)}
                  className="mr-2"
                />
                Shop
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={favoriteItems}
                  onChange={() => setFavoriteItems(!favoriteItems)}
                  className="mr-2"
                />
                Favorite Items
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={favoriteShop}
                  onChange={() => setFavoriteShop(!favoriteShop)}
                  className="mr-2"
                />
                Favorite Shop
              </label>
            </div>
          </div>

          {/* Save Changes Button */}
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-green-600 transition text-lg font-bold"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default PublicProfile;
