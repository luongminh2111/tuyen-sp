const initState = {
  detail: {}
};

const tasks = (state = initState, action) => {
  switch (action.type) {
    case "RESET_TASK_DETAIL":
      return initState;
    case "UPDATE_TASK_DETAIL":
      return {
        ...state,
        detail: action.item
      };
    default:
      return state;
  }
};

export default tasks;
