import React, { useEffect, useState } from 'react';
import { SketchPicker } from 'react-color';


const AddProduct = () => {
  const [activeSection, setActiveSection] = useState('');
  const [isPersonalizationVisible, setIsPersonalizationVisible] = useState(false)
  const [isColorVariation, setisColorVariation] = useState(false);
  const [isSizeVariation, setIsSizeVariation] = useState(false);
  const [isLengthBreadthVariation, setIsLengthBreadthVariation] = useState(false);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colorPicker, setColorPicker] = useState({ color: '#000000', name: '' });
  const [sizeDetail, setSizeDetail] = useState('');
  const [dimensionLength, setDimensionLength] = useState("");
  const [dimensionBreadth, setDimensionBreadth] = useState("");
  const [sizess, setSizess] = useState([]);
  const [isNationalFreeShipping, setIsNationalFreeShipping] = useState(false);
  const [isInternationalFreeShipping, setIsInternationalFreeShipping] = useState(false);
  const [imagePreviews, setImagePreviews] = useState(Array(9).fill(null));
  const [video, setVideo] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);


  const handleScroll = () => {
    const sections = document.querySelectorAll('section');
    let currentSection = '';

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 200 && rect.bottom >= 100) { 
        currentSection = section.id;
      }
    });

    setActiveSection(currentSection);
  };


  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 160;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };


  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);



    const togglePersonalization = () => { 
        setIsPersonalizationVisible(!isPersonalizationVisible)
        };

    const toggleColorVariatioin = () => {
        setisColorVariation(!isColorVariation);
        };
    
    const toggleSizeVariation = () => {
        setIsSizeVariation(!isSizeVariation);
    };

    
        
    const addColor = () => {
        if (colorPicker.color && colorPicker.name) {
            setColors([...colors, { ...colorPicker }]);
            setColorPicker({ color: '#000000', name: '' });
        }
    };
        
    const deleteColor = (index) => {
        setColors(colors.filter((_, i) => i !== index));
    };
        
    
    const toggleLengthBreadthVariation = () => {
        setIsLengthBreadthVariation(!isLengthBreadthVariation);
        setDimensionLength("");
        setDimensionBreadth("");
        setSizes([]);
      };

      
    const addSize = () => {
        if (!dimensionLength || !dimensionBreadth) {
          alert("Both length and breadth are required.");
          return;
        }
    
        // Restrict more than one row
        if (sizess.length > 0) {
            alert("Only one size can be added.");
            return;
        }

        // Add new size
        setSizess([{ length: dimensionLength, breadth: dimensionBreadth }]);
        setDimensionLength("");
        setDimensionBreadth("");
      };
    
      const deleteSize = (index) => {
        const newSizes = sizess.filter((_, i) => i !== index);
        setSizess(newSizes);
      };


      const handleShippingToggle = (e, type) => {
        const isFreeShipping = e.target.value === "true";
        if (type === "national") {
          setIsNationalFreeShipping(isFreeShipping);
        } else if (type === "international") {
          setIsInternationalFreeShipping(isFreeShipping);
        }
      };


      const handleImageChange = (e, index) => {
        const file = e.target.files[0];
        if (file) {
          const newPreviews = [...imagePreviews];
          newPreviews[index] = URL.createObjectURL(file);
          setImagePreviews(newPreviews);
        }
      };
    
      const handleVideoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          setVideo(file);
          setVideoPreview(URL.createObjectURL(file));
        }
      };

      
      const removeImage = (index) => {
        const newPreviews = [...imagePreviews];
        newPreviews[index] = null;
        setImagePreviews(newPreviews);
      };


      const removeVideo = () => {
        setVideo(null);
        setVideoPreview(null);
      };

    
  return (
    <div className="container mx-auto p-6">
      <nav className="sticky top-[5rem] left-0 w-full bg-white shadow z-10">
        <ul className="flex space-x-4 p-4">
          {['section1', 'section2', 'section3', 'section4', 'section5'].map(section => (
            <li key={section}>
              <a
                href={`#${section}`}
                className={`p-2 ${
                  activeSection === section ? 'bg-gray-200' : ''
                }`}
                onClick={(e) => handleSmoothScroll(e, section)}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            </li>
          ))}
        </ul>
        </nav>


      <form action="#" className='mt-6'>
        <section id="section1" className='p-6 bg-white shadow-lg rounded-lg'>
          <h2 className='text-2xl font-bold text-gray-700'>Product Details</h2>
          <p className='text-sm text-gray-600 mt-2'>Describe you product details</p>
          <div className='mt-4'>
            <label htmlFor="title" className="block text-lg font-semibold">Product Title <span className='text-red-600'>*</span></label>
            <span className='text-sm text-gray-600 mt-2'>Include keywords that buyers would use to search for this item.</span>
            <input type="text" id="title" name="title" className="w-full p-3 mt-2 border border-gray-300 rounded-md" />
            <span className='text-red-500 mt-2 text-sm'>message</span>
          </div>

          




          <div className="mt-12">
      <label htmlFor="photos" className="block text-lg font-semibold">
        Photos and Video <span className="text-red-600">*</span>
      </label>
      <span className="text-sm text-gray-600 mt-2">
        Add up to 10 photos and 1 video.
      </span>

      <div className="grid grid-cols-9 gap-4 mt-4">
        {Array.from({ length: 9 }).map((_, index) => (
          <div key={index} className="relative">
            {index === 0 && (
              <span className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 text-xs font-semibold text-gray-700">
                Primary
              </span>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id={`image-${index}`}
              onChange={(e) => handleImageChange(e, index)}
            />
            <label
              htmlFor={`image-${index}`}
              className="w-full h-32 bg-gray-200 rounded-md cursor-pointer flex justify-center items-center"
            >
              {imagePreviews[index] ? (
                <img
                  src={imagePreviews[index]}
                  alt={`Preview ${index}`}
                  className="w-full h-full object-cover rounded-md"
                />
              ) : (
                <span className="text-gray-500">Select Image</span>
              )}
            </label>
            {imagePreviews[index] && (
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 text-white bg-red-500 p-1 rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        ))}
      </div>

     {/* Video Field with Preview */}
     <div className="mt-6">
        <label htmlFor="video" className="block text-lg font-semibold">
          Video
        </label>
        <input
          type="file"
          id="video"
          name="video"
          accept="video/*"
          className="w-full p-3 mt-2 border border-gray-300 rounded-md"
          onChange={handleVideoChange}
        />
        {videoPreview && (
          <div className="mt-4 relative">
            <video
              src={videoPreview}
              alt="Video Preview"
              className="w-full h-auto object-cover rounded-md"
              controls
            />
            <button
              type="button"
              onClick={removeVideo}
              className="absolute top-2 right-2 text-white bg-red-500 p-1 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}
      </div>

      <span className="text-red-500 mt-2 text-sm">message</span>
    </div>


          <div className='mt-12'>
            <label htmlFor="title" className="block text-lg font-semibold">Description <span className='text-red-600'>*</span></label>
            <span className='text-sm text-gray-600 mt-2'>What makes your item special? Buyers will only see the first few lines unless they expand the description.</span>
            <input type="text" id="title" name="title" className="w-full p-3 mt-2 border border-gray-300 rounded-md" />
            <span className='text-red-500 mt-2 text-sm'>message</span>
          </div>

          <div className='mt-12'>
            <label htmlFor="title" className="block text-lg font-semibold">Personalisation</label>
            <div className="flex justify-between">
                <span className='text-sm text-gray-600 mt-2'>Collect personalised information for this listing.</span>
                <button type='button' onClick={togglePersonalization} className='bg-white border-gray-800 border-2 py-2 px-4 font-bold text-base rounded-full hover:bg-gray-800 hover:text-gray-100 ease-in-out duration-900'>
                    Add Personalization
                </button>
            </div>
          </div>

          {isPersonalizationVisible && ( 
            <div className="mt-12"> 
                <label htmlFor="title" className="block text-lg font-semibold"> 
                    Character limit for buyer response 
                <span className="text-red-600">*</span> </label> 
                <span className="text-sm text-gray-600 mt-2 block"> Enter number between 1 and 1024 </span> 
                <input type="number" id="title" name="title" className="block w-[10rem] p-3 mt-2 border border-gray-300 rounded-md" /> 
            </div> 
        )}
        </section>



        <section id="section2" className='p-6 bg-white shadow-lg rounded-lg mt-12'>
          <h2 className='text-2xl font-bold text-gray-700'>Price & Inventory</h2>
          <p className='text-sm text-gray-600 mt-2'>Set a price for your item and indicate how many are available for sale.</p>

          <div className='mt-4'>
            <label htmlFor="title" className="block text-lg font-semibold">Price ($USD) <span className='text-red-600'>*</span></label>
            <input type="number" id="title" name="title" className="block w-[20rem] p-3 mt-2 border border-gray-300 rounded-md" /> 
            <span className='text-red-500 mt-2 text-sm'>* Price must be a positive number.</span>
          </div>

          <div className='mt-4'>
            <label htmlFor="title" className="block text-lg font-semibold">Quantity<span className='text-red-600'>*</span></label>
            <input type="number" id="title" name="title" className="block w-[20rem] p-3 mt-2 border border-gray-300 rounded-md" /> 
            <span className='text-red-500 mt-2 text-sm'>* Enter a quantity between 1 and 999.</span>
          </div>

          <div className='mt-4'>
            <label htmlFor="title" className="block text-lg font-semibold">SKU</label>
            <input type="text" id="title" name="title" className="block w-[20rem] p-3 mt-2 border border-gray-300 rounded-md" /> 
            <span className='text-gray-500 mt-2 text-sm'>0/32</span>
          </div>
        </section>



        <section id="section3" className="p-6 bg-white shadow-lg rounded-lg mt-12">
            <h2 className="text-2xl font-bold text-gray-700">Variations Details</h2>
            <div className="flex justify-between items-center mt-4">
                <p className="text-sm text-gray-600">
                Share a few more specifics about your item to make it easier to find in search, and to help buyers know what to expect.
                </p>
            </div>

            <div className="mt-4">
                <div className="flex">
                <label htmlFor="title" className="block text-lg font-semibold mr-4">Color Variations</label>   
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        className="toggle-checkbox hidden"
                        checked={isColorVariation}
                        onChange={toggleColorVariatioin}
                    />
                    <div className={`toggle-switch w-12 h-6 rounded-full shadow-inner ${isColorVariation ? 'bg-green-500' : 'bg-gray-300'}`}>
                        <div
                        className={`toggle-dot w-6 h-6 bg-white rounded-full shadow-lg transform duration-300 ease-in-out ${
                            isColorVariation ? 'translate-x-6 bg-green-500' : ''
                        }`}
                        ></div>
                    </div>
                </label>
                </div>
                <span className='text-sm text-gray-600'>You can add color variations with enabling it.</span>
            </div>

            {isColorVariation && (
                <>
                {/* Colors Section */}
                <div className="mt-6">
                    <h3 className="text-lg font-semibold">Colors Details</h3>
                    <div className="flex items-center gap-4 mt-4">
                    <SketchPicker
                        color={colorPicker.color}
                        onChange={(color) => setColorPicker({ ...colorPicker, color: color.hex })}
                    />
                    <input
                        type="text"
                        placeholder="Color Label"
                        value={colorPicker.name}
                        onChange={(e) => setColorPicker({ ...colorPicker, name: e.target.value })}
                        className="border rounded px-4 py-2 w-1/2"
                    />
                    <button
                        type="button"
                        onClick={addColor}
                        className="bg-white border-gray-800 border-2 py-2 px-4 font-bold text-base rounded-full hover:bg-gray-800 hover:text-gray-100 ease-in-out duration-900"
                    >
                        Add Color
                    </button>
                    </div>
                    <table className="w-full mt-4 border-collapse border border-gray-300">
                    <thead>
                        <tr>
                        <th className="border border-gray-300 px-4 py-2">Color</th>
                        <th className="border border-gray-300 px-4 py-2">Color Code (#Hex)</th>
                        <th className="border border-gray-300 px-4 py-2">Label</th>
                        <th className="border border-gray-300 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {colors.map((color, index) => (
                        <tr key={index}>
                            <td className="border border-gray-300 px-4 py-2">
                            <div
                                className="w-6 h-6 rounded mx-auto"
                                style={{ backgroundColor: color.color }}
                            ></div>
                            </td>
                            <td className="border border-gray-300 px-4 py-2 text-center">{color.color}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">{color.name}</td>
                            <td className="border border-gray-300 px-4 py-2">
                            <button
                                type="button"
                                onClick={() => deleteColor(index)}
                                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
                </>
            )}


            <div className="mt-4">
                <div className="flex">
                <label htmlFor="title" className="block text-lg font-semibold mr-4">Size Variation</label>   
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        className="toggle-checkbox hidden"
                        checked={isSizeVariation}
                        onChange={toggleSizeVariation}
                    />
                    <div className={`toggle-switch w-12 h-6 rounded-full shadow-inner ${isSizeVariation ? 'bg-green-500' : 'bg-gray-300'}`}>
                        <div
                        className={`toggle-dot w-6 h-6 bg-white rounded-full shadow-lg transform duration-300 ease-in-out ${
                            isSizeVariation ? 'translate-x-6 bg-green-500' : ''
                        }`}
                        ></div>
                    </div>
                </label>
                </div>
                <span className='text-sm text-gray-600'>You can add size variations with enabling it.</span>
            </div>

            {isSizeVariation && (
                <div className="mt-6">
                    <h3 className="text-lg font-semibold">Size Details</h3>
                    <div className="flex items-center gap-4 mt-4">
                    <input
                        type="text"
                        placeholder="Size Detail"
                        value={sizeDetail}
                        onChange={(e) => setSizeDetail(e.target.value)}
                        className="border rounded px-4 py-2 w-1/2"
                    />
                    <button
                        type="button"
                        onClick={addSize}
                        className="bg-white border-gray-800 border-2 py-2 px-4 font-bold text-base rounded-full hover:bg-gray-800 hover:text-gray-100 ease-in-out duration-900"
                    >
                        Add Size
                    </button>
                    </div>
                    <table className="w-full mt-4 border-collapse border border-gray-300">
                    <thead>
                        <tr>
                        <th className="border border-gray-300 px-4 py-2">Size</th>
                        <th className="border border-gray-300 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sizes.map((size, index) => (
                        <tr key={index}>
                            <td className="border border-gray-300 px-4 py-2">{size}</td>
                            <td className="border border-gray-300 px-4 py-2">
                            <button
                                type="button"
                                onClick={() => deleteSize(index)}
                                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
            )}

            <div className="mt-4">
                <div className="flex">
                <label htmlFor="title" className="block text-lg font-semibold mr-4">Length and Breadth Variations</label>   
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        className="toggle-checkbox hidden"
                        checked={isLengthBreadthVariation}
                        onChange={toggleLengthBreadthVariation}
                    />
                    <div className={`toggle-switch w-12 h-6 rounded-full shadow-inner ${isLengthBreadthVariation ? 'bg-green-500' : 'bg-gray-300'}`}>
                        <div
                        className={`toggle-dot w-6 h-6 bg-white rounded-full shadow-lg transform duration-300 ease-in-out ${
                            isLengthBreadthVariation ? 'translate-x-6 bg-green-500' : ''
                        }`}
                        ></div>
                    </div>
                </label>
                </div>
                <span className='text-sm text-gray-600'>You can add product dimensions enabling it.</span>
            </div>

            {isLengthBreadthVariation && (
                <div className="mt-6">
                <h3 className="text-lg font-semibold">Product dimention details</h3>
                <div className="flex items-center gap-4 mt-4">
                  <input
                    type="text"
                    placeholder="Product length in cm"
                    value={dimensionLength}
                    onChange={(e) => setDimensionLength(e.target.value)}
                    className="border rounded px-4 py-2 w-[20rem]"
                  />
                  <input
                    type="text"
                    placeholder="Product breadth in cm"
                    value={dimensionBreadth}
                    onChange={(e) => setDimensionBreadth(e.target.value)}
                    className="border rounded px-4 py-2 w-[20rem]"
                  />
                  <button
                    type="button"
                    onClick={addSize}
                    className="bg-white border-gray-800 border-2 py-2 px-4 font-bold text-base rounded-full hover:bg-gray-800 hover:text-gray-100 ease-in-out duration-900"
                  >
                    Add Size
                  </button>
                </div>
                <table className="w-full mt-4 border-collapse border border-gray-300">
                  <thead>
                    <tr>
                      <th className="border border-gray-300 px-4 py-2">Length (cm)</th>
                      <th className="border border-gray-300 px-4 py-2">Breadth (cm)</th>
                      <th className="border border-gray-300 px-4 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sizess.map((size, index) => (
                      <tr key={index}>
                        <td className="border border-gray-300 px-4 py-2">{size.length}</td>
                        <td className="border border-gray-300 px-4 py-2">{size.breadth}</td>
                        <td className="border border-gray-300 px-4 py-2">
                          <button
                            type="button"
                            onClick={() => deleteSize(index)}
                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className='mt-4'>
                <label htmlFor="brand" className="block text-lg font-semibold">Product Brand Name</label>
                <span className='text-gray-500 mt-2 text-sm'>Enter the product brand name here.</span>
                <input type="text" id="title" name="title" className="block w-[30%] p-3 mt-2 border border-gray-300 rounded-md" /> 
            </div>
            <div className='mt-4'>
                <label htmlFor="product_weight" className="block text-lg font-semibold">Product Weight</label>
                <span className='text-gray-500 mt-2 text-sm'>Enter the product weight in gram.</span>
                <input type="text" id="title" name="title" className="block w-[25%] p-3 mt-2 border border-gray-300 rounded-md" /> 
            </div>

            <div className='mt-4'>
                <label htmlFor="tags" className="block text-lg font-semibold">Tags</label>
                <span className='text-gray-500 mt-2 text-sm'>Add up to 13 tags to help people search for your listings.</span>
                <input type="text" id="title" name="title" className="block w-[30%] p-3 mt-2 border border-gray-300 rounded-md" /> 
            </div>

            <div className='mt-4'>
                <label htmlFor="materials" className="block text-lg font-semibold">Materials</label>
                <span className='text-gray-500 mt-2 text-sm'>Buyers value transparency – tell them what’s used to make your item.</span>
                <input type="text" id="title" name="title" className="block w-[30%] p-3 mt-2 border border-gray-300 rounded-md" /> 
            </div>
            <div className='mt-4'>
                <label htmlFor="category" className="block text-lg font-semibold">Category</label>
                <input type="text" id="title" name="title" className="block w-[30%] p-3 mt-2 border border-gray-300 rounded-md" /> 
            </div>
            </section>
            <section id="section4" className="p-6 bg-white shadow-lg rounded-lg mt-12">
                <h2 className="text-2xl font-bold text-gray-700">Shipping & Return Settings</h2>

                {/* Shopping Origin Section */}
                <div className="mt-4 border-gray-200 border p-4 rounded-lg shadow-lg">
                    <h3 className="text-lg font-bold text-gray-700 mb-4">Shipping Inside the Country</h3>

                    <label htmlFor="processingTime" className="block text-lg font-medium mb-2 text-gray-700">
                        Processing Time
                    </label>
                    <input type="text" id="processingTime" name="processingTime" defaultValue="2-3 days" className="w-[40%] mt-2 p-3 border border-gray-300 rounded-md"/>

                    <div className="mt-4 ">
                        <label className="block text-lg font-medium mb-2 text-gray-700">Free Shipping</label>
                        <div className="flex items-center gap-4 mt-2">
                        <label className="flex items-center">
                            <input type="radio" name="nationalFreeShipping" value="true" className="mr-2" onChange={(e) => handleShippingToggle(e, "national")} />Yes
                        </label>
                        <label className="flex items-center"> 
                            <input type="radio" name="nationalFreeShipping" value="false" className="mr-2" defaultChecked onChange={(e) => handleShippingToggle(e, "national")} />No
                        </label>
                        </div>
                    </div>

                    <div className="mt-4">
                        <label htmlFor="nationalFixedShippingCost" className="block text-lg font-medium text-gray-700">
                        Fixed Shipping Cost ($ USD)
                        </label>
                        <input type="number" id="nationalFixedShippingCost" name="nationalFixedShippingCost" defaultValue="20" className="w-[20%] mt-2 p-3 border border-gray-300 rounded-md" disabled={isNationalFreeShipping}/>
                    </div>
                </div>

                <div className="mt-4 border-gray-200 border p-4 rounded-lg shadow-lg">
                    <h3 className="text-lg font-bold text-gray-700 mb-4">International Shipping</h3>
                    <label htmlFor="processingTime" className="block text-lg font-medium text-gray-700">
                        Processing Time
                    </label>
                    <input type="text" id="internationalProcessingTime" name="internationalProcessingTime" defaultValue="5-7 days" className="w-[40%] mt-2 p-3 border border-gray-300 rounded-md"/>
                    <div className="mt-4">
                        <label className="block text-lg font-medium mb-2 text-gray-700">Free Shipping</label>
                        <div className="flex items-center gap-4 mt-2">
                        <label className="flex items-center">
                            <input type="radio" name="internationalFreeShipping" value="true" className="mr-2" onChange={(e) => handleShippingToggle(e, "international")} />Yes
                        </label>
                        <label className="flex items-center">
                            <input type="radio" name="internationalFreeShipping" value="false" className="mr-2" defaultChecked onChange={(e) => handleShippingToggle(e, "international")}/> No
                        </label>
                        </div>
                    </div>
                        <div className="mt-4">
                            <label htmlFor="internationalFixedShippingCost" className="block text-lg font-medium text-gray-700">
                            Fixed Shipping Cost
                            </label>
                            <input type="number" id="internationalFixedShippingCost" name="internationalFixedShippingCost" defaultValue="50" className="w-[20%] mt-2 p-3 border border-gray-300 rounded-md" disabled={isInternationalFreeShipping}/>
                        </div>
                    </div>
            </section>


            <section id="section5" className="p-6 bg-white shadow-lg rounded-lg mt-12">
                <h2 className="text-2xl font-bold text-gray-700">Settings</h2>

                <div className="mt-4">
                    <label
                    htmlFor="returnandexchange"
                    className="block text-lg font-semibold mb-2"
                    >
                    Return and Exchange
                    </label>
                    <div
                    id="returnandexchange"
                    className="p-4 border border-gray-300 rounded-md"
                    >
                    <h3 className="font-semibold">Returns and Exchanges 30 days</h3>
                    <div className="flex items-center justify-between">
                        <p className="mt-2 text-gray-600">
                            Buyer is responsible for return postage costs and any loss in value if
                            an item isn't returned in original condition.
                        </p>
                        <button type="button" className="bg-white border-gray-800 border-2 py-2 px-4 font-bold text-base rounded-full hover:bg-gray-800 hover:text-gray-100 ease-in-out duration-900">
                            Change Policy
                        </button>
                    </div>
                    
                    
                    </div>
                </div>

                <div className="mt-8">
                    <label htmlFor="renewal" className="block text-lg font-semibold mb-2">
                    Renewal Option
                    </label>
                    <div className="flex items-center gap-4">
                    <label className="flex items-center">
                        <input
                        type="radio"
                        name="renewal"
                        value="automatic"
                        className="mr-2"
                        />
                        Automatic
                    </label>
                    <label className="flex items-center">
                        <input type="radio" name="renewal" value="manual" className="mr-2" />
                        Manual
                    </label>
                    </div>
                </div>
            </section>

      </form>
    </div>
  );
};

export default AddProduct;
