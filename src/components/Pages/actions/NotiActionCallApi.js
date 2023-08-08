import { BASE_URL } from "../../../contains/config"
import callApi from "../../../ulti/callApi";

export const getListNoti = (userId) => dispatch => {
  const url = `${BASE_URL}/api/notifications/${userId}`;
  const options = {
    method: 'GET'
  }
  return callApi(url, options).then(res => {
    return res?.data
  });
};

export const getNotiCount = () => dispatch => {
  const url = `${BASE_URL}/api/count_noti`;
  const options = {
    method: 'GET'
  }
  return callApi(url, options).then(res => {
    return res?.data
  });
};

export const readNoti = (notiId) => dispatch => {
  const url = `${BASE_URL}/api/read_noti/${notiId}`;
  const options = {
    method: 'POST'
  }
  return callApi(url, options).then(res => {
    return res?.data
  });
};
