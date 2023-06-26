const initState = {
  isExpand : false
};

const global = (state = initState, action) => {
  switch (action.type) {
    case "CHANGE_EXPAND":
      return {
        ...state,
        isExpand: action.value
      }
    
    default:
      return state;
  }
};

export default global;
