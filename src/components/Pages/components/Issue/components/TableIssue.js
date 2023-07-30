import React, { useState } from "react";
import "../styles/Table.scss";
import ReactTooltip from "react-tooltip";
import { useSelector } from "react-redux";

function TableIssue(props) {
  const { tasks, setId, setShowDetail, milestones } = props;

  const members = useSelector((state) => state.projects.members);

  const getCurrentMember = (id) => {
    return members?.find((e) => e.id === id)?.name;
  };

  const getCurrentMilestone = (id) => {
    return milestones?.find((e) => e.id === id)?.name;
  };

  const handleShowDetail = (id) => {
    setShowDetail(true);
    setId(id);
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

  const renderHeader = () => {
    return (
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
    );
  };

  const renderItem = (e, index) => {
    return (
      <>
        <div
          className="issue-item"
          key={index}
          onClick={() => handleShowDetail(e.id)}
        >
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
          <div className="item_milestone">{getCurrentMilestone(e?.milestone_id)}</div>
          <div className="item_created">{e?.created_at?.substring(0, 10)}</div>
          <div className="item_due-date">{e?.end_time?.substring(0, 10)}</div>
          <div className="item_updateAt">{e?.updated_at?.substring(0, 10)}</div>
          <div className="item_register">{getCurrentMember(e?.created_by)}</div>
        </div>
      </>
    );
  };

  return (
    <div className="issues-table-wrapper">
      <div className="pagination"></div>
      {renderHeader()}
      {tasks?.length === 0 ? (
        renderEmptyList()
      ) : (
        <div className="table-content">
          {tasks?.map((e, index) => {
            return renderItem(e, index);
          })}
        </div>
      )}
    </div>
  );
}
export default TableIssue;
