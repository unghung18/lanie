'use client'
import PaypalCheckoutBtn from '@/components/PaypalCheckoutBtn';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { ToastContainer, toast, Slide } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Page = () => {

    const [divisons, setDivisions] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const [info, setInfo] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });
    /* const [name, setName] = useState();
    const [name, setName] = useState(); */

    /* const [selectedCity, setSelectedCity] = useState();
    const [selectedDistrict, setSelectedDistrict] = useState();
    const [selectedWard, setSelectedWard] = useState(); */

    const [deliveryMethod, setDeliveryMethod] = useState("1");
    const [paymentMethod, setPaymentMethod] = useState("1");
    const [totalPayment, setTotalPayment] = useState(null);

    const { totalAmount } = useSelector(state => state.cart);
    const router = useRouter();

    const getAllDivisions = async () => {
        try {
            const res = await axios.get("https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json")
            setDivisions(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const onChangeDelivaryMethod = (event) => {
        setDeliveryMethod(event.target.value);
    }
    const onChangePaymentMethod = (event) => {
        setPaymentMethod(event.target.value);
    }

    const handleChangeProvince = async (e) => {
        if (e.target.value !== "default") {
            const result = divisons.filter(item => item.Id == e.target.value);
            setDistricts(result[0].Districts);
        }
    }
    const handleChangeDistrict = async (e) => {
        if (e.target.value !== "default") {
            const result = districts.filter(item => item.Id == e.target.value);
            setWards(result[0].Wards);
        }
    }

    const handleChangeInput = (e) => {
        setInfo({ ...info, [e.target.name]: e.target.value })
    }

    const handleOrder = () => {
        console.log(info)
        if (info.name == '' || info.email == '' || info.phone == '' || info.address == '') {
            toast.error("Vui lòng nhập đầy đủ thông tin", {
                theme: "colored"
            })
        }
        else {
            router.push('/checkout/success')
        }
    }

    useEffect(() => {
        getAllDivisions();
    }, []);

    useEffect(() => {
        setTotalPayment(totalAmount)
    }, [totalAmount]);

    return (
        <>
            <div className='px-5 md:px-10 lg:px-40 max-w-[1280px] mx-auto grid md:grid-cols-10 gap-5 py-10 bg-slate-100 grid-cols-1'>
                <div className=' space-y-3 col-span-7 bg-white py-4 px-5'>
                    <h2>Thông tin thanh toán</h2>
                    <input onChange={handleChangeInput} name='name' type="text" placeholder='Họ và tên' className='w-full placeholder:font-extralight placeholder:text-gray-500 outline-none border-2 p-2 rounded-md border-gray-400 text-[#333333] shadow-sm focus:border-[#338dbc] focus:border-2' />
                    <div className='grid grid-cols-10'>
                        <input onChange={handleChangeInput} name='email' type="email" placeholder='Email' className='col-span-7 placeholder:font-extralight placeholder:text-gray-500 outline-none border-2 p-2 rounded-md border-gray-400 mr-3 text-[#333333] shadow-sm focus:border-[#338dbc] focus:border-2' />
                        <input onChange={handleChangeInput} name='phone' type="text" placeholder='Điện thoại' className='col-span-3 placeholder:font-extralight placeholder:text-gray-500 outline-none border-2 p-2 rounded-md border-gray-400 text-[#333333] shadow-sm focus:border-[#338dbc] focus:border-2' />
                    </div>
                    <input onChange={handleChangeInput} name='address' type="text" placeholder='Địa chỉ' className='w-full placeholder:font-extralight placeholder:text-gray-500 outline-none border-2 p-2 rounded-md border-gray-400 text-[#333333] shadow-sm focus:border-[#338dbc] focus:border-2' />
                    <div className='grid grid-cols-3 gap-5'>
                        <div className='p-2 border rounded-md border-gray-400 flex items-center'>
                            <div className='flex flex-col w-full'>
                                <label htmlFor='city' className='text-gray-500 font-thin'>Tỉnh</label>
                                <select id="city" className='outline-none' onChange={handleChangeProvince}>
                                    <option value="default">Chọn tỉnh thành</option>
                                    {divisons && divisons.map((e, i) => (
                                        <option value={e.Id} key={e.Id}>{e.Name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div htmlFor="district" className='p-2 border rounded-md border-gray-400 flex items-center' onChange={handleChangeDistrict}>
                            <div className='flex flex-col w-full'>
                                <label htmlFor='district' className='text-gray-500 font-thin'>Quận/Huyện</label>
                                <select id="district" className='outline-none'>
                                    <option value="">Chọn quận huyện</option>
                                    {districts && districts.map((e, i) => (
                                        <option value={e.Id} key={e.Id}>{e.Name}</option>
                                    ))}
                                </select>
                            </div>

                        </div>
                        <div className='p-2 border rounded-md border-gray-400 flex items-center'>
                            <div className='flex flex-col w-full'>
                                <label htmlFor='ward' className='text-gray-500 font-thin'>Phường/Xã</label>
                                <select id="ward" className='outline-none'>
                                    <option value="default">Chọn phường xã</option>
                                    {wards && wards.map((e, i) => (
                                        <option value={e.Id} key={e.Id}>{e.Name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='grid grid-cols-1 gap-5'>
                        <h3>Chọn phương thức giao hàng</h3>
                        <div className='bg-[rgb(240,248,255)] p-5 border border-[#99CCFF] rounded-md'>
                            <div className=''>
                                <input onChange={onChangeDelivaryMethod} id='delivery1' type="radio" value="1" name="delivery" checked={deliveryMethod === "1"} />
                                <label htmlFor="delivery1"><strong className=' text-yellow-500 ml-3'>FAST</strong> Giao hàng tiết kiệm</label><br />
                                <input onChange={onChangeDelivaryMethod} id='delivery2' type="radio" value="2" name="delivery" checked={deliveryMethod === "2"} />
                                <label htmlFor="delivery2"><strong className=' text-yellow-500 ml-3'>GO_JEK</strong> Giao hàng nhanh chóng</label><br />
                            </div>
                        </div>
                        <h3>Chọn phương thức thanh toán</h3>
                        <div className='bg-[#F0F8FF] p-5 border border-[#99CCFF] rounded-md'>
                            <div className=''>
                                <input onChange={onChangePaymentMethod} id='payment1' type="radio" value="1" name="payment" checked={paymentMethod === "1"} />
                                <label className='ml-3' htmlFor="payment1">Thanh toán tiền mặt khi nhận hàng</label><br />

                                <input onChange={onChangePaymentMethod} id='payment2' type="radio" value="2" name="payment" checked={paymentMethod === "2"} />
                                <label className='ml-3' htmlFor="payment2">Thanh toán khi nhận thẻ tín dụng</label><br />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-span-3 max-h-[400px] flex flex-col gap-3'>
                    <div className='rounded-lg p-5 bg-white'>
                        <div className=' border-b-[#fffff] border-b-2 p-1 mb-4'>Địa chỉ: {info.addressaddress}</div>
                        <div>
                            <div className='flex justify-between items-center'>
                                <p>Tạm tính</p>
                                <strong>{totalPayment?.toLocaleString()} VND</strong>
                            </div>
                            <div className='flex justify-between items-center'>
                                <p>Giảm giá</p>
                                <strong>0 VND</strong>
                            </div>
                            <div className='flex justify-between items-center'>
                                <p>Phí giao hàng</p>
                                <strong>0 VND</strong>
                            </div>
                        </div>
                        <div>
                            <p>Tổng tiền</p>
                            <div className='text-center text-red-500'>
                                <strong>{totalPayment?.toLocaleString()} VND</strong>
                            </div>
                        </div>
                    </div>
                    {
                        paymentMethod === '1' ?
                            <div className='flex-center py-3 px-2 bg-red-500 cursor-pointer rounded-md text-white' onClick={handleOrder}>
                                Đặt hàng
                            </div>
                            :
                            <PaypalCheckoutBtn totalPayment={totalPayment} />
                    }
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={1500}
                limit={5}
                transition={Slide}
            />
        </>
    )
}

export default Page