const initState = {
  isExpand: false,
  isReset: false,
};

const global = (state = initState, action) => {
  switch (action.type) {
    case "CHANGE_EXPAND":
      return {
        ...state,
        isExpand: action.value,
      };
    case "RESET_LIST":
      return {
        ...state,
        isReset: action.value,
      };
    default:
      return state;
  }
};

export default global;
