import React from "react";
import "../styles/EditMilestone.scss";

function EditMilestone(props) {
  const { setEdit } = props;

  return (
    <div className="add-mile-content-wrapper">
      <div className="back-to-edit" onClick={() => setEdit(false)}>
        <i className="fa-sharp fa-solid fa-arrow-left"></i>
        Back
      </div>
      <div className="title d-flex">
        <div>Add milestone </div>
        <div>
          <i className="fa-sharp fa-solid fa-circle-question"></i>
        </div>
      </div>
      <div className="add-mile-content">
        <div className="add-item">
          <div className="input-name">
            <div className="label">
              <span>Milestone</span>
              <span>*</span>
            </div>
            <div>
              <input type="text" />
            </div>
            <div className="note">i.e. 1.0-M1</div>
          </div>
          <div className="input-date mt-3">
            <div className="label">
              <span>Start date</span>
              <span>*</span>
            </div>
            <div>
              <input type="date" />
            </div>
            <div className="note">
              <div>In YYYY/MM/DD format E.g. 2005/06/01</div>
              <div>
                You can see Burndown Chart if you set the Start Date and the End
                Date
              </div>
            </div>
          </div>
          <div className="input-date mt-3">
            <div className="label">
              <span>End date</span>
              <span>*</span>
            </div>
            <div>
              <input type="date" />
            </div>
            <div className="note">
              <div>In YYYY/MM/DD format E.g. 2005/06/01</div>
            </div>
          </div>
        </div>
      </div>
      <div className="description">
        <div className="label">Description</div>
        <div className="area-input-desc">
          <textarea placeholder="Add any description" />
        </div>
      </div>
      <div className="d-flex justify-content-center submit-btn">
        <button>Submit</button>
      </div>
    </div>
  );
}
export default EditMilestone;
