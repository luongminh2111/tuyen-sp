import React, { useState } from "react";
import { Button, TextField, Box, FormControlLabel } from "@mui/material";
import { useDispatch } from "react-redux";
import "../styles/Login.scss";
import { login } from "../../actions/AccountActionCallApi";
import { useHistory } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import Footer from "../../../commons/Footer";
import { updateUser } from "../../actions/AccountActionRedux";
import Alerts from "../../../../commons/Alert";
import { getWorkSpace} from "../Workplace/actions/WorkplaceActionCallApi";

function Login() {
  
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

  const dispatch = useDispatch();
  const history = useHistory();

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
      dispatch(login(loginRequest)).then((json) => {
        if (json?.data) {
          setOpenAlert(true);
          setTextAlert(json?.data?.message);
          if (json?.data?.user && json?.data?.token && json?.status === 201) {
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
              <a href="/register">create an account</a>
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
                  value={password}
                  error={errorPass}
                  helperText={messagePass}
                  onChange={(e) => handleChangePass(e.target.value)}
                />
              </Box>
              <div className="d-flex justify-content-between form-field">
                <FormControlLabel
                  required
                  control={<Checkbox />}
                  label="Remember me"
                />
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
      </div>
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
