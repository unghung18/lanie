'use client'
import React, { useState } from 'react'
import SearchBar from './SearchBar';
import Link from 'next/link';
import { CiShoppingCart } from "react-icons/ci";
import { AiOutlineMenu, AiOutlineClose, AiFillHome } from "react-icons/ai";
import { BiSearch } from "react-icons/bi"


import Image from 'next/image';
import avatar from '../../public/next.svg';

const Navbar = () => {
    const [showProfile, setShowProfile] = useState(false);
    const [showNav, setShowNav] = useState(false);

    return (
        <div className='relative'>
            <div className='flex items-center justify-between py-4 relative px-5 max-w-[1280px] mx-auto'>
                <div className='flex items-center space-x-10 lg:space-x-20'>
                    <div className='font-semibold text-2xl'>
                        <a href="">LANIE</a>
                    </div>
                    <nav className='max-md:hidden'>
                        <ul className='flex items-center lg:space-x-10 space-x-7 opacity-70 text-[15px]'>
                            <li><a href="" className='py-3 inline-block w-full hover:text-[#f51167]'>SHOP</a></li>
                            <li><a href="" className='py-3 inline-block w-full hover:text-[#f51167]'>SẢN PHẨM</a></li>
                            <li><a href="" className='py-3 inline-block w-full hover:text-[#f51167]'>BỘ SƯU TẬP</a></li>
                            <li><a href="" className='py-3 inline-block w-full hover:text-[#f51167]'>LIÊN HỆ</a></li>
                        </ul>
                    </nav>
                </div>
                <div className='flex items-center space-x-4'>
                    <SearchBar />
                    <div onClick={() => setShowProfile(!showProfile)} className='relative cursor-pointer'>
                        <Image src={avatar} alt="avatar" className=' w-[35px] h-[35px] rounded-full object-cover' />
                        <div className={`${showProfile ? "" : "hidden"} absolute bg-white z-20 rounded-lg shadow-lg`}>
                            <Link href="/login">Login</Link>
                        </div>
                    </div>
                    <div className='p-2 bg-gray-100 rounded-full'>
                        <CiShoppingCart size={20} />
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
                        <Link href="" className='flex items-center space-x-2'>
                            <AiFillHome size={20} color='#757575' />
                            <p className='mt-1'>Trang chủ</p>
                        </Link>
                    </li>
                    <li className='py-3 px-2 w-full'>
                        <Link href="" className='flex items-center space-x-2'>
                            <AiFillHome size={20} color='#757575' />
                            <p className='mt-1'>Trang chủ</p>
                        </Link>
                    </li>
                    <li className='py-3 px-2 w-full'>
                        <Link href="" className='flex items-center space-x-2'>
                            <AiFillHome size={20} color='#757575' />
                            <p className='mt-1'>Trang chủ</p>
                        </Link>
                    </li>
                </ul>

            </div>
        </div>
    )
}

export default Navbar