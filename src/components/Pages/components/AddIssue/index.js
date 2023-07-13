import React from "react";
import "./styles/index.scss";
import HeaderNav from "../../../commons/HeaderNav/HeaderNav";
import { ORG_IMAGE_DEFAULT } from "../../../../commons/image";
import { Button, TextField } from "@mui/material";
import ButtonDropDown from "../../../../commons/Button/ButtonDropdown";
import { priorityOptions, taskOptions } from "./commons/DataCommon";
import ToggleNav from "../../../../commons/ToggleNav";
import { useSelector } from "react-redux";

function AddIssue(props) {
  const isExpand = useSelector((state) => state.global.isExpand);

  return (
    <>
      <ToggleNav />
      <div className={`add-issue-wrapper ${isExpand ? "menu-expand" : ""}`}>
        <HeaderNav />
        <div className="content-header">
          <div className="header-icon-set project-header__summary">
            <div className="header-icon-set__icon">
              <a href="">
                <img src={ORG_IMAGE_DEFAULT} />
              </a>
            </div>
            <div className="header-icon-set__text">
              <span className="header-icon-set__name">PMA_web</span>
              <span className="header-icon-set__key">(PMA_web)</span>
            </div>
          </div>
          <div className="project-header__actions"></div>
        </div>
        <div className="contents-main">
          <div className="title-issue">
            <h3>Add Issue</h3>
          </div>
          <div className="btn-type">
            <ButtonDropDown options={taskOptions} />
          </div>
          <div className="text-input-sbj">
            <TextField placeholder="Subject" />
          </div>
          <div className="card card--default ticket__content">
            <div className="area-input-ticket">
              <textarea placeholder="Add a description, use @ mentor to notify a colleague.." />
            </div>
            <div className="card-content">
              <div className="card-left">
                <div className="ticket__properties-item -status">
                  <label>Status</label>
                  <div className="ticket__properties-value">Open</div>
                </div>
                <div className="ticket__properties-item -priority">
                  <label>Priority</label>
                  <div className="ticket__properties-value">
                    <ButtonDropDown options={priorityOptions} />
                  </div>
                </div>
                <div className="ticket__properties-item -category">
                  <label>Category</label>
                  <div className="ticket__properties-value">
                    <ButtonDropDown options={priorityOptions} />
                  </div>
                </div>
                <div className="ticket__properties-item -limit-date">
                  <label>Due Date</label>
                  <div className="ticket__properties-value">
                    <ButtonDropDown options={priorityOptions} />
                  </div>
                </div>
              </div>
              <div className="card-right">
                <div className="ticket__properties-item -assigner">
                  <label>Assignee</label>
                  <div className="ticket__properties-value">
                    <ButtonDropDown options={priorityOptions} />
                  </div>
                </div>
                <div className="ticket__properties-item -milestones">
                  <label>Milestone</label>
                  <div className="ticket__properties-value">
                    <ButtonDropDown options={priorityOptions} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="list-btn">
            <Button className="preview-btn">Preview</Button>
            <Button className="add-btn">Add</Button>
          </div>
        </div>
      </div>
    </>
  );
}
export default AddIssue;
