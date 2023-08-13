import React, { useState, useEffect } from "react";
import "../styles/Detail.scss";
import { useDispatch, useSelector } from "react-redux";
import ReactTooltip from "react-tooltip";
import ButtonDropDown from "../../../../../commons/Button/ButtonDropdown";
import { useMemo } from "react";
import CreateSubTaskModal from "./CreateSubTaskModal";
import EditTaskModal from "./EditTaskModal";
import { getListMileStoneInProject } from "../../ProjectSetting/actions/ProjectActionCallApi";
import {
  DeleteComment,
  EditComment,
  deleteTaskInProject,
  getListCommentInTask,
  submitComment,
} from "../actions/TaskCallApi";
import { priorityOptions } from "../../AddIssue/commons/DataCommon";
import Alerts from "../../../../../commons/Alert";
import {
  createNewComment,
  updateComment,
} from "../../ProjectSetting/actions/ProjectActionRedux";
import { EMPTY_USER } from "../../../../../commons/image";
import { compareTime } from "../../../../../ulti/dateTime";
import { Dialog, DialogContent } from "@mui/material";

function TaskDetail(props) {
  const { taskItem, milestones, isExpand } = props;
  const tasks = useSelector((state) => state.projects.tasks);
  const account = useSelector((state) => state.auth.account);
  const listComment = useSelector((state) => state.projects.comments);
  const [comment, setComment] = useState("");
  const [showComment, setShowComment] = useState(false);
  const [userSelect, setUserSelect] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editComment, setEditComment] = useState({});

  const [textAlert, setTextAlert] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [statusAlert, setStatusAlert] = useState(false);

  const [parentTask, setParentTask] = useState({});
  const [open1, setOpen1] = useState(false);

  const dispatch = useDispatch();

  const members = useSelector((state) => state.projects.members);

  const getCurrentMember = (id) => {
    return members?.find((e) => e.id === id)?.name;
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

  const mileStoneOptions = useMemo(() => {
    const newMileStones = milestones?.map((e) => {
      return {
        ...e,
        value: e?.name,
      };
    });
    return newMileStones;
  }, [milestones]);

  const handleSelectUser = (value) => {
    if (userSelect?.includes(value)) {
      setUserSelect(userSelect?.filter((e) => e.value !== value));
    } else {
      setUserSelect(userSelect?.concat(value));
    }
  };

  const getCurrentMilestone = (id) => {
    return milestones?.find((e) => e.id === id)?.name;
  };

  const getParentTask = (parentId) => {
    return tasks?.find((e) => e.id === parentId);
  };

  useEffect(() => {
    dispatch(getListMileStoneInProject());
    dispatch(getListCommentInTask(taskItem.id, 1));
    if (taskItem?.parent_task_id) {
      setParentTask(getParentTask(taskItem?.parent_task_id));
    }
  }, []);

  useEffect(() => {
    dispatch(getListCommentInTask(taskItem.id, 1));

    if (taskItem?.parent_task_id) {
      setParentTask(getParentTask(taskItem?.parent_task_id));
    }
  }, [taskItem]);

  const handleDeleteTask = (task) => {
    dispatch(deleteTaskInProject(task.id)).then((res) => {
      if (res?.status === 200) {
        setOpenAlert(true);
        setStatusAlert("success");
        setTextAlert(res?.data?.message);
        setTimeout(() => {
          dispatch({ type: "RESET_TASK_DETAIL" });
          dispatch({ type: "DELETE_TASK", id: task.id });
        }, 1500);
      } else {
        setOpenAlert(true);
        setStatusAlert("error");
        setTextAlert(res?.data?.message);
      }
    });
  };

  const handleEditComment = () => {
    if (comment?.trim() === "" || comment == null) {
      setOpenAlert(true);
      setStatusAlert("error");
      setTextAlert("Comment must be empty");
      return;
    }
    const request = {
      content: comment,
      task_id: taskItem.id,
      created_by: account.userId,
      type: "NORMAL",
    };
    dispatch(EditComment(request, editComment.id)).then((res) => {
      setEditComment({});
      if (res?.status === 200 && res?.data?.data) {
        setOpenAlert(true);
        setStatusAlert("success");
        setTextAlert("Edit comment success!");
        dispatch(updateComment(res?.data?.data));
        setComment("");
      } else {
        setOpenAlert(true);
        setStatusAlert("error");
        setTextAlert("Edit comment failed!");
      }
    });
  };

  const handleDeleteComment = (e) => {
    if(e?.created_by !== account?.id && account?.role === 3) {
      setOpenAlert(true);
      setStatusAlert("error");
      setTextAlert("You do not have permission to perform this operation");
    return;
    }
    dispatch(DeleteComment(e?.id));
    setOpenAlert(true);
    setStatusAlert("success");
    setTextAlert("Delete comment success!");
  };

  const handleViewMore = () => {
    dispatch(
      getListCommentInTask(taskItem.id, listComment?.current_page + 1, true)
    );
  };

  const InputArea = () => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        handleEditComment();
      }
    };

    return (
      <textarea
        id="comment-area"
        value={comment}
        onKeyDown={handleKeyDown}
        onChange={(e) => setComment(e.target.value)}
      />
    );
  };

  const handleSubmitComment = () => {
    if (comment?.trim() === "" || comment == null) {
      setOpenAlert(true);
      setStatusAlert("error");
      setTextAlert("Comment must be empty");
      return;
    }
    const request = {
      content: comment,
      task_id: taskItem.id,
      created_by: account.userId,
    };
    dispatch(submitComment(request)).then((res) => {
      if (res?.status === 200 && res?.data?.data) {
        setOpenAlert(true);
        setStatusAlert("success");
        setTextAlert("Add comment success!");
        dispatch(createNewComment(res?.data?.data));
        setComment("");
        setShowComment(false);
      } else {
        setOpenAlert(true);
        setStatusAlert("error");
        setTextAlert("Add comment failed!");
      }
    });
  };

  const renderEmptyList = () => {
    return (
      <div className="empty-wrapper">
        <div className="content">
          <div>Subtask list is empty</div>
        </div>
      </div>
    );
  };
  const renderItem = (e, index) => {
    return (
      <>
        <div className="issue-item" key={index}>
          <div className="item_key">{e?.task_key}</div>
          <div className="item_subject">
            <div
              data-for={`item_subject_${index}`}
              data-tip=""
              onClick={() => {
                dispatch({
                  type: "UPDATE_TASK_DETAIL",
                  item: e,
                });
              }}
            >
              {e?.name}
            </div>
            <ReactTooltip
              type="dark"
              effect="solid"
              place="top"
              id={`item_subject_${index}`}
            >
              {e?.name}
            </ReactTooltip>
          </div>
          <div className="item_assignee text-align-center">
            {getCurrentMember(e?.assignee_id)}
          </div>
          <div className={`item_status ${e?.status}`}>
            <div>{e?.status}</div>
          </div>
          <div className="item_priority">
            {e?.priority === "LOW" ? (
              <i
                className="fa-solid fa-arrow-down"
                style={{ color: "#2c9a7a" }}
              ></i>
            ) : null}
            {e?.priority === "HIGH" ? (
              <i
                className="fa-solid fa-arrow-up"
                style={{ color: "#FF4D4D" }}
              ></i>
            ) : null}
            {e?.priority === "NORMAL" ? (
              <i className="fa-solid fa-arrow-right"></i>
            ) : null}
          </div>
          <div className="item_milestone">
            {getCurrentMilestone(e?.milestone_id)}
          </div>
          <div className="item_created">{e?.created_at?.substring(0, 10)}</div>
          <div className="item_due-date">{e?.end_time?.substring(0, 10)}</div>
          <div className="item_updateAt">{e?.updated_at?.substring(0, 10)}</div>
          <div className="item_register">{getCurrentMember(e?.created_by)}</div>
        </div>
      </>
    );
  };

  const renderComment = () => {
    return (
      <div className={`comment-wrapper ${isExpand ? "expand" : ""}`}>
        <div className={`comment-area`}>
          <textarea
            id="comment-area"
            placeholder="write a comment, using @mention to notify a colleague..."
            value={editComment == null ? comment : null}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <div className="tag-user">
          <ButtonDropDown
            options={memberOptions}
            onChangeOption={handleSelectUser}
          />
        </div>
        <div className="list-action">
          <button className="close" onClick={() => setShowComment(false)}>
            Close{" "}
          </button>
          <button className="submit" onClick={() => handleSubmitComment()}>
            Submit{" "}
          </button>
        </div>
      </div>
    );
  };

  const renderListComment = () => {
    return (
      <div className="list-comment">
        {listComment?.data
          ?.filter((e) => e.task_id === taskItem?.id)
          ?.map((e, index) => {
            const commentContents = e?.content?.split("/n");
            return (
              <div className="comment-item" key={index}>
                <div className="created_by d-flex">
                  <div className="image">
                    <div>
                      <img
                        src={members?.find((e) => e.id === e?.created_by)?.avatar || EMPTY_USER}
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                        }}
                        alt="avatar-cmt"
                      />
                    </div>
                  </div>
                  <div className="user">
                    <div className="name">
                      <span>{getCurrentMember(e?.created_by)}</span>
                      <span style={{ marginLeft: "12px" }}>
                        {e?.created_at !== e?.updated_at ? "(edited)" : ""}
                      </span>
                    </div>
                    <div className="time">
                      Created at: {e?.updated_at?.substring(0, 10)}&nbsp;{" "}
                      {e?.updated_at?.substring(11, 19)}
                    </div>
                  </div>
                </div>
                <div className="comment-content">
                  {e.id !== editComment?.id ? (
                    commentContents?.map((it) => {
                      return <p>{it}</p>;
                    })
                  ) : (
                    <div className="d-flex">
                      {InputArea()}
                      <span>
                        <i
                          class="fa-sharp fa-solid fa-circle-check"
                          style={{ color: "#0088FF" }}
                          onClick={() => handleEditComment()}
                        ></i>
                      </span>
                      <span>
                        <i
                          class="fa-solid fa-xmark"
                          style={{ color: "#FF4d4d" }}
                          onClick={() => setEditComment({})}
                        ></i>
                      </span>
                    </div>
                  )}
                </div>
                <div className="edit-comment">
                  <i
                    className="fa-solid fa-pen-to-square"
                    style={
                      e?.type !== "NORMAL" || e?.created_by !== account?.id
                        ? { color: "#d3d5d7", marginRight: "12px" }
                        : { marginRight: "12px" }
                    }
                    onClick={() => {
                      if (e?.type !== "NORMAL" || e?.created_by !== account?.id) return;
                      setEditComment(e);
                      setComment(e.content);
                    }}
                  ></i>
                  <i
                    className="fa-solid fa-trash"
                    onClick={() => handleDeleteComment(e)}
                  ></i>
                </div>
              </div>
            );
          })}
        {listComment?.current_page * listComment?.per_page <
          listComment?.total && listComment?.total > 0 ? (
          <div className="view-more d-flex justify-content-center align-items-center">
            <div className="is-show-more mt-2" onClick={() => handleViewMore()}>
              Show more
            </div>
          </div>
        ) : null}
      </div>
    );
  };

  const renderAlert = () => {
    return (
      <Dialog open={open1} className="dialog-delete-member" maxWidth="lg">
        <DialogContent>
          <div className="contents-add d-flex justify-content-between">
            All information related to this user in this project will be
            deleted. Are you sure delete?
          </div>
          <div
            className="list-action-member d-flex justify-content-end"
            style={{ marginTop: "16px" }}
          >
            <button
              style={{ background: "#FF4d4d", marginRight: "16px" }}
              onClick={() => setOpen1(false)}
            >
              Cancel
            </button>
            <button onClick={() => handleDeleteTask(taskItem)}>Delete</button>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="task-detail-wrapper">
      <div className="go-back d-flex w-100">
        <div
          className="col-md-6 col-lg-6 col-sm-6 d-flex"
          onClick={() => {
            dispatch({ type: "RESET_TASK_DETAIL" });
          }}
        >
          <div>
            <i className="fa-solid fa-rotate-left"></i>
          </div>
          <div className="text"> Back to list task</div>
        </div>
        <hr />
      </div>
      <div className="col-12 d-flex">
        {taskItem?.parent_task_id ? (
          <div
            className="d-flex"
            onClick={() => {
              dispatch({
                type: "UPDATE_TASK_DETAIL",
                item: parentTask,
              });
            }}
            style={{
              paddingLeft: "16px",
              fontSize: "13px",
              textDecoration: "underline",
              cursor: "pointer",
              color: "#0088FF",
            }}
          >
            <div style={{ paddingRight: "8px" }}>
              <i className="fa-solid fa-folder"></i>
            </div>
            <div style={{ marginRight: "4px" }}>{parentTask?.task_key} /</div>
            <div>{parentTask?.name}</div>
          </div>
        ) : null}
      </div>
      <div className="content-wrapper">
        <div className="task-name col-12 d-flex mt-2">
          <div className="col-6 d-flex">
            {taskItem?.task_key ? (
              <div style={{ marginRight: "4px" }}>{taskItem?.task_key} /</div>
            ) : null}
            <div>{taskItem?.name}</div>
          </div>
          <div className="col-6 d-flex justify-content-end btn-edit-task">
            {account?.role === 2 ? (
              <>
                <button
                  style={{
                    marginRight: "16px",
                    background: "#FF4d4d",
                    color: "#FFF",
                  }}
                  onClick={() => setOpen1(true)}
                >
                  Delete
                </button>
              </>
            ) : null}
            {account?.role === 2 ||
            (taskItem?.parent_task_id && account?.role === 3) ? (
              <button onClick={() => setIsEdit(true)}>Edit</button>
            ) : null}
          </div>
        </div>
        <div className="task-info d-flex">
          <div className="info-left col-md-6 col-sm-6 col-lg-6 d-block">
            <div className="created_by d-flex">
              <div className="image">
                <div>
                  <img src={members?.find((e) => e.id === taskItem?.created_by)?.avatar || EMPTY_USER} alt="avatar" />
                </div>
              </div>
              <div className="user">
                <div className="name">
                  {getCurrentMember(taskItem?.created_by)}
                </div>
                <div className="time">
                  Created at: {taskItem?.created_at?.substring(0, 10)} &nbsp;
                  {taskItem?.created_at?.substring(11, 19)}
                </div>
              </div>
            </div>
            <div className="task-name" style={{ fontSize: "14px" }}>
              {taskItem?.description}
            </div>
            <div className="line-item d-flex">
              <div className="text-1">Status</div>
              <div className={` value text-status ${taskItem?.status}`}>
                <div>{taskItem?.status}</div>
              </div>
            </div>
            <div className="line-item d-flex">
              <div className="text-1">Priority</div>
              <div className="value d-flex">
                <div>
                  {taskItem?.priority === "LOW" ? (
                    <i
                      className="fa-solid fa-arrow-down"
                      style={{ color: "#2c9a7a" }}
                    ></i>
                  ) : null}
                  {taskItem?.priority === "HIGH" ? (
                    <i
                      className="fa-solid fa-arrow-up"
                      style={{ color: "#FF4D4D" }}
                    ></i>
                  ) : null}
                  {taskItem?.priority === "NORMAL" ? (
                    <i className="fa-solid fa-arrow-right"></i>
                  ) : null}
                </div>
                <div style={{ marginLeft: "16px" }}>{taskItem?.priority}</div>
              </div>
            </div>
            <div className="line-item d-flex">
              <div className="text-1">Assignee</div>
              <div className="value">
                {getCurrentMember(taskItem?.assignee_id)}
              </div>
            </div>
            <div className="line-item d-flex">
              <div className="text-1">Milestone</div>
              <div className="value">
                {getCurrentMilestone(taskItem?.milestone_id)}
              </div>
            </div>
          </div>
          <div className="info-right col-md-6 col-sm-6 col-lg-6">
            <div className="line-item d-flex">
              <div className="text-1">Start date</div>
              <div className="value">
                {taskItem?.start_time?.substring(0, 10)}
              </div>
            </div>
            <div className="line-item d-flex">
              <div className="text-1">Due date</div>
              <div className="value">
                <span
                  style={
                    compareTime(new Date(taskItem?.end_time), new Date()) &&
                    taskItem?.status !== "Closed"
                      ? { fontWeight: "600", color: "#FF4d4d" }
                      : {}
                  }
                >
                  {taskItem?.end_time?.substring(0, 10)}
                </span>
                {compareTime(new Date(taskItem?.end_time), new Date()) &&
                taskItem?.status !== "Closed" ? (
                  <span>
                    <i
                      style={{
                        color: "red",
                        marginLeft: "6px",
                        fontSize: "16px",
                      }}
                      className="fa-solid fa-fire"
                    ></i>
                  </span>
                ) : null}
              </div>
            </div>
            <div className="line-item d-flex">
              <div className="text-1">Estimate Time</div>
              <div className="value">{taskItem?.estimate_time}</div>
            </div>
          </div>
        </div>
        {!taskItem?.parent_task_id ? (
          <div className="col-12 d-flex mb-1">
            <div
              className="col-10"
              style={{
                fontSize: "16px",
                fontWeight: "600",
                color: "#0088FF",
                paddingTop: "15px",
              }}
            >
              Sub Tasks
            </div>
            <div className="col-2">
              <div
                className="col-12 d-flex justify-content-end"
                onClick={() => setOpenModal(true)}
              >
                <button className="btn-create-sub-task">Create sub task</button>
              </div>
            </div>
          </div>
        ) : null}
        {!taskItem?.parent_task_id ? (
          <div className="list-subtask">
            <div className="table-header">
              <div className="key">Key</div>
              <div className="subject">Name</div>
              <div className="assignee">Assignee</div>
              <div className="status">Status</div>
              <div className="priority">Priority</div>
              <div className="milestone">Milestone</div>
              <div className="created">Created</div>
              <div className="due-date">Due date</div>
              <div className="updateAt">Update At</div>
              <div className="register">Created By</div>
            </div>
            {taskItem?.sub_tasks?.length === 0 ? (
              renderEmptyList()
            ) : (
              <div className="table-content">
                {taskItem?.sub_tasks?.map((e, index) => {
                  return renderItem(e, index);
                })}
              </div>
            )}
          </div>
        ) : null}
        <div className="list-comment-wrapper" style={{ marginTop: "24px" }}>
          <div className="title" style={{ marginBottom: "8px" }}>
            <span style={{ fontWeight: "600" }}>Comments</span>
            <span style={{ marginLeft: "10px" }}>
              ({listComment?.total || 0})
            </span>
          </div>
          {renderListComment()}
        </div>
      </div>

      {showComment ? (
        renderComment()
      ) : (
        <div className={`comment ${isExpand ? "expanded" : ""}`}>
          <input
            type="text"
            placeholder="Enter your comment"
            value={editComment == null ? comment : null}
            onClick={() => setShowComment(true)}
            onChange={(e) => setComment(e.target.value)}
          ></input>
        </div>
      )}
      {open1 ? renderAlert() : null}
      {openModal ? (
        <CreateSubTaskModal
          members={members}
          milestoneId={taskItem?.milestone_id}
          milestones={milestones}
          parentTask={taskItem}
          open={openModal}
          handleClose={() => setOpenModal(false)}
          taskItem={taskItem}
        />
      ) : null}
      {isEdit ? (
        <EditTaskModal
          members={members}
          milestoneId={taskItem?.milestone_id}
          memberOptions={memberOptions}
          priorityOptions={priorityOptions}
          milestones={milestones}
          mileStoneOptions={mileStoneOptions}
          parentTask={taskItem}
          open={isEdit}
          handleClose={() => setIsEdit(false)}
          taskItem={taskItem}
        />
      ) : null}
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
export default TaskDetail;
