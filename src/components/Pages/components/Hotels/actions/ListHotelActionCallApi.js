import axios from "axios";
import { BASE_URL } from "../../../../../contains/config"
import callApi from "../../../../../ulti/callApi";
import { updateListHotel, updateListHotelTrending, updateListHotelDeal } from "./ListHotelActionRedux";

export const getListHotel = (filter) => dispatch => {
  const options = {
    method: 'GET'
  }

  const url = `${BASE_URL}/api/hotel/list_pagination?pageNumber=${filter.page}&pageSize=${filter.limit}`;
  
  return callApi(url, options).then(res => {
    if(res?.data){
      if(res?.data?.totalElements){
        dispatch({type: 'CHANGE_FILTER_TOTAL_HOTEL', data: res.data.totalElements});
      }
      dispatch(updateListHotel(res.data?.content));
    }
  });
}

export const getHotelTrendingItems = () => dispatch => {
  const options = {
    method: 'GET'
  }

  const url =  `${BASE_URL}/api/hotel/find/trending`;

  return axios.get(url, options).then(res => {
    if(res?.data){
      dispatch(updateListHotelTrending(res.data));
    }
  });
};

export const getHotelDeal = (id) => dispatch => {
  const options = {
    method: 'GET'
  }

  const url =  `${BASE_URL}/api/hotel/find/top_deal`;

  return axios.get(url, options).then(res => {
    if(res?.data){
      dispatch(updateListHotelDeal(res.data));
    }
  });
}

export const getHotelDetailItem = (id) => dispatch => {
  const options = {
    method: 'GET'
  }

  const url =  `${BASE_URL}/api/hotel/${id}`;

  return callApi(url, options).then(res => {
    if(res?.data){
      return res.data;
    }
  });
}
//
export const getSaleHotel = () => dispatch => {
  const options = {
    method: 'GET'
  }

  const url = `${BASE_URL}/api/hotel/get/sale_value`;
  
  return callApi(url, options).then(res => {
    if(res?.data){
      console.log("check sale hotel : ", res?.data);
      return res?.data;
    }
  });
}