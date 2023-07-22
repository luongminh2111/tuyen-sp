import { combineReducers } from 'redux';
import auth from './auth';
import global from './global';
import workplace from './workplace';
import projects from './projects';

export default combineReducers({
  auth,
  global,
  workplace,
  projects
});
