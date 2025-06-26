import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../api';
import { setAllProducts } from '../context/actions/productActions';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
);

const DBHome = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const drinks = products.filter((product) => product.product_category === 'drinks');
  const deserts = products.filter((product) => product.product_category === 'deserts');
  const fruits = products.filter((product) => product.product_category === 'fruits');
  const rice = products.filter((product) => product.product_category === 'rice');
  const curry = products.filter((product) => product.product_category === 'curry');
  const chinese = products.filter((product) => product.product_category === 'chinese');
  const bread = products.filter((product) => product.product_category === 'bread');

  useEffect(() => {
    if (!products || products.length === 0) {
      getAllProducts().then((data) => {
        dispatch(setAllProducts(data));
      });
    }
  }, [products, dispatch]);

  const barData = {
    labels: ['Drinks', 'Deserts', 'Fruits', 'Rice', 'Curry', 'Bread', 'Chinese'],
    datasets: [
      {
        label: 'Category Count',
        data: [
          drinks.length,
          deserts.length,
          fruits.length,
          rice.length,
          curry.length,
          bread.length,
          chinese.length,
        ],
        backgroundColor: '#f87979',
      },
    ],
  };

  const doughnutData = {
    labels: [
      'Orders',
      'Delivered',
      'Cancelled',
      'Paid',
      'Not Paid',
    ],
    datasets: [
      {
        data: [40, 20, 80, 34, 54],
        backgroundColor: ['#41B883', '#00D8FF', '#DD1B16'],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#333',
        },
      },
    },
  };

  return (
    <div className='flex items-center justify-center flex-col pt-8 h-full'>
      <div className='grid w-full grid-cols-1 md:grid-cols-2 gap-12 h-full'>
        <div className=' flex items-center justify-center'>
          <div className='w-340 md:w-508'>
            <Bar data={barData} options={options} />
          </div>
        </div>

        <div className='w-full h-full flex items-center justify-center'>
          <div className='w-340 md:w-508'>
            <Doughnut data={doughnutData} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DBHome;
