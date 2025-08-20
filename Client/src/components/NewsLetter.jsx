import React from 'react';
import { motion } from 'framer-motion';
import { slideTop } from '../animations';
import NewsletterBg from '../img/newsletter-bg.jpg';
import ShoppingCartAnimation from './ShopingCartAnimation';

const Newsletter = () => {
  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center text-white px-6 bg-fixed bg-cover bg-center"
      style={{
        backgroundImage: `url(${NewsletterBg})`,
      }}
    >
      {/**<div className="mt-12">
          <ShoppingCartAnimation />
        </div> */}
      <motion.div
        className="bg-black/60 p-10 rounded-lg backdrop-blur-md w-full max-w-2xl text-center"
        {...slideTop}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-base md:text-lg mb-6">
          Get the latest news, exclusive offers, and more directly to your inbox.
        </p>
        <form className="flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-md text-gray-900 focus:outline-none"
            required
          />
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-600 transition px-6 py-3 rounded-md font-semibold"
          >
            Subscribe
          </button>
        </form>

        
      </motion.div>
    </section>
  );
};

export default Newsletter;
