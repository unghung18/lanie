'use client'
import React, { useState } from 'react';

const ImageGallery = ({ imageUrls }) => {
    const [selectedImage, setSelectedImage] = useState(0);

    return (
        <div className='flex max-md:flex-col-reverse'>
            <div className='flex flex-col justify-between md:mr-3 max-md:space-x-1 max-md:flex-row'>
                {imageUrls?.map((item, i) => (
                    <div key={i} className='relative rounded-lg md:w-[90px]'>
                        <img onClick={() => setSelectedImage(i)} src={item} alt="product-img" className={`rounded-lg p-1 border ${selectedImage === i ? " border-purple-500" : "border-purple-200"}`} />
                    </div>
                ))}
            </div>
            <div className='flex-1 max-md:mb-5'>
                <img src={imageUrls && imageUrls[selectedImage]} alt="product" className='w-[380px] max-md:w-full' />
            </div>
        </div>
    )
}

export default ImageGallery