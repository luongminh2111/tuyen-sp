import * as actionsType from "../components/Pages/components/Workplace/actions/WorkplaceActionType";

const initState = {
  items: [],
  filterStaff: {} 
};

const staffs = (state = initState, action) => {
  switch (action.type) {
    case actionsType.CREATE_NEW_MEMBER:
      return {
        ...state,
        items: [...state.items, action.value],
      };
    case actionsType.GET_LIST_MEMBER_IN_WORKSPACE:
      return {
        ...state,
        items: action.items,
      };
    case actionsType.UPDATE_LIST_MEMBER_IN_WORKSPACE:
      const items = state.items;
      const newItems = items?.filter(e => e.id !== action.id);
      return {
        ...state,
        items: newItems,
      };
    case actionsType.UPDATE_FILTER_STAFF: 
      return {
        ...state,
        filterStaff: {
          ...state.filterStaff,
          [action.key]: action.value
        }
      }
    default:
      return state;
  }
};

export default staffs;
