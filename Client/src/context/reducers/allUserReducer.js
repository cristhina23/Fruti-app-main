const initialState = {
  users: [],
};

const allUserReducer = (state = initialState, action) => {
  switch(action.type){
    case 'SET_ALL_USERS':
      return { ...state, users: action.allUsers };
    default:
      return state;
  }
};

export default allUserReducer;