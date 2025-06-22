import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { MdLogout, MdSearch } from 'react-icons/md';
import { BsFillBellFill, BsToggles2 } from 'react-icons/bs';
import { motion } from 'framer-motion';
import { buttonClick } from '../animations';
import Avatar from '../img/avatar.png'
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { setUserNull } from '../context/actions/userActions';
import { app } from '../config/firebase.config';

const DBHeader = () => {
  const user = useSelector((state) => state.user);
  const firebaseAuth = getAuth(app);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const logout = () => {
    firebaseAuth.signOut()
    .then(() => {
      dispatch(setUserNull());
      navigate('/login', { replace: true });
    })
    .catch((err) => {
      console.log(err);
    });
  };

  return (
    <div className='w-full flex items-center justify-between gap-2'>
      <p className='text-headingColor text-xl'>Welcome to city
        {user?.name && (
          <span className='block text-base'>{`  Hello ${user.name}...!`}</span>
        )}
      </p>

      <div className='flex items-center jucfy-center gap-2'>
        <div className='flex items-center justify-center gap-3 px-4 py-2 bg-lightOverlay backdrop-blur-md rounded-md shadow-md'>
          <MdSearch className='text-gray-400 text-xl' />
          <input type="text"
            className='border-none outline-none bg-transparent w-32 text-base font-semibold text-textColor'
            placeholder='Search Here...' />
          <BsToggles2 className='text-gray-400 text-xl' />
        </div>
        <motion.div {...buttonClick} className='w-10 h-10 rounded-md cursor-pointer bg-lightOverlay backdrop-blur-md shadow-md flex items-center justify-center'>
          <BsFillBellFill className='text-gray-400 text-xl' />
        </motion.div>

        <div className='flex items-center justify-center gap-2'>
          <div className='w-10 h-10 rounded-md shadow-md cursot-pointer overflow-hidden'>
            <motion.img 
              className='w-full h-full object-cover'
              src={user?.picture ? user?.picture : Avatar}
            />
           
          </div>
          <motion.div
              {...buttonClick}
              onClick={logout}
              className='w-10 h-10 rounded-md bg-lightOverlay backdrop-blur-md shadow-md  flex items-center justify-center'>
                <MdLogout className='text-gray-400 text-xl' / >
            </motion.div>
        </div>
      </div>
    </div>
  )
}

export default DBHeader