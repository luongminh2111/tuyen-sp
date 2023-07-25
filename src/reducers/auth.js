const initState = {
  account: {},
  isAuthenticated: false,
};

const auth = (state = initState, action) => {
  console.log("check action: ", action);
  switch (action.type) {
    case "RESET_AUTH":
      return initState;
    case "UPDATE_PROPERTIES_USER":
      return {
        ...state,
        account: action.account,
        isAuthenticated: true
      }
    
    default:
      return state;
  }
};

export default auth;
