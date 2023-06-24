import * as actionTypeHotel from "../components/Pages/components/Hotels/actions/ListHotelActionType";

const initState = {
  items: [],
  trendingItems: [],
  deals: [],
  filter: {
    page: 1,
    limit: 20,
    total: 20
  }
};

const hotel = (state = initState, action) => {
  switch (action.type) {
    case actionTypeHotel.UPDATE_LIST_HOTEL:
      return {
        ...state,
        items: action.data || [],
      };
    case actionTypeHotel.UPDATE_LIST_HOTEL_TRENDING:
      return {
        ...state,
        trendingItems: action.data,
      };
    case actionTypeHotel.UPDATE_LIST_HOTEL_DEAL:
      return {
        ...state,
        deals: action.data,
      }
    case 'CHANGE_FILTER_PAGE_HOTEL': 
      return {
        ...state, 
        filter: {
          ...state.filter,
          page: action.data
        }
      }
      case 'CHANGE_FILTER_TOTAL_HOTEL': 
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

export default hotel;
