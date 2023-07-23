import * as actionsType from "../components/Pages/components/Workplace/actions/WorkplaceActionType";

const initState = {
  items: [],
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
    default:
      return state;
  }
};

export default staffs;
