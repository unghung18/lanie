import React from 'react'
import Link from 'next/link';
import payImg from '../assets/payImage.webp';
import { FaFacebookF, FaInstagram, FaTiktok, FaTwitter } from 'react-icons/fa';
import Image from 'next/image';

const Footer = () => {
    return (
        <div className='bg-[#282828] py-[60px]'>
            <div className='mb-[60px] text-center text-white text-3xl font-bold'>
                <h1>Lanie</h1>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 max-w-[1280px] mx-auto'>
                <div className='px-4 mb-[60px] text-[#8f8f8f]'>
                    <h2 className="text-[18px] font-bold text-white mb-[45px]">ABOUT</h2>
                    <p>Donec vitae purus nunc. Morbi faucibus erat sit amet congue mattis. Nullam frin-gilla faucibus
                        urna, id dapibus erat iaculis ut. Integer ac sem.
                    </p>
                    <Image src={payImg} alt='pay-img' className="w-[70%] mt-[50px]" />
                </div>
                <div className='px-4 mb-[60px] text-[#8f8f8f]'>
                    <h2 className="text-[18px] font-bold text-white mb-[45px]">Giải Đáp</h2>
                    <ul>
                        <li><Link href="/" className=" inline-block relative pl-5 text-[14px] text-[#8f8f8f] mb-1 hover:text-white after:absolute after:content-[''] after:w-[5px] after:h-[5px] after:left-0 after:top-2 after:border-[1px] after:border-solid after:border-[#ec105a] after:rounded-full after:transition-all hover:after:w-[7px] hover:after:h-[7px] hover:after:top-[6px] hover:after:bg-[#ec105a]">Chính sách giao nhận - Vận chuyển</Link></li>
                        <li><Link href="/" className=" inline-block relative pl-5 text-[14px] text-[#8f8f8f] mb-1 hover:text-white after:absolute after:content-[''] after:w-[5px] after:h-[5px] after:left-0 after:top-2 after:border-[1px] after:border-solid after:border-[#ec105a] after:rounded-full after:transition-all hover:after:w-[7px] hover:after:h-[7px] hover:after:top-[6px] hover:after:bg-[#ec105a]">Hướng dẫn thanh toán</Link></li>
                        <li><Link href="/" className=" inline-block relative pl-5 text-[14px] text-[#8f8f8f] mb-1 hover:text-white after:absolute after:content-[''] after:w-[5px] after:h-[5px] after:left-0 after:top-2 after:border-[1px] after:border-solid after:border-[#ec105a] after:rounded-full after:transition-all hover:after:w-[7px] hover:after:h-[7px] hover:after:top-[6px] hover:after:bg-[#ec105a]">Tra cứu đơn hàng</Link></li>
                        <li><Link href="/" className=" inline-block relative pl-5 text-[14px] text-[#8f8f8f] mb-1 hover:text-white after:absolute after:content-[''] after:w-[5px] after:h-[5px] after:left-0 after:top-2 after:border-[1px] after:border-solid after:border-[#ec105a] after:rounded-full after:transition-all hover:after:w-[7px] hover:after:h-[7px] hover:after:top-[6px] hover:after:bg-[#ec105a]">Hướng dẫn chọn Size</Link></li>
                        <li><Link href="/" className=" inline-block relative pl-5 text-[14px] text-[#8f8f8f] mb-1 hover:text-white after:absolute after:content-[''] after:w-[5px] after:h-[5px] after:left-0 after:top-2 after:border-[1px] after:border-solid after:border-[#ec105a] after:rounded-full after:transition-all hover:after:w-[7px] hover:after:h-[7px] hover:after:top-[6px] hover:after:bg-[#ec105a]">Quy định đổi hàng</Link></li>
                        <li><Link href="/" className=" inline-block relative pl-5 text-[14px] text-[#8f8f8f] mb-1 hover:text-white after:absolute after:content-[''] after:w-[5px] after:h-[5px] after:left-0 after:top-2 after:border-[1px] after:border-solid after:border-[#ec105a] after:rounded-full after:transition-all hover:after:w-[7px] hover:after:h-[7px] hover:after:top-[6px] hover:after:bg-[#ec105a]">Quy định bảo hành và sửa chữa</Link></li>
                        <li><Link href="/" className=" inline-block relative pl-5 text-[14px] text-[#8f8f8f] mb-1 hover:text-white after:absolute after:content-[''] after:w-[5px] after:h-[5px] after:left-0 after:top-2 after:border-[1px] after:border-solid after:border-[#ec105a] after:rounded-full after:transition-all hover:after:w-[7px] hover:after:h-[7px] hover:after:top-[6px] hover:after:bg-[#ec105a]">Khách hàng thân thiết</Link></li>
                    </ul>
                </div >
                <div className='px-4 mb-[60px] text-[#8f8f8f]'>
                    <h2 className="text-[18px] font-bold text-white mb-[45px]">Giới Thiệu</h2>
                    <ul>
                        <li><Link href="/" className=" inline-block relative pl-5 text-[14px] text-[#8f8f8f] mb-1 hover:text-white after:absolute after:content-[''] after:w-[5px] after:h-[5px] after:left-0 after:top-2 after:border-[1px] after:border-solid after:border-[#ec105a] after:rounded-full after:transition-all hover:after:w-[7px] hover:after:h-[7px] hover:after:top-[6px] hover:after:bg-[#ec105a]">Giới thiệu</Link></li>
                        <li><Link href="/" className=" inline-block relative pl-5 text-[14px] text-[#8f8f8f] mb-1 hover:text-white after:absolute after:content-[''] after:w-[5px] after:h-[5px] after:left-0 after:top-2 after:border-[1px] after:border-solid after:border-[#ec105a] after:rounded-full after:transition-all hover:after:w-[7px] hover:after:h-[7px] hover:after:top-[6px] hover:after:bg-[#ec105a]">NgocAnh's Blog</Link></li>
                        <li><Link href="/" className=" inline-block relative pl-5 text-[14px] text-[#8f8f8f] mb-1 hover:text-white after:absolute after:content-[''] after:w-[5px] after:h-[5px] after:left-0 after:top-2 after:border-[1px] after:border-solid after:border-[#ec105a] after:rounded-full after:transition-all hover:after:w-[7px] hover:after:h-[7px] hover:after:top-[6px] hover:after:bg-[#ec105a]">Tuyển dụng</Link></li>
                        <li><Link href="/" className=" inline-block relative pl-5 text-[14px] text-[#8f8f8f] mb-1 hover:text-white after:absolute after:content-[''] after:w-[5px] after:h-[5px] after:left-0 after:top-2 after:border-[1px] after:border-solid after:border-[#ec105a] after:rounded-full after:transition-all hover:after:w-[7px] hover:after:h-[7px] hover:after:top-[6px] hover:after:bg-[#ec105a]">Showroom</Link></li>
                        <li><Link href="/" className=" inline-block relative pl-5 text-[14px] text-[#8f8f8f] mb-1 hover:text-white after:absolute after:content-[''] after:w-[5px] after:h-[5px] after:left-0 after:top-2 after:border-[1px] after:border-solid after:border-[#ec105a] after:rounded-full after:transition-all hover:after:w-[7px] hover:after:h-[7px] hover:after:top-[6px] hover:after:bg-[#ec105a]">Liên hệ</Link></li>
                    </ul>
                </div>
                <div className='px-4 mb-[60px] text-[#8f8f8f] contact-widget'>
                    <h2 className="text-[18px] font-bold text-white mb-[45px]">Liên Hệ</h2>
                    <ul>
                        <li className='text-[14px] text-[#8f8f8f]'>
                            <span className='text-[#f51167] mr-4 text-[18px]'>Tên thương hiệu: </span>Lanie Shop
                        </li>
                        <li className='text-[14px] text-[#8f8f8f]'>
                            <span className='text-[#f51167] mr-4 text-[18px]'>Địa chỉ: </span>Thôn Đông Thành, Trường Yên, Hoa Lư, Ninh Bình
                        </li>
                        <li className='text-[14px] text-[#8f8f8f]'>
                            <span className='text-[#f51167] mr-4 text-[18px]'>Hotline: </span>0966976692
                        </li>
                        <li className='text-[14px] text-[#8f8f8f]'>
                            <span className='text-[#f51167] mr-4 text-[18px]'>Email: </span>ngocanh1997vn@gmail.com
                        </li>
                    </ul>
                </div>
            </div >
            <div className='max-w-[1280px] mx-auto border-t-[2px] border-solid border-[#3b3535] pt-[46px] hidden justify-center md:flex'>
                <Link href='' className='flex-center px-[30px]'>
                    <FaFacebookF className='text-[30px] text-[#d7d7d7] mr-[19px]' />
                    <span className='inline-block text-xs font-semibold uppercase text-[#9f9fa0]'>Facebook</span>
                </Link>
                <Link href='' className='flex-center px-[30px]'>
                    <FaInstagram className='text-[30px] text-[#d7d7d7] mr-[19px]' />
                    <span className='inline-block text-xs font-semibold uppercase text-[#9f9fa0]'>Instagram</span>
                </Link>
                <Link href='' className='flex-center px-[30px]'>
                    <FaTiktok className='text-[30px] text-[#d7d7d7] mr-[19px]' />
                    <span className='inline-block text-xs font-semibold uppercase text-[#9f9fa0]'>TikTok</span>
                </Link>
                <Link href='' className='flex-center px-[30px]'>
                    <FaTwitter className='text-[30px] text-[#d7d7d7] mr-[19px]' />
                    <span className='inline-block text-xs font-semibold uppercase text-[#9f9fa0]'>Twitter</span>
                </Link>
            </div>
            <div className='pt-[50px] text-white text-center'>
                <p>Cory right ©2023 All rights reserved</p>
            </div>
        </div >
    )
}

export default Footer