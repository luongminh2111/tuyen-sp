

const initState = {
  destinationItems: []
};

const global = (state = initState, action) => {
  switch (action.type) {
    case 'UPDATE_DESTINATION_ITEMS':
      return {
        ...state,
        destinationItems: action.data,
      };
    default:
      return state;
  }
};

export default global;
