import React from 'react';
import { motion } from 'framer-motion';
import CartImage from '../img/basket.png'; 

const ShoppingCartAnimation = () => {
  return (
    <motion.div className="w-full min-h-screen flex items-center justify-center overflow-hidden">
      <motion.img
        src={CartImage}
        alt="Shopping Cart"
        className="w-[300px] h-auto"
        initial={{ x: '-100vw', opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />
    </motion.div>
  );
};

export default ShoppingCartAnimation;
