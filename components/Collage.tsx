import React from 'react'
import Gallery from "react-photo-gallery";
import { photos } from "../public/photos";
import Navbar from './Navbar';

const Collage = () => {
  const BasicRows = () => <Gallery photos={photos} />;

  return (
    <div className='max-w-[1856px] mx-auto'>
        <BasicRows />
    </div>
  )
}

export default Collage