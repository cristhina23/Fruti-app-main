import React from 'react'
import { NavLink } from 'react-router-dom';
import Logo from '../img/logo.png'
import { isActiveStyles, isNoActiveStyles } from '../utils/styles';

const DBLeftSection = () => {
  return (
    <div className='h-full  py-4 flex flex-col bg-lightOverlay backdrop-blur-md shadow-md min-w-210 w-64 gap-3'>
      <NavLink to='/' className='flex items-center justify-start px-4  gap-2'>
          <img src={Logo} className='w-10 object-cover' alt="logo" />
          <p className='text-headingColor text-xl font-bold'>Fruty</p>
        </NavLink>

        <hr className='border-gray-400' />

        <ul className='flex flex-col gap-2'>
          <NavLink to='/dashboard/home' className={({ isActive }) => isActive ? `${isActiveStyles} px-2 py-2 border-l-8 border-red-500` : isNoActiveStyles}> 
            Home
            </NavLink>
            <NavLink to='/dashboard/orders' className={({ isActive }) => isActive ? `${isActiveStyles} px-2 py-2 border-l-8 border-red-500` : isNoActiveStyles}> 
            Orders
            </NavLink>
            

            <div className='w-full items-center justify-center flex h-56  px-2 mt-6'>
              <div className='w-[90%] h-[80%] rounded-md bg-red-400 flex items-center flex-col gap-3 px-2'>
                <div className='w-8 h-8 borde bg-white rounded-full flex items-center justify-center mt-2'>
                  <p className='text-sm font-bold text-red-500'>?</p>
                </div>
                <p className='text-sm text-primary font-semibold'>Help Center</p>
                <p className='text-xs text-gray-300 text-center'>
                  Having trouble in city. Please contac us for mor cuestions.
                </p>
                <p className='px-3 py-2 rounded-full bg-primary text-sm text-red-400 cursor-pointer'>Get in touch</p>
              </div>
            </div>
        </ul>
    </div>
  )
}

export default DBLeftSection