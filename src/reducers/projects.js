import * as actionsType from "../components/Pages/components/Workplace/actions/WorkplaceActionType";

import * as projectType from "../components/Pages/components/ProjectSetting/actions/ProjectActionType";

const initState = {
  items: [],
  itemDetail: {},
  milestone: [],
  members: [],
  tasks: [],
  comments: [],
  filterTask: {},
  filterProject: {}
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
    case projectType.UPDATE_MILESTONE:
      const milestones = state.milestone?.filter(e => e.id !== action.item.id)?.concat(action.item);
      return {
        ...state,
        milestone: milestones,
      };
    case "DELETE_MILESTONE": {
      const milestones1 = state.milestone?.filter(e => e.id !== action.id)
      return {
        ...state,
        milestone: milestones1,
      };
    }
    case projectType.GET_LIST_MEMBER_IN_PROJECT:
      return {
        ...state,
        members: action.members,
      };
      case projectType.UPDATE_LIST_MEMBER_IN_PROJECT:
        const memberRedux = state.members;
        const newMembers = memberRedux?.filter(e => e.id !== action.id);
      return {
        ...state,
        members: newMembers,
      };
    case projectType.GET_LIST_TASK_IN_PROJECT:
      return {
        ...state,
        tasks: action.items,
      };
      case projectType.UPDATE_LIST_TASK_IN_PROJECT:
        const newTasks = state.tasks?.filter(e => e.id !== action?.item?.id)?.concat(action?.item);
        return {
          ...state,
          tasks: newTasks,
        };
    case projectType.CREATE_TASK_IN_PROJECT:
      return {
        ...state,
        tasks: [action?.item, ...state.tasks],
      };
    case "DELETE_TASK":
      const newTask = state.tasks?.filter(e => e.id !== action.id);
      return {
        ...state,
        task: newTask
      }
    case projectType.GET_LIST_COMMENT: 
      if(action?.isViewMore) {
        const preComments = state.comments;
        const preListComment = preComments?.data;
        const newDataComment = preListComment?.concat(action.items.data);
        const newComments = {
          current_page: action.items.current_page,
          per_page: action.items.per_page,
          total: action.items.total,
          data: newDataComment
        } 
        return {
          ...state,
          comments: newComments
        }
      }
      return {
        ...state,
        comments: action.items
      }
    case projectType.CREATE_NEW_COMMENT: 
      const preListComment = state.comments?.data;
      const newDataComment = preListComment?.concat(action.item);
      const newLists = {
        current_page: (state.comments || 1),
        per_page: 5,
        total: state.comments?.total > 0 ? Number(state.comments?.total) + 1 : 1,
        data: newDataComment
      } 
      return {
        ...state,
        comments: newLists
      }
    case projectType.UPDATE_COMMENT: 
      const { comments } = state;
      const newComments = comments?.data?.map(e => {
        if (e.id === action.item.id) {
          return action.item;
        }
        return e;
      })
      return {
        ...state,
        comments: {...state.comments, data: newComments}
      }
      case projectType.DELETE_COMMENT: 
      const afterList = state.comments?.data?.filter(e =>  e.id !== action.itemId);
      return {
        ...state,
        comments: {...state.comments, 
          data: afterList,
          total: state.comments?.total > 1 ? Number(state.comments?.total) - 1 : 0 }
      }
    case projectType.UPDATE_FILTER_TASK: 
      return {
        ...state,
        filterTask: {
          ...state.filterTask,
          [action.key]: action.value
        }
      }
    case projectType.CLEAR_FILTER_TASK: 
      return {
        ...state,
        filterTask: {}
      }
    case projectType.UPDATE_FILTER_PROJECT: 
      return {
        ...state,
        filterProject: {
          ...state.filterProject,
          [action.key]: action.value
        }
      }
    case projectType.CLEAR_FILTER_PROJECT: 
      return {
        ...state,
        filterProject: {}
      }
    default:
      return state;
  }
};

export default projects;
