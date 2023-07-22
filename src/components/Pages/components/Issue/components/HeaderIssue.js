import React from "react";
import "../styles/Header.scss";
import { ORG_IMAGE_DEFAULT } from "../../../../../commons/image";

function HeaderIssue(props) {
  return (
    <>
      <div className="issues-header-wrapper">
        <div className="issues-header_left">
          <div className="image">
            <img src={ORG_IMAGE_DEFAULT}></img>
          </div>
          <div className="project-name">
            <span>PMA_web</span>
            <span>(PMA_WEB)</span>
          </div>
        </div>
        <div className="issues-header_right">
          <span className="search">
            <i className="fa-solid fa-magnifying-glass"></i>
          </span>
        </div>
      </div>
    </>
  );
}
export default HeaderIssue;
