import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import CryptoJS from "crypto-js";
import { useDispatch } from "react-redux";
import Login from "./components/Pages/components/Login";
import { getWorkSpace } from "./components/Pages/components/Workplace/actions/WorkplaceActionCallApi";
import { secretPass } from "./commons/Commons";
import { updateUser } from "./components/Pages/actions/AccountActionRedux";
import PrivateRoute from "./auth/PrivateRouteComponent";
import Main from "./main";
import Reminder from "./components/Pages/components/Login/reminder";
import ChangePassword from "./components/Pages/components/Register/ChangePassword";

function App() {
  
  const dispatch = useDispatch();

  const [user, setUser] = useState({});

  useEffect(() => {
    try {
      const userSave = localStorage.getItem("user");
      if (userSave) {
        const bytes = CryptoJS.AES.decrypt(userSave, secretPass);
        const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        if(data?.user && data?.token){
          setUser(data.user);
          sessionStorage.setItem("token_admin", data.token);
          dispatch(updateUser(data.user));
          dispatch(getWorkSpace());
        }
      }
    } catch (e) {
      console.log("Error App: ", e);
    }
  }, []);

  return (
    <Router>
      <React.Fragment>
        <Switch>
          <Route exact path="/sign-in" component={Login}></Route>
          <Route exact path="/reminder" component={Reminder}></Route>
          <Route exact path="/reset-password" component={ChangePassword} ></Route>
          <PrivateRoute path="/">
            <Main />
          </PrivateRoute>

        </Switch>
      </React.Fragment>
    </Router>
  );
}

export default App;
