import React, { useState } from 'react';
import Logo from '../img/logo.png';
import {  MdAdd, MdLogout } from "react-icons/md";
import { HiShoppingCart } from "react-icons/hi";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from '../config/firebase.config';
import Avatar from '../img/avatar.png';
import { motion } from 'framer-motion';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { isActiveStyles, isNoActiveStyles } from '../utils/styles';
import { buttonClick, slideTop } from '../animations';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails, setUserNull } from '../context/actions/userActions';
import {setCartOn} from '../context/actions/displayCartAction';


const Header = () => {
  const [isMenu, setIsMenu] = useState(false)
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart.cartItems);
  const isCart = useSelector((state) => state.isCart);

  const firebaseAuth = getAuth(app);
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
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
    <header className='fixed backdrop-blur-md z-50 inset-x-0 top-0  w-screen  p-4 px-16 md:px-20 py-4'>
      {/* desktop and tablets */}
      <div className=' flex w-full h-full items-center justify-between'>
        <NavLink to='/' className='flex items-center  gap-2'>
          <img src={Logo} className='w-10 object-cover' alt="logo" />
          <p className='text-headingColor text-xl font-bold'>Fruty</p>
        </NavLink>
        <nav className='flex items-center'>
          <ul className=' hidden md:flex items-center justify-center gap-8  '>
            <NavLink to='/' className={({ isActive }) => isActive ? isActiveStyles : isNoActiveStyles}>Home</NavLink>
            <NavLink to='/menu' className={({ isActive }) => isActive ? isActiveStyles : isNoActiveStyles}>Menu</NavLink>
            <NavLink to='/about' className={({ isActive }) => isActive ? isActiveStyles : isNoActiveStyles}>About Us</NavLink>
            <NavLink to='/services' className={({ isActive }) => isActive ? isActiveStyles : isNoActiveStyles}>Servives</NavLink>
          </ul>

          <motion.div {...buttonClick} onClick={() => dispatch(setCartOn())} className='relative flex cursor-pointer'>
            <HiShoppingCart className='text-3xl text-textColor ml-8 hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer' />

            {cart?.length > 0 && (
  <div className='absolute -top-4 -right-2 bg-cartNumBg w-5 h-5 rounded-full flex items-center justify-center text-xs text-white font-bold'>
    {cart.length}
  </div>
)}
            
          </motion.div>

          {user ? (
          <>
            <div className='relative cursor-pointer  ' onMouseEnter={() => setIsMenu(true)}>
              <div className='w-8 h-8 ml-6 rounded-full shadow-md cursor-pointer overflow-hidden flex items-center justify-center'>
                <img 
                referrerPolicy="no-referrer"
                className='w-full h-full object-cover' src={user?.picture ? user?.picture : Avatar} whileHover={{ scale: 1.15 }} alt='user-avatar' />
              </div>
            {isMenu && (
              <motion.div 
                
                onMouseLeave={() => setIsMenu(false)}
                className='px-6 py-4 w-38 bg-lightOverlay backdrop-blur-md rounded-md shadow-md absolute top-12 right-0 flex flex-col justify-center items-center gap-4'>
              {user?.email === "admin@miapp.com" && (
                <Link 
                to='/dashboard/home'
                className='hover:text-red-500 text-sm text-textColor'
                >
                Dashboard
                </Link>
              )}
                <Link 
                to='/profile'
                className='hover:text-red-500 text-sm text-textColor'
                >
                Profile
                </Link>
                <Link 
                to='/user-orders'
                className='hover:text-red-500 text-sm text-textColor'
                >
                My Orders
                </Link>
                <hr/>

                <motion.div 
                  onClick={logout}
                  
                  className='group flex items-center justify-center px-2 py-2 rounded-md shadow-md bg-gray-100 hover:bg-gray-200 gap-3'>
                  <MdLogout className='text-lg text-textColor group-hover::text-headingColor'  />
                  <p className='text-sm text-textColor group-hover::text-headingColor'>Logout</p>
                </motion.div>
            </motion.div>
            )}
              
            </div>
          </>
          ) : (<>
            <NavLink to='/login'>
              <motion.button {...buttonClick} className='px-2 py-1 ml-4 rounded-md shadow-md bg-lightOverlay border border-red-300 cursor-pointer'>
                Login
              </motion.button>
            </NavLink>
          </>
          )}



        </nav>

      </div>
    </header>
  )
}

export default Header