import React from 'react'
import image from '../../Images/banners/img1.webp';

const ImageCarousel = () => {
  return (
    <>
    <div className='container mx-auto'>
      <img src={image} className='w-full h-80 object-cover' alt="" />
    </div>
    
    </>
    
  )
}

export default ImageCarousel