'use client';
import React, { useState, useEffect } from 'react';
import { CldUploadWidget } from "next-cloudinary"

const Page = () => {
    const [product, setProduct] = useState({
        title: "",
        price: 0,
        description: "",
        tag: "",
        image: [],
        sale: 0,
        size: [],
        color: [],
        inventory: 0,
    });

    const [selectedSize, setSelectedSize] = useState([]);
    const size = ["size2", "size4", "size6", "size8", "size10", "size12", "size14"]

    const handleChange = (e) => {
        if (e.target.name === "price" && e.target.value !== '' || e.target.name === "inventory" && e.target.value !== '') {
            setProduct({ ...product, [e.target.name]: parseInt(e.target.value) })
        }
        else {
            setProduct({ ...product, [e.target.name]: e.target.value })
        }
    }

    const handleChangeColor = (e) => {
        const color = product.color
        color.push(e.target.value)
        setProduct({ ...product, color: color })
    }

    const handleDeleteColor = (i) => {
        const color = product.color
        const filteredItems = color.filter(item => item !== i)
        setProduct({ ...product, color: filteredItems })
    }

    const handleSizeClick = (size) => {
        setSelectedSize(prev => {
            if (prev.includes(size)) {
                return prev.filter(s => s !== size)
            }
            else {
                return [...prev, size]
            }
        })
    }

    const handleFile = (e) => {
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);

        reader.onload = () => {
            const image = product.image
            image.push(reader.result)
            setProduct({ ...product, image: image })
        }

        reader.onerror = (error) => {
            console.log("Error: ", error)
        }
    }

    const onupload = (result) => {
        const newImageUrl = result.info.secure_url
        const image = product.image
        image.push(newImageUrl)

        setProduct({ ...product, image: image })
    }

    const handleDeleteFile = (i) => {
        const image = product.image
        const filteredItems = image.filter(item => item !== i)
        setProduct({ ...product, image: filteredItems })
    }

    const handleSubmit = async () => {
        try {
            const res = await fetch("/api/product", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(product)
            })
            const data = await res.json()
            if (data.success) {
                alert("Them thanh cong");
                setProduct({
                    title: "",
                    price: 0,
                    description: "",
                    tag: "",
                    image: [],
                    sale: 0,
                    size: [],
                    color: [],
                    inventory: 0,
                })
            }
            else {
                alert(data.message)
            }
        } catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        setProduct({ ...product, size: selectedSize })
    }, [selectedSize]);

    useEffect(() => {
        console.log(product)
    }, [product]);
    return (
        <div className='text-center'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                <div>
                    <label htmlFor="title" className='font-medium'>Title</label>
                    <input
                        type="text"
                        className='w-full h-[50px] border-[1px] rounded-lg focus:border-pink-500 px-3 focus:border-2 outline-none'
                        name="title"
                        value={product.title}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="price" className='font-medium'>Price</label>
                    <input
                        type="Number"
                        className='w-full h-[50px] border-[1px] rounded-lg focus:border-pink-500 px-3 focus:border-2 outline-none'
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="description" className='font-medium'>Description</label>
                    <input
                        type="text"
                        className='w-full h-[50px] border-[1px] rounded-lg focus:border-pink-500 px-3 focus:border-2 outline-none'
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="inventory" className='font-medium'>Inventory</label>
                    <input
                        type="Number"
                        className='w-full h-[50px] border-[1px] rounded-lg focus:border-pink-500 px-3 focus:border-2 outline-none'
                        name="inventory"
                        value={product.inventory}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="color" className='font-medium'>Color</label>
                    <input
                        type="text"
                        className='w-full h-[50px] border-[1px] rounded-lg focus:border-pink-500 px-3 focus:border-2 outline-none'
                        name="color"
                        value={product.color}
                        disabled
                    />
                    <div className='grid grid-cols-2 gap-5 p-5'>
                        <div className='overflow-x-auto h-[200px]'>
                            {product.color.map((item, i) => (
                                <div key={i} className='grid grid-cols-3 gap-2 mb-2 text-center'>
                                    <div style={{ backgroundColor: item }} className='w-[30px] h-[30px] rounded-full'></div>
                                    <span>{item}</span>
                                    <span className='cursor-pointer' onClick={() => handleDeleteColor(item)}>X</span>
                                </div>
                            ))}
                        </div>
                        <div className='flex items-center'>
                            <input
                                id='typeColor'
                                type="color"
                                onBlur={handleChangeColor}
                            />
                            <label htmlFor="typeColor">Choose color</label>
                        </div>
                    </div>
                </div >
                <div className='grid grid-cols-2 gap-5 p-5 items-center'>
                    <div className='flex flex-col h-[200px] overflow-x-auto space-y-2'>
                        {product.image.map((item, i) => (
                            <div className='grid grid-cols-2 gap-5' key={i}>
                                <img src={item} alt='image' />
                                <button onClick={() => handleDeleteFile(item)}>X</button>
                            </div>
                        ))}
                    </div>
                    <CldUploadWidget uploadPreset='ze0kziqp' onUpload={onupload}>
                        {({ open }) => {
                            function handleOnclick(e) {
                                e.preventDefault()
                                open()
                            }
                            return (
                                <button className='border-[1px] rounded-lg p-1 px-2' onClick={handleOnclick}>
                                    Upload Product Images
                                </button>
                            )
                        }}
                    </CldUploadWidget>
                </div>
                <div>
                    <label htmlFor="size" className='font-medium'>Size</label>
                    <input
                        type="text"
                        className='w-full h-[50px] border-[1px] rounded-lg focus:border-pink-500 px-3 focus:border-2 outline-none'
                        name="size"
                        value={product.size}
                        disabled
                    />

                    <div className='grid grid-cols-5 gap-5 text-center py-5'>
                        {size.map((e, i) => (
                            <div className={`rounded-md border cursor-pointer px-1 py-2 ${selectedSize.includes(e) ? "bg-black text-white" : ""}`} key={i} onClick={() => handleSizeClick(e)}>{e}</div>
                        ))}
                    </div>
                </div>
                <div>
                    <label htmlFor="tag" className='font-medium'>Tag</label>
                    <input
                        type="text"
                        className='w-full h-[50px] border-[1px] rounded-lg focus:border-pink-500 px-3 focus:border-2 outline-none'
                        name="tag"
                        value={product.tag}
                        onChange={handleChange}
                    />
                </div>
            </div >
            <button className='border py-2 px-3 rounded-lg text-white bg-blue-500' onClick={handleSubmit}>SAVE PRODUCT</button>
        </div>
    )
}

export default Page