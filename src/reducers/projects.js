import * as actionsType from "../components/Pages/components/Workplace/actions/WorkplaceActionType";

import * as projectType from "../components/Pages/components/ProjectSetting/actions/ProjectActionType";

const initState = {
  items: [],
  itemDetail: {},
  milestone: [],
  members: [],
  tasks: [],
};

const projects = (state = initState, action) => {
  switch (action.type) {
    case actionsType.ADD_NEW_PROJECT:
      return {
        ...state,
        items: [...state.items, action.item],
      };
    case actionsType.UPDATE_LIST_PROJECTS:
      return {
        ...state,
        items: action.items,
      };
    case actionsType.SHOW_PROJECT:
      return {
        ...state,
        itemDetail: state.items?.find((e) => e.id === action.id),
      };
    case projectType.UPDATE_PROJECT_DETAIL:
      return {
        ...state,
        itemDetail: action.item,
      };
    case projectType.GET_LIST_MILESTONE:
      return {
        ...state,
        milestone: action.items,
      };
    case projectType.CREATE_NEW_MILESTONE:
      return {
        ...state,
        milestone: [action.item, ...state.milestone],
      };
    case projectType.GET_LIST_MEMBER_IN_PROJECT:
      return {
        ...state,
        members: action.members,
      };
    case projectType.GET_LIST_TASK_IN_PROJECT:
      return {
        ...state,
        tasks: action.items,
      };
    case projectType.CREATE_TASK_IN_PROJECT:
      return {
        ...state,
        tasks: [action?.item, ...state.tasks],
      };
    // case projectType.CREATE_SUB_TASK_IN_PROJECT: 
    //   const { tasks } = state;
    //   const newTask = tasks?.map(e => {
    //     if (e.id === action?.item?.parent_task_id) {
    //       return {
    //         ...e, ...action.item
    //       }
    //     }
    //     return e;
    //   });
    //   return {
    //     ...state,
    //     tasks: newTask
    //   }
    default:
      return state;
  }
};

export default projects;
