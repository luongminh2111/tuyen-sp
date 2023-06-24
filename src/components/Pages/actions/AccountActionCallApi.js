import axios from "axios";
import { BASE_URL } from "../../../contains/config";
import jwt_decode from "jwt-decode";
import { updateUser } from "./AccountActionRedux";

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

  return axios.post(url , loginRequest).then(res => {
    if(res.status === 200){
      if(res?.data?.token){
        sessionStorage.setItem('token', res.data.token);
        const username = jwt_decode(JSON.stringify(res.data.token))?.sub;
        dispatch(updateUser({username}))
        return true;
      }
      return false;
    }
  });
};
