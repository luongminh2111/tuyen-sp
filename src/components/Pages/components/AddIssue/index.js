import React, { useEffect, useState, useMemo } from "react";
import "./styles/index.scss";
import HeaderNav from "../../../commons/HeaderNav/HeaderNav";
import { ORG_IMAGE_DEFAULT } from "../../../../commons/image";
import { Button } from "@mui/material";
import ButtonDropDown from "../../../../commons/Button/ButtonDropdown";
import { priorityOptions } from "./commons/DataCommon";
import ToggleNav from "../../../../commons/ToggleNav";
import { useDispatch, useSelector } from "react-redux";
import { compareTime, parseDateToString } from "../../../../ulti/dateTime";
import {
  getListMemberOfProject,
  getListMileStoneInProject,
} from "../ProjectSetting/actions/ProjectActionCallApi";
import { createTask } from "./actions/CreateTaskCallApi";
import Alerts from "../../../../commons/Alert";
import { createTaskForProject } from "../ProjectSetting/actions/ProjectActionRedux";
import { useHistory } from "react-router-dom";

function AddIssue(props) {
  const isExpand = useSelector((state) => state.global.isExpand);
  const curProject = useSelector((state) => state.projects.itemDetail);
  const members = useSelector((state) => state.projects.members);
  const milestones = useSelector((state) => state.projects.milestone);
  const account = useSelector((state) => state.auth.account);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState(parseDateToString(new Date()));
  const [endTime, setEndTime] = useState(parseDateToString(new Date()));
  const [milestone, setMilestone] = useState({});
  const [priority, setPriority] = useState({});
  const [estTime, setEstTime] = useState(0);
  const [assignee, setAssignee] = useState({});
  const [textAlert, setTextAlert] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [statusAlert, setStatusAlert] = useState(false);

  const [createSuccess, setCreateSuccess] = useState(false);

  const [taskCreated, setTaskCreated] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const memberOptions = useMemo(() => {
    const newMembers = members?.map((e) => {
      return {
        ...e,
        value: e?.name,
      };
    });
    return newMembers;
  }, [members]);

  const mileStoneOptions = useMemo(() => {
    const newMileStones = milestones?.map((e) => {
      return {
        ...e,
        value: e?.name,
      };
    });
    return newMileStones;
  }, [milestones]);

  useEffect(() => {
    dispatch(getListMemberOfProject(curProject.id));
    dispatch(getListMileStoneInProject());
  }, []);

  const handleCreateTask = () => {
    if (account?.role !== 2) {
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
      milestone_id: milestone?.id || null,
      status: "Open",
      priority: priority?.value,
      assignee_id: assignee?.id,
      estimate_time: estTime,
    };
    dispatch(createTask(request)).then((res) => {
      if (res?.status === 200 && res?.data?.data) {
        setOpenAlert(true);
        setStatusAlert("success");
        setTextAlert(res.data?.message);
        dispatch(createTaskForProject(res.data.data));
        setTaskCreated(res.data.data);
        setCreateSuccess(true);
      } else {
        setOpenAlert(true);
        setStatusAlert("error");
        setTextAlert(res.data?.message);
      }
    });
  };

  const handleCreateMore = () => {
    setName("");
    setDescription("");
    setEstTime(0);
    setMilestone({});
    setAssignee({});
    setPriority({});
    setStartTime(parseDateToString(new Date()));
    setEndTime(parseDateToString(new Date()));
    setCreateSuccess(false);
    setTaskCreated("");
  };

  return (
    <>
      <ToggleNav />
      <div className={`add-issue-wrapper ${isExpand ? "menu-expand" : ""}`}>
        <HeaderNav />
        <div className="content-header">
          <div className="header-icon-set project-header__summary">
            <div className="header-icon-set__icon">
              <a href="">
                <img src={ORG_IMAGE_DEFAULT} />
              </a>
            </div>
            <div className="header-icon-set__text">
              <span className="header-icon-set__name">{curProject?.name}</span>
              <span className="header-icon-set__key">
                ({curProject?.project_key})
              </span>
            </div>
          </div>
          <div className="project-header__actions"></div>
        </div>
        {createSuccess ? (
          <div className="create-task-success">
            <div>
              <div className="title1">Task has been added</div>
              <div
                className="mt-2 d-flex justify-content-center"
                style={{
                  color: "#0088FF",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
                onClick={() => {dispatch({
                  type: 'UPDATE_TASK_DETAIL',
                  item: taskCreated
                }); history.push("/tasks")}}
              >
                {taskCreated?.task_key}&nbsp;{taskCreated?.name}
              </div>
            </div>
            <div className="btn">
              <button onClick={() => handleCreateMore()}>
                Create another task
              </button>
            </div>
          </div>
        ) : (
          <div className="contents-main">
            <div className="title-issue">
              <h3>Create task</h3>
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
                      <ButtonDropDown
                        options={mileStoneOptions}
                        onChangeOption={setMilestone}
                      />
                    </div>
                  </div>
                  <div className="ticket__properties-item -milestones">
                    <label>Estimate Time</label>
                    <div className="ticket__properties-value">
                      <input
                        type="number"
                        value={estTime}
                        onChange={(e) => setEstTime(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="list-btn">
              <Button className="add-btn" onClick={() => handleCreateTask()}>
                Add
              </Button>
            </div>
          </div>
        )}
      </div>
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
export default AddIssue;
