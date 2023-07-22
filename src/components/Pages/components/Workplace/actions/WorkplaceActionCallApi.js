import { BASE_URL } from "../../../../../contains/config";
import callApi from "../../../../../ulti/callApi";
import { addNewProject, saveWorkspace, updateWorkspaceRedux } from "./WorkplaceActionRedux";

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
      localStorage.setItem("workspace_id", json.data.data.id);
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
      console.log("check json :", json);
      return json?.data?.message;
    }
  })
}

export const createMemberForWorkspace = (request) => async (dispatch) => {

  const options = {
    method: 'POST',
    data: JSON.stringify(request)
  }
  const endPoint = `${BASE_URL}/api/register`;

  return callApi(endPoint, options).then(json => {
    console.log("check create member:", json);
    if(json?.status === 200 && json) {
      
      return json?.data;
    }
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
  const endPoint = `${BASE_URL}/api/project/${workspace_id}`;
  return callApi(endPoint, options).then(json => {
    if(json?.status === 200 && json?.data?.data) {
    }
  })
};