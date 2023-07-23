import React from "react";
import "../styles/ProjectHeader.scss";
import { ORG_IMAGE_DEFAULT } from "../../../../../commons/image";
import { memo } from "react";
function ProjectHeader(props) {
  const { item } = props;

  return (
    <div className="project-header">
      <div className="project-header_left">
        <div className="image">
          <img src={ORG_IMAGE_DEFAULT}></img>
        </div>
        <div className="project-name">
          <span>{item?.name}</span>
          <span>({item?.project_key})</span>
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
export default memo(ProjectHeader);
