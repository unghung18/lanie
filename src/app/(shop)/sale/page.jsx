'use client'
import ProductCard from '@/components/ProductCard';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';

import { BsSliders2Vertical, BsChevronUp } from "react-icons/bs";

const Sale = () => {
    const [showFilter, setShowFilter] = useState(false);
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
            queryParams.delete(checkbox.name);
        } else {
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
        router.push("/sale")
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
            if (typeof window !== "undefined") {
                queryParams = new URLSearchParams(window.location.search);
            }
            const res = await fetch(`/api/product/sale?${queryParams.toString()}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
            })
            const data = await res.json()
            console.log(data)
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
                <div className={`md:w-[300px] border-l-[0.5px] border-r-[0.5px] max-md:absolute z-50 bg-white h-full ${showFilter ? "max-md:w-[250px]" : "w-0 max-md:invisible"}`}>
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
                            className={`py-3 px-5 cursor-pointer ${category && category == "ao" ? "bg-purple-50" : ""}`}
                            onClick={() => handleCategory('ao')}
                        >
                            Áo
                        </span>
                        <span
                            className={`py-3 px-5 cursor-pointer ${category == "quan" ? "bg-purple-50" : ""}`}
                            onClick={() => handleCategory('quan')}
                        >
                            Quần
                        </span>
                        <span
                            className={`py-3 px-5 cursor-pointer ${category == "chan vay" ? 'bg-purple-50' : ''}`}
                            onClick={() => handleCategory('chan vay')}
                        >
                            Chân váy
                        </span>
                        <span
                            className={`py-3 px-5 cursor-pointer ${category == "pants" ? 'bg-purple-50' : ''}`}
                            onClick={() => handleCategory('dam')}
                        >
                            Đầm
                        </span>
                        <span
                            className={`py-3 px-5 cursor-pointer ${category == "ao dai" ? 'bg-purple-50' : ''}`}
                            onClick={() => handleCategory('ao dai')}
                        >
                            Áo dài
                        </span>
                        <span
                            className={`py-3 px-5 cursor-pointer ${category == "quan jeans" ? 'bg-purple-50' : ''}`}
                            onClick={() => handleCategory('quan jeans')}
                        >
                            Quần Jeans
                        </span>
                        <span
                            className={`py-3 px-5 cursor-pointer ${category == "so mi" ? 'bg-purple-50' : ''}`}
                            onClick={() => handleCategory('so mi')}
                        >
                            Sơ mi
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
                                            value="0:500000"
                                            className="h-4 w-4"
                                            defaultChecked={checkHandler("price", "0:500000")}
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
                                            value="500000:1000000"
                                            className="h-4 w-4"
                                            defaultChecked={checkHandler("price", "500000:1000000")}
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
                                            value="1000000:2000000"
                                            className="h-4 w-4"
                                            defaultChecked={checkHandler("price", "1000000:2000000")}
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
                                            value="2000000:10000000"
                                            className="h-4 w-4"
                                            defaultChecked={checkHandler("price", "2000000:10000000")}
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
                                className={`border-[0.5px] rounded-lg text-center text-[14px] py-[2px] cursor-pointer ${size === "size2" ? 'bg-neutral-900 text-white' : ''}`}
                                onClick={() => handleSize('size2')}
                            >
                                Size 2
                            </li>
                            <li
                                className={`border-[0.5px] rounded-lg text-center text-[14px] py-[2px] cursor-pointer ${size === "size4" ? 'bg-neutral-900 text-white' : ''}`}
                                onClick={() => handleSize('size4')}
                            >
                                Size 4
                            </li>
                            <li
                                className={`border-[0.5px] rounded-lg text-center text-[14px] py-[2px] cursor-pointer ${size === "size6" ? 'bg-neutral-900 text-white' : ''}`}
                                onClick={() => handleSize('size6')}
                            >
                                Size 6
                            </li>
                            <li
                                className={`border-[0.5px] rounded-lg text-center text-[14px] py-[2px] cursor-pointer ${size === "size8" ? 'bg-neutral-900 text-white' : ''}`}
                                onClick={() => handleSize('size8')}
                            >
                                Size 8
                            </li>
                            <li
                                className={`border-[0.5px] rounded-lg text-center text-[14px] py-[2px] cursor-pointer ${size === "size10" ? 'bg-neutral-900 text-white' : ''}`}
                                onClick={() => handleSize('size10')}
                            >
                                Size 10
                            </li>
                            <li
                                className={`border-[0.5px] rounded-lg text-center text-[14px] py-[2px] cursor-pointer ${size === "size12" ? 'bg-neutral-900 text-white' : ''}`}
                                onClick={() => handleSize('size12')}
                            >
                                Size 12
                            </li>
                        </ul>
                    </div>
                </div>
                <div onClick={() => setShowFilter(!showFilter)} className={`${showFilter ? "top-[20px] right-[-292px]" : "top-[20px] right-[-42px]"} absolute md:hidden  z-50 rotate-90 bg-gray-400 text-white px-2 rounded-t-sm cursor-pointer`}>Filters</div>
            </div>
            <div className='flex-1 p-6'>
                {products.length == 0 ?
                    <div className='flex-center w-full'>Không tìm thấy sản phẩm nào</div>
                    :
                    <div className='grid grid-cols-2 lg:grid-cols-3 gap-3'>
                        {products.map((item) => (
                            <ProductCard data={item} key={item._id} />
                        ))}
                    </div>
                }
            </div>
        </div>
    )
}

export default Sale