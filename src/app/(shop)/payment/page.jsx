'use client'
import { useSession } from 'next-auth/react';
import React from 'react';
import { redirect } from 'next/navigation';
import { BiSolidDownArrow } from "react-icons/bi";

const Page = () => {
    const session = useSession();
    if (session.status === "unauthenticated") {
        redirect("/login")
    }
    return (
        <div className='px-5 max-w-[1280px] mx-auto grid grid-cols-2 gap-5 py-10'>
            <form className=' space-y-3'>
                <input type="text" placeholder='Họ và tên' className='w-full placeholder:font-extralight placeholder:text-gray-500 outline-none border-2 p-2 rounded-md border-gray-400 text-[#333333] shadow-sm focus:border-[#338dbc] focus:border-2' />
                <div className='grid grid-cols-10'>
                    <input type="text" placeholder='Email' className='col-span-7 placeholder:font-extralight placeholder:text-gray-500 outline-none border p-2 rounded-md border-gray-400 mr-3 text-[#333333] shadow-sm focus:border-[#338dbc] focus:border-2' />
                    <input type="text" placeholder='Điện thoại' className='col-span-3 placeholder:font-extralight placeholder:text-gray-500 outline-none border p-2 rounded-md border-gray-400 text-[#333333] shadow-sm focus:border-[#338dbc] focus:border-2' />
                </div>
                <input type="text" placeholder='Địa chỉ' className='w-full placeholder:font-extralight placeholder:text-gray-500 outline-none border p-2 rounded-md border-gray-400 text-[#333333] shadow-sm focus:border-[#338dbc] focus:border-2' />
                <div className='grid grid-cols-3 gap-5'>
                    <div className='p-2 border rounded-md border-gray-400 flex items-center space-x-3 focus:border-[#338dbc] focus:border-2'>
                        <div className='flex flex-col'>
                            <label htmlFor='city' className='text-gray-500 font-thin'>Tỉnh</label>
                            <select id="city" className='outline-none'>
                                <option value="" selected>Chọn tỉnh thành</option>
                            </select>
                        </div>
                        <div className='w-[1px] h-7 bg-black'>
                        </div>
                        <BiSolidDownArrow color='#333' />
                    </div>
                    <div htmlFor="district" className='p-2 border rounded-md border-gray-400 flex items-center space-x-3 target:border-[#338dbc]'>
                        <div className='flex flex-col'>
                            <label htmlFor='district' className='text-gray-500 font-thin'>Quận/Huyện</label>
                            <select id="district" className='outline-none'>
                                <option value="" selected>Chọn quận huyện</option>
                            </select>
                        </div>
                        <div className='w-[1px] h-7 bg-black'>
                        </div>
                        <BiSolidDownArrow color='#333' />
                    </div>
                    <div className='p-2 border rounded-md border-gray-400 flex items-center space-x-3 focus:border-[#338dbc] focus:border-2'>
                        <div className='flex flex-col'>
                            <label htmlFor='ward' className='text-gray-500 font-thin'>Phường/Xã</label>
                            <select id="ward" className='outline-none'>
                                <option value="" selected>Chọn phường xã</option>
                            </select>
                        </div>
                        <div className='w-[1px] h-7 bg-black'>
                        </div>
                        <BiSolidDownArrow color='#333' />
                    </div>
                </div>
            </form>
            <div>

            </div>
        </div>
    )
}

export default Page