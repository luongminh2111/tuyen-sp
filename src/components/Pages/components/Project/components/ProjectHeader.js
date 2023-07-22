import React from "react";
import "../styles/ProjectHeader.scss";
import { ORG_IMAGE_DEFAULT } from "../../../../../commons/image";

function ProjectHeader(props) {
  return (
    <div className="project-header">
      <div className="project-header_left">
        <div className="image">
          <img src={ORG_IMAGE_DEFAULT}></img>
        </div>
        <div className="project-name">
          <span >PMA_web</span>
          <span>(PMA_WEB)</span>
        </div>
      </div>
      <div className="project-header_right">
        <span className="user">
          <p>V</p>
        </span>
        <span className="other-user">+3</span>
        <span className="invite-users">Invite Users</span>
        <span className="search">
          <i className="fa-solid fa-magnifying-glass"></i>
        </span>
      </div>
    </div>
  );
}
export default ProjectHeader;
