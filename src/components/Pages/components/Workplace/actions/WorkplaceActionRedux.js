import * as actionType from "./WorkplaceActionType";

export const saveWorkspace = (value) => ({
  type: actionType.GET_WORKSPACE,
  value
});

export const updateWorkspaceRedux = (value) => ({
  type: actionType.UPDATE_WORKSPACE_PROPERTIES,
  value
});

export const saveProjectRedux = (value) => ({
  type: actionType.ADD_NEW_PROJECT,
  value
});

export const createNewMember = (value) => ({
  type: actionType.CREATE_NEW_MEMBER,
  value
});

export const addNewProject = (item) => ({
  type: actionType.ADD_NEW_PROJECT,
  item
});

export const updateListProject = (items) => ({
  type: actionType.UPDATE_LIST_PROJECTS,
  items
});

export const showDetailProject = (id) => ({
  type: actionType.SHOW_PROJECT,
  id
});

export const getListMemberOfWorkspace = (items) => ({
  type: actionType.GET_LIST_MEMBER_IN_WORKSPACE,
  items
});

export const updateListMemberOfWorkspace = (id) => ({
  type: actionType.UPDATE_LIST_MEMBER_IN_WORKSPACE,
  id
});

export const updateFilterStaff = (key, value) => ({
  type: actionType.UPDATE_FILTER_STAFF,
  key,
  value
});