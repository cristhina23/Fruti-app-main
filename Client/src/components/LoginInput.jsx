import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeInOut } from '../animations';


const LoginInput = ({placeholder, icon, inputState, inputStateFunc, type, isSignUp}) => {

  const [isFocus, setIsFocus] = useState(false)
  return (
    <motion.div 
      {...fadeInOut}
      className={`flex items-center justify-center gap-4 bg-lightOverlay blackdrop-blur-md rounded-md w-full py-2 px-4 ${isFocus ? 'shadow-md shadow-red-400' : 'shadow-none'} `}>
      {icon}
      <input 
        type={type} 
        className='w-full h-full bg-transparent text-headingColor text-md font-light border-none outline-none' 
        placeholder={placeholder} 
        value={inputState}
        onChange={(e) => inputStateFunc(e.target.value)}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        />
    </motion.div>
  )
}

export default LoginInput