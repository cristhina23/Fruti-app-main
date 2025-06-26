export const setAllUserDetails = (allUsers) => {
  return {
    type: 'SET_ALL_USERS',
    allUsers: allUsers,
  };
};

export const getAllUserDetails = () => {
  return {
    type: 'GET_ALL_USERS',
  };
};

