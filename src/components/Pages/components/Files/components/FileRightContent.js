import React from "react";
import "../styles/index.scss";
import { useState } from "react";
import { parseDateToString } from "../../../../../ulti/dateTime";

function FileRightContent(props) {

  const [from, setFrom] = useState(parseDateToString(new Date()));
  const [to, setTo] = useState(parseDateToString(new Date()));

  return (
    <div className="files-right-content">
      <div className="find-file-wrapper">
        <div className="label">Find File</div>
        <div className="find-content">
          <div className="input-date">
            <div className="label">Updated</div>
            <div className="list-select-date">
              <input type="date" className="from"value={from} />
              <input type="date" className="to" value={to} />
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
