import React, { useState } from "react";
import { Box } from "@mui/material";
import "../styles/Changepass.scss";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { resetPassword } from "../../actions/AccountActionCallApi";
import Alerts from "../../../../commons/Alert";

function ChangePassword(props) {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [RePassword, setRePassword] = useState("");
  const [token, setToken] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const [textAlert, setTextAlert] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [statusAlert, setStatusAlert] = useState(false);


  useEffect(() => {
    const path = new URLSearchParams(history.location.search);
    const curToken = path.get("token");
    setToken(curToken);
  }, []);

  const handleChangePasssw = () => {
    if (newPassword !== RePassword) {
      setOpenAlert(true);
      setStatusAlert("error");
      setTextAlert("Password does not match");
      return;
    }
    if(!token || email?.trim()?.length === 0 || newPassword?.trim()?.length === 0) {
      setOpenAlert(true);
      setStatusAlert("error");
      setTextAlert("Email or password must not be empty");
      return;
    }
    const request = {
      token,
      email, 
      password: newPassword,
      password_confirmation: RePassword
    }
    dispatch(resetPassword(request)).then(res => {
      if (res?.message === "Password reset successfully") {
        setOpenAlert(true);
        setStatusAlert("success");
        setTextAlert(res?.message);
        setTimeout(() => {
          history.push("/sign-in")
        }, 1000);
      } else {
        setOpenAlert(true);
        setStatusAlert("error");
        setTextAlert(res?.errors?.email?.[0] || res?.errors?.password?.[0] || res?.message);
      }}
    );
  };

  return (
    <div className="change-pass-container">
      <Box className="change-password-form">
        <Box className="head">
          <ArrowCircleLeftOutlinedIcon style={{ color: "#3ab19b" }} onClick={() => history.push("/")} />
          <Box className="head_title">RESET PASSWORD</Box>
        </Box>
        <Box className="new-password form-input" sx={{ mb: 2 }}>
          <Box className="txt-label">Email</Box>
          <input value={email} type="text" onChange={e => setEmail(e.target.value)}/>
        </Box>
        <Box className="new-password form-input">
          <Box className="txt-label">New Password</Box>
          <input value={newPassword} type="password"  onChange={e => setNewPassword(e.target.value)}/>
        </Box>
        <Box className="new-password form-input mt-3" >
          <Box className="txt-label">Confirm Password</Box>
          <input value={RePassword} type="password"  onChange={e => setRePassword(e.target.value)}/>
        </Box>
        <Box className="btn">
          <button
            className="reset-btn"
            onClick={() => handleChangePasssw()}
          >
            Save
          </button>
        </Box>
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
  );
}
export default ChangePassword;
