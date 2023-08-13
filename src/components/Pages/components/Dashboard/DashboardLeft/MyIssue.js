import React, { useState } from "react";
import "./styles/myIssue.scss";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getFilterMyTask } from "../actions/DashboardAactionCallApi";
import { CircularProgress } from "@mui/material";
import { useHistory } from "react-router-dom";
import { showDetailProject } from "../../Workplace/actions/WorkplaceActionRedux";
import { compareTime } from "../../../../../ulti/dateTime";

function MyIssue(props) {
  const [isZoomIn, setIsZoomIn] = useState(false);

  const [filterUser, setFilterUser] = useState("");
  const [filterTime, setFilterTime] = useState("all");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    dispatch(getFilterMyTask(filterUser, filterTime)).then((res) => {
      setItems(res?.data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    dispatch(getFilterMyTask(filterUser, filterTime)).then((res) => {
      setItems(res?.data);
      setLoading(false);
    });
  }, [filterUser, filterTime]);

  const handleShowDetailTask = (e) => {
    dispatch(showDetailProject(e?.project_id));
    dispatch({
      type: "UPDATE_TASK_DETAIL",
      item: e,
    });
    history.push("/tasks");
  };

  return (
    <div className="my-issue-wrapper">
      <div className={`header ${isZoomIn ? "zoom-in" : ""}`}>
        <div className="header-left">
          <div className="collapse-icon" onClick={() => setIsZoomIn(!isZoomIn)}>
            <i className="fa-solid fa-chevron-up"></i>
          </div>
          <div className="title">My tasks</div>
        </div>
        <div className="header-right">
          <div className="search">
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>
      </div>
      {!isZoomIn ? (
        <div className="list-issue">
          <div className="list-issue_top">
            <div className="filter">
              <div className="label">Filters:</div>
              <div className="filter-item">
                <div
                  className={`item ${filterUser === "" ? "active" : null}`}
                  onClick={() => setFilterUser("")}
                >
                  Assigned to me {filterUser === "" ? items?.length : null}
                </div>
                <div
                  className={`item ${
                    filterUser === "created_by" ? "active" : null
                  }`}
                  onClick={() => setFilterUser("created_by")}
                >
                  Created by me {filterUser !== "" ? items?.length : null}
                </div>
              </div>
            </div>
            <div className="filter time">
              <div className="label">Due Date:</div>
              <div className="filter-item">
                <div
                  className={`item all ${
                    filterTime === "all" ? "active" : null
                  }`}
                  onClick={() => setFilterTime("all")}
                >
                  All
                </div>
                <div
                  className={`item ${
                    filterTime === "due_today" ? "active" : null
                  }`}
                  onClick={() => setFilterTime("due_today")}
                >
                  Due Today
                </div>
                <div
                  className={`item ${
                    filterTime === "overdue" ? "active" : null
                  }`}
                  onClick={() => setFilterTime("overdue")}
                >
                  Overdue
                </div>
              </div>
            </div>
          </div>
          <div className="list-issue-table">
            <div className="list-issue-header">
              <div className="text-key">Key</div>
              <div className="text-subject">Name</div>
              <div className="text-priority">Priority</div>
              <div className="text-status">Status</div>
              <div className="text-due">Due</div>
            </div>

            {loading ? (
              <div className="loading">
                <div
                  className="w-100 d-flex justify-content-center align-items-center"
                  style={{ height: "200px" }}
                >
                  <CircularProgress />
                </div>
              </div>
            ) : items?.length === 0 ? (
              <div
                className="d-flex align-items-center justify-content-center w-100"
                style={{ height: "200px" }}
              >
                <div className="list-empty">
                  <p>No task to display</p>
                </div>
              </div>
            ) : (
              <div className="list-issue-content">
                {items?.map((e) => {
                  return (
                    <div className="item-task">
                      <div className="text-key">{e?.task_key}</div>
                      <div
                        className="text-subject name"
                        onClick={() => handleShowDetailTask(e)}
                      >
                        {e?.name}
                      </div>
                      <div className="text-priority">
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
                      <div className={`text-status ${e?.status}`}>
                        <div>{e?.status}</div>
                      </div>
                      <div className="text-due">
                        <span
                          style={
                            compareTime(new Date(e?.end_time), new Date()) && e?.status !== 'Closed'
                              ? { fontWeight: "600", color: "#FF4d4d" }
                              : {}
                          }
                        >
                          {e?.end_time?.substring(0, 10)}
                        </span>
                        {compareTime(new Date(e?.end_time), new Date()) && e?.status !== 'Closed' ? (
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
                  );
                })}
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
export default MyIssue;
