import { BASE_URL } from "../../../../../contains/config";
import callApi from "../../../../../ulti/callApi";

export const getListBlog = () => dispatch => {
  const options = {
    method: 'GET'
  }

  const url =  `${BASE_URL}/api/blog/get`;

  return callApi(url, options).then(res => {
    if(res?.data){
      return res.data;
    }
  });
}