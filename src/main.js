import React from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Dashboard from "./components/Pages/components/Dashboard";
import AddIssue from "./components/Pages/components/AddIssue";
import Project from "./components/Pages/components/Project/components";
import Issues from "./components/Pages/components/Issue/components";
import Files from "./components/Pages/components/Files/components";
import ProjectSetting from "./components/Pages/components/ProjectSetting/components";
import MyProfile from "./components/Pages/components/MyProfile/components";
import Board from "./components/Pages/components/Board/components";
import Workplace from "./components/Pages/components/Workplace/components";

function Main(props) {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Switch>
            <Route exact path="/" component={Dashboard}></Route>
          
            <Route exact path="/dashboard" component={Dashboard}></Route>
            <Route exact path="/add-task" component={AddIssue}></Route>
            <Route path="/project" component={Project}></Route>
            <Route exact path="/tasks" component={Issues}></Route>
            <Route exact path="/files" component={Files}></Route>
            <Route
              exact
              path="/project-setting"
              component={ProjectSetting}
            ></Route>
            <Route exact path="/my-profile" component={MyProfile}></Route>
            <Route exact path="/board" component={Board}></Route>
            <Route
              exact
              path="/workplace-setting"
              component={Workplace}
            ></Route>
          </Switch>
          <Route exact path="/">
            <Redirect to="/dashboard" />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default Main;
