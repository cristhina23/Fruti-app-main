const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case "GET_CART_ITEMS":
      return state;

    case "SET_CART_ITEMS":
      return { ...state, cartItems: action.items };

    case "CLEAR_CART_ITEMS":
      return { ...state, cartItems: [] };

    default:
      return state;
  }
};

export default cartReducer;
