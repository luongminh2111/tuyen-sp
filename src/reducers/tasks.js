const initState = {
  detail: {}
};

const tasks = (state = initState, action) => {
  console.log("check action: ", action);
  switch (action.type) {
    case "RESET_DETAIL":
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
