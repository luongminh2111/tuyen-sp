import axios from 'axios';

const callApi = function callApi(url, options) {
  const accessToken = sessionStorage.getItem(`token_admin`);
  if (!options.mode) {
    options.mode = 'cors';
  }
  options.headers = {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };
  options.url = url;
  return axios(options)
    .then(
      (response) => { return response; },
      (error) => { return error?.response; },
    );
};

export default callApi;
