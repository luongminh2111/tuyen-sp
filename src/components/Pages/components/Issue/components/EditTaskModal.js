import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import React, { useState } from "react";
import "../styles/CreateSubTaskModal.scss";
import ButtonDropDown from "../../../../../commons/Button/ButtonDropdown";
import { compareTime, parseDateToString } from "../../../../../ulti/dateTime";
import { useDispatch, useSelector } from "react-redux";
import { updateTask } from "../../AddIssue/actions/CreateTaskCallApi";
import Alerts from "../../../../../commons/Alert";
import { updateListTaskForProject } from "../../ProjectSetting/actions/ProjectActionRedux";

function EditTaskModal(props) {
  const {
    open,
    handleClose,
    milestoneId,
    taskItem,
    memberOptions,
    priorityOptions,
    mileStoneOptions,
  } = props;
  const account = useSelector((state) => state.auth.account);
  const curProject = useSelector((state) => state.projects.itemDetail);
  const [name, setName] = useState(taskItem?.name);
  const [description, setDescription] = useState(taskItem?.description);
  const [est, setEst] = useState(taskItem?.estimate_time);
  const [startTime, setStartTime] = useState(
    parseDateToString(taskItem?.start_time || new Date())
  );
  const [endTime, setEndTime] = useState(
    parseDateToString(taskItem?.end_time || new Date())
  );
  const [milestone, setMilestone] = useState(
    mileStoneOptions?.find((e) => e.id === taskItem?.milestone_id) ||
      mileStoneOptions[0]
  );
  const [priority, setPriority] = useState(
    priorityOptions?.find((e) => e.value === taskItem?.priority) ||
      priorityOptions[0]
  );
  const [assignee, setAssignee] = useState(
    memberOptions?.find((e) => e.id === taskItem?.assignee_id) ||
      memberOptions[0]
  );
  const [status, setStatus] = useState(
    statusOptions?.find((e) => e.value === taskItem?.status) || statusOptions[0]
  );
  const [textAlert, setTextAlert] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [statusAlert, setStatusAlert] = useState(false);

  const dispatch = useDispatch();


  const handleUpdateTask = () => {
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
      id: taskItem?.id,
      name,
      description,
      start_time: startTime,
      end_time: endTime,
      project_id: curProject?.id,
      milestone_id: milestoneId || null,
      status: status?.value || statusOptions[0]?.value,
      priority: priority?.value || priorityOptions[0]?.value,
      assignee_id: assignee?.id || memberOptions[0]?.value,
      estimate_time: est
    };
    dispatch(updateTask(request)).then((res) => {
      if (res?.status === 200 && res?.data?.data) {
        setOpenAlert(true);
        setStatusAlert("success");
        setTextAlert(res.data?.message);
        dispatch({
          type: "UPDATE_TASK_DETAIL",
          item: res?.data?.data
        });
        dispatch(updateListTaskForProject(res?.data?.data));
        setTimeout(() => {
          handleClose();
        }, 1000);
     
      } else {
        setOpenAlert(true);
        setStatusAlert("error");
        setTextAlert(res.data?.message);
      }
    });
  };

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
                  <div className="ticket__properties-item -milestones">
                    <label>Estimate Time</label>
                    <div className="ticket__properties-value mt-2">
                        <input type="number" value={est} onChange={(e) => setEst(e.target.value)} />
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
