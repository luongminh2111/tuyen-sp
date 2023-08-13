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

export const getListMileStoneInProject = () => (dispatch, getState) => {
  const {
    projects: {
      itemDetail: {
        id
      }
    }
  } = getState();
  const endPoint = `${BASE_URL}/api/project/${id}/milestones`;
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

export const createNewMileStone = (request, milestoneId) => (dispatch) => {

  let endPoint = `${BASE_URL}/api/milestone`;

  if(milestoneId > 0) {
    endPoint += `/${milestoneId}`
  }

  const options = {
    method: 'POST',
    data: JSON.stringify(request)
  }
  return callApi(endPoint, options).then( res => {
    return res;
  })
};

export const getListMemberInWorkspace = (filterStaff) => (dispatch, getState) => {

  const {
    workplace: {
      workspace: {
        id
      }
    }
  } = getState();

  let endPoint = `${BASE_URL}/api/get_members_by_workspace/${id}?language=vi`;
  if (filterStaff) {
    if(Object.keys(filterStaff).length){
      if(filterStaff?.query?.trim() !== '' && filterStaff?.query?.length > 0) {
        endPoint += `&key=${filterStaff?.query}`;
      }
      if(filterStaff?.role > 0) {
        endPoint += `&role=${filterStaff?.role}`;
      }
    }
  }

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
      if(res.status === 200) {
        dispatch(getListMemberOfProject(projectId));
      }
  
    })
};

export const getListMemberOfProject = (projectId, name, role) => (dispatch) => {
  let endPoint = `${BASE_URL}/api/members_of_project/${projectId}?language=vi`;

  if(!!name) {
    endPoint += `&name=${name}`;
  } 
  if(!!role && role !== 0) {
    endPoint += `&role=${role}`;
  }

  const options = {
    method: 'GET',
  }
  return callApi(endPoint, options).then( res => {
    if(res?.status === 200 && res?.data) {
      dispatch(getListMemberForProject(res.data));
    } 
  })
};

export const deleteUserInProject = (userId) => (dispatch, getState) => {
  const {
    projects: {
      itemDetail: {
        id
      }
    }
  } = getState();
  const request = {
    user_id: userId
  }
  const endPoint = `${BASE_URL}/api/delete_user_project/${id}`;
  const options = {
    method: 'DELETE',
    data: JSON.stringify(request)
  }
  return callApi(endPoint, options).then( res => {
    return res;
  })
}

export const deleteMilestoneInProject = (milestoneId) => (dispatch, getState) => {
  const {
    projects: {
      itemDetail: {
        id
      }
    }
  } = getState();
  const request = {
    milestone_id: milestoneId
  }
  const endPoint = `${BASE_URL}/api/milestone/${milestoneId}`;
  const options = {
    method: 'DELETE',
    // data: JSON.stringify(request)
  }
  return callApi(endPoint, options).then( res => {
    return res;
  })
}