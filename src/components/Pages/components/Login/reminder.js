import React, { useState } from "react";
import { Button, TextField, Box, FormControlLabel } from "@mui/material";
import { useDispatch } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import "../styles/Reminder.scss";
import { forgotPassword, login } from "../../actions/AccountActionCallApi";
import { useHistory } from "react-router-dom";
import Footer from "../../../commons/Footer";
import Alerts from "../../../../commons/Alert";

function Reminder(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMail, setErrorMail] = useState(false);
  const [errorPass, setErrorPass] = useState(false);
  const [messageMail, setMessageMail] = useState("");
  const [messagePass, setMessagePass] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showInputPass, setShowInputPass] = useState(false);

  const [textAlert, setTextAlert] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [statusAlert, setStatusAlert] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();


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

  const handleGetPassWord = () => {
    if (!email) {
      setErrorMail(true);
      setMessageMail("You forgot to set your email address!");
    } else if (handleValidateEmail(email)) {
      setErrorMail(true);
      setMessageMail("Email is not in the correct format");
    } else {
      setErrorMail(false);
      setMessageMail("");
      const request = {
        email
      }
      dispatch(forgotPassword(request)).then(res => {
        setOpenAlert(true);
        setStatusAlert('success');
        setTextAlert(res);
      });
    }
  };

  return (
    <Box className="reminder-wrapper">
      <Box className="head">
        <div className="title-1">Reset Password</div>
      </Box>
      <div className="reminder-container">
        <Box className="reminder-form">
          <div className="title d-flex">
            Enter your email address, so we can send you instructions to help
            you reset your password.
          </div>
          <Box className="mail form-input">
            <Box className="txt-label">Email address</Box>
            <TextField
              type="text"
              variant="outlined"
              placeholder="Email@example.com"
              error={errorMail}
              helperText={messageMail}
              onChange={(e) => handleChangeMail(e.target.value)}
            />
          </Box>
          <div className="send-email-btn">
            <Button variant="outlined" onClick={() => handleGetPassWord()}>
              Send Email
            </Button>
          </div>
          <div className="back-to-login-btn">
            <Button variant="text" onClick={() => history.push("/sign-in")}>
              Back to Login
            </Button>
          </div>
        </Box>
        {openAlert ? (
        <Alerts
          text={textAlert}
          status={statusAlert}
          open={openAlert}
          setOpen={setOpenAlert}
        />
      ) : null}
      </div>
      <Footer />
    </Box>
  );
}
export default Reminder;
