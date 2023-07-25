import { BASE_URL } from "../../../../../contains/config";
import callApi from "../../../../../ulti/callApi";
import { addNewProject, saveWorkspace, updateListProject, updateWorkspaceRedux } from "./WorkplaceActionRedux";

export const getWorkSpace = () => (dispatch, getState) => {
  const {
    auth: {
      account: {
        workspace_id
      }
    }
  } = getState();

  const options = {
    method: 'GET',
  }
  const endPoint = `${BASE_URL}/api/workspace/${workspace_id}`;
  return callApi(endPoint, options).then(json => {
    if(json?.status === 200 && json?.data?.data) {
      dispatch(saveWorkspace(json.data.data));
    }
  })
};

export const updateWorkSpace = (request) => (dispatch, getState) => {
  const {
    auth: {
      account: {
        workspace_id
      }
    }
  } = getState();

  const options = {
    method: 'POST',
    data: JSON.stringify(request)
  }
  const endPoint = `${BASE_URL}/api/workspace/${workspace_id}`;
  return callApi(endPoint, options).then(json => {
    if(json?.status === 200 && json?.data?.data) {
      dispatch(updateWorkspaceRedux(json.data.data));
      return null;
    } else {
      return json?.data?.message;
    }
  })
}

export const createProject = (request) => (dispatch) => {

  const options = {
    method: 'POST',
    data: JSON.stringify(request)
  }
  const endPoint = `${BASE_URL}/api/project`;

  return callApi(endPoint, options).then(json => {
    if(json?.status === 200 && json?.data?.data) {
        dispatch(addNewProject(json.data.data));
        return null;
    } else {
      return json?.data?.message;
    }
  })
}

export const createMemberForWorkspace = (request) => (dispatch) => {

  const options = {
    method: 'POST',
    data: JSON.stringify(request)
  }
  const endPoint = `${BASE_URL}/api/register`;

  return callApi(endPoint, options).then(json => {
    return json;
  })
};

export const getListProject = () => (dispatch, getState) => {
  const {
    auth: {
      account: {
        workspace_id
      }
    }
  } = getState();

  const options = {
    method: 'GET',
  }
  const endPoint = `${BASE_URL}/api/get_projects_by_workspace/${workspace_id}`;
  return callApi(endPoint, options).then(json => {
    console.log("check json :", json);
    if(json?.status === 200 && json?.data?.data) {
      dispatch(updateListProject(json.data.data));
    }
  })
};

export const getAllUserInWorkspace = () => {
  const options = {
    method: 'GET',
  }
  const endPoint = `${BASE_URL}/api/member_workspace`;
  return callApi(endPoint, options).then(json => {
    if(json?.status === 200 && json?.data?.data) {
      return null;
    }
  })
};

