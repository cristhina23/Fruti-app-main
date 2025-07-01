import React from 'react'
import { FaArrowLeft } from "react-icons/fa";
import Header from './Header';
import  Bill  from '../img/payment-succsess.jpg';
import { motion } from 'framer-motion';
import { buttonClick } from '../animations';
import { NavLink } from 'react-router-dom';


const CheckOutSuccess = () => {
  return (
    <main className='w-screen min-h-screen flex items-center justify-start flex-col'>
      <Header />
      <div className='w-full flex  items-center justify-center px-6 md:px-24 2xl:px-96 gap-12 pb-24'>
        <img src={Bill} alt="Thank You payment success"  className='w-300 md:w-508'/>

        <div className='flex flex-col items-center justify-center text-center gap-12'>
          <h1 className='text-[50px] text-headingColor font-bold'>Amount Paid Successfully</h1>

        <motion.button {...buttonClick}>
          <NavLink to='/'
          className='flex items-center justify-center gap-4 cursor-pointer text-2xl text-textColor font-semibold px-4 py-2 rounded-md border border-gray-300 hover:shadow-md hover:scale-105 transition-all duration-300 ease-in-out'
          >
            
            <FaArrowLeft className='text-3xl text-textColor' />
            Get back to Home
          </NavLink>
        </motion.button>
        </div>
      </div>
    </main>
  );
};

export default CheckOutSuccess