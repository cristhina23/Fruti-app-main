import './App.css';
import React, { useEffect, useState } from 'react';
import MainContainer from './containers/MainContainer';
import { motion, AnimatePresence } from 'framer-motion';
import { Routes, Route } from 'react-router-dom';
import Login from './containers/Login';
import { app } from './config/firebase.config';
import { getAuth } from 'firebase/auth';

import { getAllCartItems, validateUserJWTToken } from './api';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails } from './context/actions/userActions';
import { fadeInOut } from './animations';
import MainLoader from './components/MainLoader';
import Loader from './assets/css/285.gif';
import Alert from './components/Alert';
import Dashboard from './containers/Dashboard';
import { getAllProducts } from './api';
import { setAllProducts } from './context/actions/productActions';
import { setCartItems } from './context/actions/cartActions';




function App() {
  const firebasAuth = getAuth(app);
  const [isLoading, setIsLoading] = useState(false);
  const alert = useSelector((state) => state.alert);
  const products = useSelector((state) => state.products);


  const dispatch = useDispatch();

useEffect(() => {
  setIsLoading(true);

  firebasAuth.onAuthStateChanged((cred) => {
    if (cred) {
      cred.getIdToken().then((token) => {
        validateUserJWTToken(token).then(async (data) => {
          if (data) {
            dispatch(setUserDetails(data));

            const items = await getAllCartItems(data.user_id);
            dispatch(setCartItems(items)); 
          }

          setTimeout(() => {
            setIsLoading(false);
          }, 2000);
        });
      });
    } else {
      setIsLoading(false);
    }
  });
}, []);


  useEffect(() => {
  if (!products || products.length === 0) {
    getAllProducts().then((data) => {
      dispatch(setAllProducts(data));
    });
  }
}, [dispatch, products]);


  return (

    <div className="w-screen min-h-screen h-auto flex flex-col justify-center  items-center">
      {isLoading && (
        <motion.div {...fadeInOut} className='fixed z-50  inset-0 bg-lightOverlay blackdrop-blur-md flex justify-center items-center w-full'>
          <MainLoader />
        </motion.div>
      )}
      <Routes>
        <Route path="/*" element={<MainContainer />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
      
      {alert?.type && <Alert type={alert?.type} message={alert?.message} />}
    </div>


  );
}

export default App;
