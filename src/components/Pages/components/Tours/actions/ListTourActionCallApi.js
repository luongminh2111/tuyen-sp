import axios from "axios";
import { BASE_URL } from "../../../../../contains/config"
import callApi from "../../../../../ulti/callApi";
import { updateListTour, updateListTourTrending, updateListTourDeal } from "./ListTourActionRedux";

export const getListTour = (filter) => dispatch => {
  const options = {
    method: 'GET'
  }

  const url = `${BASE_URL}/api/tour/list_pagination?pageNumber=${filter.page}&pageSize=${filter.limit}`;
  
  return callApi(url, options).then(res => {
    if(res?.data){
      if(res?.data?.totalElements){
        dispatch({type: 'CHANGE_FILTER_TOTAL_TOUR', data: res.data.totalElements});
      }
      dispatch(updateListTour(res.data?.content));
    }
  });

}

export const getTourTrendingItems = () => dispatch => {
  const options = {
    method: 'GET'
  }

  const url =  `${BASE_URL}/api/tour/find/trending`;

  return callApi(url, options).then(res => {
    if(res?.data){
      dispatch(updateListTourTrending(res.data));
      return res.data;
    }
  });
} 
export const getTourDeals = () => dispatch => {
  const options = {
    method: 'GET'
  }

  const url =  `${BASE_URL}/api/tour/find/top_deal`;

  return axios.get(url, options).then(res => {
    if(res?.data){
      dispatch(updateListTourDeal(res.data));
      return res.data;
    }
  });
};

export const getSaleTour = () => dispatch => {
  const options = {
    method: 'GET'
  }

  const url = `${BASE_URL}/api/tour/get/sale_value`;
  
  return callApi(url, options).then(res => {
    if(res?.data){
      console.log("check sale tour : ", res?.data);
      return res?.data;
    }
  });
};

export const getTourDetailItem = (id) => dispatch => {
  const options = {
    method: 'GET'
  }

  const url =  `${BASE_URL}/api/tour/${id}`;

  return callApi(url, options).then(res => {
    if(res?.data){
      return res.data;
    }
  });
}