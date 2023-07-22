import axios from "axios";
import { BASE_URL } from "../../../contains/config";
import callApi from "../../../ulti/callApi";

export const register = (registerRequest) => (dispatch) => {

  const url = `${BASE_URL}/api/register`;

  return axios.post(url , registerRequest).then(res => {
    if(res.status === 200){
      return res?.data;
    }
  });
};

export const login = (loginRequest) => (dispatch) => {

  const url = `${BASE_URL}/api/login`;

  return axios.post(url , loginRequest).then( 
    (response) => { return response}, 
    (error) => { return error?.response})
};


export const logout = () => (dispatch) => {

  const url = `${BASE_URL}/api/logout`;
  const options = {
    method: "POST",
  };
  return callApi(url, options).then( 
    (response) => { return response}, 
    (error) => { return error?.response})
};
