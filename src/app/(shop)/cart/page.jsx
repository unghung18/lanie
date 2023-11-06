'use client'
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "next/link";
import { BsTrash } from 'react-icons/bs';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import { cartActions } from '@/redux/slices/cartSlice';
import a from '../../../assets/emptycart.png';
import Image from 'next/image';

const Page = () => {
    const [cartProducts, setCartProducts] = useState([])
    const dispatch = useDispatch();
    const { cartItems, totalAmount, totalQuantity } = useSelector((state) => state.cart);



    useEffect(() => {
        setCartProducts(cartItems)
    }, [cartItems, totalAmount, totalQuantity]);

    return (
        <div className='py-5 bg-slate-100'>
            <div className='max-w-[1280px] mx-auto px-5'>
                <div className='text-[20px'>
                    <h3 className="text-uppercase font-bold text-[20xp] mb-5">My Cart</h3>
                </div>
                {
                    cartProducts.length === 0 ?
                        <div className='text-center'>Giỏ hàng trống</div> : (
                            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 items-start lg:gap-14">
                                <div>
                                    <div className="gap-5 grid mr-6">
                                        {
                                            cartProducts.map(cartProduct => (
                                                <div className='pb-5 border-b border-black gap-5 flex' key={cartProduct._id}>
                                                    <div className='flex flex-col items-center bg-slate-100'>
                                                        <img src={cartProduct.image[0]} alt={cartProduct.title} className='w-[100px]' />
                                                        <button type="button" className='my-3 p-2 border' onClick={() => dispatch(cartActions.deleteItem(cartProduct._id))}>
                                                            <BsTrash size={20} />
                                                        </button>
                                                    </div>

                                                    <div className='w-full space-y-3'>
                                                        <h6 className='text-base font-medium text-[#707b8e]'>{cartProduct.title}</h6>
                                                        <div className="flex items-center space-x-3">
                                                            <span className="text-[#707b8e]">Số lượng: </span>
                                                            <div className="flex items-center">
                                                                <button type="button" className='text-sm border p-1' onClick={() => dispatch(cartActions.removeItem(cartProduct._id))}>
                                                                    <AiOutlineMinus size={20} />
                                                                </button>
                                                                <span className="flex flex-center w-7">{cartProduct.quantity}</span>
                                                                <button type="button" className='text-sm border p-1' onClick={() => dispatch(cartActions.addItem(cartProduct))}>
                                                                    <AiOutlinePlus size={20} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center justify-between gap-1">
                                                            <div className='text-[15px] text-[#707b8e]'>Giá : {cartProduct.price.toLocaleString()}₫</div>
                                                            <div className='font-semibold'>
                                                                <span>Tổng tiền: </span>
                                                                <span className=''>{cartProduct.totalPrice.toLocaleString()}₫</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <button type="button" className='my-5 bg-red-500 text-white py-2 px-4 rounded-lg' /* onClick={() => dispatch(clearCart())} */>
                                        <span className="text-base">Clear Cart</span>
                                    </button>
                                </div>
                                <div className='bg-white my-6 rounded-lg'>
                                    <div className='flex items-center text-[#707b8e] flex-col min-h-[420px] p-4'>
                                        <div className='border-b border-black pb-3 w-full'>
                                            <h6 className='text-[20px] font-medium'>Order Summary</h6>
                                        </div>
                                        <ul className='py-4 w-full'>
                                            <li className="flex items-center justify-between">
                                                <span>Selected {totalQuantity} sản phẩm</span>
                                                <span className='font-bold'>{totalAmount.toLocaleString()}₫</span>
                                            </li>
                                            <li className='flex items-center justify-between'>
                                                <span>Giảm giá</span>
                                                <span className='font-bold'>
                                                    <span className='text-red-500'>-&nbsp;</span>
                                                    0₫
                                                </span>
                                            </li>
                                            <li className='flex items-center justify-between'>
                                                <span>Phí giao hàng</span>
                                                <span className='font-bold'>
                                                    <span className=' text-yellow-500'>+&nbsp;</span>
                                                    0₫
                                                </span>
                                            </li>
                                        </ul>
                                        <div className='flex items-center justify-between text-lg mt-auto mb-4 pt-3 border-t w-full border-black'>
                                            <span className='fw-6'>Tổng cộng: </span>
                                            <span className='fw-6'>{totalAmount.toLocaleString()}₫</span>
                                        </div>
                                        <div className='w-full'>
                                            <button type="button" className='py-3 px-4 inline-block rounded-md bg-yellow-400 text-white hover:text-white hover:bg-black w-full'>Tiến hành thanh toán</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                }
            </div>
        </div>
    )
}

export default Page