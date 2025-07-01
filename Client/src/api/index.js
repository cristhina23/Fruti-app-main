import axios from 'axios';

export const baseURL = 'http://localhost:5001/fruti-app-aa8b1/us-central1/app';

export const validateUserJWTToken = async (token) => {
  try {
    const res = await axios.get(`${baseURL}/api/users/jwtVerfication`, {
      headers: { Authorization : 'Bearer ' + token },
    });
    return res.data.data;
    
  } catch (error) {
    return null;
  }
}
// add new product
export const addNewProduct = async (data) => {
  try {
    const res = await axios.post(`${baseURL}/api/products/create`, {...data});
    return res.data.data;
  } catch (error) {
    return null;

  }
};

// add new product
export const getAllProducts = async () => {
  try {
    const res = await axios.get(`${baseURL}/api/products/all`);
    console.log("Respuesta del servidor:", res.data);
    return res.data.data;
  } catch (error) {
    return null;
  }
}

// delete a product
export const deleteAProducts = async (productId) => {
  try {
    const res = await axios.delete(`${baseURL}/api/products/delete/${productId}`);
    console.log("Respuesta del servidor:", res.data);
    return res.data.data;
  } catch (error) {
    return null;
  }
}

export const getAllUsers = async () => {
  try {
    const res = await axios.get(`${baseURL}/api/users/all`);
    console.log("Respuesta del servidor:", res.data);
    return res.data.data;
  } catch (error) {
    return null;
  }
}

export const AddNewItemToCart = async (userId, data) => {
  try {
    const res = await axios.post(`${baseURL}/api/products/addToCart/${userId}`, { ...data });
    console.log("Respuesta del servidor:", res.data);
    return res.data.data;
  } catch (error) {
    return null;
  }
}

// get all the cart Items

export const getAllCartItems = async (user_id) => {
  try {
    const res = await axios.get(`${baseURL}/api/products/getCartItems/${user_id}`);
    
    return res.data.data;
  } catch (error) {
    return null;
  }
}

//  Cart Increment/Decrement Function
export const updateCartItem = async (user_id, productId, type) => {
  try {
    const res = await axios.put(
      `${baseURL}/api/products/updateCart/${user_id}`,
      { productId, type } // Se envía en el cuerpo de la petición
    );

    return res.data.data;
  } catch (error) {
    console.error("Error al actualizar el carrito:", error);
    return null;
  }
};
