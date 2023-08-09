import React, { useState } from "react";
import "../styles/ProjectHeader.scss";
import { EMPTY_USER, ORG_IMAGE_DEFAULT } from "../../../../../commons/image";
import { memo } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
function ProjectHeader(props) {
  const { item } = props;
  const members = useSelector(state => state.projects.members);
  const account = useSelector(state => state.auth.account);
  const history = useHistory();

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
        <span className="user" onClick={() => history.push("/my-profile")} style={{cursor: 'pointer'}}>
          <img src={account?.avatar || EMPTY_USER} alt="avatar"/>
        </span>
        <span className="other-user">+{members?.length || 0}</span>
        <span className="invite-users">Invite Users</span>
        <span className="search">
          <i className="fa-solid fa-magnifying-glass"></i>
        </span>
      </div>
    </div>
  );
}
export default memo(ProjectHeader);
