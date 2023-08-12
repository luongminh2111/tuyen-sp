const initState = {
  account: {},
  currentUser: {},
  isAuthenticated: false,
};

const auth = (state = initState, action) => {
  switch (action.type) {
    case "RESET_AUTH":
      return initState;
    case "UPDATE_PROPERTIES_USER":
      return {
        ...state,
        account: action.account,
        isAuthenticated: true,
      };
    case "GET_CURRENT_USER":
      return {
        ...state,
        currentUser: action.item,
      };
    case "RESET_CURRENT_USER":
      return {
        ...state,
        currentUser: {},
      };
    default:
      return state;
  }
};

export default auth;
