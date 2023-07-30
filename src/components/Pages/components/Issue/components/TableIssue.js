import React, { useState } from "react";
import "../styles/Table.scss";
import ReactTooltip from "react-tooltip";
import { useSelector } from "react-redux";

function TableIssue(props) {
  const { tasks, setId, setShowDetail, milestones } = props;

  const members = useSelector((state) => state.projects.members);

  const [showDetailIds, setShowDetailIds] = useState([]);

  console.log("check tasks :", tasks);

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

  const handleChangeShowDetailIds = (value) => {
    if (showDetailIds?.includes(value)) {
      setShowDetailIds(showDetailIds?.filter((e) => e !== value));
    } else {
      setShowDetailIds(showDetailIds?.concat(value));
    }
  };
  console.log("check show ids :", showDetailIds);

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

  const renderItem = (e, index, isSubTask, parentId) => {
    return (
      <>
        <div className="issue-item" key={index}>
          <div className="item_key">
            {e?.sub_tasks?.length > 0 ? (
              <span
                style={{ marginRight: "6px" }}
                onClick={() => handleChangeShowDetailIds(e?.id)}
              >
                <i className="fa-solid fa-right-to-bracket"></i>
              </span>
            ) : null}
            {isSubTask ? (
              <span>
               <i className="fa-solid fa-arrow-right" style={{transform: 'rotate(45deg)', color: '#d3d5d7', marginRight: "8px"}}></i>
              </span>
            ) : null}
            <span> {e?.task_key}</span>
          </div>
          <div
            className="item_subject"
            data-for={`item_subject_${index}`}
            data-tip=""
            onClick={() => {handleShowDetail(isSubTask ? parentId : e.id)}}
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

  return (
    <div className="issues-table-wrapper">
      <div className="pagination"></div>
      {renderHeader()}
      {tasks?.length === 0 ? (
        renderEmptyList()
      ) : (
        <div className="table-content">
          {tasks?.map((e, index) => {
            return (
              <>
                {renderItem(e, index)}
                {e?.sub_tasks?.length > 0 && showDetailIds?.includes(e.id)
                  ? e?.sub_tasks?.map((et, index1) => {
                      return renderItem(et, index1, true, e.id);
                    })
                  : null}
              </>
            );
          })}
        </div>
      )}
    </div>
  );
}
export default TableIssue;
