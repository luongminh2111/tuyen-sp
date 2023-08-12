import { combineReducers } from 'redux';
import auth from './auth';
import global from './global';
import workplace from './workplace';
import projects from './projects';
import staffs from './staffs';
import files from "./files";
import tasks from './tasks';

export default combineReducers({
  auth,
  global,
  workplace,
  projects,
  staffs,
  files,
  tasks
});
