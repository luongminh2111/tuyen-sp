import React from "react";
import "./index.scss";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getMyProfile,
  updateMyProfile,
} from "../actions/MyProflesActionsCallApi";
import { useState } from "react";
import Alerts from "../../../../../commons/Alert";
import { USER_ROLE_TEXT } from "../../../../../commons/Commons";
import { EMPTY_USER } from "../../../../../commons/image";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storages from "../../../../../contains/firebaseConfig";
import { CircularProgress } from "@mui/material";

function MyProfile(props) {
  const [name, setName] = useState("");
  const [textAlert, setTextAlert] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [statusAlert, setStatusAlert] = useState(false);

  const [loading, setLoading] = useState(false);

  const [file, setFile] = useState({});
  const [preUrl, setPreUrl] = useState("");

  const account = useSelector((state) => state.auth.account);
  const currentUser = useSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();

  useEffect(() => {
    const path = new URLSearchParams(history.location.search);
    const id = path.get("id");
    dispatch(getMyProfile(id));
  }, []);

  const handleChangeUserName = (value) => {
    setName(value);
  };

  const handleUpload = () => {
    if (!file) return;
    setLoading(true);
    const storageRef = ref(storages, `/avatars/${file.name}`);
    uploadBytesResumable(storageRef, file).then(() => {
      getDownloadURL(ref(storages, `/avatars/${file.name}`)).then((res) => {
        handleUpdateProfile(res);
      });
    });
  };

  const handleUpdateProfile = (url) => {
    const request = {
      name: name || currentUser?.name || account.name,
      avatar: url || currentUser?.avatar || account?.avatar,
      email: currentUser?.email || account?.email,
    };
    dispatch(updateMyProfile(request)).then((json) => {
      setLoading(false);
      if (json?.data?.data) {
        setOpenAlert(true);
        setTextAlert("Update profile success");
        setStatusAlert("success");
        dispatch({
          type: 'UPDATE_PROPERTIES_USER',
          account: json.data.data
        })
      } else {
        setOpenAlert(true);
        setTextAlert("Update profile failed");
        setStatusAlert("error");
      }
    });
  };

  const handleChangeFile = (file) => {
    setFile(file[0]);
    const objectUrl = URL.createObjectURL(file[0]);
    setPreUrl(objectUrl);
  };
  
  const handleGoBack = () => {
    dispatch({ type: "RESET_CURRENT_USER" });
    history.push("/");
  };

  const history = useHistory();
  return (
    <div className="my-profile">
      {!loading ? (
        <div className="back-to-home">
          <button onClick={() => handleGoBack()}>Back to Home Page</button>
        </div>
      ) : null}
      <div className="profile-container">
        {loading ? (
          <div>
            <div
              className="w-100 d-flex justify-content-center align-items-center"
              style={{ fontSize: "18px", marginTop: "30px", fontWeight: "600" }}
            >
              The system is processing, please wait
            </div>
            <div
              className="w-100 d-flex justify-content-center align-items-center"
              style={{ height: "300px" }}
            >
              <CircularProgress />
            </div>
          </div>
        ) : (
          <div className="content">
            <div className="d-flex justify-content-center mb-3 mt-2">
              MY PROFILE
            </div>
            <div className="avatar">
              <div className="">
                <div className="top">
                  <img
                    src={
                      preUrl ||
                      currentUser?.avatar ||
                      account?.avatar ||
                      EMPTY_USER
                    }
                    alt="avatar"
                  />
                </div>
                {currentUser?.id === account.id || !currentUser?.id ?
                <div className="bottom">
                  <div className="upload">
                    <label for="files" className="btn">
                      Change avatar
                    </label>
                    <input
                      id="files"
                      style={{ visibility: "hidden", display: "none" }}
                      type="file"
                      onChange={(e) => handleChangeFile(e.target.files)}
                    />
                  </div>
                </div> : null }
              </div>
            </div>
            <div className="username">
              <div className="label">Username</div>
              <div>
                <input
                  type="text"
                  value={name || currentUser?.name || account?.name}
                  disabled={ currentUser?.id && currentUser?.id !== account.id}
                  onChange={(e) => handleChangeUserName(e?.target?.value)}
                  style={
                    currentUser?.id !== account.id && currentUser?.id
                      ? { cursor: "not-allowed" }
                      : {}
                  }
                />
              </div>
            </div>
            <div className="email mt-4">
              <div className="label">Email</div>
              <div>
                <input
                  type="text"
                  value={currentUser?.email || account?.email}
                  disabled
                />
              </div>
            </div>
            <div className="email mt-4">
              <div className="label">Role</div>
              <div>
                <input
                  type="text"
                  value={USER_ROLE_TEXT[currentUser?.role || account?.role]}
                  disabled
                />
              </div>
            </div>
            <div
              className={`d-flex justify-content-center mt-5 ${
                currentUser?.id && currentUser?.id !== account.id ? "disabled" : ""
              }`}
            >
              <button
                onClick={() => handleUpload()}
                disabled={currentUser?.id && currentUser.id !== account.id}
              >
                Update
              </button>
            </div>
          </div>
        )}
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
