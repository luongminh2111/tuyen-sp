import React, { useEffect, useState } from "react";
import "./styles/project.scss";
import ReactTooltip from "react-tooltip";
import { ORG_IMAGE_DEFAULT } from "../../../../../commons/image";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showDetailProject } from "../../Workplace/actions/WorkplaceActionRedux";

function Project(props) {

  const [isZoomIn, setIsZoomIn] = useState(false);

  const projects = useSelector(state => state.projects.items);

  const dispatch = useDispatch();

  const history = useHistory();

  const handleGoToProject = (item) => {
    dispatch(showDetailProject(item?.id));
    history.push(`/project?name=${item?.name}`)
  }

  return (
    <div className="project-wrapper">
      <div className={`header ${isZoomIn ? "zoom-in" : ""}`}>
        <div className="header-left">
          <div className="collapse-icon" onClick={() => setIsZoomIn(!isZoomIn)}>
            <i className="fa-solid fa-chevron-up"></i>
          </div>
          <div className="title">Projects</div>
        </div>
        <div className="header-right">
          <div className="add-project" data-tip="" data-for="icon-add-project" onClick={() => history.push(`/workplace-setting?id=projects`)}>
            <i className="fa-solid fa-plus"></i>
          </div>
          <div className="search">
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          <ReactTooltip
            id="icon-add-project"
            type="dark"
            effect="solid"
            place="top"
          >
            Add project
          </ReactTooltip>
        </div>
      </div>
      {!isZoomIn ? (
        <div className="list-project">
          {projects?.map((item, index) => {
            return (
              <div className="project-item" onClick={() => handleGoToProject(item)} key={index}>
                <div className="icon-pin"></div>
                <div className="org-icon">
                  <img src={ORG_IMAGE_DEFAULT}></img>
                </div>
                <div className="project-info">
                  <div className="info-top">
                    <div className="project-name">{item?.name}</div>
                  </div>
                  <div className="sub-name">
                    {item?.project_key}
                  </div>
                  <div className="info-bottom">
                    <div className="add-task">Create task</div>
                    <div className="tasks">Task</div>
                    <div className="board">Board</div>
                    <div className="file">Files</div>
                  </div>
                </div>
                <div className="setting-icon" data-tip="" data-for="project-setting-icon">
                  <i className="fa-solid fa-gear"></i>
                </div>
                <ReactTooltip effect="solid" place="top" type="dark" id="project-setting-icon" >Project setting</ReactTooltip>
              </div>
            )
          })}
        </div>
      ): null}
    </div>
  );
}
export default Project;
