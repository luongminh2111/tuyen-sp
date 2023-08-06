import React, { useState } from "react";
import "../styles/index.scss";
import { Button } from "@mui/material";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storages from "../../../../../contains/firebaseConfig";

function FileLeftContent(props) {
  const [showSelect, setShowSelect] = useState(false);

  const [file, setFile] = useState("");
  const [urlReceived, setUrlReceived] = useState("");
  const [listFiles, setListFiles] = useState([]);
  const [idsSelected, setIdsSelected] = useState([]);

  const renderTableHeader = () => {
    return (
      <div className="table-file-header">
        <div
          className="d-flex justify-content-between"
          style={{ padding: "12px 16px" }}
        >
          <div className="select-box">
            <div className="input-box">
              <input type="checkbox" />
            </div>
            <div>Select All </div>
          </div>
          <div className="list-custom-actions">
            <div>
              <button disabled>Rename</button>
            </div>
            <div>
              <button disabled>Remove</button>
            </div>
            <div>
              <button disabled>Delete</button>
            </div>
            <div>
              <button disabled>Download</button>
            </div>
          </div>
        </div>
        <div className="header-row">
          <div className="file-name">File Name</div>
          <div className="size">Size</div>
          <div className="updated-by">Updated By</div>
          <div className="updated-at">Updated At</div>
        </div>
      </div>
    );
  };

  const renderFileItem = () => {
    return (
      <div className="item-file">
        <div className="item-name">
          <div className="input-check ">
            <input type="checkbox" />
          </div>
          <div>Screenshot 2023-06-13 154353.png</div>
        </div>
        <div className="item-size">0.6 MB</div>
        <div className="item-update-by">Vu Duc Tuyen</div>
        <div className="item-updated-at">20-06-2023 18:52</div>
      </div>
    );
  };

  const handleChangeFile = (file) => {
    setFile(file[0]);
  };

  const handleUpload = () => {
    if (!file) return;
    const storageRef = ref(storages, `/files/${file.name}`);
    uploadBytesResumable(storageRef, file);
    getImage();
  };
  const getImage = async () => {
    const fileUrl = await getDownloadURL(ref(storages, `/files/${file.name}`));
    setUrlReceived(fileUrl);
    console.log("check fileUrl:", fileUrl);
  };

  return (
    <div className="files-left-content">
      <div className="title">
        <div className="label">Files</div>
        <div className="list-actions">
          <div
            className="add-folder"
            onClick={() => setShowSelect(!showSelect)}
          >
            <span>
              <i className="fa-solid fa-file-circle-plus"></i>
            </span>
            <span>Add Files</span>
          </div>
        </div>
      </div>
      {showSelect ? (
        <div className="select-file">
          <div className="box-select">
            <div className="d-flex justify-content-center">
              <label for="files" class="btn">
                {file ? "Change File..." : "Select File..."}
              </label>
              <input
                id="files"
                style={{ visibility: "hidden" }}
                type="file"
                onChange={(e) => handleChangeFile(e.target.files)}
              />
            </div>
            {file ? (
              <div className="file-info d-flex mt-3">
                <span>
                  <p>{file?.name}</p>
                </span>
                <span>
                  <button className="submit" onClick={() => handleUpload()}>
                    submit
                  </button>
                </span>
                <span>
                  <button className="cancel" onClick={() => setFile("")}>
                    cancel
                  </button>
                </span>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
      <div className="files-table">
        {renderTableHeader()}
        <div className="table-content">
          {[1, 2, 3, 4, 5]?.map((e) => {
            return renderFileItem();
          })}
        </div>
      </div>
    </div>
  );
}
export default FileLeftContent;
