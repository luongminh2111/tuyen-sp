import axios from "axios";
import { BASE_URL } from "../../../contains/config";
import callApi from "../../../ulti/callApi";

export const register = (registerRequest) => (dispatch) => {
  const url = `${BASE_URL}/api/register`;

  return axios.post(url, registerRequest).then((res) => {
    if (res.status === 200) {
      return res?.data;
    }
  });
};

export const login = (loginRequest) => (dispatch) => {
  const url = `${BASE_URL}/api/login`;

  const options = {
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  };

  return axios.post(url, loginRequest, options).then(
    (response) => {
      return response;
    },
    (error) => {
      return error?.response;
    }
  );
};

export const logout = () => (dispatch) => {
  const url = `${BASE_URL}/api/logout`;
  const options = {
    method: "POST",
  };
  return callApi(url, options).then(
    (response) => {
      return response;
    },
    (error) => {
      return error?.response;
    }
  );
};

export const forgotPassword = (request) => (dispatch) => {
  const url = `${BASE_URL}/api/forgot-password`;
  const options = {
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.post(url, request, options).then(
    (response) => {
      return response?.data?.status;
    },
    (error) => {
      return error?.response;
    }
  );
};

export const resetPassword = (request) => (dispatch) => {
  const url = `${BASE_URL}/api/reset-password`;
  const options = {
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    }
  };
  return axios.post(url, request, options).then(
    (response) => {
      return response?.data;
    },
    (error) => {
      console.log("check error :", error);
      return error?.response?.data;
    }
  );
};
