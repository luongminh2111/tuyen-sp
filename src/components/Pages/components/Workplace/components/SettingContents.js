import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { ORG_IMAGE_DEFAULT } from "../../../../../commons/image";
import "../styles/SettingContents.scss";
import Staffs from "./Staffs";
import ListProject from "./ListProjects";
import { useDispatch, useSelector } from "react-redux";
import { updateWorkSpace } from "../actions/WorkplaceActionCallApi";
import Alerts from "../../../../../commons/Alert";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storages from "../../../../../contains/firebaseConfig";
import { CircularProgress } from "@mui/material";

function SettingContent(props) {
  const dispatch = useDispatch();
  const account = useSelector((state) => state.auth.account);
  const { settingSelect, workspace } = props;

  const [name, setName] = useState(workspace?.name || "");
  const [organizationName, setOrganizationName] = useState(
    workspace?.organization_name || ""
  );

  const [domain, setDomain] = useState(workspace?.domain || "");
  const [description, setDescription] = useState(workspace?.description || "");

  const [file, setFile] = useState({});
  const [preUrl, setPreUrl] = useState("");

  const [loading, setLoading] = useState(false);

  const [textAlert, setTextAlert] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [statusAlert, setStatusAlert] = useState(false);

  const handleUpdateWorkspace = (url) => {
    const request = {
      name,
      organization_name: organizationName,
      domain,
      description,
      avatar: url || ORG_IMAGE_DEFAULT,
    };
    dispatch(updateWorkSpace(request)).then((res) => {
      if (res) {
        setOpenAlert(true);
        setStatusAlert("error");
        setTextAlert(res);
      } else {
        setOpenAlert(true);
        setStatusAlert("success");
        setTextAlert("Update workspace successful !");
      }
    });
  };

  const handleChangeFile = (file) => {
    setFile(file[0]);
    const objectUrl = URL.createObjectURL(file[0]);
    setPreUrl(objectUrl);
  };

  const handleUpload = () => {
    if (account?.role !== 1) {
      setOpenAlert(true);
      setStatusAlert("error");
      setTextAlert("You do not have permission to perform this operation");
      return;
    }
    if (!file) return;
    if (description?.trim()?.length === 0) {
      setOpenAlert(true);
      setStatusAlert("error");
      setTextAlert("Description must not be empty");
      return;
    }
    setLoading(true);
    const storageRef = ref(storages, `/avatars/${file.name}`);
    uploadBytesResumable(storageRef, file).then(() => {
      getDownloadURL(ref(storages, `/avatars/${file.name}`)).then((res) => {
        setLoading(false);
        handleUpdateWorkspace(res);
      });
    });
  };

  const renderGeneralSetting = () => {
    if (loading) {
      return (
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
      );
    }
    return (
      <>
        <div className="title d-flex">
          <div>Space Setting</div>
          <div>
            <i className="fa-sharp fa-solid fa-circle-question"></i>
          </div>
        </div>
        <div className="workplace-info mt-4">
          <div className="info-left">
            <div className="label d-flex">
              <span>Organization Name</span>
              <span>*</span>
            </div>
            <div>
              <input
                type="text"
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
              />
            </div>
            <div className="label d-flex">
              <span>Name</span>
              <span>*</span>
            </div>
            <div className="w-100">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="label d-flex">
              <span>Space logo</span>
              <span>*</span>
            </div>
            <div className="logo-company">
              <div className="avatar d-flex">
                <div className="img-pre">
                  <img
                    src={preUrl || workspace?.avatar || ORG_IMAGE_DEFAULT}
                    alt="avatar"
                  />
                </div>
                {account?.role === 1 ? (
                  <div className="upload">
                    <label for="files" className="btn">
                      Select avatar
                    </label>
                    <input
                      id="files"
                      style={{ visibility: "hidden", display: "none" }}
                      type="file"
                      onChange={(e) => handleChangeFile(e.target.files)}
                    />
                  </div>
                ) : null}
              </div>
            </div>
            <div className="label d-flex">
              <span>Organization Domain</span>
              <span>*</span>
            </div>
            <div>
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
              />
            </div>
          </div>
          <div className="info-right">
            <div className="label d-flex">
              <span>Description</span>
            </div>
            <div>
              <textarea
                id="input-comment"
                name="w3review"
                maxLength={2000}
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-center save-btn">
          <button onClick={() => handleUpload()}>Save</button>
        </div>
      </>
    );
  };

  return (
    <div className="setting-content-wrapper">
      {!settingSelect ? (
        renderGeneralSetting()
      ) : settingSelect === "staff" ? (
        <Staffs />
      ) : settingSelect === "projects" ? (
        <ListProject />
      ) : null}
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
export default SettingContent;
