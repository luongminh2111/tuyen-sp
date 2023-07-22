import React from "react";
import "../styles/index.scss";
import { Button } from "@mui/material";

function FileLeftContent(props) {
  const renderTableHeader = () => {
    return (
      <div className="table-header">
        <div className="d-flex justify-content-between" style={{padding: "12px 16px"}}>
          <div className="select-box">
            <div className="input-box">
              <input type="checkbox" />
            </div>
            <div>Select All </div>
          </div>
          <div className="list-actions">
            <div>check item(s)</div>
            <div>
              <Button disabled>Rename</Button>
            </div>
            <div>
              <Button disabled>Remove</Button>
            </div>
            <div>
              <Button disabled>Delete</Button>
            </div>
            <div>
              <Button disabled>Download</Button>
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
    return(
      <div className="item-file">
        <div className="item-name">
          <div className="input-check ">
            <input type="check box" />
          </div>
          <div>Screenshot 2023-06-13 154353.png</div>
        </div>
        <div className="item-size">0.6 MB</div>
        <div className="item-update-by">Vu Duc Tuyen</div>
        <div className="item-updated-at">20-06-2023 18:52</div>
      </div>
    )
  }

  return (
    <div className="files-left-content">
      <div className="title">
        <div className="label">Files</div>
        <div className="list-actions">
          <div className="add-folder">
            <span>
              <i className="fa-solid fa-file-circle-plus"></i>
            </span>
            <span>Add Files</span>
          </div>
        </div>
      </div>
      <div className="files-table">
        {renderTableHeader()}
        <div className="table-content">
          {[1, 2 , 3 , 4, 5]?.map(e => {
            return (renderFileItem())
          })}
        </div>
      </div>
    </div>
  );
}
export default FileLeftContent;
