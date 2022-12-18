import React from 'react'
import Collage from '../components/Collage'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const ImageCollage = () => {
    return (
        <div className='bg-gradient-to-tr from-slate-800 to-neutral-900'>
            <Navbar />
            <h1 className='text-3xl my-10 font-mono font-bold text-white text-center lg:text-5xl'>IMAGE COLLAGE</h1>
            <Collage />
            <Footer />
        </div>
    )
}

export default ImageCollage