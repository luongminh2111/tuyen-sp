import * as actionsType from "../components/Pages/components/Workplace/actions/WorkplaceActionType";

const initState = {
  items: []
};

const staffs = (state = initState, action) => {
  switch (action.type) {
    case actionsType.ADD_NEW_PROJECT:
      return {
        ...state,
        items: [...state.items, action.value]
      }
    
    default:
      return state;
  }
};

export default staffs;
