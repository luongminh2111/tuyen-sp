import React, { useState } from "react";
import { Button, TextField, Box, FormControlLabel } from "@mui/material";
import { useDispatch } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import "../styles/Register.scss";
import Footer from "../../../commons/Footer";
import { CheckBox } from "@mui/icons-material";

function Register(props) {
  const [email, setEmail] = useState("");
  const [fullname, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [errorPass, setErrorPass] = useState(false);
  const [messagePass, setMessagePass] = useState("");
  const [messageMail, setMessageMail] = useState("");
  const [messageFullName, setMessageFullName] = useState("");
  const [errorFullName, setErrorFullName] = useState(false);
  const [errorMail, setErrorMail] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const dispatch = useDispatch();

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

  const handleChangeMail = (value) => {
    setEmail(value);
  };

  const handleChangePassWord = (value) => {
    setPassword(value);
  };

  const handleValidateEmail = (mail) => {
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (mail.match(mailformat)) {
      return false;
    }
    return true;
  };

  const handleChangeFullName = (value) => {
    setFullName(value);
  };

  const handleRegister = () => {
    if (email?.length === 0) {
      setErrorMail(true);
      setMessageMail("Email cannot be blank");
      return;
    }
    if (handleValidateEmail(email)) {
      setErrorMail(true);
      setMessageMail("Email invalidate");
      return;
    }
    if (fullname?.length === 0) {
      setErrorFullName(true);
      setMessageFullName("Username cannot be blank");
      return;
    }
    if (password?.length === 0) {
      setErrorPass(true);
      setMessagePass("Password cannot be blank");
      return;
    }
      // const registerRequest = {
      // };
      // dispatch(register(registerRequest)).then((json) => {
      //   console.log("check json :", json);
      //   if (json) {
      //   }
      //   setShowSnackbar(true);
      //   setShowAlert(true);
      // });
    
  };

  return (
    <Box className="signup-wrapper">
      <Box className="head">
        <div className="title-1">Sign up for Project Account</div>
      </Box>

      <div className="signup-container">
        <Box className="signup-form">
          <div className="title d-flex">
            <span>Create an account</span>
          </div>
          <Box className="full-name form-input">
            <Box className="txt-label">Full name</Box>
            <TextField
              type="text"
              variant="outlined"
              error={errorMail}
              helperText={messageMail}
              onChange={(e) => handleChangeFullName(e.target.value)}
            />
          </Box>
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
          <Box className="password form-input">
            <Box className="txt-label">Password</Box>
            <TextField
              type="password"
              variant="outlined"
              error={errorMail}
              helperText={messageMail}
              onChange={(e) => handleChangePassWord(e.target.value)}
            />
          </Box>
          <Box className="password form-input mt-3 " sx={{marginLeft: '8px'}}>
            <FormControlLabel
              control={<CheckBox />}
              label={`I'm not a robot`}
            />
          </Box>
          <div className="d-flex justify-content-center mb-4">
            <Button variant="outlined" className="signup-btn" onClick={() => {}}>
              Sign up
            </Button>
          </div>

          <div className="back-login d-flex justify-content-center ">
            <span>Already have Account?</span>&nbsp;
            <span> <a href="/sign-in" style={{color: '#745fe6'}}>Log in from here</a></span>
          </div>
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
export default Register;
