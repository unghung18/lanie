'use client'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { AiFillEyeInvisible } from 'react-icons/ai';

const Register = () => {

    const router = useRouter();

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [visible, setVisible] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })
            if (res.status === 422) {
                alert("Email already taken");
            }
            router.push('/login');
        } catch (error) {
            alert(error)
        }
    }
    const handleChangeInput = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    return (
        <section className="bg-gray-50 min-h-screen flex items-center justify-center">
            <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
                <div className="px-8 md:px-16">
                    <h2 className="font-bold text-2xl text-[#63d7b0]">Register</h2>
                    <p className="text-xs mt-4 text-[#63d7b0]">If you are not a member, Let's sign up</p>

                    <form action="" className="flex flex-col gap-4 mb-5" autoComplete="on" onSubmit={handleSubmit}>
                        <input className="p-2 mt-8 rounded-xl border focus:outline-[#63d7b0]" type="text" name="name" placeholder="Name" onChange={handleChangeInput} />
                        <input className="p-2 rounded-xl border focus:outline-[#63d7b0]" type="email" name="email" placeholder="E-mail" onChange={handleChangeInput} />
                        <div className="relative">
                            <input className="p-2 rounded-xl border w-full focus:outline-[#63d7b0]" type={visible ? "password" : "text"} name="password" placeholder="Password" onChange={handleChangeInput} autoComplete="off" />
                            <AiFillEyeInvisible className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-600 cursor-pointer" onClick={() => setVisible(!visible)} />
                        </div>
                        <button className="bg-[#63d7b0] rounded-xl text-white py-2 hover:scale-105 duration-300">Register</button>
                    </form>

                    <div className="mt-3 text-xs flex justify-between items-center text-[#63d7b0]">
                        <p>Do you already have an account?</p>
                        <Link href="/login" className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300 ml-2">Login</Link>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default Register