import React from "react";
import "../styles/Filter.scss";
import { useState } from "react";
import { Button, TextField } from "@mui/material";
import ButtonDropDown from "../../../../../commons/Button/ButtonDropdown";
import { taskOptions } from "../../AddIssue/commons/DataCommon";

function FilterIssue(props) {
  const [isZoomIn, setIsZoomIn] = useState(false);
  return (
    <>
      <div className="issues-filter-wrapper">
        <div className={`filter-header ${isZoomIn ? "zoom-in" : ""}`}>
          <div className="header-left">
            <div className="search-condition">
              <div
                className="collapse-icon"
                onClick={() => setIsZoomIn(!isZoomIn)}
              >
                <i className="fa-solid fa-chevron-up"></i>
              </div>
              <div className="title">Search conditions</div>
            </div>
            <div className="search-buttons">
              <button>Search</button>
            </div>
          </div>
        </div>
        {isZoomIn ? (
          <div className="filter-expand">
            <div className="filter-status">
              <div className="label">Status: </div>
              <div className="status-item">
                <div className="text all">All</div>
                <div className="text open">Open</div>
                <div className="text in-progress">In Progress</div>
                <div className="text resolved">Resolved</div>
                <div className="text closed">Closed</div>
                <div className="text not-closed">Not Closed</div>
              </div>
            </div>
            <div className="filter-select-list">
              <div className="issue-type">
                <div className="label">Issue Type</div>
                <ButtonDropDown options={taskOptions} />
              </div>
              <div className="category">
              <div className="label">Category</div>
                <ButtonDropDown options={taskOptions} />
              </div>
              <div className="milestone">
              <div className="label">Milestone</div>
                <ButtonDropDown options={taskOptions} />
              </div>
              <div className="assignee">
              <div className="label">Assignee</div>
                <ButtonDropDown options={taskOptions} />
              </div>
            </div>
            <div className="keyword-input">
              <div className="lable">Keyword</div>
              <TextField  placeholder="Enter keyword"/>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
export default FilterIssue;

