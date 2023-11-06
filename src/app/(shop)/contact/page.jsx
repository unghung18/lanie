import React from 'react'

const Page = () => {
    return (
        <div className='p-5'>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.9315928999968!2d105.78895861515169!3d21.0354229699936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab49b397db01%3A0xb22530c857017112!2zNDIgUC4gVHLGsMahbmcgQ8O0bmcgR2lhaSwgROG7i2NoIFbhu41uZywgQ-G6p3UgR2nhuqV5LCBIw6AgTuG7mWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1699080680224!5m2!1svi!2s"
                allowFullScreen=""
                loading="lazy"
                className='w-[100%] md:w-[90%] h-[600px] mx-auto rounded-lg'
                referrerPolicy="no-referrer-when-downgrade">
            </iframe>
        </div>
    )
}

export default Page