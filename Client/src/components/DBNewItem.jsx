import React, { useState } from 'react'
import { statuses } from '../utils/styles';
import Spiner from '../components/Spiner';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { MdDelete } from 'react-icons/md';
import { alertDanger, alertNull, alertSuccess } from '../context/actions/alertActions';
import { buttonClick } from '../animations/index.js';
import { addNewProduct, getAllProducts } from '../api/index.js';
import { setAllProducts } from '../context/actions/productActions.js';

const DBNewItem = () => {
  const [itenName, setItenName] = useState('');
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(null);
  const [imageDownloadURL, setImageDownloadURL] = useState(null);

  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storage = getStorage();
    const storageRef = ref(storage, `Images/${Date.now()}_${imageFile.name}`);

    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {
        dispatch(alertDanger(`Error: ${error}`));
        setTimeout(() => {
          dispatch(alertNull());
        }, 3000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageDownloadURL(downloadURL);
          setIsLoading(false);
          setProgress(null);
          dispatch(alertSuccess('Image Uploaded Successfully'));
          setTimeout(() => {
            dispatch(alertNull());
          }, 3000);
        })
      }
    )
  };

  const deleteImageFromFirebase = () => {
    setIsLoading(true);
    const deleteRef = ref(getStorage(), imageDownloadURL);

    deleteObject(deleteRef).then(() => {
      setImageDownloadURL(null);
      setIsLoading(false);
      dispatch(alertSuccess('Image Deleted Successfully'));
      setTimeout(() => {
        dispatch(alertNull());
      }, 3000);
    })
  }

  const submitNewData = () => {
    const data = {
      product_name: itenName,
      product_category: category,
      product_price: price,
      product_image: imageDownloadURL
    };
    addNewProduct(data).then(res => {
      dispatch(alertSuccess('New Product Added Successfully'));
      setTimeout(() => {
        dispatch(alertNull());
      }, 3000);
      setImageDownloadURL(null);
      setItenName('');
      setCategory(null);
      setPrice('');
    });
    getAllProducts().then(data => {
      console.log(data);
      dispatch(setAllProducts(data));
    });
  };

  return (
    <div className='flex flex-col items-center justify-center pt-6 px-24 w-full'>
      <div className='border border-gray-300 rounded-md p-4 w-full flex flex-col items-center justify-center gap-4'>
        <InputValueField
          type='text'
          placeholder={'Item Name Here'}
          stateFunc={setItenName}
          stateValue={itenName}
        />

        <div className='w-full flex items-center justify-around gap-3 flex-wrap'>
          {statuses &&
            statuses?.map((data) => (
              <p
                key={data.id}
                onClick={() => setCategory(data.category)}
                className={`px-4 py-3 rounded-md text-md text-textColor font-semibold cursor-pointer hover:shadow-md border border-gray-200 backdrop-blur-md ${category === data.category ? 'bg-red-400 text-white' : 'bg-transparent'}`}
              >
                {data.title}
              </p>
            ))}
        </div>
        <InputValueField
          type='number'
          placeholder={'Item Price Here'}
          stateFunc={setPrice}
          stateValue={price}
        />

        <div className='w-full bg-card backdrop-blur-md h-370 cursor-pointer rounded-md border-2 border-dotted border-gray-300 '>
          {isLoading ? (<>
            <div className='w-full h-full flex justify-evenly items-center px-24'>
              <Spiner />
            </div>
              {Math.round(progress) > 0 && (
                <div className='w-full flex flex-col items-center justify-center gap-2'>
                  <div className='flex justify-between w-full' >
                    <span className='text-base font-medium text-textColor'>Progress</span>
                    <span className='text-sm font-medium text-textColor'>
                      
                      {Math.round(progress) > 0 && (
                        <>{`${Math.round(progress)}%`} </>
                      )}
                    </span>
                  </div>

                  <div className='w-full h-2.5 rounded-full bg-gray-200'>
                    <div className='bg-red-600 h-2.5 rounded-full transition-all duration-500 e ease-in-out' style={{ width: `${Math.round(progress)}%` }}>

                    </div>
                    
                    </div>    
                </div>
              )}
          
          </>) : (
            <>
              {!imageDownloadURL ? (
                <>
                  <label>
                    <div className='flex flex-col items-center justify-center h-full w-full cursor-pointer'>
                      <div className='flex flex-col justify-center items-center cursor-pointer'>
                        <p className='font-bold text-4xl'>
                          <FaCloudUploadAlt className='-rote-0' />
                        </p>
                        <p className='text-md text-textColor'>
                          Click to upload an image
                        </p>
                      </div>
                    </div>
                    <input 
                      type='file'
                      name='upload-image'
                      accept='image/*'
                      onChange={uploadImage}
                      className='hidden'
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className='relative w-full h-full overflow-hidden rounded-md'>
                    <motion.img 
                      whileHover={{scale: 1.15}}
                      src={imageDownloadURL} className='w-full h-full object-cover' 
                      alt='image'
                    />

                    <motion.button
                      {...buttonClick}
                      type='button'
                      className='absolute top-3 right-3  p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all '
                      onClick={() => deleteImageFromFirebase(imageDownloadURL)}
                    >
                      <MdDelete className='-rotate-0' />
                    </motion.button>
                  </div>
          
                </>
              )}
            </>)}
        </div>
        <motion.button
        onClick={submitNewData}
        {...buttonClick}
        className='w-9/12 py-2 rounded-md bg-red-400 text-primary hover:bg-red-600 cursor-pointer outline-none'
        >
          Save
        </motion.button>
      </div>
    </div>
  )
};

export const InputValueField = ({ type, placeholder, value, stateValue, stateFunc }) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        value={stateValue}
        onChange={(e) => stateFunc(e.target.value)}
        className='w-full px-4 py-3 bg-lightOverlay shadow-md outline-none rounded-md border border-gray-200 focus:border-red-400'
      />
    </>
  );
};

export default DBNewItem