const userReducer = (state = null, action) => {
  switch(action.type){
    case 'GET_USER':
      return state;
    case 'SET_USER':
      return action.payload;
    case 'SET_USER_NULL':
      return action.payload;
    default:
      return state;
  }
};

export default userReducer;