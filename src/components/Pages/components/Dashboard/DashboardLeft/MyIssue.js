import React, { useState } from "react";
import "./styles/myIssue.scss";

function MyIssue(props) {
  const [isZoomIn, setIsZoomIn] = useState(false);

  return (
    <div className="my-issue-wrapper">
      <div className={`header ${isZoomIn ? "zoom-in" : ""}`}>
        <div className="header-left">
          <div className="collapse-icon" onClick={() => setIsZoomIn(!isZoomIn)}>
            <i className="fa-solid fa-chevron-up"></i>
          </div>
          <div className="title">My Issues</div>
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
                <div className="item">Assigned to me (3)</div>
                <div className="item">Created by me (3)</div>
              </div>
            </div>
            <div className="filter time">
              <div className="label">Due Date:</div>
              <div className="filter-item">
                <div className="item all">All</div>
                <div className="item">4 Days</div>
                <div className="item">Due Today</div>
                <div className="item">Overdue</div>
              </div>
            </div>
          </div>
          <div className="list-issue-table">
            <div className="list-issue-header">
              <div className="text-key">Key</div>
              <div className="text-subject">Subject</div>
              <div className="text-priority">Priority</div>
              <div className="text-status">Status</div>
              <div className="text-due">Due</div>
            </div>
            <div className="list-issue-content">
              <div className="list-empty">
                <p>No issue to display</p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
export default MyIssue;

const fakeList = [1, 2, 3, 4];
