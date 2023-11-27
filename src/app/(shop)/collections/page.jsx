'use client'
import Loader from '@/components/Loader';
import ProductCard from '@/components/ProductCard';
import React, { useState, useEffect } from 'react';

const Page = () => {

    const [collections, setCollections] = useState(null);
    const [loading, setLoading] = useState(true);

    const getAllCollections = async () => {
        setLoading(true);

        try {
            const res = await fetch("/api/collection/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            })
            const data = await res.json()
            if (data.success) {
                setCollections(data.data)
            }
            else {
                alert(data.message)
            }
            setLoading(false);
        } catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        getAllCollections();
    }, []);

    useEffect(() => {
        console.log(collections)
    }, [collections]);

    return (
        <>
            {loading ? <div className='w-full h-[calc(100vh-78.5px)]'><Loader /></div> :
                <div className='py-10 px-5 max-w-[1280px] mx-auto space-y-20'>
                    {collections != null && collections.map((item) => (
                        <div key={item._id}>
                            <img src={item.bannerImg} alt={item.title} className='mb-20' />
                            <div className='grid grid-cols-1 md:grid-cols-10 md:gap-16'>
                                <div className='md:col-span-6'>
                                    <div className='grid grid-cols-2 gap-2'>
                                        {item.products.map((product, i) => (
                                            <ProductCard data={product} key={i} />
                                        ))}
                                    </div>
                                    <div >
                                        <h1 className='text-[20px] font-bold my-5 max-md:text-center'>{item.title}</h1>
                                        <p>{item.description}</p>
                                    </div>
                                </div>
                                <div className=' col-span-4 space-y-2 max-md:mt-5'>
                                    {item.images.map((image, i) => (
                                        <img src={image} alt={item.title} key={i} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            }
        </>
    )
}

export default Page