const initialState = {
  user: null, // or whatever initial state you want
};

const UserAuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_USER_NULL":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default UserAuthReducer;
