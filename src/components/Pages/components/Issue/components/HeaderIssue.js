import React from "react";
import "../styles/Header.scss";
import { ORG_IMAGE_DEFAULT } from "../../../../../commons/image";

function HeaderIssue(props) {
  const {item} = props;
  
  return (
    <>
      <div className="issues-header-wrapper">
        <div className="issues-header_left">
          <div className="image">
            <img src={ORG_IMAGE_DEFAULT}></img>
          </div>
          <div className="project-name">
          <span>{item?.name}</span>
          <span>({item?.project_key})</span>
        </div>
        </div>
      </div>
    </>
  );
}
export default HeaderIssue;
