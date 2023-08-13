import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import React, { useState } from "react";
import "../styles/CreateSubTaskModal.scss";
import ButtonDropDown from "../../../../../commons/Button/ButtonDropdown";
import { compareTime, parseDateToString } from "../../../../../ulti/dateTime";
import { priorityOptions } from "../../AddIssue/commons/DataCommon";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTask } from "../../AddIssue/actions/CreateTaskCallApi";
import Alerts from "../../../../../commons/Alert";
import { updateListTaskForProject } from "../../ProjectSetting/actions/ProjectActionRedux";

function CreateSubTaskModal(props) {
  const {
    open,
    handleClose,
    members,
    milestoneId,
    milestones,
    parentTask,
    taskItem,
  } = props;
  const account = useSelector((state) => state.auth.account);
  const curProject = useSelector((state) => state.projects.itemDetail);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState(parseDateToString(new Date()));
  const [endTime, setEndTime] = useState(parseDateToString(new Date()));
  const [est, setEst] = useState(0);
  const [priority, setPriority] = useState({});
  const [assignee, setAssignee] = useState({});
  const [textAlert, setTextAlert] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [statusAlert, setStatusAlert] = useState(false);

  const dispatch = useDispatch();

  const handleCreateTask = () => {
    if (account?.role === 1) {
      setOpenAlert(true);
      setStatusAlert("error");
      setTextAlert("You do not have permission to perform this operation");
      return;
    }
    if (compareTime(new Date(endTime), new Date(startTime))) {
      setOpenAlert(true);
      setStatusAlert("error");
      setTextAlert("Start time can not be after End time");
      return;
    }
    const request = {
      name,
      description,
      start_time: startTime,
      end_time: endTime,
      project_id: curProject?.id,
      milestone_id: milestoneId || null,
      status: "Open",
      priority: priority?.value,
      assignee_id: assignee?.id,
      is_child: true,
      parent_task_id: parentTask?.id,
      estimate_time: est,
    };
    dispatch(createTask(request)).then((res) => {
      if (res?.status === 200 && res?.data?.data) {
        setOpenAlert(true);
        setStatusAlert("success");
        setTextAlert(res.data?.message);
        let newSubTask = taskItem;
        if (!newSubTask?.sub_tasks) {
          newSubTask = {...taskItem, sub_tasks: [res?.data?.data]}
        } else {
          newSubTask = {...taskItem, sub_tasks: [...taskItem.sub_tasks, res?.data?.data]}
        }
        dispatch({
          type: "UPDATE_TASK_DETAIL",
          item: newSubTask,
        });
        dispatch(updateListTaskForProject(newSubTask));
        setName("");
        setDescription("");
        setStartTime(parseDateToString(new Date()));
        setEndTime(parseDateToString(new Date()));
        setPriority({});
        setAssignee({});
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

  const getCurrentMilestone = () => {
    return milestones?.find((e) => e.id === milestoneId)?.name;
  };

  return (
    <>
      <Dialog open={open} className="dialog-create-sub-task" maxWidth="lg">
        <DialogTitle className="create-pj-title">
          <div className="text-align-center">Create new sub task</div>
        </DialogTitle>
        <DialogContent>
          <div className="contents-add">
            <div className="text-input-sbj">
              <div className="label">Task parent</div>
              <div className="input-text">
                <input type="text" value={parentTask?.name} disabled />
              </div>
            </div>
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
                    <div className="ticket__properties-value">Open</div>
                  </div>
                  <div className="ticket__properties-item -priority">
                    <label>Priority</label>
                    <div className="ticket__properties-value">
                      <ButtonDropDown
                        options={priorityOptions}
                        onChangeOption={setPriority}
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
                      />
                    </div>
                  </div>
                  <div className="ticket__properties-item -milestones">
                    <label>Milestone</label>
                    <div className="ticket__properties-value">
                      {getCurrentMilestone()}
                    </div>
                  </div>
                  <div className="ticket__properties-item -milestones">
                    <label>Estimate Time</label>
                    <div className="ticket__properties-value">
                      <input
                        type="number"
                        value={est}
                        onChange={(e) => setEst(e.target.value)}
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
            <button className="add-btn" onClick={() => handleCreateTask()}>
              Save
            </button>
          </div>
        </DialogContent>
        {openAlert ? (
          <Alerts
            text={textAlert}
            status={statusAlert}
            open={openAlert}
            setOpen={setOpenAlert}
          />
        ) : null}
      </Dialog>
    </>
  );
}
export default CreateSubTaskModal;
