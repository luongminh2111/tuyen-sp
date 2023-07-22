import React from "react";
import "../styles/Milestone.scss";
import { useState } from "react";
import EditMilestone from "./EditMilestone";

function Milestone(props) {
  const [edit, setEdit] = useState(false);

  if (edit) {
    return <EditMilestone setEdit={setEdit} />;
  }

  return (
    <div className="milestone-content-wrapper">
      <div className="title d-flex">
        <div>Edit Milestone </div>
        <div>
          <i className="fa-sharp fa-solid fa-circle-question"></i>
        </div>
      </div>
      <div className="edit-btn">
        <button onClick={() => setEdit(true)}>Add Milestone</button>
      </div>
      <div className="milestone-result-table">
        <div className="header">
          <div className="name">List milestone</div>
          <div className="from">Start date</div>
          <div className="to">End date</div>
          <div className="description">Description</div>
          <div className="delete">Delete</div>
        </div>
        <div className="body">
          {[0, 1, 2, 3]?.map((e) => {
            return (
              <div className="item">
                <div className="name">Milestone 1</div>
                <div className="from"></div>
                <div className="to"></div>
                <div className="description">Description</div>
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
export default Milestone;
