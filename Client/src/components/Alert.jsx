import React from 'react'
import { fadeInOut } from '../animations';
import { FaCheck } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { BsExclamationTriangleFill, BsInfoCircleFill } from 'react-icons/bs';

const Alert = ({ type, message }) => {
  if (type === 'success') {
    return (
      <div>
        <motion.div {...fadeInOut}
          className='fixed z-50 top-32 right-12 px-4 py-2 rounded-md blockdrop-blur-sm bg-green-300 shadow-md flex items-center gap-4'>
          <FaCheck className='text-xl text-green-600' />
          <p className='text-xl text-green-600' >{message}</p>
        </motion.div>
      </div>
    )
  }

  if (type === 'warning') {
    return (
      <div>
        <motion.div {...fadeInOut}
          className='fixed z-50 top-32 right-12 px-4 py-2 rounded-md blockdrop-blur-sm bg-orange-300 shadow-md flex items-center gap-4'>
          <BsExclamationTriangleFill className='text-xl text-orange-600' />
          <p className='text-xl text-orange-600' >{message}</p>
        </motion.div>
      </div>
    )
  }

  if (type === 'danger') {
    return (
      <div>
        <motion.div {...fadeInOut}
          className='fixed z-50 top-32 right-12 px-4 py-2 rounded-md blockdrop-blur-sm bg-red-300 shadow-md flex items-center gap-4'>
          <BsExclamationTriangleFill className='text-xl text-red-600' />
          <p className='text-xl text-red-600' >{message}</p>
        </motion.div>
      </div>
    )
  }

  if (type === 'info') {
    return (
      <div>
        <motion.div {...fadeInOut}
          className='fixed z-50 top-32 right-12 px-4 py-2 rounded-md blockdrop-blur-sm bg-blue-300 shadow-md flex items-center gap-4'>
          <BsInfoCircleFill className='text-xl text-blue-600' />
          <p className='text-xl text-blue-600' >{message}</p>
        </motion.div>
      </div>
    )
  }
};
export default Alert