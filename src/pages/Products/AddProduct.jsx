import React, { useEffect, useState, useRef } from 'react';
import { SketchPicker } from 'react-color';
import { FaInfoCircle } from "react-icons/fa";
import { PiWarningCircleFill } from "react-icons/pi";
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { FaPlus, FaPlay, FaPause, FaTrash } from 'react-icons/fa';
import { capitalizeWords } from '../../utils/textUtils';



const AddProduct = () => {
  const [activeSection, setActiveSection] = useState('');
  const [isPersonalizationVisible, setIsPersonalizationVisible] = useState(false)
  const [isColorVariation, setisColorVariation] = useState(false);
  const [isSizeVariation, setIsSizeVariation] = useState(false);
  const [colors, setColors] = useState([]);
  const [colorPicker, setColorPicker] = useState({ color: '#000000', name: '' });
  const [isError, setIsError] = useState(false);
  const [title, settitle] = useState('');
  const [description, setDescription] = useState('');
  const [productLimit, setProductLimit] = useState(0);


  



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
        console.log('Updated Colors:', JSON.stringify([...colors, { ...colorPicker }], null, 2)); 
      }
    };
  
    const deleteColor = (index) => {
      const updatedColors = colors.filter((_, i) => i !== index);
      setColors(updatedColors);
      console.log('Updated Colors After Deletion:', JSON.stringify(updatedColors, null, 2)); 
    };
        



      // for media validation
      const [imageFiles, setImageFiles] = useState(Array(9).fill(null));
      const [videoFile, setVideoFile] = useState(null);
      const [isPlaying, setIsPlaying] = useState(false);
      const videoRef = useRef(null);
      const videoInputRef = useRef(null);


      const handleImageChange = (e, index) => {
        const file = e.target.files[0];
        if (file) {
          if (file.size > 1 * 1024 * 1024) { 
            alert("Image size should be less than 1MB.");
            return;
          }
    
          const newPreviews = [...imageFiles];
          newPreviews[index] = URL.createObjectURL(file);
          setImageFiles(newPreviews);
        }
      };
    
      const handleVideoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const videoUrl = URL.createObjectURL(file);
          setVideoFile(videoUrl);
        }
      };
    
      const handlePlayPause = () => {
        if (videoRef.current) {
          if (isPlaying) {
            videoRef.current.pause();
          } else {
            videoRef.current.play();
          }
          setIsPlaying(!isPlaying);
        }
      };
    
      const removeVideo = () => {
        setVideoFile(null);
        setIsPlaying(false);
      };
    
      const removeImage = (index) => {
        const newPreviews = [...imageFiles];
        newPreviews[index] = null;
        setImageFiles(newPreviews);
      };
    
    
      const handleBlur = (e) => {
        if (!e.target.value.trim()) {
          setIsError(true);
        }
      };

      const handleTitleChange = (e) => {
        const value = e.target.value;
        if (value.length <= 140) {
          settitle(value);
          setIsError(false); 
        } else {
          setIsError(true); 
        }
      };

      const handleDescriptionChange = (value) => {
        setDescription(value);
    
        if (value.length > 1400) {
          setIsError(true);
        } else {
          setIsError(false);
        }
      };


      const handleProductLimitChange = (e) => {
        setProductLimit(e.target.value);
      }; 


      const [productPrice, setProductPrice] = useState('');
      const [priceError, setPriceError] = useState(false);


      const handlePriceChange = (e) => {

        const value = e.target.value;
    
        setProductPrice(value);
    
        if (!/^\d+$/.test(value) || parseInt(value, 10) <= 0) {
            setPriceError(true);
        } else {
            setPriceError(false); 
            setProductPrice(value);
        }
      };


      const [productQuantity, setProductQuantity] = useState('');
      const [quantityError, setQuantityError] = useState(false);

      const handleProductQuantityChange = (e) => {
        const value = e.target.value;

        setProductQuantity(value);

        if(value <= 1 || value>=999){
          setQuantityError(true);
        }else{
          setQuantityError(false);
          setProductQuantity(value);
        }
      }

      const [skuData, setSkuData] = useState('');
      const [skuError, setSkuError] = useState(false);

      const handleSkuValueChange = (e) => {
        const value = e.target.value;
        setSkuData(value); 

        if (value.length > 32) { 
          setSkuError(true);
        } else {
          setSkuError(false);
        }
      };


      const [productSizeDetails, setProductSizeDetails] = useState('');
      const [productSize, setProductSize] = useState([]);

      const addSize = () => {
        if (productSizeDetails.trim() !== '') {
          setProductSize([...productSize, productSizeDetails.trim()]);
          setProductSizeDetails('');
        } else {
          alert('Size detail cannot be empty.');
        }
      };

      const deleteSize = (index) => {
        setProductSize(productSize.filter((_, i) => i !== index));
      };


      const [isLengthBreadthVariation, setIsLengthBreadthVariation] = useState(false);

      const toggleLengthBreadthVariation = () => {
          setIsLengthBreadthVariation(!isLengthBreadthVariation);
        };
      


      const [dimensionLength, setDimensionLength] = useState("");
      const [dimensionBreadth, setDimensionBreadth] = useState("");
      const [dimension, setDimension] = useState(null);


      const addDimension = () => {
        if (dimensionLength.trim() !== "" && dimensionBreadth.trim() !== "") {
          setDimension({ length: dimensionLength.trim(), breadth: dimensionBreadth.trim() });
          setDimensionLength("");
          setDimensionBreadth("");
        } else {
          alert("Both fields are required!");
        }
      };
    
      const deleteDimension = () => {
        setDimension(null);
      };


      const [productBrand, setProductBrand] = useState('');
      const [productWeight, setProductWeight] = useState('');


      const [tagInput, setTagInput] = useState("");
      const [tags, setTags] = useState([]);

      const addTag = () => {
        if (tagInput.trim() === "") {
          alert("Tag cannot be empty.");
          return;
        }

        if (tags.length >= 13) {
          alert("You can add up to 13 tags only.");
          return;
        }

        if (tags.includes(tagInput.trim())) {
          alert("Duplicate tag. Tags must be unique.");
          return;
        }

        setTags([...tags, tagInput.trim()]);
        setTagInput("");
      };

      const deleteTag = (index) => {
        setTags(tags.filter((_, i) => i !== index));
      };


      const [productMaterial, setProductMaterial]= useState('');
      const [domesticShippingTIme, setDomesticShippingTime] = useState('');
      const [domesticShippingCost, setDomesticShippingCost] = useState('');
      const [domesticFreeShipping, setDomesticFreeShipping] = useState(false);


      const handleShippingToggle = (e, type) => {
        if (type === "national") {
          setDomesticFreeShipping(e.target.value === "true");
        }
      };


      const [isNationalFreeShipping] = useState(false);
      const [isInternationalFreeShipping] = useState(false);

      const [internationalShippingTime, setInternationalShippingTime] = useState('');
      const [internationalFreeShipping, setInternationalFreeShipping] = useState(false);
      const [internationalShippingCost, setInternationalShippingCost] = useState(false);

      const handleInternationalShippingToggle = (e, type) => {
        if(type === "international"){
          setInternationalFreeShipping(e.target.value==='true');
        }
      }

      const [renewalOption, setRenewalOption] = useState("automatic");
      const [expirationDate, setExpirationDate] = useState("");

      const handleRenewalChange = (e) => {
        const selectedOption = e.target.value;
        setRenewalOption(selectedOption);
    
        if (selectedOption === "automatic") {
          setExpirationDate("automatic");
        } else if (selectedOption === "manual") {
          const date = new Date();
          date.setMonth(date.getMonth() + 3);
          setExpirationDate(date.toISOString().split("T")[0]);
        }
      };



      const handleSubmit = (e) => {
        e.preventDefault();
    
        const formData = {
          title,
          description,
          ispersonalization: isPersonalizationVisible,
          productLimit,
          productPrice,
          productQuantity,
          sku: skuData,
          enableColorVariation: isColorVariation,
          colors,
          productSize,
          dimension,
          productBrand,
          productWeight,
          tags,
          productMaterial,
          domesticShippingTIme,
          domesticShippingCost,
          domesticFreeShipping,
          internationalShippingTime,
          internationalFreeShipping,
          internationalShippingCost,
          expirationDate,
          images: imageFiles.map((file) => (file ? file.name : null)).filter(Boolean), 
          video: videoFile ? videoFile.name : null,
        };
    
        console.log('Form Data in JSON:', JSON.stringify(formData, null, 2)); 
      };
    
    

  return (
    <div className="container mx-auto p-6">
      <nav className="sticky top-[5rem] left-0 w-full bg-white shadow z-10">
        <ul className="flex space-x-4 p-4">
          {['Product Details', 'Price & Inventory', 'Variations Details', 'Shipping & Return', 'Settings'].map(section => (
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


      <form onSubmit={handleSubmit} className='mt-6'>
        <section id="Product Details" className='p-6 bg-white shadow-lg rounded-lg'>
          


          <h2 className='text-2xl font-bold text-gray-700'>Product Details</h2>
          <p className='text-sm text-gray-600 mt-2'>Describe you product details</p>
          


          {/* Product Title */}
          <div className='mt-4'>
            <label htmlFor="title" className="block text-lg font-semibold">
              <div className="flex items-center space-x-1">
                <span className='text-gray-700'>Product Title</span>
                <span className='text-red-600'>*</span>
                <div className="relative group">
                  <FaInfoCircle className="cursor-pointer text-gray-700 hover:text-gray-800" />
                  <div className="absolute hidden group-hover:block bg-gray-900 text-white text-sm rounded-md p-4 left-0 mt-2 w-64 z-10 shadow-lg">
                    <div className="before:absolute before:top-[-8px] before:left-6 before:border-8 before:border-transparent before:border-b-gray-900"></div>
                    <h3 className="font-bold text-lg mb-2">Product Title Tips</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Include relevant keywords buyers might search for.</li>
                      <li>Keep it concise but descriptive (max 70 characters).</li>
                      <li>Mention key attributes like brand, model, or color.</li>
                      <li>Avoid unnecessary words or excessive punctuation.</li>
                    </ul>
                    {/* <p className="mt-3 text-gray-300 text-xs">
                      Example: "Wireless Noise-Cancelling Over-Ear Headphones - Black"
                    </p> */}
                  </div>
                </div>
              </div>
            </label>
            <span className='text-sm text-gray-600 mt-2'>Include keywords that buyers would use to search for this item.</span>
            <input type="text" id="title" name="title" placeholder='Enter a product title here' value={title} className={`w-full p-3 mt-2 border rounded-md text-gray-700 ${
                isError ? 'border-red-700 bg-red-100 placeholder:text-red-400' : 'border-gray-300'}`}
              onBlur={handleBlur} onFocus={() => setIsError(false)} onChange={handleTitleChange} required
            />
            <div className="flex mt-2 justify-between">
              {isError && (
                <span className='text-red-500 text-base font-medium flex items-center'>
                  <PiWarningCircleFill className='mr-1 text-xl'/>
                  {title.length > 140
                    ?'Product title cannot exceed 140 characters.'
                    :'This field is required.'}
                </span>
              )}
              <span className={`ml-auto text-base  ${title.length > 140 ? 'text-red-500' : 'text-gray-700'}`}>
                {title.length}/140
              </span>
            </div>
          </div>


          



          {/* Product Media */}
          <div className="mt-12">
            <label htmlFor="media" className="block text-lg font-semibold">
              <div className="flex items-center space-x-1">
                <span className='text-gray-700'>Photos and Video</span>
                <span className='text-red-600'>*</span>
                <div className="relative group">
                  <FaInfoCircle className="cursor-pointer text-gray-700 hover:text-gray-800" />
                  <div className="absolute hidden group-hover:block bg-gray-800 text-white text-sm rounded-md p-4 left-0 mt-2 w-64 z-10 shadow-lg">
                    <div className="before:absolute before:top-[-8px] before:left-4 before:border-8 before:border-transparent before:border-b-gray-800">
                      <h3 className="font-bold mb-2 text-lg">Photo Requirements</h3>
                      <ul className="list-disc pl-5 mb-4">
                        <li>Use a JPG, GIF, or PNG.</li>
                        <li>The recommended size is 2000px for the shortest side, and a resolution of 72DPI.</li>
                        <li>Keep it under 1MB for faster uploading.</li>
                      </ul>
                      <h3 className="font-bold mb-2 text-lg">Listing Videos</h3>
                      <ul className="list-disc pl-5">
                        <li>Most file types are accepted.</li>
                        <li>Max file size is 100MB.</li>
                        <li>Can be 3-15 seconds long. If you upload a longer video (up to 60 seconds), we'll automatically trim it to the first 15 seconds.</li>
                        <li>Keep in mind, your video won't include audio.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </label>
            <span className='text-sm text-gray-600 mt-2'>Add up to 10 photos and 1 video.</span>

            {/* Image Inputs */}
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
                    {imageFiles[index] ? (
                      <img
                        src={imageFiles[index]}
                        alt={`Preview ${index}`}
                        className="w-full h-full object-cover rounded-md"
                      />
                    ) : (
                      <span className="text-gray-500">Select Image</span>
                    )}
                  </label>
                  {imageFiles[index] && (
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 text-white bg-red-500 p-2 rounded-full"
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Video Field with Thumbnail */}
            <div className="mt-6">

                <input
                  type="file"
                  id="video"
                  name="video"
                  accept="video/*"
                  className="hidden"
                  ref={videoInputRef}
                  onChange={handleVideoChange}
                />

                {/* Video selection button */}
                {!videoFile ? (
                  <button
                    type="button"
                    onClick={() => videoInputRef.current.click()}
                    className="w-36 h-32 p-3 mt-2 border border-gray-300 rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300"
                  >
                    Select Video
                  </button>
                ) : (
                  <div className="mt-4 relative">
                    <video
                      ref={videoRef}
                      src={videoFile}
                      className="w-36 h-auto object-cover rounded-md"
                      controls={false} 
                      onPause={() => setIsPlaying(false)}
                      onPlay={() => setIsPlaying(true)}
                    />

                    <div className="absolute w-32 justify-between bottom-2 left-2 flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={handlePlayPause}
                        className="text-white bg-black p-2 rounded-full"
                      >
                        {isPlaying ? <FaPause /> : <FaPlay />}
                      </button>
                      <button
                        type="button"
                        onClick={removeVideo}
                        className="text-white bg-red-500 p-2 rounded-full"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                )}
              </div>
          </div>


          <div className="mt-12">
            <label htmlFor="description" className="block text-lg font-semibold">
            <div className="flex items-center space-x-1">
                <span className='text-gray-700'>Product Description</span>
                <span className='text-red-600'>*</span>
                <div className="relative group">
                  <FaInfoCircle className="cursor-pointer text-gray-700 hover:text-gray-800" />
                  <div className="absolute hidden group-hover:block bg-gray-900 text-white text-sm rounded-md p-4 left-0 mt-2 w-64 z-10 shadow-lg">
                    <div className="before:absolute before:top-[-8px] before:left-6 before:border-8 before:border-transparent before:border-b-gray-900"></div>
                    <h3 className="font-bold text-lg mb-2">Product Description Tips</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Provide clear and detailed information about the product.</li>
                      <li>Highlight key features and benefits to attract buyers.</li>
                      <li>Use bullet points for easy readability and concise details.</li>
                      <li>Keep it engaging and easy to understand for your audience.</li>
                      <li>Focus on what makes the product unique compared to similar items.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </label>
            <span className="text-sm text-gray-600 mt-2">
              What makes your item special? Buyers will only see the first few lines unless they expand the description.
            </span>

            {/* ReactQuill Editor */}
            <ReactQuill value={description} onChange={handleDescriptionChange} theme="snow" className="mt-2 text-base" 
              modules={{
                  toolbar: [
                    ['bold', 'italic', 'underline', 'strike'],
                    ['blockquote', 'code-block'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    [{ align: [] }],
                    ['link'],
                  ],
                }}
            />
            <div className="flex mt-2 justify-between">
              {isError && (
                <span className='text-red-500 text-base font-medium flex items-center'>
                  <PiWarningCircleFill className='mr-1 text-xl'/>
                  Description cannot exceed 1400 characters.
                </span>
              )}

              <span className={`ml-auto text-base ${description.length > 1400 ? 'text-red-500' : 'text-gray-700'}`}>
                {description.length}/1400
              </span>
            </div>
          </div>

          <div className='mt-12'>
            <label htmlFor="personalization" className="block text-gray-700 text-lg font-semibold">Personalisation</label>
            <div className="flex justify-between">
                <span className='text-sm text-gray-600 mt-2'>Collect personalised information for this listing.</span>
                <button type='button' onClick={togglePersonalization} className='flex items-center bg-white border-gray-800 border-2 py-2 px-4 font-bold text-base rounded-full hover:bg-gray-800 hover:text-gray-100 ease-in-out transition-all duration-300'>
                  <FaPlus className='mr-1'/> Add Personalization
                </button>
            </div>
          </div>

          {isPersonalizationVisible && ( 
            <div className="mt-6"> 
                <label htmlFor="productLimit" className="block text-gray-700 text-lg font-semibold"> 
                    Character limit for buyer response 
                </label> 
                <span className="text-sm text-gray-600 mt-2 block"> Enter number between 1 and 1024 </span> 
                <input type="number" id="productLimit" name="productLimit" value={productLimit} onChange={handleProductLimitChange} className="block w-[10rem] p-3 mt-2 border border-gray-300 rounded-md" /> 
            </div> 
        )}
        </section>



        <section id="Price & Inventory" className='p-6 bg-white shadow-lg rounded-lg mt-12'>
          <h2 className='text-2xl font-bold text-gray-700'>Price & Inventory</h2>
          <p className='text-sm text-gray-600 mt-2'>Set a price for your item and indicate how many are available for sale.</p>

          <div className='mt-12'>
            <label htmlFor="title" className="block text-lg font-semibold">
                <div className="flex items-center space-x-1">
                  <span className='text-gray-700'>Price in ($USD)</span>
                  <span className='text-red-600'>*</span>
                  <div className="relative group">
                    <FaInfoCircle className="cursor-pointer text-gray-700 hover:text-gray-800" />
                    <div className="absolute hidden group-hover:block bg-gray-900 text-white text-sm rounded-md p-4 left-0 mt-2 w-64 z-10 shadow-lg">
                      <div className="before:absolute before:top-[-8px] before:left-6 before:border-8 before:border-transparent before:border-b-gray-900"></div>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>The digit shouldnot contain comma ',' and spaces in between numbers.</li>
                        <li>The price must be positive integer number.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </label>
              <span className='text-sm text-gray-600 block mt-2'>Enter positive integer number</span>
              <input type="number" id="price" name="price" className={`w-[20%] p-3 mt-2 border rounded-md text-gray-700 ${
                  priceError ? 'border-red-700 bg-red-100 placeholder:text-red-400' : 'border-gray-300'}`} onBlur={handleBlur} onFocus={() => setPriceError(false)} onChange={handlePriceChange} required/> 
                  {priceError && (
                    <span className='text-red-500 mt-2 text-base font-medium flex items-center'>
                      <PiWarningCircleFill className='mr-1 text-xl'/>
                      The price should be a positive integer number.
                    </span>
                  )}
          </div>

          <div className='mt-6'>
            <label htmlFor="quantity" className="block text-gray-700 text-lg font-semibold">Quantity<span className='text-red-600'>*</span></label>
            <span className='text-sm text-gray-600 block mt-2'>Enter product quantity from range 1 to 999.</span>
            <input type="number" id="quantity" name="quantity" className={`w-[20%] p-3 mt-2 border rounded-md text-gray-700 ${
                quantityError ? 'border-red-700 bg-red-100 placeholder:text-red-400' : 'border-gray-300'}`}  onBlur={handleBlur} onFocus={() => setQuantityError(false)}  onChange={handleProductQuantityChange} required/> 
              {quantityError && (
                    <span className='text-red-500 mt-2 text-base font-medium flex items-center'>
                      <PiWarningCircleFill className='mr-1 text-xl'/>
                      Enter a quantity between 1 and 999.
                    </span>
                  )}
          </div>

          <div className='mt-6'>
            <label htmlFor="sku" className="block text-gray-700 text-lg font-semibold">
              SKU <span>(Optional)</span>
            </label>
            <span className='text-sm text-gray-600 block mt-2'>Enter Stock Keeping Unit (SKU) up to 32 characters.</span>
            <input
              type="text"
              id="sku"
              name="sku"
              className={`w-[20%] p-3 mt-2 border rounded-md text-gray-700 ${
                skuError ? 'border-red-700 bg-red-100 placeholder:text-red-400' : 'border-gray-300'
              }`}
              onBlur={() => setSkuError(skuData.length > 32)} 
              onFocus={() => setSkuError(false)} 
              onChange={handleSkuValueChange} 
            />
            <div className="flex mt-2 justify-between">
              {skuError && (
                <span className='text-red-500 text-base font-medium flex items-center'>
                  <PiWarningCircleFill className='mr-1 text-xl'/>
                  SKU cannot exceed 32 characters.
                </span>
              )}
              <span className={`ml-auto text-base ${skuData.length > 32 ? 'text-red-500' : 'text-gray-700'}`}>
                {skuData.length || 0}/32
              </span>
            </div>
          </div>

        </section>



        <section id="Variations Details" className="p-6 bg-white shadow-lg rounded-lg mt-12">
            <h2 className="text-2xl font-bold text-gray-700">Variations Details</h2>
            <p className='text-sm text-gray-600 mt-2'>Share a few more specifics about your item to make it easier to find in search, and to help buyers know what to expect.</p>


            <div className="mt-4">
                <div className="flex">
                  <label htmlFor="color_variation" className="block text-gray-700 text-lg font-semibold mr-2">Color Variations</label>   
                  <label className="flex items-center">
                      <input type="checkbox" className="toggle-checkbox hidden" checked={isColorVariation} onChange={toggleColorVariatioin}/>
                      <div className={`toggle-switch w-12 h-6 rounded-full shadow-inner ${isColorVariation ? 'bg-green-500' : 'bg-gray-300'}`}>
                          <div className={`toggle-dot w-6 h-6 bg-white rounded-full shadow-lg transform duration-300 ease-in-out ${
                              isColorVariation ? 'translate-x-6 bg-green-500' : ''}`}>
                          </div>
                      </div>
                  </label>
                </div>
                <span className='text-sm text-gray-600 block mt-2'>You can add color variations enabling it.</span>
            </div>

            {isColorVariation && (
                <>
                  <div className="mt-6">
                    <div className="flex items-center space-x-1">
                    <label htmlFor="sku" className="block text-gray-700 text-lg font-semibold mr-2">Choose Color</label>
                      <div className="relative group">
                        <FaInfoCircle className="cursor-pointer text-gray-700 hover:text-gray-800" />
                        <div className="absolute hidden group-hover:block bg-gray-900 text-white text-sm rounded-md p-4 left-0 mt-2 w-64 z-10 shadow-lg">
                          <div className="before:absolute before:top-[-8px] before:left-6 before:border-8 before:border-transparent before:border-b-gray-900"></div>
                          <h3 className="font-bold text-lg mb-2">Color Tips</h3>
                          <ul className="list-disc pl-5 space-y-1 font-semibold">
                            <li>Choose the color from the color picker then enter the name of the color and submit to add color button to add color.</li>
                            <li>The color you selected and saved will be the product color variant.</li>
                            <li>The color will be saved in a hexadecimal format.</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="block items-center gap-4 mt-4">

                    <SketchPicker color={colorPicker.color} onChange={(color) => setColorPicker({ ...colorPicker, color: color.hex })}/>


                    <label htmlFor="color" className="flex text-gray-700 text-lg font-semibold mt-10">Color Name</label>
                    <div className="flex space-x-2 items-center">
                      <div className="block">
                          <input type="text" placeholder="Enter color name" value={colorPicker.name}
                            onChange={(e) => setColorPicker({ ...colorPicker, name: e.target.value })}
                            className="border rounded px-4 py-2 w-full mt-2"/>
                        </div>
                        <button type="button" onClick={addColor} className="flex items-center bg-white border-gray-800 border-2 py-2 px-4 font-bold text-base rounded-full hover:bg-gray-800 hover:text-gray-100 ease-in-out transition-all duration-300">
                            Add Color
                        </button>
                    </div>
                    <span className='text-sm text-gray-600 block mt-2'>Enter a label name for the color that you have choosen.</span>

                      
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
                        {colors.length > 0 ? (
                          colors.map((color, index) => (
                            <tr key={index}>
                              <td className="border border-gray-300 px-4 py-2">
                                <div className="w-6 h-6 rounded mx-auto" style={{ backgroundColor: color.color }}></div>
                              </td>
                              <td className="border border-gray-300 px-4 py-2 text-center">{color.color}</td>
                              <td className="border border-gray-300 px-4 py-2 text-center">{capitalizeWords(color.name)}</td>
                              <td className="border border-gray-300 px-4 py-2 flex justify-center">
                                <button type="button" onClick={() => deleteColor(index)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 mx-auto">
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={4} className="border border-gray-300 px-4 py-2 text-center text-gray-500">
                              No color have been selected.
                            </td>
                          </tr>
                        )}
                      </tbody>

                    </table>
                </div>
                </>
            )}

            <div className="mt-4">
                <div className="flex">
                  <label htmlFor="color_variation" className="block text-gray-700 text-lg font-semibold mr-2">Size Variations</label>   
                  <label className="flex items-center">
                      <input type="checkbox" className="toggle-checkbox hidden" checked={isSizeVariation} onChange={toggleSizeVariation}/>
                      <div className={`toggle-switch w-12 h-6 rounded-full shadow-inner ${isSizeVariation ? 'bg-green-500' : 'bg-gray-300'}`}>
                          <div className={`toggle-dot w-6 h-6 bg-white rounded-full shadow-lg transform duration-300 ease-in-out ${
                              isSizeVariation ? 'translate-x-6 bg-green-500' : ''}`}>
                          </div>
                      </div>
                  </label>
                </div>
                <span className='text-sm text-gray-600 block mt-2'>You can add size variations enabling it.</span>
            </div>

            {isSizeVariation && (
                <div className="mt-6">
                  <div className="flex items-center space-x-1">
                    <label htmlFor="sku" className="block text-gray-700 text-lg font-semibold mr-2">Size Details</label>
                      <div className="relative group">
                        <FaInfoCircle className="cursor-pointer text-gray-700 hover:text-gray-800" />
                        <div className="absolute hidden group-hover:block bg-gray-900 text-white text-sm rounded-md p-4 left-0 mt-2 w-64 z-10 shadow-lg">
                          <div className="before:absolute before:top-[-8px] before:left-6 before:border-8 before:border-transparent before:border-b-gray-900"></div>
                          <h3 className="font-bold text-lg mb-2">Size Details</h3>
                          <ul className="list-disc pl-5 space-y-1 font-semibold">
                            <li>You can add your product size that you have available from here, it is a size attribute of a product</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <label htmlFor="productsize" className="flex text-gray-700 text-lg font-semibold mt-10">Product Size</label>

                    <div className="flex items-center gap-4 mt-4">
                    <input type="text" placeholder="Size Detail" value={productSizeDetails} onChange={(e) => setProductSizeDetails(e.target.value)} className="border rounded px-4 py-2 w-1/2"/>
                    <button type="button" onClick={addSize} className="flex items-center bg-white border-gray-800 border-2 py-2 px-4 font-bold text-base rounded-full hover:bg-gray-800 hover:text-gray-100 ease-in-out transition-all duration-300">
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
                      {productSize.length > 0 ? (
                        productSize.map((size, index)  => (
                        <tr key={index}>
                            <td className="border border-gray-300 px-4 py-2 text-center">{size}</td>
                            <td className="border border-gray-300 px-4 py-2 flex justify-center">
                            <button type="button" onClick={() => deleteSize(index)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
                                Delete
                            </button>
                            </td>
                        </tr>
                        )) ): (
                          <tr>
                            <td colSpan={4} className="border border-gray-300 px-4 py-2 text-center text-gray-500">
                              No color have been selected.
                            </td>
                          </tr>
                        )}
                        
                    </tbody>
                    </table>
                </div>
            )}

            <div className="mt-4">
                <div className="flex">
                  <label htmlFor="color_variation" className="block text-gray-700 text-lg font-semibold mr-2">Dimension Variations</label>   
                  <label className="flex items-center">
                      <input type="checkbox" className="toggle-checkbox hidden" checked={isLengthBreadthVariation} onChange={toggleLengthBreadthVariation}/>
                      <div className={`toggle-switch w-12 h-6 rounded-full shadow-inner ${isLengthBreadthVariation ? 'bg-green-500' : 'bg-gray-300'}`}>
                          <div className={`toggle-dot w-6 h-6 bg-white rounded-full shadow-lg transform duration-300 ease-in-out ${
                              isLengthBreadthVariation ? 'translate-x-6 bg-green-500' : ''}`}>
                          </div>
                      </div>
                  </label>
                </div>
                <span className='text-sm text-gray-600 block mt-2'>You can add product dimensions enabling it.</span>
            </div>

            {isLengthBreadthVariation && (
                <div className="mt-6">
                  <div className="flex items-center space-x-1">
                    <label htmlFor="sku" className="block text-gray-700 text-lg font-semibold mr-2">Product Dimensions Details</label>
                      <div className="relative group">
                        <FaInfoCircle className="cursor-pointer text-gray-700 hover:text-gray-800" />
                        <div className="absolute hidden group-hover:block bg-gray-900 text-white text-sm rounded-md p-4 left-0 mt-2 w-64 z-10 shadow-lg">
                          <div className="before:absolute before:top-[-8px] before:left-6 before:border-8 before:border-transparent before:border-b-gray-900"></div>
                          <h3 className="font-bold text-lg mb-2">Product Dimensions Details</h3>
                          <ul className="list-disc pl-5 space-y-1 font-semibold">
                            <li>Here you can add width and height of a product as a dimension attribute of a product.</li>
                            <li>You are only allowed to add one height and one width of a product here.</li>
                            <li>The dimensions unit should be measured in cm.</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="block">
                        <label htmlFor="length" className="flex text-gray-700 text-lg font-semibold mt-10">
                          Length in cm
                        </label>
                        <input type="text" placeholder="Product length in cm" value={dimensionLength} onChange={(e) => setDimensionLength(e.target.value)} className="border rounded px-4 py-2 w-[20rem]"/>
                      </div>
                      <div className="block">
                        <label htmlFor="breadth" className="flex text-gray-700 text-lg font-semibold mt-10">
                          Breadth in cm
                        </label>
                        <input type="text" placeholder="Product breadth in cm" value={dimensionBreadth} onChange={(e) => setDimensionBreadth(e.target.value)} className="border rounded px-4 py-2 w-[20rem]"/>
                      </div>
                      <button type="button" onClick={addDimension} className="flex items-center bg-white border-gray-800 border-2 py-2 px-4 font-bold text-base rounded-full hover:bg-gray-800 hover:text-gray-100 ease-in-out transition-all duration-300">
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
                        {dimension ? (
                          <tr>
                            <td className="border border-gray-300 px-4 py-2">{dimension.length}</td>
                            <td className="border border-gray-300 px-4 py-2">{dimension.breadth}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">
                              <button
                                type="button"
                                onClick={deleteDimension}
                                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ) : (
                          <tr>
                            <td colSpan={3} className="border border-gray-300 px-4 py-2 text-center text-gray-500">
                              No dimensions added.
                            </td>
                          </tr>
                        )}
                      </tbody>
                  </table>
              </div>
            )}

            <div className='mt-4'>
                <label htmlFor="brand" className="block text-lg font-semibold">Product Brand Name</label>
                <span className='text-gray-500 mt-2 text-sm'>Enter the product brand name here.</span>
                <input type="text" id="title" name="title" value={productBrand} onChange={(e) => setProductBrand(e.target.value)} className="block w-[30%] p-3 mt-2 border border-gray-300 rounded-md" /> 
            </div>
            <div className='mt-4'>
                <label htmlFor="product_weight" className="block text-lg font-semibold">Product Weight</label>
                <span className='text-gray-500 mt-2 text-sm'>Enter the product weight in gram.</span>
                <input type="text" id="title" name="title" value={productWeight} onChange={(e) => setProductWeight(e.target.value)} className="block w-[25%] p-3 mt-2 border border-gray-300 rounded-md" /> 
            </div>

            <div className="mt-4">
              <label htmlFor="tags" className="block text-lg font-semibold">
                Tags
              </label>
              <span className="text-gray-500 mt-2 text-sm">
                Add up to 13 tags to help people search for your listings.
              </span>
              <div className="flex items-center mt-2 gap-2">
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  className="block w-[30%] p-3 border border-gray-300 rounded-md"
                  placeholder="Enter a tag"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="flex items-center bg-white border-gray-800 border-2 py-2 px-4 font-bold text-base rounded-full hover:bg-gray-800 hover:text-gray-100 ease-in-out transition-all duration-300"
                >
                  Add Tag
                </button>
              </div>
              <div className="mt-4">
                {tags.length > 0 && (
                  <ul className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                      <li
                        key={index}
                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md flex items-center"
                      >
                        {tag}
                        <button
                          onClick={() => deleteTag(index)}
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          ×
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                {tags.length === 0 && (
                  <p className="text-gray-500 mt-2">No tags added yet.</p>
                )}
              </div>
            </div>

            <div className='mt-4'>
                <label htmlFor="materials" className="block text-lg font-semibold">Materials</label>
                <span className='text-gray-500 mt-2 text-sm'>Buyers value transparency – tell them what’s used to make your item.</span>
                <input type="text" id="material" name="material" value={productMaterial} onChange={(e) => setProductMaterial(e.target.value)} className="block w-[30%] p-3 mt-2 border border-gray-300 rounded-md" /> 
            </div>
            <div className='mt-4'>
                <label htmlFor="category" className="block text-lg font-semibold">Category</label>
                <input type="text" id="title" name="title" className="block w-[30%] p-3 mt-2 border border-gray-300 rounded-md" /> 
            </div>
            </section>
            <section id="Shipping & Return" className="p-6 bg-white shadow-lg rounded-lg mt-12">
                <h2 className="text-2xl font-bold text-gray-700">Shipping & Return</h2>

                {/* Shopping Origin Section */}
                <div className="mt-4 border-gray-200 border p-4 rounded-lg shadow-lg">
                    <h3 className="text-lg font-bold text-gray-700 mb-4">Shipping Inside the Country</h3>

                    <label htmlFor="processingTime" className="block text-lg font-medium mb-2 text-gray-700">
                        Processing Time
                    </label>
                    <input type="text" id="processingTime" value={domesticShippingTIme} onChange={(e) => setDomesticShippingTime(e.target.value)} name="processingTime" defaultValue="2-3 days" className="w-[40%] mt-2 p-3 border border-gray-300 rounded-md" required/>

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
                        <input type="number" id="nationalFixedShippingCost" value={domesticShippingCost} onChange={(e) => setDomesticShippingCost(e.target.value)} name="nationalFixedShippingCost" defaultValue="20" className="w-[20%] mt-2 p-3 border border-gray-300 rounded-md" disabled={isNationalFreeShipping}/>
                    </div>
                </div>

                <div className="mt-4 border-gray-200 border p-4 rounded-lg shadow-lg">
                    <h3 className="text-lg font-bold text-gray-700 mb-4">International Shipping</h3>
                    <label htmlFor="processingTime" className="block text-lg font-medium text-gray-700">
                        Processing Time
                    </label>
                    <input type="text" id="internationalProcessingTime" name="internationalProcessingTime" defaultValue="5-7 days" value={internationalShippingTime} onChange={(e) => setInternationalShippingTime(e.target.value)} className="w-[40%] mt-2 p-3 border border-gray-300 rounded-md" required/>
                    <div className="mt-4">
                        <label className="block text-lg font-medium mb-2 text-gray-700">Free Shipping</label>
                        <div className="flex items-center gap-4 mt-2">
                        <label className="flex items-center">
                            <input type="radio" name="internationalFreeShipping" value="true" className="mr-2" onChange={(e) => handleInternationalShippingToggle(e, "international")} />Yes
                        </label>
                        <label className="flex items-center">
                            <input type="radio" name="internationalFreeShipping" value="false" className="mr-2" defaultChecked onChange={(e) => handleInternationalShippingToggle(e, "international")}/> No
                        </label>
                        </div>
                    </div>
                        <div className="mt-4">
                            <label htmlFor="internationalFixedShippingCost" className="block text-lg font-medium text-gray-700">
                            Fixed Shipping Cost
                            </label>
                            <input type="number" id="internationalFixedShippingCost" name="internationalFixedShippingCost" defaultValue="50" value={internationalShippingCost} onChange={(e) => setInternationalShippingCost(e.target.value)} className="w-[20%] mt-2 p-3 border border-gray-300 rounded-md" disabled={isInternationalFreeShipping}/>
                        </div>
                    </div>
            </section>


            <section id="Settings" className="p-6 bg-white shadow-lg rounded-lg mt-12">
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
                        {/* <button type="button" className="bg-white border-gray-800 border-2 py-2 px-4 font-bold text-base rounded-full hover:bg-gray-800 hover:text-gray-100 ease-in-out duration-900">
                            Change Policy
                        </button> */}
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
                        checked={renewalOption === "automatic"}
                        onChange={handleRenewalChange}
                      />
                      Automatic
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="renewal"
                        value="manual"
                        className="mr-2"
                        checked={renewalOption === "manual"}
                        onChange={handleRenewalChange}
                      />
                      Manual
                    </label>
                  </div>
                  <p className="mt-2 text-gray-500">
                    Expiration Date: <strong>{expirationDate}</strong>
                  </p>
                </div>
            </section>

            <button
              type="submit"
              className="mt-12 flex justify-end items-center bg-white border-gray-800 border-2 py-2 px-4 font-bold text-base rounded-full hover:bg-gray-800 hover:text-gray-100 ease-in-out transition-all duration-300"
            >
              Submit
            </button>
      </form>
    </div>
  );
};

export default AddProduct;
