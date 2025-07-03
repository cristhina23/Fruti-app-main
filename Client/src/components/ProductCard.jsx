import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import Addcart from '../img/add-cart.svg';
import View from '../img/view.svg';
import Prodcompare from '../img/prodcompare.svg';
import { setCartItems } from '../context/actions/cartActions';
import { FaHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";

function ProductCard({ grid = 3, product = {} }) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isProductPage = location.pathname === '/product';

  const [showModal, setShowModal] = useState(false);
  const [isWished, setIsWished] = useState(false);

  const addToCart = () => {
    dispatch(setCartItems(prev => [...(prev || []), { ...product, quantity: 1 }]));
  };

  return (
    <div className="w-[270px] flex-shrink-0 group relative overflow-hidden">
      <div className="flex flex-col bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 relative">

        {/* Wishlist */}
        <div className="absolute top-3 right-3 z-10 cursor-pointer" onClick={() => setIsWished(!isWished)}>
          {isWished ? (
            <FaHeart className="text-orange-600 text-2xl" />
          ) : (
            <FiHeart className="text-orange-600 text-2xl" />
          )}
        </div>

        {/* Imagen del producto */}
        <img
          src={product?.product_image}
          alt={product?.product_name}
          className="w-full h-64 object-contain p-4"
        />

        {/* Información */}
        <div className="px-4 py-3 border-t border-gray-200 flex flex-col gap-1">
          <h5 className="text-gray-800 font-bold text-base leading-snug line-clamp-2">
            {product?.product_name}
          </h5>
          <p className="text-sm text-gray-500">
            {product?.product_category}
          </p>
          <p className="text-lg font-bold text-green-600 mt-1">
            ${parseFloat(product?.product_price).toFixed(2)}
          </p>
        </div>

        {/* Botones flotantes */}
        <div className="absolute top-[15%] -right-10 group-hover:right-2 transition-all duration-300 flex flex-col gap-3">
          <button
            className="bg-orange-500 w-10 h-10 flex items-center justify-center rounded-full"
            onClick={() => navigate(`/product/${product?.productId}`)}
          >
            <img src={Prodcompare} alt="compare" className="w-6 h-6" />
          </button>
          <button
            className="bg-orange-500 w-10 h-10 flex items-center justify-center rounded-full"
            onClick={() => setShowModal(true)}
          >
            <img src={View} alt="view" className="w-6 h-6" />
          </button>
          <button
            className="bg-orange-500 w-10 h-10 flex items-center justify-center rounded-full"
            onClick={addToCart}
          >
            <img src={Addcart} alt="add to cart" className="w-6 h-6" />
          </button>
        </div>

        {/* Botón Agregar */}
        <button
          onClick={addToCart}
          className="mt-3 mx-4 mb-4 bg-orange-500 text-white py-2 rounded-md shadow hover:bg-orange-600 transition-all"
        >
          Agregar al carrito
        </button>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl shadow-lg p-6 w-96 max-w-full flex flex-col items-center relative"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5 }}
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
              >
                ✖
              </button>

              <img
                src={product?.product_image}
                alt={product?.product_name}
                className="w-48 h-48 object-contain mb-4"
              />
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                {product?.product_name}
              </h3>
              <p className="text-sm text-gray-600 mb-4 text-center">
                {product?.product_category}
              </p>
              <button
                onClick={() => navigate(`/product/${product?.productId}`)}
                className="bg-orange-500 text-white px-4 py-2 rounded-md shadow hover:bg-orange-600 transition"
              >
                Comprar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ProductCard;
