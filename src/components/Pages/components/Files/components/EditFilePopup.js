import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React, { useState } from "react";
import Alerts from "../../../../../commons/Alert";
import { useDispatch } from "react-redux";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import storages from "../../../../../contains/firebaseConfig";
import "../styles/UploadFile.scss";
import { updateFile, uploadFile } from "../actions/FileActionCallapi";

function EditFilePopup(props) {
  const { open, handleClose, curProject, item } = props;
  const [name, setName] = useState(item?.name || "");
  const [description, setDescription] = useState(item?.description || "");
  const [textAlert, setTextAlert] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [statusAlert, setStatusAlert] = useState(false);

  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleChangeFile = (file) => {
    setFile(file[0]);
  };

  const handleUpload = () => {
    if (!file) return;
    setLoading(true);
    const storageRef = ref(storages, `/files/${item.name}`);
    deleteObject(storageRef).then(() => {
      const storageRef1 = ref(storages, `/files/${file.name}`);
      uploadBytesResumable(storageRef1, file).then(() => {
        getDownloadURL(ref(storages, `/files/${file.name}`)).then((res) => {
          const request = {
            name: file?.name,
            link: res,
            description,
            project_id: curProject.id,
          };
          dispatch(updateFile(request, item.id)).then((res) => {
            if (res?.status === 200 && res?.data?.data) {
              setLoading(false);
              setOpenAlert(true);
              setStatusAlert("success");
              setTextAlert("Upload success!");
              dispatch({type: 'UPDATE_FILE', item: res.data.data, oldId: item.id});
              setTimeout(() => {
                handleClose();
              }, 1500);
  
            } else {
              setLoading(false);
              setOpenAlert(true);
              setStatusAlert("error");
              setTextAlert("Upload failed!");
            }
          });
        });
      });
    });
  
  };

  return (
    <>
      <Dialog open={open} className="dialog-upload-file" maxWidth="lg">
        <DialogTitle className="create-pj-title">
          <div className="text-align-center">Upload File</div>
        </DialogTitle>
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
          <DialogContent>
            <div className="contents-add">
              <div className="d-flex">
                <label for="files" class="btn">
                  Change File
                </label>
                <input
                  id="files"
                  style={{ visibility: "hidden", display: "none" }}
                  type="file"
                  onChange={(e) => handleChangeFile(e.target.files)}
                />
                <div
                  className="file-info d-flex align-items-center "
                  style={{ marginLeft: "24px" }}
                >
                 {file?.name || name}
                </div>
              </div>
              <div className="area-input-ticket">
                <textarea
                  placeholder="Add a description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            <div className="list-btn-file">
              <button className="close-btn" onClick={() => handleClose()}>
                Cancel
              </button>
              <button className="add-btn" onClick={() => handleUpload()}>
                Upload
              </button>
            </div>
          </DialogContent>
        )}
      </Dialog>
      {openAlert ? (
        <Alerts
          text={textAlert}
          status={statusAlert}
          open={openAlert}
          setOpen={setOpenAlert}
        />
      ) : null}
    </>
  );
}
export default EditFilePopup;
