import React, { useState } from "react";
import { Button, TextField, Box, FormControlLabel } from "@mui/material";
import { useDispatch } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import "../styles/Login.scss";
import { login } from "../../actions/AccountActionCallApi";
import { useHistory } from "react-router-dom";
import { CheckBox } from "@mui/icons-material";
import Footer from "../../../commons/Footer";

function Login(props) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMail, setErrorMail] = useState(false);
  const [errorPass, setErrorPass] = useState(false);
  const [messageMail, setMessageMail] = useState("");
  const [messagePass, setMessagePass] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showInputPass, setShowInputPass] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const [showSnackbar, setShowSnackbar] = useState(false);
  const onCloseClickHandler = (event) => {
    setShowSnackbar(false);
  };

  const CustomSnackbar = (props) => (
    <Snackbar
      autoHideDuration={2000}
      open={showSnackbar}
      onClose={onCloseClickHandler}
      anchorOrigin={{ horizontal: "center", vertical: "top" }}
      children={props.children}
    ></Snackbar>
  );

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
    } else if (password?.length < 6) {
      setErrorPass(true);
      setMessagePass("Password must not be less than 6 characters");
    } else {
      setErrorPass(false);
      setMessagePass("");
      const loginRequest = {}
      dispatch(login(loginRequest)).then((json) => {
        console.log("check json :", json);
        if (json) {
          setTimeout(() => {
            history.push("/");
          }, [1000]);
        } else {
          setShowSnackbar(true);
          setShowAlert(true);
        }
      });
    }
    
  };

  return (
    <Box className="signin-wrapper">
      <Box className="head">
        <div className="title-1">Log in to your Nulab Account</div>
      </Box>

      <div className="login-container">
        <Box className="login-form">
          <div className="title d-flex">
            <span>Log in or</span>
            <span>
              <a href="/register">
                create an account
              </a>
            </span>
          </div>
          {!showInputPass ? (
            <>
              <Box className="mail form-input">
                <Box className="txt-label">Email</Box>
                <TextField
                  type="text"
                  variant="outlined"
                  placeholder="Email@example.com"
                  error={errorMail}
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
                  error={errorMail}
                  helperText={messageMail}
                  onChange={(e) => handleChangePass(e.target.value)}
                />
              </Box>
              <div className="d-flex justify-content-between form-field">
                <FormControlLabel
                  control={<CheckBox />}
                  label={`Remember me`}
                />
                <div className="forgot-pass">
                  <a href="/reminder" >
                    Forgot password?
                  </a>
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
                  onClick={() => handleNextStep()}
                >
                  Log in
                </Button>
              </div>
            </>
          )}
        </Box>
        {showAlert ? (
          <CustomSnackbar>
            <Alert severity="error">Đăng nhập thất bại, vui lòng thử lại</Alert>
          </CustomSnackbar>
        ) : null}
      </div>
      <Footer />
    </Box>
  );
}
export default Login;
