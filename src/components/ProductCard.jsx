import React from 'react';
import { AiOutlineShopping } from 'react-icons/ai';
import { BsMessenger } from "react-icons/bs";
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { cartActions } from '@/redux/slices/cartSlice';
import { useRouter } from 'next/navigation';

const ProductCard = ({ data }) => {

    const dispatch = useDispatch();
    const router = useRouter();

    return (
        <Link href={`/products/${data._id}`}>
            <div className='relative group'>
                {data.sale != "0" && <span className='absolute right-[16px] top-[14px] text-[10px] font-bold text-white bg-[#50e550] rounded-[15px] px-2 pt-1'>ON SALE</span>}
                <img src={data.image[0]} alt={data.title} />
                <div className=' w-full absolute right-0 bottom-4 pr-[15px] flex justify-end items-center z-10 max-sm:hidden' >
                    <button className='mx-2 w-[36px] h-[36px] flex-center bg-white rounded-full text-[18px] text-[#000] shadow-md cursor-pointer'>
                        <AiOutlineShopping onClick={() => dispatch(cartActions.addItem(data))} />
                    </button>
                    <button className='mx-2 w-[36px] h-[36px] flex-center bg-white rounded-full text-[18px] text-[#000] shadow-md cursor-pointer'>
                        <BsMessenger />
                    </button>
                </div>
                <div className=" absolute bottom-full left-0 right-0 bg-black/50 overflow-hidden w-full h-0 transition-all !duration-500 group-hover:bottom-0 group-hover:h-full justify-center items-center hidden md:flex">
                    <button onClick={() => router.push(`/products/${data._id}`)} className="bg-[#000] text-white text-center w-[80%] inline-block bg-transparent text-[16px] border-[1px] border-solid border-[#fff] py-2 px-5 hover:bg-[#fff] hover:text-[#000] font-semibold">XEM THÊM</button>
                </div>
            </div>
            <div className='py-3 px-2 flex justify-between items-center max-lg:flex-col text-[14px] font-bold text-[#8A8A8F] space-y-2'>
                <p>{data.title}</p>
                <h6 className='text-[16px] font-bold text-[#111111]'>{data.price.toLocaleString()}₫</h6>
            </div>
        </Link>
    )
}

export default ProductCard