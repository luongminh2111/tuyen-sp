import * as actionType from "./WorkplaceActionType";

export const saveWorkspace = (value) => ({
  type: actionType.GET_WORKSPACE,
  value
});

export const updateWorkspaceRedux = (value) => ({
  type: actionType.UPDATE_WORKSPACE_PROPERTIES,
  value
});