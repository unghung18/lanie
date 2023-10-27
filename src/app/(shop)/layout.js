import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'

const ShopLayout = ({ children }) => {
    return (
        <>
            <Navbar />
            <div className="mt-[68px] md:mt-[78.5px]">
                {children}
            </div>
            <Footer />
        </>
    )
}

export default ShopLayout