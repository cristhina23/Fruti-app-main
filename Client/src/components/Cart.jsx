import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { buttonClick, slideIn, staggerFadeInOut } from '../animations';
import { FaChevronRight } from "react-icons/fa";
import { FcClearFilters } from "react-icons/fc";
import { useDispatch, useSelector } from 'react-redux';
import { setCartOff } from '../context/actions/displayCartAction';
import { baseURL, getAllCartItems, updateCartItem } from '../api';
import { setCartItems } from '../context/actions/cartActions';
import { alertNull, alertSuccess } from '../context/actions/alertActions';
import axios from 'axios';

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cartItems);
  const [total, setTotal] = useState(0);

  const handleCheckOut = async () => {
    try {
      const res = await axios.post(`${baseURL}/api/products/create-checkout-session`, {
        cartItems: cart.map(item => ({
          ...item,
          product_price: Number(item.product_price)
        }))
      });

      if (res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (err) {
      console.error('Error durante checkout:', err);
      alert(err.response?.data?.error || 'No se pudo iniciar el pago. Intenta de nuevo.');
    }
  };

  useEffect(() => {
    let tot = 0;
    if (cart && cart.length > 0) {
      cart.forEach((item) => {
        tot += Number(item.product_price) * Number(item.quantity);
      });
      setTotal(tot);
    }
  }, [cart]);

  return (
    <motion.div {...slideIn} className='fixed z-50 top-0 right-0 w-300 md:w-508 bg-white backdrop-blur-md shadow-xl h-screen flex flex-col'>

      {/* Header */}
      <div className='w-full flex items-center justify-between p-4 px-6 border-b border-gray-200'>
        <motion.i {...buttonClick} onClick={() => dispatch(setCartOff())} className='cursor-pointer'>
          <FaChevronRight className='text-2xl text-gray-700' />
        </motion.i>
        <p className='text-xl font-bold text-gray-800'>Your Cart</p>
        <motion.i {...buttonClick} className='cursor-pointer'>
          <FcClearFilters className='text-2xl' />
        </motion.i>
      </div>

      {/* Scrollable products */}
      <div className='flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-thin scrollbar-thumb-orange-400 scrollbar-track-gray-200'>
        {cart && cart.length > 0 ? (
          cart.map((data, index) => (
            <CartItemCard key={index} index={index} data={data} />
          ))
        ) : (
          <div className='flex items-center justify-center w-full h-full flex-col gap-6'>
            <h1 className='text-xl font-semibold text-primary'>Your cart is empty</h1>
            <motion.button
              {...buttonClick}
              onClick={() => dispatch(setCartOff())}
              className='bg-orange-400 text-white px-6 py-2 rounded-md shadow-md hover:bg-orange-500'
            >
              Go to Menu
            </motion.button>
          </div>
        )}
      </div>

      {/* Fixed Footer */}
      {cart && cart.length > 0 && (
        <div className='bg-gray-100 w-full px-6 py-4 border-t border-gray-300 mb-4'>
          <div className='flex items-center justify-between mb-4'>
            <p className='text-lg font-semibold text-gray-600'>Total</p>
            <p className='text-lg font-semibold text-green-600'>$ {total.toFixed(2)}</p>
          </div>
          <motion.button
            {...buttonClick}
            onClick={handleCheckOut}
            className='w-full bg-orange-500 text-white text-lg font-bold py-3 rounded-lg shadow hover:bg-orange-600 transition duration-200'
          >
            Checkout
          </motion.button>
        </div>
      )}
    </motion.div>
  );
};

export const CartItemCard = ({ index, data }) => {
  const cart = useSelector((state) => state.cart.cartItems);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const decrementCart = async (productId) => {
    if (!user?.user_id) return;

    try {
      dispatch(alertSuccess('Item Quantity Updated'));
      await updateCartItem(user.user_id, productId, 'decrease');
      const updated = await getAllCartItems(user.user_id);
      dispatch(setCartItems(updated));
      dispatch(alertNull());
    } catch (err) {
      console.error('Error al disminuir:', err);
    }
  };

  const incrementCart = async (productId) => {
    if (!user?.user_id) return;

    try {
      dispatch(alertSuccess('Item Quantity Updated'));
      await updateCartItem(user.user_id, productId, 'increase');
      const updated = await getAllCartItems(user.user_id);
      dispatch(setCartItems(updated));
      dispatch(alertNull());
    } catch (err) {
      console.error('Error al aumentar:', err);
    }
  };

  return (
    <motion.div key={index} {...staggerFadeInOut(index)} className='w-full bg-gray-100 rounded-md shadow p-4 flex items-center gap-4'>
      <img src={data?.product_image} alt={data?.product_name} className='w-20 h-20 object-contain rounded-md' />

      <div className='flex flex-col flex-1'>
        <p className='text-base font-semibold text-gray-800'>{data?.product_name}</p>
        <span className='text-sm capitalize text-gray-500'>{data?.product_category}</span>
        <p className='text-sm font-semibold text-red-500'>$ {Number(data?.product_price).toFixed(2)}</p>
      </div>

      <div className='flex items-center gap-2'>
        <motion.div
          {...buttonClick}
          onClick={() => decrementCart(data?.productId)}
          className='w-8 h-8 bg-gray-300 rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-400'
        >
          <p className='text-lg font-bold text-gray-700'>-</p>
        </motion.div>
        <p className='text-lg font-semibold text-gray-800'>{data?.quantity}</p>
        <motion.div
          {...buttonClick}
          onClick={() => incrementCart(data?.productId)}
          className='w-8 h-8 bg-gray-300 rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-400'
        >
          <p className='text-lg font-bold text-gray-700'>+</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Cart;
