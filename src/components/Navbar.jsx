'use client'
import React, { useEffect, useRef, useState } from 'react'
import SearchBar from './SearchBar';
import Link from 'next/link';
import { CiShoppingCart } from "react-icons/ci";
import { AiOutlineClose, AiFillHome } from "react-icons/ai";
import { TbLogin2, TbLogout2 } from 'react-icons/tb'
import { BiSearch, BiSolidContact } from "react-icons/bi";
import { BsCartDashFill } from "react-icons/bs"
import { MdProductionQuantityLimits } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux';

import Image from 'next/image';
import avatar from '../../public/next.svg';
import { cartActions } from '@/redux/slices/cartSlice';
import { useSession, signOut } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';

const Navbar = () => {
    const [showNav, setShowNav] = useState(false);
    const [qty, setQty] = useState(null);
    const [cartProducts, setCartProducts] = useState([]);
    const [totalPayment, setTotalPayment] = useState(null);

    const dispatch = useDispatch();
    const session = useSession();
    const router = useRouter()
    const menuRef = useRef()
    const pathname = usePathname();

    const { totalQuantity, cartItems, totalAmount } = useSelector(state => state.cart)

    const deleteItem = (id) => {
        dispatch(cartActions.deleteItem(id));
    };
    const handleSignOut = async () => {
        await signOut({ redirect: false });
        setShowNav(false)
    }

    useEffect(() => {
        setQty(totalQuantity);
        setCartProducts(cartItems);
        setTotalPayment(totalAmount);
    }, [totalQuantity, cartItems, totalAmount]);

    useEffect(() => {
        const handler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setShowNav(false)
            }
        }
        document.addEventListener("mousedown", handler)

        return () => {
            document.removeEventListener("mousedown", handler)
        }
    }, []);


    return (
        <div className='fixed top-0 left-0 right-0 bg-white shadow-md z-[1000]'>
            <div className='flex items-center justify-between py-4 relative px-5 max-w-[1280px] mx-auto'>
                <div className='flex items-center space-x-10 lg:space-x-20'>
                    <div className='font-semibold text-2xl'>
                        <Link href="/">LANIE</Link>
                    </div>
                    <nav className='max-md:hidden'>
                        <ul className='flex items-center lg:space-x-10 space-x-7 opacity-70 text-[15px]'>
                            <li><Link href="/products" className='py-3 inline-block w-full hover:text-[#f51167]'>SẢN PHẨM</Link></li>
                            <li><Link href="/sale" className='py-3 inline-block w-full hover:text-[#f51167]'>SALE</Link></li>
                            <li><Link href="collections" className='py-3 inline-block w-full hover:text-[#f51167]'>BỘ SƯU TẬP</Link></li>
                            <li><Link href="/contact" className='py-3 inline-block w-full hover:text-[#f51167]'>LIÊN HỆ</Link></li>
                        </ul>
                    </nav>
                </div>
                <div className='flex items-center space-x-4'>
                    <SearchBar />
                    <div className='relative cursor-pointer group'>
                        <Image src={avatar} width={35} height={35} alt="avatar" className=' w-[35px] h-[35px] rounded-full object-cover' />
                        <div className="absolute hidden py-2 space-y-2 bg-white z-20 rounded-lg group-hover:md:block top-[calc(100%+10px)] right-[-10px] shadow-[1px_1px_5px_5px_rgba(0,0,0,0.1)] w-[300px] before:content-[''] before:w-[46px] before:h-[20px] before:bg-transparent before:absolute before:top-[-20px] before:right-0">
                            {session.data &&
                                <p className='px-5 mb-3 text-black'>Xin chào: {session.data?.user.name}</p>
                            }
                            {!session.data &&
                                <Link href="/login" className='px-5 text-gray-500 hover:text-black'>Đăng nhập</Link>
                            }
                            {session.data &&
                                <>
                                    <hr />
                                    <div onClick={handleSignOut} className='text-center text-gray-500 hover:text-black'>Đăng xuất</div>
                                </>
                            }
                        </div>
                    </div>
                    <div className='p-2 bg-gray-100 rounded-full relative group' onClick={() => router.push('/cart')}>
                        <div className='absolute top-[-5px] right-[0] w-[14px] h-[14px] rounded-full flex-center text-xs bg-[#f51167] text-white'>{qty && qty}</div>
                        <CiShoppingCart size={20} />
                        <div className='absolute hidden bg-white rounded-sm group-hover:md:block top-[calc(100%+10px)] right-[-10px] shadow-[1px_1px_5px_5px_rgba(0,0,0,0.1)] w-[350px] before:content-[""] before:w-[46px] before:h-[20px] before:bg-transparent before:absolute before:top-[-20px] before:right-0'>
                            {cartProducts.length == 0 ?
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
                                                <AiOutlineClose size={20} onClick={() => deleteItem(e._id)} />
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

                                        <Link href="/checkout" className='w-full bg-black text-white mt-3 border-[1px] p-2 flex-center rounded-sm'>THANH TOÁN NGAY</Link>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                    <div onClick={() => setShowNav(true)} className='p-[9px] bg-gray-100 rounded-full md:hidden'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className={`md:hidden top-0 right-0 absolute h-[100vh] flex w-full ease-in-out duration-500 ${showNav ? "w-full" : "w-0 invisible opacity-0"}`}>
                <div className='flex-1'></div>
                <div className={`grid grid-cols-1 py-20 space-y-5 bg-white shadow-2xl ease-in-out duration-500 h-[100vh] z-[999]  ${showNav ? "w-[260px] sm:w-[350px]" : "w-0 invisible opacity-0"}`} ref={menuRef}>

                    {session.data ?
                        <div className='flex items-center gap-5 mx-7'>
                            <div className='h-10 w-10 flex-center bg-gray-400 rounded-full text-white'>{session.data?.user.name[0].toLocaleUpperCase()}</div>
                            <div>
                                <p className='text-gray-500'>{session.data.user.name}</p>
                                <p className='text-gray-500'>{session.data.user.email}</p>
                            </div>
                        </div>
                        :
                        <div>
                            <Link href="/login" className='gap-3 flex opacity-75 w-full py-2'>
                                <TbLogin2 size={20} color='#757575' className='ml-7' />
                                <p>Đăng nhập</p>
                            </Link>
                            <hr />
                        </div>
                    }
                    <div>
                        <div className='flex items-center bg-gray-100 p-2 rounded-lg mx-5 mb-3'>
                            <input
                                type="text"
                                className='outline-none bg-transparent ml-2 caret-blue-500 placeholder:font-light placeholder:text-gray-600 text-[15px] text-gray-500 w-full'
                                placeholder='Tìm kiếm'
                                autoComplete='false'
                            />
                            <button><BiSearch size={20} color='#757575' /></button>
                        </div>
                        <ul className='flex flex-col text-[15px] opacity-75 px-5'>
                            <li className={`py-3 px-2 w-full ${pathname == '/' ? " bg-[#f0f0f0] text-[#292929] rounded-lg" : ""}`}>
                                <Link href="/" className='flex items-center space-x-2'>
                                    <AiFillHome size={20} color='#757575' />
                                    <p className='mt-1'>Trang chủ</p>
                                </Link>
                            </li>
                            <li className={`py-3 px-2 w-full ${pathname == '/products' ? " bg-[#f0f0f0] text-[#292929] rounded-lg" : ""}`}>
                                <Link href="/products" className='flex items-center space-x-2'>
                                    <MdProductionQuantityLimits size={20} color='#757575' />
                                    <p className='mt-1'>Sản phẩm</p>
                                </Link>
                            </li>
                            <li className={`py-3 px-2 w-full ${pathname == '/sale' ? " bg-[#f0f0f0] text-[#292929] rounded-lg" : ""}`}>
                                <Link href="/sale" className='flex items-center space-x-2'>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="#000"
                                        version="1.1"
                                        viewBox="0 0 388.691 388.691"
                                        xmlSpace="preserve"
                                        className='text-[#757575] w-5 h-5'
                                    >
                                        <path d="M368.305 237.449c8.605-10.172 20.387-24.102 20.387-43.104s-11.781-32.933-20.389-43.106c-2.74-3.239-7.326-8.661-8.104-10.782-.773-2.382-.244-9.954.07-14.485.91-13.07 2.156-30.971-8.701-45.887-10.932-15.019-28.424-19.355-41.201-22.523-4.33-1.074-11.578-2.871-13.523-4.265-1.877-1.422-5.732-7.641-8.037-11.357-6.98-11.256-16.541-26.673-34.396-32.471-4.424-1.437-9.129-2.165-13.986-2.165-11.947 0-22.558 4.285-31.92 8.067-4.563 1.843-11.462 4.628-14.157 4.628-2.697 0-9.595-2.786-14.159-4.63-9.362-3.78-19.973-8.065-31.918-8.065-4.857 0-9.563.728-13.984 2.164-17.857 5.798-27.419 21.215-34.4 32.473-2.305 3.716-6.161 9.935-8.03 11.352-1.95 1.398-9.199 3.195-13.536 4.271-12.771 3.166-30.264 7.502-41.194 22.521-10.86 14.922-9.612 32.825-8.701 45.896.315 4.525.843 12.099.08 14.45-.785 2.148-5.372 7.57-8.115 10.813C11.784 161.413 0 175.343 0 194.345s11.783 32.932 20.388 43.105c2.741 3.24 7.328 8.662 8.104 10.783.773 2.381.246 9.953-.069 14.479-.911 13.07-2.159 30.974 8.701 45.895 10.931 15.019 28.423 19.354 41.201 22.522 4.33 1.073 11.579 2.871 13.523 4.265 1.875 1.421 5.731 7.641 8.037 11.357 6.98 11.257 16.541 26.674 34.399 32.472 4.423 1.437 9.128 2.164 13.984 2.164 11.945 0 22.556-4.285 31.918-8.065 4.564-1.844 11.463-4.63 14.159-4.63 2.697 0 9.594 2.786 14.159 4.63 9.362 3.78 19.973 8.065 31.918 8.065 4.857 0 9.562-.728 13.984-2.164 17.857-5.798 27.418-21.214 34.4-32.473 2.303-3.716 6.16-9.936 8.029-11.353 1.953-1.399 9.203-3.195 13.541-4.271 12.77-3.166 30.26-7.502 41.189-22.521 10.859-14.922 9.611-32.824 8.701-45.896-.314-4.525-.844-12.1-.08-14.45.789-2.146 5.376-7.568 8.119-10.81zM345.4 218.076c-5.545 6.553-11.277 13.33-13.732 20.892-2.572 7.919-1.939 17.022-1.324 25.828.688 9.868 1.398 20.071-3.029 26.157-4.5 6.183-14.492 8.66-24.156 11.056-8.516 2.11-17.32 4.292-23.971 9.132-6.555 4.77-11.293 12.41-15.875 19.801-5.287 8.524-10.754 17.34-18.168 19.747-1.426.463-3.014.698-4.721.698-6.117 0-13.191-2.857-20.683-5.882-8.292-3.351-16.866-6.813-25.395-6.813-8.525 0-17.101 3.463-25.394 6.813-7.491 3.024-14.566 5.883-20.684 5.883-1.706 0-3.295-.235-4.721-.698-7.413-2.407-12.881-11.224-18.169-19.75-4.582-7.388-9.319-15.027-15.872-19.796-6.647-4.839-15.451-7.021-23.971-9.133-9.664-2.396-19.657-4.873-24.157-11.058-4.429-6.082-3.718-16.285-3.029-26.153.613-8.806 1.247-17.909-1.325-25.831-2.456-7.561-8.188-14.336-13.733-20.893C36.757 210.35 30 202.363 30 194.346c0-8.016 6.757-16.004 13.292-23.73 5.545-6.553 11.277-13.33 13.733-20.892 2.571-7.919 1.938-17.023 1.324-25.828-.688-9.868-1.399-20.072 3.029-26.157 4.5-6.184 14.493-8.661 24.164-11.058 8.513-2.111 17.316-4.293 23.963-9.131 6.554-4.769 11.291-12.409 15.874-19.798 5.287-8.526 10.755-17.342 18.169-19.75 1.426-.463 3.014-.698 4.72-.698 6.117 0 13.192 2.857 20.683 5.882 8.292 3.35 16.866 6.813 25.395 6.813 8.523 0 17.098-3.462 25.394-6.813 7.49-3.025 14.566-5.883 20.684-5.883 1.707 0 3.295.235 4.721.698 7.414 2.407 12.881 11.224 18.168 19.749 4.582 7.389 9.32 15.029 15.873 19.798 6.648 4.839 15.451 7.021 23.971 9.133 9.664 2.396 19.658 4.873 24.158 11.057 4.426 6.081 3.717 16.283 3.029 26.152-.615 8.804-1.25 17.908 1.324 25.833 2.455 7.562 8.188 14.338 13.732 20.892 6.533 7.726 13.291 15.714 13.291 23.73s-6.755 16.004-13.291 23.731z"></path>
                                        <path d="M167.993 208.912L177.984 208.912 172.988 175.535z"></path>
                                        <path d="M194.346 79.345c-63.513 0-115 51.487-115 115 0 63.514 51.487 115 115 115s115-51.486 115-115c0-63.513-51.487-115-115-115zm-66.169 157.946c-13.142 0-20.375-7.729-20.375-21.77v-2.418a3.88 3.88 0 013.878-3.877h6.93a3.878 3.878 0 013.879 3.877v3.232c0 5.833 2.697 6.619 5.34 6.619 2.637 0 5.34-.786 5.34-6.619 0-7.121-5.131-11.811-10.553-16.777-6.781-6.203-14.465-13.231-14.465-26.388 0-14.04 7.155-21.771 20.14-21.771 12.833 0 19.972 7.548 20.143 21.269a3.88 3.88 0 01-3.849 4.356h-6.957a3.88 3.88 0 01-3.883-3.881v-.786c0-5.936-2.573-6.736-5.101-6.736s-5.106.8-5.106 6.736c0 7.124 5.124 11.81 10.55 16.776 6.779 6.206 14.463 13.231 14.463 26.389-.001 14.039-7.232 21.769-20.374 21.769zm69.251-1.393a3.968 3.968 0 01-3.017 1.393h-7.825a3.968 3.968 0 01-3.922-3.379l-1.755-11.726h-13.774l-1.758 11.726a3.96 3.96 0 01-3.92 3.379h-6.633a3.961 3.961 0 01-3.913-4.592l12.472-77.96a3.965 3.965 0 013.912-3.338h14.642a3.965 3.965 0 013.913 3.338l12.473 77.96a3.962 3.962 0 01-.895 3.199zm42.076-2.572a3.966 3.966 0 01-3.964 3.965h-29.323a3.965 3.965 0 01-3.963-3.965v-77.959a3.964 3.964 0 013.963-3.965h7.797a3.967 3.967 0 013.967 3.965v67.389h17.561a3.966 3.966 0 013.965 3.964v6.606h-.003zm41.387-77.96v6.606a3.965 3.965 0 01-3.967 3.964h-18.631v20.547h13.994a3.964 3.964 0 013.963 3.965v6.607a3.963 3.963 0 01-3.963 3.964h-13.994v21.736h18.631a3.966 3.966 0 013.967 3.964v6.606a3.966 3.966 0 01-3.967 3.965h-30.391a3.965 3.965 0 01-3.964-3.965v-77.959a3.963 3.963 0 013.964-3.965h30.391a3.966 3.966 0 013.967 3.965z"></path>
                                    </svg>
                                    <p className='mt-1'>Sale</p>
                                </Link>
                            </li>
                            <li className={`py-3 px-2 w-full ${pathname == '/cart' ? " bg-[#f0f0f0] text-[#292929] rounded-lg" : ""}`}>
                                <Link href="/cart" className='flex items-center space-x-2'>
                                    <BsCartDashFill size={20} color='#757575' />
                                    <p className='mt-1'>Giỏ hàng</p>
                                </Link>
                            </li>
                            <li className={`py-3 px-2 w-full ${pathname == '/contact' ? " bg-[#f0f0f0] text-[#292929] rounded-lg" : ""}`}>
                                <Link href="/contact" className='flex items-center space-x-2'>
                                    <BiSolidContact size={20} color='#757575' />
                                    <p className='mt-1'>Liên hệ</p>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    {session.data ?
                        <div className='py-3 flex items-center gap-3 cursor-pointer opacity-75' onClick={handleSignOut}>
                            <TbLogout2 size={20} color='#757575' className='ml-7' />
                            Đăng xuất
                        </div>
                        :
                        <div></div>
                    }
                </div>
            </div>

        </div >
    )
}

export default Navbar;