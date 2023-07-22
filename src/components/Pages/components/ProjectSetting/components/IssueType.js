
import React from "react";
import "../styles/IssueType.scss";
import { useState } from "react";
import EditIssueType from "./EditIssueType";

function IssueType(props) {
  
  const [edit, setEdit] = useState(false);

  if(edit) {
    return <EditIssueType setEdit={setEdit} />
  }

  return (
    <div className="issue-type-content-wrapper">
      <div className="title d-flex">
        <div>Edit Issue Types </div>
        <div>
          <i className="fa-sharp fa-solid fa-circle-question"></i>
        </div>
      </div>
      <div className="edit-btn">
        <button onClick={() => setEdit(true)}>Edit Issue Type</button>
      </div>
      <div className="issue-result-table">
        <div className="header">
          <div className="type-name">List of Issue Types</div>
          <div className="template">Issue template</div>
          <div className="delete">Delete</div>
        </div>
        <div className="body">
          {[0, 1, 2, 3]?.map((e) => {
            return (
              <div className="item">
                <div className="type-name">
                  <span>Task</span>
                  <span>Task</span>
                </div>
                <div className="template">Register</div>
                <div className="delete">
                  <i className="fa-solid fa-x"></i>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default IssueType;
