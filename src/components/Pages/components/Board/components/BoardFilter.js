import React from "react";
import { useState } from "react";
import ButtonDropDown from "../../../../../commons/Button/ButtonDropdown";
import { taskOptions } from "../../AddIssue/commons/DataCommon";
import "../styles/BoardFilter.scss";

function BoardFilter(props) {
  const [isZoomIn, setIsZoomIn] = useState(false);

  return (
    <div className="board-filter-wrapper">
      <div className={`filter-header ${isZoomIn ? "zoom-in" : ""}`}>
        <div className="header-left">
          <div className="title">Board</div>
          <div className="filter-buttons">
            <button onClick={() => setIsZoomIn(!isZoomIn)}>
              <span>
                <i className="fa-solid fa-filter"></i>
              </span>
              <span>{isZoomIn ? "Hide Filter" : "Show Filter"}</span>
            </button>
          </div>
        </div>
        <div className="header-right">
          <div className="filter-save">
            <button>
              <span>
                <i className="fa-solid fa-filter"></i>
              </span>
              <span>Save as Filter</span>
            </button>
          </div>
        </div>
      </div>
      {isZoomIn ? (
        <div className="filter-expand">
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
        </div>
      ) : null}
    </div>
  );
}
export default BoardFilter;
