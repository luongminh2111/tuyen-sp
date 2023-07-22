import { BASE_URL } from "../../../../../contains/config";
import callApi from "../../../../../ulti/callApi";
import { saveWorkspace, updateWorkspaceRedux } from "./WorkplaceActionRedux";

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
      console.log("check vao day roi chu :", json.data.data);
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
      console.log("check vao day roi chu  5555:", json.data.data);
      dispatch(updateWorkspaceRedux(json.data.data));
    }
  })
}