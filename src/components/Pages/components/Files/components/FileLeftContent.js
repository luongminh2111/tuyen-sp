import React, { useState } from "react";
import "../styles/index.scss";
import UploadPopup from "./UploadPopup";
import { useDispatch, useSelector } from "react-redux";
import { getStorage, ref, deleteObject } from "firebase/storage";
import storages from "../../../../../contains/firebaseConfig";
import EditFilePopup from "./EditFilePopup";
import { deleteFile } from "../actions/FileActionCallapi";

function FileLeftContent(props) {
  const { curProject } = props;
  const [showSelect, setShowSelect] = useState(false);
  const files = useSelector((state) => state.files.items);
  const members = useSelector((state) => state.projects.members);
  const [isEdit, setIdEdit] = useState(false);
  const [curItem, setCurItem] = useState({});

  const dispatch = useDispatch();

  const [idsSelected, setIdsSelected] = useState([]);

  const getCurrentMember = (id) => {
    return members?.find((e) => e.id === id)?.name || "";
  };

  const handleChangeIds = (value) => {
    if (idsSelected?.includes(value)) {
      setIdsSelected(idsSelected?.filter((e) => e !== value));
    } else {
      setIdsSelected(idsSelected?.concat(value));
    }
  };

  const handleChangeSelectAll = () => {
    if (idsSelected?.length != files?.length) {
      setIdsSelected(files?.map((e) => e.id));
    } else {
      setIdsSelected([]);
    }
  };

  const handleDownload = () => {
    const fileSelected = files?.filter((e) => idsSelected?.includes(e.id));
    fileSelected?.forEach((item) => {
      const link = document.createElement("a");
      link.href = item?.link;
      link.setAttribute("download", item?.name);
      link.target = "_blank";
      link.click();
      link.remove();
    });
  };

  const handleDelete = () => {
    const fileSelected = files?.filter((e) => idsSelected?.includes(e.id));
    fileSelected?.forEach((item) => {
      const storageRef = ref(storages, `/files/${item.name}`);
      deleteObject(storageRef).then(() => {
      });
    });
    dispatch(deleteFile(idsSelected, curProject.id)).then(() => {
      dispatch({
        type: "DELETE_FILE",
        value: idsSelected,
      });
    });
  };

  const renderTableHeader = () => {
    return (
      <div className="table-file-header">
        <div
          className="d-flex justify-content-between"
          style={{ padding: "12px 16px" }}
        >
          <div className="select-box">
            <div className="input-box">
              <input
                type="checkbox"
                checked={idsSelected?.length === files?.length}
                onChange={() => handleChangeSelectAll()}
              />
            </div>
            <div>Select all </div>
          </div>
          <div className="list-custom-actions">
            <div>
              <button
                disabled={idsSelected?.length === 0}
                className={idsSelected?.length > 0 ? "active" : ""}
                onClick={() => handleDelete()}
              >
                Delete
              </button>
            </div>
            <div>
              <button
                disabled={idsSelected?.length === 0}
                className={idsSelected?.length > 0 ? "active" : ""}
                onClick={() => handleDownload()}
              >
                Download
              </button>
            </div>
          </div>
        </div>
        <div className="header-row">
          <div className="file-name">File Name</div>
          <div className="size">Description</div>
          <div className="updated-by">Created By</div>
          <div className="updated-at">Updated At</div>
        </div>
      </div>
    );
  };

  const renderFileItem = (e) => {
    return (
      <div className="item-file">
        <div className="item-name">
          <div className="input-check ">
            <input
              type="checkbox"
              checked={idsSelected?.includes(e.id)}
              onChange={() => handleChangeIds(e.id)}
            />
          </div>
          <div
            onClick={() => {
              setCurItem(e);
              setIdEdit(true);
            }}
            style={{ cursor: "pointer" }}
          >
            {e?.name}
          </div>
        </div>
        <div className="item-des">{e?.description}</div>
        <div className="item-update-by">{getCurrentMember(e?.created_by)}</div>
        <div className="item-updated-at">{e?.updated_at?.substring(0, 10)}</div>
      </div>
    );
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
        <UploadPopup
          open={showSelect}
          handleClose={() => setShowSelect(false)}
          curProject={curProject}
        />
      ) : null}
      {isEdit ? (
        <EditFilePopup
          open={isEdit}
          handleClose={() => {
            setIdEdit(false);
            setCurItem({});
          }}
          curProject={curProject}
          item={curItem}
        />
      ) : null}
      <div className="files-table">
        {renderTableHeader()}
        <div className="table-content">
          {files?.map((e) => {
            return renderFileItem(e);
          })}
        </div>
      </div>
    </div>
  );
}
export default FileLeftContent;
