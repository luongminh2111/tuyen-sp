import { BASE_URL } from "../../../../../contains/config";
import callApi from "../../../../../ulti/callApi";


export const createTask = (request) => (dispatch) => {
  const url = `${BASE_URL}/api/task`;
  const options = {
    method: "POST",
    data: JSON.stringify(request)
  };
  return callApi(url, options).then( 
    (response) => { 
      return response}, 
    (error) => { return error?.response})
};
