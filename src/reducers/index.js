import { combineReducers } from 'redux';
import auth from './auth';
import global from './global';
import workplace from './workplace';

export default combineReducers({
  auth,
  global,
  workplace
});
