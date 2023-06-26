import { combineReducers } from 'redux';
import auth from './auth';
import global from './global';

export default combineReducers({
  auth,
  global
});
