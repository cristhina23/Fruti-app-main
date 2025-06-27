import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { staggerFadeInOut } from '../animations';
import { useSelector } from 'react-redux';
import { statuses } from '../utils/styles';
import { IoFastFood } from "react-icons/io5";
import SliderCard from './SliderCard';

const FilterSection = () => {
  const [category, setCategory] = useState('fruits');
  const products = useSelector((state) => state.products);

  return (
    <motion.div className='w-full flex items-start justify-start flex-col'>
      <div className='w-full flex items-center justify-between'>
        <div className='flex flex-col items-start justify-start gap-1'>
          <p className='text-2xl text-headingColor font-bold'>
            Our Hot Dishes
          </p>
          <div className='w-40 h-1 rounded-md bg-orange-500'></div>
        </div>
      </div>

      <div className='w-full overflow-x-scroll pt-6 flex items-center justify-center gap-6 py-8'>
        {statuses && statuses.map((data, i) => (
          <FilterCard
            key={data.category} // ✅ clave única por categoría
            data={data}
            index={i}
            category={category}
            setCategory={setCategory}
          />
        ))}
      </div>

      <div className='w-full flex items-center justify-evenly flex-wrap gap-4 mt-12'>
        {products && products
          .filter((data) => data.product_category === category)
          .map((data, i) => (
            <SliderCard
              key={data.productId || i} // ✅ clave única por ID o índice
              data={data}
              index={i}
            />
        ))}
      </div>
    </motion.div>
  );
};

export const FilterCard = ({ data, index, category, setCategory }) => {
  return (
    <motion.div 
      onClick={() => setCategory(data.category)} 
      {...staggerFadeInOut(index)} 
      className={`group w-28 min-w-[128px] cursor-pointer rounded-md py-6 ${category === data.category ? "bg-red-500" : "bg-primary"} hover:bg-red-500 shadow-md flex flex-col items-center justify-center gap-4`}
    >
      <div className={`w-10 h-10 rounded-full flex items-center justify-center group-hover:bg-primary ${category === data.category ? "bg-primary" :"bg-red-600"}`}>
        <IoFastFood className={` ${category === data.category ? "text-red-500" :"text-white"} group-hover:text-red-500`} />
      </div>
      <p className={`text-xl font-semibold ${category === data.category ? "text-white" :"text-textColor"} group-hover:text-primary`}>
        {data.title}
      </p>
    </motion.div>
  );
};

export default FilterSection;
