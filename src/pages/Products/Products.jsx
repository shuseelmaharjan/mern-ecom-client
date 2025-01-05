import React, { useState, useEffect } from 'react';
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import productService from '../../services/productService/productService';
import { useAuth } from '../../context/AuthContext';

const Products = () => {
  const [viewType, setViewType] = useState('grid');

  const [products, setProducts] = useState('');

  const { accessToken } = useAuth();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await productService.getVendorsProduct(accessToken);
        setProducts(data.products);
        console.log(data.products);
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, [accessToken]);


  return (
    <div className="flex flex-col md:flex-row p-4 bg-white text-gray-800">
      <div className="w-full md:w-3/4 p-4">
        <h2 className="text-xl font-semibold mb-4">Product List</h2>
        {/* <div className={`grid ${viewType === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4' : ''}`}>
          {products.map((product) => (
            <div key={product.id} className="p-4 border border-gray-300 rounded bg-gray-100">
              {product.name}
            </div>
          ))}
        </div> */}
        {/* {viewType === 'list' && (
          <ul>
            {products.map((product) => (
              <li key={product.id} className="p-2 border-b border-gray-300">
                {product.name}
              </li>
            ))}
          </ul>
        )} */}
      </div>

      {/* Right Column */}
      <div className="w-full md:w-1/4 p-4 bg-gray-50 border-l border-gray-300">
        <Link to="/listing/create-product" className="w-full flex justify-between items-center mb-4 py-2 px-4 bg-black text-white font-bold">
          <span className='items-center flex mx-auto'>
            <FaPlus/> <span>Add Product</span>
          </span>
        </Link>
        {/* <div className="flex items-center mb-4">
          <button className="py-2 px-4 bg-black text-white rounded mr-2">
            Stats Toggle
          </button>
          <button
            onClick={() => setViewType('grid')}
            className={`py-2 px-4 rounded ${viewType === 'grid' ? 'bg-gray-800 text-white' : 'bg-black'} mr-2`}
          >
            Grid View
          </button>
          <button
            onClick={() => setViewType('list')}
            className={`py-2 px-4 rounded ${viewType === 'list' ? 'bg-gray-800 text-white' : 'bg-black'}`}
          >
            List View
          </button>
        </div> */}
        <div className="mb-4">
          <label htmlFor="sort" className="block text-gray-600 mb-2">Sort By</label>
          <select
            id="sort"
            className="w-full py-2 px-4 bg-gray-100 border border-gray-300 text-gray-800 rounded"
          >
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>
        </div>
        <div>
          <h3 className="text-gray-600 mb-2">Listing Status</h3>
          <p className="text-gray-800">Active</p>
        </div>
      </div>
    </div>
  );
};

export default Products;
