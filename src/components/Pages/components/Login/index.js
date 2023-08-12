import React, { useState } from "react";
import { Button, TextField, Box, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import "../styles/Login.scss";
import { login } from "../../actions/AccountActionCallApi";
import { useHistory } from "react-router-dom";
import CryptoJS from "crypto-js";
import Footer from "../../../commons/Footer";
import { updateUser } from "../../actions/AccountActionRedux";
import Alerts from "../../../../commons/Alert";
import { getWorkSpace } from "../Workplace/actions/WorkplaceActionCallApi";
import { secretPass } from "../../../../commons/Commons";
import { useEffect } from "react";

function Login() {
  const account = useSelector((state) => state.auth.account);
  const [isLoading, setIsLoading] = useState(true);

  const [remember, setRemember] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMail, setErrorMail] = useState(false);
  const [errorPass, setErrorPass] = useState(false);
  const [messageMail, setMessageMail] = useState("");
  const [messagePass, setMessagePass] = useState("");
  const [showInputPass, setShowInputPass] = useState(false);
  const [textAlert, setTextAlert] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [statusAlert, setStatusAlert] = useState(false);

  const [fetching, setFetching] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (account.id) {
      history.push("/");
      return;
    } else {
      setIsLoading(false);
    }
  }, []);

  const handleChangePass = (value) => {
    setPassword(value);
  };

  const handleValidateEmail = (mail) => {
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (mail.match(mailformat)) {
      return false;
    }
    return true;
  };

  const handleChangeMail = (value) => {
    setEmail(value);
  };

  const handleNextStep = () => {
    if (!email) {
      setErrorMail(true);
      setMessageMail("Please enter a valid email");
    } else if (handleValidateEmail(email)) {
      setErrorMail(true);
      setMessageMail("Email is not in the correct format");
    } else {
      setErrorMail(false);
      setMessageMail("");
      setShowInputPass(true);
    }
  };

  const handleLogin = () => {
    if (password.length === 0) {
      setErrorPass(true);
      setMessagePass("Password cannot be blank");
    } else {
      setErrorPass(false);
      setMessagePass("");
      const loginRequest = {
        email,
        password,
      };
      setFetching(true);
      dispatch(login(loginRequest)).then((json) => {
        setFetching(false);
        if (json?.data) {
          setOpenAlert(true);
          setTextAlert(json?.data?.message);
          if (json?.data?.user && json?.data?.token && json?.status === 201) {
            if (remember) {
              const saveUser = {
                user: json.data.user,
                token: json.data.token,
              };
              const secretUser = CryptoJS.AES.encrypt(
                JSON.stringify(saveUser),
                secretPass
              ).toString();
              localStorage.setItem("user", secretUser);
            }
            sessionStorage.setItem("token_admin", json.data.token);
            setStatusAlert("success");
            dispatch(updateUser(json.data.user));
            dispatch(getWorkSpace());
            setTimeout(() => {
              history.push("/dashboard");
            }, [1000]);
          } else {
            setStatusAlert("error");
          }
        }
      });
    }
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center w-100 h-100">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <Box className="signin-wrapper">
      <Box className="head">
        <div className="title-1">Welcome to Project M</div>
      </Box>
      {fetching ?
      (
        <div>
        <div
          className="w-100 d-flex justify-content-center align-items-center"
          style={{ height: "300px" }}
        >
          <CircularProgress />
        </div>
      </div>
      ) :
      <div className="login-container">
        <Box className="login-form">
          {!showInputPass ? (
            <>
              <Box className="mail form-input">
                <Box className="txt-label">Email</Box>
                <TextField
                  type="text"
                  variant="outlined"
                  placeholder="Email@example.com"
                  error={errorMail}
                  value={email}
                  helperText={messageMail}
                  onChange={(e) => handleChangeMail(e.target.value)}
                />
              </Box>
              <Button
                variant="outlined"
                className="next-btn"
                onClick={() => handleNextStep()}
              >
                Next
              </Button>
            </>
          ) : (
            <>
              <Box className="password form-input">
                <Box className="txt-label">Password</Box>
                <TextField
                  type="password"
                  variant="outlined"
                  placeholder="Enter password"
                  value={password}
                  error={errorPass}
                  helperText={messagePass}
                  onChange={(e) => handleChangePass(e.target.value)}
                />
              </Box>
              <div className="d-flex justify-content-between form-field">
                <div className="remember-inp d-flex">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(!remember)}
                  ></input>
                  <div className="label">Remember me</div>
                </div>
                <div className="forgot-pass">
                  <a href="/reminder">Forgot password?</a>
                </div>
              </div>
              <div className="d-flex btn-action">
                <div
                  className="back-to-email"
                  onClick={() => {
                    setShowInputPass(false);
                    setPassword("");
                  }}
                >
                  Back
                </div>
                <Button
                  variant="outlined"
                  className="login-btn"
                  onClick={() => handleLogin()}
                >
                  Log in
                </Button>
              </div>
            </>
          )}
        </Box>
      </div> }
      <Footer />
      {openAlert ? (
        <Alerts
          text={textAlert}
          status={statusAlert}
          open={openAlert}
          setOpen={setOpenAlert}
        />
      ) : null}
    </Box>
  );
}
export default Login;
