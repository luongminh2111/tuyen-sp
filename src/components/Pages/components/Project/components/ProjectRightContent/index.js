import React from "react";
import "../../styles/ProjectRightContent.scss"
import Status from "./Status";
import Milestones from "./Milestone";
import Category from "./Category";

function ProjectRightContent(props){
  return (
    <div className="project-right-wrapper">
      <Status />
      <Milestones />
      <Category />
    </div>
  )
};
export default ProjectRightContent;