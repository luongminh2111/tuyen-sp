import React from "react";
import "../styles/Milestone.scss";
import { useState } from "react";
import EditMilestone from "./EditMilestone";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListMileStoneInProject } from "../actions/ProjectActionCallApi";

function Milestone(props) {

  const {projectId} = props;

  const milestones = useSelector(state => state.projects.milestone) || [];

  const [edit, setEdit] = useState(false);
  const [currentMileStone, setCurrentMileStone] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListMileStoneInProject(projectId));
  }, []);

  const handleEdit = (milestone) => {
    setCurrentMileStone(milestone);
    setEdit(true);
  }

  if (edit) {
    return <EditMilestone setEdit={setEdit} projectId={projectId} milestone={currentMileStone} setCurrentMileStone={setCurrentMileStone} />;
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
          <div className="name">Milestone name</div>
          <div className="from">Start date</div>
          <div className="to">Due date</div>
          <div className="ml-desc">Description</div>
          <div className="delete">Delete</div>
        </div>
        <div className="body">
          {milestones?.map((e, index) => {
            return (
              <div className="item" key={index}>
                <div className="name" onClick={() => handleEdit(e)} >{e?.name}</div>
                <div className="from">{e?.start_date}</div>
                <div className="to">{e?.due_date}</div>
                <div className="ml-desc">{e?.description}</div>
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
