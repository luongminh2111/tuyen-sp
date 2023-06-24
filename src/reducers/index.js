import { combineReducers } from 'redux';
import auth from './auth';
import hotel from './hotel';
import tour from './tour';
import vehicle from './vehicle';
import global from './global';

export default combineReducers({
  auth,
  hotel,
  tour,
  vehicle,
  global
});
