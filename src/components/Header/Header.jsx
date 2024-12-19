import React, { useState } from 'react';
import logo from '../../assets/felthub-logo.png';
import { FaSearch, FaBars, FaShoppingCart, FaRegHeart, FaUser, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Header = () => {
  // State to manage the category dropdown visibility
  const [showCategory, setShowCategory] = useState(false);

  // State to manage the mobile menu visibility
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <>
    <header className="bg-white text-black p-4 relative shadow-xl border-gray-300">
      <div className="container mx-auto">
        {/* Desktop View */}
        <div className="hidden lg:flex items-center relative">
          <div className="flex items-center space-x-4 justify-between w-[20vw]">
            <Link to="/">
              <img src={logo} alt="Logo" className="w-30" />
            </Link>
            <button
              onClick={() => setShowCategory(!showCategory)}
              className="px-4 py-2 rounded-md flex items-center justify-center hover:bg-gray-100 transition-colors duration-300 w-[10vw] text-xl"
            >
              Categories
              <FaBars className='ml-4' />
            </button>
            
          </div>
          <div className="flex items-center">
            <input
              type="text"
              className="w-[40vw] py-2 px-4 border border-gray-400 focus:outline-none"
              placeholder="Search..."
            />
            <button className="bg-green-500 p-2.5 border border-gray-400 text-white">
              <FaSearch className="text-xl" />
            </button>
          </div>
          <div className="flex items-center justify-end space-x-2 w-[20vw]">
            <span className="flex items-center p-2 rounded-lg hover:bg-gray-200 cursor-pointer transition-colors duration-200 select-none">
              <FaRegHeart className="text-2xl" />
            </span>

            <span className="flex items-center p-2 rounded-lg hover:bg-gray-200 cursor-pointer transition-colors duration-200 select-none">
              <FaShoppingCart className="text-2xl" />
              <span className="text-xl mx-2">Cart</span>
            </span>

            <span className="flex items-center p-2 rounded-lg hover:bg-gray-200 cursor-pointer transition-colors duration-200 select-none">
              <Link to='/login'>
                <FaUser className="text-2xl" />
                <span className="text-xl mx-2">Login/Signup</span>
              </Link>
            </span>
          </div>

        </div>
        {/* Mobile View */}
        <div className="lg:hidden">
          <div className="flex items-center justify-between">
            <div className="flex">
              <button onClick={() => setShowMobileMenu(!showMobileMenu)}>
                <div className="w-6 h-1 bg-black mb-1"></div>
                <div className="w-6 h-1 bg-black mb-1"></div>
                <div className="w-6 h-1 bg-black"></div>
              </button>
              <img src={logo} alt="Logo" className="w-20 ml-5" />
            </div>

            <div className="flex items-center space-x-4">
              <FaRegHeart className="text-xl" />
              <FaShoppingCart className="text-xl" />
              <span>
              <FaUser className="text-xl" />
              <span>Sign in</span>
              </span>
            </div>
          </div>
          {showMobileMenu && (
            <div className="absolute bg-gray-700 text-white p-4 w-full">
              <button onClick={() => setShowMobileMenu(false)}>
                <FaTimes className="text-xl" />
              </button>
              <ul>
                <li>Category 1</li>
                <li>Category 2</li>
                <li>Category 3</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
    {showCategory && (
      <div className="container mx-auto">
        <div className="absolute bg-white text-black p-4 rounded-md shadow-lg border w-[15vw] ml-24" style={{marginTop:'-2vh'}}>
          <ul>
            <li className="p-2 hover:bg-gray-100">Category 1</li>
            <li className="p-2 hover:bg-gray-100">Category 2</li>
            <li className="p-2 hover:bg-gray-100">Category 3</li>
          </ul>
        </div>
      </div>
      
    )}
    </>
  );
};

export default Header;
