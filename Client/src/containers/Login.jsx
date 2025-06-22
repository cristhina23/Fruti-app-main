import React, { useEffect, useState } from 'react';
import Logo from '../img/logo.png';
import LoginInput from '../components/LoginInput';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { buttonClick } from '../animations';
import { FcGoogle } from 'react-icons/fc';
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import {app} from '../config/firebase.config.js'
import { validateUserJWTToken } from '../api';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails } from '../context/actions/userActions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Agrega esto dentro del JSX del componente:


const Login = () => {

  const [userEmail, setUserEmail] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirm_password] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const user = useSelector((state) => state.user);
  const alert = useSelector((state) => state.alert);

  useEffect(() => {
    if (user) {
      navigate('/', {replace : true});
    }
  }, [user]);
  const loginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then(userCred => {
      firebaseAuth.onAuthStateChanged((cred) => {
        if (cred) {
          cred.getIdToken().then((token) => {
            validateUserJWTToken(token).then(data => {
              console.log(data);
              dispatch(setUserDetails(data));
            });
            navigate('/', { replace: true });
          });
        }
      });
    });
  };

  const signUpWithEmailPass = async () => {
    if ((userEmail === '' || password === '' || confirm_password === '') ) {
     dispatch(toast.info('All fields are required'));
    } else {
      if (password === confirm_password) {
        setUserEmail('');
        setConfirm_password('');
        setPassword('');
        await createUserWithEmailAndPassword(firebaseAuth, userEmail, password).then((userCred) => {
          firebaseAuth.onAuthStateChanged((cred) => {
            if (cred) {
              cred.getIdToken().then((token) => {
                validateUserJWTToken(token).then((data) => {
                  dispatch(setUserDetails(data));
                });
                navigate('/', { replace: true });
              });
            }
          });
        });
        
      } else {
         dispatch(toast.info('All fields are required'));
      }
    }
  };

  const signInWithEmailPass = async () => {
    if (userEmail !== '' && password !== '') {
      await signInWithEmailAndPassword(firebaseAuth, userEmail, password)
      .then((userCred) => {
          firebaseAuth.onAuthStateChanged((cred) => {
            if (cred) {
              cred.getIdToken().then((token) => {
                validateUserJWTToken(token).then((data) => {
                  dispatch(setUserDetails(data));
                });
                navigate('/', { replace: true });
              });
            }
          });
        });
      
    } else {
      dispatch(toast.info('All fields are required'));
    }
  }

  return (
    <div className='w-screen h-screen relative overflow-hidden flex'>
      {/* background */}
      <img
        src="https://images.pexels.com/photos/314780/pexels-photo-314780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="fondo"
        className='w-[100%] h-[100%] object-cover absolute top-0 left-0' />

      {/* content */}
      <div className='flex flex-col items-center bg-lightOverlay w-[80%] md:w-[30%] h-full z-10 backdrop-blur-md p-2 py-4 px-4 gap-4'>
        {/* top logo section */}
        <div className='flex items-center justify-start gap-4 w-full'>
          <img src={Logo} className='w-8' alt="logo" />
          <p className='text-headingColor text-2xl font-semibold'>Fruty</p>
        </div>

        {/* welcome text */}
        <p className='text-2xl font-semibold text-headingColor'>Welcome to Fruty</p>
        <p className='text-md text-textColor -mt-4'>{isSignUp ? 'Sign Up' : 'Sign In'} with following</p>

        {/* input */}
        <div className='w-full flex flex-col items-center justify-center gap-4 px-4 md:px-8 py-4'>
          <LoginInput
            className='text-textColor font-light '
            placeholder={'Email Here'}
            icon={<FaEnvelope className='text-md text-textColor' />}
            
            inputState={userEmail}
            inputStateFunc={setUserEmail}
            type={'email'}
            isSignUp={isSignUp}
          />
          <LoginInput
            placeholder={'Password Here'}
            icon={<FaLock className='text-md text-textColor' />}
            className='text-textColor text-xl'
            inputState={password}
            inputStateFunc={setPassword}
            type={'password'}
            isSignUp={isSignUp}
          />
          {isSignUp && (
            <LoginInput
              className='text-textColor text-xl'
              placeholder={'Confirm Password '}
              icon={<FaLock className='text-md text-textColor' />}
              
              inputState={confirm_password}
              inputStateFunc={setConfirm_password}
              type={'password'}
              isSignUp={isSignUp}
            />
          )}
          {!isSignUp ? (
            <p className='text-sm'>Doesn't have an account:{' '}<motion.button {...buttonClick} className='text-red-400 underline cursor-pointer bg-transparent'
            onClick={() => setIsSignUp(true)} >
              Create One
            </motion.button></p>
          ) : (
            <p className='text-sm'>Already have an account:{' '}<motion.button {...buttonClick} className='text-red-400 underline cursor-pointer bg-transparent' 
            onClick={() => setIsSignUp(false)}>
              Sign-in Here
            </motion.button></p>
          )}
          
          {isSignUp ? (
            <motion.button 
            {...buttonClick}
            className='w-full px-2 py-2 text-md text-white bg-red-400 rounded-md cursor-pointer capitalize hover:bg-red-500 transition-all duration-150'
            onClick={signUpWithEmailPass}>
              Sign Up
            </motion.button>
          ) : (
            <motion.button 
            {...buttonClick}
            className='w-full px-2 py-2 text-md text-white bg-red-400 rounded-md cursor-pointer capitalize hover:bg-red-500 transition-all duration-150'
            onClick={signInWithEmailPass}>
              Sign In
            </motion.button>
          )}
        
        </div>

        <div className='flex items-center justify-between gap-8'>
          <div className='w-24 h-[1px] rounded-md bg-white'></div>
          <p className='text-sm font-semibold text-white'>Or</p>
          <div className='w-24 h-[1px] rounded-md bg-white'></div>
        </div>
        

        <motion.div 
            {...buttonClick}
            className='flex items-center justify-center px-20 py-2 bg-lightOverlay blackdrop-blur-md cursor-pointer rounded-3xl gap-2'
            onClick={loginWithGoogle}>
            <FcGoogle className='text-xl' />
            <p className='capitalize text-sm font-semibold text-headingColor'> Sign in with google</p>
          </motion.div>
      </div>
    </div>
  )
}

export default Login