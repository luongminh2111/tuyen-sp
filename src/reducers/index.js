import { combineReducers } from 'redux';
import auth from './auth';
import global from './global';
import workplace from './workplace';
import projects from './projects';
import staffs from './staffs';
import files from "./files";

export default combineReducers({
  auth,
  global,
  workplace,
  projects,
  staffs,
  files
});
