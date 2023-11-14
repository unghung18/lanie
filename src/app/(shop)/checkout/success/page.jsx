import React from 'react';
import Image from 'next/image';
import successIcon from '../../../../assets/success.png';

const Page = () => {
    return (
        <div className='px-5 max-md:py-5 py-[120px] w-full text-center bg-slate-100'>
            <div className='flex flex-col items-center max-w-[500px] mx-auto bg-white p-5 rounded-md'>
                <Image src={successIcon} width={150} alt='success icon image' />
                <h1 className='font-bold text-[22px] my-5'>Cảm ơn đã đặt hàng</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium eius incidunt exercitationem, nobis doloremque quae nihil odio sit vero atque soluta similique voluptatibus labore earum iste. Perspiciatis fugiat animi iusto.</p>
                <div className='flex justify-between items-center mt-10 space-x-5'>
                    <div className='p-3 rounded-md border border-black cursor-pointer'>Xem các đơn hàng</div>
                    <div className='p-3 rounded-md bg-black text-white cursor-pointer'>Tiếp tục mua sắm</div>
                </div>
            </div>
        </div>
    )
}

export default Page