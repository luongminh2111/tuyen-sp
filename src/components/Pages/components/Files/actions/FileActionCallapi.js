import { BASE_URL } from "../../../../../contains/config";
import callApi from "../../../../../ulti/callApi";


export const uploadFile = (request) => (dispatch) => {
  const url = `${BASE_URL}/api/document`;
  const options = {
    method: "POST",
    data: JSON.stringify(request)
  };

  return callApi(url, options).then( 
    (response) => { 
      return response}, 
    (error) => { return error?.response})
};

export const updateFile = (request, id) => (dispatch) => {
  const url = `${BASE_URL}/api/document/${id}`;
  const options = {
    method: "POST",
    data: JSON.stringify(request)
  };

  return callApi(url, options).then( 
    (response) => { 
      return response}, 
    (error) => { return error?.response})
};

export const deleteFile = (ids, curProjectId) => (dispatch) => {
  const request = {
    ids,
    project_id: curProjectId
  };

  const url = `${BASE_URL}/api/document`;
  const options = {
    method: "DELETE",
    data: JSON.stringify(request)
  };

  return callApi(url, options).then( 
    (response) => { 
      return response}, 
    (error) => { return error?.response})
};


export const getListFile = () => (dispatch, getState) => {

  const {projects : { itemDetail: { id }}} = getState();

  const url = `${BASE_URL}/api/documents_by_project/${id}`;
  const options = {
    method: "GET",
  };

  return callApi(url, options).then( 
    (response) => { 
      dispatch({type: 'GET_LIST_FILE', items: response?.data?.data});
      return response}, 
    (error) => { return error?.response})
};