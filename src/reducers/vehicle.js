
import * as actionTypeVehicle from "../components/Pages/components/Vehicles/actions/ListVehicleActionType";

const initState = {
  items: [],
  trendingItems: [],
  deals: [],
  filter: {
    page: 1,
    limit: 20,
    total: 0
  }
};

const vehicle = (state = initState, action) => {
  switch (action.type) {
    case actionTypeVehicle.UPDATE_LIST_VEHICLE:
      return {
        ...state,
        items: action.data || [],
      };
    case actionTypeVehicle.UPDATE_LIST_VEHICLE_TRENDING:
      return {
        ...state,
        trendingItems: action.data,
      };
      case actionTypeVehicle.UPDATE_LIST_VEHICLE_DEAL:
        return {
          ...state,
          deals: action.data,
        };
      case 'CHANGE_FILTER_PAGE_VEHICLE': 
      return {
        ...state, 
        filter: {
          ...state.filter,
          page: action.data
        }
      }
      case 'CHANGE_FILTER_TOTAL_VEHICLE': 
      return {
        ...state, 
        filter: {
          ...state.filter,
          total: action.data
        }
      }
    default:
      return state;
  }
};

export default vehicle;
