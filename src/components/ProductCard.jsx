import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Loader from './Loader';

const ProductCard = ({ data }) => {

    const router = useRouter();

    return (
        <>
            {data ?
                <Link href={`/products/${data._id}`}>
                    <div className='relative group'>
                        {data.sale != "0" && <span className='absolute right-[16px] top-[14px] text-[10px] font-bold text-white bg-[#50e550] rounded-[15px] px-2 pt-1'>ON SALE</span>}
                        <img src={data.image[0]} alt={data.title} />
                        <div className=" absolute bottom-full left-0 right-0 bg-black/50 overflow-hidden w-full h-0 transition-all !duration-500 group-hover:bottom-0 group-hover:h-full justify-center items-center hidden md:flex">
                            <button onClick={() => router.push(`/products/${data._id}`)} className="bg-[#000] text-white text-center w-[80%] inline-block bg-transparent text-[16px] border-[1px] border-solid border-[#fff] py-2 px-5 hover:bg-[#fff] hover:text-[#000] font-semibold">XEM THÊM</button>
                        </div>
                    </div>
                    <div className='py-3 px-2 flex justify-between items-center max-lg:flex-col text-[14px] font-bold text-[#8A8A8F] space-y-2'>
                        <p>{data.title}</p>
                        <h6 className='text-[16px] font-bold text-[#111111]'>{data.price.toLocaleString()}₫</h6>
                    </div>
                </Link>
                :
                <div>
                    <Loader />
                </div>
            }
        </>
    )
}

export default ProductCard