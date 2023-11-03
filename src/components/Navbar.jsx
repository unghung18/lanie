'use client'
import React, { useEffect, useState } from 'react'
import SearchBar from './SearchBar';
import Link from 'next/link';
import { CiShoppingCart } from "react-icons/ci";
import { AiOutlineMenu, AiOutlineClose, AiFillHome } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { MdProductionQuantityLimits } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux';

import Image from 'next/image';
import avatar from '../../public/next.svg';
import { cartActions } from '@/redux/slices/cartSlice';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const [showNav, setShowNav] = useState(false);
    const [qty, setQty] = useState(null);
    const [cartProducts, setCartProducts] = useState([]);
    const [totalPayment, setTotalPayment] = useState(null);

    const dispatch = useDispatch();
    const session = useSession();
    const router = useRouter()

    const { totalQuantity, cartItems, totalAmount } = useSelector(state => state.cart)

    const deleteItem = (id) => {
        dispatch(cartActions.deleteItem(id));
    };
    const handleSignOut = async () => {
        await signOut({ redirect: false });
    }

    useEffect(() => {
        setQty(totalQuantity);
        setCartProducts(cartItems);
        setTotalPayment(totalAmount);
    }, [totalQuantity, cartItems, totalAmount]);


    return (
        <div className='fixed top-0 left-0 right-0 bg-white shadow-md z-[1000]'>
            <div className='flex items-center justify-between py-4 relative px-5 max-w-[1280px] mx-auto'>
                <div className='flex items-center space-x-10 lg:space-x-20'>
                    <div className='font-semibold text-2xl'>
                        <a href="/">LANIE</a>
                    </div>
                    <nav className='max-md:hidden'>
                        <ul className='flex items-center lg:space-x-10 space-x-7 opacity-70 text-[15px]'>
                            <li><Link href="" className='py-3 inline-block w-full hover:text-[#f51167]'>SHOP</Link></li>
                            <li><Link href="/products" className='py-3 inline-block w-full hover:text-[#f51167]'>SẢN PHẨM</Link></li>
                            <li><Link href="" className='py-3 inline-block w-full hover:text-[#f51167]'>BỘ SƯU TẬP</Link></li>
                            <li><Link href="" className='py-3 inline-block w-full hover:text-[#f51167]'>LIÊN HỆ</Link></li>
                        </ul>
                    </nav>
                </div>
                <div className='flex items-center space-x-4'>
                    <SearchBar />
                    <div className='relative cursor-pointer group'>
                        <Image src={avatar} width={35} height={35} alt="avatar" className=' w-[35px] h-[35px] rounded-full object-cover' />
                        <div className="absolute hidden px-3 py-2 space-y-2 bg-white z-20 rounded-lg group-hover:md:block top-[calc(100%+10px)] right-[-10px] shadow-[1px_1px_5px_5px_rgba(0,0,0,0.1)] w-[350px] before:content-[''] before:w-[46px] before:h-[20px] before:bg-transparent before:absolute before:top-[-20px] before:right-0">
                            {session &&
                                <>
                                    <p>Xin chao: {session.data?.user.name}</p><hr />
                                </>}
                            <Link href="/login">Login</Link>
                            <hr />
                            <div onClick={handleSignOut}>Sign Out</div>
                        </div>
                    </div>
                    <div className='p-2 bg-gray-100 rounded-full relative group'>
                        <div className='absolute top-[-5px] right-[0] w-[14px] h-[14px] rounded-full flex-center text-xs bg-[#f51167] text-white'>{qty && qty}</div>
                        <CiShoppingCart size={20} />
                        <div className='absolute hidden bg-white rounded-sm group-hover:md:block top-[calc(100%+10px)] right-[-10px] shadow-[1px_1px_5px_5px_rgba(0,0,0,0.1)] w-[350px] before:content-[""] before:w-[46px] before:h-[20px] before:bg-transparent before:absolute before:top-[-20px] before:right-0'>
                            {cartProducts.length === 0 ?
                                <div className='h-[300px] flex-center'>
                                    Giỏ hàng trống
                                </div>
                                :
                                <>
                                    <div className='overflow-y-auto h-[220px] p-5 space-y-3'>
                                        {cartProducts?.map((e, i) => (
                                            <div key={i} className='flex items-center justify-between'>
                                                <div className='flex items-center'>
                                                    <img src={e.image[0]} alt='product-img' className='w-[50px] rounded-sm mr-3' />
                                                    <div>
                                                        <p className='font-bold'>{e.name}</p>
                                                        <div>
                                                            <span className='mr-2'>SL: {e.quantity}</span>
                                                            <span className='text-[#f51167]'>Giá: {e.totalPrice.toLocaleString()}₫</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <AiOutlineClose size={20} onClick={() => deleteItem(e.id)} />
                                            </div>
                                        ))}
                                    </div>
                                    <div className='bg-white p-3'>
                                        <div className='flex justify-between items-center'>
                                            <p className='font-bold text-xs'>TỔNG: </p>
                                            <p>{qty && qty}</p>
                                        </div>
                                        <div className='flex justify-between items-center'>
                                            <p className='font-bold text-xs'>THANH TOÁN: </p>
                                            <p>{totalPayment?.toLocaleString()}₫</p>
                                        </div>
                                        <Link href="" className='w-full bg-black text-white p-2 flex-center my-2 rounded-sm'>THANH TOÁN NGAY</Link>
                                        <Link href="" className='w-full border-black border-[1px] p-2 flex-center rounded-sm'>XEM GIỎ HÀNG</Link>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                    <span onClick={() => setShowNav(!showNav)} className='p-[9px] bg-gray-100 rounded-full md:hidden'>
                        <AiOutlineMenu />
                    </span>
                </div>
            </div>
            <div className={`md:hidden top-0 right-0 absolute pb-4 px-5 py-3 bg-white shadow-2xl ease-in-out duration-500 h-[100vh] z-[999] ${showNav ? "w-[260px] sm:w-[350px]" : "w-0 invisible opacity-0"} `}>
                <span className='p-[9px] bg-gray-100 rounded-full inline-block' onClick={() => setShowNav(!showNav)} >
                    <AiOutlineClose size={20} />
                </span>
                <div className='flex items-center bg-gray-100 p-2 rounded-lg my-4 py-3'>
                    <input
                        type="text"
                        className='outline-none bg-transparent ml-2 caret-blue-500 placeholder:font-light placeholder:text-gray-600 text-[15px] w-full'
                        placeholder='Tìm kiếm'
                        autoComplete='false'
                    />
                    <button><BiSearch size={20} color='#757575' /></button>
                </div>
                <ul className='flex flex-col text-[15px] opacity-75'>
                    <li className='py-3 px-2 w-full'>
                        <Link href="" className='flex items-center space-x-2'>
                            <AiFillHome size={20} color='#757575' />
                            <p className='mt-1'>Trang chủ</p>
                        </Link>
                    </li>
                    <li className='py-3 px-2 w-full'>
                        <Link href="/products" className='flex items-center space-x-2'>
                            <MdProductionQuantityLimits size={20} color='#757575' />
                            <p className='mt-1'>Sản phẩm</p>
                        </Link>
                    </li>
                    <li className='py-3 px-2 w-full'>
                        <Link href="/login" className='flex items-center space-x-2'>
                            <AiFillHome size={20} color='#757575' />
                            <p className='mt-1'>Login</p>
                        </Link>
                    </li>
                </ul>

            </div>
        </div >
    )
}

export default Navbar