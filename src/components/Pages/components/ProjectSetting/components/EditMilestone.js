import React from "react";
import "../styles/EditMilestone.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createNewMileStone } from "../actions/ProjectActionCallApi";
import { saveNewMilestone } from "../actions/ProjectActionRedux";
import Alerts from "../../../../../commons/Alert";

function EditMilestone(props) {
  const { setEdit, projectId } = props;
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date());

  const [textAlert, setTextAlert] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [statusAlert, setStatusAlert] = useState(false);

  const handleCreateMileStone = () => {
    const request = {
      title,
      description,
      start_date: startDate,
      due_date: dueDate,
      project_id: projectId,
    };
    dispatch(createNewMileStone(request)).then((res) => {
      if (res?.status === 200 && res?.data?.data) {
        setOpenAlert(true);
        setStatusAlert("success");
        setTextAlert(res.data?.message);
        dispatch(saveNewMilestone(res.data.data));
        setTimeout(() => {
          setEdit(false);
        }, [1500]);
      } else {
        setOpenAlert(true);
        setStatusAlert("error");
        setTextAlert(res.data?.message);
      }
    });
  };

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
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="note">i.e. 1.0-M1</div>
          </div>
          <div className="input-date mt-3">
            <div className="label">
              <span>Start date</span>
              <span>*</span>
            </div>
            <div>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
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
              <span>Due date</span>
              <span>*</span>
            </div>
            <div>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
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
          <textarea
            placeholder="Add any description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
      <div className="d-flex justify-content-center submit-btn">
        <button onClick={() => handleCreateMileStone()}>Submit</button>
      </div>
      {openAlert ? (
        <Alerts
          text={textAlert}
          status={statusAlert}
          open={openAlert}
          setOpen={setOpenAlert}
        />
      ) : null}
    </div>
  );
}
export default EditMilestone;
