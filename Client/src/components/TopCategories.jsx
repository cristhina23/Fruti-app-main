import React from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import { useSelector } from 'react-redux';

const TopCategories = () => {
  const products = useSelector((state) => state.products);

  return (
    <motion.div className="w-full flex flex-col items-start px-4   mt-14">
      <div className="w-full flex items-center justify-between">
        <div className="flex flex-col items-start gap-1">
          <p className="text-2xl text-headingColor font-bold">Top Products</p>
          <div className="w-40 h-1 rounded-md bg-orange-500" />
        </div>
      </div>

      {/* ✅ Contenedor con flex-wrap y espacio entre tarjetas */}
      <div className="w-full flex flex-wrap gap-6 justify-start py-8">
        {products && products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))
        ) : (
          <p className="text-gray-500">No hay productos disponibles</p>
        )}
      </div>
    </motion.div>
  );
};

export default TopCategories;
