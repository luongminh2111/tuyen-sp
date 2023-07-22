const initState = {
  account: {},
  positionCallApiCheckAuth: false,
};

const auth = (state = initState, action) => {
  console.log("check action: ", action);
  switch (action.type) {
    case "CHANGE_POSITION_CALL_API_CHECK_AUTH":
      return {
        ...state,
        positionCallApiCheckAuth: action.status,
      };
    case "UPDATE_PROPERTIES_USER":
      return {
        ...state,
        account: action.account
      }
    
    default:
      return state;
  }
};

export default auth;
