import React from 'react'
import { motion } from 'framer-motion'
import { buttonClick } from '../animations'
import { BsFillBasket2Fill } from "react-icons/bs";

const SliderCard = ({data, i}) => {
  return (
    <div className='bg-lightOverlay hover:drop-shadow-lg backdrop-blur-md rounded-xl flex items-center juctify-center relative gap-3 px-4 py-2 w-full md:w-340 md:min-w-350 '>
      <img src={data?.product_image} alt={data?.title} className='w-40 h-40 object-contain' />
      <div className='relative pt-2'>
        <p className='text-lg text-headingColor font-semibold'>
          {data?.product_name}
        </p>
        <p className='text-lg text-red-500 font-semibold flex items-center justify-center gap-1'>
          <span className='text-sm text-gray-500'>$</span>
          {parseFloat(data?.product_price).toFixed(2)}
        </p>
        <motion.div {...buttonClick} className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center absolute -top-12 -right-12 cursor-pointer">
          <BsFillBasket2Fill className='text-white text-lg'/>
        </motion.div>
      </div>
    </div>
  )
}

export default SliderCard