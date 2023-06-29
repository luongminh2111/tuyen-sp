import React from "react";
import "../styles/index.scss";

function FileRightContent(props) {
  return (
    <div className="files-right-content">
      <div className="find-file-wrapper">
        <div className="label">Find File</div>
        <div className="find-content">
          <div className="input-date">
            <div className="label">Updated</div>
            <div className="list-select-date">
              <input type="date" className="from"/>
              <input type="date" className="to" />
            </div>
          </div>
          <div className="by-user">
            <div className="label">By</div>
            <input type="text" />
          </div>
          <div className="keyword">
            <div className="label">Keyword</div>
            <input type="text" />
          </div>
          <div className="btn-search">
            <button>Search</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default FileRightContent;
