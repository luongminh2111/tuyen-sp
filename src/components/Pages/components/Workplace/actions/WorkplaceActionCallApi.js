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

export const getListProject = (query) => (dispatch, getState) => {

  const options = {
    method: 'GET',
    mode: 'cors'
  }

  let endPoint = `${BASE_URL}/api/projects-by-user`;

  if(query?.length > 0 && query?.trim() !== ''){
    endPoint += `?key=${query}`;
  }

  return callApi(endPoint, options).then(json => {
    if(json?.status === 200 && json?.data?.data) {
      dispatch(updateListProject(json.data.data));
    }
  })
};

export const getAllUserInWorkspace = (id) => dispatch => {
  const options = {
    method: 'GET',
  }
  const endPoint = `${BASE_URL}/api/member_workspace/${id}`;
  return callApi(endPoint, options).then(json => {
    if(json?.status === 200 && json?.data?.data) {
      return json.data.data;
    }
  })
};

export const getAllUpdateItem = () => (dispatch, getState) => {
  const {
    projects: {
      itemDetail: {
        id
      }
    }
  } = getState();
  const options = {
    method: 'GET',
  }
  const endPoint = `${BASE_URL}/api/update_in_project/${id}`;
  return callApi(endPoint, options).then(json => {
    if(json?.status === 200 && json?.data?.data) {
      return json.data.data;
    }
  })
};


export const deleteUserInWorkspace = (id) => dispatch => {
  const endPoint = `${BASE_URL}/api/delete_user_workspace/${id}`;
  const options = {
    method: 'DELETE',
  }
  return callApi(endPoint, options).then( res => {
    return res;
  })
}