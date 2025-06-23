export const setUserDetails = (user) => {
  return {
    type: "SET_USER",
    payload: user, // ✅ Usar "payload"
  };
};

export const getUserDetails = () => {
  return {
    type: "GET_USER",
  };
};

export const setUserNull = () => {
  return {
    type: "SET_USER_NULL",
    payload: null, // ✅ También aquí
  };
};
