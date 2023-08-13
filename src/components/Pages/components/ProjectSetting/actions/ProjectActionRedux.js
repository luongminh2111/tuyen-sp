import * as actionType from "./ProjectActionType";

export const updateProjectDetail = (item) => ({
  type: actionType.UPDATE_PROJECT_DETAIL,
  item
});

export const getListMileStone = (items) => ({
  type: actionType.GET_LIST_MILESTONE,
  items
});

export const saveNewMilestone = (item) => ({
  type: actionType.CREATE_NEW_MILESTONE,
  item
});
export const updateMilestone = (item) => ({
  type: actionType.UPDATE_MILESTONE,
  item
});

export const updateMemberForProject = (members) => ({
  type: actionType.UPDATE_MEMBER_IN_PROJECT,
  members
});

export const getListMemberForProject = (members) => ({
  type: actionType.GET_LIST_MEMBER_IN_PROJECT,
  members
});

export const getListTaskForProject = (items) => ({
  type: actionType.GET_LIST_TASK_IN_PROJECT,
  items
});
export const updateListTaskForProject = (item) => ({
  type: actionType.UPDATE_LIST_TASK_IN_PROJECT,
  item
});

export const createTaskForProject = (item) => ({
  type: actionType.CREATE_TASK_IN_PROJECT,
  item
});

export const createSubTaskForProject = (item) => ({
  type: actionType.CREATE_SUB_TASK_IN_PROJECT,
  item
});

export const createNewComment = (item) => ({
  type: actionType.CREATE_NEW_COMMENT,
  item
});

export const getListComment = (items, isViewMore) => ({
  type: actionType.GET_LIST_COMMENT,
  items,
  isViewMore
});

export const updateComment = (item) => ({
  type: actionType.UPDATE_COMMENT,
  item
});

export const deleteComment = (itemId) => ({
  type: actionType.DELETE_COMMENT,
  itemId
});

export const updateFilterTask = (key, value) => ({
  type: actionType.UPDATE_FILTER_TASK,
  key,
  value
});

export const clearFilterTask = () => ({
  type: actionType.CLEAR_FILTER_TASK
});

export const updateFilterProject = (key, value) => ({
  type: actionType.UPDATE_FILTER_PROJECT,
  key,
  value
});

export const clearFilterProject = () => ({
  type: actionType.CLEAR_FILTER_PROJECT
});
