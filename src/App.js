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
import HomePage from "./components/HomePage";
import Hotels from "./components/Pages/components/Hotels";
import { updateUser } from "./components/Pages/actions/AccountActionRedux";
import Tours from "./components/Pages/components/Tours";
import Vehicles from "./components/Pages/components/Vehicles";
import ItemHotelDetail from "./components/Pages/components/Hotels/ListHotel/ItemHotelDetail";
import ItemTourDetail from "./components/Pages/components/Tours/ListTour/ItemTourDetail";
import ItemVehicleDetail from "./components/Pages/components/Vehicles/ListVehicle/ItemVehicleDetail";
import Blog from "./components/Pages/components/Blogs/components";
import Login from "./components/Pages/components/Login";
import Reminder from "./components/Pages/components/Login/reminder";
import Register from "./components/Pages/components/Register";

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
            <Route exact path="/" component={HomePage}></Route>       
            <Route exact path="/hotel" component={Hotels}></Route>   
            <Route exact path="/tour" component={Tours}></Route>
            <Route exact path="/vehicle" component={Vehicles}></Route>
            <Route exact path="/hotel/detail/:id" component={ItemHotelDetail}></Route>
            <Route exact path="/tour/detail/:id" component={ItemTourDetail}></Route>
            <Route exact path="/vehicle/detail/:id" component={ItemVehicleDetail}></Route>
            <Route exact path="/blog/detail/:id" component={ItemVehicleDetail}></Route>
            <Route exact path="/blog" component={Blog}></Route>
          </Switch>
        </React.Fragment> 
       
      </Router>
    </Provider>
  );
}

export default App;
