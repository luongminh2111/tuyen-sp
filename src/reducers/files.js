const initState = {
  items: [],
  filter: {},
};

const files = (state = initState, action) => {
  switch (action.type) {
    case "ADD_NEW_FILE":
      return {
        ...state,
        items: state.items.concat(action.item),
      };
    case "GET_LIST_FILE": {
      return {
        ...state,
        items: action.items,
      };
    }
    case "UPDATE_FILE": {
      const newItems = state.items?.filter((e) => e.id !== action.oldId);

      return {
        ...state,
        items: newItems?.concat(action.item),
      };
    }
    case "DELETE_FILE": {
      const newItems = state.items?.filter(
        (e) => !action.value?.includes(e.id)
      );
      return {
        ...state,
        items: newItems,
      };
    }
    default:
      return state;
  }
};

export default files;
