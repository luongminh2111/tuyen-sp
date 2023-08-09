
import { BASE_URL } from "../../../../../contains/config";
import callApi from "../../../../../ulti/callApi";

export const getMyProfile = (id) => (dispatch) => {

  let url = `${BASE_URL}/api/my_profile`;
  if (id > 0) {
    url = `${BASE_URL}/api/member/${id}`;
  }
  const options = {
    method: 'GET'
  }

  return callApi(url , options).then(res => {
    if(res?.data?.data) {
      dispatch({
        type: 'GET_CURRENT_USER',
        item: res.data.data
      })
    }
  });
};

export const updateMyProfile = (request) => (dispatch) => {

  const url = `${BASE_URL}/api/update_profile`;
  const options = {
    method: 'POST',
    data: JSON.stringify(request)
  }

  return callApi(url , options).then(res => {
    return res;
  });
};