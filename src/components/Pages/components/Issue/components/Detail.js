import React, { useState, useEffect } from "react";
import "../styles/Detail.scss";
import { useSelector } from "react-redux";
import ReactTooltip from "react-tooltip";
import ButtonDropDown from "../../../../../commons/Button/ButtonDropdown";
import { useMemo } from "react";
import CreateSubTaskModal from "./CreateSubTaskModal";

function TaskDetail(props) {
  const { task, setShowDetail, milestones, isExpand } = props;

  const [comment, setComment] = useState("");
  const [showComment, setShowComment] = useState(false);
  const [userSelect, setUserSelect] = useState([]);
  const [openModal, setOpenModal] = useState(false);

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

  console.log("check task :", task);

  useEffect(() => {}, []);

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
          <div
            className="item_subject"
            data-for={`item_subject_${index}`}
            data-tip=""
          >
            {e?.name}
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
            {getCurrentMember(e?.asignee_id)}
          </div>
          <div className="item_status">
            <div>{e?.status}</div>
          </div>
          <div className="item_priority">
            {e?.priority === "LOW" ? (
              <i
                className="fa-solid fa-arrow-down"
                style={{ color: "#2c9a7a" }}
              ></i>
            ) : null}
            {e?.priority === "HIGHT" ? (
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
      <div className="comment-wrapper">
        <div className="comment-area">
          <textarea
            id="comment-area"
            placeholder="write a comment, using @mention to notify a colleague..."
            value={comment}
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
          <button className="submit">Submit </button>
        </div>
      </div>
    );
  };

  const renderListComment = () => {
    // if (true) {
    //   return (
    //     <div className="empty-wrapper">
    //     <div className="content">
    //       <div>Comment is empty</div>
    //     </div>
    //   </div>
    //   )
    // }
    return (
      <div className="list-comment">
        {[0, 1, 2, 3]?.map((e, index) => {
          return (
            <div className="comment-item" key={index}>
              <div className="created_by d-flex">
                <div className="image">
                  <div>U</div>
                </div>
                <div className="user">
                  <div className="name">User 1</div>
                  <div className="time">
                    Created at: {task?.created_at?.substring(0, 10)}
                  </div>
                </div>
              </div>
              <div className="comment-content">Test comment {index}</div>
              <div className="edit-comment">
                <i
                  className="fa-solid fa-pen-to-square"
                  style={{ marginRight: "12px" }}
                ></i>
                <i className="fa-solid fa-trash"></i>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="task-detail-wrapper">
      <div className="go-back d-flex w-100">
        <div
          className="col-md-6 col-lg-6 col-sm-6 d-flex"
          onClick={() => setShowDetail(false)}
        >
          <div>
            <i className="fa-solid fa-rotate-left"></i>
          </div>
          <div className="text">Back to {task?.name}</div>
        </div>
        <div
          className="col-md-6 col-lg-6 col-sm-6 d-flex justify-content-end"
          onClick={() => setOpenModal(true)}
        >
          <button className="btn-create-sub-task">Create sub task</button>
        </div>
        <hr />
      </div>
      <div className="content-wrapper">
        <div className="task-name">{task?.name}</div>
        <div className="task-info d-flex">
          <div className="info-left col-md-6 col-sm-6 col-lg-6 d-block">
            <div className="created_by d-flex">
              <div className="image">
                <div>{getCurrentMember(task?.asignee_id)?.substring(0, 1)}</div>
              </div>
              <div className="user">
                <div className="name">{getCurrentMember(task?.asignee_id)}</div>
                <div className="time">
                  Created at: {task?.created_at?.substring(0, 10)}
                </div>
              </div>
            </div>
            <div className="task-name" style={{ fontSize: "14px" }}>
              {task?.name}
            </div>
            <div className="line-item d-flex">
              <div className="text-1">Priority</div>
              <div className="value d-flex">
                <div>
                  {task?.priority === "LOW" ? (
                    <i
                      className="fa-solid fa-arrow-down"
                      style={{ color: "#2c9a7a" }}
                    ></i>
                  ) : null}
                  {task?.priority === "HIGHT" ? (
                    <i
                      className="fa-solid fa-arrow-up"
                      style={{ color: "#FF4D4D" }}
                    ></i>
                  ) : null}
                  {task?.priority === "NORMAL" ? (
                    <i className="fa-solid fa-arrow-right"></i>
                  ) : null}
                </div>
                <div style={{ marginLeft: "16px" }}>{task?.priority}</div>
              </div>
            </div>
            <div className="line-item d-flex">
              <div className="text-1">Assignee</div>
              <div className="value">{getCurrentMember(task?.asignee_id)}</div>
            </div>
            <div className="line-item d-flex">
              <div className="text-1">Milestone</div>
              <div className="value">
                {getCurrentMilestone(task?.milestone_id)}
              </div>
            </div>
          </div>
          <div className="info-right col-md-6 col-sm-6 col-lg-6"></div>
        </div>
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
          {task?.sub_tasks?.length === 0 ? (
            renderEmptyList()
          ) : (
            <div className="table-content">
              {task?.sub_tasks?.map((e, index) => {
                return renderItem(e, index);
              })}
            </div>
          )}
        </div>
        <div className="list-comment-wrapper" style={{ marginTop: "24px" }}>
          <div className="title" style={{ marginBottom: "8px" }}>
            <span style={{ fontWeight: "600" }}>Comments</span>
            <span style={{ marginLeft: "10px" }}>(4)</span>
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
            value={comment}
            onClick={() => setShowComment(true)}
            onChange={(e) => setComment(e.target.value)}
          ></input>
        </div>
      )}
      {openModal ? (
        <CreateSubTaskModal
          members={members}
          milestoneId={task?.milestone_id}
          milestones={milestones}
          parentTaskId={task?.id}
          open={openModal}
          handleClose={() => setOpenModal(false)}
        />
      ) : null}
    </div>
  );
}
export default TaskDetail;
