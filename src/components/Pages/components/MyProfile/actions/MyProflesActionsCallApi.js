
import { BASE_URL } from "../../../../../contains/config";
import callApi from "../../../../../ulti/callApi";

export const getMyProfile = () => (dispatch) => {

  const url = `${BASE_URL}/api/my_profile`;
  const options = {
    method: 'GET'
  }

  return callApi(url , options).then(res => {
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