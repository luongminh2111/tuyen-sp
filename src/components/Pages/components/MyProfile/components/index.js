import React from "react";
import "./index.scss";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMyProfile, updateMyProfile } from "../actions/MyProflesActionsCallApi";
import { useState } from "react";
import Alerts from "../../../../../commons/Alert";

function MyProfile(props) {

  const [newName, setNewName] = useState("");
  const [textAlert, setTextAlert] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [statusAlert, setStatusAlert] = useState(false);


  const account = useSelector(state => state.auth.account);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyProfile());
  }, []);

  console.log("check account : ", account);

  const handleChangeUserName = (value) => {
    setNewName(value);
  }

  const handleUpdateProfile = () => {
    const request = {
      name: newName,
      avatar: '',
      email: account?.email,
    }
    dispatch(updateMyProfile(request)).then(json => {
      if(json?.data?.user) {
        setOpenAlert(true);
        setTextAlert("Update profile success");
        setStatusAlert("success");
      } else {
        setOpenAlert(true);
        setTextAlert("Update profile failed");
        setStatusAlert("error");
      }
    });
  }

  const history = useHistory();
  return (
    <div className="my-profile">
      <div className="back-to-home">
          <button onClick={() =>  history.push("/")}>Back to Home Page</button>
      </div>
      <div className="profile-container">
        <div className="content">
          <div className="d-flex justify-content-center mb-3 mt-2">MY PROFILE</div>
          <div className="avatar">
            <div>V</div>
          </div>
          <div className="username">
            <div className="label">Username</div>
            <div><input type="text" value={newName || account?.name} onChange={(e) => handleChangeUserName(e?.target?.value)} /></div>
          </div>
          <div className="email mt-4">
            <div className="label">Email</div>
            <div><input type="text" value={account?.email} disabled/></div>
          </div>
          <div className="d-flex justify-content-center mt-5">
            <button onClick={() => handleUpdateProfile()}>Update</button>
          </div>
        </div>
      </div>
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
export default MyProfile;
