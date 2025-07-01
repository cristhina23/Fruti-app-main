import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { buttonClick, slideIn, staggerFadeInOut } from '../animations';
import { FaChevronRight } from "react-icons/fa";
import { FcClearFilters } from "react-icons/fc";
import { useDispatch, useSelector } from 'react-redux';
import { setCartOff } from '../context/actions/displayCartAction';
import { getAllCartItems, updateCartItem } from '../api';
import { setCartItems } from '../context/actions/cartActions';
import { alertNull, alertSuccess } from '../context/actions/alertActions';

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cartItems);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let tot = 0;
    if (cart) {
      cart.forEach((item) => {
        tot += item.product_price * item.quantity;
      });
      setTotal(tot);
    }
  }, [cart]);

  return (
    <motion.div {...slideIn} className='fixed z-50 top-0 right-0 w-300 md:w-508 bg-lightOverlay backdrop-blur-md shadow-xl h-screen'>
      <div className='w-full flex items-center justify-between p-4 pb-12 px-9'>
        <motion.i {...buttonClick} onClick={() => dispatch(setCartOff())} className='cursor-pointer'>
          <FaChevronRight className='text-3xl text-textColor' />
        </motion.i>
        <p className='text-2xl font-semibold text-headingColor'>Your Cart</p>
        <motion.i {...buttonClick} className='cursor-pointer'>
          <FcClearFilters className='text-3xl text-textColor' />
        </motion.i>
      </div>

      <div className='flex-1 flex flex-col items-start justify-start rounded-l-3xl bg-zinc-900 h-full py-6 gap-3 relative'>
        {cart && cart.length > 0 ? (
          <>
            <div className='flex flex-col w-full items-start justify-start gap-3 h-[70%] overflow-y-scroll scrollbar-none px-4'>
              {cart.map((data, index) => (
                <CartItemCard key={index} index={index} data={data} />
              ))}
            </div>

            <div className='bg-zinc-900 w-full h-[25%] flex flex-col items-center justify-center px-4 gap-6 mb-10'>
              <div className='w-full flex items-center justify-evenly'>
                <p className='text-xl font-semibold text-zinc-500'>Total</p>
                <p className='text-xl font-semibold text-orange-500'>$ {total.toFixed(2)}</p>
              </div>
              {/* Aquí podrías agregar un botón de "Pagar ahora" */}
            </div>
          </>
        ) : (
          <div className='flex items-center justify-center w-full h-full flex-col gap-6'>
            <h1 className='text-2xl font-semibold text-primary'>Your cart is empty</h1>
            <motion.button
              {...buttonClick}
              onClick={() => dispatch(setCartOff())}
              className='bg-orange-400 text-white px-6 py-2 rounded-md shadow-md'
            >
              Go to Menu
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export const CartItemCard = ({ index, data }) => {
  const cart = useSelector((state) => state.cart.cartItems);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [itemTotal, setItemTotal] = useState(0);

  const decrementCart = (productId) => {
    dispatch(alertSuccess('Item Quantity Updated'));
    updateCartItem(user?.user_id, productId, 'decrease').then(() => {
      getAllCartItems(user?.user_id).then((items) => {
        dispatch(setCartItems(items));
        dispatch(alertNull());
      });
    });
  };

  const incrementCart = (productId) => {
    dispatch(alertSuccess('Item Quantity Updated'));
    updateCartItem(user?.user_id, productId, 'increase').then(() => {
      getAllCartItems(user?.user_id).then((items) => {
        dispatch(setCartItems(items));
        dispatch(alertNull());
      });
    });
  };

  useEffect(() => {
    setItemTotal(data?.product_price * data.quantity);
  }, [cart, data]);

  return (
    <motion.div key={index} {...staggerFadeInOut(index)} className='w-full flex items-center justify-start bg-zinc-800 rounded-md drop-shadow-md px-4 gap-4'>
      <img src={data?.product_image} alt={data?.product_name} className='w-24 min-w-[94px] h-24 object-contain' />
      <div className='flex items-center justify-start gap-1 w-full'>
        <p className='text-lg font-semibold text-primary'>
          {data?.product_name}
          <span className='text-sm block capitalize text-gray-400'>{data?.product_category}</span>
        </p>
        <p className='text-sm font-semibold text-red-400 ml-auto'>$ {data?.product_price}</p>
      </div>
      <div className='ml-auto flex items-center justify-center gap-4'>
        <motion.div {...buttonClick} onClick={() => decrementCart(data?.productId)} className='w-8 h-8 rounded-md bg-zinc-900 flex items-center justify-center cursor-pointer'>
          <p className='text-xl font-semibold text-white'>-</p>
        </motion.div>
        <p className='text-lg font-semibold text-primary'>{data?.quantity}</p>
        <motion.div {...buttonClick} onClick={() => incrementCart(data?.productId)} className='w-8 h-8 rounded-md bg-zinc-900 flex items-center justify-center cursor-pointer'>
          <p className='text-xl font-semibold text-white'>+</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Cart;
