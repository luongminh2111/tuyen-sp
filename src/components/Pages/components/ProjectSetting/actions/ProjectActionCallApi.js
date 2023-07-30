import { BASE_URL } from "../../../../../contains/config"
import callApi from "../../../../../ulti/callApi";
import { getListMemberOfWorkspace } from "../../Workplace/actions/WorkplaceActionRedux";
import { getListMemberForProject, getListMileStone } from "./ProjectActionRedux";

export const updateProject = (request, id) => (dispatch) => {
  const endPoint = `${BASE_URL}/api/project/${id}`;
  const options = {
    method: 'POST',
    data: JSON.stringify(request),
  }
  return callApi(endPoint, options).then( res => {
    return res;
  })
};

export const getListMileStoneInProject = (projectId) => (dispatch) => {
  const endPoint = `${BASE_URL}/api/project/${projectId}/milestones`;
  const options = {
    method: 'GET',
  }
  return callApi(endPoint, options).then( res => {
    if(res.status === 200) {
      dispatch(getListMileStone(res.data.data));
    } else {
      dispatch(getListMileStone([]));
    }
  })
};

export const createNewMileStone = (request) => (dispatch) => {
  const endPoint = `${BASE_URL}/api/milestone`;
  const options = {
    method: 'POST',
    data: JSON.stringify(request)
  }
  return callApi(endPoint, options).then( res => {
    console.log("check res :", res);
    return res;
  })
};

export const getListMemberInWorkspace = () => (dispatch, getState) => {

  const {
    workplace: {
      workspace: {
        id
      }
    }
  } = getState();

  const endPoint = `${BASE_URL}/api/get_members_by_workspace/${id}`;
  const options = {
    method: 'GET',
  }
  return callApi(endPoint, options).then( res => {
    dispatch(getListMemberOfWorkspace(res?.data?.data))
  })
};

export const addMemberToProject = (userIds, projectId) => (dispatch) => {
    const endPoint = `${BASE_URL}/api/add_list_members_to_project`;
    const request = {
      project_id: projectId,
      list_users_id: userIds
    }
    const options = {
      method: 'POST',
      data: JSON.stringify(request)
    }
    return callApi(endPoint, options).then(res => {
      console.log("check res :", res);
      if(res.status === 200) {
        dispatch(getListMemberOfProject(projectId));
      }
  
    })
};

export const getListMemberOfProject = (projectId) => (dispatch) => {
  const endPoint = `${BASE_URL}/api/members_of_project/${projectId}`;
  const options = {
    method: 'GET',
  }
  return callApi(endPoint, options).then( res => {
    if(res?.status === 200 && res?.data) {
      dispatch(getListMemberForProject(res.data));
    }

  })
}