'use client'
import ImageGallery from '@/components/ImageGallery';
import RatingStart from '@/components/RatingStart';
import { FaRegCommentDots } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade, Navigation } from 'swiper/modules';
import ProductCard from '@/components/ProductCard';
import { useDispatch } from 'react-redux';
import { cartActions } from '@/redux/slices/cartSlice';
import Loader from '@/components/Loader';

const Page = ({ params }) => {

    const [product, setProduct] = useState(undefined);
    const [similarProducts, setSimilarProducts] = useState([]);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();

    const getProductData = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/product/${params.id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
            })
            const data = await res.json()
            if (data.success) {
                setProduct(data.data);
            }
            else {
                alert(data.message)
            }
            setLoading(false);
        } catch (error) {
            alert(error)
        }
    }

    const getSimilarProducts = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/product/latest-product", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            })
            const data = await res.json()
            if (data.success) {
                console.log(data)
                setSimilarProducts(data.data)
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
        getProductData();
        getSimilarProducts();
        window.document.scrollingElement?.scrollTo(0, 0);
    }, []);

    return (
        <>
            {loading ? <div className='w-full h-[calc(100vh-78.5px)]'><Loader /></div> :
                product &&
                <div>
                    <div className='max-w-[1280px] mx-auto flex gap-0 min-[850px]:gap-14 py-10 px-5 max-md:flex-col max-md:space-y-10'>
                        <ImageGallery imageUrls={product.image} />
                        <div className='flex-1 px-5'>
                            <h1 className='text-2xl font-semibold'>{product.title}</h1>
                            <h3 className='text-sm text-neutral-500'>Alan Walker</h3>
                            <div className='flex items-center space-x-12 mt-4'>
                                <RatingStart />
                                <span className='flex items-start space-x-3'>
                                    <FaRegCommentDots />
                                    <span className='opacity-70 text-sm'>
                                        121 bình luận
                                    </span>
                                </span>
                            </div>
                            <h1 className='text-2xl font-semibold mt-8'>{product.price?.toLocaleString()}₫</h1>
                            <h3 className='font-bold mt-8 mb-3 text-[14px]'>Kích thước</h3>
                            <ul className='flex space-x-5'>
                                {product.size?.map((e, i) => (
                                    <li key={i}
                                        className={`p-1 px-2 border rounded-lg cursor-pointer inline-block text-center ${selectedSize == e ? "bg-black text-white" : "bg-white text-black"}`}
                                        onClick={() => setSelectedSize(e)}
                                    >
                                        {e}
                                    </li>
                                ))}
                            </ul>
                            <h3 className='font-bold mt-8 mb-3 text-[14px]'>Màu sắc</h3>
                            <div className='mb-3 flex'>
                                {product.color?.map((e, i) => (
                                    <div className='relative w-[35px] h-[35px] border border-neutral-400 m-1 flex-center'
                                        key={i}
                                        onClick={() => setSelectedColor(e)}
                                        style={{
                                            borderRadius: '100%',
                                            backgroundColor: e,
                                        }}>
                                        {selectedColor == e && <span className='text-[#fff]'>✓</span>}
                                    </div>
                                ))}
                            </div>
                            <div className='mb-5 flex mt-8 items-center'>
                                <span className='font-bold text-[14px] mr-5'>Số Lượng</span>
                                <div className='max-w-[100px] min-w-[75px flex justify-between] items-center border'>
                                    <FiChevronLeft size={30} />
                                    <input type="Number" className='w-full text-center outline-none bg-white' defaultValue={1} disabled />
                                    <FiChevronRight size={30} />
                                </div>
                            </div>
                            <div className='flex max-[930px]:space-y-3 space-y-0 space-x-3 max-[930px]:space-x-0 max-[930px]:flex-wrap text-center'>
                                <div onClick={() => dispatch(cartActions.addItem(product))} className='py-2 px-3 rounded-lg border cursor-pointer bg-black text-white max-[930px]:w-full'>THÊM GIỎ HÀNG</div>
                                <Link href="/checkout" className='py-2 px-3 rounded-lg border cursor-pointer bg-black text-white max-[930px]:w-full'>MUA NGAY</Link>
                            </div>
                            <h3 className='font-bold mt-8 mb-3 text-[14px]'>Mô tả sản phẩm</h3>
                            <div className='text-neutral-500 text-sm'>{product.description}</div>
                        </div>
                    </div>
                    <hr />
                    <div className='max-w-[1280px] mx-auto px-5 pb-10'>
                        <h2 className='my-[40px] md:my-[60px] text-[28px] text-center md:text-[36px] font-bold'>SẢN PHẨM TƯƠNG TỰ</h2>
                        <Swiper
                            breakpoints={{
                                1024: {
                                    spaceBetween: 30,
                                    slidesPerView: 4,

                                },
                                760: {
                                    spaceBetween: 20,
                                    slidesPerView: 3,

                                },
                                0: {
                                    spaceBetween: 5,
                                    slidesPerView: 2,
                                },
                            }}
                            loop={true}
                            navigation={true}
                            autoplay={{
                                disableOnInteraction: true,
                                delay: 2000,
                                stopOnLastSlide: false
                            }}
                            modules={[Navigation, Autoplay]}
                        >
                            {similarProducts.map((item) => (
                                <SwiperSlide key={item._id}>
                                    <ProductCard data={item} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            }
        </>
    )
}

export default Page;