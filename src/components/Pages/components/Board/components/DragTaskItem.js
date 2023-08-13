import React, { useState, useRef, useEffect } from "react";
import "../styles/DragTaskItem.scss";
import { useDispatch, useSelector } from "react-redux";
import { updateTask } from "../../AddIssue/actions/CreateTaskCallApi";
import Alerts from "../../../../../commons/Alert";
import { getListTask } from "../../Issue/actions/TaskCallApi";
import { EMPTY_USER } from "../../../../../commons/image";
import ReactTooltip from "react-tooltip";
import { useHistory } from "react-router-dom";

function DragTaskItem(props) {
  const { tasks, members } = props;

  const filterTask = useSelector((state) => state.projects.filterTask);

  const [groupTask, setGroupTask] = useState([
    // { title: "Open", items: [], status: 'Open'},
    // { title: "In Progress", items: [], status: 'In-Progress' },
    // { title: "Resolved", items: [], status: 'Resolved' },
    // { title: "Closed", items: [], status: 'Closed' },
  ]);
  const [dragging, setDragging] = useState(false);

  const [textAlert, setTextAlert] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [statusAlert, setStatusAlert] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleFilterTask = (status, listTask) => {
    return listTask?.filter(
      (e) => e.status.toUpperCase() === status?.toUpperCase()
    );
  };

  const handleGetListTask = (statusSelect, milestoneId, assigneeId, key) => {
    dispatch(getListTask(statusSelect, milestoneId, assigneeId, key)).then(
      (res) => {
        const listParentTask = res?.map((e) => {
          return {
            id: e.id,
            assignee_id: e.assignee_id,
            name: e.name,
            priority: e.priority,
            status: e.status,
            task_key: e.task_key,
            end_time: e.end_time,
          };
        });
        const arrSub = new Array();
        const listSubTask = res
          ?.filter((e1) => e1?.sub_tasks?.length > 0)
          ?.map((e2) =>
            e2.sub_tasks?.map((e3) =>
              arrSub.push({
                id: e3.id,
                assignee_id: e3.assignee_id,
                name: e3.name,
                priority: e3.priority,
                status: e3.status,
                task_key: e3.task_key,
                end_time: e3.end_time,
              })
            )
          );
        const taskOpen = handleFilterTask(
          "Open",
          listParentTask?.concat(arrSub)
        );
        const taskInProgress = handleFilterTask(
          "In Progress",
          listParentTask?.concat(arrSub)
        );
        const taskResolved = handleFilterTask(
          "Resolved",
          listParentTask?.concat(arrSub)
        );
        const taskClosed = handleFilterTask(
          "Closed",
          listParentTask?.concat(arrSub)
        );
        const arr = new Array();
        arr.push({
          title: "Open",
          items: !statusSelect || statusSelect === "Open" ? taskOpen : [],
          status: "Open",
        });
        arr.push({
          title: "In Progress",
          items:
            !statusSelect || statusSelect === "In Progress"
              ? taskInProgress
              : [],
          status: "In Progress",
        });
        arr.push({
          title: "Resolved",
          items:
            !statusSelect || statusSelect === "Resolved" ? taskResolved : [],
          status: "Resolved",
        });
        arr.push({
          title: "Closed",
          items: !statusSelect || statusSelect === "Closed" ? taskClosed : [],
          status: "Closed",
        });
        setGroupTask(arr);
      }
    );
  };

  useEffect(() => {
    handleGetListTask(
      filterTask?.status,
      filterTask?.milestone_id,
      filterTask?.assignee_id,
      filterTask?.key
    );
  }, [filterTask]);

  const dragItem = useRef();
  const dragItemNode = useRef();

  const handleDragStart = (e, item) => {
    dragItemNode.current = e.target;
    dragItemNode.current.addEventListener("dragend", handleDragEnd);
    dragItem.current = item;

    setTimeout(() => {
      setDragging(true);
    }, 0);
  };

  const handleUpdateTask = (task, status) => {
    const editTask = tasks?.find((e) => e?.id === task?.id);
    const request = {
      ...editTask,
      status: status,
    };
    dispatch(updateTask(request)).then((res) => {
      if (res?.status === 200 && res?.data?.data) {
        setOpenAlert(true);
        setStatusAlert("success");
        setTextAlert(res.data?.message);
      } else {
        setOpenAlert(true);
        setStatusAlert("error");
        setTextAlert(res.data?.message);
      }
    });
  };

  const handleDragEnter = (e, targetItem, item) => {
    if (dragItemNode.current !== e.target) {
      setGroupTask((oldList) => {
        let newList = JSON.parse(JSON.stringify(oldList));
        newList[targetItem.grpI].items.splice(
          targetItem.itemI,
          0,
          newList[dragItem.current.grpI].items.splice(
            dragItem.current.itemI,
            1
          )[0]
        );
        dragItem.current = targetItem;
        const status = groupTask?.[targetItem.grpI]?.status;
        handleUpdateTask(item, status);
        return newList;
      });
    }
  };
  const handleDragEnd = (e) => {
    setDragging(false);
    dragItem.current = null;
    dragItemNode.current.removeEventListener("dragend", handleDragEnd);
    dragItemNode.current = null;
  };

  const handleShowDetailTask = (id) => {
    const curTask = tasks?.find(e => e.id === id);
    if(curTask?.id) {
      dispatch({
        type: 'UPDATE_TASK_DETAIL',
        item: curTask
      });
      history.push("/tasks");
    }
  }

  const getStyles = (item) => {
    if (
      dragItem.current.grpI === item.grpI &&
      dragItem.current.itemI === item.itemI
    ) {
      return "dnd-item current";
    }
    return "dnd-item";
  };

  const compareTime = (d1, d2) => {
    if (d1.getTime() < d2.getTime()) {
      return true;
    }
    return false;
  };

  if (groupTask?.length === 0) return null;

  return (
    <div className="drag-n-drop">
      {groupTask.map((item, grpI) => {
        return (
          <div className="drag-item" key={`${grpI}-${grpI * 3}`}>
            <div
              className={`status-title ${item?.status}`}
              style={{ marginBottom: "16px" }}
            >
              <span>
                <i className="fa-solid fa-circle"></i>
              </span>
              <span>{item?.status || "Open"}</span>
              <span style={{ marginLeft: "8px" }}>({item?.items?.length})</span>
            </div>
            <div
              key={item.title}
              onDragEnter={
                dragging && !item.items.length
                  ? (e) => handleDragEnter(e, { grpI, itemI: 0 })
                  : null
              }
              className="list-issue"
            >
              {item.items.map((item, itemI) => (
                <div
                  draggable
                  key={item}
                  onDragStart={(e) => handleDragStart(e, { grpI, itemI })}
                  onDragEnter={
                    dragging
                      ? (e) => {
                          handleDragEnter(e, { grpI, itemI }, item);
                        }
                      : null
                  }
                  className={dragging ? getStyles({ grpI, itemI }) : "dnd-item"}
                >
                  <div className="task-item" key={item?.task_key}>
                    <div className="row-1 mb-2 mt-2">
                      <div className="_left col-10">
                        <div className="name" onClick={() => handleShowDetailTask(item.id)}>{item?.name}</div>
                      </div>
                      <div className="_right col-2">
                        {item?.assignee_id ? (
                          <div className="avatar">
                            <img
                            data-tip=""
                            data-for={`icon-user-${item?.task_key}`}
                              src={item?.avatar || EMPTY_USER}
                              alt="avatar"
                            />
                            <ReactTooltip
                              type="dark"
                              effect="solid"
                              place="top"
                              id={`icon-user-${item?.task_key}`}
                            >
                              {members?.find(e => e.id === item?.assignee_id)?.name || null}
                            </ReactTooltip>
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="row-2">
                      <div className="item_priority">
                        <span>Key: </span>
                        <span>{item?.task_key}</span>
                      </div>
                    </div>
                    <div className="row-2 mt-1">
                      <div className="item_priority">
                        <span style={{ marginRight: "12px" }}>Priority: </span>
                        {item?.priority === "LOW" ? (
                          <span>
                            <i
                              className="fa-solid fa-arrow-down"
                              style={{ color: "#2c9a7a" }}
                            ></i>
                          </span>
                        ) : null}
                        {item?.priority === "HIGH" ? (
                          <span>
                            <i
                              className="fa-solid fa-arrow-up"
                              style={{ color: "#FF4D4D" }}
                            ></i>
                          </span>
                        ) : null}
                        {item?.priority === "NORMAL" ? (
                          <span>
                            <i className="fa-solid fa-arrow-right"></i>
                          </span>
                        ) : null}
                      </div>
                    </div>
                    <div
                      className="row-2 mt-1 mb-2 d-flex"
                      style={{ fontSize: "13px", fontWeight: "400" }}
                    >
                      <div
                        style={
                          compareTime(new Date(item?.end_time), new Date()) && item?.status !== 'Closed'
                            ? {
                                marginRight: "12px",
                                fontWeight: "600",
                                color: "#FF4d4d",
                              }
                            : { marginRight: "12px" }
                        }
                      >
                        End time:
                      </div>
                      <div
                        style={
                          compareTime(new Date(item?.end_time), new Date()) && item?.status !== 'Closed'
                            ? {
                                fontWeight: "600",
                                color: "#FF4d4d",
                              }
                            : {}
                        }
                      >
                        {item?.end_time?.substring(0, 10)}
                      </div>
                      {compareTime(new Date(item?.end_time), new Date()) && item?.status !== 'Closed' ? (
                        <div>
                          <i
                            style={{
                              color: "red",
                              marginLeft: "6px",
                              fontSize: "16px",
                            }}
                            className="fa-solid fa-fire"
                          ></i>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
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

export default DragTaskItem;
