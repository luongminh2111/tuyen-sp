import React, { useState } from "react";
import "../styles/Table.scss";
import ReactTooltip from "react-tooltip";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getListTask } from "../actions/TaskCallApi";
import { CircularProgress } from "@mui/material";

function TableIssue(props) {
  const { tasks, setId, setShowDetail, milestones, setSubId } = props;
  const dispatch = useDispatch();
  const members = useSelector((state) => state.projects.members);
  const filterTask = useSelector((state) => state.projects.filterTask);
  const [loading, setLoading] = useState(false);

  const [showDetailIds, setShowDetailIds] = useState([]);

  useEffect(() => {
    setLoading(true);
    dispatch(
      getListTask(
        filterTask?.status,
        filterTask?.milestone_id,
        filterTask?.assignee_id,
        filterTask?.key
      )
    ).then((res) => {
      setLoading(false);
    });
  }, [filterTask]);

  const getCurrentMember = (id) => {
    return members?.find((e) => e.id === id)?.name;
  };

  const getCurrentMilestone = (id) => {
    return milestones?.find((e) => e.id === id)?.name;
  };

  const handleShowDetail = (id, isSubTask) => {
    setShowDetail(true);
    if (isSubTask) {
      setSubId(id);
    } else {
      setId(id);
    }
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
    setId(value);
    if (showDetailIds?.includes(value)) {
      setShowDetailIds(showDetailIds?.filter((e) => e !== value));
    } else {
      setShowDetailIds(showDetailIds?.concat(value));
    }
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

  const renderItem = (e, index, isSubTask, parentId) => {
    return (
      <>
        <div className="issue-item" key={index}>
          <div
            className="item_key"
            onClick={() => handleChangeShowDetailIds(e?.id)}
          >
            {e?.sub_tasks?.length > 0 ? (
              <span style={{ marginRight: "6px" }}>
                <i className="fa-solid fa-right-to-bracket"></i>
              </span>
            ) : null}
            {isSubTask ? (
              <span>
                <i
                  className="fa-solid fa-arrow-right"
                  style={{
                    transform: "rotate(45deg)",
                    color: "#d3d5d7",
                    marginRight: "8px",
                  }}
                ></i>
              </span>
            ) : null}
            <span> {e?.task_key}</span>
          </div>
          <div
            className="item_subject"
            onClick={() => {
              handleShowDetail(e.id, isSubTask);
            }}
          >
            <div data-for={`item_subject_${index}`} data-tip="">
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

  return (
    <div className="issues-table-wrapper">
      <div className="pagination"></div>
      {renderHeader()}
      {loading ? (
        <div>
          <div
            className="w-100 d-flex justify-content-center align-items-center"
            style={{ height: "300px" }}
          >
            <CircularProgress />
          </div>
        </div>
      ) : tasks?.length === 0 ? (
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
