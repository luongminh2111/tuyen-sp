import React, { useEffect, useState } from "react";
import store from './store/store';
import jwt_decode from "jwt-decode";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { useSelector, Provider, useDispatch } from "react-redux";
import { updateUser } from "./components/Pages/actions/AccountActionRedux";
import Login from "./components/Pages/components/Login";
import Reminder from "./components/Pages/components/Login/reminder";
import Register from "./components/Pages/components/Register";
import Dashboard from "./components/Pages/components/Dashboard";
import AddIssue from "./components/Pages/components/AddIssue";

function App() {
  const checkAuth = useSelector(state => state?.auth?.positionCallApiCheckAuth);

  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const token = sessionStorage.getItem('token');
      const username = jwt_decode(JSON.stringify(token))?.sub;
      dispatch(updateUser({username}))
    }
    catch(e) {
      // setUser('');
    }
  
  }, [checkAuth]);

  return (
    <Provider store={store} >
      <Router> 
        <React.Fragment>
          <Switch>
            <Route exact path="/signin" component={Login}></Route>  
            <Route exact path="/register" component={Register}></Route> 
            <Route exact path="/reminder" component={Reminder}></Route>  
            <Route exact path="/" component={Dashboard}></Route>   
            <Route exact path="/add-issue" component={AddIssue}></Route>     
          </Switch>
        </React.Fragment> 
       
      </Router>
    </Provider>
  );
}

export default App;
