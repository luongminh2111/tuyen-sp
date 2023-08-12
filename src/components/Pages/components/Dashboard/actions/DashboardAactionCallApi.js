import { BASE_URL } from "../../../../../contains/config"
import callApi from "../../../../../ulti/callApi";


export const getFilterMyTask = (user, time) => dispatch => {

  let url = `${BASE_URL}/api/dashboard_tasks?language=vi`
  if(user === 'created_by') {
    url += '&created=true';
  };

  if(time) {
    url += `&${time}=true`;
  }

  const options = {
    method: 'GET'
  }
  return callApi(url, options).then(
    res => {
      return res?.data
    }
  )
};

export const getAllUpdateInProject = () => dispatch => {

  let url = `${BASE_URL}/api/dashboard_update`

  const options = {
    method: 'GET'
  }
  return callApi(url, options).then(
    res => {
      return res?.data
    }
  )
};
