import React from 'react';
import { AiOutlineShopping } from 'react-icons/ai';
import { BsMessenger } from "react-icons/bs";
import Image from 'next/image';
import Link from 'next/link';

const ProductCard = ({ data }) => {
    return (
        <div>
            <div className='relative'>
                {data.sale && <span className='absolute right-[16px] top-[14px] text-[10px] font-bold text-white bg-[#50e550] rounded-[15px] px-2 pt-1'>ON SALE</span>}
                <Image src={data.image} alt='product' />
                <div className=' w-full absolute right-0 bottom-4 pr-[15px] flex justify-end items-center' >
                    <Link href="/">
                        <AiOutlineShopping />
                        <span>ADD TO CARD</span>
                    </Link>
                    <Link href="">
                        <BsMessenger />
                    </Link>
                </div>
            </div>
            <div className='py-5 flex justify-between items-center'>
                <p>{data.name}</p>
                <h6 className='text-[16px] font-bold text-[#111111]'>{data.price}₫</h6>
            </div>
        </div>
    )
}

export default ProductCard