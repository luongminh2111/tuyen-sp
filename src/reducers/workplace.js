import * as actionsType from "../components/Pages/components/Workplace/actions/WorkplaceActionType";

const initState = {
  workspace: {}
};

const workplace = (state = initState, action) => {
  switch (action.type) {
    case actionsType.GET_WORKSPACE:
      return {
        ...state,
        workspace: action.value
      }
    case actionsType.UPDATE_WORKSPACE_PROPERTIES:
      return {
        ...state,
        workspace: action.value
      }
    default:
      return state;
  }
};

export default workplace;
