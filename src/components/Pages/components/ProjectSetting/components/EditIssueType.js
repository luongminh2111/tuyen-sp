import React from "react";
import "../styles/EditIssueType.scss";

function EditIssueType(props) {
  const { setEdit } = props;

  return (
    <div className="add-issue-type-content-wrapper">
      <div className="back-to-edit" onClick={() => setEdit(false)}>
        <i className="fa-sharp fa-solid fa-arrow-left"></i>
        Back
      </div>
      <div className="title d-flex">
        <div>Add Issue Types </div>
        <div>
          <i className="fa-sharp fa-solid fa-circle-question"></i>
        </div>
      </div>
      <div className="add-issue-content">
        <div className="add-item">
          <div className="input-name">
            <div className="label">
              <span>List of Issue Types</span>
              <span>*</span>
            </div>
            <div>
              <input type="text" />
            </div>
            <div className="note">
              Name of issue type. The type(s) can be defined in each project.
              e.g. "Bug", "Task", "ToDo" and so on.
            </div>
          </div>
          <div className="list-color d-block">
            <div className="d-flex mt-3">
              <div className="d-flex">
                <input type="radio" />
                <div>color </div>
              </div>
              <div className="d-flex">
                <input type="radio" />
                <div>color </div>
              </div>
              <div className="d-flex">
                <input type="radio" />
                <div>color </div>
              </div>
            </div>
            <div className="d-flex mt-3">
              <div className="d-flex">
                <input type="radio" />
                <div>color </div>
              </div>
              <div className="d-flex">
                <input type="radio" />
                <div>color </div>
              </div>
              <div className="d-flex">
                <input type="radio" />
                <div>color </div>
              </div>
            </div>
          </div>
        </div>
        <div className="exist-item">
          <div className="label">Existing items</div>
          <div className="list-issue-exist">
            {["Task", "Bug", "Request", "Orther"]?.map((e) => {
              return <div className="item">{e}</div>;
            })}
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center submit-btn">
        <button>Submit</button>
      </div>
    </div>
  );
}
export default EditIssueType;
