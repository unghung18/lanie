import React from 'react';
import { AiOutlineShopping } from 'react-icons/ai';
import { BsMessenger } from "react-icons/bs";
import Image from 'next/image';
import Link from 'next/link';

const ProductCard = ({ data }) => {
    return (
        <div>
            <div className='relative group'>
                {data.sale && <span className='absolute right-[16px] top-[14px] text-[10px] font-bold text-white bg-[#50e550] rounded-[15px] px-2 pt-1'>ON SALE</span>}
                <Image src={data.image} alt='product' />
                <div className=' w-full absolute right-0 bottom-4 pr-[15px] flex justify-end items-center z-10 max-sm:hidden' >
                    <Link href="/" className='mx-2 w-[36px] h-[36px] flex-center bg-white rounded-full text-[18px] text-[#000] shadow-md cursor-pointer'>
                        <AiOutlineShopping />
                    </Link>
                    <Link href="/" className='mx-2 w-[36px] h-[36px] flex-center bg-white rounded-full text-[18px] text-[#000] shadow-md cursor-pointer'>
                        <BsMessenger />
                    </Link>
                </div>
                <div className=" absolute bottom-full left-0 right-0 bg-black/50 overflow-hidden w-full h-0 transition-all !duration-500 flex-center group-hover:bottom-0 group-hover:h-full">
                    <Link href='' className="bg-[#000] text-white text-center w-[80%] inline-block bg-transparent text-[16px] border-[1px] border-solid border-[#fff] py-2 px-5 hover:bg-[#fff] hover:text-[#000]">Chi tiết</Link>
                </div>
            </div>
            <div className='py-5 flex justify-between items-center'>
                <p>{data.name}</p>
                <h6 className='text-[16px] font-bold text-[#111111]'>{data.price.toLocaleString()}₫</h6>
            </div>
        </div>
    )
}

export default ProductCard