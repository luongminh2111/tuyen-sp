import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import "./styles/Alert.scss";

function Alerts(props) {

  const {text, status, open, setOpen} = props;

  const onCloseClickHandler = (event) => {
    setOpen(false);
  };

  return (
    <Snackbar
      autoHideDuration={2000}
      open={open}
      onClose={onCloseClickHandler}
      anchorOrigin={{ horizontal: "center", vertical: "top" }}
    >
      <Alert severity={status}>
       {text}
      </Alert>
    </Snackbar>
  );

}
export default Alerts;