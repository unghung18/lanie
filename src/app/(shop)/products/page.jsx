'use client'
import ProductCard from '@/components/ProductCard';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';

import { BsSliders2Vertical, BsChevronUp } from "react-icons/bs";

const Products = () => {
    const [showFilter, setShowFilter] = useState(true);
    const [products, setProducts] = useState([])

    const router = useRouter();
    const SearchParams = useSearchParams();

    const category = SearchParams.get("category");
    const size = SearchParams.get("size");
    const price = SearchParams.get("price");
    const color = SearchParams.get("color");


    let queryParams;

    const colorData = [
        {
            value: "#000"
        },
        {
            value: "#666"
        },
    ]

    function handleClick(checkbox) {
        if (typeof window !== "undefined") {
            queryParams = new URLSearchParams(window.location.search);
        }

        const checkboxes = document.getElementsByName(checkbox.name);

        checkboxes.forEach((item) => {
            if (item !== checkbox) item.checked = false;
        });

        if (checkbox.checked === false) {
            // Delete the filter from query
            queryParams.delete(checkbox.name);
        } else {
            // Set filter in the query
            if (queryParams.has(checkbox.name)) {
                queryParams.set(checkbox.name, checkbox.value);
            } else {
                queryParams.append(checkbox.name, checkbox.value);
            }
        }
        const path = window.location.pathname + "?" + queryParams.toString();
        router.push(path, { scroll: false });
    }

    const handleCategory = (cate) => {
        if (typeof window !== "undefined") {
            queryParams = new URLSearchParams(window.location.search);
        }

        if (queryParams.has("category")) {
            queryParams.set("category", cate);
        } else {
            queryParams.append("category", cate);
        }

        const path = window.location.pathname + "?" + queryParams.toString();
        router.push(path, { scroll: false });
    }
    const handleColor = (cl) => {
        if (typeof window !== "undefined") {
            queryParams = new URLSearchParams(window.location.search);
        }

        if (queryParams.has("color")) {
            if (queryParams.get("color") == cl) {
                queryParams.delete("color");
            }
            else {
                queryParams.set("color", cl);
            }
        } else {
            queryParams.append("color", cl);
        }

        const path = window.location.pathname + "?" + queryParams.toString();
        router.push(path, { scroll: false });
    }
    const handleSize = (sz) => {
        if (typeof window !== "undefined") {
            queryParams = new URLSearchParams(window.location.search);
        }

        if (queryParams.has("size")) {
            if (queryParams.get("size") == sz) {
                queryParams.delete("size");
            }
            else {
                queryParams.set("size", sz);
            }
        } else {
            queryParams.append("size", sz);
        }

        const path = window.location.pathname + "?" + queryParams.toString();
        router.push(path, { scroll: false });
    }


    const handleFindAll = () => {
        if (typeof window !== "undefined") {
            queryParams = new URLSearchParams(window.location.search);
        }

        const checkboxes = document.getElementsByName("price");

        checkboxes.forEach((item) => {
            item.checked = false;
        });
        router.push("/products")
    }

    function checkHandler(checkBoxType, checkBoxValue) {
        if (typeof window !== "undefined") {
            queryParams = new URLSearchParams(window.location.search);

            const value = queryParams.get(checkBoxType);
            if (checkBoxValue === value) return true;
            return false;
        }
    }

    const getAllProducts = async () => {
        try {
            const res = await fetch("/api/product", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            })
            const data = await res.json()
            if (data.success) {
                setProducts(data.data)
            }
            else {
                alert(data.message)
            }
        } catch (error) {
            alert(error)
        }
    }
    useEffect(() => {
        getAllProducts();
    }, [category, price, size, color]);

    return (
        <div className='flex'>
            <div className='relative'>
                <div className={`md:w-[300px] border-l-[0.5px] border-r-[0.5px] ${showFilter ? "max-md:w-[250px]" : "w-0 max-md:invisible"}`}>
                    <div className='flex items-center justify-between px-5 py-4 border-b-[0.5px]'>
                        <h1 className='text-neutral-800'>Filters</h1>
                        <BsSliders2Vertical size={20} className='text-neutral-600' />
                    </div>
                    <div className='flex flex-col tet-sm text-neutral-600 border-b-[0.5px]'>
                        <span
                            className={`py-3 px-5 cursor-pointer ${category ? "" : "bg-purple-50"}`}
                            onClick={handleFindAll}
                        >
                            Tất cả sản phẩm
                        </span>
                        <span
                            className={`py-3 px-5 cursor-pointer ${category && category == "blouses" ? "bg-purple-50" : ""}`}
                            onClick={() => handleCategory('blouses')}
                        >
                            Blouses
                        </span>
                        <span
                            className={`py-3 px-5 cursor-pointer ${category == "shirt" ? "bg-purple-50" : ""}`}
                            onClick={() => handleCategory('shirt')}
                        >
                            Shirt
                        </span>
                        <span
                            className={`py-3 px-5 cursor-pointer ${category == "party" ? 'bg-purple-50' : ''}`}
                            onClick={() => handleCategory('party')}
                        >
                            Party
                        </span>
                        <span
                            className={`py-3 px-5 cursor-pointer ${category == "pants" ? 'bg-purple-50' : ''}`}
                            onClick={() => handleCategory('pants')}
                        >
                            Pants
                        </span>
                        <span
                            className={`py-3 px-5 cursor-pointer ${category == "skirts" ? 'bg-purple-50' : ''}`}
                            onClick={() => handleCategory('skirts')}
                        >
                            Skirts
                        </span>
                        <span
                            className={`py-3 px-5 cursor-pointer ${category == "tops&tees" ? 'bg-purple-50' : ''}`}
                            onClick={() => handleCategory('tops&tees')}
                        >
                            Tops&tees
                        </span>
                        <span
                            className={`py-3 px-5 cursor-pointer ${category == "jackets&Coats" ? 'bg-purple-50' : ''}`}
                            onClick={() => handleCategory('jackets&Coats')}
                        >
                            Jackets&Coats
                        </span>
                    </div>
                    <div className='border-b-[0.5px] pb-10'>
                        <div className='flex items-center justify-between px-5 py-4 border-b-[0.5px] mb-5'>
                            <h1 className='text-neutral-800'>Prices</h1>
                            <BsChevronUp size={18} className='text-neutral-600' />
                        </div>
                        <div className='px-5 text-[15px]'>
                            <ul className="space-y-1">
                                <li>
                                    <label className="flex items-center cursor-pointer">
                                        <input
                                            name="price"
                                            type="checkbox"
                                            value="0:max"
                                            className="h-4 w-4"
                                            defaultChecked={checkHandler("price", "0:max")}
                                            onClick={(e) => handleClick(e.target)}
                                        />
                                        <span className="ml-2 text-gray-500"> Tất cả </span>
                                    </label>
                                </li>
                                <li>
                                    <label className="flex items-center cursor-pointer">
                                        <input
                                            name="price"
                                            type="checkbox"
                                            value="0:500"
                                            className="h-4 w-4"
                                            defaultChecked={checkHandler("price", "0:500")}
                                            onClick={(e) => handleClick(e.target)}
                                        />
                                        <span className="ml-2 text-gray-500">Nhỏ hơn 500,000₫</span>
                                    </label>
                                </li>
                                <li>
                                    <label className="flex items-center cursor-pointer">
                                        <input
                                            name="price"
                                            type="checkbox"
                                            value="500:1000"
                                            className="h-4 w-4"
                                            defaultChecked={checkHandler("price", "500:1000")}
                                            onClick={(e) => handleClick(e.target)}
                                        />
                                        <span className="ml-2 text-gray-500">Từ 500,000₫ - 1,000,000₫</span>
                                    </label>
                                </li>
                                <li>
                                    <label className="flex items-center cursor-pointer">
                                        <input
                                            name="price"
                                            type="checkbox"
                                            value="1000:2000"
                                            className="h-4 w-4"
                                            defaultChecked={checkHandler("price", "1000:2000")}
                                            onClick={(e) => handleClick(e.target)}
                                        />
                                        <span className="ml-2 text-gray-500">Từ 1,000,000₫ - 2,000,000₫</span>
                                    </label>
                                </li>
                                <li>
                                    <label className="flex items-center cursor-pointer">
                                        <input
                                            name="price"
                                            type="checkbox"
                                            value="2000:max"
                                            className="h-4 w-4"
                                            defaultChecked={checkHandler("price", "2000:max")}
                                            onClick={(e) => handleClick(e.target)}
                                        />
                                        <span className="ml-2 text-gray-500">Lớn hơn 2,000,000₫</span>
                                    </label>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='border-b-[0.5px]'>
                        <div className='flex items-center justify-between px-5 py-4 border-b-[0.5px] mb-5'>
                            <h1 className='text-neutral-800'>Colors</h1>
                        </div>
                        <ul className='grid grid-cols-4 px-5 gap-5 mb-4'>
                            {colorData.map((e, index) => (
                                <li
                                    key={index}
                                    className={`flex-center w-[40px] h-[40px] rounded-2xl border-[0.5px] border-neutral-300 cursor-pointer ${color == e.value ? "shadow-2xl" : ""}`}
                                    style={{ backgroundColor: `${e.value}` }}
                                    onClick={() => handleColor(`${e.value}`)}
                                >
                                    {color == e.value && <span className='text-[#fff]'>✓</span>}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='sizes'>
                        <div className='flex items-center justify-between px-5 py-4 border-b-[0.5px]'>
                            <h1 className='text-neutral-800'>Sizes</h1>
                        </div>
                        <ul className='grid grid-cols-4 p-5 gap-5'>
                            <li
                                className={`border-[0.5px] rounded-lg text-center text-[14px] py-[2px] cursor-pointer ${size === "sm" ? 'bg-neutral-900 text-white' : ''}`}
                                onClick={() => handleSize('sm')}
                            >
                                SM
                            </li>
                            <li
                                className={`border-[0.5px] rounded-lg text-center text-[14px] py-[2px] cursor-pointer ${size === "md" ? 'bg-neutral-900 text-white' : ''}`}
                                onClick={() => handleSize('md')}
                            >
                                MD
                            </li>
                            <li
                                className={`border-[0.5px] rounded-lg text-center text-[14px] py-[2px] cursor-pointer ${size === "xl" ? 'bg-neutral-900 text-white' : ''}`}
                                onClick={() => handleSize('xl')}
                            >
                                XL
                            </li>
                            <li
                                className={`border-[0.5px] rounded-lg text-center text-[14px] py-[2px] cursor-pointer ${size === "2xl" ? 'bg-neutral-900 text-white' : ''}`}
                                onClick={() => handleSize('2xl')}
                            >
                                2XL
                            </li>
                            <li
                                className={`border-[0.5px] rounded-lg text-center text-[14px] py-[2px] cursor-pointer ${size === "3xl" ? 'bg-neutral-900 text-white' : ''}`}
                                onClick={() => handleSize('3xl')}
                            >
                                3XL
                            </li>
                            <li
                                className={`border-[0.5px] rounded-lg text-center text-[14px] py-[2px] cursor-pointer ${size === "4xl" ? 'bg-neutral-900 text-white' : ''}`}
                                onClick={() => handleSize('4xl')}
                            >
                                4XL
                            </li>
                        </ul>
                    </div>
                </div>
                <div onClick={() => setShowFilter(!showFilter)} className='absolute md:hidden top-[20px] right-[-42px] rotate-90 bg-gray-100 px-2 rounded-t-sm cursor-pointer'>Filters</div>
            </div>
            <div className='flex-1 p-6'>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'>
                    {products.map((item) => (
                        <ProductCard data={item} key={item._id} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Products