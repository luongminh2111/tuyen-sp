import axios from "axios";
import { BASE_URL } from "../../../../../contains/config"
import callApi from "../../../../../ulti/callApi";
import { updateListVehicle, updateListVehicleDeal, updateListVehicleTrending } from "./ListVehicleActionRedux";

export const getListVehicle = (filter) => dispatch => {
  const options = {
    method: 'GET'
  }
  const url = `${BASE_URL}/api/vehicle/list_pagination?pageNumber=${filter.page}&pageSize=${filter.limit}`;
  
  return callApi(url, options).then(res => {
    if(res?.data){
      if(res?.data?.totalElements){
        dispatch({type: 'CHANGE_FILTER_TOTAL_VEHICLE', data: res.data.totalElements});
      }
      dispatch(updateListVehicle(res.data?.content));
    }
  });

};

export const getVehicleTrendingItems = () => dispatch => {
  const options = {
    method: 'GET'
  }

  const url =  `${BASE_URL}/api/vehicle/find/trending`;

  return callApi(url, options).then(res => {
    if(res?.data){
      dispatch(updateListVehicleTrending(res.data));
    }
  });
};

export const getVehicleDealItems = () => dispatch => {
  const options = {
    method: 'GET'
  }
  const url =  `${BASE_URL}/api/vehicle/find/top_deal`;

  return axios.get(url, options).then(res => {
    if(res?.data){
      dispatch(updateListVehicleDeal(res.data));
    }
  });
};

export const getSaleVehicle = () => dispatch => {
  const options = {
    method: 'GET'
  }

  const url = `${BASE_URL}/api/vehicle/get/sale_value`;
  
  return callApi(url, options).then(res => {
    if(res?.data){
      console.log("check sale vehicle : ", res?.data);
      return res?.data;
    }
  });
};

export const getVehicleDetailItem = (id) => dispatch => {
  const options = {
    method: 'GET'
  }

  const url =  `${BASE_URL}/api/vehicle/${id}`;

  return callApi(url, options).then(res => {
    if(res?.data){
      return res.data;
    }
  });
}