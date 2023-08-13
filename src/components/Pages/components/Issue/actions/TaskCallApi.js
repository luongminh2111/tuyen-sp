import { BASE_URL } from "../../../../../contains/config";
import callApi from "../../../../../ulti/callApi";
import { deleteComment, getListComment, getListTaskForProject } from "../../ProjectSetting/actions/ProjectActionRedux";


export const getListTask = (statusSelect, milestoneId, assigneeId, key) => (dispatch, getState) => {

  const {
    projects: {
      itemDetail: {
        id
      }
    }
  } = getState();

  let url = `${BASE_URL}/api/get-tasks/${id}?language=vi`;

  if(key && key?.trim() !== ''){
    url += `&key=${key}`
  }
  if(statusSelect && statusSelect?.length > 0){
    url += `&status=${statusSelect}`
  }
  if(milestoneId){
    url += `&milestone_id=${milestoneId}`
  }
  if(assigneeId){
    url += `&assignee_id=${assigneeId}`
  }

  const options = {
    method: "GET",
  };

  return callApi(url, options).then( 
    (response) => { 
      dispatch(getListTaskForProject(response?.data?.data));
      return response?.data?.data}, 
    (error) => { return error?.response})
};

export const submitComment = (request) => (dispatch) => {
  const url = `${BASE_URL}/api/comment`;
  const options = {
    method: "POST",
    data: JSON.stringify(request)
  };

  return callApi(url, options).then( 
    (response) => { 
      return response}, 
    (error) => { return error?.response})
};

export const EditComment = (request, id) => (dispatch) => {
  const url = `${BASE_URL}/api/comment/${id}`;
  const options = {
    method: "POST",
    data: JSON.stringify(request)
  };

  return callApi(url, options).then( 
    (response) => { 
      return response}, 
    (error) => { return error?.response})
};

export const DeleteComment = (id) => (dispatch) => {
  const url = `${BASE_URL}/api/comment/${id}`;
  const options = {
    method: "DELETE",
  };

  return callApi(url, options).then( 
    (response) => { 
      dispatch(deleteComment(id));
      return response}, 
    (error) => { return error?.response})
};

export const getListCommentInTask = (taskId, page, isViewMore) => (dispatch, getState) => {

  const url = `${BASE_URL}/api/get-comments-by-task/${taskId}?page=${page}`;
  const options = {
    method: 'GET'
  }
  return callApi(url, options).then(
    (response) => { 
      dispatch(getListComment(response?.data?.data, isViewMore))
      return response}, 
    (error) => { return error?.response}
  )
}

export const deleteTaskInProject = (id) => dispatch => {
  const url = `${BASE_URL}/api/task/${id}`;
  const options = {
    method: "DELETE",
  };

  return callApi(url, options).then( 
    (response) => { 
      dispatch({
        type: 'DELETE_TASK',
        id
      });
      return response}, 
    (error) => { return error?.response})
}