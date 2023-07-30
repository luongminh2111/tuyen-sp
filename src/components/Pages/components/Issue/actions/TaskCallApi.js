import { BASE_URL } from "../../../../../contains/config";
import callApi from "../../../../../ulti/callApi";
import { getListTaskForProject } from "../../ProjectSetting/actions/ProjectActionRedux";


export const getListTask = () => (dispatch, getState) => {

  const {
    projects: {
      itemDetail: {
        id
      }
    }
  } = getState();

  const url = `${BASE_URL}/api/tasks-by-project/${id}`;
  const options = {
    method: "GET",
  };

  return callApi(url, options).then( 
    (response) => { 
      dispatch(getListTaskForProject(response?.data?.data));
      return response}, 
    (error) => { return error?.response})
};
