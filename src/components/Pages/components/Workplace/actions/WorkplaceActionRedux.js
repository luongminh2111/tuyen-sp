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
})