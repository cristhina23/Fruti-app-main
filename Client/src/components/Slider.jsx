import React, { useEffect, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import '../assets/css/swiperSlyles.css';
import 'swiper/css';
import 'swiper/css/pagination';

// Import required modules
import { Pagination } from 'swiper/modules';
import { useSelector } from 'react-redux';
import SliderCard from './SliderCard';

const Slider = () => {
  const products = useSelector((state) => state.products);
  const [fruits, setFruits] = useState([]);

  useEffect(() => {
    if (products && Array.isArray(products)) {
      const filtered = products.filter((data) => data.product_category === 'fruits');
      setFruits(filtered);
    }
  }, [products]);

  return (
    <div className="w-full pt-24">
      <Swiper
        slidesPerView={Math.floor(window.innerWidth / 340)}
        spaceBetween={30}
        grabCursor={true}
        pagination={{ clickable: true }}
        className="mySwiper"
      >
        {fruits.length > 0 ? (
          fruits.map((data, i) => (
            <SwiperSlide key={data.productId || i}>
              <SliderCard key={i} data={data}/>
            </SwiperSlide>
          ))
        ) : (
          <div className="text-center py-6">No fruits to show 🍎</div>
        )}
      </Swiper>
    </div>
  );
};

export default Slider;
