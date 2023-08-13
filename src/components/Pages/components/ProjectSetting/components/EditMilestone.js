import React from "react";
import "../styles/EditMilestone.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createNewMileStone } from "../actions/ProjectActionCallApi";
import { saveNewMilestone, updateMilestone } from "../actions/ProjectActionRedux";
import Alerts from "../../../../../commons/Alert";
import { compareTime, parseDateToString } from "../../../../../ulti/dateTime";

function EditMilestone(props) {
  const { setEdit, projectId, milestone, setCurrentMileStone, account } = props;
  const dispatch = useDispatch();
  const [title, setTitle] = useState(milestone?.name || "");
  const [description, setDescription] = useState(milestone?.description || "");
  const [startDate, setStartDate] = useState(milestone?.start_date?.substring(0,10) || parseDateToString (new Date()));
  const [dueDate, setDueDate] = useState(milestone?.due_date?.substring(0,10) || parseDateToString (new Date()));

  const [textAlert, setTextAlert] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [statusAlert, setStatusAlert] = useState(false);

  const handleCreateMileStone = () => {
    if (account?.role !== 2) {
      setOpenAlert(true);
      setStatusAlert("error");
      setTextAlert("You do not have permission to perform this operation");
      return;
    }
    if (compareTime(new Date(dueDate), new Date(startDate))) {
      setOpenAlert(true);
      setStatusAlert("error");
      setTextAlert("Start time can not be after End time");
      return;
    }
    const request = {
      name: title,
      description,
      start_date: startDate,
      due_date: dueDate,
      project_id: projectId,
    };
    dispatch(createNewMileStone(request, milestone?.id)).then((res) => {
      if (res?.status === 200 && res?.data?.data) {
        setOpenAlert(true);
        setStatusAlert("success");
        setTextAlert(res.data?.message);
        dispatch(updateMilestone(res.data.data));
        setTitle("");
        setDescription("");
        setStartDate(parseDateToString (new Date()));
        setDueDate(parseDateToString (new Date()));
        setCurrentMileStone("");
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

  const handleGoBack = () => {
    setEdit(false);
    setCurrentMileStone({});
  }

  return (
    <div className="add-mile-content-wrapper">
      <div className="back-to-edit" onClick={() => handleGoBack()}>
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
