import React, { useEffect, useState } from "react";
import store from "./store/store";
import jwt_decode from "jwt-decode";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { redirect } from "react-router-dom";
import { useSelector, Provider, useDispatch } from "react-redux";
import { updateUser } from "./components/Pages/actions/AccountActionRedux";
import Login from "./components/Pages/components/Login";
import Reminder from "./components/Pages/components/Login/reminder";
import Register from "./components/Pages/components/Register";
import Dashboard from "./components/Pages/components/Dashboard";
import AddIssue from "./components/Pages/components/AddIssue";
import Project from "./components/Pages/components/Project/components";
import Issues from "./components/Pages/components/Issue/components";
import Files from "./components/Pages/components/Files/components";
import ProjectSetting from "./components/Pages/components/ProjectSetting/components";
import MyProfile from "./components/Pages/components/MyProfile/components";
import Board from "./components/Pages/components/Board/components";
import Workplace from "./components/Pages/components/Workplace/components";
import { getWorkSpace } from "./components/Pages/components/Workplace/actions/WorkplaceActionCallApi";
import { ca } from "date-fns/locale";

function App() {

  const { account, positionCallApiCheckAuth } = useSelector(
    (state) => state?.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const workspaceId = localStorage.getItem("workspace_id");
      console.log("check workspaceId :", workspaceId);
      if( workspaceId) {
        console.log("check 111111111");
        dispatch(getWorkSpace());
      }
    } catch(e) {
      console.log("Error get workspace");
    }
  }, []);

  useEffect(() => {
    try {
      const token = sessionStorage.getItem("token");
      const username = jwt_decode(JSON.stringify(token))?.sub;
      dispatch(updateUser({ username }));
    } catch (e) {
      // setUser('');
    }
  }, [positionCallApiCheckAuth]);

  return (
    <Provider store={store}>
      <Router>
        <React.Fragment>
          <Switch>
                <Route exact path="/sign-in" component={Login}></Route>
                <Route exact path="/register" component={Register}></Route>
                <Route exact path="/reminder" component={Reminder}></Route>
                <Route exact path="/" component={Dashboard}></Route>
                <Route exact path="/dashboard" component={Dashboard}></Route>
                <Route exact path="/add-issue" component={AddIssue}></Route>
                <Route path="/project" component={Project}></Route>
                <Route exact path="/issues" component={Issues}></Route>
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
        </React.Fragment>
      </Router>
    </Provider>
  );
}

export default App;
