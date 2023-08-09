import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import React, { useState } from "react";
import "../styles/CreateSubTaskModal.scss";
import ButtonDropDown from "../../../../../commons/Button/ButtonDropdown";
import { parseDateToString } from "../../../../../ulti/dateTime";
import { priorityOptions } from "../../AddIssue/commons/DataCommon";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTask } from "../../AddIssue/actions/CreateTaskCallApi";
import Alerts from "../../../../../commons/Alert";
import { useEffect } from "react";

function EditTaskModal(props) {
  const {
    open,
    handleClose,
    members,
    milestoneId,
    milestones,
    setTaskItem,
    taskItem,
  } = props;
  
  const curProject = useSelector((state) => state.projects.itemDetail);
  const [name, setName] = useState(taskItem?.name);
  const [description, setDescription] = useState(taskItem?.description);
  const [startTime, setStartTime] = useState(
    parseDateToString(taskItem?.start_time || new Date())
  );
  const [endTime, setEndTime] = useState(
    parseDateToString(taskItem?.end_time || new Date())
  );
  const [milestone, setMilestone] = useState({});
  const [priority, setPriority] = useState({});
  const [assignee, setAssignee] = useState({});
  const [status, setStatus] = useState({});
  const [textAlert, setTextAlert] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [statusAlert, setStatusAlert] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    
    const curStatus =
      statusOptions?.find((e) => e.value === taskItem?.status) ||
      statusOptions[0];
    setStatus(curStatus);
    const curPriority = priorityOptions?.find(e => e.value === taskItem?.priority) || priorityOptions[0];
    setPriority(curPriority);
    const curMember = memberOptions?.find(e => e.id === taskItem?.assignee_id) || memberOptions[0];
    setAssignee(curMember);
    const curMilestone = mileStoneOptions?.find(e => e.id === taskItem?.milestone_id) || mileStoneOptions[0];
    setMilestone(curMilestone);
  }, [milestones, members, taskItem ]);

  console.log("check priority :", priority);

  const mileStoneOptions = useMemo(() => {
    const newMileStones = milestones?.map(e => {
      return {
        ...e, 
        value: e?.name
      }
    });
    return newMileStones;
  }, [milestones]);

  const handleUpdateTask = () => {
    const request = {
      id: taskItem?.id,
      name,
      description,
      start_time: startTime,
      end_time: endTime,
      project_id: curProject?.id,
      milestone_id: milestoneId || null,
      status: status?.value || statusOptions[0]?.value,
      priority: priority?.value || priorityOptions[0]?.value,
      assignee: assignee?.id || memberOptions[0]?.value,
    };
    dispatch(updateTask(request)).then((res) => {
      if (res?.status === 200 && res?.data?.data) {
        setOpenAlert(true);
        setStatusAlert("success");
        setTextAlert(res.data?.message);
        setTaskItem(res?.data?.data);
        handleClose();
      } else {
        setOpenAlert(true);
        setStatusAlert("error");
        setTextAlert(res.data?.message);
      }
    });
  };

  const memberOptions = useMemo(() => {
    const newMembers = members?.map((e) => {
      return {
        ...e,
        value: e?.name,
      };
    });
    return newMembers;
  }, [members]);

  return (
    <>
      <Dialog open={open} className="dialog-create-sub-task" maxWidth="lg">
        <DialogTitle className="create-pj-title">
          <div className="text-align-center">Edit task</div>
        </DialogTitle>
        <DialogContent>
          <div className="contents-add">
            {/* <div className="text-input-sbj">
              <div className="label">Task parent</div>
              <div className="input-text">
                <input type="text" value={parentTask?.name} disabled />
              </div>
            </div> */}
            <div className="text-input-sbj">
              <div className="label">Name</div>
              <div className="input-text">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className="card card--default ticket__content">
              <div className="area-input-ticket">
                <textarea
                  placeholder="Add a description, use @ mentor to notify a colleague.."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="card-content">
                <div className="card-left">
                  <div className="ticket__properties-item -status">
                    <label>Status</label>
                    <div className="ticket__properties-value">
                      <ButtonDropDown
                        options={statusOptions}
                        onChangeOption={setStatus}
                        curOption={status}
                      />
                    </div>
                  </div>
                  <div className="ticket__properties-item -priority">
                    <label>Priority</label>
                    <div className="ticket__properties-value">
                      <ButtonDropDown
                        options={priorityOptions}
                        onChangeOption={setPriority}
                        curOption={priority}
                      />
                    </div>
                  </div>
                  <div className="ticket__properties-item -limit-date">
                    <label>Start time</label>
                    <div className="input-time">
                      <input
                        type="date"
                        value={startTime}
                        onChange={(e) => {
                          setStartTime(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="ticket__properties-item -limit-date">
                    <label>End time</label>
                    <div className="input-time">
                      <input
                        type="date"
                        value={endTime}
                        onChange={(e) => {
                          setEndTime(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="card-right">
                  <div className="ticket__properties-item -assigner">
                    <label>Assignee</label>
                    <div className="ticket__properties-value">
                      <ButtonDropDown
                        options={memberOptions}
                        onChangeOption={setAssignee}
                        curOption={assignee}
                      />
                    </div>
                  </div>
                  <div className="ticket__properties-item -milestones">
                    <label>Milestone</label>
                    <div className="ticket__properties-value">
                      <ButtonDropDown
                        options={mileStoneOptions}
                        onChangeOption={setMilestone}
                        curOption={milestone}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="list-btn">
            <button className="close-btn" onClick={() => handleClose()}>
              Cancel
            </button>
            <button className="add-btn" onClick={() => handleUpdateTask()}>
              Save
            </button>
          </div>
        </DialogContent>
      </Dialog>
      {openAlert ? (
        <Alerts
          text={textAlert}
          status={statusAlert}
          open={openAlert}
          setOpen={setOpenAlert}
        />
      ) : null}
    </>
  );
}
export default EditTaskModal;

const statusOptions = [
  {
    id: 1,
    value: "Open",
  },
  {
    id: 2,
    value: "In Progress",
  },
  {
    id: 3,
    value: "Resolved",
  },
  {
    id: 4,
    value: "Closed",
  },
];
