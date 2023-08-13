import React from "react";
import "../styles/Milestone.scss";
import { useState } from "react";
import EditMilestone from "./EditMilestone";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteMilestoneInProject, getListMileStoneInProject } from "../actions/ProjectActionCallApi";
import Alerts from "../../../../../commons/Alert";
import { DialogContent, Dialog } from "@mui/material";

function Milestone(props) {
  const { projectId, account } = props;

  const milestones = useSelector((state) => state.projects.milestone) || [];

  const [edit, setEdit] = useState(false);
  const [currentMileStone, setCurrentMileStone] = useState({});

  const [textAlert, setTextAlert] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [statusAlert, setStatusAlert] = useState(false);

  const [open1, setOpen1] = useState(false);
  const [idSelect, setIdSelect] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListMileStoneInProject());
  }, []);

  const handleChangeEdit = (value, milestone) => {
    if (milestone) {
      setCurrentMileStone(milestone);
    }
    setEdit(value);
  };

  if (edit) {
    return (
      <EditMilestone
        setEdit={setEdit}
        account={account}
        projectId={projectId}
        milestone={currentMileStone}
        setCurrentMileStone={setCurrentMileStone}
      />
    );
  }

  
  const handleDeleteMilestone = (id) => {
    dispatch(deleteMilestoneInProject(id)).then(res => {
      if (res?.status === 200 && res?.data?.data) {
        setOpenAlert(true);
        setStatusAlert("success");
        setTextAlert(res.data?.message);
        setOpen1(false);
        setIdSelect("");
        dispatch({type: "DELETE_MILESTONE", id: idSelect});
      } else {
        setOpenAlert(true);
        setStatusAlert("error");
        setTextAlert(res.data?.message);
      }
    });
  };

  const renderAlert = () => {
    return (
      <Dialog open={open1} className="dialog-delete-member" maxWidth="lg">
        <DialogContent>
          <div className="contents-add d-flex justify-content-between">
          All information related to this milestone in this project will be deleted. Are you sure delete?
          </div>
          <div className="list-action-member d-flex justify-content-end" style={{marginTop: '16px'}}>
            <button style={{background: '#FF4d4d', marginRight: '16px'}} onClick={() => setOpen1(false)}>Cancel</button>
            <button onClick={() => handleDeleteMilestone(idSelect)}>Delete</button>
          </div>
        </DialogContent>
      </Dialog>
    );
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
        <button onClick={() => handleChangeEdit(true)}>Add Milestone</button>
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
          {console.log("check milestones :", milestones)}
          {milestones?.map((e, index) => {
            return (
              <div className="item" key={index}>
                <div className="name" onClick={() => handleChangeEdit(true, e)}>
                  {e?.name}
                </div>
                <div className="from">{e?.start_date?.substring(0, 10)}</div>
                <div className="to">{e?.due_date?.substring(0, 10)}</div>
                <div className="ml-desc">{e?.description}</div>
                <div className="delete">
                  <i className="fa-solid fa-x " onClick={() => {setOpen1(true); setIdSelect(e.id)}}></i>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {open1 ? renderAlert() : null}
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
export default Milestone;
