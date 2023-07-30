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

export const createTaskForProject = (item) => ({
  type: actionType.CREATE_TASK_IN_PROJECT,
  item
});